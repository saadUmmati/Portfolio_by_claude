import Link from "next/link";
import { site } from "@/data/site";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-page relative grid gap-8 sm:gap-10 md:gap-14 py-16 sm:py-20 md:grid-cols-[1fr_1.15fr] md:items-center md:py-32">
        <div className="animate-fade-up flex flex-col items-start gap-6">
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {site.availability}
          </span>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
            {site.rolesRotating[0]}
            <span className="mt-2 block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
              &amp; Full-Stack Developer
            </span>
          </h1>

          <p className="max-w-lg text-lg text-muted">{site.tagline}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/services"
              className="cursor-hover rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View my Services
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass cursor-hover rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="animate-fade-up flex justify-center md:justify-end" style={{ animationDelay: "0.15s" }}>
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
