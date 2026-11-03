"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/* Endless horizontal loop for every [data-track] inside `root`: even rows run left, odd rows run right.
   Each track must hold two identical halves (it travels exactly one half).
   The faster you scroll, the faster the rows run -- then they settle back. */
export function useVelocityMarquee(root: React.RefObject<HTMLElement | null>, durations: number[]) {
  useGSAP(() => {
    if (prefersReducedMotion() || !root.current) return;
    const tracks = gsap.utils.toArray<HTMLElement>("[data-track]", root.current);
    const tweens = tracks.map((el, i) => {
      const duration = durations[i % durations.length];
      return i % 2 === 0
        ? gsap.fromTo(el, { xPercent: 0 }, { xPercent: -50, duration, ease: "none", repeat: -1 })
        : gsap.fromTo(el, { xPercent: -50 }, { xPercent: 0, duration, ease: "none", repeat: -1 });
    });

    const speed = { v: 1 };
    const apply = () => tweens.forEach((t) => t.timeScale(speed.v));
    let decay: gsap.core.Tween | null = null;
    ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 500, 7);
        if (boost > speed.v) {
          speed.v = boost;
          apply();
          decay?.kill();
          decay = gsap.to(speed, { v: 1, duration: 1.2, ease: "power2.out", onUpdate: apply });
        }
      },
    });
  }, { scope: root });
}
