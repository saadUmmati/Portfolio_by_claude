import Link from "next/link";
import { site } from "@/data/site";

// Violet statement that the hero's curtain rises into. Black text on violet = 4.96:1.
export default function HeroIntro() {
  return (
    <section className="bg-accent text-on-accent">
      <div className="container-page grid gap-10 py-20 md:grid-cols-[1.5fr_1fr] md:items-end md:py-32">
        <p className="text-h2 max-w-3xl font-medium">{site.tagline}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/services" className="cursor-hover bg-black px-6 py-3 text-sm font-medium text-paper">
            View my Services
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover border border-black px-6 py-3 text-sm font-medium"
          >
            Get in Touch
          </a>
          <Link href="/resume" target="_blank" className="cursor-hover border border-black px-6 py-3 text-sm font-medium">
            View Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
