"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proofCategories, ProofNode } from "@/data/proofNetwork";

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
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-page">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Proof, not promises.</h2>
        <p className="mt-3 max-w-lg text-muted">
          Hover a point — every number here is meant to be a real, delivered result, not
          a projection.{" "}
          <span className="text-xs italic">
            (Example values for now — swap in your real metrics in{" "}
            <code className="not-italic text-accent">src/data/proofNetwork.ts</code>.)
          </span>
        </p>

        {/* Scatter network -- tablet and up. Falls back to a simpler stacked list on
            phones, where a wide network diagram can't read well at any coordinate
            precision. */}
        <div
          ref={panelRef}
          className="relative mt-10 hidden h-[640px] w-full overflow-hidden rounded-3xl border border-accent/20 bg-surface/60 sm:block"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1px 1px at 80% 20%, white, transparent), radial-gradient(1px 1px at 35% 80%, white, transparent), radial-gradient(1px 1px at 90% 60%, white, transparent), radial-gradient(1px 1px at 10% 65%, white, transparent), radial-gradient(1px 1px at 50% 45%, white, transparent), radial-gradient(1px 1px at 25% 50%, white, transparent)",
              backgroundSize: "100% 100%",
            }}
          />

          {size.width > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" width={size.width} height={size.height}>
              {linePoints.map((l) => (
                <line
                  key={l.id}
                  x1={l.a.x}
                  y1={l.a.y}
                  x2={l.b.x}
                  y2={l.b.y}
                  stroke={l.color}
                  strokeOpacity={hovered && hovered !== l.id ? 0.08 : 0.28}
                  strokeWidth={1}
                />
              ))}
            </svg>
          )}

          <p className="pointer-events-none absolute top-[46%] left-1/2 w-64 -translate-x-1/2 text-center font-mono text-xs text-muted/70">
            hover a point — every number is delivered, not projected.
          </p>

          {proofCategories.map((cat) => (
            <span
              key={cat.id}
              ref={(el) => {
                if (el) labelRefs.current.set(cat.id, el);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase"
              style={{
                left: `${cat.labelX}%`,
                top: `${cat.labelY}%`,
                color: cat.color,
                borderColor: `${cat.color}55`,
                backgroundColor: `${cat.color}14`,
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
                className="cursor-hover -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform"
                style={{
                  width: n.size,
                  height: n.size,
                  backgroundColor: n.color,
                  boxShadow: hovered === n.id ? `0 0 22px ${n.color}` : `0 0 8px ${n.color}88`,
                  transform: `translate(-50%, -50%) scale(${hovered === n.id ? 1.25 : 1})`,
                }}
                aria-label={`${n.value}: ${n.label}`}
              />
              <span
                className="pointer-events-none absolute -translate-x-1/2 text-xs font-medium whitespace-nowrap text-foreground/80"
                style={{ top: n.size / 2 + 6 }}
              >
                {n.value}
              </span>
            </div>
          ))}

          {hoveredNode && (
            <div
              className="pointer-events-none absolute z-30 w-56 -translate-x-1/2 rounded-xl border border-border bg-background/95 p-3 text-xs shadow-xl backdrop-blur"
              style={{
                left: `${hoveredNode.x}%`,
                top: `calc(${hoveredNode.y}% - ${hoveredNode.size / 2 + 16}px)`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="font-semibold" style={{ color: hoveredNode.color }}>
                {hoveredNode.value}
              </p>
              <p className="mt-0.5 text-muted">{hoveredNode.label}</p>
            </div>
          )}

          <div className="absolute bottom-4 left-4 space-y-1 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-accent">PKT</span>
              {pktTime}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-2">EST</span>
              {nyTime}
            </div>
          </div>
        </div>

        {/* Mobile fallback: clean card grid, no scatter positioning */}
        <div className="mt-10 grid gap-4 sm:hidden">
          {proofCategories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border p-5"
              style={{ borderColor: `${cat.color}33`, background: `linear-gradient(160deg, ${cat.color}0f, transparent 60%)` }}
            >
              <p className="font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: cat.color }}>
                {cat.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.nodes.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-lg border px-3 py-2 text-center"
                    style={{ borderColor: `${cat.color}40`, backgroundColor: `${cat.color}12` }}
                  >
                    <span className="text-sm font-semibold" style={{ color: cat.color }}>
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
