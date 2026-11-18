import type { Metadata } from "next";
import Button from "@/components/Button";
import { Lines, Reveal } from "@/components/reveal";
import PageHero from "@/components/PageHero";
import ServiceRows from "@/components/ServiceRows";
import SpecialityGrid from "@/components/SpecialityGrid";

export const metadata: Metadata = {
  title: "Services",
  description: "Preventive cardiology, ECG, 2D Echo, TMT, Holter, coronary angiography, angioplasty, primary PCI and pacemakers at TARA Heart Care.",
};

const JOURNEY = [
  { t: "Listen", d: "A detailed history and examination. We want the full story, not just the symptom." },
  { t: "Diagnose", d: "Only the tests you need, done on-site, with most reports the same day." },
  { t: "Treat", d: "Medicines, lifestyle or a Cath Lab procedure, with every option explained plainly." },
  { t: "Follow", d: "Scheduled reviews so your heart stays healthy for years, not weeks." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        title={["Care for every", <em key="s" className="text-pulse">stage of the heart.</em>]}
        intro="Three connected specialities, one team. Whether you need a routine checkup or an emergency angioplasty, you'll be looked after by the same people who know your heart."
      />
      <SpecialityGrid eyebrow="Every service at a glance" />
      <section className="py-16 sm:py-24">
        <ServiceRows />
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="container-x">
          <p className="label text-pulse">Your care journey</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
            <Lines lines={["Four steps.", <em key="n" className="text-mute">No confusion.</em>]} />
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.t} delay={i * 0.08} className="group bg-paper p-8 transition-colors duration-300 hover:bg-pulse hover:text-on-pulse">
                <span className="label text-pulse transition group-hover:text-white/70">0{i + 1}</span>
                <h3 className="mt-16 font-serif text-[40px] leading-none">{j.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft transition group-hover:text-white/80">{j.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Button href="/contact#book">Not sure where to start? Book a consultation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
