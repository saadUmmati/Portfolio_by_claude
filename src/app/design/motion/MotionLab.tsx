"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MotionProvider, { useMotion } from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

function Status() {
  const { reduced } = useMotion();
  return (
    <p data-testid="status" className="font-mono text-label uppercase">
      Motion: {reduced ? "reduced (smooth scroll + animations off)" : "full (Lenis + GSAP on)"}
    </p>
  );
}

// Pinned section whose progress is driven by scroll: proves Lenis and ScrollTrigger agree.
function Pinned() {
  const root = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !root.current) return;
    ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "+=1200",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (fill.current) fill.current.style.transform = `scaleX(${self.progress})`;
        if (num.current) num.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
      },
    });
    gsap.set(fill.current, { transformOrigin: "0 50%" });
  }, { scope: root });

  return (
    <section ref={root} className="flex min-h-screen flex-col items-center justify-center gap-8 bg-accent p-8 text-on-accent">
      <p className="font-mono text-label uppercase">Pinned / scrubbed by scroll</p>
      <span ref={num} className="text-display font-semibold">000</span>
      <div className="h-[3px] w-full max-w-xl bg-on-accent">
        <div ref={fill} className="h-full origin-left bg-bg" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}

export default function MotionLab() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <main className="bg-bg text-ink">
        <section className="flex min-h-screen flex-col justify-between border-b border-ink p-8 md:p-12">
          <Status />
          <SplitReveal as="h1" className="text-display max-w-5xl font-semibold">
            Motion foundation. One engine, one spec.
          </SplitReveal>
          <p className="font-mono text-label uppercase">Scroll ↓</p>
        </section>

        <section className="mx-auto grid max-w-5xl gap-6 p-8 md:grid-cols-3 md:p-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <div data-testid="card" className="border border-ink p-6">
                <p className="font-mono text-label uppercase">Reveal {String(i + 1).padStart(2, "0")}</p>
                <p className="text-body mt-4">Fades and lifts once, using the shared easing and duration.</p>
              </div>
            </Reveal>
          ))}
        </section>

        <Pinned />

        <section className="flex min-h-[70vh] items-center border-t border-ink p-8 md:p-12">
          <SplitReveal as="h2" className="text-h1 max-w-4xl font-semibold">
            If you can read this, the scroll engine and the triggers stayed in sync.
          </SplitReveal>
        </section>
      </main>
    </MotionProvider>
  );
}
