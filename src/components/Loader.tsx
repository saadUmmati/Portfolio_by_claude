"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

export const HERO_READY_EVENT = "saad:hero-ready";
const MIN_MS = 1900; // never flash by faster than this
const MAX_MS = 7000; // never hold the visitor longer than this

/* Opening screen: your name with animated dots and a live percentage.
   It really waits for the page: fonts, the hero scene, and the key images (decoded, in full quality),
   then lifts away like a curtain. Shown once per browser tab. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) { setGone(true); return; }
    const html = document.documentElement;
    html.classList.add("is-loading");
    const reduced = prefersReducedMotion();
    const t0 = performance.now();

    const hasHero = !!document.querySelector("section[aria-label='Introduction']");
    const done = { load: false, fonts: false, images: false, hero: !hasHero };
    const keys = Object.keys(done) as (keyof typeof done)[];

    const onLoad = () => (done.load = true);
    if (document.readyState === "complete") done.load = true; else window.addEventListener("load", onLoad, { once: true });
    document.fonts?.ready.then(() => (done.fonts = true)).catch(() => (done.fonts = true));
    const onHero = () => (done.hero = true);
    window.addEventListener(HERO_READY_EVENT, onHero, { once: true });

    // Pull in the images that matter right now, in full quality, and wait until they are decoded.
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("header img, #work img, #about img")).slice(0, 10);
    imgs.forEach((i) => { i.loading = "eager"; });
    Promise.all(imgs.map((i) => i.decode().catch(() => undefined))).then(() => (done.images = true));

    let shown = 0;
    let raf = 0;
    let leaving = false;

    const leave = () => {
      if (leaving) return;
      leaving = true;
      const el = root.current;
      const finish = () => {
        sessionStorage.setItem("loaded", "1");
        html.classList.remove("is-loading");
        html.dataset.loaded = "1";
        setGone(true);
        window.dispatchEvent(new Event("saad:loaded"));
        ScrollTrigger.refresh();
      };
      if (!el || reduced) { finish(); return; }
      gsap.timeline({ onComplete: finish })
        .to(el.querySelectorAll("[data-fade]"), { autoAlpha: 0, y: -16, duration: 0.35, ease: "power2.in", stagger: 0.04 })
        .to(el, { yPercent: -100, duration: 0.95, ease: "power3.inOut" }, "+=0.05");
    };

    const tick = () => {
      const elapsed = performance.now() - t0;
      const doneCount = keys.filter((k) => done[k]).length;
      const target = Math.min(100, (doneCount / keys.length) * 100);
      const byTime = Math.min(100, (elapsed / MIN_MS) * 100);
      const goal = doneCount === keys.length ? Math.min(100, byTime) : Math.min(target, byTime, 92);
      shown += (goal - shown) * 0.12;
      const v = Math.min(100, Math.round(shown));
      setPct(v);
      if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      const ready = doneCount === keys.length && elapsed >= MIN_MS && v >= 99;
      if (ready || elapsed >= MAX_MS) { setPct(100); leave(); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      window.removeEventListener(HERO_READY_EVENT, onHero);
      html.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <div
        id="loader"
        ref={root}
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="fixed inset-0 z-[300] flex flex-col justify-between bg-black p-5 text-paper md:p-10"
      >
        <p data-fade className="font-mono text-xs tracking-[0.08em] uppercase">
          {site.title} / {site.location}
        </p>

        <div className="relative">
          <h2 data-fade className="text-[clamp(2.6rem,12.5vw,11rem)] leading-[0.9] font-black tracking-tight uppercase" style={{ fontVariationSettings: "'wdth' 108" }}>
            {site.name.split(" ").slice(1).join(" ") || site.name}
            <span aria-hidden="true" className="loader-dots">
              <i>.</i><i>.</i><i>.</i><i>.</i>
            </span>
          </h2>
          <p data-fade className="mt-3 font-mono text-xs tracking-[0.08em] uppercase md:text-sm">{site.name.split(" ")[0]}&reg;</p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p data-fade className="font-mono text-xs tracking-[0.08em] uppercase">Loading experience</p>
          <p data-fade className="font-mono text-[clamp(2.2rem,7vw,5rem)] leading-none tabular-nums">
            {String(pct).padStart(3, "0")}<span className="text-accent-text">%</span>
          </p>
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/20">
          <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      {/* Returning visitors in the same tab never see it; no-JS visitors never get stuck behind it. */}
      <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('loaded')){var l=document.getElementById('loader');if(l)l.style.display='none'}}catch(e){}" }} />
      <noscript><style>{"#loader{display:none!important}"}</style></noscript>
    </>
  );
}
