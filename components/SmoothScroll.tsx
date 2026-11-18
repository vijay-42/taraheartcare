"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -110 } });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Start every new page at the top (or at its #hash).
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => lenisRef.current?.scrollTo(el as HTMLElement, { offset: -110 }), 350);
        return;
      }
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
