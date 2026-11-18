"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { clinic } from "@/lib/clinic";
import { EASE } from "./motion";

/** Doctor portrait with a curtain reveal and a slow parallax drift. */
export default function Portrait({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 28px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
      className={`relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand ${className}`}
    >
      <motion.div style={{ y }} className="absolute -inset-[10%]">
        {clinic.doctor.photo ? (
          <Image src={clinic.doctor.photo} alt={`${clinic.doctor.name}, cardiologist`} fill className="object-cover" sizes="(min-width:1024px) 40vw, 90vw" />
        ) : (
          // Placeholder until a photo is added (see lib/clinic.ts → doctor.photo)
          <div className="grid-paper flex h-full w-full items-center justify-center bg-gradient-to-br from-blush via-sand to-bone">
            <svg viewBox="0 0 200 240" className="w-1/2 text-ink/15" fill="currentColor">
              <circle cx="100" cy="78" r="46" />
              <path d="M20 240c0-56 36-92 80-92s80 36 80 92z" />
            </svg>
          </div>
        )}
      </motion.div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-paper/85 px-5 py-4 backdrop-blur-md">
        <div>
          <p className="font-serif text-[22px] leading-none">{clinic.doctor.name}</p>
          <p className="label mt-2 text-mute">{clinic.doctor.role}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-pulse text-on-pulse">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}
