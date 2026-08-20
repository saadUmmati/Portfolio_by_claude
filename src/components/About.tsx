import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="scroll-mt-28 py-12 sm:py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
          <div className="relative mx-auto w-full max-w-md aspect-[928/1126] overflow-hidden rounded-2xl bg-surface md:mx-0">
            <Image
              src="/images/profile-photo.jpg"
              alt={`${site.name}, ${site.title}`}
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              unoptimized
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{site.about.heading}</h3>
            {site.about.body.split("\n\n").map((p, i) => (
              <p key={i} className="mt-4 text-muted">
                {p}
              </p>
            ))}

            <div className="mt-6 flex flex-wrap gap-2">
              {site.about.specialties.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted"
                >
                  <Check size={12} className="shrink-0 text-accent" />
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="cursor-hover inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
              >
                View Services
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-hover inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:bg-surface active:scale-95"
              >
                Hire Now
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cursor-hover inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:bg-surface active:scale-95"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
