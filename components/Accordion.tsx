"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE } from "./motion";

export default function Accordion({ items, dark = false }: { items: { q: string; a: React.ReactNode }[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`border-t ${dark ? "border-white/15" : "border-ink/15"}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`border-b ${dark ? "border-white/15" : "border-ink/15"}`}>
            <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="group flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="flex items-baseline gap-5">
                <span className={`label ${dark ? "text-white/40" : "text-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight transition group-hover:text-pulse">{it.q}</span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`grid size-10 shrink-0 place-items-center rounded-full border text-[20px] ${isOpen ? "border-pulse bg-pulse text-on-pulse" : dark ? "border-white/20" : "border-ink/20"}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                  <div className={`max-w-2xl pb-7 pl-[52px] text-[16px] leading-relaxed ${dark ? "text-white/65" : "text-ink-soft"}`}>{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
