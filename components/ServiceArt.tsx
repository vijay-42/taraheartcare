"use client";

import { motion } from "motion/react";
import { DrawPath } from "./motion";

/** Line-art illustrations, one per service. They draw themselves on view. */
export default function ServiceArt({ index, color = "currentColor" }: { index: number; color?: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (index === 0)
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        {[150, 115, 80].map((r, i) => (
          <DrawPath key={r} d={`M200 ${200 - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}`} {...common} strokeDasharray={i === 0 ? "2 6" : undefined} opacity={0.5 + i * 0.2} delay={i * 0.15} />
        ))}
        <DrawPath d="M200 250s-58-34-58-78c0-22 16-38 34-38 12 0 20 6 24 14 4-8 12-14 24-14 18 0 34 16 34 38 0 44-58 78-58 78z" {...common} strokeWidth={2} delay={0.4} />
        <DrawPath d="M120 205h44l10-22 14 42 14-58 12 38h66" {...common} strokeWidth={2} delay={0.8} />
        <motion.circle r="6" fill={color} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ originX: "200px", originY: "200px" }} cx="200" cy="50" />
      </svg>
    );

  if (index === 1)
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <DrawPath key={i} d={`M${200 - (60 + i * 26) * Math.sin(0.55)} ${90 + (60 + i * 26) * Math.cos(0.55)} A${60 + i * 26} ${60 + i * 26} 0 0 0 ${200 + (60 + i * 26) * Math.sin(0.55)} ${90 + (60 + i * 26) * Math.cos(0.55)}`} {...common} opacity={1 - i * 0.12} delay={i * 0.1} />
        ))}
        <DrawPath d="M200 90 L108 252 M200 90 L292 252" {...common} strokeDasharray="3 5" />
        <DrawPath d="M180 210c0-14 9-22 20-22s20 8 20 22-9 26-20 26-20-12-20-26z" {...common} strokeWidth={2} delay={0.6} />
        <rect x="186" y="74" width="28" height="18" rx="4" {...common} />
        <DrawPath d="M60 330h70l8-16 12 30 12-44 10 30h168" {...common} strokeWidth={2} delay={0.9} />
      </svg>
    );

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <DrawPath d="M20 150c80-30 140 30 200 10s120-50 170-30" {...common} strokeWidth={2} />
      <DrawPath d="M20 250c80-30 140 30 200 10s120-50 170-30" {...common} strokeWidth={2} delay={0.1} />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 130 + i * 16;
        return <DrawPath key={i} d={`M${x} 168 L${x + 8} 238 M${x + 8} 168 L${x} 238`} {...common} opacity={0.85} delay={0.5 + i * 0.05} />;
      })}
      <motion.ellipse
        cx="200"
        cy="203"
        rx="80"
        ry="26"
        {...common}
        strokeDasharray="4 6"
        initial={{ scaleY: 0.3, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <DrawPath d="M20 203h80M300 203h80" {...common} strokeDasharray="2 6" delay={1.2} />
      <motion.circle cx="40" cy="203" r="5" fill={color} animate={{ cx: [40, 360] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}
