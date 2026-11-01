"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "@/lib/motion";

// A 3px solid violet line across the top that fills as you scroll. No glow, no gradient.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = bar.current;
    if (!el) return;
    const setX = gsap.quickSetter(el, "scaleX");
    setX(0);
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => setX(self.progress) });
  }, { scope: bar });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
