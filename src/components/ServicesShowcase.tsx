import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceRow, { ServiceRowData } from "@/components/ServiceRow";
import SectionHeader from "@/components/kit/SectionHeader";

// The services that matter most for the kind of work I want; every other service lives on /services.
const MAIN = [
  "On-Device ML Model Integration",
  "Multi-Step Autonomous Agent Systems",
  "n8n / Zapier / Make Workflow Automation",
  "Native Android App Development",
];

const best = (src?: string) => {
  if (!src) return undefined;
  const png = src.replace(/\.jpe?g$/i, ".png");
  return png !== src && fs.existsSync(path.join(process.cwd(), "public", png)) ? png : src;
};

export default function ServicesShowcase() {
  const rows: ServiceRowData[] = MAIN.map((prefix) => services.find((s) => s.title.startsWith(prefix)))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .map((s) => ({ slug: s.slug, title: s.title.replace(/\s*\(.*\)$/, ""), blurb: s.shortDescription, image: best(s.gallery.find((g) => g.src)?.src), tags: s.tags }));

  return (
    <section id="services" className="scroll-mt-20 border-t border-ink pt-20 md:pt-32">
      <div className="container-page grid gap-8 pb-14 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-8">
          <SectionHeader index="03" label="Services" title="I build AI that runs where your users are." />
        </div>
        <p className="text-body self-end md:col-span-4">
          Four things I do best. Every other service, from RAG and voice agents to Play Store launches, is on the full list.
        </p>
      </div>
      {rows.map((s, i) => (
        <ServiceRow key={s.slug} s={s} index={i} />
      ))}
      <div className="border-t border-ink">
        <div className="container-page py-8">
          <Link href="/services" className="cursor-hover font-mono text-label uppercase underline underline-offset-4">
            All {services.length} services &#8594;
          </Link>
        </div>
      </div>
    </section>
  );
}
