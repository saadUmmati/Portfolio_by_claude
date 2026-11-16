"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { testimonials, platformIcons } from "@/data/testimonials";
import SectionHeader from "@/components/kit/SectionHeader";
import { prefersReducedMotion } from "@/lib/motion";
import "@/lib/motion";

const SPEED = 36; // px per second of idle drift

/* Reviews as big names + quotes in an endless row that drifts on its own. Grab it (mouse or finger) to
   fling it either way; a "DRAG" bubble follows the cursor, and arrow buttons work for keyboards. */
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const proxy = useRef<HTMLDivElement>(null);
  const api = useRef<{ nudge: (dx: number) => void } | null>(null);

  useGSAP(
    () => {
      const w = wrap.current, t = track.current, b = bubble.current, p = proxy.current;
      if (!w || !t || !b || !p) return;
      const s = { x: 0 };
      let hold = false, dragging = false;
      const half = () => t.scrollWidth / 2;
      const apply = () => { s.x = gsap.utils.wrap(-half(), 0, s.x); gsap.set(t, { x: s.x }); };
      const drift = prefersReducedMotion() ? 0 : SPEED;
      const tick = (_: number, dt: number) => { if (drift && !hold && !dragging) { s.x -= (drift * dt) / 1000; apply(); } };
      gsap.ticker.add(tick);

      const [d] = Draggable.create(p, {
        trigger: w,
        type: "x",
        inertia: true,
        onPress() { dragging = true; gsap.to(b, { scale: 0.75, duration: 0.2 }); w.style.cursor = "grabbing"; },
        onDrag() { s.x += this.deltaX; apply(); },
        onThrowUpdate() { s.x += this.deltaX; apply(); },
        onRelease() { gsap.to(b, { scale: 1, duration: 0.2 }); w.style.cursor = "grab"; gsap.delayedCall(0.8, () => (dragging = false)); },
      });
      api.current = { nudge: (dx) => gsap.to(s, { x: s.x + dx, duration: 0.6, ease: "power3.out", onUpdate: apply }) };

      const fine = window.matchMedia("(pointer: fine)").matches;
      const enter = () => { hold = true; if (fine) gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.3 }); };
      const leave = () => { hold = false; gsap.to(b, { autoAlpha: 0, scale: 0.3, duration: 0.3 }); };
      const qx = gsap.quickTo(b, "x", { duration: 0.25 }), qy = gsap.quickTo(b, "y", { duration: 0.25 });
      const move = (e: MouseEvent) => { const r = w.getBoundingClientRect(); qx(e.clientX - r.left); qy(e.clientY - r.top); };
      w.addEventListener("mouseenter", enter); w.addEventListener("mouseleave", leave); w.addEventListener("mousemove", move);
      return () => {
        gsap.ticker.remove(tick); d.kill();
        w.removeEventListener("mouseenter", enter); w.removeEventListener("mouseleave", leave); w.removeEventListener("mousemove", move);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="testimonials" className="border-t border-ink py-20 md:py-32">
      <div className="container-page mb-12 flex items-end justify-between gap-8">
        <SectionHeader index="08" label="Testimonials" title="Don’t take my word for it." />
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={() => api.current?.nudge(420)} aria-label="Previous testimonials" className="cursor-hover border border-ink px-3 py-2 font-mono text-xs">&#8592;</button>
          <button onClick={() => api.current?.nudge(-420)} aria-label="Next testimonials" className="cursor-hover border border-ink px-3 py-2 font-mono text-xs">&#8594;</button>
          <Link href="/testimonials" className="cursor-hover ml-3 hidden font-mono text-label uppercase underline underline-offset-4 md:block">All &#8594;</Link>
        </div>
      </div>

      <div ref={wrap} className="relative cursor-grab overflow-hidden border-y border-ink">
        <div ref={track} className="flex w-max select-none">
          {[0, 1].map((copy) =>
            testimonials.map((t) => {
              const PlatformIcon = platformIcons[t.platform];
              return (
                <figure
                  key={`${copy}-${t.name}-${t.platform}`}
                  aria-hidden={copy === 1 || undefined}
                  className="flex min-h-[30rem] w-[min(86vw,34rem)] shrink-0 flex-col justify-between gap-8 border-r border-ink p-6 transition-colors duration-200 hover:bg-ink hover:text-bg md:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-16 w-16 items-center justify-center bg-accent text-xl font-black text-on-accent" aria-hidden="true">{t.initials}</span>
                    <span className="flex flex-col items-end gap-2">
                      <span className="flex items-center gap-1.5 font-mono text-label uppercase">
                        {PlatformIcon && <PlatformIcon size={13} />}
                        {t.platform}
                      </span>
                      <span className="flex" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={14} fill={j < t.rating ? "currentColor" : "none"} strokeWidth={j < t.rating ? 0 : 1.5} />
                        ))}
                      </span>
                    </span>
                  </div>
                  <div>
                    <p className="text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.95] font-black tracking-tight uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {t.name}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase">{t.role}, {t.company}</p>
                    <blockquote className="mt-6 text-[17px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  </div>
                </figure>
              );
            })
          )}
        </div>
        <div ref={proxy} aria-hidden="true" className="pointer-events-none absolute h-0 w-0 opacity-0" />
        <div ref={bubble} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-10 -mt-11 -ml-11 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-accent font-mono text-xs tracking-[0.1em] text-on-accent opacity-0">
          DRAG
        </div>
      </div>
    </section>
  );
}
