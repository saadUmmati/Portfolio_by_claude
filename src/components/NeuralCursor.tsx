"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  life: number; // 1 -> 0, fades out
}

const MAX_NODES = 14;
const NODE_LIFESPAN = 45; // frames
const LINK_DISTANCE = 90; // px, max distance to draw a connecting line
const MIN_SPACING = 14; // px, minimum cursor movement before dropping a new node

// Renders a small trail of connected "neural nodes" that follows the cursor.
// Disabled automatically on touch devices and for prefers-reduced-motion.
export default function NeuralCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-2")
      .trim() || "#22d3ee";

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      const last = lastPos.current;
      if (!last || Math.hypot(x - last.x, y - last.y) > MIN_SPACING) {
        nodesRef.current.push({ x, y, life: 1 });
        if (nodesRef.current.length > MAX_NODES) nodesRef.current.shift();
        lastPos.current = { x, y };
      }
    }
    window.addEventListener("mousemove", onMove);

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      for (const n of nodes) n.life -= 1 / NODE_LIFESPAN;
      nodesRef.current = nodes.filter((n) => n.life > 0);

      // connecting lines between nearby recent nodes
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const a = nodesRef.current[i];
          const b = nodesRef.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const opacity = Math.min(a.life, b.life) * (1 - dist / LINK_DISTANCE) * 0.5;
            ctx.strokeStyle = hexToRgba(accent, opacity);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes themselves
      for (const n of nodesRef.current) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 + n.life * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(accent, n.life * 0.9);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
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
