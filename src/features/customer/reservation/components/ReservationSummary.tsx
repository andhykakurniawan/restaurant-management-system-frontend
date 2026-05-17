import { formatRupiah } from "../../utils/currency";
import { ReservationDraft, ReservationTable } from "../../type";

interface ReservationSummaryProps {
  draft: ReservationDraft;
  selectedTable: ReservationTable;
  reservationFee: number;
}

export default function ReservationSummary({
  draft,
  selectedTable,
  reservationFee,
}: ReservationSummaryProps) {
  return (
    <aside className="relative">
      <div className="absolute -top-4 left-1/2 h-8 w-[90%] -translate-x-1/2 rounded-t-2xl bg-white/[0.04]" />
      <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#131313] p-7 shadow-2xl shadow-black/30">
        <div className="mb-8 border-b border-dashed border-white/15 pb-7 text-center">
          <h3 className="font-serif text-3xl text-temu-bronze">Reservation Pending</h3>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-temu-muted">
            Order No: TR-7721
          </p>
        </div>

        <div className="space-y-5">
          <SummaryRow label="Date & Time" value={`${draft.date} - ${draft.time}`} />
          <SummaryRow label="Placement" value={`${selectedTable.label}, ${selectedTable.area}`} />
          <SummaryRow label="Guests" value={`${draft.guestCount} guest(s)`} />
          <SummaryRow label="Experience" value="Cinematic Dining" />
        </div>

        <div className="mt-8 space-y-4 border-t border-dashed border-white/15 pt-6">
          <SummaryRow label="Reservation Fee" value={formatRupiah(reservationFee)} />
          <div className="flex items-center justify-between gap-4 text-temu-bronze">
            <span className="font-serif text-2xl">Total Due</span>
            <span className="font-serif text-3xl">{formatRupiah(reservationFee)}</span>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-white/[0.04] p-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-temu-muted">
          Temu Rasa Digital Reservation
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-temu-muted">
        {label}
      </span>
      <span className="max-w-[180px] text-right text-sm font-semibold text-temu-cream">{value}</span>
    </div>
  );
}
