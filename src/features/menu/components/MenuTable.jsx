import DataTable from "@/components/ui/table/DataTable"
import { useMemo } from "react"

export default function MenuTable({
    data,
    category = [],
    isLoading,
    onEdit,
    onDelete,
    onRestore,
    onView,
}) {

    const categoryMap = useMemo(() => {
        return Object.fromEntries(category.map(c => [String(c.id), c.name]))
    }, [category])

    const columns = [
        {
            label: "Menu",
            key: "name",
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/5 bg-zinc-900">
                        <img
                            src={row.imageUrl || "https://placehold.co/100x100?text=No+Img"}
                            className="h-full w-full object-cover"
                            alt={value}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-100">{value}</span>
                        <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                            {categoryMap[String(row.categoryId)] ?? "General"}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            label: "Price",
            key: "price",
            render: (value) => (
                <span className="font-mono font-bold text-emerald-400">
                    Rp {(value ?? 0).toLocaleString("id-ID")}
                </span>
            ),
        },
        {
            label: "Availability",
            key: "isAvailable",
            render: (value) => (
                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${value ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-500"
                    }`}>
                    {value ? "Available" : "Sold Out"}
                </span>
            ),
        },
        {
            label: "Status",
            key: "isActive",
            render: (value) => (
                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${value ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"
                    }`}>
                    {value ? "Active" : "Archived"}
                </span>

            ),
        },
    ]

    return <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
        onRestore={onRestore}
        onView={onView}
    />
}