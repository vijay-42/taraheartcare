import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/*
 * Icon grid of every individual service, in the style of a hospital
 * "Our Specialities" board: bordered cards, one line icon each.
 * Icons are drawn on a 64×64 grid with a shared stroke so they read as one set.
 */

const HEART =
  "M32 52C20 44 10 35 10 24c0-6.6 5-11 10.5-11 4.6 0 8.6 2.8 11.5 7 2.9-4.2 6.9-7 11.5-7C49 13 54 17.4 54 24c0 11-10 20-22 28z";

const ICONS: Record<string, ReactNode> = {
  // BP gauge + cuff bulb
  hypertension: (
    <>
      <circle cx="28" cy="28" r="16" />
      <path d="M28 28l8-7M18 22l2 1.4M28 14.5V17M38 22l-2 1.4" />
      <circle cx="28" cy="28" r="1.6" fill="currentColor" />
      <path d="M28 44v5a6 6 0 0 0 6 6h6" />
      <ellipse cx="48" cy="55" rx="7" ry="5" />
      <path d="M22 36h12" />
    </>
  ),
  // Heart with a weakened pulse
  "heart-failure": (
    <>
      <path d={HEART} />
      <path d="M14 30h8l3-6 4 12 3-8 2 2h16" />
    </>
  ),
  // Clipboard, heart, check
  checkup: (
    <>
      <rect x="14" y="10" width="36" height="46" rx="4" />
      <path d="M24 10V7h16v3a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2z" />
      <path d="M32 33c-4-2.6-7-5.4-7-8.6 0-2 1.5-3.4 3.3-3.4 1.5 0 2.7.9 3.7 2.3 1-1.4 2.2-2.3 3.7-2.3 1.8 0 3.3 1.4 3.3 3.4 0 3.2-3 6-7 8.6z" />
      <path d="M22 42h8M22 48h6M36 45l3 3 6-6" />
    </>
  ),
  // Monitor with ECG trace
  "ecg-echo": (
    <>
      <rect x="8" y="12" width="48" height="32" rx="3" />
      <path d="M12 30h10l3-8 5 15 4-11 2 4h16" />
      <path d="M26 52h12M32 44v8" />
    </>
  ),
  // Treadmill with heart-rate
  tmt: (
    <>
      <path d="M8 50h40l6-4" />
      <circle cx="14" cy="54" r="2.5" />
      <circle cx="42" cy="54" r="2.5" />
      <path d="M46 46 50 18h6" />
      <circle cx="30" cy="14" r="4" />
      <path d="M30 18l-3 12 6 6-2 12M27 30l-7 6-4 0M29 22l8 4 4-3M33 36l7 4" />
    </>
  ),
  // Holter recorder on a strap
  holter: (
    <>
      <path d="M6 22c10-8 42-8 52 0" />
      <rect x="18" y="26" width="28" height="30" rx="4" />
      <path d="M22 40h5l2-5 4 9 2-4h7" />
      <circle cx="40" cy="31" r="1.4" fill="currentColor" />
      <path d="M24 50h16" />
    </>
  ),
  // Heart with branching coronary arteries
  angiography: (
    <>
      <path d={HEART} />
      <path d="M32 20v8c0 6-6 8-8 14M32 28c2 4 9 5 10 12M25 36l-5-2M38 33l5-4M27 31l-4-5" />
    </>
  ),
  // Stent lattice over a balloon
  angioplasty: (
    <>
      <path d="M6 32h6M52 32h6" />
      <path d="M12 24h40v16H12z" />
      <path d="M12 24l5 8-5 8M22 24l5 8-5 8M32 24l5 8-5 8M42 24l5 8-5 8M17 32h5M27 32h5M37 32h5" />
      <path d="M18 50c4-3 24-3 28 0M18 14c4 3 24 3 28 0" opacity=".55" />
    </>
  ),
  // Heart + stopwatch: the golden hour
  "primary-angioplasty": (
    <>
      <path d="M30 50C18 42 8 33 8 22 8 15.4 13 11 18.5 11c4.6 0 8.6 2.8 11.5 7 2.2-3.2 5-5.6 8.3-6.6" />
      <circle cx="44" cy="40" r="13" />
      <path d="M44 33v7l5 3M41 23h6M44 23v4" />
    </>
  ),
  // Pacemaker device with lead into the heart
  pacemaker: (
    <>
      <rect x="6" y="8" width="24" height="18" rx="9" />
      <path d="M13 17h3l2-4 2 8 2-4h3" />
      <path d="M30 17c8 0 10 6 8 14" />
      <path d="M40 58c-8-5-14-10-14-17 0-4 3-7 6.5-7 2.7 0 5 1.6 7.5 4 2.5-2.4 4.8-4 7.5-4 3.5 0 6.5 3 6.5 7 0 7-6 12-14 17z" />
      <circle cx="38" cy="44" r="1.6" fill="currentColor" />
    </>
  ),
  // Ambulance with cross
  emergency: (
    <>
      <path d="M6 46V24a3 3 0 0 1 3-3h26v25M35 28h10l9 9v9h-4" />
      <path d="M35 46h-9M14 46H6" />
      <circle cx="20" cy="47" r="5" />
      <circle cx="44" cy="47" r="5" />
      <path d="M20 27v10M15 32h10M40 33h9" />
      <path d="M22 14h6M25 11v6" opacity=".7" />
    </>
  ),
  // ICU bed with bedside monitor
  icu: (
    <>
      <rect x="36" y="8" width="22" height="16" rx="2" />
      <path d="M39 17h4l2-4 3 7 2-3h5M47 24v6" />
      <path d="M6 30v24M6 46h50v8M6 40h50v6" />
      <rect x="10" y="33" width="10" height="7" rx="3" />
    </>
  ),
};

