import { Link } from "react-router-dom";
import CustomerButton from "../../components/CustomerButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-5 py-24 md:px-10">
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85"
        alt="Temu Rasa premium cafe interior"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55 brightness-75"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,31,31,0.18),rgba(31,31,31,0.96))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-temu-darker to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-5xl flex-col items-center justify-center text-center">
        <span className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-temu-bronze">
          Cinematic Indulgence
        </span>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-temu-cream md:text-7xl">
          Temu Rasa, try and find your best moment.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#d8d0c8] md:text-lg">
          A sanctuary for discerning taste, where Indonesian coffee craft meets
          quiet luxury, warm shadows, and slow dining rituals.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link to="/customer/menu">
            <CustomerButton className="w-full sm:w-auto">View Menu</CustomerButton>
          </Link>
          <Link to="/customer/reserve">
            <CustomerButton variant="glass" className="w-full sm:w-auto">
              Reserve Table
            </CustomerButton>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-temu-muted md:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-temu-bronze to-transparent" />
      </div>
    </section>
  );
}
