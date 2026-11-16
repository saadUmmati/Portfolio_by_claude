"use client";

import { useRef } from "react";
import { techIconRows } from "@/data/techIcons";
import SectionHeader from "@/components/kit/SectionHeader";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

const REPEATS = 2;
const DURATIONS = [80, 100];

const EXPERTISE = ["On-device AI", "LLM agents", "Automation", "Android (Kotlin)"];
// Short, factual one-liners for tools that are already in the stack above.
const SYSTEMS: [string, string][] = [
  ["LangGraph", "Orchestrates multi-step agents so every step runs in order."],
  ["n8n", "Connects apps and automates the work between them."],
  ["MLflow", "Tracks experiments and keeps deployments reproducible."],
  ["Kotlin", "Native Android apps with models running on the device."],
];
const all = techIconRows.flat();
const icon = (label: string) => all.find((t) => t.label === label)?.Icon;

/* Skills block, Desyres-style: statement on the left, and the tools panel anchored to the right corner. */
export default function ToolsIntegrations() {
  const root = useRef<HTMLElement>(null);
  useVelocityMarquee(root, DURATIONS);

  return (
    <section ref={root} id="stack" className="border-t border-ink py-20 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader index="06" label="Skills" title="The right tools change everything." />
          <p className="font-mono text-label mt-12 uppercase">/ Expertise</p>
          <ul className="mt-5 border-t border-ink">
            {EXPERTISE.map((e) => (
              <li key={e} className="flex items-center gap-4 border-b border-ink py-4 text-xl font-semibold">
                <span aria-hidden="true" className="h-3 w-3 bg-accent" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 lg:text-right">
          <p className="font-mono text-label uppercase">/ Tools &amp; integrations</p>

          <ul className="sr-only">
            {all.map((t) => (<li key={t.label}>{t.label}</li>))}
          </ul>

          <div aria-hidden="true" className="mt-5 border border-ink">
            {techIconRows.map((row, i) => {
              const half = Array(REPEATS).fill(row).flat() as typeof row;
              return (
                <div key={i} className="overflow-hidden border-ink [&:not(:last-child)]:border-b">
                  <div data-track className="marquee-track flex w-max">
                    {[0, 1].map((copy) =>
                      half.map((item, j) => (
                        <div
                          key={`${copy}-${item.label}-${j}`}
                          data-dup={copy === 1 || j >= row.length ? "" : undefined}
                          className="flex h-28 w-28 shrink-0 flex-col items-center justify-center gap-3 border-r border-ink transition-colors duration-200 hover:bg-accent hover:text-on-accent md:h-32 md:w-32"
                        >
                          <item.Icon size={34} />
                          <span className="px-1 text-center font-mono text-[10px] leading-tight uppercase">{item.label}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-body mt-5 lg:ml-auto lg:max-w-sm">The latest and most advanced technologies and tools, picked for what ships.</p>

          <p className="font-mono text-label mt-12 uppercase">/ Systems</p>
          <ul className="mt-5 border-t border-ink text-left">
            {SYSTEMS.map(([name, line]) => {
              const Icon = icon(name);
              return (
                <li key={name} className="grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-ink py-4 sm:grid-cols-[3rem_8rem_1fr]">
                  <span className="flex h-10 w-10 items-center justify-center border border-ink">{Icon && <Icon size={20} />}</span>
                  <span className="font-semibold">{name}</span>
                  <span className="col-span-2 text-sm sm:col-span-1">{line}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
