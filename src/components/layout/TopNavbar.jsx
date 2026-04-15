import { useAuth } from "@/context/useAuth";
import { LogOut, User, ShieldCheck } from "lucide-react"; // npm install lucide-react

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-temu-coffee/10 bg-temu-darker/80 backdrop-blur-md sticky top-0 z-50">
      {/* Kiri: Indikator Lokasi / Page Title */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-0.5 bg-temu-bronze/50 rounded-full" />
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-temu-coffee font-bold">Panel</h2>
          <p className="text-lg font-serif font-semibold text-temu-cream leading-none tracking-tight">Dashboard Overview</p>
        </div>
      </div>

      {/* Kanan: User Profile & Actions */}
      <div className="flex items-center gap-6">
        {/* User Info Group */}
        <div className="flex items-center gap-3 pr-6 border-r border-temu-coffee/20">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-temu-cream leading-tight">
              {user?.username || "Guest User"}
            </p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <ShieldCheck size={12} className="text-temu-bronze" />
              <span className="text-[10px] uppercase font-black tracking-widest text-temu-bronze/80">
                {user?.role || "Member"}
              </span>
            </div>
          </div>
          
          {/* Avatar Bulat ala Cafe Premium */}
          <div className="h-10 w-10 rounded-full bg-temu-charcoal border-2 border-temu-coffee/30 flex items-center justify-center text-temu-bronze shadow-inner">
            <User size={20} />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={logout}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-temu-bronze/5 text-temu-bronze border border-temu-bronze/20 hover:bg-temu-bronze hover:text-temu-darker transition-all duration-300 font-bold text-sm"
        >
          <LogOut size={16} className="transition-transform group-hover:translate-x-1" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}