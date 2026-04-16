import { X } from "lucide-react"
import { BaseModal } from "./BaseModal"

export default function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  headerColorClass = "bg-temu-bronze",
  children
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop super gelap biar konten fokus */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

        <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] shadow-2xl animate-in fade-in zoom-in-95 duration-300">

          {/* Header Glow Background */}
          <div className={`h-32 w-full absolute top-0 left-0 opacity-5 ${headerColorClass}`} />

          <div className="relative p-8">
            {/* Standard Header Section */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                {Icon && (
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-temu-bronze">
                    <Icon size={24} />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                  {subtitle && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-white/5 hover:bg-white/10 p-2 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area (Ini yang akan diisi data spesifik) */}
            <div className="space-y-6">
              {children}
            </div>

            {/* Default Footer */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}