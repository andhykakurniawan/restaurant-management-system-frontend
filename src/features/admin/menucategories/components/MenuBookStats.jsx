import React from 'react';

const MenuBookStats = ({
    totalRelations,
    activePromos,
    unassignedMenus,
}) => {
    const stats = [
        { label: "TOTAL MENU LINKED", value: totalRelations, color: "text-white" },
        { label: "ACTIVE PROMOTIONS", value: activePromos, color: "text-[#b19163]" },
        { label: "SETUP REQUIRED", value: unassignedMenus, color: "text-orange-500" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-[#151515] border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group hover:border-[#b19163]/20 transition-all">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#b19163]/5 rounded-full blur-3xl group-hover:bg-[#b19163]/10 transition-all" />

                    <p className="text-[10px] font-black text-zinc-500 tracking-[0.2em] mb-2">
                        {stat.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h2 className={`text-5xl font-black ${stat.color} tracking-tighter`}>
                            {stat.value}
                        </h2>
                        <span className="text-zinc-600 text-[10px] font-bold uppercase">Items</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuBookStats;