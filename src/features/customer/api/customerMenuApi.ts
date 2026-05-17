import api from "@/services/apiClient";
import { CustomerMenuCategory, CustomerMenuItem } from "../type";

interface RawMenuCategory {
  id?: string | number;
  name?: string;
}

interface RawMenu {
  id?: string | number;
  name?: string;
  description?: string;
  price?: number | string;
  imageUrl?: string;
  image_url?: string;
  categoryId?: string | number;
  category_id?: string | number;
  categoryName?: string;
  category_name?: string;
  category?: RawMenuCategory;
  isAvailable?: boolean;
  is_available?: boolean;
  is_Available?: boolean;
  isActive?: boolean;
  is_active?: boolean;
  is_Active?: boolean;
}

interface MenuListResponse {
  data?: RawMenu[];
}

function normalizeMenu(item: RawMenu): CustomerMenuItem {
  const categoryId = item.categoryId ?? item.category_id ?? item.category?.id ?? "general";
  const categoryName = item.categoryName ?? item.category_name ?? item.category?.name ?? "General";

  return {
    id: String(item.id ?? crypto.randomUUID()),
    name: item.name ?? "Untitled Menu",
    description: item.description ?? "Curated Temu Rasa selection.",
    price: Number(item.price ?? 0),
    imageUrl: item.imageUrl ?? item.image_url ?? "",
    categoryId: String(categoryId),
    categoryName,
    isAvailable: item.isAvailable ?? item.is_available ?? item.is_Available ?? true,
    isActive: item.isActive ?? item.is_active ?? item.is_Active ?? true,
    tags: [categoryName],
  };
}

function deriveCategories(menus: CustomerMenuItem[]): CustomerMenuCategory[] {
  const categoryMap = new Map<string, CustomerMenuCategory>();

  menus.forEach((menu) => {
    categoryMap.set(menu.categoryId, {
      id: menu.categoryId,
      name: menu.categoryName,
    });
  });

  return Array.from(categoryMap.values());
}

export const customerMenuApi = {
  async getMenus(): Promise<CustomerMenuItem[]> {
    const res = await api.get<MenuListResponse | RawMenu[]>("/menus");
    const payload = Array.isArray(res.data) ? res.data : res.data.data ?? [];

    return payload.map(normalizeMenu).filter((menu) => menu.isActive);
  },

  async getMenuCategories(): Promise<CustomerMenuCategory[]> {
    const menus = await this.getMenus();
    return deriveCategories(menus);
  },
};
