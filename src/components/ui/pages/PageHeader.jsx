export default function PageHeader({ title, description, actionText, onAction, icon: Icon }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-temu-cream">
          {title}<span className="text-temu-bronze">.</span>
        </h1>
        <p className="text-sm text-temu-coffee mt-1">{description}</p>
      </div>
      {actionText && (
        <button onClick={onAction} className="flex items-center justify-center gap-2 rounded-xl bg-temu-bronze px-6 py-3 text-sm font-bold text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg">
          {Icon && <Icon size={18} strokeWidth={3} />}
          {actionText}
        </button>
      )}
    </div>
  );
}