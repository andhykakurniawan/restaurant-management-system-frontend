import { CustomerCartItem } from "../type";

export function getCartSubtotal(items: CustomerCartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getServiceCharge(subtotal: number): number {
  return Math.round(subtotal * 0.1);
}

export function getCartTotal(items: CustomerCartItem[]): number {
  const subtotal = getCartSubtotal(items);
  return subtotal + getServiceCharge(subtotal);
}
