import { Table2 } from "lucide-react";
import { ReservationTable } from "../../type";

interface TableMapProps {
  tables: ReservationTable[];
  selectedTableId: string;
  onSelectTable: (tableId: string) => void;
}

function getShapeClass(table: ReservationTable) {
  if (table.shape === "bar") return "h-12 w-12 rounded-full text-[10px]";
  if (table.shape === "wide") return "h-16 w-32 rounded-2xl text-[10px]";
  return "h-16 w-16 rounded-full text-[10px]";
}

export default function TableMap({ tables, selectedTableId, onSelectTable }: TableMapProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="flex items-center gap-3 font-serif text-3xl text-temu-cream">
            <Table2 className="text-temu-bronze" size={26} />
            Table Selection
          </h2>
          <p className="mt-2 text-sm leading-7 text-temu-muted">
            Choose your vantage point within the room.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-temu-muted">
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full border border-temu-bronze" /> Available
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full bg-temu-bronze" /> Selected
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full bg-zinc-700" /> Occupied
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#181818] p-6 md:p-8">
        <div className="mb-6 rounded-xl border border-temu-bronze/20 bg-temu-bronze/5 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-temu-bronze">
          Garden View
        </div>
        <div className="grid min-h-[360px] grid-cols-2 gap-6 md:grid-cols-4">
          {tables.map((table) => {
            const isSelected = table.id === selectedTableId;
            const isOccupied = table.status === "occupied";

            return (
              <button
                key={table.id}
                type="button"
                disabled={isOccupied}
                onClick={() => onSelectTable(table.id)}
                className={`m-auto flex items-center justify-center border font-bold transition ${getShapeClass(table)} ${
                  isOccupied
                    ? "cursor-not-allowed border-zinc-700 bg-zinc-800 text-zinc-500 opacity-60"
                    : isSelected
                      ? "border-temu-bronze bg-temu-bronze text-[#1b1208] shadow-[0_0_24px_rgba(196,138,58,0.32)] ring-2 ring-temu-bronze/40 ring-offset-4 ring-offset-[#181818]"
                      : "border-temu-bronze/60 text-temu-bronze hover:bg-temu-bronze/10"
                }`}
              >
                {table.label}
              </button>
            );
          })}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-temu-muted">
          Entrance Foyer
        </div>
      </div>
    </section>
  );
}
