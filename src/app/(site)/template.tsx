"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dist, dur, ease, prefersReducedMotion } from "@/lib/motion";

let firstLoad = true; // the first page load is handled by the page itself, not by this

// Re-mounts on every navigation: the new page fades and lifts in. (Exit animations are
// not possible with the App Router; a curtain transition comes in a later phase.)
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (firstLoad) { firstLoad = false; return; }
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: dist.sm },
      { autoAlpha: 1, y: 0, duration: dur.base, ease: ease.out, clearProps: "all" }
    );
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
