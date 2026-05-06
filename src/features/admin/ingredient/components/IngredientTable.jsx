import DataTable from "@/components/ui/table/DataTable"

export default function IngredientTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onRestore,
}) {

  const columns = [
    {
      label: "Name",
      key: "name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xl font-black transition-colors ${
            row.isActive
              ? "border-emerald-900/50 bg-emerald-950/30 text-emerald-400"
              : "border-red-900/50 bg-red-950/30 text-red-400"
          }`}>
            {value?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-100 tracking-tight">
              {value}
            </span>
            {/* Sub-label kecil untuk status tambahan jika perlu */}
            {!row.isActive && <span className="text-[10px] uppercase text-red-500 font-bold">Archived</span>}
          </div>
        </div>
      ),
    },

    {
      label: "Stock Level",
      key: "currentStock",
      // Kita gabungkan Current Stock dan Unit di sini
      render: (value, row) => {
        const isLowStock = value <= row.minimumStock;
        return (
          <div className="flex flex-col">
             <div className="flex items-baseline gap-1.5">
                <span className={`text-sm font-black ${isLowStock ? "text-orange-500" : "text-gray-100"}`}>
                  {(value ?? 0).toLocaleString("id-ID")}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  {row.unit}
                </span>
             </div>
             {isLowStock && (
               <span className="text-[10px] text-orange-500/80 font-medium leading-none">
                 Needs Restock
               </span>
             )}
          </div>
        )
      },
    },

    {
      label: "Min. Stock",
      key: "minimumStock",
      render: (value, row) => (
        <span className="text-sm font-medium text-zinc-400">
          {(value ?? 0).toLocaleString("id-ID")} {row.unit}
        </span>
      ),
    },

    {
      label: "Cost Per Unit",
      key: "costPerUnit",
      // Rata kanan (text-right) biasanya diatur di level header/cell DataTable lu
      render: (value) => (
        <div className="flex flex-col items-start">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Price</span>
          <span className="font-mono font-bold text-emerald-400/90">
            Rp {(value ?? 0).toLocaleString("id-ID")}
          </span>
        </div>
      ),
    },

    {
      label: "Status",
      key: "isActive",
      render: (value, row) => {
        const isLowStock = row.currentStock <= row.minimumStock;
        
        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                value
                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                  : "bg-zinc-900 text-zinc-500 border border-zinc-800"
              }`}
            >
              {value ? "Active" : "Inactive"}
            </span>
            
            {/* Badge tambahan kalau stok tipis */}
            {value && isLowStock && (
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" title="Low Stock Warning" />
            )}
          </div>
        )
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      onEdit={onEdit}
      onDelete={onDelete}
      onRestore={onRestore}
    />
  )
}