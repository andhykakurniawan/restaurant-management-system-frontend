import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminRouter from "./app/AdminRouter";
import WaiterRouter from "./app/WaiterRouter";
import KitchenRouter from "./app/KitchenRouter";
import CashierRouter from "./app/CashierRouter";
import WarehouseRouter from "./app/WarehouseRouter";
import CustomerRouter from "./app/CustomerRouter";
import LoginPage from "./features/shared/auth/LoginPage";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT CUSTOMER LANDING */}
        <Route path="/" element={<Navigate to="/customer" replace />} />

        {/* BACK-OFFICE LOGIN */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ADMIN AREA */}
        <Route path="/admin/*" element={<AdminRouter />} />

        {/* WAITER AREA */}
        <Route path="/waiter/*" element={<WaiterRouter />} />

        {/* KITCHEN AREA */}
        <Route path="/kitchen/*" element={<KitchenRouter />} />

        {/* CASHIER AREA */}
        <Route path="/cashier/*" element={<CashierRouter />} />

        {/* WAREHOUSE AREA */}
        <Route path="/warehouse/*" element={<WarehouseRouter />} />

        {/* CUSTOMER PUBLIC AREA */}
        <Route path="/customer/*" element={<CustomerRouter />} />

        {/* REDIRECT OLD DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
