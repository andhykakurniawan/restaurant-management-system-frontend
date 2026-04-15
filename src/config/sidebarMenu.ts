import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  Settings,
} from "lucide-react";

export const sidebarMenu = [
  {
    label: "Dashboard",
    shortLabel: "DB",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Categories",
    shortLabel: "CT",
    path: "/admin/categories",
    icon: FolderTree,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Manage Menu",
    shortLabel: "MN",
    path: "/admin/menu",
    icon: Utensils,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Settings",
    shortLabel: "ST",
    path: "/admin/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
];