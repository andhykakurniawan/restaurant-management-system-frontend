export function getDashboardRoute(role) {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin/dashboard";

    case "WAITER":
      return "/waiter/dashboard";

    case "CASHIER":
      return "/cashier/dashboard";

    case "KITCHEN":
      return "/kitchen/dashboard";

    case "WAREHOUSE_MANAGER":
      return "/warehouse/dashboard";

    default:
      return "/login";
  }
}
