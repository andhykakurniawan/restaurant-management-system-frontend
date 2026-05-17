import { ButtonHTMLAttributes, ReactNode } from "react";

interface CustomerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "glass" | "ghost";
}

const variantClass = {
  primary:
    "bg-temu-bronze text-[#1b1208] shadow-[0_12px_35px_rgba(196,138,58,0.18)] hover:bg-[#d39a4a]",
  glass:
    "border border-temu-border/10 bg-white/5 text-temu-cream hover:border-temu-bronze/40 hover:bg-white/10",
  ghost: "text-temu-muted hover:bg-white/5 hover:text-temu-bronze",
};

export default function CustomerButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: CustomerButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-temu-bronze/70 focus:ring-offset-2 focus:ring-offset-temu-darker disabled:cursor-not-allowed disabled:opacity-60 ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
