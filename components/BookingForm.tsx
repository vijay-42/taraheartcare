"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { clinic, tel, waLink } from "@/lib/clinic";
import { ArrowRight, Check, WhatsApp } from "./Icons";
import { EASE } from "./motion";

const SERVICES = [
  "General Consultation",
  "Preventive Heart Checkup",
  "Hypertension / Cholesterol",
  "Heart Failure Clinic",
  "Diagnostic Test",
  "Angiography / Angioplasty Opinion",
  "Pacemaker / Device Follow-up",
  "Second Opinion",
];

const STEPS = ["Reason", "Date & time", "Your details"];

/** Three-step booking; sends a pre-filled request to the clinic's WhatsApp. */
export default function BookingForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [service, setService] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", age: "", note: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const s = params.get("service");
    if (s && SERVICES.includes(s)) setService(s);
  }, [params]);

  const days = useMemo(() => {
    const out: { key: string; dow: string; d: number; mon: string; dayIdx: number }[] = [];
    const now = new Date();
    for (let i = 0; i < 14 && out.length < 10; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      if (!(clinic.sessions[dt.getDay()] ?? []).length) continue;
      out.push({
        key: dt.toDateString(),
        dow: i === 0 ? "Today" : i === 1 ? "Tmrw" : dt.toLocaleDateString("en-IN", { weekday: "short" }),
        d: dt.getDate(),
        mon: dt.toLocaleDateString("en-IN", { month: "short" }),
        dayIdx: dt.getDay(),
      });
    }
    return out;
  }, []);

  const slots = useMemo(() => {
    const d = days.find((x) => x.key === date);
    if (!d) return [];
    const res: string[] = [];
    for (const [a, b] of clinic.sessions[d.dayIdx]) {
      const [ah] = a.split(":").map(Number);
      const [bh] = b.split(":").map(Number);
      for (let h = ah; h < bh; h++) {
        const ap = h >= 12 ? "PM" : "AM";
        res.push(`${h % 12 || 12}:00 ${ap}`);
      }
    }
    return res;
  }, [date, days]);

  const phoneOk = /^[+\d][\d\s-]{9,14}$/.test(form.phone.trim());
  const canNext = [!!service, !!date && !!slot, form.name.trim().length > 1 && phoneOk][step];

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const submit = () => {
    const msg =
      `*Appointment request · ${clinic.name}*\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nAge: ${form.age || "-"}\n` +
      `Reason: ${service}\nPreferred: ${date} · ${slot}\nNotes: ${form.note || "-"}`;
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setStep(0);
    setService("");
    setDate(null);
    setSlot(null);
    setForm({ name: "", phone: "", age: "", note: "" });
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-paper p-6 shadow-[0_40px_100px_-50px_rgba(18,19,20,.35)] sm:p-10">
      {/* Progress */}
      <div className="flex items-center gap-3">
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => i < step && go(i)} className="flex flex-1 flex-col gap-2 text-left" disabled={i > step}>
            <span className="relative h-[3px] overflow-hidden rounded-full bg-sand">
              <motion.span className="absolute inset-y-0 left-0 bg-pulse" animate={{ width: i < step || sent ? "100%" : i === step ? "35%" : "0%" }} transition={{ duration: 0.6, ease: EASE }} />
            </span>
            <span className={`label ${i <= step ? "text-ink" : "text-mute"}`}>0{i + 1} · {s}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-10 min-h-[380px]">
        <AnimatePresence mode="wait" custom={dir}>
          {sent ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="flex min-h-[380px] flex-col items-start justify-center">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }} className="grid size-16 place-items-center rounded-full bg-mint text-night">
                <Check className="size-8" />
              </motion.span>
              <h3 className="display mt-8 text-[44px]">Almost done.</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
                Your request has opened in WhatsApp. <strong className="font-medium text-ink">Press send there</strong>, and our team will confirm your slot shortly. If WhatsApp didn&apos;t open, call{" "}
                <a href={tel(clinic.phones.appointments)} className="text-pulse underline underline-offset-4">{clinic.phones.appointments}</a>.
              </p>
              <button onClick={reset} className="label mt-8 border-b border-ink pb-1 hover:border-pulse hover:text-pulse">Book another</button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
            >
              {step === 0 && (
                <>
                  <h3 className="font-serif text-[34px] leading-tight">What brings you in?</h3>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setService(s)}
                        className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-[15px] transition ${service === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}
                      >
                        {s}
                        <span className={`grid size-5 place-items-center rounded-full border ${service === s ? "border-pulse bg-pulse" : "border-ink/20"}`}>
                          {service === s && <Check className="size-3 text-white" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h3 className="font-serif text-[34px] leading-tight">Pick a day &amp; time</h3>
                  <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
                    {days.map((d) => (
                      <button
                        key={d.key}
                        onClick={() => { setDate(d.key); setSlot(null); }}
                        className={`flex w-[72px] shrink-0 flex-col items-center rounded-2xl border py-3 transition ${date === d.key ? "border-pulse bg-pulse text-on-pulse" : "border-line hover:border-ink/40"}`}
                      >
                        <span className="label !text-[10px] opacity-70">{d.dow}</span>
                        <span className="font-serif text-[30px] leading-none">{d.d}</span>
                        <span className="label !text-[10px] opacity-70">{d.mon}</span>
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {date && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                        <p className="label text-mute">Preferred time</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {slots.map((s) => (
                            <button key={s} onClick={() => setSlot(s)} className={`rounded-xl border py-3 text-[14px] transition ${slot === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 text-[13px] text-mute">We&apos;ll confirm the exact time by phone or WhatsApp.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-serif text-[34px] leading-tight">A few details</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]">
                    <Field label="Patient's full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
                    <Field label="Age" value={form.age} onChange={(v) => setForm({ ...form, age: v.replace(/\D/g, "").slice(0, 3) })} inputMode="numeric" />
                    <div className="sm:col-span-2">
                      <Field label="Mobile number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" autoComplete="tel" error={form.phone.length > 3 && !phoneOk ? "Enter a valid mobile number" : undefined} />
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Symptoms or notes (optional)" value={form.note} onChange={(v) => setForm({ ...form, note: v })} textarea />
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl bg-bone p-4 text-[14px] text-ink-soft">
                    <span className="label mr-2 text-mute">Summary</span>
                    {service} · {date} · {slot}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!sent && (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <button onClick={() => go(step - 1)} disabled={step === 0} className="text-[14px] text-mute transition hover:text-ink disabled:opacity-0">
            ← Back
          </button>
          {step < 2 ? (
            <button
              onClick={() => canNext && go(step + 1)}
              disabled={!canNext}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-medium text-paper transition enabled:hover:bg-pulse disabled:opacity-30"
            >
              Continue
              <span className="grid size-8 place-items-center rounded-full bg-white/10 transition group-enabled:group-hover:translate-x-1"><ArrowRight className="size-4" /></span>
            </button>
          ) : (
            <button
              onClick={() => canNext && submit()}
              disabled={!canNext}
              className="group inline-flex items-center gap-3 rounded-full bg-pulse py-2 pl-6 pr-2 text-[15px] font-medium text-on-pulse transition enabled:hover:bg-pulse-deep disabled:opacity-30"
            >
              Send via WhatsApp
              <span className="grid size-8 place-items-center rounded-full bg-white/15"><WhatsApp className="size-4" /></span>
            </button>
          )}
        </div>
      )}
      <p className="mt-5 text-[12px] leading-relaxed text-mute">
        For routine appointments only. For chest pain or any emergency, call <a href={tel(clinic.phones.emergency)} className="text-pulse">{clinic.phones.emergency}</a> immediately.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  const cls =
    "peer w-full rounded-2xl border bg-transparent px-5 pb-3 pt-7 text-[16px] outline-none transition focus:border-ink " + (error ? "border-pulse" : "border-line");
  return (
    <label className="relative block">
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " rows={3} className={cls + " resize-none"} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " className={cls} {...rest} />
      )}
      <span className="label pointer-events-none absolute left-5 top-3 !text-[10px] text-mute transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:!text-[12px] peer-focus:top-3 peer-focus:!text-[10px]">
        {label}
      </span>
      {error && <span className="mt-1.5 block text-[12px] text-pulse">{error}</span>}
    </label>
  );
}
