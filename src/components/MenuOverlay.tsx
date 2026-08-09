"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { site } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "home" },
  { href: "/#about", label: "about me" },
  { href: "/services", label: "services" },
  { href: "/projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/blog", label: "blog" },
  { href: "/testimonials", label: "testimonials" },
  { href: "/#faq", label: "faq" },
  { href: "/schedule", label: "schedule a call" },
  { href: "/#contact", label: "contact" },
  { href: "/links", label: "get in touch" },
];

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="liquid-glass-strong animate-fade-up relative flex w-full max-w-md flex-col rounded-3xl p-6 sm:max-w-lg">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            available for work
          </span>
          <button
            onClick={onClose}
            className="cursor-hover flex items-center gap-1 hover:text-foreground"
          >
            close
            <X size={13} />
          </button>
        </div>

        <nav className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="cursor-hover w-fit rounded-lg px-1 py-1.5 text-xl font-medium text-muted transition-colors hover:text-foreground sm:text-2xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex items-center justify-between text-xs text-muted">
          <span className="font-mono">[ saad.dev ]</span>
          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover hover:text-foreground"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover hover:text-foreground"
              aria-label="GitHub"
            >
              <FaGithub size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