type Spec = { id: string; title: string; href: string };

const SPECIALITIES: Spec[] = [
  { id: "ecg-echo", title: "ECG & 2D Echo", href: "/services/diagnostics#ecg-echo" },
  { id: "tmt", title: "Treadmill Stress Test", href: "/services/diagnostics#tmt" },
  { id: "holter", title: "Holter & ABPM", href: "/services/diagnostics#holter" },
  { id: "hypertension", title: "Hypertension & Cholesterol", href: "/services/preventive-cardiology#hypertension" },
  { id: "angiography", title: "Coronary Angiography", href: "/services/interventional-cardiology#angiography" },
  { id: "angioplasty", title: "Angioplasty & Stenting", href: "/services/interventional-cardiology#angioplasty" },
  { id: "primary-angioplasty", title: "Heart Attack Care", href: "/services/interventional-cardiology#primary-angioplasty" },
  { id: "pacemaker", title: "Pacemaker & Devices", href: "/services/interventional-cardiology#pacemaker" },
  { id: "heart-failure", title: "Heart Failure Clinic", href: "/services/preventive-cardiology#heart-failure" },
  { id: "checkup", title: "Preventive Checkups", href: "/services/preventive-cardiology#checkup" },
  { id: "icu", title: "Cardiac ICU", href: "/contact" },
  { id: "emergency", title: "24×7 Cardiac Emergency", href: "/contact" },
];

export default function SpecialityGrid({ eyebrow = "Cardiac care in one place", title = "Our Specialities" }: { eyebrow?: string; title?: string }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="text-center">
          <p className="label text-pulse">{eyebrow}</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4.2rem)]">{title}</h2>
        </div>

        <ul className="mx-auto mt-14 grid max-w-[1120px] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-7">
          {SPECIALITIES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 0.06} y={24}>
              <Link
                href={s.href}
                className="group relative flex h-full min-h-[168px] flex-col items-center justify-center gap-5 overflow-hidden rounded-[18px] border border-line bg-paper px-4 py-7 text-center transition duration-500 hover:-translate-y-1 hover:border-pulse hover:shadow-[0_18px_40px_-24px_rgb(110_27_47/0.45)] sm:min-h-[196px]"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-pulse transition-all duration-500 ease-out group-hover:h-full" aria-hidden />
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative size-14 text-pulse transition duration-500 group-hover:scale-110 group-hover:text-on-pulse sm:size-[72px]"
                  aria-hidden
                >
                  {ICONS[s.id]}
                </svg>
                <span className="relative text-[15px] font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-on-pulse sm:text-[17px]">
                  {s.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
