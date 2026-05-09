import { useEffect, useState, useMemo } from "react";
import { userApi } from "../api/userApi";

import {
    User,
    UserCreate,
    UserUpdate,
} from "../type";

export const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchUsers = async () => {
        try {
            setIsLoading(true);

            const data = await userApi.getAll();

            setUsers(data);
        } catch (error) {
            console.error("Failed fetch users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const search = searchTerm.toLowerCase();

        return users.filter((user) => {

            const matchesSearch =
                (user.username ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (user.email ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (user.role ?? "")
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                (
                    statusFilter === "active"
                        ? user.isActive
                        : !user.isActive
                );

            return matchesSearch && matchesStatus;
        });

    }, [users, searchTerm, statusFilter]);

    const userStats = useMemo(() => {
        return [
            {
                label: "Total Users",
                value: users.length,
            },
            {
                label: "Active",
                value: users.filter(
                    (u) => u.isActive
                ).length,
                color: "text-emerald-400",
            },
            {
                label: "Archived",
                value: users.filter(
                    (u) => !u.isActive
                ).length,
                color: "text-orange-400",
            },
        ];
    }, [users]);

    const createUser = async (
        payload: UserCreate
    ) => {
        await userApi.create(payload);
        await fetchUsers();
    };

    const updateUser = async (
        id: string,
        payload: UserUpdate
    ) => {
        await userApi.update(id, payload);
        await fetchUsers();
    };

    const deleteUser = async (id: string) => {
        await userApi.remove(id);
        await fetchUsers();
    }

    const restoreUser = async (id: string) => {
        await userApi.restore(id);
        await fetchUsers();
    }

    return {
        users: filteredUsers,
        isLoading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        userStats,
        createUser,
        updateUser,
        deleteUser,
        restoreUser,
        refresh: fetchUsers
    };
}