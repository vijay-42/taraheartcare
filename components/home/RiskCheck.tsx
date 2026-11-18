"use client";

import { AnimatePresence, motion, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clinic, tel } from "@/lib/clinic";
import { Alert, Check } from "../Icons";
import { EASE, Lines } from "../motion";

const AGES = [
  { label: "Under 35", pts: 0 },
  { label: "35 – 50", pts: 2 },
  { label: "50 – 65", pts: 3 },
  { label: "65+", pts: 4 },
];
const FACTORS = [
  { id: "smoke", label: "I smoke or chew tobacco", pts: 2 },
  { id: "diab", label: "I have diabetes", pts: 2 },
  { id: "bp", label: "I have high blood pressure", pts: 2 },
  { id: "chol", label: "My cholesterol is high", pts: 1 },
  { id: "fam", label: "A parent or sibling had heart disease young", pts: 2 },
  { id: "sed", label: "I'm overweight or rarely exercise", pts: 1 },
];
const MAX = 4 + FACTORS.reduce((a, f) => a + f.pts, 0);

const LEVELS = [
  { max: 3, name: "Lower", color: "#5f9a7c", text: "Keep it that way. A baseline heart check from 35 and yearly BP & sugar tests are a good habit." },
  { max: 7, name: "Moderate", color: "#b8904f", text: "A few risk factors add up. A preventive heart checkup can catch problems years before symptoms." },
  { max: 99, name: "Elevated", color: "#6e1b2f", text: "Several risk factors together raise your risk significantly. We recommend a cardiology consultation soon." },
];

/** A quick, friendly self-check. Clearly not a diagnosis. */
export default function RiskCheck() {
  const [age, setAge] = useState<number | null>(null);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [symptoms, setSymptoms] = useState(false);

  const score = useMemo(() => (age === null ? 0 : AGES[age].pts) + FACTORS.reduce((a, f) => a + (on[f.id] ? f.pts : 0), 0), [age, on]);
  const level = LEVELS.find((l) => score <= l.max)!;
  const started = age !== null;

  const spring = useSpring(0, { stiffness: 70, damping: 16 });
  useEffect(() => spring.set(started ? score / MAX : 0), [score, started, spring]);
  // Needle end point on a 72-unit radius around the pivot (100,100).
  const needleX = useTransform(spring, (v) => 100 + 72 * Math.sin((v - 0.5) * Math.PI));
  const needleY = useTransform(spring, (v) => 100 - 72 * Math.cos((v - 0.5) * Math.PI));
  const dashOffset = useTransform(spring, [0, 1], [283, 0]);

  return (
    <section className="py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="label text-pulse">60-second self-check</p>
            <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              <Lines lines={["How's your", <em key="h">heart, really?</em>]} />
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Tap what applies to you. Nothing is stored or sent anywhere. This is an awareness tool, not a diagnosis.
            </p>

            {/* Gauge */}
            <div className="mt-10 max-w-[380px] rounded-[28px] border border-line bg-paper p-6">
              <div className="relative mx-auto aspect-[2/1] w-full max-w-[300px]">
                <svg viewBox="0 0 200 105" className="w-full overflow-visible">
                  <path d="M10 100a90 90 0 0 1 180 0" fill="none" stroke="var(--color-sand)" strokeWidth="10" strokeLinecap="round" />
                  <motion.path
                    d="M10 100a90 90 0 0 1 180 0"
                    fill="none"
                    stroke={level.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    style={{ strokeDashoffset: dashOffset }}
                    className="transition-[stroke] duration-500"
                  />
                  <motion.line x1="100" y1="100" x2={needleX} y2={needleY} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="7" fill="var(--color-ink)" />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.div key={started ? level.name : "idle"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <p className="label text-mute">{started ? "Estimated risk" : "Start with your age"}</p>
                    <p className="mt-1 font-serif text-[40px] leading-none" style={{ color: started ? level.color : undefined }}>
                      {started ? level.name : "—"}
                    </p>
                    {started && <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-relaxed text-ink-soft">{level.text}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="label text-mute">01 · Your age</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {AGES.map((a, i) => (
                  <button
                    key={a.label}
                    onClick={() => setAge(i)}
                    className={`relative rounded-2xl border px-4 py-4 text-[15px] transition ${age === i ? "border-ink text-paper" : "border-line bg-paper hover:border-ink/40"}`}
                  >
                    {age === i && <motion.span layoutId="age" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                    <span className="relative">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label text-mute">02 · What applies to you?</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {FACTORS.map((f) => {
                  const active = !!on[f.id];
                  return (
                    <motion.button
                      key={f.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOn((o) => ({ ...o, [f.id]: !o[f.id] }))}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left text-[15px] transition-colors ${active ? "border-pulse bg-pulse/[.06]" : "border-line bg-paper hover:border-ink/40"}`}
                      aria-pressed={active}
                    >
                      <span className={`grid size-6 shrink-0 place-items-center rounded-full border transition ${active ? "border-pulse bg-pulse text-on-pulse" : "border-ink/20"}`}>
                        <AnimatePresence>{active && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="size-3.5" /></motion.span>}</AnimatePresence>
                      </span>
                      {f.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="label text-mute">03 · Any of these lately?</p>
              <button
                onClick={() => setSymptoms((s) => !s)}
                aria-pressed={symptoms}
                className={`mt-4 flex w-full items-center gap-4 rounded-2xl border p-4 text-left text-[15px] transition ${symptoms ? "border-pulse bg-pulse text-on-pulse" : "border-line bg-paper hover:border-ink/40"}`}
              >
                <Alert className="size-6 shrink-0" />
                Chest discomfort, breathlessness or palpitations on walking or climbing stairs
              </button>
              <AnimatePresence>
                {symptoms && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                    <p className="on-dark mt-3 rounded-2xl bg-night p-5 text-[15px] leading-relaxed text-white/80">
                      These symptoms should be checked by a cardiologist <strong className="text-white">soon</strong>, whatever your score. If the pain comes at rest, lasts more than a few minutes, or comes with sweating, call{" "}
                      <a href={tel(clinic.phones.emergency)} className="text-pulse underline underline-offset-4">{clinic.phones.emergency}</a> now.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
              <Link href={`/contact?service=${encodeURIComponent("Preventive Heart Checkup")}#book`} className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-medium text-paper transition hover:bg-pulse">
                Book a heart checkup
                <span className="grid size-8 place-items-center rounded-full bg-white/10 transition group-hover:rotate-45">↗</span>
              </Link>
              <button onClick={() => { setAge(null); setOn({}); setSymptoms(false); }} className="text-[14px] text-mute underline underline-offset-4 hover:text-ink">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
