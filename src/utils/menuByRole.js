import { adminSidebar } from "@/config/adminSidebar";
import { waiterSidebar } from "@/config/waiterSidebar";
import { cashierSidebar } from "@/config/cashierSidebar";
import { kitchenSidebar } from "@/config/kitchenSidebar";
import { warehouseSidebar } from "@/config/warehouseSidebar";

export const menuByRole = {
    SUPER_ADMIN: adminSidebar,
    ADMIN: adminSidebar,
    WAITER: waiterSidebar,
    CASHIER: cashierSidebar,
    KITCHEN: kitchenSidebar,
    WAREHOUSE_MANAGER: warehouseSidebar,
};