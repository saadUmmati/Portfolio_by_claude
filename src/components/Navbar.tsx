"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import MenuOverlay from "@/components/MenuOverlay";
import { display } from "@/components/hero/fonts";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Journal" },
  { href: "/#contact", label: "Contact" },
];
const FOCUS = ["On-device AI", "LLM agents", "Automation", "Android apps"];
const COMPANY = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Journal" },
  { href: "/resume", label: "Resume", external: true },
];
const topServices = services.slice(0, 4);

export default function Navbar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => setMega(false), [pathname]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const item = "cursor-hover py-2 text-[15px] transition-colors hover:text-accent-text";

  return (
    <>
      <header className="glass sticky top-0 z-[60] border-b border-ink" onMouseLeave={() => setMega(false)}>
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8">
          <Link href="/" className={`${display.className} cursor-hover text-xl font-extrabold tracking-wide`} style={{ fontVariationSettings: "'wdth' 125" }}>
            SAAD
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            <Link href="/#work" className={item}>Work</Link>
            <div className="relative">
              <button
                aria-expanded={mega}
                aria-controls="mega"
                onMouseEnter={() => setMega(true)}
                onFocus={() => setMega(true)}
                onClick={() => setMega((m) => !m)}
                className={`${item} flex items-center gap-1 ${mega ? "text-accent-text" : ""}`}
              >
                Services <ChevronDown size={14} className={mega ? "rotate-180" : ""} />
              </button>
            </div>
            {LINKS.slice(1).map((l) => (
              <Link key={l.label} href={l.href} className={item}>{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:block"><ThemeToggle /></div>
            <Link href="/resume" target="_blank" className="cursor-hover hidden font-mono text-xs tracking-[0.08em] uppercase xl:block">
              Resume &#8599;
            </Link>
            <Link href="/#contact" className="cursor-hover hidden items-center gap-2 bg-accent px-5 py-3 font-mono text-xs tracking-[0.08em] text-on-accent uppercase sm:inline-flex">
              Start a project <ArrowUpRight size={14} />
            </Link>
            <button onClick={() => setMenu(true)} className="cursor-hover border border-ink px-4 py-2.5 font-mono text-xs tracking-[0.08em] uppercase lg:hidden">
              Menu
            </button>
          </div>
        </div>

        {mega && (
          <div id="mega" className="glass absolute inset-x-0 top-full hidden border-b border-ink lg:block" onMouseEnter={() => setMega(true)}>
            <div className="mx-auto grid max-w-[1440px] grid-cols-[repeat(4,1fr)_1.15fr]">
              <div className="border-r border-ink px-8 py-8">
                <p className="font-mono text-label uppercase">Services</p>
                <ul className="mt-4">
                  {topServices.map((s) => (
                    <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-2 text-lg font-medium hover:text-accent-text">{s.title}</Link></li>
                  ))}
                  <li><Link href="/services" className="block py-2 text-lg font-medium text-accent-text">All {services.length} services &#8594;</Link></li>
                </ul>
              </div>
              <div className="border-r border-ink px-8 py-8">
                <p className="font-mono text-label uppercase">Focus areas</p>
                <ul className="mt-4">
                  {FOCUS.map((f) => (<li key={f}><Link href="/services" className="block py-2 text-lg font-medium hover:text-accent-text">{f}</Link></li>))}
                </ul>
              </div>
              <div className="border-r border-ink px-8 py-8">
                <p className="font-mono text-label uppercase">Featured projects</p>
                <ul className="mt-4">
                  {projects.slice(0, 3).map((p) => (<li key={p.slug}><Link href={`/projects/${p.slug}`} className="block py-2 text-lg font-medium hover:text-accent-text">{p.title}</Link></li>))}
                  <li><Link href="/projects" className="block py-2 text-lg font-medium text-accent-text">All {projects.length} projects &#8594;</Link></li>
                </ul>
              </div>
              <div className="border-r border-ink px-8 py-8">
                <p className="font-mono text-label uppercase">Company</p>
                <ul className="mt-4">
                  {COMPANY.map((c) => (
                    <li key={c.label}><Link href={c.href} target={c.external ? "_blank" : undefined} className="block py-2 text-lg font-medium hover:text-accent-text">{c.label}{c.external ? " ↗" : ""}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between gap-6 bg-accent p-8 text-on-accent">
                <p className="font-mono text-label uppercase">Open to new projects</p>
                <p className={`${display.className} text-3xl leading-[1.05] font-extrabold`}>Got an AI product in mind?</p>
                <Link href="/#contact" className="self-start bg-black px-5 py-3 font-mono text-xs tracking-[0.08em] text-paper uppercase">Start a project &#8599;</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <MenuOverlay open={menu} onClose={() => setMenu(false)} />
    </>
  );
}
