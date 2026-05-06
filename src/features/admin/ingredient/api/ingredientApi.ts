import api from "@/services/apiClient"

import {
    Ingredient,
    IngredientCreate,
    IngredientUpdate,
} from "../type"

export const ingredientApi = {
    getAll: async (): Promise<Ingredient[]> => {
        const res = await api.get("/ingredients")

        return res.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            unit: item.unit,

            currentStock:
                item.currentStock ??
                item.currentstock,

            minimumStock:
                item.minimumStock ??
                item.minimumstock,

            costPerUnit:
                item.costPerUnit ??
                item.costperunit,

            isActive:
                item.isActive ??
                item.is_active ??
                item.is_Active,
        }))
    },

    create: async (
        payload: IngredientCreate
    ): Promise<Ingredient> => {

        const res = await api.post("/ingredients", {
            name: payload.name,
            unit: payload.unit,
            currentstock: payload.currentStock,
            minimumstock: payload.minimumStock,
            costperunit: payload.costPerUnit,
        })

        return res.data.data
    },

    update: async (
        id: string,
        payload: IngredientUpdate
    ): Promise<Ingredient> => {
        const res = await api.put(`/ingredients/${id}`, payload)
        return res.data.data
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/ingredients/${id}`)
    },
    
    restore: async (id: string): Promise<void> => {
        await api.patch(`/ingredients/${id}/restore`)
    },
}