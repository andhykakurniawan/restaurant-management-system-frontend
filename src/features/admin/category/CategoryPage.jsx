import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { useCategory } from "./hooks/useCategory"

// Import UI Components
import PageHeader from "@/components/ui/pages/PageHeader"
import PageStatsGrid from "@/components/ui/pages/PageStatsGrid"
import PageFilterBar from "@/components/ui/pages/PageFilterBar"
import FilterButton from "@/components/ui/pages/FilterButton"
import CategoryTable from "./components/CategoryTable"
import CategoryModal from "./components/CategoryModal"
import { ConfirmModal } from "@/components/ui/modals"

export default function CategoryPage() {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    restoreCategory
  } = useCategory()

  // State Management
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter Logic
  const filteredData = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = (cat.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? cat.isActive : !cat.isActive)
      return matchesSearch && matchesStatus
    })
  }, [categories, searchTerm, statusFilter])

  // Helper Stats
  const categoryStats = [
    { label: 'Total Categories', value: categories.length },
    { label: 'Active', value: categories.filter(c => c.isActive).length, color: 'text-emerald-400' },
    { label: 'Archived', value: categories.filter(c => !c.isActive).length, color: 'text-orange-400' },
  ]

  // Handlers
  const handleOpenModal = (type, data = null) => setModal({ isOpen: true, type, data })
  const handleCloseModal = () => setModal({ isOpen: false, type: null, data: null })

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">

      <PageHeader
        title="Category Management"
        description="Organize and manage your product menu collections."
        actionText="Add New Category"
        onAction={() => handleOpenModal('form')}
        icon={Plus}
      />

      <PageStatsGrid stats={categoryStats} />

      <PageFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search categories..."
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

      <CategoryTable
        data={filteredData}
        isLoading={isLoading}
        onEdit={(item) => handleOpenModal('form', item)}
        onDelete={(item) => handleOpenModal('confirm', item)}
        onRestore={(item) => restoreCategory(item.id)}
      />

      {/* MODALS */}
      <CategoryModal
        key={modal.data?.id ?? "new"}
        isOpen={modal.isOpen && modal.type === 'form'}
        onClose={handleCloseModal}
        initialData={modal.data}
        onSubmit={(payload) => {
          modal.data ? updateCategory(modal.data.id, payload) : createCategory(payload)
          handleCloseModal()
        }}
      />

      <ConfirmModal
        isOpen={modal.isOpen && modal.type === 'confirm'}
        onClose={handleCloseModal}
        onConfirm={() => {
          deleteCategory(modal.data.id)
          handleCloseModal()
        }}
        title="Delete Category"
        message={`Delete "${modal.data?.name}" permanently?`}
      />
    </div>
  )
}