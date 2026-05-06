import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { menuByRole } from "@/utils/menuByRole";
import { Menu, LogOut, Shield } from "lucide-react"; // Gunakan ikon supaya lebih pro

export default function ShellTopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const currentMenu =
    menuByRole[user?.role] || [];

  const currentPage = currentMenu.find((item) =>
    location.pathname.startsWith(item.path)
  );

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-temu-coffee/20 bg-temu-darker/95 px-6 py-5 backdrop-blur-md md:px-10">
      <div className="flex items-center gap-5">
        {/* Mobile Menu Button - Dibuat lebih rapi */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-temu-coffee/30 text-temu-cream transition hover:bg-temu-charcoal active:scale-95 md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Brand/Page Info - Diperbaiki Hierarkinya */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-temu-bronze animate-pulse"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-temu-coffee">
              Management System
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-temu-cream">
            {currentPage?.label || "Dashboard"}
            <span className="text-temu-bronze ml-1">.</span>
          </h1>
        </div>
      </div>

      {/* Right Section: User Status & Action */}
      <div className="flex items-center gap-4">
        <div className="hidden flex-col items-end sm:flex">
          <p className="text-sm font-bold text-temu-cream leading-none">
            {user?.username || "Adminstrator"}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Shield size={10} className="text-temu-bronze" />
            <span className="text-[9px] font-black uppercase tracking-widest text-temu-bronze/80">
              {user?.role || "SUPER_ADMIN"}
            </span>
          </div>
        </div>

        {/* Logout Button - Dibuat lebih kontras */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-temu-bronze px-5 py-2.5 text-xs font-black uppercase tracking-widest text-temu-darker transition-all hover:bg-temu-cream hover:shadow-[0_0_15px_rgba(212,163,115,0.3)] active:scale-95"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}