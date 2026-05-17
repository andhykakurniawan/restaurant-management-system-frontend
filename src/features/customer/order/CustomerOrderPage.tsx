import { useState } from "react";
import CustomerSectionHeader from "../components/CustomerSectionHeader";
import { useCustomerMenu } from "../menu/hooks/useCustomerMenu";
import OrderCartPanel from "./components/OrderCartPanel";
import OrderItemCard from "./components/OrderItemCard";
import VerificationBanner from "./components/VerificationBanner";
import { useCart } from "./hooks/useCart";

export default function CustomerOrderPage() {
  const [bookingCode, setBookingCode] = useState("TR-8821-2024");
  const { menus, isLoading } = useCustomerMenu();
  const {
    items,
    totals,
    getQuantity,
    setItemQuantity,
    updateItemNote,
    removeItem,
  } = useCart();

  return (
    <main className="bg-temu-darker px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <CustomerSectionHeader
            eyebrow="Private Table Order"
            title="Order from your table with calm precision."
            description="A customer-facing table order flow with local cart state, booking code readiness, and menu data adapter."
          />
        </div>

        <VerificationBanner
          bookingCode={bookingCode}
          onBookingCodeChange={setBookingCode}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {isLoading ? (
              <div className="py-24 text-center text-xs font-bold uppercase tracking-[0.3em] text-temu-muted">
                Preparing table menu...
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {menus.map((menu) => (
                  <OrderItemCard
                    key={menu.id}
                    item={menu}
                    quantity={getQuantity(menu.id)}
                    onQuantityChange={(quantity) => setItemQuantity(menu, quantity)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <OrderCartPanel
              bookingCode={bookingCode}
              items={items}
              subtotal={totals.subtotal}
              serviceCharge={totals.serviceCharge}
              total={totals.total}
              onUpdateNote={updateItemNote}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
