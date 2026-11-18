import type { SVGProps } from "react";

/** Line icons for specialities and facilities, drawn on a 48px grid. */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const paths: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M24 5 9 10v12c0 10 6.5 17.5 15 21 8.5-3.5 15-11 15-21V10z" />
      <path d="M24 31s-7-4.3-7-9.6c0-2.7 2-4.6 4.2-4.6 1.5 0 2.4.7 2.8 1.6.4-.9 1.3-1.6 2.8-1.6 2.2 0 4.2 1.9 4.2 4.6 0 5.3-7 9.6-7 9.6z" />
    </>
  ),
  catheter: (
    <>
      <path d="M6 40c8 0 10-6 14-12s8-9 14-9h8" />
      <path d="M38 15v8M42 19h-8" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 17v6" />
    </>
  ),
  bolt: (
    <>
      <path d="M24 42S8 32.5 8 21.5C8 15.8 12 12 16.6 12c3.2 0 5.6 1.8 7.4 4.4 1.8-2.6 4.2-4.4 7.4-4.4C36 12 40 15.8 40 21.5 40 32.5 24 42 24 42z" />
      <path d="m25 18-5 9h8l-5 9" />
    </>
  ),
  vessel: (
    <>
      <path d="M8 24h7l3-8 5 16 4-12 3 4h10" />
      <path d="M6 14c6-6 30-6 36 0M6 34c6 6 30 6 36 0" />
    </>
  ),
  valve: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 24 13 13M24 24l11-11M24 24v16" />
      <circle cx="24" cy="24" r="3" />
    </>
  ),
  pacemaker: (
    <>
      <rect x="8" y="20" width="18" height="20" rx="9" />
      <path d="M26 30c6 0 6-14 12-14s4 10 4 10" />
      <path d="M12 30h3l2-4 2 8 2-4h2" />
    </>
  ),
  heart: (
    <>
      <path d="M24 41S7 31 7 19.8C7 14 11 10 16 10c3.4 0 6 1.8 8 4.6 2-2.8 4.6-4.6 8-4.6 5 0 9 4 9 9.8C41 31 24 41 24 41z" />
      <path d="M12 23h6l2.5-4 4 8 2.5-4H36" />
    </>
  ),
  gauge: (
    <>
      <path d="M8 32a16 16 0 1 1 32 0" />
      <path d="m24 32 8-10" />
      <circle cx="24" cy="32" r="2.5" />
      <path d="M13 22.5 15 24M24 16v3M35 22.5 33 24" />
    </>
  ),
  ecg: (
    <>
      <rect x="5" y="9" width="38" height="30" rx="4" />
      <path d="M9 26h8l3-7 4 13 3-9 2 3h10" />
    </>
  ),
  run: (
    <>
      <circle cx="29" cy="8" r="3.5" />
      <path d="m19 20 7-5 6 6 6 1M26 15l-4 11 7 5-2 11M22 26l-6 6-7-1" />
      <path d="M6 44h36" />
    </>
  ),
  watch: (
    <>
      <rect x="13" y="13" width="22" height="22" rx="6" />
      <path d="M18 13l1-7h10l1 7M18 35l1 7h10l1-7" />
      <path d="M17 24h4l2-4 2.5 7 2-3H31" />
    </>
  ),
  leg: (
    <>
      <path d="M18 5v16c0 4 2 6 2 10v12h10" />
      <path d="M28 5v14c0 4-1.5 6-1.5 9" />
      <path d="M20 31c3-2 6-2 8 0" />
    </>
  ),
  siren: (
    <>
      <path d="M14 36V24a10 10 0 0 1 20 0v12" />
      <path d="M9 36h30v5H9zM24 6v4M10 11l3 3M38 11l-3 3" />
      <path d="M24 22v8" />
    </>
  ),
  bed: (
    <>
      <path d="M5 12v28M5 32h38v8M5 26h38v6" />
      <circle cx="13" cy="20" r="3.5" />
      <path d="M20 26v-6h17a6 6 0 0 1 6 6" />
    </>
  ),
  ambulance: (
    <>
      <path d="M4 34V14h24v20M28 20h8l8 8v6h-4" />
      <circle cx="12" cy="36" r="4" />
      <circle cx="36" cy="36" r="4" />
      <path d="M16 34h16M16 18v8M12 22h8" />
    </>
  ),
  flask: (
    <>
      <path d="M19 6h10M21 6v12L10 38a3 3 0 0 0 2.6 4.5h22.8A3 3 0 0 0 38 38L27 18V6" />
      <path d="M15 30h18" />
    </>
  ),
  pill: (
    <>
      <rect x="7" y="17" width="34" height="14" rx="7" transform="rotate(-40 24 24)" />
      <path d="m19.5 18.6 9 10.8" />
    </>
  ),
  card: (
    <>
      <rect x="5" y="11" width="38" height="26" rx="4" />
      <path d="M5 19h38M11 30h8" />
      <path d="M33 27v6M30 30h6" />
    </>
  ),
};

export default function HomeIcon({ name, ...p }: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} aria-hidden {...p}>
      {paths[name] ?? paths.heart}
    </svg>
  );
}
