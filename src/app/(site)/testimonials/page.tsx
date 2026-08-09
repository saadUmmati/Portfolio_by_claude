import type { Metadata } from "next";
import { Star } from "lucide-react";
import { testimonials, platformIcons } from "@/data/testimonials";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and colleagues say about working together.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Testimonials</h1>
      <p className="mt-3 max-w-xl text-muted">
        What clients and colleagues have said about working together.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => {
          const PlatformIcon = platformIcons[t.platform];
          return (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
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
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
