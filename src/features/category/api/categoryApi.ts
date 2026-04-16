import api from "@/services/apiClient"

import {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../type"

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get("/categories")

    return res.data.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      isActive:
        item.isActive ??
        item.is_active ??
        item.is_Active,
    }))
  },

  create: async (
    payload: CreateCategoryPayload
  ): Promise<Category> => {
    const res = await api.post("/categories", payload)
    return res.data.data
  },

  update: async (
    id: string,
    payload: UpdateCategoryPayload
  ): Promise<Category> => {
    const res = await api.put(`/categories/${id}`, payload)
    return res.data.data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },

  restore: async (id: string): Promise<void> => {
    await api.patch(`/categories/${id}/restore`)
  },
}