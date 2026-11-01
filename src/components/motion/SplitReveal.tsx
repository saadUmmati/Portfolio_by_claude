"use client";

import { createElement, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { dur, ease, prefersReducedMotion, stagger } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

// Headline whose lines rise out of a mask, one after another, when scrolled into view.
// SplitText re-splits on resize / font load (autoSplit) and keeps the text accessible.
export default function SplitReveal({
  children,
  as = "h2",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  delay?: number; // seconds
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: dur.slow,
          ease: ease.impact,
          stagger: stagger.base,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  }, { scope: ref });

  return createElement(as, { ref, className }, children);
}
