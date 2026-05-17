interface ReservationStepperProps {
  activeStep?: number;
}

const steps = ["Details", "Selection", "Finalize"];

export default function ReservationStepper({ activeStep = 1 }: ReservationStepperProps) {
  return (
    <div className="mx-auto mb-14 flex max-w-3xl items-center justify-center gap-3 md:gap-5">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= activeStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${
                isActive
                  ? "border-temu-bronze text-temu-bronze shadow-[0_0_18px_rgba(196,138,58,0.24)]"
                  : "border-white/20 text-temu-muted"
              }`}
            >
              {stepNumber}
            </div>
            <span
              className={`hidden text-xs font-bold uppercase tracking-[0.18em] md:block ${
                isActive ? "text-temu-bronze" : "text-temu-muted"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && <div className="h-px w-10 bg-white/15 md:w-24" />}
          </div>
        );
      })}
    </div>
  );
}
