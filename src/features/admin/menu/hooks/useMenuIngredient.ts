import { useEffect, useState } from "react"
import { menuingredientApi } from "../api/menuingredientApi"
import { ingredientApi } from "../../ingredient/api/ingredientApi"
import { Ingredient } from "../../ingredient/type"

import {
    MenuIngredient,
    MenuIngredientCreate,
    MenuIngredientUpdate,
} from "../type"

export function useMenuIngredient(menuId?: string) {
    const [menuingredients, setMenuIngredients] = useState<MenuIngredient[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // STEP 1: Selalu ambil semua master bahan buat isi dropdown
            // Ini gak boleh di-return walaupun menuId belum ada
            const ingRes = await ingredientApi.getAll();
            setIngredients(ingRes);

            // STEP 2: Baru cek menuId buat ambil data komposisi tabelnya
            if (menuId) {
                const mingRes = await menuingredientApi.getByMenuId(menuId);
                setMenuIngredients(mingRes);
            }
        } catch (error) {
            console.error("Error fetching composition:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [menuId])

    const createMenuIngredient = async (
        payload: MenuIngredientCreate
    ) => {
        await menuingredientApi.create(payload)
        await fetchData()
    }

    const updateMenuIngredient = async (
        id: string,
        payload: MenuIngredientUpdate
    ) => {
        await menuingredientApi.update(id, payload)
        await fetchData()

    }

    const deleteMenuIngredient = async (id: string) => {
        await menuingredientApi.remove(id)
        await fetchData()
    }

    const restoreMenuIngredient = async (id: string) => {
        await menuingredientApi.restore(id)
        await fetchData()
    }

    return {
        menuingredients,
        ingredients,
        isLoading,
        createMenuIngredient,
        updateMenuIngredient,
        deleteMenuIngredient,
        restoreMenuIngredient,
        refreshMenuIngredients: fetchData,
    }
}