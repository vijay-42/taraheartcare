"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";
import { ArrowUpRight } from "./Icons";
import ServiceArt from "./ServiceArt";

/** Big typographic rows; hovering one floats its illustration beside the cursor. */
export default function ServiceRows() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  return (
    <div
      className="relative border-t border-ink/15"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <AnimatePresence>
        {hover !== null && (
          <motion.div
            key="preview"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden size-64 -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-night p-6 lg:block on-dark"
          >
            <ServiceArt key={hover} index={hover} color="#d4c09e" />
          </motion.div>
        )}
      </AnimatePresence>

      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          onPointerEnter={() => setHover(i)}
          className="group relative block overflow-hidden border-b border-ink/15 hover:[--color-pulse:#d4c09e] hover:[--color-on-pulse:#1e1014]"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-night transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
          <div className="container-x relative grid gap-6 py-10 transition-colors duration-500 group-hover:text-paper md:grid-cols-[80px_1fr_1fr_auto] md:items-center md:py-14">
            <span className="label text-pulse">{s.index}</span>
            <h2 className="display text-[clamp(2.4rem,5.5vw,5rem)]">
              {s.title} <em>{s.titleItalic}</em>
            </h2>
            <ul className="space-y-1 text-[15px] text-ink-soft transition-colors group-hover:text-white/60">
              {s.bullets.map((b) => (
                <li key={b}>— {b}</li>
              ))}
            </ul>
            <span className="grid size-14 place-items-center rounded-full border border-current/20 transition duration-500 group-hover:rotate-45 group-hover:border-pulse group-hover:bg-pulse">
              <ArrowUpRight className="size-6" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
