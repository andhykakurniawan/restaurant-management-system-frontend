import { Trash2, Edit2, RefreshCw } from "lucide-react"

export default function DataTable({
  columns = [],
  data = [],
  isLoading,
  onEdit,
  onDelete,
  onRestore,
}) {
  const safeData = Array.isArray(data) ? data : []

  if (isLoading)
    return (
      <div className="py-20 text-center text-zinc-500 animate-pulse uppercase tracking-[0.3em] text-[10px] font-black">
        Synchronizing Data...
      </div>
    )

  if (!safeData.length)
    return (
      <div className="py-20 text-center text-zinc-600 italic">
        No data available yet
      </div>
    )

  return (
    <div className="rounded-2xl bg-zinc-950 p-1 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-zinc-900">
      <div className="overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm">
          
          {/* HEADER */}
          <thead className="border-b border-white/5 bg-white/2">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-5 text-gray-500 font-medium uppercase text-xs tracking-wider"
                >
                  {col.label}
                </th>
              ))}

              {(onEdit || onDelete || onRestore) && (
                <th className="px-6 py-5 text-right text-gray-500 font-medium uppercase text-xs tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-white/5">
            {safeData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-white/3 transition-all duration-300 ease-in-out group"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-5">
                    {col.render
                      ? col.render(row[col.key], row)
                      : (
                        <span className="text-gray-300 font-medium">
                          {row[col.key] ?? "-"}
                        </span>
                      )}
                  </td>
                ))}

                {(onEdit || onDelete || onRestore) && (
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      
                      {row.isActive && onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 transition"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                      )}

                      {row.isActive && onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      )}

                      {!row.isActive && onRestore && (
                        <button
                          onClick={() => onRestore(row)}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition"
                        >
                          <RefreshCw size={14} />
                          Restore
                        </button>
                      )}

                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}