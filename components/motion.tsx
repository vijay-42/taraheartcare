"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Paragraph that "inks in" word by word as you scroll through it */
export function ScrollInk({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

/* Number that counts up once visible */
export function Counter({ to, suffix = "", className, plain = false }: { to: number; suffix?: string; className?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => (el.textContent = (plain ? String(Math.round(v)) : Math.round(v).toLocaleString("en-IN")) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix, plain]);
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* Element gently follows the cursor while hovered */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* Infinite horizontal ticker */
export function Marquee({ children, className, reverse = false }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={`group flex overflow-hidden fade-x ${className ?? ""}`}>
      <div
        className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/* SVG path that draws itself on view */
export function DrawPath(props: React.ComponentProps<typeof motion.path> & { delay?: number }) {
  const { delay = 0, ...rest } = props;
  return (
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ pathLength: { duration: 1.8, ease: EASE, delay }, opacity: { duration: 0.2, delay } }}
      {...rest}
    />
  );
}

export { EASE };
