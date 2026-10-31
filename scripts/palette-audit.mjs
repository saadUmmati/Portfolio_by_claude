// palette-audit.mjs  -- Phase 0 gate. Zero dependencies. Run: node scripts/palette-audit.mjs
// Fails (exit 1) while any gradient / glow / blur / shadow / tint / off-palette colour exists in source.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src"];                       // add "app", "components" if your layout differs
const EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mjs", ".svg"]);
const SKIP = new Set(["node_modules", ".next", ".git", "sanity"]); // sanity = CMS schema, not visual
const ALLOWED_HEX = new Set(["#000", "#000000", "#e2e8f0", "#8b5cf6"]);

const TW_COLORS = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

const RULES = [
  ["gradient",     /gradient/i],
  ["blur/glow",    /\bblur-|blur\(|backdrop-blur|backdrop-filter|backdropFilter|pulse-glow|\bglow\b/i],
  ["shadow",       /\bshadow-|box-?shadow|boxShadow|drop-shadow|text-shadow/i],
  ["opacity-tint", /\b(?:bg|text|border|from|via|to|ring|fill|stroke)-[a-z0-9-]+\/\[?\d|color-mix/i],
  ["blend-mode",   /mix-blend|blend-|background-blend/i],
  ["tw-default-colour", new RegExp(`\\b(?:bg|text|border|from|via|to|ring|fill|stroke)-(?:${TW_COLORS})-\\d{2,3}\\b`)],
  ["white/black-utility", /\b(?:bg|text|border)-(?:white|black)\b/],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(p))) yield p;
  }
}

const hits = {};   // category -> [{file,line,text}]
const add = (cat, file, line, text) => (hits[cat] ??= []).push({ file, line, text: text.trim().slice(0, 140) });

for (const d of SCAN_DIRS) {
  let base; try { base = join(ROOT, d); statSync(base); } catch { continue; }
  for (const file of walk(base)) {
    const rel = relative(ROOT, file);
    readFileSync(file, "utf8").split("\n").forEach((text, i) => {
      for (const [cat, re] of RULES) if (re.test(text)) add(cat, rel, i + 1, text);
      for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
        if (!ALLOWED_HEX.has(m[0].toLowerCase())) add("off-palette-hex", rel, i + 1, text);
      }
    });
  }
}

const cats = Object.keys(hits).sort();
const total = cats.reduce((n, c) => n + hits[c].length, 0);
const verbose = process.argv.includes("--verbose");

console.log("\nPALETTE AUDIT  (allowed: #000000 #e2e8f0 #8b5cf6, no gradient/glow/blur/shadow/tint)\n");
for (const c of cats) {
  console.log(`  ${c.padEnd(22)} ${String(hits[c].length).padStart(4)}   in ${new Set(hits[c].map(h => h.file)).size} files`);
  if (verbose) hits[c].forEach(h => console.log(`      ${h.file}:${h.line}  ${h.text}`));
}
console.log(`\n  TOTAL VIOLATIONS: ${total}\n`);
if (!verbose && total) console.log("  (re-run with --verbose to list every line)\n");
process.exit(total ? 1 : 0);
