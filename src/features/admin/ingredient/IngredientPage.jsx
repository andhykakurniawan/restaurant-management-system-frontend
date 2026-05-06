import { useMemo, useState } from "react"
import { useIngredient } from "./hooks/useIngredient"
import { Plus } from "lucide-react"

// Import UI Components
import PageHeader from "@/components/ui/pages/PageHeader"
import PageStatsGrid from "@/components/ui/pages/PageStatsGrid"
import PageFilterBar from "@/components/ui/pages/PageFilterBar"
import FilterButton from "@/components/ui/pages/FilterButton"
import IngredientTable from "./components/IngredientTable"
import IngredientModal from "./components/IngredientModal"
import { ConfirmModal } from "@/components/ui/modals"

export default function IngredientPage() {
  const {
    ingredients,
    isLoading,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    restoreIngredient,
  } = useIngredient()

  const [modal, setModal] = useState({ isOpen: false, type: null, data: null })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = useMemo(() => {
    return ingredients.filter((cat) => {
      const matchesSearch =
        (cat.name ?? "") ||
        (cat.unit ?? "") ||
        (cat.currentStock?.toString() ?? "") ||
        (cat.minimumStock?.toString() ?? "") ||
        (cat.costPerUnit?.toString() ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active"
          ? cat.isActive
          : !cat.isActive)

      return matchesSearch && matchesStatus
    })
  }, [ingredients, searchTerm, statusFilter])

  const ingredientStats = [
    { label: 'Total Ingredients', value: ingredients.length },
    { label: 'Active', value: ingredients.filter(i => i.isActive).length, color: 'text-emerald-400' },
    { label: 'Archived', value: ingredients.filter(i => !i.isActive).length, color: 'text-orange-400' },
  ]

  // Handlers
  const handleOpenModal = (type, data = null) => setModal({ isOpen: true, type, data })
  const handleCloseModal = () => setModal({ isOpen: false, type: null, data: null })

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Ingredients Management"
        description="Organize and manage your Ingredients."
        actionText="Add New Ingredients"
        onAction={() => handleOpenModal('form')}
        icon={Plus}
      />

      <PageStatsGrid stats={ingredientStats} />

      <PageFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search ingredients..."
      >
        {["all", "active", "inactive"].map((status) => (
          <FilterButton
            key={status}
            label={status}
            isActive={statusFilter === status}
            onClick={() => setStatusFilter(status)}
          />
        ))}
      </PageFilterBar>

      {/* TABLE */}
      <IngredientTable
        data={filteredData}
        isLoading={isLoading}
        onEdit={(item) => handleOpenModal('form', item)}
        onDelete={(item) => handleOpenModal('confirm', item)}
        onRestore={(item) => restoreIngredient(item.id)}
      />

      {/* MODALS */}
      <IngredientModal
        key={modal.data?.id ?? "new"}
        isOpen={modal.isOpen && modal.type === 'form'}
        onClose={handleCloseModal}
        initialData={modal.data}
        onSubmit={(payload) => {
          modal.data ? updateIngredient(modal.data.id, payload) : createIngredient(payload)
          handleCloseModal()
        }}
      />

      <ConfirmModal
        isOpen={modal.isOpen && modal.type === 'confirm'}
        onClose={handleCloseModal}
        onConfirm={() => {
          deleteIngredient(modal.data.id)
          handleCloseModal()
        }}
        title="Delete Ingredient"
        message={`Delete "${modal.data?.name}" permanently?`}
      />
    </div>
  )
}