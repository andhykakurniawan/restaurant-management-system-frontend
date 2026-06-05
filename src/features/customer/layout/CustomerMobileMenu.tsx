import { Link } from "react-router-dom";
import { X } from "lucide-react";
import CustomerButton from "../components/CustomerButton";

interface CustomerMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", path: "/customer" },
  { label: "Menu", path: "/customer/menu" },
  { label: "Reservations", path: "/customer/reserve" },
  { label: "Order", path: "/customer/order" },
];

export default function CustomerMobileMenu({ isOpen, onClose }: CustomerMobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-60g-black/70 backdrop-blur-md transition md:hidden ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <aside
        className={`ml-auto h-full w-[86%] max-w-sm border-l border-white/10 bg-temu-darker p-6 transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="font-serif text-xl uppercase tracking-[0.2em] text-temu-bronze">
            Temu Rasa
          </span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-temu-cream"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-temu-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <CustomerButton className="mt-8 w-full">Book a Table</CustomerButton>
      </aside>
    </div>
  );
}
