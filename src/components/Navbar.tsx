"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import MenuOverlay from "@/components/MenuOverlay";
import { site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-4 z-50 px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <span aria-hidden />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="liquid-glass-light cursor-hover relative z-10 flex min-h-[44px] items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-foreground/90 transition-transform active:scale-95 hover:scale-[1.03]"
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 pointer-events-none">
              <Image
                src="/images/profile-image.jpg"
                alt={site.name}
                fill
                sizes="28px"
                className="object-cover"
                unoptimized
                priority
              />
            </span>
            menu
          </button>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <div className="liquid-glass-light hidden rounded-full sm:block">
              <ThemeToggle />
            </div>
            <Link
              href="/schedule"
              className="liquid-glass-light cursor-hover flex min-h-[44px] items-center gap-2 rounded-full py-2 pr-2 pl-3 text-sm font-medium text-foreground/90 transition-transform hover:scale-[1.03] sm:pl-4"
            >
              <span className="hidden md:inline">Schedule a Call</span>
              <span className="hidden sm:inline md:hidden">Schedule</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                <ArrowUpRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
