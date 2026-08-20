"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { experience, experienceFilters, ExperienceCategory } from "@/data/experience";
import Reveal from "@/components/Reveal";

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<"All" | ExperienceCategory>("All");

  const items =
    filter === "All"
      ? experience
      : experience.filter((e) => e.categories.includes(filter));

  return (
    <section id="experience" className="scroll-mt-28 py-12 sm:py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="mt-3 text-muted">
            My professional journey and the roles I&apos;ve held throughout my career
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {experienceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-hover flex min-h-[44px] items-center rounded-full border px-4 py-1.5 text-sm transition-all active:scale-95 ${
                filter === f
                  ? "border-accent bg-accent text-white"
                  : "border-border text-muted hover:bg-surface"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative mt-14 space-y-8">
          <div className="absolute top-2 bottom-2 left-4 w-px bg-border sm:left-5" />

          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 100} className="relative flex gap-4 sm:gap-6">
              <div className="relative flex w-8 shrink-0 justify-center pt-2 sm:w-10">
                <span
                  className="h-3 w-3 rounded-full ring-4 ring-background"
                  style={{ backgroundColor: item.logoColor }}
                />
              </div>

              <div className="flex-1 rounded-2xl border border-border bg-surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.logoSrc ? (
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full p-1.5 ring-1 ring-border ${
                          item.logoBg === "dark" ? "bg-neutral-900" : "bg-white"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- external company logo, avoids Next/Image remote-domain config */}
                        <img
                          src={item.logoSrc}
                          alt={`${item.company} logo`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: item.logoColor }}
                      >
                        {item.logoInitial}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{item.company}</h3>
                      <p className="text-xs text-muted">{item.location}</p>
                    </div>
                  </div>

                  {item.companyUrl && (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-hover flex min-h-[44px] items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-all hover:bg-surface-2 active:scale-95"
                    >
                      Visit {item.company}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="mt-4 font-semibold">{item.role}</p>
                <p className="text-sm text-accent">{item.period}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>

                {item.gallery.length > 0 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto">
                    {item.gallery.map((g) =>
                      g.src ? (
                        <div
                          key={g.label}
                          className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-border"
                        >
                          <Image
                            src={g.src}
                            alt={g.label}
                            fill
                            sizes="160px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          key={g.label}
                          className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg px-2 text-center text-[11px] font-medium text-white/90"
                          style={{
                            background: `linear-gradient(135deg, ${item.logoColor}55, ${item.logoColor}15)`,
                          }}
                        >
                          {g.label}
                        </div>
                      )
                    )}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
