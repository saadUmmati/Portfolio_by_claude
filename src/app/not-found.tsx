import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "404 - Page not found",
  robots: { index: false, follow: false },
};

const ROWS = 4;
const line = "404 NOT FOUND / ".repeat(6);

// 404: giant sliding "404 NOT FOUND" rows behind a cut-out of you, with one way home.
export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-black text-paper">
      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" className="text-xl font-extrabold tracking-wide" style={{ fontVariationSettings: "'wdth' 125" }}>
          SAAD
        </Link>
        <nav aria-label="Helpful links" className="flex gap-6 font-mono text-xs tracking-[0.08em] uppercase">
          <Link href="/#work">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <div aria-hidden="true" className="absolute inset-0 z-0 flex flex-col justify-center gap-1 select-none md:gap-3">
        {Array.from({ length: ROWS }).map((_, i) => (
          <div key={i} className="overflow-hidden whitespace-nowrap">
            <div className={`flex w-max ${i % 2 ? "nf-right" : "nf-left"}`}>
              {[0, 1].map((c) => (
                <span
                  key={c}
                  className={`px-2 text-[clamp(3rem,12vw,10rem)] leading-[0.95] font-black ${
                    i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--paper)]" : "text-paper"
                  }`}
                  style={{ fontVariationSettings: "'wdth' 110" }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <Image
          src="/images/saad-cutout.webp"
          alt={`${site.name}, looking unimpressed that this page does not exist`}
          width={928}
          height={1126}
          priority
          quality={95}
          sizes="(min-width: 768px) 560px, 80vw"
          className="h-[min(74svh,760px)] w-auto object-contain"
        />
      </div>

      <div className="relative z-20 mt-auto flex justify-center pb-8 md:pb-10">
        <Link
          href="/"
          className="glass rounded-full border border-paper px-8 py-4 font-mono text-xs tracking-[0.1em] uppercase transition-colors hover:bg-accent hover:text-on-accent"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
