import api from "@/services/apiClient"

import {
    Menu,
    MenuCreate,
    MenuUpdate,
    MenuIngredientCreate,
    MenuIngredientUpdate
} from "../type"

export const menuApi = {
    getAll: async (): Promise<Menu[]> => {
        const res = await api.get("/menus")

        return res.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl:
                item.image_url ??
                item.imageUrl,
            categoryId:
                item.category_id ??
                item.categoryId,
            isAvailable:
                item.isAvailable ??
                item.is_available ??
                item.is_Available,
            isActive:
                item.isActive ??
                item.is_active ??
                item.is_Active,
        }))
    },

    create: async (
        payload: MenuCreate
    ): Promise<Menu> => {
        const res = await api.post("/menus", {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            imageUrl: payload.imageUrl,
            categoryId: payload.categoryId,
            isAvailable: payload.isAvailable,
        })
        return res.data.data
    },

    update: async (
        id: string,
        payload: MenuUpdate
    ): Promise<Menu> => {
        const res = await api.put(`/menus/${id}`, payload)
        return res.data.data
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/menus/${id}`)
    },

    restore: async (id: string): Promise<void> => {
        await api.patch(`/menus/${id}/restore`)
    },
}