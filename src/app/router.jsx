import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "@/routes/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import DashboardPage from "@/pages/DashboardPage"
import CategoryPage from "@/features/category/CategoryPage"
import MenuPage from "@/pages/MenuPage"
import SettingPage from "@/pages/SettingPage"

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="categories" element={<CategoryPage />} />
                    <Route path="menu" element={<MenuPage />} />
                    <Route path="settings" element={<SettingPage />} />
                </Route>
            </Route>
        </Routes>
    )
}