import Link from "next/link";
import DoctorFeature from "@/components/home/DoctorFeature";
import GoldenHour from "@/components/home/GoldenHour";
import Hero from "@/components/home/Hero";
import RiskCheck from "@/components/home/RiskCheck";
import ServiceStack from "@/components/home/ServiceStack";
import Testimonials from "@/components/home/Testimonials";
import HeartMotif from "@/components/HeartMotif";
import { Marquee, ScrollInk } from "@/components/motion";
import { clinic } from "@/lib/clinic";

const CREDENTIALS = [
  ["AIIMS", "New Delhi"],
  ["PGIMER", "Chandigarh"],
  ["Kasturba Medical College", "Manipal"],
  ["FACC", "American College of Cardiology"],
  ["FESC", "European Society of Cardiology"],
  ["FSCAI", "Society for Cardiovascular Angiography & Interventions"],
  ["CSI", "Cardiological Society of India"],
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Credentials strip */}
      <div className="border-y border-ink/10 bg-paper">
        <div className="flex items-stretch">
          <p className="label hidden shrink-0 items-center border-r border-ink/10 px-8 text-mute md:flex">Trained &amp; certified</p>
          <Marquee className="py-6">
            {CREDENTIALS.map(([k, v]) => (
              <span key={k} className="flex items-baseline gap-3 whitespace-nowrap pr-14">
                <span className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium text-ink">{k}</span>
                <span className="label !text-[10px] text-mute">{v}</span>
                <span className="ml-11 text-[14px] text-gold">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Philosophy statement */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <HeartMotif className="pointer-events-none absolute -right-20 top-1/2 hidden w-[460px] -translate-y-1/2 text-pulse/[0.06] lg:block" strokeWidth={0.8} />
        <div className="container-x relative grid gap-10 lg:grid-cols-[220px_1fr]">
          <p className="label pt-3 text-mute">(Our approach)</p>
          <ScrollInk
            className="font-serif text-[clamp(2rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.01em]"
            text="We believe the best heart care is the kind you rarely need in an emergency. So we listen first, test only what matters, explain everything plainly, and when every minute counts, we're ready."
          />
        </div>
      </section>

      <ServiceStack />

      <DoctorFeature />

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
