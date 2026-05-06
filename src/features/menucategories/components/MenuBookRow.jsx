import React from 'react';

const MenuBookRow = ({
    item,
    onUpdate,
    onDelete,
}) => {
    const basePrice = item?.menu?.basePrice || 0;
    const currentPrice = item?.price || 0;
    const discount = item?.discountPercentage || 0;

    // 2. Logic Hitung Harga Setelah Diskon
    const finalPrice = currentPrice - (currentPrice * (discount / 100));
    const menuName = item?.menuName || item?.menu?.name || "Unknown Menu";
    const categoryName = item?.category?.categoryName || item?.categoryName || "No Category";

    return (
        <tr className="border-b border-white/5 hover:bg-white/2 transition-colors group">
            {/* Kolom Foto & Nama */}
            <td className="py-5 px-6">
                <div className="flex items-center gap-4">
                    <span className="text-white font-bold text-sm tracking-tight">
                        {menuName}
                    </span>
                </div>
            </td>

            {/* Kolom Kategori - Pake safety check agar tidak undefined */}
            <td className="py-4 px-4">
                <span className="px-3 py-1 rounded-full bg-[#b19163]/10 border border-[#b19163]/20 text-[#b19163] text-[10px] font-bold">
                    {categoryName}
                </span>
            </td>

            {/* Kolom Input Harga Jual */}
            <td className="py-4 px-4">
                <div className="relative max-w-30">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#b19163] font-bold">Rp</span>
                    <input
                        type="number"
                        value={currentPrice === 0 ? '' : currentPrice}
                        onChange={(e) => onUpdate(item.id, 'price', e.target.value)}
                        placeholder={basePrice}
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:border-[#b19163] outline-none transition"
                    />
                </div>
            </td>

            {/* Kolom Input Diskon */}
            <td className="py-4 px-4">
                <div className="relative max-w-20">
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => onUpdate(item.id, 'discountPercentage', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#b19163] outline-none transition text-center"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">%</span>
                </div>
            </td>

            {/* Kolom Preview Harga Customer */}
            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <span className="text-sm font-black text-[#b19163]">
                        Rp {finalPrice.toLocaleString('id-ID')}
                    </span>
                    {discount > 0 && (
                        <span className="text-[10px] text-zinc-500 line-through">
                            Rp {currentPrice.toLocaleString('id-ID')}
                        </span>
                    )}
                </div>
            </td>

            {/* Base Price buat pembanding (Margin check) */}
            <td className="py-5 px-6 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                Base: Rp {basePrice.toLocaleString()}
            </td>

            {/* Kolom Actions */}
            <td className="py-4 px-4 text-right">
                <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default MenuBookRow;