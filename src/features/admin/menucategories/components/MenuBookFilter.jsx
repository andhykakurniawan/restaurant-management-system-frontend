import React from 'react';

const MenuBookFilter = ({
    categories,
    activeCategory,
    onCategoryChange,
    showDeleted,
    onToggleDeleted
}) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            <button
                onClick={onToggleDeleted}
                className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest transition-all flex items-center gap-2 border ${showDeleted
                    ? "bg-red-500/20 border-red-500/50 text-red-500"
                    : "bg-zinc-900 border-white/5 text-zinc-500 hover:text-white"
                    }`}
            >
                <span className={`w-2 h-2 rounded-full ${showDeleted ? "bg-red-500 animate-pulse" : "bg-zinc-700"}`}></span>
                {showDeleted ? "ARCHIVE MODE" : "VIEW ACTIVE"}
            </button>

            <div className="h-6 w-px bg-white/10 mx-2" />
            {/* Tombol "ALL" sebagai default */}
            <button
                onClick={() => onCategoryChange('all')}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border ${activeCategory === 'all'
                    ? "bg-[#b19163] text-black border-[#b19163]"
                    : "bg-transparent text-zinc-500 border-white/10 hover:border-[#b19163]/50 hover:text-zinc-300"
                    }`}
            >
                ALL
            </button>

            {/* Looping kategori dari database */}
            {(categories || []).map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${activeCategory === cat.id
                            ? "bg-[#b19163] text-black"
                            : "bg-[#151515] text-zinc-500 hover:text-white border border-white/5"
                        }`}
                >
                    {(cat?.name || "NO NAME").toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default MenuBookFilter;