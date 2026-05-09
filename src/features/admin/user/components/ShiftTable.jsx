import DataTable from "@/components/ui/table/DataTable"
import { Clock, Timer } from "lucide-react"

export default function ShiftTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onRestore,
}) {
  const columns = [
    {
      label: "Shift Name",
      key: "shiftName",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-lg font-black ${
            row.isActive
              ? "border-orange-900 bg-orange-950 text-orange-400"
              : "border-zinc-800 bg-zinc-900 text-zinc-600"
          }`}>
            {value?.charAt(0)?.toUpperCase()}
          </div>
          <span className="font-semibold text-gray-100">{value}</span>
        </div>
      ),
    },
    {
      label: "Working Hours",
      key: "startTime",
      render: (_, row) => (
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock size={14} className="text-temu-bronze" />
          <span className="text-sm font-mono">
            {row.startTime} — {row.endTime}
          </span>
        </div>
      ),
    },
    {
      label: "Grace Period",
      key: "graceMinutes",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Timer size={14} className="text-orange-500" />
          <span className="text-sm font-bold text-orange-400">{value} Mins</span>
        </div>
      ),
    },
    {
      label: "Status",
      key: "isActive",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          value ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/50" : "bg-red-950/50 text-red-400 border border-red-900/50"
        }`}>
          {value ? "Active" : "Archived"}
        </span>
      ),
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