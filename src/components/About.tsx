import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import SectionHeader from "@/components/kit/SectionHeader";
import ScrubText from "@/components/kit/ScrubText";
import Reveal from "@/components/Reveal";

// How the portrait is treated: "mono" (greyscale), "tritone" (only the 3 palette colours), "original".
const PORTRAIT: "mono" | "tritone" | "original" = "original";

export default function About() {
  const [intro, focus] = site.about.body.split("\n\n");
  return (
    <section id="about" className="scroll-mt-24 border-t border-ink py-20 md:py-32">
      <div className="container-page">
        <SectionHeader index="02" label="About" title="The person behind the systems" />

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="relative mx-auto aspect-[928/1126] w-full max-w-sm md:mx-0">
                <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 bg-accent" />
                <div className="relative h-full overflow-hidden border border-ink bg-bg">
                  <Image
                    src="/images/profile-photo.jpg"
                    alt={`${site.name}, ${site.title}`}
                    fill
                    sizes="(min-width: 768px) 360px, 90vw"
                    quality={85}
                    className={`object-cover ${PORTRAIT === "mono" ? "grayscale" : ""}`}
                    style={PORTRAIT === "tritone" ? { filter: "url(#tritone)" } : undefined}
                  />
                  <p className="absolute bottom-0 left-0 border-t border-r border-ink bg-bg px-4 py-2 font-mono text-label uppercase">
                    {site.title}
                  </p>
                </div>
              </div>
              {PORTRAIT === "tritone" && (
                <svg width="0" height="0" aria-hidden="true" className="absolute">
                  <filter id="tritone" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
                    <feComponentTransfer>
                      <feFuncR type="discrete" tableValues="0 0.545 0.886" />
                      <feFuncG type="discrete" tableValues="0 0.361 0.91" />
                      <feFuncB type="discrete" tableValues="0 0.965 0.941" />
                    </feComponentTransfer>
                  </filter>
                </svg>
              )}
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="font-mono text-label uppercase">{site.about.heading}</p>
            <ScrubText className="mt-8 text-[clamp(1.4rem,2.5vw,2.3rem)] leading-[1.22] font-medium tracking-tight">
              {focus}
            </ScrubText>
            <Reveal>
              <p className="text-body mt-10 max-w-2xl">{intro}</p>
            </Reveal>

            <ul className="mt-14 grid border-t border-ink sm:grid-cols-2 [&>li]:border-b [&>li]:border-ink">
              {site.about.specialties.map((s, i) => (
                <li key={s} className="flex gap-4 py-4 sm:pr-6">
                  <span className="font-mono text-label pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/services" className="cursor-hover bg-accent px-6 py-3 text-sm font-medium text-on-accent">
                View Services
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-hover border border-ink px-6 py-3 text-sm font-medium"
              >
                Hire Now
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cursor-hover border border-ink px-6 py-3 text-sm font-medium"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
