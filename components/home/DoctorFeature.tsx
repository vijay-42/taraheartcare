import Image from "next/image";
import { clinic } from "@/lib/clinic";
import Button from "../Button";
import HeartMotif from "../HeartMotif";
import { Counter } from "../motion";
import { Lines, Reveal } from "../reveal";

const doc = clinic.doctor;

/** Credentials showcase for the lead cardiologist (home page). */
export default function DoctorFeature() {
  return (
    <section className="pb-28 sm:pb-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Story */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            {doc.photo && (
              <span className="relative size-16 overflow-hidden rounded-full ring-2 ring-gold/50 ring-offset-4 ring-offset-bone">
                <Image src={doc.photo} alt="" fill sizes="64px" className="object-cover object-top" />
              </span>
            )}
            <p className="label text-pulse">Meet your cardiologist</p>
          </div>
          <h2 className="display mt-8 text-[clamp(2.6rem,4.6vw,4.4rem)]">
            <Lines lines={["Dr. (Prof.)", <em key="n" className="text-pulse">Ranjan Shetty</em>]} />
          </h2>
          <p className="label mt-5 text-mute">{doc.quals}</p>
          <Reveal>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft">{doc.bio[0]}</p>
          </Reveal>

          <ul className="mt-10 border-t border-ink/10">
            {doc.achievements.slice(0, 4).map((a, i) => (
              <Reveal as="li" key={a} delay={i * 0.06} className="flex items-baseline gap-5 border-b border-ink/10 py-4 text-[15px]">
                <span className="font-mono text-[12px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                {a}
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/about" variant="ink">Read full profile</Button>
          </div>
        </div>

        {/* Credentials card */}
        <Reveal className="on-dark relative overflow-hidden rounded-[32px] bg-night p-8 text-white sm:p-12">
          <div className="grid-paper-dark absolute inset-0 opacity-60" />
          <HeartMotif className="absolute -right-16 -top-10 w-[360px] text-pulse/15" />
          <div className="relative">
            <p className="label text-pulse">By the numbers</p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-white/10">
              {[
                { to: doc.years, suffix: "+", label: "Years in interventional cardiology" },
                { to: 50, suffix: "+", label: "Scientific publications" },
                { to: 11, suffix: "", label: "Clinical trials & studies" },
                { to: 2013, suffix: "", label: "India's youngest Professor of Cardiology", plain: true },
              ].map((s) => (
                <div key={s.label} className="bg-night-2/90 p-6">
                  <Counter to={s.to} suffix={s.suffix} plain={"plain" in s} className="block font-serif text-[clamp(2.6rem,4vw,3.6rem)] leading-none text-pulse" />
                  <span className="mt-3 block text-[13px] leading-snug text-white/55">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="label mt-12 text-white/45">Training</p>
            <ol className="relative mt-6 space-y-6 border-l border-white/15 pl-7">
              {doc.training.map((t) => (
                <li key={t.degree} className="relative">
                  <span className="absolute -left-[33px] top-1.5 size-2.5 rounded-full bg-pulse ring-4 ring-night" />
                  <span className="font-mono text-[12px] text-pulse">{t.year}</span>
                  <p className="mt-1 font-serif text-[24px] leading-tight">{t.degree}</p>
                  <p className="text-[13px] text-white/50">{t.inst}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
