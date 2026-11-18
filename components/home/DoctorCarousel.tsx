"use client";

import Link from "next/link";
import { useRef } from "react";
import { DoctorAvatar } from "@/components/DoctorCard";
import { ArrowRight, Calendar } from "@/components/Icons";
import { clinic } from "@/lib/clinic";

const DOCTORS = [
  {
    name: clinic.doctor.name,
    role: clinic.doctor.role,
    specialty: "Interventional Cardiology",
    quals: clinic.doctor.quals,
    years: clinic.doctor.years,
    photo: clinic.doctor.photo,
  },
  ...clinic.team.map((t) => ({ name: t.name, role: t.role, specialty: t.specialty, quals: t.quals, years: t.years, photo: t.photo })),
];

/** Snap-scrolling row of doctor cards with arrow controls. */
export default function DoctorCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: d * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 flex justify-end gap-2">
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => scroll(d)}
            aria-label={d < 0 ? "Previous doctors" : "Next doctors"}
            className="grid size-12 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowRight className={`size-5 ${d < 0 ? "rotate-180" : ""}`} />
          </button>
        ))}
      </div>

      <div
        ref={track}
        data-lenis-prevent
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {DOCTORS.map((d, i) => (
          <article
            key={i}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(36,23,27,0.35)] sm:w-[46%] lg:w-[calc((100%-60px)/4)]"
          >
            <div className="relative">
              <DoctorAvatar photo={d.photo} name={d.name} variant={i - 1} className="aspect-[4/4.2]" />
              <span className="label absolute right-4 top-4 rounded-full bg-night/85 px-3 py-1.5 !text-[10px] text-white">{d.years}+ yrs</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="label !text-[10px] text-pulse">{d.specialty}</p>
              <h3 className="mt-3 font-serif text-[26px] leading-[1.05]">{d.name}</h3>
              <p className="mt-1 text-[14px] text-ink-soft">{d.role}</p>
              <p className="label mt-3 !text-[9.5px] leading-relaxed text-mute">{d.quals}</p>
              <div className="mt-auto grid gap-2 pt-6">
                <Link
                  href="/contact#book"
                  className="flex items-center justify-center gap-2 rounded-full bg-pulse py-3 text-[14px] font-medium text-on-pulse transition hover:bg-pulse-deep"
                >
                  <Calendar className="size-4" /> Book an appointment
                </Link>
                <Link href="/doctors" className="flex items-center justify-center gap-2 py-2 text-[13px] text-ink-soft transition hover:text-pulse">
                  View profile <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
