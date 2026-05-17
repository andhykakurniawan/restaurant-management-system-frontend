import CustomerButton from "../../components/CustomerButton";
import { ReservationDraft } from "../../type";

interface ReservationContactFormProps {
  draft: ReservationDraft;
  onChange: (nextDraft: Partial<ReservationDraft>) => void;
}

export default function ReservationContactForm({
  draft,
  onChange,
}: ReservationContactFormProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-temu-bronze">
        Contact Information
      </h3>
      <div className="space-y-4">
        <input
          value={draft.customerName}
          onChange={(event) => onChange({ customerName: event.target.value })}
          className="w-full rounded-xl border border-white/10 bg-[#131313] p-4 text-temu-cream outline-none placeholder:text-temu-muted focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze"
          placeholder="Full Name"
        />
        <input
          type="email"
          value={draft.email}
          onChange={(event) => onChange({ email: event.target.value })}
          className="w-full rounded-xl border border-white/10 bg-[#131313] p-4 text-temu-cream outline-none placeholder:text-temu-muted focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze"
          placeholder="Email Address"
        />
        <textarea
          value={draft.specialRequest}
          onChange={(event) => onChange({ specialRequest: event.target.value })}
          className="h-28 w-full rounded-xl border border-white/10 bg-[#131313] p-4 text-temu-cream outline-none placeholder:text-temu-muted focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze"
          placeholder="Special request, allergies, or occasion"
        />
      </div>
      <CustomerButton className="mt-6 w-full rounded-2xl">Finalize Experience</CustomerButton>
      <p className="mt-4 text-center text-[10px] leading-5 text-temu-muted">
        Dummy flow for now. Backend booking submit can be wired through customerBookingApi.
      </p>
    </section>
  );
}
