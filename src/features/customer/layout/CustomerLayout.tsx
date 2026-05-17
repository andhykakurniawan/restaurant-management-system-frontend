import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerFooter from "./CustomerFooter";
import CustomerMobileMenu from "./CustomerMobileMenu";
import CustomerNavbar from "./CustomerNavbar";

export default function CustomerLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-temu-darker text-temu-cream">
      <CustomerNavbar onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <CustomerMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Outlet />
      <CustomerFooter />
    </div>
  );
}
