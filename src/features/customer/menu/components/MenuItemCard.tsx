import CustomerBadge from "../../components/CustomerBadge";
import { formatRupiah } from "../../utils/currency";
import { CustomerMenuItem } from "../../type";

interface MenuItemCardProps {
  item: CustomerMenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#202020]/80 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-temu-bronze/30 hover:shadow-temu-bronze/10">
      <div className="relative aspect-[4/5] overflow-hidden bg-temu-charcoal">
        {item.badge && (
          <div className="absolute left-4 top-4 z-10">
            <CustomerBadge tone="bronze">{item.badge}</CustomerBadge>
          </div>
        )}
        <img
          src={item.imageUrl || "https://placehold.co/800x1000/1F1F1F/C48A3A?text=Temu+Rasa"}
          alt={item.name}
          className="h-full w-full object-cover brightness-75 transition duration-700 group-hover:scale-105 group-hover:brightness-90"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-temu-cream">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-temu-bronze">
              {item.categoryName}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-temu-cream">
              {item.name}
            </h2>
          </div>
          <span className="shrink-0 font-serif text-xl text-temu-bronze">
            {formatRupiah(item.price)}
          </span>
        </div>

        <p className="min-h-14 text-sm leading-7 text-temu-muted">{item.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <CustomerBadge key={tag}>{tag}</CustomerBadge>
          ))}
        </div>
      </div>
    </article>
  );
}
