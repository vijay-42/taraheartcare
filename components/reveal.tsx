import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals without per-element JavaScript.
 * These render plain HTML marked with `data-reveal`; a single
 * <RevealObserver/> (in the root layout) adds `.is-in` when each one
 * scrolls into view, and CSS does the animation. Because these are not
 * client components, they add nothing to hydration cost.
 */

type Vars = CSSProperties & Record<`--${string}`, string>;

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const style: Vars = { "--rd": `${delay}s`, "--ry": `${y}px` };
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Headline lines that slide up from behind a mask, one after another. */
export function Lines({
  lines,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  /** Above the fold: animate on first paint instead of on scroll. */
  immediate?: boolean;
}) {
  return (
    <span className={className} {...(immediate ? {} : { "data-reveal": "lines" })}>
      {lines.map((line, i) => {
        const d = `${delay + i * (immediate ? 0.08 : 0.09)}s`;
        return (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span
              className={`block ${immediate ? "intro-rise" : "reveal-line"}`}
              style={immediate ? { animationDelay: d } : ({ "--rd": d } as Vars)}
            >
              {line}
            </span>
          </span>
        );
      })}
    </span>
  );
}
