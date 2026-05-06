import React from 'react';
import MenuBookCard from './MenuBookCard';

const MenuBookGrid = ({
    data, // Kita pakai 'data' sesuai kiriman dari parent
    onUpdate,
    onDelete,
    onRestore,
    showDeleted
}) => {
    // 1. Kasih pengaman: kalau data undefined/null, jadiin array kosong
    const itemsToDisplay = data || [];

    // 2. Cek kalau datanya kosong (setelah difilter)
    if (itemsToDisplay.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <span className="text-zinc-600 font-black tracking-widest uppercase text-sm">
                    No Menu Found
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 3. Map dari variabel pengaman tadi */}
            {itemsToDisplay.map((item) => (
                <MenuBookCard
                    key={item.id}
                    item={item}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onRestore={onRestore}
                    showDeleted={showDeleted}
                />
            ))}
        </div>
    );
};

export default MenuBookGrid;