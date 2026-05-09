import { useEffect, useState, useMemo } from "react";
import { attendanceApi } from "../api/attendanceApi";
import { shiftApi } from "../api/shiftApi";
import { userApi } from "../api/userApi";

import {
    Attendance,
    AttendanceCreate,
    AttendanceUpdate
} from "../type";

export const useAttendance = () => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [viewMode, setViewMode] = useState<"today" | "all">("today");
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchAttendances = async () => {
        setIsLoading(true);
        try {
            // Langsung tembak endpoint yang sesuai mode
            const data = viewMode === "today"
                ? await attendanceApi.getToday()
                : await attendanceApi.getAll();

            setAttendances(data);
        } catch (error) {
            console.error("Fetch Error:", error); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, [viewMode]);

    const filteredAttendances = useMemo(() => {
        const search = searchTerm.toLowerCase();

        return attendances.filter((attendance) => {

            const matchesSearch =
                (attendance.attendanceDate || "")
                    .toLowerCase()
                    .includes(search) ||

                (attendance.notes || "")
                    .toLowerCase()
                    .includes(search) ||

                (attendance.shiftName || "")
                    .toLowerCase()
                    .includes(search) ||

                (attendance.username || "")
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                (
                    statusFilter === "active"
                        ? attendance.isActive
                        : !attendance.isActive
                );

            return matchesSearch && matchesStatus;
        });

    }, [attendances, searchTerm, statusFilter]);

    const attendanceStats = useMemo(() => {
        return [
            {
                label: "Total Attendances",
                value: attendances.length,
            },
            {
                label: "Active",
                value: attendances.filter(
                    (a) => a.isActive
                ).length,
                color: "text-emerald-400",
            },
            {
                label: "Archived",
                value: attendances.filter(
                    (a) => !a.isActive
                ).length,
                color: "text-orange-400",
            },
        ];
    }, [attendances]);

    const createAttendance = async (
        payload: AttendanceCreate
    ) => {
        await attendanceApi.create(payload);
        await fetchAttendances();
    };

    const updateAttendance = async (
        id: string,
        payload: AttendanceUpdate
    ) => {
        await attendanceApi.update(id, payload);
        await fetchAttendances();
    };

    const deleteAttendance = async (id: string) => {
        await attendanceApi.remove(id);
        await fetchAttendances();
    }

    return {
        attendances,
        filteredAttendances,
        viewMode,
        setViewMode,
        isLoading,
        searchTerm,
        setSearchTerm,
        attendanceStats,
        statusFilter,
        setStatusFilter,
        createAttendance,
        updateAttendance,
        deleteAttendance,
        refresh: fetchAttendances
    };
}