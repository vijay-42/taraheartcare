"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "./Icons";

/** Floating back-to-top button (desktop; phones have the action dock). */
export default function ScrollTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 900));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 hidden size-12 place-items-center rounded-full bg-pulse text-on-pulse shadow-[0_20px_40px_-15px_rgba(110,27,47,0.6)] transition hover:bg-pulse-deep lg:grid"
        >
          <ArrowRight className="size-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
