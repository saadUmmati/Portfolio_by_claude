"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED_QUERY, registerGsap } from "@/lib/motion";

type MotionCtx = { reduced: boolean; lenisRef: React.RefObject<Lenis | null> };
const Ctx = createContext<MotionCtx | null>(null);

export function useMotion(): MotionCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMotion must be used inside <MotionProvider>");
  return c;
}

function subscribe(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;

/* One smooth-scroll engine (Lenis) driven by GSAP's ticker, so ScrollTrigger and the
   scroll position never disagree. Turned off entirely when the OS asks for reduced motion. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, getReduced, () => false);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    const html = document.documentElement;
    html.dataset.motion = reduced ? "reduced" : "full";
    if (reduced) return () => { delete html.dataset.motion; };

    const lenis = new Lenis({
      autoRaf: false,          // GSAP's ticker drives it (below)
      lerp: 0.1,
      smoothWheel: true,       // touch stays native: no hijacking on phones
      anchors: true,           // #hash links glide instead of jumping
      allowNestedScroll: true, // inner scrollers (chat, code blocks) keep working
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete html.dataset.motion;
    };
  }, [reduced]);

  // New page: start at the top and re-measure every trigger.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <Ctx.Provider value={{ reduced, lenisRef }}>{children}</Ctx.Provider>;
}
