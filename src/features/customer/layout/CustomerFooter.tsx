export default function CustomerFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#131313] px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h2 className="font-serif text-3xl text-temu-bronze">Temu Rasa</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-temu-muted">
            Cinematic coffee, refined dining, and warm Indonesian craft for slower
            moments.
          </p>
        </div>

        {["Explore", "Experience", "Legal"].map((title) => (
          <div key={title} className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-temu-cream">
              {title}
            </h3>
            <a className="text-sm text-temu-muted transition hover:text-temu-bronze" href="#">
              Sourcing
            </a>
            <a className="text-sm text-temu-muted transition hover:text-temu-bronze" href="#">
              Private Dining
            </a>
            <a className="text-sm text-temu-muted transition hover:text-temu-bronze" href="#">
              Contact
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}
