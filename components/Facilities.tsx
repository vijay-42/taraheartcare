"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Lines } from "./motion";

const ITEMS = [
  { t: "Cath Lab", d: "Flat-panel imaging with low radiation dose for angiography, angioplasty and devices. Ready 24/7.", tone: "bg-pulse text-on-pulse" },
  { t: "Diagnostic suite", d: "Digital ECG, colour Doppler Echo, computerised TMT, Holter and ABPM, with same-day reports.", tone: "bg-paper" },
  { t: "Cardiac Care Unit", d: "Monitored beds, trained cardiac nurses, defibrillators and ventilator support.", tone: "on-dark bg-night text-white" },
  { t: "Consultation rooms", d: "Private, unhurried spaces to talk openly with your cardiologist.", tone: "bg-blush" },
  { t: "Patient comfort", d: "Air-conditioned lounge, clean restrooms, wheelchair access, space for family.", tone: "bg-paper" },
  { t: "Ambulance support", d: "Coordinated transfers with cardiac monitoring on board.", tone: "bg-sand" },
];

/** Vertical scroll drives a horizontal track of facility cards (desktop). */
export default function Facilities() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section ref={ref} className="relative lg:h-[280vh]">
      <div className="py-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-pulse">Infrastructure</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
              <Lines lines={["Built for precision.", <em key="c" className="text-mute">Designed for comfort.</em>]} />
            </h2>
          </div>
          <p className="label hidden text-mute lg:block">Keep scrolling →</p>
        </div>

        <motion.div style={{ x }} className="container-x mt-14 hidden gap-5 lg:flex">
          {ITEMS.map((it, i) => (
            <Card key={it.t} it={it} i={i} />
          ))}
        </motion.div>
        <div className="container-x mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {ITEMS.map((it, i) => (
            <Card key={it.t} it={it} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ it, i }: { it: (typeof ITEMS)[number]; i: number }) {
  return (
    <article className={`flex h-[340px] shrink-0 flex-col justify-between rounded-[28px] p-8 lg:h-[440px] lg:w-[400px] ${it.tone} ${it.tone.includes("paper") ? "border border-line" : ""}`}>
      <span className="label opacity-60">0{i + 1} / 0{ITEMS.length}</span>
      <div>
        <h3 className="display text-[44px]">{it.t}</h3>
        <p className="mt-4 text-[15px] leading-relaxed opacity-75">{it.d}</p>
      </div>
    </article>
  );
}
