interface CustomerSectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function CustomerSectionHeader({
  eyebrow,
  title,
  description,
}: CustomerSectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-temu-bronze">
        {eyebrow}
      </span>
      <h1 className="font-serif text-4xl font-semibold leading-tight text-temu-cream md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-base leading-8 text-temu-muted md:text-lg">{description}</p>
      )}
    </div>
  );
}
