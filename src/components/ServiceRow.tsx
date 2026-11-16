"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDesktopMotion } from "@/lib/useDesktopMotion";
import "@/lib/motion";

export type ServiceRowData = { slug: string; title: string; blurb: string; image?: string; tags: string[] };

/* One highlighted service. On desktop its picture drifts and tilts as you scroll past, and leans toward the
   mouse while you hover. On phones the picture sits under the title, still. */
export default function ServiceRow({ s, index }: { s: ServiceRowData; index: number }) {
  const desktop = useDesktopMotion();
  const row = useRef<HTMLDivElement>(null);
  const pic = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = pic.current, r = row.current;
      if (!desktop || !el || !r) return;
      gsap.fromTo(el, { yPercent: 18, rotate: index % 2 ? 3 : -3 }, {
        yPercent: -18, rotate: index % 2 ? -2 : 2, ease: "none",
        scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: true },
      });
      const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const qy = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3" });
      const move = (e: PointerEvent) => { const b = r.getBoundingClientRect(); qx(((e.clientX - b.left) / b.width - 0.5) * 60); };
      const enter = () => qy(1.05);
      const leave = () => { qx(0); qy(1); };
      r.addEventListener("pointermove", move); r.addEventListener("pointerenter", enter); r.addEventListener("pointerleave", leave);
      return () => { r.removeEventListener("pointermove", move); r.removeEventListener("pointerenter", enter); r.removeEventListener("pointerleave", leave); };
    },
    { scope: row, dependencies: [desktop], revertOnUpdate: true }
  );

  return (
    <div ref={row} className="group relative border-t border-ink">
      <div className="container-page grid items-center gap-8 py-10 md:min-h-[26rem] md:grid-cols-12 md:py-16">
        <div className="relative z-10 md:col-span-7">
          <p className="font-mono text-label uppercase">/{String(index + 1).padStart(2, "0")}</p>
          <h3 className="text-[clamp(2rem,5.2vw,4.75rem)] mt-4 leading-[1] font-black tracking-tight uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
            {s.title}
          </h3>
          <p className="text-body mt-5 max-w-xl">{s.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.tags.slice(0, 4).map((t) => (
              <li key={t} className="border border-ink px-2.5 py-1 font-mono text-[11px] uppercase">{t}</li>
            ))}
          </ul>
          <Link href={`/services/${s.slug}`} className="cursor-hover mt-8 inline-flex items-center gap-3 border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] uppercase transition-colors hover:bg-accent hover:text-on-accent">
            View service <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>

        <div className="md:col-span-5">
          <div ref={pic} className="relative aspect-[4/3] w-full overflow-hidden border border-ink bg-accent will-change-transform md:ml-auto md:max-w-[34rem]">
            {s.image && <Image src={s.image} alt={`${s.title}: example deliverable`} fill sizes="(min-width: 768px) 540px, 100vw" quality={90} className="object-cover" />}
          </div>
        </div>
      </div>
    </div>
  );
}
