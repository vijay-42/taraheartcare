import Link from "next/link";
import Button from "@/components/Button";
import GoldenHour from "@/components/home/GoldenHour";
import Hero from "@/components/home/Hero";
import RiskCheck from "@/components/home/RiskCheck";
import ServiceStack from "@/components/home/ServiceStack";
import Testimonials from "@/components/home/Testimonials";
import { Heart } from "@/components/Icons";
import { Counter, Lines, Marquee, Reveal, ScrollInk } from "@/components/motion";
import Portrait from "@/components/Portrait";
import { clinic } from "@/lib/clinic";

const TICKER = ["Preventive cardiology", "2D Echo", "Treadmill test", "Holter monitoring", "Coronary angiography", "Angioplasty", "Primary PCI", "Pacemakers", "Heart failure clinic"];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Service ticker */}
      <div className="border-y border-ink/10 bg-paper py-6">
        <Marquee>
          {TICKER.map((t) => (
            <span key={t} className="flex items-center gap-10 pr-10 font-serif text-[clamp(1.8rem,3.5vw,3rem)] italic text-ink/80">
              {t}
              <Heart className="size-5 not-italic text-pulse" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Philosophy statement */}
      <section className="py-28 sm:py-40">
        <div className="container-x grid gap-10 lg:grid-cols-[220px_1fr]">
          <p className="label pt-3 text-mute">(Our approach)</p>
          <ScrollInk
            className="font-serif text-[clamp(2rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.01em]"
            text="We believe the best heart care is the kind you rarely need in an emergency. So we listen first, test only what matters, explain everything plainly, and when every minute counts, we're ready."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink/10">
        <div className="container-x grid grid-cols-2 gap-px bg-ink/10 !px-0 lg:grid-cols-4">
          {clinic.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-bone px-5 py-10 sm:px-10 sm:py-14">
              <Counter to={s.value} suffix={s.suffix} className="block font-serif text-[clamp(3rem,6vw,5.5rem)] leading-none" />
              <span className="label mt-4 block text-mute">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceStack />

      {/* Specialist */}
      <section className="pb-28 sm:pb-36">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Portrait />
          <div className="flex flex-col justify-center">
            <p className="label text-pulse">Meet your cardiologist</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.8rem)]">
              <Lines lines={[clinic.doctor.name]} />
            </h2>
            <p className="label mt-4 text-mute">{clinic.doctor.quals}</p>
            <Reveal>
              <p className="mt-10 border-l-2 border-pulse pl-6 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] italic leading-[1.25] text-ink-soft">
                Pioneer of LAA closure in Southeast Asia. Trained at AIIMS New Delhi and PGIMER Chandigarh, and India&apos;s youngest Professor of Cardiology.
              </p>
            </Reveal>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {[
                ["Speciality", "Interventional & structural cardiology"],
                ["Experience", `${clinic.doctor.years}+ years · 50+ research publications`],
                ["Special interest", "LAA closure, TAVI, complex coronary interventions"],
                ["Languages", clinic.doctor.languages.join(", ")],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.06} className="grid grid-cols-[140px_1fr] gap-4 py-4 text-[15px]">
                  <dt className="label pt-1 text-mute">{k}</dt>
                  <dd>{v}</dd>
                </Reveal>
              ))}
            </dl>
            <div className="mt-10">
              <Button href="/about" variant="ghost">Full profile</Button>
            </div>
          </div>
        </div>
      </section>

      <GoldenHour />
      <RiskCheck />
      <Testimonials />

      {/* Insurance */}
      <section className="py-24">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-lg font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
            Cashless treatment with leading insurers &amp; TPAs. <em className="text-mute">We handle the paperwork.</em>
          </p>
          <Link href="/resources#insurance" className="label border-b border-ink pb-1 transition hover:border-pulse hover:text-pulse">
            Insurance details →
          </Link>
        </div>
        <div className="mt-12">
          <Marquee reverse>
            {clinic.insurers.map((n) => (
              <span key={n} className="mr-4 rounded-full border border-ink/15 bg-paper px-7 py-4 text-[16px] whitespace-nowrap text-ink-soft">
                {n}
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
}
