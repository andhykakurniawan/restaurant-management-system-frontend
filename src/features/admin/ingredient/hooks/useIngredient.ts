import { useEffect, useState } from "react"

import { ingredientApi } from "../api/ingredientApi"

import {
    Ingredient,
    IngredientCreate,
    IngredientUpdate,
} from "../type"

export function useIngredient() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchIngredients = async () => {
        try {
            setIsLoading(true)

            const data = await ingredientApi.getAll()
            setIngredients(data)

        } catch (error) {
            console.error("Failed to fetch ingredients", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createIngredient = async (
        payload: IngredientCreate
    ) => {
        await ingredientApi.create(payload)
        await fetchIngredients()
    }

    const updateIngredient = async (
        id: string,
        payload: IngredientUpdate
    ) => {
        await ingredientApi.update(id, payload)
        await fetchIngredients()
    }

    const deleteIngredient = async (id: string) => {
        await ingredientApi.remove(id)
        await fetchIngredients()
    }

    const restoreIngredient = async (id: string) => {
        await ingredientApi.restore(id)
        await fetchIngredients()
    }

    useEffect(() => {
        fetchIngredients()
    }, [])

    return {
        ingredients,
        isLoading,
        createIngredient,
        updateIngredient,
        deleteIngredient,
        restoreIngredient,
        refreshIngredients: fetchIngredients,
    }
}