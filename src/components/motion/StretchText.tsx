"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

// Letters near the mouse swell wider (variable-font width axis) and push their neighbours aside.
const MAX = 125;
const base = (i: number) => 66 + ((i * 37) % 5) * 7; // 66-94: a gently uneven resting rhythm

export default function StretchText({
  text,
  className = "",
  label,
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  let n = 0;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const letters = Array.from(el.querySelectorAll<HTMLElement>(".stretch-l"));
      const reset = () =>
        letters.forEach((l) => gsap.to(l, { "--w": Number(l.dataset.w), duration: 0.6, ease: "power3.out", overwrite: true }));
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const reach = window.innerWidth * 0.09;
        letters.forEach((l) => {
          const r = l.getBoundingClientRect();
          const d = e.clientX - (r.left + r.width / 2);
          const b = Number(l.dataset.w);
          gsap.to(l, { "--w": b + (MAX - b) * Math.exp(-((d / reach) ** 2)), duration: 0.35, ease: "power3.out", overwrite: true });
        });
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    },
    { scope: root }
  );

  return (
    <span ref={root} className={`block whitespace-nowrap ${className}`} aria-label={label ?? text} role="text">
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden="true">
          {wi > 0 && <span className="inline-block w-[0.2em]" />}
          {word.split("").map((ch) => {
            const w = base(n++);
            return (
              <span key={n} className="stretch-l" data-w={w} style={{ ["--w" as string]: w }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
