import { Utensils, CheckCircle2, AlertCircle, Tag, Banknote, X, Info } from "lucide-react"
import { BaseModal } from "@/components/ui/modals"

export default function MenuDetail({ isOpen, onClose, menu, categoryName }) {
  if (!menu) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] shadow-2xl animate-in fade-in zoom-in-95 duration-300">

        {/* 1. Header Glow & Background Decor */}
        <div className="h-32 w-full absolute top-0 left-0 opacity-10 bg-temu-bronze" />

        <div className="relative p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-temu-bronze">
                <Utensils size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight leading-none">{menu.name}</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee mt-2">
                  Menu Detail Information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/5 hover:bg-white/10 p-2 rounded-full text-zinc-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* 2. Content Area */}
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative aspect-video w-full overflow-hidden rounded-4xl border border-white/5 bg-[#0d0c0b] shadow-inner">
              <img
                src={menu.imageUrl || "https://placehold.co/600x400?text=No+Image+Available"}
                alt={menu.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Availability Badge */}
              <div className="absolute bottom-4 left-4">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${menu.isAvailable
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                  {menu.isAvailable ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {menu.isAvailable ? "Available" : "Sold Out"}
                </span>
              </div>
            </div>

            {/* Price & Category Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1 text-zinc-500">
                  <Banknote size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Price</span>
                </div>
                <p className="text-lg font-mono font-bold text-emerald-400">
                  Rp {menu.price?.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1 text-zinc-500">
                  <Tag size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Category</span>
                </div>
                <p className="text-lg font-bold text-temu-cream">
                  {categoryName || "General"}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1 text-temu-coffee">
                <Info size={12} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Description
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0d0c0b] border border-white/5 min-h-25">
                <p className="text-sm text-zinc-400 leading-relaxed italic">
                  {menu.description ? `"${menu.description}"` : "No description provided for this menu item."}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Footer */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
            >
              Close Detail
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}