"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { clinic, tel } from "@/lib/clinic";
import Button from "../Button";
import ECGMonitor from "../ECGMonitor";
import { Heart, Phone } from "../Icons";
import { EASE, Lines, Magnetic } from "../motion";
import { useOpenStatus } from "../useOpenStatus";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[128px]">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 top-20 size-[620px] rounded-full bg-blush/70 blur-[120px]" />

      <motion.div style={{ y, opacity: fade }} className="container-x relative flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="flex items-center justify-between border-b border-ink/10 pb-4"
        >
          <span className="label text-mute">Cardiology · Diagnostics · Cath Lab</span>
          <span className="label hidden text-mute sm:block">Est. [Year] — [City]</span>
        </motion.div>

        <h1 className="display mt-10 text-[clamp(3rem,7.4vw,7.8rem)] sm:mt-12">
          <Lines
            immediate
            delay={0.15}
            lines={[
              "Every heartbeat deserves",
              <>
                <em className="text-pulse">undivided</em> attention.
              </>,
            ]}
          />
        </h1>

        <div className="mt-10 grid flex-1 items-end gap-10 pb-[200px] lg:grid-cols-[1fr_auto] lg:pb-[70px] [&>div:first-child]:lg:mb-[110px]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease: EASE }}>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-soft">
              Prevention, precise diagnosis and a round-the-clock Cath Lab, led by {clinic.doctor.name}. One team for every stage of your heart&apos;s health.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="/contact#book" variant="ink">Book a consultation</Button>
              </Magnetic>
              <Magnetic>
                <Button href={tel(clinic.phones.emergency)} variant="pulse" icon={<Phone className="size-4" />}>
                  Emergency care
                </Button>
              </Magnetic>
            </div>
          </motion.div>
          <VitalsCard />
        </div>
      </motion.div>

      {/* Live monitor trace */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-x pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-end">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="label hidden text-mute md:block">
            ↳ Move your cursor across the rhythm
          </motion.span>
        </div>
        <ECGMonitor height={170} />
      </div>
    </section>
  );
}

function VitalsCard() {
  const status = useOpenStatus();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.9, duration: 1.2, ease: EASE }}
      className="relative z-10 w-full max-w-[360px] rounded-[28px] border border-ink/10 bg-paper/80 p-6 shadow-[0_40px_80px_-40px_rgba(18,19,20,.35)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="label text-mute">Resting rhythm</span>
        <Heart className="size-5 animate-beat text-pulse" />
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-serif text-[88px] leading-[0.8]">72</span>
        <span className="label mb-2 text-mute">bpm</span>
      </div>
      <p className="mt-3 text-[13px] leading-snug text-mute">A healthy adult heart beats 60–100 times a minute, about 100,000 times a day.</p>
      <div className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-ink-soft">Cath Lab</span>
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-mint" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            On call 24×7
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink-soft">Clinic</span>
          <span className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${status.open ? "bg-mint" : "bg-mute/60"}`} />
            {status.ready ? status.label.replace("OPD ", "") : "…"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
