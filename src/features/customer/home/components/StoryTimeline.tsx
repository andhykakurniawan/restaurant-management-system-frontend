import CustomerSectionHeader from "../../components/CustomerSectionHeader";
import { timelineMilestones } from "../data/timeline.mock";

export default function StoryTimeline() {
  return (
    <section className="bg-temu-darker px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex justify-center text-center">
          <CustomerSectionHeader
            eyebrow="The Journey"
            title="Our narrative is built through ritual, space, and restraint."
            description="Every chapter of Temu Rasa is designed to feel intentional, warm, and quietly memorable."
          />
        </div>

        <div className="relative space-y-16 before:absolute before:left-4 before:top-0 before:hidden before:h-full before:w-px before:bg-white/10 md:before:left-1/2 md:before:block">
          {timelineMilestones.map((milestone, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={milestone.year}
                className="relative grid items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <div
                  className={`rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl ${
                    isReversed ? "md:order-2" : "md:text-right"
                  }`}
                >
                  <span className="font-serif text-5xl text-temu-bronze">
                    {milestone.year}
                  </span>
                  <h2 className="mt-3 font-serif text-3xl text-temu-cream">
                    {milestone.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-temu-muted">
                    {milestone.description}
                  </p>
                </div>

                <div className={`relative ${isReversed ? "md:order-1" : ""}`}>
                  <div className="absolute top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full border-4 border-temu-darker bg-temu-bronze shadow-[0_0_18px_rgba(196,138,58,0.5)] md:block md:-left-8" />
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-temu-charcoal">
                    <img
                      src={milestone.imageUrl}
                      alt={milestone.imageAlt}
                      className="h-72 w-full object-cover grayscale-[0.2] transition duration-700 hover:scale-105 hover:grayscale-0"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
