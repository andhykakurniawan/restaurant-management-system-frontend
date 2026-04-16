import { useEffect, useState } from "react"
import { menuApi } from "../api/menuApi"
import { categoryApi } from "../../category/api/categoryApi"
import { Category } from "../../category/type" // Pastikan import type Category

import {
    Menu,
    MenuCreate,
    MenuUpdate,
} from "../type"

export function useMenu() {
    const [menus, setMenus] = useState<Menu[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchMenus = async () => {
        setIsLoading(true)
        try {
            // Paralel fetch biar ngebut
            const [menuRes, catRes] = await Promise.all([
                menuApi.getAll(),
                categoryApi.getAll()
            ])
            setMenus(menuRes)
            setCategories(catRes)
        } catch (error) {
            console.error("Error fetching menu data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Jalankan sekali pas mount
    useEffect(() => {
        fetchMenus()
    }, [])

    const createMenu = async (payload: MenuCreate) => {
        await menuApi.create(payload)
        await fetchMenus()
    }

    const updateMenu = async (id: string, payload: MenuUpdate) => {
        await menuApi.update(id, payload)
        await fetchMenus()
    }

    const deleteMenu = async (id: string) => {
        await menuApi.remove(id)
        await fetchMenus()
    }

    const restoreMenu = async (id: string) => {
        await menuApi.restore(id)
        await fetchMenus()
    }

    return {
        menus,
        categories, // <--- INI WAJIB ADA biar modal bisa baca kategori
        isLoading,
        createMenu,
        updateMenu,
        deleteMenu,
        restoreMenu,
        refreshMenus: fetchMenus,
    }
}