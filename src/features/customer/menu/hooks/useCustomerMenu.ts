import { useEffect, useMemo, useState } from "react";
import { customerMenuApi } from "../../api/customerMenuApi";
import { CustomerMenuItem, CustomerMenuState } from "../../type";
import { customerMenuCategoriesMock, customerMenusMock } from "../data/menu.mock";

function deriveCategories(menus: CustomerMenuItem[]) {
  const categoryMap = new Map<string, { id: string; name: string }>();

  menus.forEach((menu) => {
    categoryMap.set(menu.categoryId, {
      id: menu.categoryId,
      name: menu.categoryName,
    });
  });

  return Array.from(categoryMap.values());
}

export function useCustomerMenu(): CustomerMenuState {
  const [menus, setMenus] = useState<CustomerMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchMenus() {
      try {
        setIsLoading(true);
        const data = await customerMenuApi.getMenus();

        if (!isMounted) return;

        setMenus(data.length ? data : customerMenusMock);
        setIsUsingFallback(!data.length);
      } catch {
        if (!isMounted) return;

        setMenus(customerMenusMock);
        setErrorMessage("Live menu belum tersedia. Menampilkan curated preview.");
        setIsUsingFallback(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchMenus();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const derived = deriveCategories(menus);
    return derived.length ? derived : customerMenuCategoriesMock;
  }, [menus]);

  return {
    menus,
    categories,
    isLoading,
    errorMessage,
    isUsingFallback,
  };
}
