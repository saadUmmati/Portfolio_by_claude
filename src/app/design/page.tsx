import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false, follow: false }, // internal page, keep out of search
};

/* Source of truth is src/styles/tokens.css (checked by scripts/contrast-check.mjs).
   These constants only feed the on-page contrast table -- keep them in sync. */
const THEMES = [
  { cls: "light", name: "Light", bg: "#e2e8f0", ink: "#000000", accent: "#8b5cf6", accentText: "#000000", onAccent: "#000000" },
  { cls: "dark", name: "Dark", bg: "#000000", ink: "#e2e8f0", accent: "#8b5cf6", accentText: "#8b5cf6", onAccent: "#000000" },
] as const;

function lum(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export default function DesignPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {THEMES.map((t) => {
        const rows = [
          ["Ink on background", t.ink, t.bg, 7],
          ["Accent text on background", t.accentText, t.bg, 4.5],
          ["Label on accent fill", t.onAccent, t.accent, 4.5],
          ["Accent on background (fills, icons, large text)", t.accent, t.bg, 3],
        ] as const;
        return (
          <section key={t.cls} className={`${t.cls} bg-bg text-ink flex flex-col gap-10 p-8 md:p-12`}>
            <p className="font-mono text-label uppercase">{t.name} theme</p>

            <div className="flex flex-col gap-4">
              <h1 className="text-display font-semibold">Saad.</h1>
              <h2 className="text-h1 font-semibold">AI Systems Engineer</h2>
              <h3 className="text-h2 font-medium">Shipping on-device intelligence</h3>
              <p className="text-body max-w-prose">
                Body copy sits at 17px with a 1.6 line-height. Every colour on this page is one of three values.
              </p>
              <p className="font-mono text-label uppercase">Label / mono / 12px / tracked</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-accent text-on-accent px-6 py-3 font-medium">Primary</button>
              <button className="border border-ink px-6 py-3 font-medium">Secondary</button>
              <a href="#" className="text-accent-text underline underline-offset-4">Text link</a>
              <span className="outline-accent px-3 py-2 outline-2 outline-offset-2">Focus ring</span>
            </div>

            <div className="flex gap-0 border border-ink">
              {[["bg", t.bg], ["ink", t.ink], ["accent", t.accent]].map(([n, hex]) => (
                <div key={n} className="flex-1 p-4" style={{ background: hex, color: n === "ink" ? t.bg : t.ink }}>
                  <p className="font-mono text-label uppercase">{n}</p>
                  <p className="font-mono text-label">{hex}</p>
                </div>
              ))}
            </div>

            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink font-mono text-label uppercase">
                  <th className="py-2 pr-2">Pair</th><th className="py-2 pr-2">Ratio</th><th className="py-2">Need</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, fg, bg, min]) => {
                  const r = ratio(fg, bg);
                  return (
                    <tr key={label} className="border-b border-ink">
                      <td className="py-2 pr-2">{label}</td>
                      <td className="py-2 pr-2 font-mono">{r.toFixed(2)}:1</td>
                      <td className="py-2 font-mono">{r >= min ? "PASS" : "FAIL"} ({min}:1)</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </main>
  );
}
