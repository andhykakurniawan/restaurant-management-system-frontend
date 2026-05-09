import DataTable from "@/components/ui/table/DataTable"

const roleStyles = {
  SUPER_ADMIN: "border-purple-900 bg-purple-950/50 text-purple-400",
  CASHIER: "border-emerald-900 bg-emerald-950/50 text-emerald-400",
  CHEF: "border-orange-900 bg-orange-950/50 text-orange-400",
  WAREHOUSE_MANAGER: "border-blue-900 bg-blue-950/50 text-blue-400",
  WAITER: "border-cyan-900 bg-cyan-950/50 text-cyan-400",
  CUSTOMER: "border-gray-700 bg-gray-800 text-gray-400",
};

export default function UserTable({ data, isLoading, onEdit, onDelete, onRestore }) {
  const columns = [
    {
      label: "User",
      key: "username",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-lg font-black ${
            row.isActive ? "border-orange-900 bg-orange-950 text-orange-400" : "border-gray-800 bg-gray-900 text-gray-500"
          }`}>
            {value?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-100">{value}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      label: "Role",
      key: "role",
      render: (value) => (
        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${roleStyles[value] || "border-gray-700 text-gray-400"}`}>
          {value?.replace('_', ' ')}
        </span>
      )
    },
    {
      label: "Status",
      key: "isActive",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value ? "bg-emerald-950/50 text-emerald-300" : "bg-red-950/50 text-red-300"
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