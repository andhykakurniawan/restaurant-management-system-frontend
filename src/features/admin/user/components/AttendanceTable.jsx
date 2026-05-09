import DataTable from "@/components/ui/table/DataTable"
import { Clock, Calendar } from "lucide-react"

const statusStyles = {
  IN_TIME: "bg-emerald-950/50 text-emerald-400 border-emerald-900",
  LATE: "bg-red-950/50 text-red-400 border-red-900",
  EARLY_LEAVE: "bg-orange-950/50 text-orange-400 border-orange-900",
  ABSENT: "bg-zinc-900 text-zinc-500 border-zinc-800",
  ON_LEAVE: "bg-blue-950/50 text-blue-400 border-blue-900",
  OFF_DAY: "bg-purple-950/50 text-purple-400 border-purple-900",
};

export default function AttendanceTable({ data, isLoading, onEdit, onDelete }) {
  const columns = [
    {
      label: "Employee",
      key: "userName",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-100">{value}</span>
          <span className="text-[10px] text-temu-coffee uppercase tracking-wider">{row.shiftName}</span>
        </div>
      ),
    },
    {
      label: "Date",
      key: "attendanceDate",
      render: (value) => (
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar size={14} className="text-temu-bronze" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      label: "Time",
      key: "clockIn",
      render: (_, row) => (
        <div className="flex flex-col text-xs font-mono">
          <span className="text-emerald-400">In: {row.clockIn || "--:--"}</span>
          <span className="text-red-400">Out: {row.clockOut || "--:--"}</span>
        </div>
      ),
    },
    {
      label: "Status",
      key: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded border text-[10px] font-black tracking-tighter ${statusStyles[value] || statusStyles.ABSENT}`}>
          {value?.replace('_', ' ')}
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
    />
  )
}