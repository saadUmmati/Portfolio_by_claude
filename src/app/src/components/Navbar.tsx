"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import MenuOverlay from "@/components/MenuOverlay";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-4 z-50 px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <span aria-hidden />

          <button
            onClick={() => setOpen(true)}
            className="liquid-glass-light cursor-hover flex items-center gap-3 rounded-full px-4 py-2 text-sm text-foreground/90 transition-transform hover:scale-[1.03]"
          >
            <span className="font-mono text-xs text-muted">[ ]</span>
            menu
          </button>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <div className="liquid-glass-light hidden rounded-full p-1 sm:block">
              <ThemeToggle />
            </div>
            <Link
              href="/schedule"
              className="liquid-glass-light cursor-hover flex items-center gap-2 rounded-full py-2 pr-2 pl-2.5 text-sm font-medium text-foreground/90 transition-transform hover:scale-[1.03] sm:pl-4"
            >
              <span className="hidden md:inline">Schedule a Call</span>
              <span className="hidden sm:inline md:hidden">Schedule</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10">
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
