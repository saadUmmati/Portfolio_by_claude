"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";
import { useMotion } from "@/components/motion/MotionProvider";
import "@/lib/motion";
import HeroPoster from "./HeroPoster";
import { display } from "./fonts";
import StretchText from "@/components/motion/StretchText";
import AskBar from "@/components/AskBar";
import { HERO_READY_EVENT } from "@/components/Loader";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }).format(new Date()));
    f();
    const id = window.setInterval(f, 30000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "--:--"}</span>;
}

/* The hero. Everyone gets the instant SVG poster + the name. Desktop browsers that have WebGL
   and no "reduce motion" setting also get the live 3D scene, pinned while you scroll: the camera
   glides over the ridges, then a violet curtain rises into the next section. */
export default function Hero3D() {
  const { reduced } = useMotion();
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const fpsEl = useRef<HTMLParagraphElement>(null);
  const progress = useRef(0);

  const [capable, setCapable] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("hero");
    setDebug(q === "debug");
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const can = !reduced && desktop && q !== "poster" && webglAvailable();
    setCapable(can);
    if (!can) window.dispatchEvent(new Event(HERO_READY_EVENT)); // poster only: nothing to wait for
  }, [reduced]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!capable || !root.current) return;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 72px",
        end: "+=250%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progress.current = p;
          if (text.current) gsap.set(text.current, { autoAlpha: 1 - smooth(0.04, 0.3, p), y: -p * 110 });
          if (curtain.current) curtain.current.style.clipPath = `inset(${100 - 100 * smooth(0.8, 1, p)}% 0 0 0)`;
        },
      });
    },
    { scope: root, dependencies: [capable], revertOnUpdate: true }
  );

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className={`${display.className} relative h-[calc(100svh-72px)] min-h-[600px] w-full overflow-hidden bg-black text-paper`}
    >
      <HeroPoster className="absolute inset-0 h-full w-full" />

      {capable && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene
            progress={progress}
            active={inView}
            onReady={() => { setReady(true); window.dispatchEvent(new Event(HERO_READY_EVENT)); }}
            onFps={debug ? (n) => { if (fpsEl.current) fpsEl.current.textContent = `${n} fps`; } : undefined}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-4 border border-paper" />

      <div ref={text} className="absolute inset-x-6 top-[6vh] md:inset-x-12">
        <p className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase">
          <span className="inline-block h-2.5 w-2.5 bg-accent" />
          {site.availability}
          <span aria-hidden="true">/</span>
          {site.location}
          <span aria-hidden="true">/</span>
          <span><Clock /> PKT</span>
        </p>
        <h1 aria-label={site.name}>
          <span className="block font-mono text-sm tracking-[0.08em] uppercase" aria-hidden="true">Muhammad</span>
          <StretchText
            text="Saad Ahmed"
            label="Saad Ahmed"
            className="mt-2 text-[clamp(3rem,10.6vw,10.5rem)] leading-[0.88] font-black uppercase"
          />
        </h1>
        <p className="mt-5 text-lg font-medium md:text-[22px]">AI Engineer &mdash; on-device AI, LLM agents &amp; automation</p>
        <div className="mt-7 md:mt-9">
          <AskBar />
        </div>
      </div>

      <p className="absolute bottom-4 left-4 border border-paper bg-black px-4 py-2.5 font-mono text-xs tracking-[0.08em] uppercase">
        Scroll &#8595;
      </p>
      <p className="absolute right-4 bottom-4 border border-paper bg-black px-4 py-2.5 font-mono text-xs tracking-[0.08em] uppercase">
        {debug ? <span ref={fpsEl}>-- fps</span> : site.location}
      </p>

      <div ref={curtain} aria-hidden="true" className="absolute inset-0 bg-accent" style={{ clipPath: "inset(100% 0 0 0)" }} />
    </section>
  );
}
