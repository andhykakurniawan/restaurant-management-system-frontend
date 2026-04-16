import { useEffect, useState } from "react"

import { categoryApi } from "../api/categoryApi"

import {
    Category,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from "../type"

export function useCategory() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCategories = async () => {
        try {
            setIsLoading(true)

            const data = await categoryApi.getAll()
            setCategories(data)

        } catch (error) {
            console.error("Failed to fetch categories", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createCategory = async (
        payload: CreateCategoryPayload
    ) => {
        await categoryApi.create(payload)
        await fetchCategories()
    }

    const updateCategory = async (
        id: string,
        payload: UpdateCategoryPayload
    ) => {
        await categoryApi.update(id, payload)
        await fetchCategories()
    }

    const deleteCategory = async (id: string) => {
        await categoryApi.remove(id)
        await fetchCategories()
    }

    const restoreCategory = async (id: string) => {
        await categoryApi.restore(id)
        await fetchCategories()
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return {
        categories,
        isLoading,
        createCategory,
        updateCategory,
        deleteCategory,
        restoreCategory,
        refreshCategories: fetchCategories,
    }
}