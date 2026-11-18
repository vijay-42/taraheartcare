import Image from "next/image";
import { clinic } from "@/lib/clinic";
import DoctorIllustration from "./DoctorIllustration";

export type TeamMember = (typeof clinic.team)[number];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun

/** Photo, or a colourful illustrated portrait until a real photo is added in lib/clinic.ts. */
export function DoctorAvatar({
  photo,
  name,
  variant = 0,
  className = "",
}: {
  photo: string | null;
  name: string;
  variant?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {photo ? (
        <Image src={photo} alt={name} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.04]" />
      ) : (
        <DoctorIllustration variant={variant} className="h-full w-full origin-bottom transition duration-500 ease-out group-hover:scale-[1.05]" />
      )}
    </div>
  );
}

/** Seven-dot OPD week, Monday first. */
export function WeekDots({ days, light = false }: { days: number[]; light?: boolean }) {
  return (
    <div className="flex gap-1.5" aria-label={`In OPD ${days.length} days a week`}>
      {ORDER.map((d) => {
        const on = days.includes(d);
        return (
          <span
            key={d}
            className={`grid size-6 place-items-center rounded-full font-mono text-[10px] ${
              on ? "bg-pulse text-on-pulse" : light ? "border border-white/15 text-white/35" : "border border-ink/15 text-mute"
            }`}
          >
            {DAYS[d]}
          </span>
        );
      })}
    </div>
  );
}

export default function DoctorCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_30px_60px_-30px_rgba(36,23,27,0.35)]">
      <div className="relative">
        <DoctorAvatar photo={member.photo} name={member.name} variant={index - 2} className="aspect-[5/4]" />
        <span className="label absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1.5 !text-[10px] text-ink">
          {String(index).padStart(2, "0")}
        </span>
        <span className="label absolute right-5 top-5 rounded-full bg-night/85 px-3 py-1.5 !text-[10px] text-white">
          {member.years}+ yrs
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="label text-pulse">{member.specialty}</p>
        <h3 className="mt-4 font-serif text-[32px] leading-none">{member.name}</h3>
        <p className="mt-2 text-[15px] text-ink-soft">{member.role}</p>
        <p className="label mt-3 !text-[10px] text-mute">{member.quals}</p>

        <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-[14px] text-ink-soft">
          {member.focus.map((f) => (
            <li key={f} className="flex items-baseline gap-3">
              <span className="text-[10px] text-gold">✦</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <WeekDots days={member.days} />
          <span className="label !text-[10px] text-mute">{member.languages.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
