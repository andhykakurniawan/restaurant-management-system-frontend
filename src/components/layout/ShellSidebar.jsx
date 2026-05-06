import { NavLink, useLocation } from "react-router-dom";
import { menuByRole } from "@/utils/menuByRole";
import { useAuth } from "@/context/useAuth";
import { ChevronRight, ShieldCheck } from "lucide-react";

function isMenuActive(pathname, itemPath) {
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function ShellSidebar({ collapsed, open, onClose }) {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenu = menuByRole[user?.role] || [];

  return (
    <>
      {/* Overlay Mobile - Dibuat lebih gelap & blur lebih kuat */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-md md:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col
        bg-[#0d0c0b] text-temu-cream border-r border-white/5
        transition-all duration-500 ease-in-out md:translate-x-0
        ${collapsed ? "md:w-20" : "md:w-72"}
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER - Dibuat lebih elegan & proporsional */}
        <div className="h-24 flex flex-col justify-center px-8 border-b border-white/3">
          <h1 className={`font-black tracking-tighter transition-all duration-300 ${collapsed ? "text-xl text-center" : "text-2xl"}`}>
            TEMU<span className="text-temu-bronze">{collapsed ? "" : " RASA"}</span>
            <span className="text-temu-bronze">.</span>
          </h1>
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-[0.4em] text-temu-coffee font-bold mt-1">
              Admin Dashboard
            </p>
          )}
        </div>

        {/* MENU - Hover effect & Active state yang lebih modern */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
          {!collapsed && (
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4">
              Main Navigation
            </p>
          )}
          
          {filteredMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => {
                const active = isActive || isMenuActive(location.pathname, item.path);

                return `
                group relative flex items-center justify-between
                px-4 py-3.5 rounded-xl transition-all duration-300
                ${
                  active
                    ? "bg-temu-bronze/10 text-temu-bronze shadow-[inset_0_0_15px_rgba(212,163,115,0.05)]"
                    : "text-zinc-500 hover:text-temu-cream hover:bg-white/3"
                }
                `;
              }}
            >
              <div className="flex items-center gap-4">
                <item.icon 
                  size={20} 
                  strokeWidth={isMenuActive(location.pathname, item.path) ? 2.5 : 2}
                  className="transition-colors"
                />

                {!collapsed && (
                  <span className="text-sm font-bold tracking-wide">
                    {item.label}
                  </span>
                )}
              </div>

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
              
              {/* Tooltip simple saat collapsed (opsional) */}
              {collapsed && (
                 <div className="absolute left-full ml-4 px-2 py-1 bg-temu-bronze text-temu-darker text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                 </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER PROFILE - Elevated & Polished */}
        <div className="p-4 border-t border-white/3">
          <div className={`flex items-center gap-3 rounded-2xl bg-zinc-900/50 border border-white/5 p-3 transition-all ${collapsed ? "justify-center" : ""}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-temu-coffee to-temu-bronze p-[1.5px] shadow-lg shadow-black/40">
                <div className="w-full h-full rounded-full bg-[#0d0c0b] flex items-center justify-center text-[10px] font-black text-temu-bronze uppercase">
                  {user?.username?.substring(0, 2) || "AD"}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0d0c0b] rounded-full"></span>
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white truncate">
                  {user?.username || "Chef Admin"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck size={10} className="text-temu-bronze" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-temu-bronze/70 truncate">
                    {user?.role || "ADMIN"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}