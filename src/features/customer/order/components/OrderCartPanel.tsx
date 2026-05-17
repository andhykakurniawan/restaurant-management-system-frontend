import CustomerButton from "../../components/CustomerButton";
import { CustomerCartItem } from "../../type";
import { formatRupiah } from "../../utils/currency";

interface OrderCartPanelProps {
  bookingCode: string;
  items: CustomerCartItem[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  onUpdateNote: (menuId: string, note: string) => void;
  onRemoveItem: (menuId: string) => void;
}

export default function OrderCartPanel({
  bookingCode,
  items,
  subtotal,
  serviceCharge,
  total,
  onUpdateNote,
  onRemoveItem,
}: OrderCartPanelProps) {
  return (
    <aside className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="border-b border-white/10 pb-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-temu-bronze">
          Active Booking
        </span>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl text-temu-cream">{bookingCode || "TR-8821-2024"}</h2>
          <span className="text-xs text-temu-muted">Table 12</span>
        </div>
      </div>

      <div className="mt-6 max-h-[420px] space-y-5 overflow-y-auto pr-1">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-temu-muted">
          Your Order
        </h3>

        {!items.length && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm leading-7 text-temu-muted">
            Cart masih kosong. Pilih menu dulu buat mulai order.
          </div>
        )}

        {items.map((item) => (
          <div key={item.menuId} className="flex gap-4">
            <img
              src={item.imageUrl || "https://placehold.co/160x160/1F1F1F/C48A3A?text=TR"}
              alt={item.name}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-temu-cream">{item.name}</h4>
                <span className="text-sm text-temu-cream">
                  {formatRupiah(item.price * item.quantity)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-temu-muted">Qty: {item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.menuId)}
                  className="text-xs text-red-300 transition hover:text-red-200"
                >
                  Remove
                </button>
              </div>
              <input
                value={item.note}
                onChange={(event) => onUpdateNote(item.menuId, event.target.value)}
                className="mt-2 w-full border-b border-white/10 bg-transparent py-1 text-xs text-temu-muted outline-none placeholder:text-temu-muted focus:border-temu-bronze"
                placeholder="Add note..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
        <CartRow label="Subtotal" value={formatRupiah(subtotal)} />
        <CartRow label="Service Charge (10%)" value={formatRupiah(serviceCharge)} />
        <div className="flex items-center justify-between text-temu-bronze">
          <span className="font-serif text-2xl">Total</span>
          <span className="font-serif text-3xl">{formatRupiah(total)}</span>
        </div>
        <CustomerButton disabled={!items.length} className="w-full rounded-2xl">
          Place Your Order
        </CustomerButton>
      </div>
    </aside>
  );
}

function CartRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm text-temu-muted">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
