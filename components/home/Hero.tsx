"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { clinic, tel } from "@/lib/clinic";
import Button from "../Button";
import ECGMonitor from "../ECGMonitor";
import { ArrowUpRight, Calendar, Heart, Phone } from "../Icons";
import { Magnetic } from "../motion";
import { Lines } from "../reveal";
import { useOpenStatus } from "../useOpenStatus";

/** CSS intro delay helper: entrance animations run on first paint, without JS. */
const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export default function Hero() {
  const doc = clinic.doctor;
  const ledger: [string, string, string][] = [
    ["2005", "MD, General Medicine", "AIIMS, New Delhi"],
    ["2007", "DM, Cardiology", "PGIMER, Chandigarh"],
    ["2013", "Professor of Cardiology", "Youngest in India"],
    ["N°\u00a01", "LAA closures", "Most performed in India"],
  ];

  return (
    <section className="relative px-3 pt-[118px] sm:px-4 lg:px-5">
      <div className="on-dark relative isolate overflow-hidden rounded-[20px] bg-night text-white sm:rounded-[28px]">
        {/* One quiet light source, nothing else */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_30%_0%,rgb(110_27_47/0.55)_0%,transparent_70%)]" />

        <div className="relative grid lg:grid-cols-12">
          {/* ── Copy column ─────────────────────────────────── */}
          <div className="relative px-6 pb-12 pt-6 sm:px-10 lg:col-span-7 lg:px-14 lg:pb-[150px] xl:px-16">
            {/* Masthead */}
            <div className="intro-fade flex items-center justify-between gap-6 border-b border-white/12 pb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/50" style={d(0.05)}>
              <span>Interventional cardiology</span>
              <span className="hidden sm:inline">Cath Lab · 24 × 7</span>
            </div>

            <h1 className="display mt-14 text-[clamp(3rem,6.4vw,6.6rem)] leading-[0.92] text-white lg:mt-20">
              <Lines
                immediate
                delay={0.1}
                lines={[
                  "Every heartbeat",
                  <>
                    deserves <em className="font-normal text-pulse">undivided</em>
                  </>,
                  "attention.",
                ]}
              />
            </h1>

            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-14">
              <p className="intro-fade max-w-[27rem] text-[16.5px] leading-[1.65] text-white/65" style={d(0.35)}>
                Prevention, precise diagnosis and a round-the-clock Cath Lab, under one cardiologist who has spent {doc.years}+ years inside the arteries of the heart.
              </p>
              <div className="intro-fade flex flex-wrap gap-3" style={d(0.45)}>
                <Magnetic>
                  <Button href="/contact#book" variant="light">Book a consultation</Button>
                </Magnetic>
              </div>
            </div>

            {/* Credentials ledger: typeset like a CV, not stat bubbles */}
            <dl className="intro-fade mt-14 grid border-t border-white/12 sm:grid-cols-2" style={d(0.55)}>
              {ledger.map(([k, a, b], i) => (
                <div
                  key={a}
                  className={`grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b border-white/12 py-4 ${i % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"}`}
                >
                  <dt className="font-serif text-[22px] leading-none text-pulse">{k}</dt>
                  <dd className="text-[13.5px] leading-snug text-white/80">
                    {a}
                    <span className="block text-white/40">{b}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={tel(clinic.phones.emergency)}
              className="intro-fade group mt-8 inline-flex items-center gap-3 text-[14px] text-white/70 transition hover:text-white"
              style={d(0.65)}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-pulse" />
                <span className="relative inline-flex size-2 rounded-full bg-pulse" />
              </span>
              Chest pain right now? Call <span className="border-b border-white/30 pb-px font-medium text-white group-hover:border-white">{clinic.phones.emergency}</span>
              <Phone className="size-3.5" />
            </a>
          </div>

          {/* ── Portrait: full-bleed duotone plate ─────────── */}
          <figure className="group relative aspect-[4/5.4] overflow-hidden lg:aspect-auto lg:col-span-5 lg:min-h-0">
            {/* Photo keeps its native 4:5 ratio; mask dissolves its edges into the page (no seam) */}
            <div
              className="intro-curtain absolute inset-x-0 top-0 aspect-[4/5] lg:max-h-full [mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_55%,transparent_96%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_28%),linear-gradient(to_bottom,#000_55%,transparent_96%)] lg:[mask-composite:intersect]"
              style={d(0.15)}
            >
              {doc.photo && (
                <div className="intro-settle absolute inset-0" style={d(0.15)}>
                  <Image
                    src={doc.photo}
                    alt={`${doc.name}, cardiologist`}
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover object-top brightness-[1.08] contrast-[1.04] grayscale transition-[filter] duration-[1400ms] ease-out group-hover:grayscale-0"
                  />
                </div>
              )}
              {/* Brand duotone; lifts on hover to reveal true colour */}
              <div className="absolute inset-0 bg-[#a3707a] mix-blend-multiply transition-opacity duration-[1400ms] ease-out group-hover:opacity-0" />
            </div>

            {/* Vertical spine label */}
            <span className="intro-fade absolute right-5 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 [writing-mode:vertical-rl]" style={d(0.9)}>
              {doc.quals.split(" · ").slice(0, 3).join(" · ")}
            </span>

            <figcaption className="intro-fade absolute inset-x-6 bottom-[120px] sm:inset-x-10 lg:bottom-[150px]" style={d(0.85)}>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Lead consultant</span>
              <p className="mt-2 font-serif text-[30px] leading-[1.05] text-white">{doc.name}</p>
              <p className="mt-1 font-serif text-[17px] italic text-pulse">Pioneer of LAA closure in Southeast Asia</p>
            </figcaption>
          </figure>
        </div>

        {/* Gold monitor trace runs under both columns, across the portrait */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <ECGMonitor height={120} amplitude={0.32} lineWidth={1.5} />
        </div>
      </div>

      <QuickActions />
    </section>
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
