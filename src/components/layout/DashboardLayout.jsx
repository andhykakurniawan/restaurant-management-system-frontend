import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import ShellSidebar from "./ShellSidebar";
import ShellTopNavbar from "./ShellTopNavbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-temu-darker text-temu-cream">
      <ShellSidebar
        collapsed={collapsed}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggle={() => {
          if (window.innerWidth < 768) {
            setMobileOpen((current) => !current);
            return;
          }

          setCollapsed((current) => !current);
        }}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${collapsed ? "md:pl-24" : "md:pl-72"
          }`}
      >
        <ShellTopNavbar onMenuClick={() => setMobileOpen(true)} />

        <main className="px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}