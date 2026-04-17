import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "@/routes/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import DashboardPage from "@/pages/DashboardPage"
import SettingPage from "@/pages/SettingPage"
import CategoryPage from "@/features/category/CategoryPage"
import MenuPage from "@/features/menu/MenuPage"
import IngredientPage from "@/features/ingredient/IngredientPage"
import MenuBookPage from "@/features/menucatogries/MenuBookPage"
import OrderPage from "@/features/order/OrderPage"
import PaymentPage from "@/features/payment/PaymentPage"
import UserPage from "@/features/user/UserPage"

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="categories" element={<CategoryPage />} />
                    <Route path="menus" element={<MenuPage />} />
                    <Route path="menucategories" element={<MenuBookPage />} />
                    <Route path="ingredients" element={<IngredientPage />} />
                    <Route path="payments" element={<PaymentPage />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="users" element={<UserPage />} />
                    <Route path="settings" element={<SettingPage />} />
                </Route>
            </Route>
        </Routes>
    )
}