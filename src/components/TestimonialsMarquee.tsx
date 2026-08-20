import Link from "next/link";
import { Star } from "lucide-react";
import { testimonials, platformIcons, Testimonial } from "@/data/testimonials";

const REPEATS = 3;

export default function TestimonialsMarquee() {
  const row: Testimonial[] = Array(REPEATS).fill(testimonials).flat();

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-page mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
        </div>
        <Link href="/testimonials" className="cursor-hover hidden text-sm text-accent transition-colors hover:text-accent-2 md:block">
          View All Testimonials →
        </Link>
      </div>

      <div className="mask-fade-x marquee-row overflow-hidden py-4">
        <div
          className="marquee-track flex w-max min-w-max gap-6"
          style={{ "--marquee-duration": "55s" } as React.CSSProperties}
        >
          {[...row, ...row].map((t, i) => {
            const PlatformIcon = platformIcons[t.platform];
            return (
              <div
                key={i}
                className="w-80 shrink-0 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 cursor-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    {PlatformIcon && <PlatformIcon size={13} />}
                    {t.platform}
                  </span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        fill={j < t.rating ? "currentColor" : "none"}
                        strokeWidth={j < t.rating ? 0 : 1.5}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
                    {t.initials}
                  </div>
                  <div>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted">
                      {t.role}, {t.company}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link
        href="/testimonials"
        className="cursor-hover container-page mt-6 flex min-h-[44px] items-center text-sm text-accent transition-colors hover:text-accent-2 md:hidden"
      >
        View All Testimonials →
      </Link>
    </section>
  );
}
