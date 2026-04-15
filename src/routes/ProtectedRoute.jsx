import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (
    allowedRoles?.length &&
    (!user?.role || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}