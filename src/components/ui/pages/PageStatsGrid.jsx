export default function PageStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#141312] border border-white/5 p-6 rounded-4xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-temu-coffee">{stat.label}</p>
          <p className={`text-4xl font-black mt-2 ${stat.color || 'text-temu-cream'}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}