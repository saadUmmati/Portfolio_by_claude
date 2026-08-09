import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { footerColumns, footerSocials } from "@/data/misc";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border pt-16 pb-10">
      {/* Decorative oversized wordmark -- purely visual, sits behind everything at low
          opacity so it reads as texture rather than competing with real content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 w-full -translate-x-1/2 text-center text-[18vw] leading-none font-black whitespace-nowrap text-foreground/[0.03] select-none"
      >
        SAAD AHMED
      </span>

      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
                <Image
                  src="/images/profile-image.jpg"
                  alt={site.name}
                  fill
                  sizes="88px"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
            <div className="mt-5 space-y-2.5 text-sm text-muted">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-2 transition-colors hover:text-foreground"
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

        <div className="liquid-glass flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-sm font-semibold">Stay in the loop</h3>
            <p className="mt-1 text-sm text-muted">
              Follow along on LinkedIn for updates on AI, on-device engineering &amp; freelancing.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
                className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-muted transition-all hover:scale-110 hover:bg-accent/15 hover:text-accent"
              >
                <s.Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <a
            href="#top"
            className="cursor-hover liquid-glass-light flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/90 transition-transform hover:scale-105"
          >
            Back to top
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
