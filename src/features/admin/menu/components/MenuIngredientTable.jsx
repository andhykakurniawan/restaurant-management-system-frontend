import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, Edit2 } from 'lucide-react';

export default function MenuIngredientTable({
  data,
  ingredients,
  onAdd,
  onDelete,
  onRestore,
  onEdit
}) {
  const [selectedIngredientId, setSelectedIngredientId] = useState("");
  const [quantity, setQuantity] = useState("");

  // Di MenuIngredientTable.jsx
  const handleLocalAdd = () => {
    console.log("ID Bahan yang dipilih:", selectedIngredientId); // Cek ini muncul gak?
    if (!selectedIngredientId || !quantity) return;

    onAdd(selectedIngredientId, parseFloat(quantity));

    setSelectedIngredientId("");
    setQuantity("");
  };

  return (
    <div className="space-y-6">
      {/* INPUT FIELD SECTION */}
      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-4xl border border-white/10 shadow-inner">
        <select
          value={selectedIngredientId}
          onChange={(e) => setSelectedIngredientId(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-zinc-300 appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#141312]">Select Ingredient...</option>
          {ingredients?.map((ing) => (
            <option key={ing.id} value={ing.id} className="bg-[#141312]">
              {ing.name}
            </option>
          ))}
        </select>

        <div className="w-px h-8 bg-white/10" />

        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-20 bg-transparent px-2 outline-none text-sm text-temu-cream font-bold placeholder:text-zinc-600 placeholder:font-normal"
        />

        <button
          onClick={handleLocalAdd}
          disabled={!selectedIngredientId || !quantity}
          className="p-4 bg-temu-bronze rounded-full text-temu-darker hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="rounded-4xl border border-white/5 bg-white/2 overflow-hidden">
        <div className="overflow-y-auto max-h-75 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#141312] z-10">
              <tr className="border-b border-white/5">
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Material</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Portion</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className={`group hover:bg-white/2 transition-colors ${!item.is_active ? 'opacity-40 grayscale' : ''}`}>
                    <td className="p-6">
                      <p className={`text-sm font-bold transition-colors ${!item.is_active ? 'text-zinc-500' : 'text-zinc-300 group-hover:text-temu-cream'}`}>
                        {item.ingredientName}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <span className={`text-sm font-mono font-bold ${!item.is_active ? 'text-zinc-600' : 'text-emerald-400'}`}>
                        {item.quantity}
                      </span>
                      <span className={`text-[10px] font-bold transition-colors ${!item.is_active ? 'text-zinc-500' : 'text-zinc-300 group-hover:text-temu-cream'}`}>
                        {ingredients?.find(ing => ing.id === item.ingredientId)?.unit || "units"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${item.is_active ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"
                          }`}>
                          {item.is_active ? "Active" : "Archived"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.is_active && onEdit && (
                          <button
                            onClick={() => onEdit(item.id, item.ingredientId, item.quantity)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 transition"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                        )}

                        {item.is_active && onDelete && (
                          <button
                            onClick={() => onDelete(item.id)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        )}

                        {!item.is_active && onRestore && (
                          <button
                            onClick={() => onRestore(item.id)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition"
                          >
                            <RefreshCw size={14} />
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-20 text-center">
                    <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">No recipe data found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}