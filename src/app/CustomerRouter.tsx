import { Navigate, Route, Routes } from "react-router-dom";
import CustomerLayout from "@/features/customer/layout/CustomerLayout";
import CustomerHomePage from "@/features/customer/home/CustomerHomePage";
import CustomerMenuPage from "@/features/customer/menu/CustomerMenuPage";
import CustomerOrderPage from "@/features/customer/order/CustomerOrderPage";
import CustomerReservationPage from "@/features/customer/reservation/CustomerReservationPage";

export default function CustomerRouter() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<CustomerHomePage />} />
        <Route path="menu" element={<CustomerMenuPage />} />
        <Route path="reserve" element={<CustomerReservationPage />} />
        <Route path="order" element={<CustomerOrderPage />} />
        <Route path="*" element={<Navigate to="/customer" replace />} />
      </Route>
    </Routes>
  );
}
