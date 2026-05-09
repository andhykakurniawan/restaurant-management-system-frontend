import api from "@/services/apiClient";

import {
    Shift,
    ShiftCreate,
    ShiftUpdate
} from "../type";

export const shiftApi = {
    getAll: async (): Promise<Shift[]> => {
        const response = await api.get("/shifts");
        return response.data.data.map((item: any) => ({
            id: item.id,

            startTime:
                item.starttime ??
                item.startTime ??
                item.start_time,

            endTime:
                item.endtime??
                item.endTime ??
                item.end_time,

            graceMinutes:
                item.graceminutes ??
                item.graceMinutes ??
                item.grace_minutes,

            shiftName:
                item.shiftname ??
                item.shiftName ??
                item.shift_name,

            isActive:
                item.isActive ??
                item.is_active ??
                item.is_Active,
        }))
    },
    create: async (shiftData: ShiftCreate): Promise<Shift> => {
        const response = await api.post("/shifts", shiftData);
        return response.data.data;
    },

    update: async (id: string, shiftData: ShiftUpdate): Promise<Shift> => {
        const response = await api.put(`/shifts/${id}`, shiftData);
        return response.data.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/shifts/${id}`);
    },

    restore: async (id: string): Promise<void> => {
        await api.post(`/shifts/${id}/restore`);
    },
};