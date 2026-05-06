import { useMemo, useState } from "react"
import { Search, Plus } from "lucide-react"
import { useMenu } from "./hooks/useMenu"

// Import UI Compon
import PageHeader from "@/components/ui/pages/PageHeader"
import PageStatsGrid from "@/components/ui/pages/PageStatsGrid"
import PageFilterBar from "@/components/ui/pages/PageFilterBar"
import FilterButton from "@/components/ui/pages/FilterButton"
import MenuTable from "./components/MenuTable"
import MenuModal from "./components/MenuModal"
import MenuDetail from "./components/MenuDetail"
import { ConfirmModal } from "@/components/ui/modals"


export default function MenuPage() {
  const {
    menus,
    categories, // Ambil categories dari hook useMenu
    isLoading,
    createMenu,
    updateMenu,
    deleteMenu,
    restoreMenu,
  } = useMenu()

  // State Management
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null })
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

  const menuStats = [
    { label: 'Total Menu Items', value: menus.length },
    { label: 'Active', value: menus.filter(m => m.isActive).length, color: 'text-emerald-400' },
    { label: 'Archived', value: menus.filter(m => !m.isActive).length, color: 'text-orange-400' },
  ]

  const handleOpenModal = (type, data = null) => setModal({ isOpen: true, type, data })
  const handleCloseModal = () => setModal({ isOpen: false, type: null, data: null })

  return (
    <div className="p-8 md:p-10 space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Menu Management"
        description="Organize and manage your product menu collections."
        actionText="Add New Menu Item"
        onAction={() => handleOpenModal('form')}
        icon={Plus}
      />

      <PageStatsGrid stats={menuStats} />

      <PageFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search menu name..."
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

      <MenuTable
        data={filteredData}
        category={categories}
        isLoading={isLoading}
        onEdit={(item) => handleOpenModal('form', item)}
        onView={(item) => handleOpenModal('view', item)}
        onDelete={(item) => handleOpenModal('confirm', item)}
        onRestore={(item) => restoreMenu(item.id)}
      />

      <MenuModal
        key={modal.data?.id ?? "new"}
        isOpen={modal.isOpen && modal.type === 'form'}
        onClose={handleCloseModal}
        categories={categories}
        initialData={modal.data}
        onSubmit={(payload) => {
          modal.data ? updateMenu(modal.data.id, payload) : createMenu(payload)
          handleCloseModal()
        }}
      />

      <MenuDetail
        isOpen={modal.isOpen && modal.type === 'view'}
        onClose={handleCloseModal}
        menu={modal.data}
        // onUpdateRecipe={handleUpdateRecipe}
        categoryName={categories.find(c => c.id === modal.data?.categoryId)?.name}
      />

      <ConfirmModal
        isOpen={modal.isOpen && modal.type === 'confirm'}
        onClose={handleCloseModal}
        onConfirm={() => {
          deleteMenu(modal.data.id)
          handleCloseModal()
        }}
        title="Delete Menu Item"
        message={`Delete "${modal.data?.name}" permanently?`}
      />
    </div>
  )
}