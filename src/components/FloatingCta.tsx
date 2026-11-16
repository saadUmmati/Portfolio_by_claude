"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

// Floating pill, bottom centre. Hides when the contact section or footer is on screen.
export default function FloatingCta() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const els = ["#contact", "footer"].map((s) => document.querySelector(s)).filter(Boolean) as Element[];
    if (!els.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHide(seen.size > 0);
    });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`glass fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-4 rounded-full border border-ink py-2 pr-2 pl-5 whitespace-nowrap transition-all duration-300 sm:gap-8 sm:pl-7 ${
        hide ? "pointer-events-none translate-y-5 opacity-0" : ""
      }`}
    >
      <span className="hidden text-base sm:inline md:text-[17px]">Got an AI product in mind?</span>
      <Link
        href="/#contact"
        className="cursor-hover flex items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-5 font-mono text-xs tracking-[0.08em] text-on-accent uppercase"
      >
        Start a project
        <span className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image quality={90} src="/images/profile-image.jpg" alt={site.name} fill sizes="36px" className="object-cover" />
        </span>
      </Link>
    </div>
  );
}
