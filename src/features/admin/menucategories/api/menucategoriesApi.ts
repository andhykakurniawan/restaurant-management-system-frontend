import api from "@/services/apiClient"
import {
  MenuCategories,
  MenuCategoriesCreate,
  MenuCategoriesUpdate,
} from "../type"

export const menucategoriesApi = {
  getAll: async (): Promise<MenuCategories[]> => {
    const res = await api.get("/menu-categories")

    return (res.data.data ?? []).map((item: any) => ({
      id: item.id,

      // Support camelCase + snake_case
      menuId: item.menuId ?? item.menu_id,
      categoryId: item.categoryId ?? item.category_id,

      // Optional naming dari backend
      menuName:
        item.menuName ??
        item.menu?.name ??
        "Unknown Menu",

      categoryName:
        item.categoryName ??
        item.category?.name ??
        "Unknown Category",

      // Include relasi menu supaya image muncul
      menu: item.menu
        ? {
          id: item.menu.id,
          name: item.menu.name,
          price: item.menu.price,
          image_url:
            item.menu.image_url ??
            item.menu.imageUrl ??
            null,
        }
        : undefined,

      // Include relasi category supaya filter stabil
      category: item.category
        ? {
          id: item.category.id,
          name: item.category.name,
        }
        : undefined,

      price: item.price ?? 0,

      isActive:
        item.isActive !== undefined
          ? Boolean(item.isActive)
          : item.is_active !== undefined
            ? Boolean(item.is_active)
            : false,

      createdAt:
        item.createdAt ??
        item.created_at ??
        null,

      updatedAt:
        item.updatedAt ??
        item.updated_at ??
        null,
    }))
  },

  create: async (
    payload: MenuCategoriesCreate
  ): Promise<MenuCategories> => {
    const res = await api.post("/menu-categories", payload)
    return res.data.data
  },

  update: async (
    id: string,
    payload: MenuCategoriesUpdate
  ): Promise<MenuCategories> => {
    const res = await api.patch(`/menu-categories/${id}`, payload)
    return res.data.data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/menu-categories/${id}`)
  },

  restore: async (id: string): Promise<void> => {
    await api.patch(`/menu-categories/${id}/restore`)
  },

  // MenuCategoriesApi.ts
  async getByMenuId(menuId: string) {
    const res = await api.get(`/menu-categories/menu/${menuId}`);
    return res.data.data
  }
}