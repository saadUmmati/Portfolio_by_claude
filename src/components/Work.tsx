"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/kit/SectionHeader";
import { useDesktopMotion } from "@/lib/useDesktopMotion";
import "@/lib/motion";

/* Selected work as a big-type list. On desktop, hovering a row turns it violet and a preview of the
   project follows the cursor. On phones every row shows its image inline. Each row opens its own page. */
export default function Work() {
  const desktop = useDesktopMotion();
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  useGSAP(
    () => {
      if (!desktop || !card.current) return;
      gsap.set(card.current, { xPercent: 0, yPercent: -50, autoAlpha: 0 });
      move.current = {
        x: gsap.quickTo(card.current, "x", { duration: 0.45, ease: "power3" }),
        y: gsap.quickTo(card.current, "y", { duration: 0.45, ease: "power3" }),
      };
    },
    { scope: root, dependencies: [desktop] }
  );

  const show = (i: number) => {
    setActive(i);
    if (card.current) gsap.to(card.current, { autoAlpha: 1, duration: 0.2 });
  };
  const hide = () => card.current && gsap.to(card.current, { autoAlpha: 0, duration: 0.2 });
  const follow = (e: React.MouseEvent) => {
    move.current?.x(e.clientX + 32);
    move.current?.y(e.clientY);
  };

  const preview = projects[active];

  return (
    <section ref={root} id="work" className="scroll-mt-20 border-t border-ink pt-20 md:pt-28">
      <div className="container-page flex items-end justify-between gap-8 pb-10 md:pb-14">
        <SectionHeader index="01" label="Selected work" title="Things I’ve built" />
        <Link href="/projects" className="cursor-hover hidden shrink-0 font-mono text-label uppercase underline underline-offset-4 md:block">
          All {projects.length} projects &#8594;
        </Link>
      </div>

      <ul>
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-ink last:border-b">
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={desktop ? () => show(i) : undefined}
              onMouseMove={desktop ? follow : undefined}
              onMouseLeave={desktop ? hide : undefined}
              className="cursor-hover group block px-5 py-7 transition-colors duration-200 hover:bg-accent hover:text-on-accent md:px-8 md:py-9 lg:px-12"
            >
              <span className="grid items-center gap-x-6 md:grid-cols-[4rem_1fr_18rem_3rem]">
                <span className="hidden font-mono text-label uppercase md:block">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.7rem,3.8vw,3.2rem)] leading-[1.05] font-bold" style={{ fontVariationSettings: "'wdth' 108" }}>
                  {p.title}
                </span>
                <span className="mt-3 block font-mono text-label uppercase md:mt-0">
                  {p.category}
                  <br />
                  {p.tags.slice(0, 4).join(" / ")}
                </span>
                <span className="hidden text-3xl md:block md:text-right">&#8594;</span>
              </span>

              {!desktop && p.image && (
                <span className="relative mt-5 block aspect-[16/10] w-full overflow-hidden border border-ink">
                  <Image src={p.image} alt={`Screenshot of ${p.title}`} fill sizes="100vw" className="object-cover" />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {desktop && (
        <div ref={card} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[80] h-[238px] w-[380px] overflow-hidden border border-ink bg-bg">
          {preview.image ? (
            <Image key={preview.slug} src={preview.image} alt="" fill sizes="380px" className="object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center bg-accent p-6 text-center text-2xl font-bold text-on-accent">{preview.title}</span>
          )}
        </div>
      )}
    </section>
  );
}
