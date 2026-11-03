"use client";

import { useRef } from "react";
import { techIconRows } from "@/data/techIcons";
import SectionHeader from "@/components/kit/SectionHeader";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

// Two copies of each row are enough for a seamless loop (it travels exactly one copy).
// Each copy repeats the row twice so one copy is always wider than any screen.
const REPEATS = 2;
const DURATIONS = [90, 110]; // seconds per loop -- higher = slower

export default function TechMarquee() {
  const root = useRef<HTMLElement>(null);

  useVelocityMarquee(root, DURATIONS);

  return (
    <section ref={root} className="border-t border-ink py-20 md:py-32">
      <div className="container-page mb-14">
        <SectionHeader
          index="05"
          label="Stack"
          title="Tools I build with"
          intro="On-device AI, LLM agents and automation, across machine learning, generative AI, mobile and web."
        />
      </div>

      {/* Screen readers and search engines get a plain list; the animated rows are decorative. */}
      <ul className="sr-only">
        {techIconRows.flat().map((t) => (
          <li key={t.label}>{t.label}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="border-y border-ink">
        {techIconRows.map((row, i) => {
          const half = Array(REPEATS).fill(row).flat() as typeof row;
          return (
            <div key={i} className="tech-row overflow-hidden border-ink [&:not(:last-child)]:border-b">
              <div data-track className="marquee-track flex w-max">
                {[0, 1].map((copy) =>
                  half.map((item, j) => (
                    <div
                      key={`${copy}-${item.label}-${j}`}
                      data-dup={copy === 1 || j >= row.length ? "" : undefined}
                      className="group flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-4 border-r border-ink transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                    >
                      <item.Icon size={40} />
                      <span className="px-2 text-center font-mono text-[10px] leading-tight tracking-[0.06em] uppercase">
                        {item.label}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
