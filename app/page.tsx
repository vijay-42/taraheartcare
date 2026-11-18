import Image from "next/image";
import Link from "next/link";
import DoctorCarousel from "@/components/home/DoctorCarousel";
import DoctorSearch from "@/components/home/DoctorSearch";
import HeroSlider from "@/components/home/HeroSlider";
import HomeIcon from "@/components/home/HomeIcons";
import Button from "@/components/Button";
import HeartMotif from "@/components/HeartMotif";
import { ArrowRight, ArrowUpRight, Calendar, Check, Mail, Phone, Pin } from "@/components/Icons";
import { Counter, Marquee } from "@/components/motion";
import { Reveal } from "@/components/reveal";
import { clinic, mapsEmbed, mapsSearch, tel } from "@/lib/clinic";
import { articles, centres, facilities, promo, specialities, stats, stories, whyUs } from "@/lib/home";
import { packages } from "@/lib/services";

export default function Home() {
  return (
    <div className="pt-[112px]">
      <HeroSlider />

      {/* Search bar overlapping the banner */}
      <section className="relative z-20 -mt-16 sm:-mt-20">
        <div className="container-x">
          <DoctorSearch />
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-2xl font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.05]">
              Advanced cardiology &amp; 24 × 7 heart emergency care, <em className="text-pulse">close to home.</em>
            </h1>
            <Link
              href={promo.link.href}
              className="group inline-flex items-center gap-3 self-start rounded-full border border-pulse/20 bg-blush/60 py-2 pl-4 pr-2 text-[14px] text-ink transition hover:border-pulse md:self-auto"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-pulse" />
              {promo.text}
              <span className="flex items-center gap-1 rounded-full bg-pulse px-3 py-1 text-[13px] text-on-pulse">
                {promo.link.label} <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialities */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="What we treat" title="Our Specialities" href="/services" linkLabel="View all specialities" />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {specialities.map((s, i) => (
              <Reveal key={s.name} delay={(i % 6) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col items-center gap-4 rounded-[24px] border border-ink/10 bg-paper px-4 py-7 text-center transition duration-500 hover:-translate-y-1 hover:border-pulse hover:bg-pulse hover:text-on-pulse"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-blush/70 text-pulse transition duration-500 group-hover:bg-white/15 group-hover:text-on-pulse">
                    <HomeIcon name={s.icon} className="size-9" />
                  </span>
                  <span className="text-[15px] font-medium leading-snug">{s.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Centres of excellence */}
      <section className="bg-sand/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Under one roof" title="Centres of Excellence" href="/services" linkLabel="All services" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {centres.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper">
                  <ImageSlot src={c.image} alt={c.name} icon={["siren", "ecg", "shield"][i]} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-serif text-[28px] leading-[1.05]">{c.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.text}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-7">
                      <Link href={c.href} className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition hover:bg-pulse">
                        Explore
                      </Link>
                      <Link href="/contact#book" className="rounded-full border border-ink/15 px-5 py-2.5 text-[14px] font-medium transition hover:border-ink">
                        Book appointment
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Meet the team" title="Our Doctors" href="/doctors" linkLabel="View all doctors" />
          <div className="mt-4">
            <DoctorCarousel />
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="on-dark relative overflow-hidden bg-night py-20 text-white sm:py-28">
        <div className="grid-paper-dark absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHead eyebrow="Infrastructure" title="Our Facilities" dark />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 lg:grid-cols-4">
            {facilities.map((f, i) => (
              <Reveal key={f.name} delay={(i % 4) * 0.06} className="bg-night">
                <div className="group flex h-full flex-col gap-8 p-6 transition duration-500 hover:bg-night-2 sm:p-8">
                  <div className="flex items-start justify-between">
                    <HomeIcon name={f.icon} className="size-11 text-pulse transition duration-500 group-hover:scale-110" />
                    <span className="label text-white/30">0{i + 1}</span>
                  </div>
                  <p className="font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.1]">{f.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency band + counters */}
      <section className="relative overflow-hidden bg-pulse py-20 text-on-pulse sm:py-24">
        <HeartMotif className="pointer-events-none absolute -left-24 top-1/2 w-[520px] -translate-y-1/2 text-white/[0.07]" strokeWidth={0.8} />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="label text-white/70">Heart emergency · 24 × 7 × 365</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,4.6vw,4rem)]">
              Chest pain? <em className="text-white/65">Call before you come.</em>
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/80">
              Our team prepares the Cath Lab while you are on the way. For a heart attack, opening the artery within the first hour saves the most heart muscle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={tel(clinic.phones.emergency)} variant="light" icon={<Phone className="size-4" />}>
                {clinic.phones.emergency}
              </Button>
              <Button href="/resources#symptoms" variant="outline-light">
                Know the warning signs
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/20 rounded-[28px] border border-white/20 bg-white/5">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8 text-center sm:px-6">
                <Counter to={s.value} suffix={s.suffix} className="display block text-[clamp(2rem,4vw,3.4rem)]" />
                <p className="mt-2 text-[13px] leading-snug text-white/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health packages */}
      <section id="packages" className="scroll-mt-28 py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Preventive checkups" title="Health Packages" href="/services/preventive-cardiology#checkup" linkLabel="Compare packages" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article
                  className={`flex h-full flex-col rounded-[28px] p-8 ${
                    "featured" in p && p.featured ? "on-dark bg-night text-white" : "border border-ink/10 bg-paper"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="label text-pulse">{p.name}</p>
                    {"featured" in p && p.featured && <span className="label rounded-full bg-pulse px-3 py-1 !text-[10px] text-on-pulse">Most chosen</span>}
                  </div>
                  <p className="display mt-6 text-[44px]">{p.price}</p>
                  <ul className="mt-6 space-y-3 border-t border-current/10 pt-6 text-[15px]">
                    {p.tests.map((t) => (
                      <li key={t} className="flex gap-3">
                        <Check className="mt-0.5 size-4 shrink-0 text-pulse" />
                        <span className="opacity-80">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact?service=Preventive%20Heart%20Checkup#book"
                    className="mt-auto flex items-center justify-center gap-2 rounded-full bg-pulse py-3.5 text-[14px] font-medium text-on-pulse transition hover:bg-pulse-deep"
                    style={{ marginTop: "2rem" }}
                  >
                    <Calendar className="size-4" /> Book this package
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-sand/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Heart health" title="Blog Articles" href="/resources#blog" linkLabel="View all articles" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <Link href={a.href} className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper">
                  <div className="relative">
                    <ImageSlot src={a.image} alt={a.title} icon={["siren", "shield", "ecg"][i]} className="aspect-[16/10]" />
                    <span className="label absolute left-4 top-4 rounded-full bg-paper px-3 py-1.5 !text-[10px] text-pulse">{a.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-serif text-[25px] leading-[1.1] transition group-hover:text-pulse">{a.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{a.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-5 text-[13px]" style={{ marginTop: "1.75rem" }}>
                      <span className="text-mute">{a.author}</span>
                      <span className="flex items-center gap-1 font-medium text-pulse">
                        Read more <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Patient stories */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="In their words" title="Patient Stories" href={clinic.social.youtube} linkLabel="Watch more" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <VideoCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <Marquee>
            {clinic.testimonials.map((t) => (
              <figure key={t.quote} className="mr-5 w-[380px] shrink-0 rounded-[24px] border border-ink/10 bg-paper p-7">
                <p className="text-[20px] leading-none text-gold">★★★★★</p>
                <blockquote className="mt-4 whitespace-normal font-serif text-[21px] leading-[1.25]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="label mt-5 !text-[10px] text-mute">
                  {t.name} · {t.detail}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-sand/60 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="label text-pulse">Why TARA</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,4.6vw,4rem)]">Why Choose Us?</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
              Our mission is simple: world-class heart care that is honest, accessible and ready the moment you need it. From a first check-up to an emergency angioplasty, one team looks after you.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <Counter to={s.value} suffix={s.suffix} className="display block text-[clamp(1.8rem,3vw,2.6rem)] text-pulse" />
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="h-full rounded-[24px] border border-ink/10 bg-paper p-7">
                  <span className="grid size-10 place-items-center rounded-full bg-pulse font-mono text-[12px] text-on-pulse">0{i + 1}</span>
                  <h3 className="mt-6 font-serif text-[24px] leading-[1.1]">{w.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visit / contact */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Visit us" title={`Experience care at ${clinic.name}`} />
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-4 rounded-[28px] border border-ink/10 bg-paper p-8">
              <ContactRow icon={<Pin className="size-5" />} label="Address" href={mapsSearch}>
                {clinic.address.line1}
                <br />
                {clinic.address.line2}
              </ContactRow>
              <ContactRow icon={<Phone className="size-5" />} label="Emergency · 24 × 7" href={tel(clinic.phones.emergency)} strong>
                {clinic.phones.emergency}
              </ContactRow>
              <ContactRow icon={<Calendar className="size-5" />} label="Appointments" href={tel(clinic.phones.appointments)}>
                {clinic.phones.appointments}
              </ContactRow>
              <ContactRow icon={<Mail className="size-5" />} label="Send an email" href={`mailto:${clinic.email}`}>
                {clinic.email}
              </ContactRow>
              <div className="mt-2 rounded-2xl bg-bone p-5">
                <p className="label text-mute">OPD hours</p>
                <ul className="mt-3 space-y-2 text-[14px]">
                  {clinic.hoursDisplay.map((h) => (
                    <li key={h.day} className="flex flex-wrap justify-between gap-2">
                      <span className={h.emphasis ? "font-medium text-pulse" : "text-ink"}>{h.day}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Button href="/contact#book" variant="pulse">Book an appointment</Button>
                <Button href={mapsSearch} variant="ghost">Get directions</Button>
              </div>
            </div>
            <div className="min-h-[420px] overflow-hidden rounded-[28px] border border-ink/10 bg-sand">
              <iframe title={`${clinic.name} on Google Maps`} src={mapsEmbed} className="h-full min-h-[420px] w-full grayscale-[0.4]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, href, linkLabel, dark }: { eyebrow: string; title: string; href?: string; linkLabel?: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="label text-pulse">{eyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2.3rem,4.4vw,3.8rem)]">{title}</h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-medium transition ${
            dark ? "border-white/20 hover:bg-white hover:text-ink" : "border-ink/15 hover:border-ink hover:bg-ink hover:text-paper"
          }`}
        >
          {linkLabel} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/** Shows the photo once you add one in lib/home.ts; until then a branded placeholder. */
function ImageSlot({ src, alt, icon, className = "" }: { src: string | null; alt: string; icon: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.05]" />
      ) : (
        <div className="grid-paper absolute inset-0 grid place-items-center bg-gradient-to-br from-blush via-sand to-bone">
          <HomeIcon name={icon} className="size-20 text-pulse/25 transition duration-700 group-hover:scale-110" strokeWidth={1.2} />
        </div>
      )}
    </div>
  );
}

function VideoCard({ youtubeId, title, detail }: { youtubeId: string | null; title: string; detail: string }) {
  const inner = (
    <>
      <div className="relative aspect-video overflow-hidden rounded-[24px] bg-night">
        {youtubeId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="grid-paper-dark absolute inset-0 bg-gradient-to-br from-night via-night-2 to-pulse-deep" />
        )}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-paper text-pulse shadow-xl transition duration-500 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
        </span>
      </div>
      <p className="label mt-5 !text-[10px] text-pulse">{detail}</p>
      <h3 className="mt-2 font-serif text-[23px] leading-[1.15]">{title}</h3>
    </>
  );
  return youtubeId ? (
    <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener" className="group block">
      {inner}
    </a>
  ) : (
    <div className="group block">{inner}</div>
  );
}

function ContactRow({ icon, label, href, children, strong }: { icon: React.ReactNode; label: string; href: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="group flex items-start gap-4 border-b border-ink/10 pb-4">
      <span className={`grid size-11 shrink-0 place-items-center rounded-full ${strong ? "bg-pulse text-on-pulse" : "bg-blush/70 text-pulse"}`}>{icon}</span>
      <span>
        <span className="label block !text-[10px] text-mute">{label}</span>
        <span className={`mt-1 block text-[16px] transition group-hover:text-pulse ${strong ? "font-medium" : ""}`}>{children}</span>
      </span>
    </a>
  );
}
