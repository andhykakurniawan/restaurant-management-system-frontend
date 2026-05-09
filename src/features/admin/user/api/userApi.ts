import api from "@/services/apiClient";

import {
    User,
    UserCreate,
    UserUpdate
} from "../type";

export const userApi = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get("/users")

        return response.data.data.map((item: any) => ({
            id: item.id,
            email: item.email,
            password: item.password,
            username: item.username,
            role: item.role,
            
            isActive:
                item.isActive ??
                item.is_active ??
                item.is_Active,
        }));
    },
    create: async (userData: UserCreate): Promise<User> => {
        const response = await api.post("/users", userData);
        return response.data.data;
    },
    update: async (id: string, userData: UserUpdate): Promise<User> => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data.data;
    },
    remove: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
    restore: async (id: string): Promise<void> => {
        await api.post(`/users/${id}/restore`);
    },
};