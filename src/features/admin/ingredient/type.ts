export interface Ingredient{
    id: string
    name: string
    unit: string
    currentStock: number
    minimumStock: number
    costPerUnit: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface IngredientCreate{
    name: string
    unit: string
    currentStock: number
    minimumStock: number
    costPerUnit: number
}

export interface IngredientUpdate{
    id: string
    name: string
    unit: string
    currentStock: number
    minimumStock: number
    costPerUnit: number
}