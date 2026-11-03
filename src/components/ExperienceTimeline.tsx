"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { experience, experienceFilters, ExperienceCategory } from "@/data/experience";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/kit/SectionHeader";
import { prefersReducedMotion } from "@/lib/motion";

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<"All" | ExperienceCategory>("All");
  const list = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  const items = filter === "All" ? experience : experience.filter((e) => e.categories.includes(filter));

  // The violet line down the rail "draws" as you scroll through the list.
  useGSAP(
    () => {
      const el = fill.current;
      const l = list.current;
      if (!el || !l) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        el,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: l, start: "top 65%", end: "bottom 65%", scrub: true } }
      );
    },
    { scope: list, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section id="experience" className="scroll-mt-28 border-t border-ink py-20 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="Experience"
          title="Where I’ve worked"
          intro="My professional journey and the roles I’ve held throughout my career."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter experience">
          {experienceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`cursor-hover border px-4 py-2 font-mono text-label uppercase transition-colors ${
                filter === f ? "border-accent bg-accent text-on-accent" : "border-ink hover:bg-ink hover:text-bg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={list} className="relative mt-14">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[11px] w-px bg-ink md:left-[calc(10rem+11px)]">
            <div ref={fill} className="absolute inset-y-0 -left-px w-[3px] origin-top bg-accent" />
          </div>

          <div className="space-y-10">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 80} className="grid grid-cols-[24px_1fr] md:grid-cols-[10rem_24px_1fr]">
                <p className="hidden pr-6 pt-7 text-right font-mono text-label uppercase md:block">{item.period}</p>

                <div className="flex justify-center pt-8">
                  <span className="block h-[13px] w-[13px] bg-accent" />
                </div>

                <div className="ml-5 border border-ink bg-bg p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.logoSrc ? (
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-ink p-1.5 ${
                            item.logoBg === "dark" ? "bg-black" : "bg-paper"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- external company logo, avoids Next/Image remote-domain config */}
                          <img src={item.logoSrc} alt={`${item.company} logo`} className="h-full w-full object-contain" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent font-mono text-sm font-semibold text-on-accent">
                          {item.logoInitial}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{item.company}</h3>
                        <p className="font-mono text-label uppercase">{item.location}</p>
                      </div>
                    </div>

                    {item.companyUrl && (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-hover font-mono text-label uppercase underline underline-offset-4"
                      >
                        Visit {item.company} &#8599;
                      </a>
                    )}
                  </div>

                  <p className="mt-6 text-xl font-semibold">{item.role}</p>
                  <p className="mt-1 font-mono text-label text-accent-text uppercase md:hidden">{item.period}</p>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed">{item.description}</p>

                  {item.gallery.length > 0 && (
                    <div data-lenis-prevent className="mt-6 flex gap-3 overflow-x-auto [scrollbar-width:none]">
                      {item.gallery.map((g) =>
                        g.src ? (
                          <div key={g.label} className="group relative h-24 w-40 shrink-0 overflow-hidden border border-ink">
                            <Image
                              src={g.src}
                              alt={g.label}
                              fill
                              sizes="160px"
                              className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                            />
                          </div>
                        ) : (
                          <div
                            key={g.label}
                            className="flex h-24 w-40 shrink-0 items-center justify-center border border-ink px-2 text-center font-mono text-[11px] uppercase"
                          >
                            {g.label}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li key={t} className="border border-ink px-2.5 py-1 font-mono text-[11px] uppercase">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
