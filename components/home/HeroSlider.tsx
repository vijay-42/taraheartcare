"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import HeartMotif from "@/components/HeartMotif";
import { ArrowRight, Phone } from "@/components/Icons";
import { EASE } from "@/components/motion";
import ServiceArt from "@/components/ServiceArt";
import { clinic, tel } from "@/lib/clinic";
import { slides, type Slide } from "@/lib/home";

const DURATION = 6500;

const TONES: Record<Slide["tone"], { wrap: string; dark: boolean }> = {
  wine: { wrap: "on-dark bg-night text-white", dark: true },
  maroon: { wrap: "on-dark bg-pulse-deep text-white", dark: true },
  cream: { wrap: "bg-sand text-ink", dark: false },
};

const hrefOf = (h: string) => (h === "tel" ? tel(clinic.phones.emergency) : h);

/** Full-width banner carousel: autoplay, pause on hover, swipe, keyboard and dot controls. */
export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number, d = n > i ? 1 : -1) => {
    setDir(d);
    setI((n + slides.length) % slides.length);
  }, [i]);
  const next = useCallback(() => go(i + 1, 1), [go, i]);
  const prev = useCallback(() => go(i - 1, -1), [go, i]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [i, paused, next]);

  const s = slides[i];
  const tone = TONES[s.tone];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="relative h-[620px] sm:h-[600px] lg:h-[min(78vh,660px)] lg:min-h-[560px]">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            className={`absolute inset-0 ${tone.wrap}`}
            initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <SlideBackdrop s={s} index={i} dark={tone.dark} />
            <SlideBody s={s} dark={tone.dark} />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="container-x flex items-center justify-between gap-6 pb-24 sm:pb-28 lg:pb-32">
            <div className="pointer-events-auto flex items-center gap-2">
              {slides.map((sl, n) => (
                <button
                  key={n}
                  onClick={() => go(n)}
                  aria-label={`Show slide ${n + 1}: ${sl.eyebrow}`}
                  aria-current={n === i}
                  className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 ${n === i ? "w-14" : "w-6"} ${
                    tone.dark ? "bg-white/25" : "bg-ink/15"
                  }`}
                >
                  {n === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className={`absolute inset-y-0 left-0 ${tone.dark ? "bg-white" : "bg-pulse"}`}
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "100%" : "100%" }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
              <span className={`label ml-3 ${tone.dark ? "text-white/60" : "text-mute"}`}>
                {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="pointer-events-auto hidden gap-2 sm:flex">
              {[
                { f: prev, l: "Previous slide", r: true },
                { f: next, l: "Next slide", r: false },
              ].map((b) => (
                <button
                  key={b.l}
                  onClick={b.f}
                  aria-label={b.l}
                  className={`grid size-12 place-items-center rounded-full border transition ${
                    tone.dark ? "border-white/25 text-white hover:bg-white hover:text-ink" : "border-ink/20 text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  <ArrowRight className={`size-5 ${b.r ? "rotate-180" : ""}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideBackdrop({ s, index, dark }: { s: Slide; index: number; dark: boolean }) {
  if (s.image)
    return (
      <>
        <Image src={s.image} alt="" fill priority={index === 0} sizes="100vw" className="intro-settle object-cover" />
        <div className={`absolute inset-0 ${dark ? "bg-gradient-to-r from-night/90 via-night/55 to-transparent" : "bg-gradient-to-r from-sand via-sand/85 to-sand/0"}`} />
      </>
    );
  return (
    <>
      <div className={`absolute inset-0 ${dark ? "grid-paper-dark" : "grid-paper"} opacity-70`} />
      <HeartMotif
        className={`pointer-events-none absolute -right-24 top-1/2 w-[620px] -translate-y-1/2 ${dark ? "text-white/[0.06]" : "text-pulse/[0.07]"}`}
        strokeWidth={0.8}
      />
      {!s.portrait && (
        <div className={`pointer-events-none absolute right-[4%] top-1/2 hidden aspect-square w-[min(40vw,520px)] -translate-y-1/2 lg:block ${dark ? "text-champagne/70" : "text-pulse/60"}`}>
          <ServiceArt index={index % 3} />
        </div>
      )}
    </>
  );
}

function SlideBody({ s, dark }: { s: Slide; dark: boolean }) {
  const isTel = s.cta.href === "tel";
  return (
    <div className="container-x relative grid h-full items-center gap-8 pb-28 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          className={`label inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${dark ? "bg-white/10 text-pulse" : "bg-paper text-pulse"}`}
        >
          <span className="size-1.5 rounded-full bg-current" /> {s.eyebrow}
        </motion.p>
        <h2 className="display mt-6 text-[clamp(2.7rem,6.4vw,5.6rem)]">
          {[s.title, s.titleItalic].map((l, n) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${n === 1 ? (dark ? "italic text-white/60" : "italic text-pulse") : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 + n * 0.1, duration: 1, ease: EASE }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
          className={`mt-6 max-w-lg text-[17px] leading-relaxed ${dark ? "text-white/70" : "text-ink-soft"}`}
        >
          {s.text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button href={hrefOf(s.cta.href)} variant="pulse" icon={isTel ? <Phone className="size-4" /> : undefined}>
            {isTel ? `${s.cta.label} · ${clinic.phones.emergency}` : s.cta.label}
          </Button>
          {s.secondary && (
            <Button href={s.secondary.href} variant={dark ? "outline-light" : "ghost"}>
              {s.secondary.label}
            </Button>
          )}
        </motion.div>
      </div>

      {s.portrait && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
          className="relative hidden h-full max-h-[520px] justify-self-end lg:block"
        >
          <div className="relative aspect-[4/5] h-full overflow-hidden rounded-t-[999px] border-[10px] border-paper bg-blush shadow-[0_40px_80px_-40px_rgba(36,23,27,0.5)]">
            <Image src={s.portrait} alt={clinic.doctor.name} fill sizes="420px" className="object-cover object-top" priority />
          </div>
          <div className="absolute -left-10 bottom-10 rounded-2xl bg-paper px-5 py-4 shadow-xl">
            <p className="font-serif text-[22px] leading-none">{clinic.doctor.name}</p>
            <p className="label mt-2 !text-[10px] text-mute">{clinic.doctor.role}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
