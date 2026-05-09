import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboardPage from "@/features/admin/dashboard/pages/AdminDashboardPage";
import SettingPage from "@/pages/SettingPage";
import CategoryPage from "@/features/admin/category/CategoryPage";
import MenuPage from "@/features/admin/menu/MenuPage";
import IngredientPage from "@/features/admin/ingredient/IngredientPage";
import MenuBookPage from "@/features/admin/menucategories/MenuBookPage";
import OrderPage from "@/features/admin/order/OrderPage";
import PaymentPage from "@/features/admin/payment/PaymentPage";
import UserManagementPage from "@/features/admin/user/UserManagementPage";

export default function AdminRouter() {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />
                }
            >
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="categories" element={<CategoryPage />} />
                    <Route path="menus" element={<MenuPage />} />
                    <Route path="menucategories" element={<MenuBookPage />} />
                    <Route path="ingredients" element={<IngredientPage />} />
                    <Route path="payments" element={<PaymentPage />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="settings" element={<SettingPage />} />
                </Route>
            </Route>
        </Routes>
    );
}