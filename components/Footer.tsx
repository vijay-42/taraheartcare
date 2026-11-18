"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { clinic, mapsSearch, tel, waLink } from "@/lib/clinic";
import { services } from "@/lib/services";
import Button from "./Button";
import ECGMonitor from "./ECGMonitor";
import { Phone, WhatsApp } from "./Icons";
import Logo from "./Logo";
import { Magnetic } from "./motion";
import { Lines } from "./reveal";
import { useOpenStatus } from "./useOpenStatus";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const status = useOpenStatus();

  return (
    <footer ref={ref} className="on-dark relative overflow-hidden bg-night text-white">
      <div className="grid-paper-dark absolute inset-0 opacity-60" />

      {/* Closing CTA */}
      <div className="container-x relative pt-28 pb-16">
        <p className="label text-pulse">Your heart, our priority</p>
        <h2 className="display mt-6 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">
          <Lines lines={["Let's take care", <em key="e" className="text-white/50">of your heart.</em>]} />
        </h2>
        <div className="mt-12 flex flex-wrap gap-3">
          <Magnetic>
            <Button href="/contact#book" variant="pulse">Book an appointment</Button>
          </Magnetic>
          <Magnetic>
            <Button href={waLink("Hello TARA Heart Care, I'd like to book an appointment.")} variant="outline-light" icon={<WhatsApp className="size-4" />}>
              WhatsApp us
            </Button>
          </Magnetic>
        </div>
      </div>

      <div className="relative opacity-70">
        <ECGMonitor height={90} amplitude={0.32} lineWidth={1.5} />
      </div>

      {/* Columns */}
      <div className="container-x relative grid gap-12 border-t border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light className="h-24" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/55">
            Prevention, diagnostics and a 24/7 Cath Lab under one roof. Led by {clinic.doctor.name}, {clinic.doctor.quals}.
          </p>
          <div className="mt-6 flex gap-2">
            {Object.entries(clinic.social).map(([k, v]) => (
              <a key={k} href={v} className="label rounded-full border border-white/15 px-3 py-2 !text-[10px] text-white/60 transition hover:border-pulse hover:bg-pulse hover:text-on-pulse">
                {k}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="label text-white/40">Services</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/75 transition hover:text-white">
                  {s.title} {s.titleItalic}
                </Link>
              </li>
            ))}
            <li><Link href="/resources#prep" className="text-white/75 transition hover:text-white">Pre-test instructions</Link></li>
            <li><Link href="/resources#insurance" className="text-white/75 transition hover:text-white">Insurance &amp; TPA</Link></li>
          </ul>
        </div>

        <div>
          <p className="label text-white/40">Hours</p>
          <p className="mt-5 flex items-center gap-2 text-[14px]">
            <span className={`size-1.5 rounded-full ${status.open ? "bg-mint" : "bg-white/40"}`} /> {status.label}
          </p>
          <ul className="mt-4 space-y-3 text-[14px] text-white/65">
            {clinic.hoursDisplay.map((h) => (
              <li key={h.day}>
                <span className={`block ${h.emphasis ? "text-pulse" : "text-white"}`}>{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-white/40">Reach us</p>
          <ul className="mt-5 space-y-4 text-[15px]">
            <li>
              <a href={tel(clinic.phones.emergency)} className="group flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-pulse"><Phone className="size-4" /></span>
                <span><span className="label block !text-[9px] text-white/40">Emergency 24/7</span>{clinic.phones.emergency}</span>
              </a>
            </li>
            <li>
              <a href={tel(clinic.phones.appointments)} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-white/10"><Phone className="size-4" /></span>
                <span><span className="label block !text-[9px] text-white/40">Appointments</span>{clinic.phones.appointments}</span>
              </a>
            </li>
            <li className="text-white/65">
              <a href={`mailto:${clinic.email}`} className="hover:text-white">{clinic.email}</a>
            </li>
            <li className="text-white/65">
              <a href={mapsSearch} target="_blank" rel="noopener" className="hover:text-white">
                {clinic.address.line1}<br />{clinic.address.line2}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative overflow-hidden">
        <motion.p
          aria-hidden
          style={{ y: wordY }}
          className="text-outline select-none whitespace-nowrap pl-[0.14em] text-center font-serif text-[24vw] font-medium leading-[0.8] tracking-[0.14em]"
        >
          TARA
        </motion.p>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-white/10 py-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} {clinic.name}. Reg. No. {clinic.doctor.reg}</span>
        <span className="max-w-xl md:text-right">
          Information on this site is for awareness only and is not a substitute for medical advice. In an emergency call our helpline or 108.
        </span>
      </div>
    </footer>
  );
}
