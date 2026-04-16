import DataTable from "@/components/ui/table/DataTable"

export default function CategoryTable({
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
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xl font-black ${
            row.isActive
              ? "border-emerald-900 bg-emerald-950 text-emerald-400"
              : "border-red-900 bg-red-950 text-red-400"
          }`}>
            {value?.charAt(0)?.toUpperCase()}
          </div>

          <span className="font-semibold text-gray-100">
            {value}
          </span>
        </div>
      ),
    },

    {
      label: "Description",
      key: "description",
    },

    {
      label: "Status",
      key: "isActive",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value
              ? "bg-emerald-950/50 text-emerald-300"
              : "bg-red-950/50 text-red-300"
          }`}
        >
          {value ? "Active" : "Inactive"}
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