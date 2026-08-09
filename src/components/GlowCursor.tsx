"use client";

import { useEffect, useRef } from "react";

const EASE = 0.18; // lower = more lag/"magnetic" feel
const DEFAULT_SIZE = 22;
const HOVER_SIZE = 44;

// A soft glowing orb that trails the real cursor with elastic lag, and grows/brightens
// over links, buttons, and other interactive elements. Disabled on touch devices and
// for prefers-reduced-motion, and falls back to the native cursor in both cases.
export default function GlowCursor() {
  const orbRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | undefined>(undefined);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest(
        "a, button, input, textarea, [role='button'], .cursor-hover"
      );
    }
    window.addEventListener("mousemove", onMove);

    function tick() {
      pos.current.x += (mouse.current.x - pos.current.x) * EASE;
      pos.current.y += (mouse.current.y - pos.current.y) * EASE;

      const orb = orbRef.current;
      if (orb) {
        const size = hovering.current ? HOVER_SIZE : DEFAULT_SIZE;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.opacity = hovering.current ? "0.9" : "0.55";
        orb.style.transform = `translate(${pos.current.x - size / 2}px, ${
          pos.current.y - size / 2
        }px)`;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,opacity] duration-200 ease-out"
      style={{
        background:
          "radial-gradient(circle, var(--accent-2) 0%, var(--accent) 55%, transparent 75%)",
        filter: "blur(3px)",
      }}
    />
  );
}
