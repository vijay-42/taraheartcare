"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clinic, tel } from "@/lib/clinic";
import { services } from "@/lib/services";
import Button from "./Button";
import { ArrowUpRight, Calendar, Phone } from "./Icons";
import Logo from "./Logo";
import { Magnetic, EASE } from "./motion";
import { useOpenStatus } from "./useOpenStatus";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Specialities", mega: true },
  { href: "/resources", label: "Patient Resources" },
  { href: "/contact", label: "Contact Us" },
];

const UTILITY = [
  { href: "/doctors", label: "Find a Doctor" },
  { href: "/#packages", label: "Health Packages" },
  { href: "/resources#prep", label: "Test Preparation" },
  { href: "/resources#insurance", label: "Insurance & TPA" },
];

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const status = useOpenStatus();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Stays pinned like a hospital portal; flip this on to hide while scrolling down.
    setHidden(false && y > 400 && y > prev && !menu);
  });

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseLeave={() => setMega(false)}
      >
        {/* Utility bar */}
        <div className="on-dark bg-night text-white">
          <div className="container-x flex h-9 items-center justify-between gap-4 text-[13px]">
            <ul className="hidden items-center gap-6 md:flex">
              {UTILITY.map((u) => (
                <li key={u.label}>
                  <Link href={u.href} className="text-white/70 transition hover:text-white">
                    {u.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="flex items-center gap-2.5 whitespace-nowrap md:hidden">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-pulse" />
                <span className="relative inline-flex size-2 rounded-full bg-pulse" />
              </span>
              Heart emergency?
            </span>
            <div className="flex items-center gap-5">
              <a href={tel(clinic.phones.appointments)} className="hidden items-center gap-2 whitespace-nowrap text-white/70 transition hover:text-white xl:flex">
                <Phone className="size-3.5" /> Appointments {clinic.phones.appointments}
              </a>
              <a href={tel(clinic.phones.emergency)} className="group flex items-center gap-2 whitespace-nowrap font-medium">
                <span className="relative hidden size-2 md:flex">
                  <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-pulse" />
                  <span className="relative inline-flex size-2 rounded-full bg-pulse" />
                </span>
                <span className="label hidden !text-[10px] text-pulse sm:inline">24×7 Emergency</span>
                <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">{clinic.phones.emergency}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`transition-[background,border,backdrop-filter] duration-500 ${
            scrolled || mega ? "border-b border-line bg-paper/95 shadow-[0_10px_30px_-20px_rgba(36,23,27,0.35)] backdrop-blur" : "border-b border-line/70 bg-paper"
          }`}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Logo />

            <nav className="hidden lg:block" aria-label="Main">
              <ul className="flex items-center gap-0.5">
                {NAV.map((n) => (
                  <li key={n.href} onMouseEnter={() => setMega(!!n.mega)}>
                    <Link
                      href={n.href}
                      className={`relative flex items-center gap-1 px-3.5 py-2 text-[14.5px] font-medium transition-colors xl:px-4 ${
                        isActive(n.href) ? "text-pulse" : "text-ink-soft hover:text-pulse"
                      }`}
                    >
                      <span className="relative">{n.label}</span>
                      {n.mega && (
                        <svg viewBox="0 0 24 24" className={`size-3.5 transition-transform ${mega ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                      {isActive(n.href) && (
                        <motion.span layoutId="nav-pill" className="absolute inset-x-3.5 -bottom-[19px] h-[2px] bg-pulse xl:inset-x-4" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 text-[13px] text-ink-soft 2xl:flex">
                <span className={`size-1.5 rounded-full ${status.open ? "bg-mint" : "bg-mute"}`} />
                {status.label}
              </span>
              <div className="hidden sm:block">
                <Magnetic>
                  <Button href="/contact#book" variant="pulse" icon={<Calendar className="size-4" />}>
                    Book an Appointment
                  </Button>
                </Magnetic>
              </div>
              <button
                onClick={() => setMenu((m) => !m)}
                className="relative z-[70] grid size-12 place-items-center rounded-full bg-ink text-paper lg:hidden"
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
              >
                <span className="relative block h-3 w-5">
                  <motion.span className="absolute left-0 top-0 h-[1.5px] w-full bg-current" animate={menu ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} />
                  <motion.span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current" animate={menu ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} />
                </span>
              </button>
            </div>
          </div>

          {/* Services mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="hidden overflow-hidden lg:block"
              >
                <div className="container-x grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-4 pb-8 pt-2">
                  {services.map((s, i) => (
                    <motion.div key={s.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}>
                      <Link href={`/services/${s.slug}`} className="group block h-full rounded-2xl border border-line bg-paper p-6 transition hover:border-ink">
                        <div className="flex items-start justify-between">
                          <span className="label text-mute">{s.index}</span>
                          <ArrowUpRight className="size-5 text-mute transition group-hover:rotate-45 group-hover:text-pulse" />
                        </div>
                        <p className="mt-8 font-serif text-[28px] leading-[1.02]">
                          {s.title} <em className="text-pulse">{s.titleItalic}</em>
                        </p>
                        <ul className="mt-4 space-y-1 text-[13px] text-ink-soft">
                          {s.bullets.map((b) => (
                            <li key={b}>· {b}</li>
                          ))}
                        </ul>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.a
                    href={tel(clinic.phones.emergency)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                    className="on-dark group relative overflow-hidden rounded-2xl bg-night p-6 text-white"
                  >
                    <span className="label text-pulse">Emergency · 24×7</span>
                    <p className="mt-8 font-serif text-[30px] leading-[1.02]">
                      Heart attack?
                      <br />
                      <em className="text-white/60">Call before you come.</em>
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-[15px]">
                      <Phone className="size-4 text-pulse" /> {clinic.phones.emergency}
                    </p>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="on-dark fixed inset-0 z-[60] flex flex-col bg-night pt-[124px] text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 80px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 80px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 80px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="container-x absolute inset-x-0 top-9 flex h-[76px] items-center">
              <Logo light />
            </div>
            <nav className="container-x flex-1 overflow-y-auto" aria-label="Mobile">
              <ul>
                {[...NAV.slice(0, 3), ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.titleItalic, sub: true })), ...NAV.slice(4)].map(
                  (n, i) => (
                    <motion.li
                      key={n.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                      className="border-b border-white/10"
                    >
                      <Link href={n.href} className="flex items-baseline justify-between py-4">
                        <span className={`font-serif ${"sub" in n ? "pl-6 text-[26px] text-white/70" : "text-[40px]"} leading-none`}>{n.label}</span>
                        <span className="label text-white/30">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
            </nav>
            <motion.div
              className="container-x grid grid-cols-2 gap-3 pb-8 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={tel(clinic.phones.emergency)} className="rounded-2xl bg-pulse p-4">
                <span className="label text-white/70">Emergency</span>
                <span className="mt-2 block text-[15px]">{clinic.phones.emergency}</span>
              </a>
              <Link href="/contact#book" className="rounded-2xl bg-white/10 p-4">
                <span className="label text-white/50">Appointment</span>
                <span className="mt-2 block text-[15px]">Book a visit →</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
