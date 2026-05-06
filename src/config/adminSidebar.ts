import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  Settings,
  ShoppingCart,
  Wallet,
  BookCheck,
  Refrigerator,
  User,
} from "lucide-react";

export const adminSidebar = [
  {
    label: "Dashboard",
    shortLabel: "DB",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Categories",
    shortLabel: "CT",
    path: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Menu",
    shortLabel: "MN",
    path: "/admin/menus",
    icon: Utensils,
  },
  {
    label: "Ingredients",
    shortLabel: "ID",
    path: "/admin/ingredients",
    icon: Refrigerator,
  },
  {
    label: "Menu Book",
    shortLabel: "MI",
    path: "/admin/menucategories",
    icon: BookCheck,
  },
  {
    label: "Data Order",
    shortLabel: "DO",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Data Payments",
    shortLabel: "DP",
    path: "/admin/payments",
    icon: Wallet,
  },
  {
    label: "User Management",
    shortLabel: "UM",
    path: "/admin/users",
    icon: User,
  },
  {
    label: "Settings",
    shortLabel: "ST",
    path: "/admin/settings",
    icon: Settings,
  },
];