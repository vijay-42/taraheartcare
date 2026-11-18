import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ServiceDetail from "@/components/ServiceDetail";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: `${s.title} ${s.titleItalic}`, description: s.intro } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const i = services.indexOf(service);
  const next = services[(i + 1) % services.length];

  return (
    <>
      <PageHero
        index={`Service ${service.index} / 0${services.length}`}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: service.titleItalic }]}
        title={[service.title, <em key="t" className="text-pulse">{service.titleItalic}</em>]}
        intro={service.intro}
      />
      <ServiceDetail service={service} next={next} />
    </>
  );
}
