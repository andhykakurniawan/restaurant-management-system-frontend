import { CheckCircle2, XCircle, RefreshCw, Trash2 } from 'lucide-react'; // Pasang lucide-react dulu

export default function CategoryTable({ categories, onDelete, onRestore }) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-1 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-zinc-900">
      <div className="overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/5 bg-white/2">
            <tr>
              <th className="px-6 py-5 text-gray-500 font-medium uppercase text-xs tracking-wider">Name</th>
              <th className="px-6 py-5 text-gray-500 font-medium uppercase text-xs tracking-wider">Description</th>
              <th className="px-6 py-5 text-gray-500 font-medium uppercase text-xs tracking-wider text-center">Status</th>
              <th className="px-6 py-5 text-gray-500 font-medium uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-white/5">
            {categories.map((cat) => (
              <tr 
                key={cat.id} 
                className="hover:bg-white/3 transition-all duration-300 ease-in-out group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar Kategori / Icon Placeholder - Ini bikin visual lebih ramai */}
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xl font-black ${
                      cat.isActive ? 'border-emerald-900 bg-emerald-950 text-emerald-400' : 'border-red-900 bg-red-950 text-red-400'
                    }`}>
                      {cat.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-100 group-hover:text-white group-hover:underline group-hover:underline-offset-4 group-hover:decoration-dotted transition">
                      {cat.name}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-5 text-gray-400 leading-relaxed font-light">
                  {cat.description}
                </td>
                
                <td className="px-6 py-5 text-center">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                    cat.isActive 
                      ? 'bg-emerald-950/50 text-emerald-300 ring-emerald-500/20' 
                      : 'bg-red-950/50 text-red-300 ring-red-500/20'
                  }`}>
                    {cat.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {cat.isActive ? "Active" : "Inactive"}
                  </div>
                </td>
                
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.isActive ? (
                      <button
                        onClick={() => onDelete(cat.id)}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => onRestore(cat.id)}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition"
                      >
                        <RefreshCw size={14} />
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}