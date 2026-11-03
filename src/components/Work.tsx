"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/kit/SectionHeader";
import { display } from "@/components/hero/fonts";
import { useDesktopMotion } from "@/lib/useDesktopMotion";
import "@/lib/motion";

/* Selected work as a horizontal strip.
   Desktop: the section pins and scrolling moves the strip sideways.
   Phones / reduced motion: the same strip is a normal swipeable row (no pinning, no hijacking). */
export default function Work() {
  const desktop = useDesktopMotion();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!desktop || !root.current || !track.current) return;
      const el = track.current;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 64);
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (count.current)
              count.current.textContent = String(Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)).padStart(2, "0");
          },
        },
      });
    },
    { scope: root, dependencies: [desktop], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="work" className="flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden border-t border-ink py-16 md:py-20">
      <div className="container-page flex items-end justify-between gap-8">
        <SectionHeader index="01" label="Selected work" title="Things I’ve built" />
        <p className="font-mono text-label hidden shrink-0 uppercase md:block">
          <span ref={count}>01</span> / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div
        ref={track}
        data-testid="work-track"
        data-lenis-prevent={desktop ? undefined : ""}
        className={`mt-12 flex gap-6 px-[max(1rem,calc((100vw-80rem)/2+1rem))] ${
          desktop ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none]"
        }`}
      >
        {projects.map((p, i) => (
          <article key={p.slug} className="group w-[min(82vw,720px)] shrink-0 snap-start border border-ink bg-bg">
            <Link
              href={`/projects/${p.slug}`}
              aria-label={`${p.title}: view case study`}
              className="cursor-hover relative block aspect-[16/10] overflow-hidden border-b border-ink bg-accent"
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`Screenshot of ${p.title}, a ${p.category.toLowerCase()} project`}
                  fill
                  sizes="(min-width: 768px) 720px, 82vw"
                  className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              ) : (
                <span className={`${display.className} text-h2 flex h-full items-center justify-center font-medium text-on-accent uppercase`}>
                  {p.title}
                </span>
              )}
            </Link>

            <div className="p-6 md:p-8">
              <p className="flex items-center justify-between font-mono text-label uppercase">
                <span>{String(i + 1).padStart(2, "0")} / {p.category}</span>
                <span className="inline-block h-2.5 w-2.5 bg-accent" />
              </p>
              <h3 className={`${display.className} text-h2 mt-5 font-medium uppercase`}>
                <Link href={`/projects/${p.slug}`} className="cursor-hover hover:text-accent-text">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-4 line-clamp-3 max-w-xl text-[15px] leading-relaxed">{p.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="border border-ink px-2.5 py-1 font-mono text-[11px] uppercase">{t}</li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-label uppercase">
                <Link href={`/projects/${p.slug}`} className="cursor-hover underline underline-offset-4">Case study</Link>
                <a href={p.href} target="_blank" rel="noreferrer" className="cursor-hover underline underline-offset-4">Source &#8599;</a>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="cursor-hover underline underline-offset-4">Live demo &#8599;</a>
                )}
              </div>
            </div>
          </article>
        ))}

        <Link
          href="/projects"
          className={`${display.className} cursor-hover text-h2 flex w-[min(60vw,360px)] shrink-0 snap-start items-center justify-center bg-accent p-8 text-center font-medium text-on-accent uppercase`}
        >
          All projects &#8594;
        </Link>
      </div>
    </section>
  );
}
