"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

// A statement that "reads in" word by word as you scroll past it (scrubbed, so it follows your pace).
export default function ScrubText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: true },
          }
        ),
    });
  }, { scope: ref });

  return <p ref={ref} className={className}>{children}</p>;
}
