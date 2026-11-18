"use client";

import { DrawPath } from "./motion";

/**
 * Line-art heart with a lotus inside, echoing the TARA logo.
 * Used as a faint, self-drawing watermark behind sections.
 */
export default function HeartMotif({ className = "", strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 200 190" aria-hidden className={className}>
      {/* heart outline */}
      <DrawPath d="M100 178C62 150 14 118 14 66 14 36 36 14 63 14c17 0 29 9 37 22 8-13 20-22 37-22 27 0 49 22 49 52 0 52-48 84-86 112z" {...s} />
      {/* lotus: centre petal */}
      <DrawPath d="M100 70c-11 16-15 34-13 52 4 8 9 12 13 14 4-2 9-6 13-14 2-18-2-36-13-52z" {...s} delay={0.5} />
      {/* side petals */}
      <DrawPath d="M93 132c-14-2-27-10-34-24 13-3 25 1 33 10" {...s} delay={0.7} />
      <DrawPath d="M107 132c14-2 27-10 34-24-13-3-25 1-33 10" {...s} delay={0.7} />
      <DrawPath d="M88 136c-17 2-34-2-46-13 14-8 30-8 43-1" {...s} delay={0.85} />
      <DrawPath d="M112 136c17 2 34-2 46-13-14-8-30-8-43-1" {...s} delay={0.85} />
      {/* star */}
      <DrawPath d="M100 44v14M93 51h14" {...s} delay={1.1} />
    </svg>
  );
}
