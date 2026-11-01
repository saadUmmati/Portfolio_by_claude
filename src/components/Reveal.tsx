"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dist, dur, ease, prefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // ms (same API as before, so every existing <Reveal> upgrades automatically)
  className?: string;
}

// Fades + lifts content in once, when it scrolls into view. Uses the shared motion spec;
// with "reduce motion" on, content is simply shown.
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: dist.md },
      {
        autoAlpha: 1,
        y: 0,
        duration: dur.base,
        delay: delay / 1000,
        ease: ease.out,
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
