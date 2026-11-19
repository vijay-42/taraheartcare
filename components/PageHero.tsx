import Link from "next/link";
import type { ReactNode } from "react";
import ECGMonitor from "./ECGMonitor";
import HeartMotif from "./HeartMotif";
import { Lines } from "./reveal";

export default function PageHero({
  crumbs,
  title,
  intro,
  aside,
  index,
}: {
  crumbs: { href?: string; label: string }[];
  title: ReactNode[];
  intro: string;
  aside?: ReactNode;
  index?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-[170px] sm:pt-[150px]">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <div className="pointer-events-none absolute -right-48 -top-20 size-[900px] bg-[radial-gradient(circle,var(--color-blush)_0%,transparent_62%)] opacity-70" />
      <HeartMotif className="pointer-events-none absolute -right-10 top-32 hidden w-[420px] text-pulse/[0.08] lg:block" strokeWidth={0.8} />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 text-mute">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {c.href ? <Link href={c.href} className="transition hover:text-pulse">{c.label}</Link> : <span className="text-ink">{c.label}</span>}
              {i < crumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {index && <span className="label mb-4 block text-pulse">{index}</span>}
            <h1 className="display text-[clamp(3rem,8.5vw,8.5rem)]">
              <Lines immediate delay={0.1} lines={title} />
            </h1>
          </div>
          {aside}
        </div>
        <p className="intro-fade mt-10 max-w-2xl text-[18px] leading-relaxed text-ink-soft" style={{ animationDelay: "0.3s" }}>
          {intro}
        </p>
      </div>
      <div className="mt-14 opacity-80">
        <ECGMonitor height={100} amplitude={0.3} lineWidth={1.6} />
      </div>
    </section>
  );
}
