import type { Metadata } from "next";
import Link from "next/link";
import { dur, ease, dist, stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Style guide",
  description: "Colours, type, buttons, forms, cards and motion rules for this site.",
  robots: { index: false, follow: false },
};

const H = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <h2 id={id} className="mb-8 flex items-center gap-4 border-t border-ink pt-10 font-mono text-label uppercase">
    <span className="h-2.5 w-2.5 bg-accent" />
    {children}
  </h2>
);

const SWATCHES = [
  { name: "bg", note: "page background" },
  { name: "ink", note: "text, lines" },
  { name: "accent", note: "fills, large text, icons" },
  { name: "accent-text", note: "small accent text" },
  { name: "on-accent", note: "label on violet" },
] as const;

const TYPE = [
  ["Display", "text-display", "Hero name, closing line"],
  ["Heading 1", "text-h1", "Section titles"],
  ["Heading 2", "text-h2", "Card titles, statements"],
  ["Body", "text-body", "Paragraphs, 17px / 1.6"],
  ["Label", "text-label font-mono uppercase", "Metadata, buttons, nav"],
] as const;

export default function StyleGuide() {
  return (
    <main className="bg-bg text-ink">
      <header className="glass sticky top-0 z-50 border-b border-ink">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="text-xl font-extrabold" style={{ fontVariationSettings: "'wdth' 125" }}>SAAD</Link>
          <Link href="/" className="font-mono text-xs tracking-[0.08em] uppercase underline underline-offset-4">Back to home</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="font-mono text-label uppercase">Internal / not indexed</p>
        <h1 className="text-display mt-6 font-black uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>Style guide</h1>
        <p className="text-body mt-8 max-w-2xl">
          The visual rules for this site: three colours, one family with a width axis, hairline structure, frosted glass for
          floating bars, and a small motion spec. Everything below is rendered with the real classes.
        </p>

        <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-3 font-mono text-label uppercase">
          {["colors", "typography", "buttons", "forms", "rich-text", "cards", "surfaces", "motion", "spacing"].map((s) => (
            <a key={s} href={`#${s}`} className="border border-ink px-3 py-1.5 hover:bg-accent hover:text-on-accent">{s.replace("-", " ")}</a>
          ))}
        </nav>

        <section className="mt-20">
          <H id="colors">Colors</H>
          <p className="text-body mb-8 max-w-2xl">Only three hues exist: black <code>#000000</code>, slate <code>#e2e8f0</code> and violet <code>#8b5cf6</code>. Roles swap between themes.</p>
          <div className="grid gap-6 md:grid-cols-2">
            {(["light", "dark"] as const).map((t) => (
              <div key={t} className={`${t} border border-ink bg-bg text-ink`}>
                <p className="border-b border-ink px-5 py-3 font-mono text-label uppercase">{t} theme</p>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                  {SWATCHES.map((s) => (
                    <div key={s.name} className="border-r border-b border-ink">
                      <div className={`h-20 border-b border-ink ${s.name === "bg" ? "bg-bg" : s.name === "ink" ? "bg-ink" : s.name === "accent" ? "bg-accent" : s.name === "accent-text" ? "bg-accent-text" : "bg-on-accent"}`} />
                      <p className="px-3 pt-2 font-mono text-[11px] uppercase">{s.name}</p>
                      <p className="px-3 pb-3 text-xs">{s.note}</p>
                    </div>
                  ))}
                  <div className="glass border-r border-b border-ink">
                    <div className="h-20 border-b border-ink" />
                    <p className="px-3 pt-2 font-mono text-[11px] uppercase">glass</p>
                    <p className="px-3 pb-3 text-xs">frosted bars</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-label uppercase">Contrast: ink on bg 17.03:1 / violet on black 4.96:1 / black on violet 4.96:1 / violet on slate 3.43:1 (large text and icons only)</p>
        </section>

        <section className="mt-20">
          <H id="typography">Typography</H>
          <p className="text-body mb-10 max-w-2xl">Archivo (variable: weight 100-900, width 62-125) for everything, JetBrains Mono for labels. Headlines are short; paragraphs stay in sentence case.</p>
          <div className="divide-y divide-ink border-y border-ink">
            {TYPE.map(([name, cls, use]) => (
              <div key={name} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
                <div>
                  <p className="font-mono text-label uppercase">{name}</p>
                  <p className="font-mono text-[11px] uppercase">{use}</p>
                </div>
                <p className={`${cls} ${name === "Display" ? "font-black uppercase" : name === "Label" ? "" : "font-semibold"}`}>
                  {name === "Display" ? "Saad Ahmed" : name === "Body" ? "On-device AI, LLM agents and automation, shipped end to end." : name === "Label" ? "Available for new projects" : "Things I’ve built"}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-label uppercase">Width axis (wdth 62 to 125)</p>
              {[62, 80, 100, 125].map((w) => (
                <p key={w} className="text-4xl font-extrabold uppercase" style={{ fontVariationSettings: `'wdth' ${w}` }}>
                  Saad {w}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-3 font-mono text-label uppercase">Weights</p>
              {[300, 400, 600, 800, 900].map((w) => (
                <p key={w} className="text-3xl" style={{ fontWeight: w }}>Weight {w}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <H id="buttons">Buttons</H>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-accent px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-on-accent uppercase">Primary</span>
            <span className="border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] uppercase">Secondary</span>
            <span className="font-mono text-label uppercase underline underline-offset-4">Text link</span>
            <span className="glass inline-flex items-center gap-6 rounded-full border border-ink py-2 pr-2 pl-6">
              Got an AI product in mind?
              <span className="rounded-full bg-accent px-5 py-3 font-mono text-xs tracking-[0.08em] text-on-accent uppercase">Start a project</span>
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-mono text-xs text-on-accent">DRAG</span>
          </div>
          <p className="mt-4 font-mono text-label uppercase">Hover: primary stays violet, secondary and rows invert to violet, links underline.</p>
        </section>

        <section className="mt-20">
          <H id="forms">Forms</H>
          <form className="grid max-w-3xl gap-5 md:grid-cols-2" aria-label="Form samples">
            <label className="block"><span className="mb-2 block font-mono text-label uppercase">Your name</span><input className="w-full border border-ink bg-transparent px-4 py-3 outline-none focus:border-accent" placeholder="Jane Doe" /></label>
            <label className="block"><span className="mb-2 block font-mono text-label uppercase">Email</span><input type="email" className="w-full border border-ink bg-transparent px-4 py-3 outline-none focus:border-accent" placeholder="jane@company.com" /></label>
            <label className="block md:col-span-2"><span className="mb-2 block font-mono text-label uppercase">Project type</span>
              <select className="w-full border border-ink bg-bg px-4 py-3 outline-none focus:border-accent"><option>New app</option><option>Consulting</option><option>Hiring</option></select></label>
            <label className="block md:col-span-2"><span className="mb-2 block font-mono text-label uppercase">Message</span><textarea rows={4} className="w-full border border-ink bg-transparent px-4 py-3 outline-none focus:border-accent" placeholder="Tell me what you are building" /></label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="h-4 w-4 accent-[#8b5cf6]" /> Send me a copy</label>
          </form>
        </section>

        <section className="mt-20">
          <H id="rich-text">Rich text</H>
          <div className="max-w-3xl [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1">
            <h1 className="text-h1 font-bold">Heading 1</h1>
            <h2 className="text-h2 mt-6 font-bold">Heading 2</h2>
            <h3 className="mt-6 text-[clamp(1.5rem,3vw,2.25rem)] font-bold">Heading 3</h3>
            <h4 className="mt-5 text-2xl font-bold">Heading 4</h4>
            <h5 className="mt-5 text-xl font-bold">Heading 5</h5>
            <h6 className="mt-5 font-mono text-label uppercase">Heading 6</h6>
            <p className="text-body mt-6">I build on-device AI, LLM-powered agents, and automation systems. This is a paragraph with <a href="#rich-text" className="text-accent-text underline underline-offset-4">a text link</a>, <strong>bold text</strong>, <em>emphasis</em>, H<sub>2</sub>O and E = mc<sup>2</sup>.</p>
            <blockquote className="mt-6 border-l-[3px] border-accent pl-5 text-xl italic">Block quote: the result matters more than the model.</blockquote>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div><p className="mb-2 font-mono text-label uppercase">Ordered list</p><ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol></div>
              <div><p className="mb-2 font-mono text-label uppercase">Unordered list</p><ul><li>Item A</li><li>Item B</li><li>Item C</li></ul></div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <H id="cards">Cards and rows</H>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-ink p-6"><p className="font-mono text-label uppercase">Stat</p><p className="mt-4 text-5xl leading-none font-extrabold" style={{ fontVariationSettings: "'wdth' 112" }}>12K+</p><p className="mt-3 font-mono text-label uppercase">LinkedIn followers</p></div>
            <div className="bg-accent p-6 text-on-accent"><p className="font-mono text-label uppercase">Stat (highlight)</p><p className="mt-4 text-5xl leading-none font-extrabold" style={{ fontVariationSettings: "'wdth' 112" }}>4.96</p><p className="mt-3 font-mono text-label uppercase">Average rating</p></div>
            <div className="border border-ink p-6"><p className="font-mono text-label uppercase">Tags</p><ul className="mt-4 flex flex-wrap gap-2">{["ONNX", "Kotlin", "CLIP"].map((t) => (<li key={t} className="border border-ink px-2.5 py-1 font-mono text-[11px] uppercase">{t}</li>))}</ul></div>
          </div>
          <div className="mt-6 border-y border-ink">
            <div className="flex items-center justify-between px-6 py-7"><span className="text-3xl font-bold" style={{ fontVariationSettings: "'wdth' 108" }}>Project row</span><span>→</span></div>
            <div className="flex items-center justify-between bg-accent px-6 py-7 text-on-accent"><span className="text-3xl font-bold" style={{ fontVariationSettings: "'wdth' 108" }}>Project row (hover)</span><span>→</span></div>
          </div>
        </section>

        <section className="mt-20">
          <H id="surfaces">Surfaces</H>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-ink p-6"><p className="font-mono text-label uppercase">Solid + hairline</p><p className="text-body mt-3">Default panel: transparent, 1px ink border.</p></div>
            <div className="glass border border-ink p-6"><p className="font-mono text-label uppercase">Glass</p><p className="text-body mt-3">Navbar, pill and ask bar: tinted and blurred so text stays readable over the 3D scene.</p></div>
            <div className="border border-ink p-6"><p className="font-mono text-label uppercase">Film grain</p><p className="text-body mt-3">A faint noise layer sits over the whole page. Flat colour only.</p></div>
          </div>
        </section>

        <section className="mt-20">
          <H id="motion">Motion</H>
          <div className="grid gap-6 md:grid-cols-4">
            {[["Easings", Object.entries(ease)], ["Durations (s)", Object.entries(dur)], ["Distances (px)", Object.entries(dist)], ["Stagger (s)", Object.entries(stagger)]].map(([title, rows]) => (
              <div key={title as string} className="border border-ink p-5">
                <p className="font-mono text-label uppercase">{title as string}</p>
                <ul className="mt-4 space-y-2 font-mono text-xs">
                  {(rows as [string, string | number][]).map(([k, v]) => (<li key={k} className="flex justify-between gap-3"><span>{k}</span><span>{v}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-body mt-6 max-w-2xl">With “reduce motion” on, smooth scroll, pinning, the 3D scene and marquees switch off and content simply appears.</p>
        </section>

        <section className="mt-20">
          <H id="spacing">Spacing and layout</H>
          <div className="space-y-3">
            {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((n) => (
              <div key={n} className="flex items-center gap-4"><span className="w-12 font-mono text-[11px]">{n}px</span><span className="h-3 bg-accent" style={{ width: n * 3 }} /></div>
            ))}
          </div>
          <p className="text-body mt-6 max-w-2xl">Content width 1440px with 20px (phone) / 40px (desktop) side padding. Sections are separated by a single hairline.</p>
        </section>
      </div>
    </main>
  );
}
