import type { Metadata } from "next";
import Button from "@/components/Button";
import DoctorCard from "@/components/DoctorCard";
import HeartMotif from "@/components/HeartMotif";
import PageHero from "@/components/PageHero";
import Portrait from "@/components/Portrait";
import { Lines, Reveal } from "@/components/reveal";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet the cardiologists and specialists at TARA Heart Care: qualifications, areas of focus and OPD days.",
};

const lead = clinic.doctor;
const leadDays = Object.entries(clinic.sessions)
  .filter(([, s]) => s.length > 0)
  .map(([d]) => Number(d));

const WEEK = [
  [1, "Mon"],
  [2, "Tue"],
  [3, "Wed"],
  [4, "Thu"],
  [5, "Fri"],
  [6, "Sat"],
  [0, "Sun"],
] as const;

const roster = [
  { name: lead.name, role: lead.role.split("·")[1]?.trim() ?? lead.role, days: leadDays },
  ...clinic.team.map((m) => ({ name: m.name, role: m.specialty, days: m.days })),
];

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Doctors" }]}
        title={["The hands", <em key="b" className="text-pulse">behind every heartbeat.</em>]}
        intro="A small, senior team that works together on every case: the cardiologist you meet in OPD is the same one who reads your angiogram and stands beside you in the Cath Lab."
      />

      {/* Lead consultant */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="on-dark relative overflow-hidden rounded-[36px] bg-night text-white">
            <div className="grid-paper-dark absolute inset-0 opacity-50" />
            <HeartMotif className="pointer-events-none absolute -right-24 -top-16 w-[520px] text-pulse/10" strokeWidth={0.8} />
            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
              <Portrait />
              <div className="flex flex-col justify-center">
                <p className="label text-pulse">01 · Lead consultant</p>
                <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4.4rem)]">
                  <Lines lines={["Dr. (Prof.)", <em key="n" className="text-pulse">Ranjan Shetty</em>]} />
                </h2>
                <p className="label mt-5 text-white/55">{lead.quals}</p>
                <Reveal>
                  <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/75">{lead.bio[0]}</p>
                </Reveal>

                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-4">
                  {lead.highlights.map((h) => (
                    <div key={h.label} className="bg-night-2/90 p-5">
                      <span className="block font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-none text-pulse">{h.value}</span>
                      <span className="mt-2 block text-[12px] leading-snug text-white/50">{h.label}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {lead.expertise.slice(0, 7).map((e) => (
                    <li key={e} className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/75">{e}</li>
                  ))}
                  <li className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/45">+{lead.expertise.length - 7} more</li>
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/about" variant="pulse">Full profile</Button>
                  <Button href="/contact#book" variant="outline-light">Book with {lead.shortName}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care team */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-pulse">The care team</p>
              <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)]">
                <Lines lines={["Specialists who", <em key="b" className="text-mute">work as one.</em>]} />
              </h2>
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-ink-soft">
              Imaging, prevention and critical care under one roof, so your tests, treatment and follow-up never get lost between departments.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clinic.team.map((m, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <DoctorCard member={m} index={i + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPD roster */}
      <section className="border-y border-ink/10 bg-paper py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div>
            <p className="label text-pulse">OPD roster</p>
            <h2 className="mt-6 font-serif text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[1.05]">
              Who&apos;s in, <em className="text-mute">which day.</em>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              OPD runs {clinic.hoursShort}. Emergency and Cath Lab cover is available 24×7, whoever is on the roster.
            </p>
          </div>

          <div className="-mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15">
                  <th className="label py-4 pr-4 font-normal text-mute">Doctor</th>
                  {WEEK.map(([d, l]) => (
                    <th key={d} className="label w-14 py-4 text-center font-normal text-mute">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roster.map((r, i) => (
                  <tr key={i} className="border-b border-ink/10 transition-colors hover:bg-bone">
                    <td className="py-5 pr-4">
                      <span className="block font-serif text-[22px] leading-tight">{r.name}</span>
                      <span className="label mt-1 block !text-[10px] text-mute">{r.role}</span>
                    </td>
                    {WEEK.map(([d]) => (
                      <td key={d} className="text-center">
                        {r.days.includes(d) ? (
                          <span className="inline-block size-3 rounded-full bg-pulse ring-4 ring-pulse/10" aria-label="In OPD" />
                        ) : (
                          <span className="inline-block size-1.5 rounded-full bg-ink/15" aria-label="Not in OPD" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-2xl font-serif text-[clamp(1.8rem,3.5vw,3rem)] leading-tight">
            Not sure who to see? <em className="text-mute">Call us and we&apos;ll book the right specialist.</em>
          </p>
          <Button href="/contact#book" variant="pulse">Book a consultation</Button>
        </div>
      </section>
    </>
  );
}
