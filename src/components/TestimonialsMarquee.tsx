"use client";

import { useRef } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { testimonials, platformIcons } from "@/data/testimonials";
import SectionHeader from "@/components/kit/SectionHeader";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

// Two copies of the row make a seamless loop; each copy repeats the quotes twice so it is wider than any screen.
const REPEATS = 2;
const DURATIONS = [75];

export default function TestimonialsMarquee() {
  const root = useRef<HTMLElement>(null);
  useVelocityMarquee(root, DURATIONS);
  const half = Array(REPEATS).fill(testimonials).flat() as typeof testimonials;

  return (
    <section ref={root} className="border-t border-ink py-20 md:py-32">
      <div className="container-page mb-14 flex items-end justify-between gap-8">
        <SectionHeader index="07" label="Testimonials" title="What people say" />
        <Link href="/testimonials" className="cursor-hover hidden shrink-0 font-mono text-label uppercase underline underline-offset-4 md:block">
          All testimonials &#8594;
        </Link>
      </div>

      <div className="overflow-hidden border-y border-ink">
        <div data-track className="marquee-track flex w-max">
          {[0, 1].map((copy) =>
            half.map((t, i) => {
              const PlatformIcon = platformIcons[t.platform];
              const dup = copy === 1 || i >= testimonials.length;
              return (
                <figure
                  key={`${copy}-${i}`}
                  aria-hidden={dup || undefined}
                  data-dup={dup ? "" : undefined}
                  className="flex w-[22rem] shrink-0 flex-col justify-between gap-6 border-r border-ink p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-label uppercase">
                      {PlatformIcon && <PlatformIcon size={13} />}
                      {t.platform}
                    </span>
                    <div className="flex text-accent-text" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} fill={j < t.rating ? "currentColor" : "none"} strokeWidth={j < t.rating ? 0 : 1.5} />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink font-mono text-xs">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{t.name}</span>
                      <span className="block font-mono text-[11px] uppercase">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
