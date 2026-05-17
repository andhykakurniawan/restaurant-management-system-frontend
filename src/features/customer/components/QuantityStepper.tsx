import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  min?: number;
  onChange: (value: number) => void;
}

export default function QuantityStepper({
  value,
  min = 0,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-white/10 bg-black/20 p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-temu-muted transition hover:bg-white/5 hover:text-temu-bronze focus:outline-none focus:ring-2 focus:ring-temu-bronze/60"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center text-sm font-bold text-temu-cream">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-temu-muted transition hover:bg-white/5 hover:text-temu-bronze focus:outline-none focus:ring-2 focus:ring-temu-bronze/60"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
