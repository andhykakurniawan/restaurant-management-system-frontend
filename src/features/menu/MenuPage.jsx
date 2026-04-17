import { useMemo, useState } from "react"
import MenuTable from "./components/MenuTable"
import MenuModal from "./components/MenuModal" // Un-comment ini
import MenuDetail from "./components/MenuDetail" // Import detail modal baru
import { ConfirmModal } from "@/components/ui/modals"
import { useMenu } from "./hooks/useMenu"
import { Search, Plus } from "lucide-react"
import toast from "react-hot-toast"

export default function MenuPage() {
  const {
    menus,
    categories, // Ambil categories dari hook useMenu
    isLoading,
    createMenu,
    updateMenu,
    deleteMenu,
    restoreMenu,
    fetchMenus,
  } = useMenu()

  // State Management
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDetailOpen, setDetailOpen] = useState(false) // State untuk detail
  const [isConfirmOpen, setConfirmOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter Logic
  const filteredData = useMemo(() => {
    return menus.filter((menu) => {
      const searchStr = searchTerm.toLowerCase()
      const matchesSearch =
        menu.name?.toLowerCase().includes(searchStr) ||
        menu.description?.toLowerCase().includes(searchStr) ||
        menu.price?.toString().includes(searchStr)

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? menu.isActive : !menu.isActive)

      return matchesSearch && matchesStatus
    })
  }, [menus, searchTerm, statusFilter])

  // Handlers
  const handleAdd = () => {
    setSelectedMenu(null)
    setModalOpen(true)
  }

  const handleEdit = (item) => {
    setSelectedMenu(item)
    setModalOpen(true)
  }

  const handleViewDetail = (item) => {
    setSelectedMenu(item)
    setDetailOpen(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedMenu(item)
    setConfirmOpen(true)
  }

  const handleSave = async (payload) => {
    // PROTEKSI: Pastikan isAvailable & isActive tidak null/undefined
    const sanitizedPayload = {
      ...payload,
      // Jika null atau undefined, paksa jadi true
      isAvailable: payload.isAvailable ?? true,
    }

    console.log("Payload yang dikirim ke Service:", sanitizedPayload);

    try {
      if (selectedMenu) {
        await updateMenu(selectedMenu.id, sanitizedPayload)
      } else {
        await createMenu(sanitizedPayload)
      }
      setModalOpen(false)
      setSelectedMenu(null)
      // Jangan lupa panggil fungsi fetch data lu di sini biar tabel update otomatis
      // fetchMenus() 
    } catch (error) {
      console.error("Gagal menyimpan menu:", error)
    }
  }

  const handleUpdateRecipe = async (menuId, newRecipe) => {
    try {
      // Karena ini real-time, lu bisa panggil API add/delete di sini
      // Atau jika lu kirim sekaligus saat "Save" di Modal:
      await updateMenu(menuId, { menuIngredients: newRecipe });

      await fetchMenus(); // Refresh data biar detailnya update
      toast.success("Recipe updated!");
    } catch (error) {
      console.error("Gagal update resep:", error);
    }
  };

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">
      {/* 1. Header & Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-temu-cream">
            Menu Management<span className="text-temu-bronze">.</span>
          </h1>
          <p className="text-sm text-temu-coffee mt-1">
            Organize and manage your restaurant menu collections.
          </p>
        </div>
        <button onClick={handleAdd} className="flex items-center justify-center gap-2 rounded-xl bg-temu-bronze px-6 py-3 text-sm font-bold text-temu-darker transition hover:opacity-90 active:scale-95 shadow-lg shadow-temu-bronze/10">
          <Plus size={18} strokeWidth={3} />
          Add New Menu Item
        </button>
      </div>

      {/* 2. Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Menu Items', value: menus.length, color: 'text-temu-cream' },
          { label: 'Active', value: menus.filter(m => m.isActive).length, color: 'text-emerald-400' },
          { label: 'Archived', value: menus.filter(m => !m.isActive).length, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#141312] border border-white/5 p-6 rounded-4xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-temu-coffee">{stat.label}</p>
            <p className={`text-4xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-temu-bronze transition" size={18} />
          <input
            type="text"
            placeholder="Search menu name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d0c0b] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-temu-cream focus:outline-none focus:border-temu-bronze/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 p-1 bg-[#0d0c0b] rounded-2xl border border-white/5">
          {["all", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all tracking-widest uppercase
                ${statusFilter === status ? "bg-temu-bronze text-temu-darker" : "text-zinc-500 hover:text-white"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table - Pastikan lempar category dan onView */}
      <MenuTable
        data={filteredData}
        category={categories} // Lempar categories ke table untuk mapping name
        isLoading={isLoading}
        onEdit={handleEdit}
        onView={handleViewDetail} // Lempar handler view detail
        onDelete={handleDeleteClick}
        onRestore={(item) => restoreMenu(item.id)}
      />

      {/* 5. Modals Section */}
      <MenuModal
        key={selectedMenu?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories} // Lempar categories ke modal untuk select option
        initialData={selectedMenu}
        onSubmit={handleSave}
      />

      <MenuDetail
        isOpen={isDetailOpen}
        onClose={() => setDetailOpen(false)}
        menu={selectedMenu} // Membawa data menu + array resep
        onUpdateRecipe={handleUpdateRecipe} // Fungsi untuk simpan perubahan ke DB
        categoryName={categories.find(c => c.id === selectedMenu?.categoryId)?.name}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteMenu(selectedMenu.id)
          setConfirmOpen(false)
        }}
        title="Archive Menu Item"
        message={`Are you sure you want to archive "${selectedMenu?.name}"? This item won't be visible to customers.`}
      />
    </div>
  )
}