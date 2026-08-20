import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ArrowUp, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { footerColumns, footerSocials } from "@/data/misc";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden pt-20 pb-10">
      {/* Gradient top border instead of a flat line -- echoes the site's signature
          accent gradient rather than a generic gray divider. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-2/60 to-transparent blur-sm" />

      {/* Subtle grid texture + glow, matching the rest of the site instead of a
          plain flat background. */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />

      {/* Decorative oversized wordmark -- purely visual, sits behind everything at low
          opacity so it reads as texture rather than competing with real content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 w-full -translate-x-1/2 bg-gradient-to-r from-fuchsia-500/[0.06] via-violet-500/[0.08] to-sky-400/[0.06] bg-clip-text text-center text-[18vw] leading-none font-black whitespace-nowrap text-transparent select-none"
      >
        SAAD AHMED
      </span>

      <div className="container-page">
        {/* Newsletter CTA moved up top, made the visual anchor of the footer with a
            gradient border and glow instead of a plain glass card easy to skim past. */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-accent-2/10 p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-[80px]" />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-accent uppercase">
                <Sparkles size={13} /> Stay in the loop
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                Get updates on AI, on-device engineering &amp; freelancing
              </h3>
              <p className="mt-1 text-sm text-muted">
                Follow along on LinkedIn — no spam, just real work and lessons learned.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30">
                <Image
                  src="/images/profile-image.jpg"
                  alt={site.name}
                  fill
                  sizes="88px"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
            <div className="mt-5 space-y-2.5 text-sm text-muted">
              <a
                href={`mailto:${site.email}`}
                className="cursor-hover group flex items-center gap-2 transition-all hover:text-foreground active:scale-95"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <Mail size={13} />
                </span>
                {site.email}
              </a>
              <p className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2">
                  <MapPin size={13} />
                </span>
                {site.location}
              </p>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="cursor-hover inline-block transition-all hover:translate-x-1 hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-hover inline-block transition-all hover:translate-x-1 hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">Follow me:</span>
            {footerSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="cursor-hover flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-muted transition-all hover:scale-110 hover:bg-accent/15 hover:text-accent"
              >
                <s.Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <a
            href="#top"
            className="cursor-hover liquid-glass-light flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/90 transition-all hover:scale-105 active:scale-95"
          >
            Back to top
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
