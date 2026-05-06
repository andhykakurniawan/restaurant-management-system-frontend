import React, { useState } from 'react'
import { Plus } from "lucide-react"
import { useMenuCategories } from './hooks/useMenuCategories'

// Import UI Components
import PageHeader from "@/components/ui/pages/PageHeader"
import MenuBookStats from './components/MenuBookStats'
import MenuBookFilter from './components/MenuBookFilter'
import MenuBookTable from './components/MenuBookTable'
import MenuBookForm from './components/MenuBookForm'
import MenuBookGrid from './components/MenuBookGrid'
import { BaseModal } from "@/components/ui/modals"

const MenuBookPage = () => {

  const {
    menuCategories,
    categories,
    menus,
    isLoading,
    showDeleted,
    setShowDeleted,
    createMenuCategories,
    activeCategoryId,
    setActiveCategoryId,
    handleInlineUpdate,
    deleteMenuCategories,
    restoreMenuCategories,
  } = useMenuCategories();

  const [modal, setModal] = useState({ isOpen: false, type: null, data: null })
  const totalRelations = menuCategories.length
  const activePromos = menuCategories.filter(item => item.discountPercentage > 0).length;
  const inactiveMenus = menuCategories.filter(item => !item.isActive).length
  const handleOpenModal = (type, data = null) => setModal({ isOpen: true, type, data })
  const handleCloseModal = () => setModal({ isOpen: false, type: null, data: null })

  return (
    <div className="p-6 lg:p-10 space-y-10 min-h-screen">
      <PageHeader
        title="Book Menu Management"
        description="Organize and manage your book menu collections."
        actionText="Add Menu Book Data"
        onAction={() => handleOpenModal('form')}
        icon={Plus}
      />

      {/* 2. STATS SECTION */}
      <MenuBookStats
        totalRelations={totalRelations}
        activePromos={activePromos}
        unassignedMenus={inactiveMenus}
      />

      {/* 3. FILTER & TABLE SECTION */}
      <div className="space-y-6">
        <MenuBookFilter
          categories={categories}
          menuCategories={menuCategories}
          activeCategory={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
          showDeleted={showDeleted}
          onToggleDeleted={() => setShowDeleted(!showDeleted)}
        />

        <MenuBookGrid
          data={menuCategories}
          menus={menus}
          loading={isLoading}
          showDeleted={showDeleted}
          onUpdate={handleInlineUpdate}
          onDelete={deleteMenuCategories}
          onRestore={restoreMenuCategories}
        />
      </div>

      {/* 4. ASSIGN MODAL */}
      <BaseModal
        isOpen={modal.isOpen && modal.type === 'form'}
        onClose={handleCloseModal}
        title="Assign Menu"
      >
        <MenuBookForm
          menus={menus}
          categories={categories}
          onCreate={createMenuCategories} // Dari hook lu
          onClose={handleCloseModal}
          onDelete={deleteMenuCategories}
        />
      </BaseModal>

    </div>
  );
};

export default MenuBookPage;