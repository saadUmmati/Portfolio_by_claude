"use client";

import { useEffect, useRef } from "react";

// --- Neural trail tuning ---
interface TrailNode {
  x: number;
  y: number;
  life: number; // 1 -> 0
}
const MAX_NODES = 10;
const NODE_LIFESPAN = 38; // frames
const LINK_DISTANCE = 70; // px
const MIN_SPACING = 16; // px of cursor movement before dropping a new trail node

// --- Orb tuning ---
const EASE = 0.18; // lower = more lag/"magnetic" feel
const DEFAULT_SIZE = 20;
const HOVER_SIZE = 42;

// Combines two cursor effects: a fading trail of connected "neural" nodes (canvas,
// on-theme for AI), and a soft glow orb that lags behind with elastic ease and grows
// over interactive elements (the "premium tech product" feel). Disabled on touch
// devices and for prefers-reduced-motion, falling back to the native cursor.
export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | undefined>(undefined);

  const trail = useRef<TrailNode[]>([]);
  const lastTrailPos = useRef<{ x: number; y: number } | null>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const orbPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    document.documentElement.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const accent2 =
      getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() ||
      "#22d3ee";

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      mouse.current = { x, y };

      const target = e.target as HTMLElement;
      hovering.current = !!target.closest(
        "a, button, input, textarea, [role='button'], .cursor-hover"
      );

      const last = lastTrailPos.current;
      if (!last || Math.hypot(x - last.x, y - last.y) > MIN_SPACING) {
        trail.current.push({ x, y, life: 1 });
        if (trail.current.length > MAX_NODES) trail.current.shift();
        lastTrailPos.current = { x, y };
      }
    }
    window.addEventListener("mousemove", onMove);

    function tick() {
      // neural trail
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const n of trail.current) n.life -= 1 / NODE_LIFESPAN;
        trail.current = trail.current.filter((n) => n.life > 0);

        for (let i = 0; i < trail.current.length; i++) {
          for (let j = i + 1; j < trail.current.length; j++) {
            const a = trail.current[i];
            const b = trail.current[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < LINK_DISTANCE) {
              const opacity = Math.min(a.life, b.life) * (1 - dist / LINK_DISTANCE) * 0.45;
              ctx.strokeStyle = hexToRgba(accent2, opacity);
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        for (const n of trail.current) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5 + n.life * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(accent2, n.life * 0.85);
          ctx.fill();
        }
      }

      // orb
      orbPos.current.x += (mouse.current.x - orbPos.current.x) * EASE;
      orbPos.current.y += (mouse.current.y - orbPos.current.y) * EASE;
      const orb = orbRef.current;
      if (orb) {
        const size = hovering.current ? HOVER_SIZE : DEFAULT_SIZE;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.opacity = hovering.current ? "0.9" : "0.55";
        orb.style.transform = `translate(${orbPos.current.x - size / 2}px, ${
          orbPos.current.y - size / 2
        }px)`;
      }

      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden="true" />
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,opacity] duration-200 ease-out"
        style={{
          background: "radial-gradient(circle, var(--accent-2) 0%, var(--accent) 55%, transparent 75%)",
          filter: "blur(3px)",
        }}
      />
    </>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, alpha)})`;
}
