"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE } from "./motion";

const TESTS = [
  {
    name: "Blood tests",
    duration: "10 min",
    fasting: "10–12 hrs",
    wear: "Half-sleeves for easy access",
    steps: ["Fast for 10–12 hours. Plain water is allowed.", "Avoid alcohol and fatty food the evening before.", "Take regular BP / heart medicines unless told otherwise.", "Diabetic? Ask us about insulin or tablet timing."],
  },
  {
    name: "TMT / Stress test",
    duration: "30–45 min",
    fasting: "Light meal 2–3 hrs before",
    wear: "Comfortable clothes, walking shoes",
    steps: ["Don't come on a full stomach.", "No tea, coffee or smoking for 3–4 hours before.", "Some medicines (e.g. beta-blockers) may need pausing. Ask first.", "Men may need the chest shaved for electrodes."],
  },
  {
    name: "ECG & 2D Echo",
    duration: "5–30 min",
    fasting: "Not needed",
    wear: "Two-piece outfit",
    steps: ["No special preparation required.", "Avoid body lotion or oil on the chest that day.", "Bring any previous Echo reports for comparison."],
  },
  {
    name: "Holter / ABPM",
    duration: "24–48 hrs",
    fasting: "Not needed",
    wear: "Loose clothing",
    steps: ["Bathe before you come. The device must stay dry.", "Keep a simple diary of activities and symptoms.", "Return the device at the scheduled time next day."],
  },
  {
    name: "Angiography",
    duration: "20–30 min",
    fasting: "6 hrs",
    wear: "Hospital gown provided",
    steps: ["Tell us about allergies (especially contrast dye) and kidney problems.", "Blood thinners and metformin may need adjusting. Follow your doctor's advice.", "Bring all previous reports and one family member."],
  },
];

/** Pick a test → see exactly how to prepare. */
export default function PrepGuide() {
  const [sel, setSel] = useState(0);
  const t = TESTS[sel];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TESTS.map((x, i) => (
          <button key={x.name} onClick={() => setSel(i)} className={`relative rounded-full px-5 py-3 text-[15px] transition ${sel === i ? "text-white" : "border border-ink/15 bg-paper hover:border-ink"}`}>
            {sel === i && <motion.span layoutId="prep" className="absolute inset-0 rounded-full bg-pulse" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{x.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-8 grid overflow-hidden rounded-[28px] border border-line bg-paper lg:grid-cols-[1fr_1.4fr]"
        >
          <div className="grid grid-cols-3 gap-px bg-line lg:grid-cols-1">
            {[
              ["Duration", t.duration],
              ["Fasting", t.fasting],
              ["What to wear", t.wear],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-5 sm:p-7">
                <p className="label text-mute">{k}</p>
                <p className="mt-2 font-serif text-[clamp(1.2rem,2vw,1.8rem)] leading-tight">{v}</p>
              </div>
            ))}
          </div>
          <ol className="p-7 sm:p-10">
            {t.steps.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE }}
                className="flex gap-5 border-b border-ink/10 py-4 text-[16px] leading-relaxed last:border-0"
              >
                <span className="label pt-1 text-pulse">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
