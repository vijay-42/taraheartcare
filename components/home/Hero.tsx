"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { clinic, tel } from "@/lib/clinic";
import Button from "../Button";
import ECGMonitor from "../ECGMonitor";
import HeartMotif from "../HeartMotif";
import { ArrowUpRight, Calendar, Heart, Phone } from "../Icons";
import { Magnetic } from "../motion";
import { Lines } from "../reveal";
import { useOpenStatus } from "../useOpenStatus";

/** CSS intro delay helper: entrance animations run on first paint, without JS. */
const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export default function Hero() {
  // Gentle tilt of the portrait toward the cursor (enhancement only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 });

  return (
    <section className="relative px-3 pt-[118px] sm:px-4 lg:px-5">
      {/* ── Banner frame ───────────────────────────────────── */}
      <div
        className="on-dark relative isolate overflow-hidden rounded-[28px] bg-night text-white sm:rounded-[40px]"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
      >
        {/* Atmosphere: cheap gradients, no blur filters */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_75%_at_80%_38%,#6e1b2f_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_50%_at_0%_100%,rgb(212_192_158/0.12)_0%,transparent_70%)]" />
        <div className="grid-paper-dark pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_90%)]" />
        <HeartMotif className="pointer-events-none absolute -left-24 top-6 -z-10 hidden w-[600px] text-pulse/[0.09] lg:block" strokeWidth={0.7} />

        <div className="container-x relative grid items-center gap-14 pb-[150px] pt-12 sm:pt-16 lg:min-h-[min(calc(100svh-210px),820px)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pb-[120px]">
          {/* Copy */}
          <div>
            <p className="intro-fade label inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-2 pr-4 text-pulse" style={d(0.05)}>
              <span className="grid size-6 place-items-center rounded-full bg-pulse text-on-pulse">
                <Heart className="size-3 animate-beat" />
              </span>
              <span className="sm:hidden">Cardiology · 24/7 Cath Lab</span>
              <span className="hidden sm:inline">Cardiology · Diagnostics · 24/7 Cath Lab</span>
            </p>

            <h1 className="display mt-8 text-[clamp(3rem,6.1vw,6.3rem)] text-white">
              <Lines
                immediate
                delay={0.1}
                lines={[
                  "Every heartbeat",
                  <>
                    deserves <em className="text-pulse">undivided</em>
                  </>,
                  "attention.",
                ]}
              />
            </h1>

            <p className="intro-fade mt-8 max-w-[31rem] text-[17px] leading-relaxed text-white/70" style={d(0.35)}>
              Prevention, precise diagnosis and a round-the-clock Cath Lab, led by {clinic.doctor.name}: AIIMS and PGIMER trained, with {clinic.doctor.years}+ years in interventional cardiology.
            </p>

            <div className="intro-fade mt-9 flex flex-wrap gap-3" style={d(0.45)}>
              <Magnetic>
                <Button href="/contact#book" variant="light">Book a consultation</Button>
              </Magnetic>
              <Magnetic>
                <Button href={tel(clinic.phones.emergency)} variant="pulse" icon={<Phone className="size-4" />}>
                  Emergency care
                </Button>
              </Magnetic>
            </div>

            <dl className="intro-fade mt-12 grid max-w-[31rem] grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-6" style={d(0.55)}>
              {[
                [`${clinic.doctor.years}+`, "Years of expertise"],
                ["24×7", "Cath Lab on call"],
                ["50+", "Research papers"],
              ].map(([v, l], i) => (
                <div key={l} className={i ? "pl-5" : "pr-5"}>
                  <dt className="font-serif text-[clamp(1.9rem,2.6vw,2.5rem)] leading-none text-white">{v}</dt>
                  <dd className="label mt-2 !text-[10px] leading-snug text-white/45">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait */}
          <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle,rgb(212_192_158/0.2)_0%,transparent_62%)]" />
            {/* Concentric champagne arches: frame the photo instead of fighting it */}
            <div className="intro-fade absolute -inset-[14px] rounded-t-full rounded-b-[44px] border border-pulse/35" style={d(0.8)} />
            <div className="intro-fade absolute -inset-[30px] rounded-t-full rounded-b-[58px] border border-dashed border-pulse/15" style={d(0.95)} />
            {/* Photo arch: curtain reveal + settle */}
            <div className="intro-curtain absolute inset-0 overflow-hidden rounded-t-full rounded-b-[32px] bg-night-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,.7)]" style={d(0.15)}>
              {clinic.doctor.photo && (
                <div className="intro-settle absolute inset-0" style={d(0.15)}>
                  <Image src={clinic.doctor.photo} alt={`${clinic.doctor.name}, cardiologist`} fill priority sizes="(min-width:1024px) 34vw, 90vw" className="object-cover object-top" />
                </div>
              )}
              {/* Warm the bright clinic backdrop into the maroon palette */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#6e1b2f_0%,transparent_45%)] opacity-45 mix-blend-multiply" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(20,6,10,.45)]" />
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-night via-night/60 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-serif text-[26px] leading-none text-white">{clinic.doctor.name}</p>
                  <p className="label mt-2.5 !text-[9.5px] leading-relaxed text-pulse">{clinic.doctor.role}</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-pulse/40 text-pulse">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Floating chips: placed on background/shoulder, never over the face */}
            <VitalsChip />
            <div className="on-light intro-pop absolute -left-6 bottom-[30%] hidden items-center gap-3 rounded-2xl bg-paper py-3 pl-3 pr-5 text-ink shadow-[0_25px_60px_-20px_rgba(0,0,0,.6)] sm:flex lg:-left-16" style={d(1.0)}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pulse/15 font-serif text-[18px] text-pulse">1st</span>
              <div>
                <span className="label !text-[8.5px] text-gold">Pioneer · SE Asia</span>
                <p className="mt-0.5 font-serif text-[18px] leading-tight">LAA closure</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gold monitor trace */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <ECGMonitor height={130} amplitude={0.34} lineWidth={1.8} />
        </div>
        <span className="label absolute bottom-4 right-6 hidden text-white/35 md:block sm:right-10">↳ Move your cursor across the rhythm</span>
      </div>

      <QuickActions />
    </section>
  );
}

function VitalsChip() {
  return (
    <div
      className="on-light intro-pop absolute -right-5 top-[9%] hidden w-[188px] rounded-[20px] bg-paper p-4 text-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,.65)] sm:block lg:-right-14"
      style={d(1.15)}
    >
      <div className="flex items-center justify-between">
        <span className="label !text-[8.5px] text-mute">Resting rhythm</span>
        <Heart className="size-3.5 animate-beat text-pulse" />
      </div>
      <div className="mt-2 flex items-end gap-1.5">
        <span className="font-serif text-[44px] leading-[0.85]">72</span>
        <span className="label mb-0.5 !text-[8.5px] text-mute">bpm</span>
      </div>
      <svg viewBox="0 0 160 28" className="mt-3 h-7 w-full text-pulse" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M0 16h34l5-6 5 6h10l4 9 7-24 6 22 4-7h21l5-5 5 5h10l4 9 7-24 6 22 4-7h23" />
      </svg>
      <p className="mt-2 text-[11px] text-mute">Healthy range · 60–100</p>
    </div>
  );
}

function QuickActions() {
  const status = useOpenStatus();
  const tile = "intro-fade group relative flex min-h-[124px] flex-col justify-between gap-6 rounded-[24px] p-5 sm:min-h-[150px] sm:p-6 transition duration-500 hover:-translate-y-1";
  const arrow = (
    <span className="grid size-10 place-items-center rounded-full border border-current/15 transition duration-500 group-hover:rotate-45 group-hover:bg-current/10">
      <ArrowUpRight className="size-4" />
    </span>
  );
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Link href="/contact#book" className={`${tile} border border-line bg-paper`} style={d(0.6)}>
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-full bg-bone text-pulse">
            <Calendar className="size-5" />
          </span>
          {arrow}
        </div>
        <div>
          <p className="font-serif text-[26px] leading-tight">Book a consultation</p>
          <p className="mt-1 text-[13.5px] text-mute">Choose a day &amp; time in under a minute</p>
        </div>
      </Link>

      <a href={tel(clinic.phones.emergency)} className={`${tile} bg-pulse text-on-pulse`} style={d(0.68)}>
        <div className="flex items-start justify-between">
          <span className="label flex items-center gap-2 text-white/75">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-white" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            24/7 Emergency
          </span>
          {arrow}
        </div>
        <div>
          <p className="font-serif text-[30px] leading-none">{clinic.phones.emergency}</p>
          <p className="mt-2 text-[13.5px] text-white/70">Call before you come. We pre-alert the Cath Lab.</p>
        </div>
      </a>

      <Link href="/contact" className={`${tile} border border-line bg-paper`} style={d(0.76)}>
        <div className="flex items-start justify-between">
          <span className="label flex items-center gap-2 text-mute">
            <span className={`size-2 rounded-full ${status.open ? "bg-mint" : "bg-mute/50"}`} />
            Clinic hours
          </span>
          {arrow}
        </div>
        <div>
          <p className="font-serif text-[26px] leading-tight">{status.ready ? status.label : "OPD hours"}</p>
          <p className="mt-1 text-[13.5px] text-mute">{clinic.hoursShort}</p>
        </div>
      </Link>

      <Link href="/services/preventive-cardiology#checkup" className={`${tile} bg-sand`} style={d(0.84)}>
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-full bg-paper text-pulse">
            <Heart className="size-4" />
          </span>
          {arrow}
        </div>
        <div>
          <p className="font-serif text-[26px] leading-tight">Heart checkup packages</p>
          <p className="mt-1 text-[13.5px] text-mute">Know your risk, years before symptoms</p>
        </div>
      </Link>
    </div>
  );
}
