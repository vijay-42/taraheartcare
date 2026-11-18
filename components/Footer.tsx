import Link from "next/link";
import { clinic, mapsSearch, tel, waLink } from "@/lib/clinic";
import { specialities } from "@/lib/home";
import { services } from "@/lib/services";
import Button from "./Button";
import { Mail, Phone, Pin, WhatsApp } from "./Icons";
import Logo from "./Logo";

type L = { label: string; href: string };

const COLUMNS: { title: string; links: L[] }[] = [
  {
    title: "Specialities",
    links: [
      ...specialities.slice(0, 7).map((s) => ({ label: s.name, href: s.href })),
      { label: "View all", href: "/services" },
    ],
  },
  {
    title: "Diagnostics",
    links: [
      { label: "ECG", href: "/services/diagnostics#ecg-echo" },
      { label: "2D Echocardiography", href: "/services/diagnostics#ecg-echo" },
      { label: "Treadmill Test (TMT)", href: "/services/diagnostics#tmt" },
      { label: "Holter Monitoring", href: "/services/diagnostics#holter" },
      { label: "24-hr BP (ABPM)", href: "/services/diagnostics#holter" },
      { label: "Heart Checkup Packages", href: "/#packages" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Services", href: "/services" },
      { label: "Health Packages", href: "/#packages" },
      { label: "Patient Resources", href: "/resources" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Patient Care",
    links: [
      { label: "What to Expect", href: "/resources#expect" },
      { label: "Pre-test Instructions", href: "/resources#prep" },
      { label: "Heart Attack Warning Signs", href: "/resources#symptoms" },
      { label: "Insurance & TPA", href: "/resources#insurance" },
      { label: "Health Blog", href: "/resources#blog" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Book an Appointment", href: "/contact#book" },
      { label: "Second Opinion", href: "/contact?service=Second%20Opinion#book" },
      { label: "WhatsApp Us", href: waLink("Hello TARA Heart Care, I'd like to book an appointment.") },
      { label: "Get Directions", href: mapsSearch },
    ],
  },
];

const isExt = (h: string) => /^(https?:|tel:|mailto:)/.test(h);

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-night text-white">
      {/* Appointment strip */}
      <div className="border-b border-white/10 bg-night-2">
        <div className="container-x flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="label text-pulse">Your heart, our priority</p>
            <p className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05]">
              Need to see a cardiologist? <em className="text-white/55">We&apos;re here for you.</em>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact#book" variant="pulse">Book an appointment</Button>
            <Button href={waLink("Hello TARA Heart Care, I'd like to book an appointment.")} variant="outline-light" icon={<WhatsApp className="size-4" />}>
              WhatsApp us
            </Button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1.5fr_repeat(5,1fr)]">
        <div className="sm:col-span-2 md:col-span-3 xl:col-span-1">
          <Logo light className="h-20" />
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/55">
            Prevention, diagnostics and a 24 × 7 Cath Lab under one roof. Led by {clinic.doctor.name}.
          </p>
          <ul className="mt-6 space-y-3 text-[14px]">
            <li>
              <a href={tel(clinic.phones.emergency)} className="flex items-center gap-3 font-medium">
                <span className="grid size-8 place-items-center rounded-full bg-pulse text-on-pulse"><Phone className="size-3.5" /></span>
                {clinic.phones.emergency}
                <span className="label !text-[9px] text-pulse">24×7</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 text-white/70 hover:text-white">
                <span className="grid size-8 place-items-center rounded-full bg-white/10"><Mail className="size-3.5" /></span>
                {clinic.email}
              </a>
            </li>
            <li>
              <a href={mapsSearch} target="_blank" rel="noopener" className="flex items-start gap-3 text-white/70 hover:text-white">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10"><Pin className="size-3.5" /></span>
                <span>{clinic.address.line1}, {clinic.address.line2}</span>
              </a>
            </li>
          </ul>
        </div>

        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="label text-pulse">{c.title}</p>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {c.links.map((l) => (
                <li key={l.label}>
                  {isExt(l.href) ? (
                    <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="text-white/65 transition hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/65 transition hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Hours ribbon */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap gap-x-10 gap-y-3 py-6 text-[13px]">
          {clinic.hoursDisplay.map((h) => (
            <span key={h.day}>
              <span className={h.emphasis ? "text-pulse" : "text-white"}>{h.day}</span>
              <span className="ml-2 text-white/55">{h.time}</span>
            </span>
          ))}
          <span className="text-white/40 xl:ml-auto">Services: {services.map((s) => s.titleItalic).join(" · ")}</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[12px] text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <span>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved. Reg. No. {clinic.doctor.reg}
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(clinic.social).map(([k, v]) => (
              <a key={k} href={v} aria-label={k} className="label rounded-full border border-white/15 px-3 py-1.5 !text-[10px] text-white/60 transition hover:border-pulse hover:bg-pulse hover:text-on-pulse">
                {k}
              </a>
            ))}
          </div>
        </div>
        <p className="container-x pb-24 text-[11.5px] leading-relaxed text-white/35 lg:pb-8">
          Information on this site is for awareness only and is not a substitute for medical advice. In an emergency call our helpline or 108.
        </p>
      </div>
    </footer>
  );
}
