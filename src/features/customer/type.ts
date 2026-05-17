export interface CustomerMenuCategory {
  id: string;
  name: string;
}

export interface CustomerMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  isAvailable: boolean;
  isActive: boolean;
  tags: string[];
  badge?: "Popular" | "New" | "Signature";
}

export interface CustomerMenuState {
  menus: CustomerMenuItem[];
  categories: CustomerMenuCategory[];
  isLoading: boolean;
  errorMessage: string | null;
  isUsingFallback: boolean;
}

export interface ReservationTable {
  id: string;
  label: string;
  area: string;
  capacity: number;
  status: "available" | "selected" | "occupied";
  shape: "round" | "wide" | "bar";
}

export interface ReservationDraft {
  date: string;
  time: string;
  guestCount: number;
  tableId: string;
  customerName: string;
  email: string;
  specialRequest: string;
}

export interface CustomerCartItem {
  menuId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  note: string;
}
