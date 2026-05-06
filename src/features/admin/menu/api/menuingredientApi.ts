import api from "@/services/apiClient"
import {
  MenuIngredient,
  MenuIngredientCreate,
  MenuIngredientUpdate,
} from "../type"

export const menuingredientApi = {
  getAll: async (): Promise<MenuIngredient[]> => {
    const res = await api.get("/menu-ingredients")

    return (res.data.data ?? []).map((item: any) => ({
      id: item.id,
      menuId: item.menuId ?? item.menu_id,
      ingredientId: item.ingredientId ?? item.ingredient_id,

      // IMPORTANT
      menuName: item.menuName,
      ingredientName: item.ingredientName,

      quantity: item.quantity,
      isActive: item.isActive ?? item.is_active ?? false,
    }))
  },

  create: async (
    payload: MenuIngredientCreate
  ): Promise<MenuIngredient> => {
    const res = await api.post("/menu-ingredients", payload)
    return res.data.data
  },

  update: async (
    id: string,
    payload: MenuIngredientUpdate
  ): Promise<MenuIngredient> => {
    const res = await api.put(`/menu-ingredients/${id}`, payload)
    return res.data.data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/menu-ingredients/${id}`)
  },

  restore: async (id: string): Promise<void> => {
    await api.patch(`/menu-ingredients/${id}/restore`)
  },

  // menuingredientApi.ts
  async getByMenuId(menuId: string) {
    const res = await api.get(`/menu-ingredients/menu/${menuId}`);
    return res.data.data
  }
}