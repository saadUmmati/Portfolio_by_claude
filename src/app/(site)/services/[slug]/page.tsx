import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { site } from "@/data/site";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const ogTitle = `${service.title} - ${site.name}`;
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: ogTitle, description: service.shortDescription, type: "website" },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
