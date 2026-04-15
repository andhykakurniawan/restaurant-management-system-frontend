import { NavLink, useLocation } from "react-router-dom";
import { sidebarMenu } from "@/config/sidebarMenu";
import { useAuth } from "@/context/useAuth";
import { ChevronRight } from "lucide-react"; // Tambahkan ini

function isMenuActive(pathname, itemPath) {
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenu = sidebarMenu.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className={`flex h-screen flex-col bg-temu-darker border-r border-temu-coffee/10 text-temu-cream transition-all duration-500 ease-in-out ${collapsed ? "w-20" : "w-72"}`}>
      
      {/* 1. Logo Section */}
      <div className="h-24 flex items-center px-6 mb-4">
        <h1 className={`font-black tracking-tighter transition-all duration-300 ${collapsed ? "text-xl" : "text-2xl"}`}>
          TEMU<span className="text-temu-bronze">{collapsed ? "" : " RASA"}</span>
          <span className="text-temu-bronze">.</span>
        </h1>
      </div>

      {/* 2. Menu Navigation */}
      <nav className="flex-1 px-3 space-y-1.5">
        {!collapsed && (
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.3em] text-temu-coffee/60 mb-4">
            Main Menu
          </p>
        )}
        
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => {
              const active = isActive || isMenuActive(location.pathname, item.path);

              return `group relative flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 ${
                active
                  ? "bg-temu-bronze/10 text-temu-bronze shadow-[inset_0_0_20px_rgba(212,163,115,0.05)]"
                  : "text-temu-coffee hover:bg-white/3 hover:text-temu-cream"
              }`;
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <item.icon size={22} strokeWidth={location.pathname.startsWith(item.path) ? 2.5 : 2} />
                {/* Indikator Active Dot saat Collapsed */}
                {collapsed && isMenuActive(location.pathname, item.path) && (
                  <span className="absolute -right-1 -top-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-temu-bronze opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-temu-bronze"></span>
                  </span>
                )}
              </div>
              
              {!collapsed && (
                <span className="text-sm font-bold tracking-wide transition-opacity">
                  {item.label}
                </span>
              )}
            </div>

            {/* Panah kecil di kanan hanya saat tidak collapsed */}
            {!collapsed && (
              <ChevronRight 
                size={14} 
                className={`transition-all duration-300 ${
                  isMenuActive(location.pathname, item.path) 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`} 
              />
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. User Profile Section - Re-designed */}
      <div className="mt-auto p-4">
        <div className={`flex items-center gap-3 rounded-2xl bg-temu-charcoal/30 border border-white/5 p-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-tr from-temu-coffee to-temu-bronze p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-temu-darker text-[10px] font-bold text-temu-bronze uppercase">
              {user?.username?.substring(0, 2) || "AD"}
            </div>
          </div>
          
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-temu-cream">
                {user?.username}
              </p>
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-temu-bronze/70">
                  {user?.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}