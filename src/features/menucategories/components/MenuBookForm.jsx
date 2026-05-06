import React, { useState } from 'react';

const MenuBookForm = ({ menus,
    categories,
    onCreate,
    onClose
}) => {
    const [formData, setFormData] = useState({
        menuId: '',
        categoryId: '',
        price: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.menuId || !formData.categoryId) return alert("Pilih menu dan kategori dulu!");

        await onCreate(formData);
        onClose(); // Tutup modal setelah berhasil
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
            {/* 1. Pilih Menu */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 tracking-widest uppercase italic">Select Menu</label>
                <select
                    value={formData.menuId}
                    onChange={(e) => setFormData({ ...formData, menuId: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#b19163] outline-none transition appearance-none"
                >
                    <option value="">-- Choose Menu --</option>
                    {menus.map(m => (
                        <option key={m.id} value={m.id} className="bg-[#151515]">{m.name}</option>
                    ))}
                </select>
            </div>

            {/* 2. Pilih Kategori */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 tracking-widest uppercase italic">Select Book Category</label>
                <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#b19163] outline-none transition appearance-none"
                >
                    <option value="">-- Choose Category --</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#151515]">{c.name}</option>
                    ))}
                </select>
            </div>

            {/* 3. Harga Jual Awal */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 tracking-widest uppercase italic">Initial Selling Price</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#b19163] font-bold">Rp</span>
                    <input
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-[#b19163] outline-none transition"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-white/5 text-zinc-500 text-xs font-bold hover:bg-white/5 transition-all"
                >
                    CANCEL
                </button>
                <button
                    type="submit"
                    className="flex-2 bg-[#b19163] hover:bg-white text-black px-6 py-3 rounded-xl font-black text-xs transition-all shadow-[0_10px_20px_rgba(177,145,99,0.2)]"
                >
                    ASSIGN TO BOOK
                </button>
            </div>
        </form>
    );
};

export default MenuBookForm;