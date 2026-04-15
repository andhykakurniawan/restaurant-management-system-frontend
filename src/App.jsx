import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PublicRoute from "./routes/PublicRoute";
import AppRouter from "./app/router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* ADMIN AREA */}
        <Route path="/admin/*" element={<AppRouter />} />

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