"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { clinic, tel } from "@/lib/clinic";
import Button from "../Button";
import { Phone } from "../Icons";
import { Magnetic } from "../motion";
import { Lines } from "../reveal";

const STEPS = [
  { k: "Call", t: "You call our 24/7 line", d: "Describe the symptoms. Don't drive yourself, and chew a 300 mg aspirin if you're not allergic." },
  { k: "Alert", t: "We pre-alert the team", d: "The cardiologist and Cath Lab staff are notified while you're on the way." },
  { k: "Arrive", t: "ECG within minutes", d: "Straight from the door to an ECG and cardiologist review. No queue, no paperwork first." },
  { k: "Restore", t: "Artery opened", d: "Primary angioplasty restores blood flow. Guideline target: within 90 minutes of arrival." },
];

/** "Time is muscle": the emergency pathway lights up as you scroll. */
export default function GoldenHour() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(v < 0.02 ? -1 : Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));

  return (
    <section className="on-dark relative overflow-hidden bg-night py-28 text-white sm:py-36">
      <div className="grid-paper-dark absolute inset-0" />
      <div className="absolute left-1/2 -top-40 h-[800px] w-[1400px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(212_192_158/0.16)_0%,transparent_60%)]" />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="label text-pulse">Emergency heart attack care</p>
            <h2 className="display mt-6 text-[clamp(3rem,8vw,7.5rem)]">
              <Lines lines={["Time is", <em key="m" className="text-pulse">muscle.</em>]} />
            </h2>
          </div>
          <div>
            <p className="max-w-md text-[17px] leading-relaxed text-white/65">
              During a heart attack, every minute the artery stays blocked, more heart muscle is lost. Our pathway is built to get it open as fast as possible.
            </p>
            <div className="mt-8">
              <Magnetic>
                <Button href={tel(clinic.phones.emergency)} variant="pulse" icon={<Phone className="size-4" />}>
                  {clinic.phones.emergency}
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/15 md:block" />
          <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-[19px] hidden h-px origin-left bg-pulse md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => {
              const on = i <= active;
              return (
                <li key={s.k} className="relative">
                  <div className="flex items-center gap-4">
                    <span
                      className={`relative grid size-10 place-items-center rounded-full border font-mono text-[12px] transition-all duration-500 ${
                        on ? "border-pulse bg-pulse text-on-pulse shadow-[0_0_30px_rgba(212,192,158,.45)]" : "border-white/20 bg-night text-white/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className={`label transition-colors duration-500 ${on ? "text-pulse" : "text-white/30"}`}>{s.k}</span>
                  </div>
                  <h3 className={`mt-6 font-serif text-[30px] leading-tight transition-colors duration-500 ${on ? "text-white" : "text-white/35"}`}>{s.t}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed transition-colors duration-500 ${on ? "text-white/65" : "text-white/25"}`}>{s.d}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
