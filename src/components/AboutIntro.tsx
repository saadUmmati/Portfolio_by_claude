import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

// Prefer the full-quality PNG original when one sits next to a compressed JPG.
const best = (src: string) => {
  const png = src.replace(/\.jpe?g$/i, ".png");
  return png !== src && fs.existsSync(path.join(process.cwd(), "public", png)) ? png : src;
};

const PHRASES = [
  { text: `Hey, I’m ${site.name.split(" ")[1] ?? site.name}!`, img: "/images/profile-image.jpg", alt: "Portrait" },
  { text: "AI engineer", img: best("/images/projects/clipgallery-hero.jpg"), alt: "ClipGallery on-device AI app" },
  { text: "On-device AI", img: best("/images/projects/ar-measurement-hero.jpg"), alt: "AR measurement app" },
  { text: "LLM agents", img: best("/images/gallery/agent-tool-calling-diagram.jpg"), alt: "Agent tool-calling diagram" },
  { text: "Automation", img: best("/images/gallery/customer-support-automation.jpg"), alt: "Support automation flow" },
];

/* Big statement where each phrase carries a small picture. Hover (or tap / keyboard focus) a phrase
   and its picture swells open while the line makes room. */
export default function AboutIntro() {
  return (
    <h2 className="flex flex-wrap items-center gap-x-[0.35em] gap-y-[0.2em] text-[clamp(2rem,6.4vw,6rem)] leading-[1.02] font-black tracking-tight uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
      {PHRASES.map((p) => (
        <span key={p.text} tabIndex={0} className="cursor-hover group inline-flex items-center gap-[0.3em] outline-none">
          <span className="transition-colors duration-300 group-hover:text-accent-text group-focus-visible:text-accent-text">{p.text}</span>
          <span
            aria-hidden="true"
            className="relative inline-block h-[0.82em] w-[1.1em] overflow-hidden border border-ink transition-[width,transform] duration-[600ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:w-[3.1em] group-hover:-rotate-2 group-focus:w-[3.1em] group-focus:-rotate-2 [@media(hover:none)]:w-[2.2em]"
          >
            <Image src={p.img} alt={p.alt} fill sizes="320px" quality={90} className="object-cover transition-transform duration-[600ms] group-hover:scale-110" />
          </span>
        </span>
      ))}
    </h2>
  );
}
