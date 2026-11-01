// contrast-check.mjs -- Phase 1 gate. Zero dependencies. Run: node scripts/contrast-check.mjs
// Reads src/styles/tokens.css, checks both themes, exits 1 on any failure.
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/tokens.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const PALETTE = new Set(["#000000", "#e2e8f0", "#8b5cf6"]);

const block = (re) => {
  const m = css.match(re);
  if (!m) { console.error("Could not find a theme block in tokens.css"); process.exit(1); }
  return Object.fromEntries([...m[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((x) => [x[1], x[2].toLowerCase()]));
};
const themes = {
  light: block(/(?::root,\s*\.light\s*\{)([^}]*)\}/),
  dark:  block(/^\.dark\s*\{([^}]*)\}/m),
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

const CHECKS = [
  ["ink on bg (all text)",             "ink",         "bg",     7.0],
  ["accent-text on bg (small text)",   "accent-text", "bg",     4.5],
  ["on-accent on accent (buttons)",    "on-accent",   "accent", 4.5],
  ["accent on bg (fills/icons/large)", "accent",      "bg",     3.0],
];

let failed = 0;
console.log("\nCONTRAST CHECK  (tokens.css)\n");
for (const [name, t] of Object.entries(themes)) {
  for (const [k, v] of Object.entries(t)) if (!PALETTE.has(v)) { console.log(`  FAIL  ${name}: --${k} is ${v}, not in the 3-colour palette`); failed++; }
  for (const [label, fg, bg, min] of CHECKS) {
    if (!t[fg] || !t[bg]) { console.log(`  FAIL  ${name}: missing --${fg} or --${bg}`); failed++; continue; }
    const r = ratio(t[fg], t[bg]); const ok = r >= min; if (!ok) failed++;
    console.log(`  ${ok ? "pass" : "FAIL"}  ${name.padEnd(5)} ${label.padEnd(34)} ${r.toFixed(2).padStart(5)}:1  (need ${min}:1)`);
  }
}
console.log(failed ? `\n  ${failed} FAILURE(S)\n` : "\n  ALL CHECKS PASSED\n");
process.exit(failed ? 1 : 0);
