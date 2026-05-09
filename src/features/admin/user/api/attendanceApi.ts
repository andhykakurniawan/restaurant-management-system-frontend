import api from "@/services/apiClient"

import {
    Attendance,
    AttendanceCreate,
    AttendanceUpdate
} from "../type"

export const attendanceApi = {
    getAll: async (): Promise<Attendance[]> => {
        const response = await api.get("/attendances")
        // return response.data.data.map((item: any) => mapToAttendance(item));
        return response.data.data;
    },

    getToday: async (): Promise<Attendance[]> => {
        const response = await api.get("/attendances/today")
        // return response.data.data.map((item: any) => mapToAttendance(item));
        return response.data.data;
    },

    create: async (attendanceData: AttendanceCreate): Promise<Attendance> => {
        const response = await api.post("/attendances", attendanceData);
        return response.data.data;
    },

    update: async (id: string, attendanceData: AttendanceUpdate): Promise<Attendance> => {
        const response = await api.put(`/attendances/${id}`, attendanceData);
        return response.data.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/attendances/${id}`);
    },
};

// const mapToAttendance = (item: any) => ({
//     id: item.id,

//     userId:
//         item.userId ??
//         item.userid ??
//         item.user_id,

//     username:
//         item.username,

//     shiftId:
//         item.shiftId ??
//         item.shiftid ??
//         item.shift_id,

//     shiftName:
//         item.shiftName ??
//         item.shiftname ??
//         item.shift_name,

//     attendanceDate:
//         item.attendanceDate ??
//         item.attendancedate ??
//         item.attendance_date,

//     clockIn:
//         item.clockIn ??
//         item.clockin ??
//         item.clock_in,

//     clockOut:
//         item.clockOut ??
//         item.clockout ??
//         item.clock_out,

//     isActive:
//         item.isActive ??
//         item.is_active ??
//         item.is_Active,
// });