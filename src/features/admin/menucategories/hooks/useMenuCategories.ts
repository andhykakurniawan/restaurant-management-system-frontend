import { useEffect, useState, useMemo } from "react";
import { menucategoriesApi } from "../api/menucategoriesApi";
import { categoryApi } from "../../category/api/categoryApi"
import { Category } from "../../category/type"
import { menuApi } from "../../menu/api/menuApi"
import { Menu } from "../../menu/type"

import {
    MenuCategories,
    MenuCategoriesCreate,
    MenuCategoriesUpdate
} from "../type";

export const useMenuCategories = () => {
    const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
    const [showDeleted, setShowDeleted] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const [catRes, menRes, bridgeRes] = await Promise.all([
                categoryApi.getAll(),
                menuApi.getAll(),
                menucategoriesApi.getAll()
            ]);

            // JOIN MANUAL menu_categories -> menus + categories
            const enriched = bridgeRes.map((item) => {
                const matchedMenu = menRes.find(
                    (m) => String(m.id) === String(item.menuId)
                );

                const matchedCategory = catRes.find(
                    (c) => String(c.id) === String(item.categoryId)
                );

                return {
                    ...item,

                    menu: matchedMenu
                        ? {
                            id: matchedMenu.id,
                            name: matchedMenu.name,
                            price: matchedMenu.price,
                            image_url:
                                matchedMenu.imageUrl ??
                                matchedMenu.imageUrl ??
                                "",
                        }
                        : undefined,

                    category: matchedCategory
                        ? {
                            id: matchedCategory.id,
                            name: matchedCategory.name,
                        }
                        : undefined,
                };
            });

            setCategories(catRes);
            setMenus(menRes);
            setMenuCategories(enriched);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Di dalam useMenuCategories.ts

    const filteredMenuCategories = useMemo(() => {

        if (!menuCategories.length) return [];

        let result = [...menuCategories];

        // FILTER ACTIVE / ARCHIVE
        result = result.filter(item =>
            showDeleted ? item.isActive === false : item.isActive !== false
        );

        // FILTER CATEGORY
        if (activeCategoryId !== "all") {
            result = result.filter(item => {
                const itemCatId =
                    item.categoryId ??
                    item.category?.id ??
                    item.category_id ??
                    null;
                return String(itemCatId) === String(activeCategoryId);
            });
        }
        return result;
    }, [menuCategories, activeCategoryId, showDeleted]);

    const createMenuCategories = async (
        payload: MenuCategoriesCreate
    ) => {
        await menucategoriesApi.create(payload)
        await fetchData()
    }

    const updateMenuCategories = async (
        id: string,
        payload: MenuCategoriesUpdate
    ) => {
        await menucategoriesApi.update(id, payload)
        await fetchData()

    }

    const handleInlineUpdate = async (id: string, field: string, value: any) => {
        // 1. Optimistic Update (UI berubah duluan biar gak lag)
        const oldData = [...menuCategories];
        setMenuCategories(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        try {
            await menucategoriesApi.update(id, { [field]: value });
        } catch (error) {
            // 2. Rollback kalau API gagal
            setMenuCategories(oldData);
            console.error("Update failed:", error);
        }
    };

    const deleteMenuCategories = async (id: string) => {
        await menucategoriesApi.remove(id)
        await fetchData()
    }

    const restoreMenuCategories = async (id: string) => {
        await menucategoriesApi.restore(id)
        await fetchData()
    }

    return {
        menuCategories: filteredMenuCategories,
        allRawData: menuCategories,
        categories,
        menus,
        isLoading,
        activeCategoryId,
        setActiveCategoryId,
        showDeleted,
        setShowDeleted,
        handleInlineUpdate,
        createMenuCategories,
        updateMenuCategories,
        deleteMenuCategories,
        restoreMenuCategories,
        refreshMenuCategories: fetchData,
    }
}