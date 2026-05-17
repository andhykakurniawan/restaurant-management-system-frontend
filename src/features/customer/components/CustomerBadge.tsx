import { ReactNode } from "react";

interface CustomerBadgeProps {
  children: ReactNode;
  tone?: "bronze" | "muted";
}

export default function CustomerBadge({ children, tone = "muted" }: CustomerBadgeProps) {
  const toneClass =
    tone === "bronze"
      ? "border-temu-bronze/40 bg-temu-bronze/15 text-temu-bronze"
      : "border-white/10 bg-white/5 text-temu-muted";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${toneClass}`}
    >
      {children}
    </span>
  );
}
