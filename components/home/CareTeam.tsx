import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { DoctorAvatar, WeekDots } from "../DoctorCard";
import { Lines, Reveal } from "../reveal";

/** Compact care-team strip on the home page, linking to /doctors. */
export default function CareTeam() {
  return (
    <section className="pb-28 sm:pb-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-14">
          <div>
            <p className="label text-pulse">The care team</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]">
              <Lines lines={["And a team", <em key="b" className="text-mute">around every patient.</em>]} />
            </h2>
          </div>
          <Link href="/doctors" className="label border-b border-ink pb-1 transition hover:border-pulse hover:text-pulse">
            Meet all doctors →
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 md:grid-cols-3">
          {clinic.team.map((m, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <Link href="/doctors" className="group flex h-full items-center gap-5 bg-paper p-6 transition-colors hover:bg-bone sm:p-7">
                <DoctorAvatar photo={m.photo} name={m.name} variant={i} className="size-20 shrink-0 rounded-full ring-1 ring-ink/10" />
                <div className="min-w-0 flex-1">
                  <p className="label !text-[10px] text-pulse">{m.specialty}</p>
                  <p className="mt-2 font-serif text-[24px] leading-none">{m.name}</p>
                  <p className="mt-1 text-[14px] text-ink-soft">{m.role}</p>
                  <div className="mt-4 origin-left scale-90">
                    <WeekDots days={m.days} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
