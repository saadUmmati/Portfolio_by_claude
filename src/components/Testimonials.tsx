"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { testimonials, platformIcons } from "@/data/testimonials";
import SectionHeader from "@/components/kit/SectionHeader";
import "@/lib/motion";

// Drag the row sideways (mouse or finger, with momentum). A "DRAG" bubble follows the cursor.
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const drag = useRef<Draggable | null>(null);

  useGSAP(
    () => {
      const w = wrap.current, t = track.current, b = bubble.current;
      if (!w || !t || !b) return;
      const [d] = Draggable.create(t, {
        type: "x",
        bounds: w,
        inertia: true,
        edgeResistance: 0.85,
        onPress() { gsap.to(b, { scale: 0.75, duration: 0.2 }); w.style.cursor = "grabbing"; },
        onRelease() { gsap.to(b, { scale: 1, duration: 0.2 }); w.style.cursor = "grab"; },
      });
      drag.current = d;

      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine) return;
      const qx = gsap.quickTo(b, "x", { duration: 0.25 });
      const qy = gsap.quickTo(b, "y", { duration: 0.25 });
      const enter = () => gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.3 });
      const leave = () => gsap.to(b, { autoAlpha: 0, scale: 0.3, duration: 0.3 });
      const move = (e: MouseEvent) => { const r = w.getBoundingClientRect(); qx(e.clientX - r.left); qy(e.clientY - r.top); };
      w.addEventListener("mouseenter", enter);
      w.addEventListener("mouseleave", leave);
      w.addEventListener("mousemove", move);
      return () => {
        w.removeEventListener("mouseenter", enter);
        w.removeEventListener("mouseleave", leave);
        w.removeEventListener("mousemove", move);
      };
    },
    { scope: root }
  );

  const step = (dir: 1 | -1) => {
    const t = track.current, w = wrap.current, d = drag.current;
    if (!t || !w || !d) return;
    const x = gsap.utils.clamp(d.minX, d.maxX, (gsap.getProperty(t, "x") as number) - dir * 420);
    gsap.to(t, { x, duration: 0.6, ease: "power3.out", onUpdate: () => d.update() });
  };

  return (
    <section ref={root} id="testimonials" className="border-t border-ink py-20 md:py-32">
      <div className="container-page mb-12 flex items-end justify-between gap-8">
        <SectionHeader index="07" label="Testimonials" title="What people say" />
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={() => step(-1)} aria-label="Previous testimonials" className="cursor-hover border border-ink px-3 py-2 font-mono text-xs">&#8592;</button>
          <button onClick={() => step(1)} aria-label="Next testimonials" className="cursor-hover border border-ink px-3 py-2 font-mono text-xs">&#8594;</button>
          <Link href="/testimonials" className="cursor-hover ml-3 hidden font-mono text-label uppercase underline underline-offset-4 md:block">All &#8594;</Link>
        </div>
      </div>

      <div ref={wrap} className="relative cursor-grab overflow-hidden border-y border-ink">
        <div ref={track} className="flex w-max select-none">
          {testimonials.map((t) => {
            const PlatformIcon = platformIcons[t.platform];
            return (
              <figure key={t.name + t.platform} className="flex h-[22rem] w-[min(82vw,26rem)] shrink-0 flex-col justify-between gap-6 border-r border-ink p-7 transition-colors duration-200 hover:bg-ink hover:text-bg">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-label uppercase">
                    {PlatformIcon && <PlatformIcon size={13} />}
                    {t.platform}
                  </span>
                  <span className="flex" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} fill={j < t.rating ? "currentColor" : "none"} strokeWidth={j < t.rating ? 0 : 1.5} />
                    ))}
                  </span>
                </div>
                <blockquote className="text-[17px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current font-mono text-xs">{t.initials}</span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block font-mono text-[11px] uppercase">{t.role}, {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div ref={bubble} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-10 -mt-11 -ml-11 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-accent font-mono text-xs tracking-[0.1em] text-on-accent opacity-0">
          DRAG
        </div>
      </div>
    </section>
  );
}
