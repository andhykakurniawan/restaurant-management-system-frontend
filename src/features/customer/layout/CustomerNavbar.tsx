import { Link, NavLink } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import CustomerButton from "../components/CustomerButton";

const navItems = [
  { label: "Menu", path: "/customer/menu" },
  { label: "Reservations", path: "/customer/reserve" },
  { label: "The Gallery", path: "/customer" },
  { label: "Our Story", path: "/customer" },
];

interface CustomerNavbarProps {
  onOpenMenu: () => void;
}

export default function CustomerNavbar({ onOpenMenu }: CustomerNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-temu-darker/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:h-24 md:px-10">
        <Link
          to="/customer"
          className="font-serif text-2xl font-semibold uppercase tracking-[0.22em] text-temu-bronze"
        >
          Temu Rasa
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "bg-temu-bronze/10 text-temu-bronze"
                    : "text-temu-muted hover:bg-white/5 hover:text-temu-cream"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search menu"
            className="hidden rounded-full p-3 text-temu-muted transition hover:bg-white/5 hover:text-temu-bronze md:inline-flex"
          >
            <Search size={18} />
          </button>
          <Link to="/customer/reserve" className="hidden md:block">
            <CustomerButton>Book a Table</CustomerButton>
          </Link>
          <button
            aria-label="Open menu"
            onClick={onOpenMenu}
            className="rounded-full border border-white/10 p-3 text-temu-cream md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
