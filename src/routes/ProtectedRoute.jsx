import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDashboardRoute } from "@/utils/getDashboardRoute";

export default function ProtectedRoute({ allowedRoles }) {

  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    allowedRoles?.length &&
    (!user?.role || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <Outlet />;
}
