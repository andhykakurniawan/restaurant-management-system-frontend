import { useMemo, useState } from "react";
import { CustomerCartItem, CustomerMenuItem } from "../../type";
import { getCartSubtotal, getCartTotal, getServiceCharge } from "../../utils/cart";

export function useCart() {
  const [items, setItems] = useState<CustomerCartItem[]>([]);

  function setItemQuantity(menu: CustomerMenuItem, quantity: number) {
    setItems((current) => {
      const existing = current.find((item) => item.menuId === menu.id);

      if (quantity <= 0) {
        return current.filter((item) => item.menuId !== menu.id);
      }

      if (!existing) {
        return [
          ...current,
          {
            menuId: menu.id,
            name: menu.name,
            price: menu.price,
            imageUrl: menu.imageUrl,
            quantity,
            note: "",
          },
        ];
      }

      return current.map((item) =>
        item.menuId === menu.id ? { ...item, quantity } : item,
      );
    });
  }

  function updateItemNote(menuId: string, note: string) {
    setItems((current) =>
      current.map((item) => (item.menuId === menuId ? { ...item, note } : item)),
    );
  }

  function removeItem(menuId: string) {
    setItems((current) => current.filter((item) => item.menuId !== menuId));
  }

  function getQuantity(menuId: string) {
    return items.find((item) => item.menuId === menuId)?.quantity ?? 0;
  }

  const totals = useMemo(() => {
    const subtotal = getCartSubtotal(items);
    const serviceCharge = getServiceCharge(subtotal);
    const total = getCartTotal(items);

    return { subtotal, serviceCharge, total };
  }, [items]);

  return {
    items,
    totals,
    getQuantity,
    setItemQuantity,
    updateItemNote,
    removeItem,
  };
}
