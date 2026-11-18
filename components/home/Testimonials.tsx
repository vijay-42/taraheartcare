"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { Lines } from "../motion";

/** Drag-to-browse patient stories. */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const calc = () => setLimit(Math.max(0, (track.current?.scrollWidth ?? 0) - (wrap.current?.clientWidth ?? 0)));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section className="overflow-hidden bg-sand/60 py-28 sm:py-36">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-pulse">Patient stories</p>
          <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
            <Lines lines={["In their", <em key="w">own words.</em>]} />
          </h2>
        </div>
        <p className="label flex items-center gap-3 text-mute">
          <span className="inline-block h-px w-10 bg-mute" /> Drag to explore
        </p>
      </div>

      <div ref={wrap} className="container-x mt-14">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {clinic.testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`flex w-[82vw] shrink-0 select-none flex-col justify-between rounded-[28px] p-8 sm:w-[440px] sm:p-10 ${i % 2 ? "on-dark bg-night text-white" : "bg-paper"}`}
            >
              <div>
                <span className="font-serif text-[80px] leading-[0.5] text-pulse">&ldquo;</span>
                <blockquote className="mt-4 font-serif text-[26px] leading-[1.2] sm:text-[30px]">{t.quote}</blockquote>
              </div>
              <figcaption className="mt-10 flex items-center justify-between border-t border-current/10 pt-5">
                <span>
                  <span className="block text-[15px] font-medium">{t.name}</span>
                  <span className="label mt-1 block opacity-50">{t.detail}</span>
                </span>
                <span className="text-[14px] tracking-[3px] text-pulse">★★★★★</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
