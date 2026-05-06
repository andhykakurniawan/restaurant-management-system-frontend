import React from 'react';
import MenuBookRow from './MenuBookRow';

const MenuBookTable = ({
    data,
    loading,
    onUpdate,
    onDelete,
}) => {
    return (
        <div className="bg-[#111111] border border-white/5 rounded-4xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/2 border-b border-white/5">
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Menu Details</th>
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Category</th>
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Selling Price (IDR)</th>
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Disc %</th>
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Customer Preview</th>
                            <th className="py-5 px-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/3">
                        {loading ? (
                            <tr>
                                {/*<td colSpan="6" className="py-32">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="w-8 h-8 border-4 border-[#b19163]/20 border-t-[#b19163] rounded-full animate-spin"></div>
                                        <p className="text-zinc-500 text-xs font-medium tracking-widest uppercase">Fetching Menu Relations...</p>
                                    </div>
                                </td>*/}
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item) => (
                                <MenuBookRow
                                    key={item.id}
                                    item={item}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-32 text-center">
                                    <p className="text-zinc-600 text-sm italic font-medium">No menu data found for this category.</p>
                                    <p className="text-zinc-700 text-[10px] uppercase tracking-widest mt-2">Try selecting another filter or add new relation.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuBookTable;