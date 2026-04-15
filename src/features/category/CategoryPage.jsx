import { useEffect, useState } from "react"
import CategoryTable from "./CategoryTable"
import { categoryApi } from "./categoryApi"
import CategoryModal from "./CategoryModal"
import { Plus, ListFilter, Search } from "lucide-react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [modalOpen, setModalOpen] = useState(false);

  const filteredCategories = categories.filter(cat => {

    const matchesFilter =
      filter === "ALL" ||
      (filter === "ACTIVE" && cat.isActive) ||
      (filter === "INACTIVE" && !cat.isActive)

    const matchesSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchInput])

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll()

      const normalized = res.data.data.map(cat => ({
        ...cat,
        isActive: cat.isActive ?? cat.is_Active ?? cat.is_active
      }))

      setCategories(normalized)

    } catch (err) {
      console.error("Failed to fetch categories", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to archive this category?"
    )

    if (!confirmed) return

    try {
      await categoryApi.delete(id)
      fetchCategories()
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const handleRestore = async (id) => {

    const confirmed = window.confirm(
      "Restore this category?"
    )

    if (!confirmed) return

    try {
      await categoryApi.restore(id)
      fetchCategories()
    } catch (err) {
      console.error("Restore failed", err)
    }
  }

  if (loading) {
    return <p className="p-4">Loading categories...</p>
  }

  const handleCreate = async (payload) => {
    try {
      await categoryApi.create(payload);
      fetchCategories();
      setModalOpen(false);
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-400 mx-auto">
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

        <button className="flex items-center justify-center gap-2 rounded-xl bg-temu-bronze px-6 py-3 text-sm font-bold text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/10"
          onClick={() => setModalOpen(true)}>
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
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-temu-coffee group-focus-within:text-temu-bronze transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-temu-darker border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-temu-cream focus:outline-none focus:border-temu-bronze/50 transition-all"
          />
        </div>

        <div className="flex gap-2">

          {["ALL", "ACTIVE", "INACTIVE"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${filter === type
                ? "bg-temu-bronze text-temu-darker"
                : "border border-white/10 text-temu-coffee hover:text-temu-cream"
                }`}
            >
              {type}
            </button>
          ))}

        </div>
      </div>

      {/* 4. The Table */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CategoryTable
          categories={filteredCategories}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
        <CategoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  )
}