import React from 'react';

const MenuBookCard = ({
    item,
    onUpdate,
    onDelete,
    onRestore,
    showDeleted
}) => {
    // 1. Logika Pengambilan Data (Sesuai Row lama lu)
    const basePrice = item?.menu?.price || item?.price || 0;
    const currentPrice = item?.price || 0;
    const discount = item?.discountPercentage || 0;
    const menuName = item?.menuName || item?.menu?.name || "Unknown Menu";

    const displayImage = item?.menu?.image_url || item?.image_url;

    const categoryName = item?.category?.categoryName || item?.categoryName || "PROMO";

    // 2. Perhitungan Harga
    const finalPrice = currentPrice - (currentPrice * (discount / 100));
    const hemat = currentPrice - finalPrice;

    return (
        <div className="bg-[#1c1c1c] rounded-3xl p-5 border border-white/5 relative group transition-all hover:border-[#b19163]/30">
            {/* Badge Kategori */}
            <div className="absolute top-4 right-4 bg-[#b19163]/20 text-[#b19163] text-[10px] px-3 py-1.5 rounded-lg font-black tracking-widest uppercase border border-[#b19163]/20 backdrop-blur-sm z-10">
                {categoryName}
            </div>

            {/* Gambar Menu */}
            <div className="w-full h-44 ...">
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={item?.menu?.name || "Menu"}
                        className="w-full h-full object-cover"
                        // Tambahkan fallback jika link Pinterest/URL tersebut mati
                        onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Error+Loading+Image"; }}
                    />
                ) : (
                    <div className="opacity-20 font-bold">NO IMAGE</div>
                )}
            </div>

            <h3 className="text-white font-bold text-lg mb-1 tracking-tight">{menuName}</h3>
            <p className="text-zinc-500 text-[10px] mb-4 uppercase tracking-widest font-medium">
                Harga Dasar: Rp {basePrice.toLocaleString('id-ID')}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Input Harga Jual */}
                <div className="bg-black/40 p-3 rounded-xl border border-white/10 focus-within:border-[#b19163] transition-all">
                    <label className="text-[8px] text-zinc-500 block mb-1 font-bold tracking-wider">HARGA JUAL (FINAL)</label>
                    <div className="flex items-center">
                        <span className="text-[10px] text-[#b19163] font-bold mr-1">Rp</span>
                        <input
                            type="number"
                            value={currentPrice === 0 ? '' : currentPrice}
                            onChange={(e) => onUpdate(item.id, 'price', e.target.value)}
                            className="bg-transparent text-white font-bold w-full focus:outline-none text-sm"
                            placeholder={basePrice}
                        />
                    </div>
                </div>

                {/* Input Diskon */}
                <div className="bg-black/40 p-3 rounded-xl border border-white/10 focus-within:border-[#b19163] transition-all">
                    <label className="text-[8px] text-zinc-500 block mb-1 font-bold tracking-wider">DISKON CORETA</label>
                    <div className="flex items-center">
                        <span className="text-[10px] text-[#b19163] font-bold mr-1">%</span>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => onUpdate(item.id, 'discountPercentage', e.target.value)}
                            className="bg-transparent text-white font-bold w-full focus:outline-none text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Tampilan Customer Section */}
            <div className="bg-black/20 p-4 rounded-2xl mb-6 border border-white/5">
                <label className="text-[8px] text-zinc-500 block mb-2 font-black tracking-[0.2em]">TAMPILAN CUSTOMER</label>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#b19163] font-black text-xl">
                            Rp {finalPrice.toLocaleString('id-ID')}
                        </span>
                        {discount > 0 && (
                            <span className="text-zinc-600 text-[10px] line-through">
                                Rp {Number(currentPrice).toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>
                    {discount > 0 && (
                        <div className="bg-[#b19163]/10 text-[#b19163] text-[9px] px-3 py-1.5 rounded-full font-bold">
                            Rp {hemat.toLocaleString('id-ID')} Hemat
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <button
                    onClick={() => onUpdate(item.id, null, null, true)} // Kita kasih trigger khusus buat SAVE
                    className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                    Simpan
                </button>

                {showDeleted || item.isActive === false ? (
                    <button onClick={() => onRestore(item.id)} className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold uppercase text-[9px] tracking-widest transition-all">
                        <span>Restore</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                ) : (
                    <button onClick={() => onDelete(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default MenuBookCard;