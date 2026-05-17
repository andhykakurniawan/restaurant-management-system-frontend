import QuantityStepper from "../../components/QuantityStepper";
import { CustomerMenuItem } from "../../type";
import { formatRupiah } from "../../utils/currency";

interface OrderItemCardProps {
  item: CustomerMenuItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function OrderItemCard({
  item,
  quantity,
  onQuantityChange,
}: OrderItemCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#202020]/80 transition duration-500 hover:border-temu-bronze/30">
      <div className="h-48 overflow-hidden bg-temu-charcoal">
        <img
          src={item.imageUrl || "https://placehold.co/700x400/1F1F1F/C48A3A?text=Temu+Rasa"}
          alt={item.name}
          className="h-full w-full object-cover brightness-75 transition duration-700 group-hover:scale-105 group-hover:brightness-90"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight text-temu-cream">{item.name}</h3>
          <span className="text-sm font-bold text-temu-bronze">{formatRupiah(item.price)}</span>
        </div>
        <p className="min-h-12 text-sm leading-6 text-temu-muted">{item.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <QuantityStepper value={quantity} onChange={onQuantityChange} />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-temu-muted">
            {quantity > 0 ? "In Order" : "Add Item"}
          </span>
        </div>
      </div>
    </article>
  );
}
