import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Button from "@/components/Button";
import ContactStatus from "@/components/ContactStatus";
import { Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import { Reveal } from "@/components/reveal";
import PageHero from "@/components/PageHero";
import { clinic, mapsEmbed, mapsSearch, tel, waLink } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Book an appointment with the cardiologist at TARA Heart Care. Address, map, phone numbers, OPD timings and the 24/7 emergency helpline.",
};

export default function ContactPage() {
  const tiles = [
    { k: "Emergency · 24/7", v: clinic.phones.emergency, href: tel(clinic.phones.emergency), icon: Phone, tone: "bg-pulse text-on-pulse" },
    { k: "Appointments", v: clinic.phones.appointments, href: tel(clinic.phones.appointments), icon: Phone, tone: "bg-paper border border-line" },
    { k: "WhatsApp", v: "Chat with us", href: waLink(), icon: WhatsApp, tone: "bg-paper border border-line" },
    { k: "Email", v: clinic.email, href: `mailto:${clinic.email}`, icon: Mail, tone: "bg-paper border border-line" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title={["Let's talk about", <em key="c" className="text-pulse">your heart.</em>]}
        intro="Book a consultation in under a minute, or reach us directly. For emergencies, we're available every hour of every day."
      />

      <section className="pt-16">
        <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.06}>
              <a href={t.href} {...(t.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className={`group flex h-full flex-col justify-between gap-10 rounded-[24px] p-6 transition duration-300 hover:-translate-y-1 ${t.tone}`}>
                <div className="flex items-center justify-between">
                  <span className="label opacity-70">{t.k}</span>
                  <t.icon className="size-5" />
                </div>
                <span className="break-all font-serif text-[26px] leading-tight">{t.v}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="book" className="scroll-mt-28 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Suspense fallback={<div className="min-h-[560px] rounded-[32px] border border-line bg-paper" />}>
            <BookingForm />
          </Suspense>
          <div className="space-y-4">
            <div className="rounded-[28px] border border-line bg-paper p-8">
              <p className="label text-mute">Consultation hours</p>
              <ContactStatus />
              <dl className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
                {clinic.hoursDisplay.map((h) => (
                  <div key={h.day} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
                    <dt className={h.emphasis ? "text-pulse" : ""}>{h.day}</dt>
                    <dd className={`text-[15px] ${h.emphasis ? "font-medium text-pulse" : "text-ink-soft"}`}>{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[13px] text-mute">Walk-ins welcome. Booking ahead shortens your wait.</p>
            </div>
            <div className="on-dark rounded-[28px] bg-night p-8 text-white">
              <p className="label text-pulse">Visit us</p>
              <p className="mt-4 flex gap-3 font-serif text-[26px] leading-tight">
                <Pin className="mt-1 size-5 shrink-0 text-pulse" />
                <span>{clinic.address.line1}<br />{clinic.address.line2}</span>
              </p>
              <div className="mt-6">
                <Button href={mapsSearch} variant="outline-light">Get directions</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-x">
          <div className="group relative overflow-hidden rounded-[32px] border border-line">
            <iframe
              title="TARA Heart Care location"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[460px] w-full grayscale transition duration-500 group-hover:grayscale-0"
            />
            <span className="label pointer-events-none absolute left-5 top-5 rounded-full bg-paper/95 px-4 py-2">Find us · {clinic.address.line2}</span>
          </div>
        </div>
      </section>
    </>
  );
}
