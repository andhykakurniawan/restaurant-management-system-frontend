// src/components/ui/FilterButton.jsx
export default function FilterButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all tracking-widest uppercase
        ${isActive
          ? "bg-temu-bronze text-temu-darker"
          : "text-zinc-500 hover:text-white"
        }`}
    >
      {label}
    </button>
  )
}