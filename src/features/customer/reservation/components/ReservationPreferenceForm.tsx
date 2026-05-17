import { CalendarDays, Users } from "lucide-react";
import QuantityStepper from "../../components/QuantityStepper";
import { ReservationDraft } from "../../type";

interface ReservationPreferenceFormProps {
  draft: ReservationDraft;
  onChange: (nextDraft: Partial<ReservationDraft>) => void;
}

export default function ReservationPreferenceForm({
  draft,
  onChange,
}: ReservationPreferenceFormProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
      <h2 className="mb-8 flex items-center gap-3 font-serif text-3xl text-temu-cream">
        <CalendarDays className="text-temu-bronze" size={26} />
        General Preferences
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-temu-muted">
            Select Date
          </span>
          <input
            type="date"
            value={draft.date}
            onChange={(event) => onChange({ date: event.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#131313] p-4 text-temu-cream outline-none focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-temu-muted">
            Arrival Time
          </span>
          <select
            value={draft.time}
            onChange={(event) => onChange({ time: event.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#131313] p-4 text-temu-cream outline-none focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze"
          >
            <option value="18:30">18:30 - Sunset Seat</option>
            <option value="19:45">19:45 - Prime Time</option>
            <option value="21:00">21:00 - Late Night</option>
          </select>
        </label>

        <div className="space-y-2">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-temu-muted">
            <Users size={15} /> Guest Count
          </span>
          <div className="flex h-[58px] items-center justify-between rounded-xl border border-white/10 bg-[#131313] px-3">
            <QuantityStepper
              min={1}
              value={draft.guestCount}
              onChange={(guestCount) => onChange({ guestCount })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
