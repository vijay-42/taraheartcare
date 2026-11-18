"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clinic, tel } from "@/lib/clinic";
import { packages, type Service } from "@/lib/services";
import Accordion from "./Accordion";
import Button from "./Button";
import { ArrowUpRight, Check, Phone } from "./Icons";
import { Lines, Reveal } from "./reveal";

export default function ServiceDetail({ service, next }: { service: Service; next: Service }) {
  const [active, setActive] = useState(service.items[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    service.items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [service]);

  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* Scroll-spy index */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="label text-mute">On this page</p>
              <ul className="mt-5 space-y-1">
                {service.items.map((it, i) => (
                  <li key={it.id}>
                    <a href={`#${it.id}`} className={`relative flex items-baseline gap-3 rounded-xl px-4 py-3 text-[15px] transition ${active === it.id ? "text-ink" : "text-mute hover:text-ink"}`}>
                      {active === it.id && <motion.span layoutId="spy" className="absolute inset-0 rounded-xl bg-paper shadow-sm" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                      <span className="label relative text-pulse">{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative">{it.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={tel(clinic.phones.emergency)} className="on-dark mt-8 block rounded-2xl bg-night p-5 text-white">
                <span className="label text-pulse">Emergency 24/7</span>
                <span className="mt-3 flex items-center gap-2 text-[17px]">
                  <Phone className="size-4" /> {clinic.phones.emergency}
                </span>
              </a>
            </div>
          </aside>

          <div className="space-y-6">
            {service.items.map((it, i) => (
              <Reveal key={it.id}>
                <article
                  id={it.id}
                  className={`scroll-mt-32 rounded-[28px] p-7 sm:p-12 ${it.urgent ? "bg-pulse text-on-pulse" : "border border-line bg-paper"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`label ${it.urgent ? "text-white/70" : "text-pulse"}`}>
                      {service.index}.{i + 1}
                    </span>
                    <div className="flex flex-wrap justify-end gap-2">
                      {it.meta.map((m) => (
                        <span key={m} className={`label rounded-full border px-3 py-1.5 !text-[10px] ${it.urgent ? "border-white/30" : "border-ink/15 text-ink-soft"}`}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="display mt-8 text-[clamp(2rem,4vw,3.4rem)]">{it.title}</h2>
                  <p className={`mt-5 max-w-2xl text-[17px] leading-relaxed ${it.urgent ? "text-white/85" : "text-ink-soft"}`}>{it.summary}</p>

                  {it.points.length > 0 && (
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {it.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px] leading-snug">
                          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${it.urgent ? "bg-white text-pulse" : "bg-pulse/10 text-pulse"}`}>
                            <Check className="size-3" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  {it.id === "checkup" && <Packages />}

                  {it.urgent && (
                    <div className="mt-10">
                      <Button href={tel(clinic.phones.emergency)} variant="light" icon={<Phone className="size-4" />}>
                        Call {clinic.phones.emergency}
                      </Button>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="on-dark bg-night py-24 text-white sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label text-pulse">Questions patients ask</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.5rem)]">
              <Lines lines={["Honest", <em key="a" className="text-white/50">answers.</em>]} />
            </h2>
            <div className="mt-10">
              <Button href={`/contact?service=${encodeURIComponent(service.bookingService)}#book`} variant="pulse">
                Book a consultation
              </Button>
            </div>
          </div>
          <Accordion dark items={service.faqs} />
        </div>
      </section>

      {/* Next service */}
      <Link href={`/services/${next.slug}`} className="group block border-b border-ink/10 py-20 transition-colors duration-700 hover:bg-night hover:text-paper hover:[--color-pulse:#d4c09e] sm:py-28">
        <div className="container-x flex items-end justify-between gap-6">
          <div>
            <p className="label text-mute group-hover:text-white/50">Next · {next.index}</p>
            <p className="display mt-4 text-[clamp(2.6rem,7vw,7rem)]">
              {next.title} <em className="text-pulse">{next.titleItalic}</em>
            </p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-current/20 transition duration-700 group-hover:rotate-45 group-hover:border-pulse group-hover:bg-pulse sm:size-24">
            <ArrowUpRight className="size-7" />
          </span>
        </div>
      </Link>
    </>
  );
}

function Packages() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {packages.map((p, i) => (
        <motion.div
          key={p.name}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative flex flex-col rounded-[22px] p-6 ${p.featured ? "on-dark bg-night text-paper" : "border border-line bg-bone"}`}
        >
          {p.featured && <span className="label absolute -top-3 right-5 rounded-full bg-pulse px-3 py-1.5 !text-[9px] text-on-pulse">Most chosen</span>}
          <span className="label opacity-50">0{i + 1}</span>
          <h3 className="mt-6 font-serif text-[30px] leading-none">{p.name}</h3>
          <p className={`mt-2 text-[15px] ${p.featured ? "text-pulse" : "text-pulse"}`}>{p.price}</p>
          <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-5 text-[14px] ${p.featured ? "border-white/15 text-white/75" : "border-ink/10 text-ink-soft"}`}>
            {p.tests.map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-pulse" /> {t}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?service=${encodeURIComponent("Preventive Heart Checkup")}#book`}
            className={`mt-6 rounded-full py-3 text-center text-[14px] font-medium transition ${p.featured ? "bg-pulse text-on-pulse hover:bg-pulse-deep" : "border border-ink/15 hover:bg-ink hover:text-paper"}`}
          >
            Book this package
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
