import Link from "next/link";
import { site } from "@/data/site";
import StretchText from "@/components/motion/StretchText";

// Big closing line before the contact form. The letters swell as the mouse passes over them.
export default function ClosingCta() {
  return (
    <section id="start" className="overflow-hidden border-t border-ink px-5 py-20 md:px-12 md:py-32">
      <p className="flex items-center gap-2.5 font-mono text-label uppercase">
        <span className="inline-block h-2.5 w-2.5 bg-accent" />
        Got an AI product in mind?
      </p>
      <h2 className="mt-6" aria-label="Let’s build.">
        <StretchText text="Let’s build." label="Let’s build." className="text-[clamp(3rem,11.5vw,11rem)] leading-[0.88] font-black uppercase" />
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/#contact" className="cursor-hover bg-accent px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-on-accent uppercase">Start a project &#8599;</Link>
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="cursor-hover border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] uppercase">LinkedIn</a>
        <a href={site.socials.github} target="_blank" rel="noreferrer" className="cursor-hover border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] uppercase">GitHub</a>
      </div>
    </section>
  );
}
