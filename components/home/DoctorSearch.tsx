"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Calendar } from "@/components/Icons";
import { clinic } from "@/lib/clinic";

/* Each option maps onto a service the booking form already understands. */
const SPECIALITIES = [
  { label: "General Cardiology Consultation", service: "General Consultation" },
  { label: "Preventive Heart Checkup", service: "Preventive Heart Checkup" },
  { label: "Hypertension / Cholesterol", service: "Hypertension / Cholesterol" },
  { label: "Heart Failure Clinic", service: "Heart Failure Clinic" },
  { label: "Diagnostics: ECG, Echo, TMT, Holter", service: "Diagnostic Test" },
  { label: "Angiography / Angioplasty", service: "Angiography / Angioplasty Opinion" },
  { label: "Pacemaker / Device Follow-up", service: "Pacemaker / Device Follow-up" },
  { label: "Second Opinion", service: "Second Opinion" },
];

const DOCTORS = [
  `${clinic.doctor.name} · Interventional Cardiology`,
  ...clinic.team.map((t) => `${t.name} · ${t.role}`),
];

const WHEN = ["Earliest available", "Today", "Tomorrow", "This week", "Weekend"];

export default function DoctorSearch() {
  const router = useRouter();
  const [spec, setSpec] = useState("");
  const [doc, setDoc] = useState("");
  const [when, setWhen] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    const s = SPECIALITIES.find((x) => x.label === spec);
    if (s) p.set("service", s.service);
    if (doc) p.set("doctor", doc);
    if (when) p.set("when", when);
    router.push(`/contact${p.size ? `?${p}` : ""}#book`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-[28px] border border-ink/10 bg-paper p-3 shadow-[0_40px_80px_-40px_rgba(36,23,27,0.45)] md:grid-cols-[1fr_1fr_0.8fr_auto] md:gap-0 md:p-2"
    >
      <Field label="Speciality / Service" value={spec} onChange={setSpec} options={SPECIALITIES.map((s) => s.label)} placeholder="Select a speciality" first />
      <Field label="Doctor" value={doc} onChange={setDoc} options={DOCTORS} placeholder="Any doctor" />
      <Field label="When" value={when} onChange={setWhen} options={WHEN} placeholder="Earliest available" />
      <button
        type="submit"
        className="group flex items-center justify-center gap-3 rounded-[22px] bg-pulse px-7 py-4 text-[15px] font-medium text-on-pulse transition hover:bg-pulse-deep md:ml-2"
      >
        <Calendar className="size-4" />
        Find &amp; book
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
  placeholder,
  first,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  first?: boolean;
}) {
  return (
    <label className={`relative block rounded-[20px] px-5 py-3 transition hover:bg-bone/70 ${first ? "" : "md:border-l md:border-ink/10 md:rounded-none md:hover:rounded-[20px]"}`}>
      <span className="label block !text-[10px] text-mute">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-[15px] text-ink outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute bottom-4 right-5 size-4 text-mute" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
