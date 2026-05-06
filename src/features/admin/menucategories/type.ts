export interface Menu {
    id: string; // UUID
    name: string;
    description: string;
    price: number;

    // Database lu pakai snake_case
    category_id: string;
    image_url: string;

    // Frontend mungkin pakai camelCase (opsional)
    categoryId?: string;
    imageUrl?: string;

    is_available: boolean; // Sesuai is_available di DB
    is_active: boolean;    // Sesuai is_active di DB

    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string; // UUID
    name: string;
    description?: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface MenuCategories {
    isActive: boolean;
    id: string; // ID dari tabel menu_categories
    price: number; // Harga khusus di kategori ini
    discountPercentage?: number;
    
    // Foreign Keys
    menu_id: string;
    category_id: string;
    
    // Mapping camelCase dari Spring Boot (biasanya otomatis)
    menuId?: string;
    categoryId?: string;
    
    is_active: boolean;
    createdAt: string;
    updatedAt: string;

    // DATA HASIL JOIN (Paling Penting!)
    // Ini yang lu akses di Card: item.menu.image_url
    menu?: {
        id: string;
        name: string;
        price: number;
        image_url: string;
        imageUrl?: string;
    };

    category?: {
        id: string;
        name: string;
    };
}

export interface MenuCategoriesCreate {
    menuId: string;
    categoryId: string;
    price: number;
}

export interface MenuCategoriesUpdate {
    menuId?: string;
    categoryId?: string;
    price?: number;
    isActive?: boolean;
}