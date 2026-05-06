import { TrendingUp, ShoppingBag, Users, Activity, AlertTriangle } from "lucide-react";

export default function KitchenDashboardPage() {
  return (
    <div className="space-y-8 p-2">
      {/* Hero Section - Dibuat lebih dramatis */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-temu-charcoal to-[#0d0c0b] px-8 py-10 shadow-2xl border border-white/5">
        {/* Dekorasi Background */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-temu-bronze/5 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-temu-bronze">
            <span className="h-px w-8 bg-temu-bronze/50"></span>
            Ringkasan Operasional
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Kitchen Dashboard<span className="text-temu-bronze">.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-temu-coffee/80 md:text-base">
            Selamat datang kembali, <span className="text-temu-cream font-bold">Chef Admin</span>. 
            Pantau performa outlet dan indikator bisnis Anda secara real-time di sini.
          </p>
        </div>
      </section>

      {/* Metrics - Dibuat lebih informatif dengan ikon */}
      <section className="grid gap-6 md:grid-cols-3">
        <MetricCard 
          label="Today Revenue" 
          value="Rp 12.8M" 
          icon={<TrendingUp size={20} />} 
          trend="+14% vs kemarin"
        />
        <MetricCard 
          label="Open Orders" 
          value="24" 
          icon={<ShoppingBag size={20} />} 
          trend="8 prioritas tinggi"
        />
        <MetricCard 
          label="Active Staff" 
          value="18" 
          icon={<Users size={20} />} 
          trend="Shift Siang"
        />
      </section>

      {/* Activity Panel - Dibuat lebih fungsional */}
      <section className="rounded-[2.5rem] border border-white/5 bg-temu-charcoal/30 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-temu-bronze/10 text-temu-bronze">
              <Activity size={20} />
            </div>
            <h2 className="text-xl font-bold text-temu-cream tracking-tight">
              Recent Activity
            </h2>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-temu-coffee hover:text-temu-bronze transition">
            View All
          </button>
        </div>

        {/* Placeholder Timeline / List */}
        <div className="space-y-6">
          <ActivityItem 
            title="New Category Added" 
            desc="Kategori 'Winter Special' berhasil ditambahkan oleh Admin." 
            time="2 mins ago" 
          />
          <ActivityItem 
            title="Stock Warning" 
            desc="Biji kopi Arabica tersisa kurang dari 2kg." 
            time="1 hour ago"
            isAlert 
          />
        </div>
      </section>
    </div>
  );
}

// Sub-komponen agar kode rapi
function MetricCard({ label, value, icon, trend }) {
  return (
    <article className="group rounded-3xl border border-white/5 bg-[#141312] p-7 transition-all hover:border-temu-bronze/30 hover:shadow-2xl hover:shadow-black">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-temu-bronze group-hover:bg-temu-bronze group-hover:text-temu-darker transition-all duration-500">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-temu-coffee">
          {label}
        </p>
        <p className="mt-2 text-4xl font-black tracking-tighter text-temu-cream leading-none">
          {value}
        </p>
      </div>
    </article>
  );
}

function ActivityItem({ title, desc, time, isAlert }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${isAlert ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-temu-bronze/40'}`} />
      <div className="flex-1 border-b border-white/5 pb-4 group-last:border-none">
        <div className="flex justify-between items-start gap-4">
          <h4 className={`text-sm font-bold ${isAlert ? 'text-orange-400' : 'text-temu-cream'}`}>{title}</h4>
          <span className="text-[10px] font-medium text-temu-coffee whitespace-nowrap">{time}</span>
        </div>
        <p className="text-xs text-temu-muted mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}