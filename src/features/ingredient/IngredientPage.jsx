import { useMemo, useState } from "react"
import IngredientTable from "./components/IngredientTable"
import IngredientModal from "./components/IngredientModal"
import { ConfirmModal } from "@/components/ui/modals"
import { useIngredient } from "./hooks/useIngredient"
import { Search, Filter, Plus } from "lucide-react"

export default function IngredientPage() {
  const {
    ingredients,
    isLoading,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    restoreIngredient,
  } = useIngredient()

  const [isModalOpen, setModalOpen] = useState(false)
  const [isConfirmOpen, setConfirmOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)

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

  const handleAdd = () => {
    setSelectedIngredient(null)
    setModalOpen(true)
  }

  const handleEdit = (item) => {
    setSelectedIngredient(item)
    setModalOpen(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedIngredient(item)
    setConfirmOpen(true)
  }

  const handleSave = (payload) => {
    if (selectedIngredient) {
      updateIngredient(selectedIngredient.id, payload)
    } else {
      createIngredient(payload)
    }

    setModalOpen(false)
    setSelectedIngredient(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedIngredient) return

    deleteIngredient(selectedIngredient.id)

    setConfirmOpen(false)
    setSelectedIngredient(null)
  }

  const handleRestore = (item) => {
    restoreIngredient(item.id)
  }

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-temu-cream">
            Ingredient Management<span className="text-temu-bronze">.</span>
          </h1>
          <p className="text-sm text-temu-coffee mt-1">
            Organize and manage your product menu collections.
          </p>
        </div>
        <button onClick={handleAdd} className="flex items-center justify-center gap-2 rounded-xl bg-temu-bronze px-6 py-3 text-sm font-bold text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/10">
          <Plus size={18} strokeWidth={3} />
          Add New Ingredient
        </button>
      </div>
      {/* 2. Simple Stats Cards - Bikin halaman terasa "penuh" dan informatif */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Ingredients', value: ingredients.length, color: 'text-temu-cream' },
          { label: 'Active', value: ingredients.filter(i => i.isActive).length, color: 'text-emerald-400' },
          { label: 'Archived', value: ingredients.filter(i => !i.isActive).length, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-temu-charcoal/30 border border-white/5 p-5 rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-temu-coffee">{stat.label}</p>
            <p className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-temu-charcoal/20 p-4 rounded-2xl border border-white/5">
        {/* SEARCH */}
        <div className="relative w-full md:max-w-md group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-temu-coffee group-focus-within:text-temu-bronze transition"
            size={18}
          />

          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-temu-darker border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-temu-cream focus:outline-none focus:border-temu-bronze/50"
          />
        </div>

        {/* FILTER BUTTON GROUP */}
        <div className="flex items-center gap-2">

          {["all", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all tracking-wider uppercase
                        ${statusFilter === status
                  ? "bg-temu-bronze text-temu-darker"
                  : "bg-white/5 text-temu-coffee hover:text-temu-cream hover:bg-white/10"
                }
        
        `}
            >
              {status}
            </button>
          ))}

        </div>
      </div>

      {/* TABLE */}
      <IngredientTable
        data={filteredData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onRestore={handleRestore}
      />

      {/* MODALS */}
      <IngredientModal
        key={selectedIngredient?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedIngredient}
        onSubmit={handleSave}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Ingredient"
        message={`Delete "${selectedIngredient?.name}" permanently?`}
      />
    </div>
  )
}