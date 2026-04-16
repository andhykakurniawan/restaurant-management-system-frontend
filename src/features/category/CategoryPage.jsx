import { useMemo, useState } from "react"
import CategoryTable from "./components/CategoryTable"
import CategoryModal from "./components/CategoryModal"
import { ConfirmModal } from "@/components/ui/modals"
import { useCategory } from "./hooks/useCategory"
import { Search, Filter, Plus } from "lucide-react"

export default function CategoryPage() {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    restoreCategory,
  } = useCategory()

  const [isModalOpen, setModalOpen] = useState(false)
  const [isConfirmOpen, setConfirmOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        (cat.name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active"
          ? cat.isActive
          : !cat.isActive)

      return matchesSearch && matchesStatus
    })
  }, [categories, searchTerm, statusFilter])

  const handleAdd = () => {
    setSelectedCategory(null)
    setModalOpen(true)
  }

  const handleEdit = (item) => {
    setSelectedCategory(item)
    setModalOpen(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedCategory(item)
    setConfirmOpen(true)
  }

  const handleSave = (payload) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id, payload)
    } else {
      createCategory(payload)
    }

    setModalOpen(false)
    setSelectedCategory(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedCategory) return

    deleteCategory(selectedCategory.id)

    setConfirmOpen(false)
    setSelectedCategory(null)
  }

  const handleRestore = (item) => {
    restoreCategory(item.id)
  }

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-temu-cream">
            Category Management<span className="text-temu-bronze">.</span>
          </h1>
          <p className="text-sm text-temu-coffee mt-1">
            Organize and manage your product menu collections.
          </p>
        </div>
        <button onClick={handleAdd} className="flex items-center justify-center gap-2 rounded-xl bg-temu-bronze px-6 py-3 text-sm font-bold text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/10">
          <Plus size={18} strokeWidth={3} />
          Add New Category
        </button>
      </div>
      {/* 2. Simple Stats Cards - Bikin halaman terasa "penuh" dan informatif */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Categories', value: categories.length, color: 'text-temu-cream' },
          { label: 'Active', value: categories.filter(c => c.isActive).length, color: 'text-emerald-400' },
          { label: 'Archived', value: categories.filter(c => !c.isActive).length, color: 'text-orange-400' },
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
            placeholder="Search categories..."
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
      <CategoryTable
        data={filteredData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onRestore={handleRestore}
      />

      {/* MODALS */}
      <CategoryModal
        key={selectedCategory?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedCategory}
        onSubmit={handleSave}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Delete "${selectedCategory?.name}" permanently?`}
      />
    </div>
  )
}