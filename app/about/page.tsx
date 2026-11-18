import type { Metadata } from "next";
import Button from "@/components/Button";
import Facilities from "@/components/Facilities";
import { Lines, Reveal, ScrollInk } from "@/components/motion";
import PageHero from "@/components/PageHero";
import Portrait from "@/components/Portrait";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the cardiologist behind TARA Heart Care. Read about qualifications, our mission and vision, and our modern cardiac facilities.",
};

const doc = clinic.doctor;
const VALUES = [
  { t: "Prevention first", d: "Screening and lifestyle guidance that stop disease before it starts." },
  { t: "Ethical always", d: "Only the tests and procedures you truly need, and we'll tell you why." },
  { t: "Speed saves lives", d: "Emergency protocols designed around the golden hour." },
  { t: "Family, not file", d: "Dignity, patience and plain language for every patient." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title={["A heart centre", <em key="b" className="text-pulse">built on trust.</em>]}
        intro="TARA Heart Care was founded on a simple belief: world-class cardiac care should be close to home, honest in its advice, and ready the moment you need it."
      />

      {/* Doctor */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Portrait />
          </div>
          <div>
            <p className="label text-pulse">Meet the cardiologist</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
              <Lines lines={[clinic.doctor.name]} />
            </h2>
            <p className="label mt-4 text-mute">{doc.role}</p>
            <p className="label mt-2 text-pulse">{doc.quals}</p>

            {doc.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`text-[18px] leading-relaxed text-ink-soft ${i === 0 ? "mt-8" : "mt-5"}`}>{para}</p>
              </Reveal>
            ))}

            {/* Key numbers */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-ink/10 sm:grid-cols-4">
              {doc.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 0.08} className="bg-paper p-5 sm:p-7">
                  <span className="block font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-pulse">{h.value}</span>
                  <span className="label mt-3 block !text-[10px] leading-snug text-mute">{h.label}</span>
                </Reveal>
              ))}
            </div>

            <h3 className="label mt-16 text-mute">Education &amp; training</h3>
            <ol className="mt-5 border-t border-ink/10">
              {doc.training.map((t, i) => (
                <Reveal as="li" key={t.degree} delay={i * 0.06} className="grid grid-cols-[72px_1fr] gap-4 border-b border-ink/10 py-5 sm:grid-cols-[90px_1fr_1fr]">
                  <span className="font-mono text-[13px] text-pulse">{t.year}</span>
                  <span className="font-serif text-[24px] leading-tight">{t.degree}</span>
                  <span className="col-start-2 text-[14px] text-mute sm:col-start-3 sm:text-right">{t.inst}</span>
                </Reveal>
              ))}
            </ol>

            <h3 className="label mt-16 text-mute">Areas of expertise</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {doc.expertise.map((e, i) => (
                <Reveal as="li" key={e} delay={i * 0.03} y={14}>
                  <span className="block rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[14px] transition hover:border-pulse hover:bg-pulse hover:text-on-pulse">{e}</span>
                </Reveal>
              ))}
            </ul>

            <h3 className="label mt-16 text-mute">Achievements &amp; recognition</h3>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-[24px] bg-ink/10 sm:grid-cols-2">
              {doc.achievements.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.05} className="flex gap-4 bg-paper p-5 text-[15px] leading-relaxed">
                  <span className="font-mono text-[12px] text-pulse">{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </Reveal>
              ))}
            </ul>

            <h3 className="label mt-16 text-mute">Clinical trials &amp; research</h3>
            <div className="mt-5 border-t border-ink/10">
              {doc.trials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.03} y={12} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-ink/10 py-4 sm:grid-cols-[1fr_200px_130px]">
                  <span className="font-serif text-[20px] leading-tight">{t.name}</span>
                  <span className="label row-start-2 !text-[10px] text-mute sm:row-start-auto">{t.role}</span>
                  <span className="text-right text-[13px] text-ink-soft">{t.sponsor}</span>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-12 sm:grid-cols-2">
              <div>
                <h3 className="label text-mute">Books</h3>
                <ul className="mt-5 space-y-4">
                  {doc.books.map((b) => (
                    <li key={b.title}>
                      <span className="block font-serif text-[22px] italic leading-tight">{b.title}</span>
                      <span className="label mt-1 block !text-[10px] text-mute">{b.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label text-mute">Fellowships &amp; memberships</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink-soft">
                  {doc.memberships.map((m) => (
                    <li key={m} className="flex gap-3">
                      <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-pulse" />
                      {m}
                    </li>
                  ))}
                </ul>
                <h3 className="label mt-10 text-mute">Languages spoken</h3>
                <p className="mt-4 font-serif text-[22px] leading-snug">{doc.languages.join(" · ")}</p>
              </div>
            </div>

            <p className="label mt-12 text-mute">Reg. {doc.reg}</p>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="on-dark bg-night py-28 text-white sm:py-36">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <p className="label pt-3 text-pulse">(Mission)</p>
            <ScrollInk
              className="font-serif text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.1]"
              text="To deliver honest, evidence-based and affordable heart care, and to make sure no patient with a heart emergency is ever turned away or kept waiting."
            />
          </div>
          <div className="mt-24 grid gap-10 lg:grid-cols-[220px_1fr]">
            <p className="label pt-3 text-pulse">(Vision)</p>
            <ScrollInk
              className="font-serif text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.1] text-white"
              text="A community where heart disease is detected early, prevented through awareness, and treated with world-class care close to home."
            />
          </div>
          <div className="mt-24 grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08} className="bg-night-2 p-8">
                <span className="label text-pulse">0{i + 1}</span>
                <h3 className="mt-14 font-serif text-[32px] leading-none">{v.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Facilities />

      <section className="pb-28">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-14">
          <p className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] leading-tight">
            Ready to meet us? <em className="text-mute">We&apos;re here six days a week.</em>
          </p>
          <Button href="/contact#book" variant="pulse">Book a consultation</Button>
        </div>
      </section>
    </>
  );
}
