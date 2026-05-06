import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDashboardRoute } from "@/utils/getDashboardRoute";

export default function PublicRoute() {

  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user) {
    return (
      <Navigate
        to={getDashboardRoute(user.role)}
        replace
      />
    );
  }

  return <Outlet />;
}