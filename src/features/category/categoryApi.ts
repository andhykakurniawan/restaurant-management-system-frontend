import api from "@/services/apiClient"

export interface Category {
  id: string
  name: string
  description: string
  isActive: boolean
}

export const categoryApi = {
  getAll: () => api.get<Category[]>("/categories"),

  getById: (id: string) =>
    api.get<Category>(`/categories/${id}`),

  create: (data: { name: string; description: string }) =>
    api.post("/categories", data),

  delete: (id: string) =>
    api.delete(`/categories/${id}`),

  restore: (id: string) =>
    api.patch(`/categories/${id}/restore`)
}