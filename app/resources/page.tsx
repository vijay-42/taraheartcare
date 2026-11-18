import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import { Alert, ArrowUpRight, Phone } from "@/components/Icons";
import { Lines, Marquee, Reveal } from "@/components/motion";
import PageHero from "@/components/PageHero";
import PrepGuide from "@/components/PrepGuide";
import { clinic, tel } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Patient Resources",
  description: "First-visit guide, pre-test instructions, heart attack warning signs, insurance & TPA details and heart-health articles from TARA Heart Care.",
};

const VISIT = [
  { t: "Book & arrive early", d: "Book online or by phone, and arrive 15 minutes early for registration." },
  { t: "Bring your records", d: "Old ECGs, Echo or angiography reports, blood tests, discharge summaries and your current medicines." },
  { t: "Consultation", d: "History, examination, BP and ECG, with time for your questions." },
  { t: "Tests, if needed", d: "Usually done the same day, on-site." },
  { t: "Your plan", d: "A clear diagnosis, prescription and follow-up date before you leave." },
];
const SYMPTOMS = ["Chest pain, pressure or heaviness", "Pain spreading to arm, jaw, neck or back", "Sudden breathlessness", "Cold sweat, nausea or vomiting", "Unusual tiredness or dizziness", "“Acidity” that won't settle"];
const POSTS = [
  { tag: "Awareness", t: "Heart attack or acidity? 7 signs you shouldn't ignore", m: "4 min read", tone: "bg-pulse text-on-pulse" },
  { tag: "Diet", t: "The Indian heart-healthy plate: what to eat, what to swap", m: "6 min read", tone: "on-dark bg-night text-white" },
  { tag: "Lifestyle", t: "30 minutes a day: a simple exercise plan for a stronger heart", m: "5 min read", tone: "bg-blush" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Patient Resources" }]}
        title={["Everything you need", <em key="r" className="text-pulse">before you visit.</em>]}
        intro="What to bring, how to prepare for each test, how insurance works, and how to recognise a heart attack early."
      />

      {/* First visit */}
      <section id="expect" className="scroll-mt-28 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="label text-pulse">What to expect</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
              <Lines lines={["Your first", <em key="v">visit.</em>]} />
            </h2>
          </div>
          <ol className="relative border-l border-ink/15 pl-8 sm:pl-12">
            {VISIT.map((v, i) => (
              <Reveal as="li" key={v.t} delay={i * 0.06} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[calc(2rem+7px)] top-1.5 size-3.5 rounded-full border-2 border-bone bg-pulse sm:-left-[calc(3rem+7px)]" />
                <span className="label text-mute">Step 0{i + 1}</span>
                <h3 className="mt-2 font-serif text-[30px] leading-tight">{v.t}</h3>
                <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-ink-soft">{v.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Prep guide */}
      <section id="prep" className="scroll-mt-28 bg-sand/50 py-20 sm:py-28">
        <div className="container-x">
          <p className="label text-pulse">Pre-test instructions</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
            <Lines lines={["Pick your test.", <em key="p" className="text-mute">We&apos;ll tell you how to prepare.</em>]} />
          </h2>
          <div className="mt-12">
            <PrepGuide />
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section id="symptoms" className="relative scroll-mt-28 overflow-hidden bg-pulse py-24 text-on-pulse sm:py-32">
        <div className="grid-paper-dark absolute inset-0 opacity-50" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label flex items-center gap-2 text-white/70"><Alert className="size-4" /> Know the warning signs</p>
            <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              <Lines lines={["Don't wait for", <em key="w" className="text-white/60">it to pass.</em>]} />
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/80">
              Women, people with diabetes and the elderly may have milder or unusual symptoms. When in doubt, call.
            </p>
            <div className="mt-8">
              <Button href={tel(clinic.phones.emergency)} variant="light" icon={<Phone className="size-4" />}>
                {clinic.phones.emergency}
              </Button>
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[28px] bg-white/20 sm:grid-cols-2">
            {SYMPTOMS.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.05} className="bg-pulse-deep/40 p-7 backdrop-blur">
                <span className="label text-white/50">0{i + 1}</span>
                <p className="mt-6 font-serif text-[26px] leading-tight">{s}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Insurance */}
      <section id="insurance" className="scroll-mt-28 py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="label text-pulse">Insurance &amp; TPA</p>
              <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
                <Lines lines={["Cashless,", <em key="c">simplified.</em>]} />
              </h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-soft lg:justify-self-end">
              We work with leading insurers, TPAs and government schemes. Our insurance desk handles the approvals so you can focus on recovery.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Marquee>
            {clinic.insurers.map((n) => (
              <span key={n} className="mr-4 whitespace-nowrap rounded-full border border-ink/15 bg-paper px-7 py-4 font-serif text-[22px] italic">{n}</span>
            ))}
          </Marquee>
        </div>
        <div className="container-x mt-12">
          <Accordion
            items={[
              { q: "Planned procedures", a: "Share your insurance / TPA card and ID 2–3 days before admission so we can secure pre-authorisation." },
              { q: "Emergency admission", a: "Treatment starts immediately. Our insurance desk processes the cashless approval in parallel. You don't wait for paperwork." },
              { q: "Documents to bring", a: "Insurance / TPA card, Aadhaar & PAN, policy copy, and previous medical records." },
            ]}
          />
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="scroll-mt-28 pb-28 sm:pb-36">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-20">
            <div>
              <p className="label text-pulse">Heart health journal</p>
              <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
                <Lines lines={["Learn. Prevent.", <em key="l">Live longer.</em>]} />
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {POSTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <article className="group cursor-pointer">
                  <div className={`relative aspect-[4/5] overflow-hidden rounded-[28px] p-7 ${p.tone}`}>
                    <div className="absolute inset-0 grid-paper-dark opacity-40 transition duration-700 group-hover:scale-110" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="label opacity-70">{p.tag}</span>
                        <span className="grid size-11 place-items-center rounded-full border border-current/25 transition duration-500 group-hover:rotate-45 group-hover:bg-current/10">
                          <ArrowUpRight className="size-5" />
                        </span>
                      </div>
                      <h3 className="font-serif text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.05]">{p.t}</h3>
                    </div>
                  </div>
                  <p className="label mt-4 text-mute">{p.m} · Coming soon</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
