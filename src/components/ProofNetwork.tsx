"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proofCategories, ProofNode } from "@/data/proofNetwork";
import SectionHeader from "@/components/kit/SectionHeader";

function useClock(timeZone: string) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

interface Point {
  x: number;
  y: number;
}

const allNodes: (ProofNode & { color: string; catId: string })[] = proofCategories.flatMap(
  (cat) => cat.nodes.map((n) => ({ ...n, color: cat.color, catId: cat.id }))
);

// Category colours are palette tokens; accent text on the light theme needs the darker text token.
const txt = (c: string) => (c === "var(--accent)" ? "var(--accent-text)" : c);

export default function ProofNetwork() {
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const labelRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [linePoints, setLinePoints] = useState<{ id: string; a: Point; b: Point; color: string }[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const pktTime = useClock("Asia/Karachi");
  const nyTime = useClock("America/New_York");

  const measure = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const panelRect = panel.getBoundingClientRect();
    setSize({ width: panelRect.width, height: panelRect.height });

    const lines: { id: string; a: Point; b: Point; color: string }[] = [];
    for (const cat of proofCategories) {
      const labelEl = labelRefs.current.get(cat.id);
      if (!labelEl) continue;
      const labelRect = labelEl.getBoundingClientRect();
      const a = {
        x: labelRect.left + labelRect.width / 2 - panelRect.left,
        y: labelRect.top + labelRect.height / 2 - panelRect.top,
      };
      for (const n of cat.nodes) {
        const nodeEl = nodeRefs.current.get(n.id);
        if (!nodeEl) continue;
        const nodeRect = nodeEl.getBoundingClientRect();
        const b = {
          x: nodeRect.left + nodeRect.width / 2 - panelRect.left,
          y: nodeRect.top + nodeRect.height / 2 - panelRect.top,
        };
        lines.push({ id: n.id, a, b, color: cat.color });
      }
    }
    setLinePoints(lines);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener("resize", measure);
    // re-measure once more after fonts/layout settle
    const t = setTimeout(measure, 200);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  const hoveredNode = allNodes.find((n) => n.id === hovered);

  return (
    <section className="border-t border-ink py-20 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="03"
          label="Proof"
          title="Proof, not promises."
          intro="Hover a point — every number here is a real, delivered result, not a projection."
        />

        {/* Scatter network -- tablet and up. Falls back to a simpler stacked list on
            phones, where a wide network diagram can't read well at any coordinate
            precision. */}
        <div
          ref={panelRef}
          className="relative mt-14 hidden h-[640px] w-full overflow-hidden border border-ink bg-bg sm:block"
        >
          {size.width > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" width={size.width} height={size.height}>
              {linePoints.map((l) => (
                <line
                  key={l.id}
                  x1={l.a.x}
                  y1={l.a.y}
                  x2={l.b.x}
                  y2={l.b.y}
                  stroke={hovered === l.id ? "var(--accent)" : l.color}
                  strokeDasharray={hovered === l.id ? undefined : "2 5"}
                  strokeWidth={hovered === l.id ? 2 : 1}
                />
              ))}
            </svg>
          )}

          <p className="pointer-events-none absolute top-[46%] left-1/2 w-64 -translate-x-1/2 text-center font-mono text-xs uppercase text-muted">
            hover a point — every number is delivered, not projected.
          </p>

          {proofCategories.map((cat) => (
            <span
              key={cat.id}
              ref={(el) => {
                if (el) labelRefs.current.set(cat.id, el);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
              style={{
                left: `${cat.labelX}%`,
                top: `${cat.labelY}%`,
                color: txt(cat.color),
                borderColor: cat.color,
                backgroundColor: "var(--bg)",
              }}
            >
              {cat.label}
            </span>
          ))}

          {allNodes.map((n) => (
            <div key={n.id} className="absolute" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <button
                ref={(el) => {
                  if (el) nodeRefs.current.set(n.id, el);
                }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                className="cursor-hover -translate-x-1/2 -translate-y-1/2 transition-transform"
                style={{
                  width: n.size,
                  height: n.size,
                  backgroundColor: hovered === n.id ? "var(--accent)" : n.color,
                  transform: `translate(-50%, -50%) scale(${hovered === n.id ? 1.25 : 1})`,
                }}
                aria-label={`${n.value}: ${n.label}`}
              />
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-xs font-medium whitespace-nowrap text-foreground"
                style={{ top: n.size / 2 + 6 }}
              >
                {n.value}
              </span>
            </div>
          ))}

          {hoveredNode &&
            (() => {
              const TOOLTIP_W = 224; // w-56
              const TOOLTIP_H_EST = 74; // estimated -- two short lines plus padding
              const MARGIN = 10;

              const nodeXpx = (hoveredNode.x / 100) * size.width;
              const nodeYpx = (hoveredNode.y / 100) * size.height;

              // Clamp horizontally so the box never overflows either edge, instead
              // of always centering on the node (which clips for anything near the
              // left/right edge of the panel).
              const left = Math.max(
                MARGIN,
                Math.min(nodeXpx - TOOLTIP_W / 2, size.width - TOOLTIP_W - MARGIN)
              );

              // Prefer showing above the node; flip below if there isn't room
              // (nodes near the top of the panel), so it never clips the top edge.
              const spaceAbove = nodeYpx - hoveredNode.size / 2;
              const showBelow = spaceAbove < TOOLTIP_H_EST + MARGIN;
              const top = showBelow
                ? nodeYpx + hoveredNode.size / 2 + 16
                : nodeYpx - hoveredNode.size / 2 - 16 - TOOLTIP_H_EST;

              return (
                <div
                  className="pointer-events-none absolute isolate z-30 w-56 border border-ink bg-bg p-3 text-xs before:absolute before:inset-0 before:-z-10 before:translate-x-1.5 before:translate-y-1.5 before:bg-accent"
                  style={{ left, top: Math.max(MARGIN, top) }}
                >
                  <p className="font-semibold" style={{ color: txt(hoveredNode.color) }}>
                    {hoveredNode.value}
                  </p>
                  <p className="mt-0.5 text-muted">{hoveredNode.label}</p>
                </div>
              );
            })()}

          <div className="absolute bottom-4 left-4 space-y-1 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-accent-text">PKT</span>
              {pktTime}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-text">EST</span>
              {nyTime}
            </div>
          </div>
        </div>

        {/* Mobile fallback: clean card grid, no scatter positioning */}
        <div className="mt-10 grid gap-4 sm:hidden">
          {proofCategories.map((cat) => (
            <div
              key={cat.id}
              className="border p-5"
              style={{ borderColor: cat.color }}
            >
              <p className="font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: txt(cat.color) }}>
                {cat.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.nodes.map((n) => (
                  <div
                    key={n.id}
                    className="border px-3 py-2 text-center"
                    style={{ borderColor: cat.color }}
                  >
                    <span className="text-sm font-semibold" style={{ color: txt(cat.color) }}>
                      {n.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
