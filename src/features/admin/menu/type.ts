export interface Menu {
    id: string
    name: string
    description: string
    price: number
    categoryId: number
    imageUrl: string
    isAvailable: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    menuIngredients: MenuIngredient[];
}

export interface MenuIngredient {
    id: string
    ingredientId: number
    quantity: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    ingredient?: { name: string };
}

export interface MenuCreate {
    name: string
    description: string
    price: number
    imageUrl: string
    isAvailable: boolean
    categoryId: number
}

export interface MenuUpdate {
    name: string
    description: string
    price: number
    imageUrl: string
    isAvailable: boolean
    categoryId: number
}

export interface MenuIngredientCreate {
    menuId: number
    ingredientId: number
    quantity: number
}

export interface MenuIngredientUpdate {
    menuId: number
    ingredientId: number
    quantity: number
}