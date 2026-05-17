import { ArrowRight } from "lucide-react";
import CustomerSectionHeader from "../../components/CustomerSectionHeader";
import { atmosphereGalleryItems } from "../data/gallery.mock";

export default function AtmosphereGallery() {
  return (
    <section className="bg-[#131313] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <CustomerSectionHeader
            eyebrow="The Gallery"
            title="Capturing the atmosphere."
            description="Warm bronze light, polished shadows, and spaces made for slow conversations."
          />
          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-temu-muted transition hover:text-temu-bronze">
            View Full Collection <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid auto-rows-[190px] grid-cols-1 gap-5 md:grid-cols-12">
          {atmosphereGalleryItems.map((item) => (
            <figure
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-temu-charcoal ${item.className}`}
            >
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                className="h-full w-full object-cover brightness-75 transition duration-700 group-hover:scale-105 group-hover:brightness-90"
              />
              <figcaption className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-500 group-hover:bg-black/35 group-hover:opacity-100">
                <span className="rounded-full border border-white/30 bg-black/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {item.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
