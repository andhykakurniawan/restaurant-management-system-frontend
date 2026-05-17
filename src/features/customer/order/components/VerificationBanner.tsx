import { ShieldCheck } from "lucide-react";
import CustomerButton from "../../components/CustomerButton";

interface VerificationBannerProps {
  bookingCode: string;
  onBookingCodeChange: (value: string) => void;
}

export default function VerificationBanner({
  bookingCode,
  onBookingCodeChange,
}: VerificationBannerProps) {
  return (
    <section className="mb-10 rounded-2xl border border-temu-bronze/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-temu-bronze/15 text-temu-bronze">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-temu-bronze">Table Verification</h2>
            <p className="mt-1 text-sm leading-7 text-temu-muted">
              Enter a booking code to simulate private menu access. This is ready for
              booking verification API later.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <input
            value={bookingCode}
            onChange={(event) => onBookingCodeChange(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#131313] px-4 py-3 text-temu-cream outline-none placeholder:text-temu-muted focus:border-temu-bronze focus:ring-1 focus:ring-temu-bronze md:w-64"
            placeholder="TR-8821-2024"
          />
          <CustomerButton className="rounded-xl">Verify</CustomerButton>
        </div>
      </div>
    </section>
  );
}
