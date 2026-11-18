"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { services, type Service } from "@/lib/services";
import { ArrowUpRight } from "../Icons";
import { Lines } from "../reveal";
import ServiceArt from "../ServiceArt";

const THEMES = [
  { card: "bg-paper text-ink border border-line", art: "#6e1b2f", sub: "text-ink-soft", chip: "border-ink/15" },
  { card: "on-dark bg-night text-white", art: "#d4c09e", sub: "text-white/60", chip: "border-white/15" },
  { card: "bg-pulse text-on-pulse", art: "#d4c09e", sub: "text-white/80", chip: "border-white/30" },
];

/** Cards pin and stack on top of each other as you scroll. */
export default function ServiceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="label text-pulse">What we do</p>
            <h2 className="display mt-6 text-[clamp(2.8rem,6.5vw,6rem)]">
              <Lines lines={["Complete heart care,", <em key="e">under one roof.</em>]} />
            </h2>
          </div>
          <p className="max-w-md text-[17px] leading-relaxed text-ink-soft lg:justify-self-end">
            From the first BP reading to an emergency angioplasty at 3 AM, the same team follows your heart through every stage.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {services.map((s, i) => (
            <StackCard key={s.slug} s={s} i={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ s, i, total, progress }: { s: Service; i: number; total: number; progress: MotionValue<number> }) {
  const t = THEMES[i];
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.045]);
  return (
    <div className="sticky h-[88svh] min-h-[560px] pt-4" style={{ top: `${120 + i * 22}px` }}>
      <motion.div style={{ scale }} className={`relative grid h-[calc(100%-60px)] origin-top overflow-hidden rounded-[32px] ${t.card} md:grid-cols-[1.15fr_1fr]`}>
        <div className="flex flex-col justify-between p-7 sm:p-12">
          <div className="flex items-center justify-between">
            <span className="label">{s.index} / 0{total}</span>
          </div>
          <div>
            <h3 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
              {s.title}
              <br />
              <em>{s.titleItalic}</em>
            </h3>
            <p className={`mt-5 max-w-md text-[17px] leading-relaxed ${t.sub}`}>{s.short}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {s.bullets.map((b) => (
                <li key={b} className={`rounded-full border px-4 py-2 text-[13px] ${t.chip}`}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/services/${s.slug}`} className="group mt-8 inline-flex w-fit items-center gap-3 text-[15px] font-medium">
            <span className="grid size-12 place-items-center rounded-full border border-current/25 transition duration-500 group-hover:rotate-45 group-hover:bg-current/10">
              <ArrowUpRight className="size-5" />
            </span>
            Explore {s.titleItalic.toLowerCase()}
          </Link>
        </div>
        <div className="relative hidden items-center justify-center p-10 md:flex">
          <div className="absolute inset-6 rounded-[24px] border border-current/10" />
          <div className="aspect-square w-full max-w-[420px]">
            <ServiceArt index={i} color={t.art} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
