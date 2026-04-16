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