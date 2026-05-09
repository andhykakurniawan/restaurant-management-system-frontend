import { useEffect, useState, useMemo } from "react";
import { shiftApi } from "../api/shiftApi";

import {
    Shift,
    ShiftCreate,
    ShiftUpdate,
} from "../type";

export const useShift = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchShifts = async () => {
        try {
            setIsLoading(true);

            const data = await shiftApi.getAll();

            setShifts(data);
        } catch (error) {
            console.error("Failed fetch shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchShifts();
    }, []);

    const filteredShifts = useMemo(() => {
        const search = searchTerm.toLowerCase();

        return shifts.filter((shift) => {

            const matchesSearch =
                (shift.shiftName ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (shift.startTime ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (shift.endTime ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (shift.graceMinutes ?? "")
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                (
                    statusFilter === "active"
                        ? shift.isActive
                        : !shift.isActive
                );

            return matchesSearch && matchesStatus;
        });

    }, [shifts, searchTerm, statusFilter]);

    const shiftStats = useMemo(() => {
        return [
            {
                label: "Total Users",
                value: shifts.length,
            },
            {
                label: "Active",
                value: shifts.filter(
                    (s) => s.isActive
                ).length,
                color: "text-emerald-400",
            },
            {
                label: "Archived",
                value: shifts.filter(
                    (s) => !s.isActive
                ).length,
                color: "text-orange-400",
            },
        ];
    }, [shifts]);

    const createShift = async (
        payload: ShiftCreate
    ) => {
        await shiftApi.create(payload);
        await fetchShifts();
    };

    const updateShift = async (
        id: string,
        payload: ShiftUpdate
    ) => {
        await shiftApi.update(id, payload);
        await fetchShifts();
    };

    const deleteShift = async (id: string) => {
        await shiftApi.remove(id);
        await fetchShifts();
    }

    const restoreShift = async (id: string) => {
        await shiftApi.restore(id);
        await fetchShifts();
    }

    return {
        shifts: filteredShifts,
        isLoading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        shiftStats,
        createShift,
        updateShift,
        deleteShift,
        restoreShift,
        refresh: fetchShifts,
    }
        
}