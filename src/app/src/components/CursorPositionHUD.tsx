"use client";

import { useEffect, useState } from "react";

// A small dev-console-style readout of the cursor's position, normalized to -1..1
// relative to the viewport -- fixed in the bottom-left corner across the whole site.
// Hidden on touch devices (no cursor to track) and on small screens (not enough room
// without competing with content).
export default function CursorPositionHUD() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with a browser-only API (matchMedia) that isn't available during SSR
    setVisible(true);

    function onMove(e: MouseEvent) {
      setCoords({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 hidden rounded-full border border-accent/20 bg-background/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur-md lg:block">
      X {coords.x.toFixed(4)} · Y {coords.y.toFixed(4)}
    </div>
  );
}
