import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function PublicRoute() {

  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user) {

    const roleRedirectMap = {
      SUPER_ADMIN: "/admin/dashboard",
      ADMIN: "/admin/dashboard"
    };

    return (
      <Navigate
        to={roleRedirectMap[user.role] || "/admin/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}