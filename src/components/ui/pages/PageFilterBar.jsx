import { Search } from "lucide-react"

export default function PageFilterBar({ searchTerm, onSearchChange, placeholder = "Search...", children }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
      <div className="relative w-full md:max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-temu-bronze transition" size={18} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#0d0c0b] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-temu-cream focus:outline-none focus:border-temu-bronze/30 transition-all"
        />
      </div>
      <div className="flex items-center gap-2 p-1 bg-[#0d0c0b] rounded-2xl border border-white/5">
        {children}
      </div>
    </div>
  )
}