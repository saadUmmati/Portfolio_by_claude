// palette-audit.mjs  -- Phase 0 gate. Zero dependencies. Run: node scripts/palette-audit.mjs
// Fails (exit 1) while any gradient / glow / blur / shadow / tint / off-palette colour exists in source.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const only = args.flatMap((a, i) => (a === "--only" && args[i + 1] ? [args[i + 1]] : []));
const SCAN_DIRS = only.length ? only : ["src"];   // --only src/styles --only src/app/design
const EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mjs", ".svg"]);
const SKIP = new Set(["node_modules", ".next", ".git", "sanity"]); // sanity = CMS schema, not visual
const ALLOWED_HEX = new Set(["#000", "#000000", "#e2e8f0", "#8b5cf6"]);

const TW_COLORS = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

// severity: "error" always fails the audit; "warn" is reviewed by hand (fails only with --strict)
const RULES = [
  ["error", "gradient",          /gradient/i],
  ["error", "tw-default-colour", new RegExp(`\\b(?:bg|text|border|from|via|to|ring|fill|stroke)-(?:${TW_COLORS})-\\d{2,3}\\b`)],
  ["error", "white-utility",     /\b(?:bg|text|border|ring|fill|stroke)-white\b/],
  ["warn",  "blur/glow",         /\bblur-|blur\(|backdrop-blur|backdrop-filter|backdropFilter|pulse-glow|\bglow\b/i],
  ["warn",  "shadow",            /\bshadow-|box-?shadow|boxShadow|drop-shadow|text-shadow/i],
  ["warn",  "opacity-tint",      /\b(?:bg|text|border|from|via|to|ring|fill|stroke)-[a-z0-9-]+\/\[?\d|color-mix/i],
  ["warn",  "blend-mode",        /mix-blend|blend-|background-blend/i],
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
const SEV = {};    // category -> "error" | "warn"
const add = (cat, file, line, text) => (SEV[cat] ??= (cat === "off-palette-hex" ? "error" : "warn"), hits[cat] ??= []).push({ file, line, text: text.trim().slice(0, 140) });

for (const d of SCAN_DIRS) {
  let base, st; try { base = join(ROOT, d); st = statSync(base); } catch { console.log(`  (skipping missing path: ${d})`); continue; }
  for (const file of st.isFile() ? [base] : walk(base)) {
    const rel = relative(ROOT, file);
    const raw = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
    raw.split("\n").forEach((text, i) => {
      if (text.trim().startsWith("//")) return;
      for (const [sev, cat, re] of RULES) if (re.test(text)) { SEV[cat] = sev; add(cat, rel, i + 1, text); }
      for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
        if (!ALLOWED_HEX.has(m[0].toLowerCase())) { SEV["off-palette-hex"] = "error"; add("off-palette-hex", rel, i + 1, text); }
      }
    });
  }
}

const strict = process.argv.includes("--strict");
const verbose = process.argv.includes("--verbose");
const cats = Object.keys(hits).sort();
const count = (s) => cats.filter((c) => SEV[c] === s).reduce((n, c) => n + hits[c].length, 0);
const errors = count("error"), warns = count("warn");

console.log("\nPALETTE AUDIT  (palette: #000000 #e2e8f0 #8b5cf6 | no gradients | warnings = review by hand)\n");
for (const s of ["error", "warn"]) {
  for (const c of cats.filter((c) => SEV[c] === s)) {
    console.log(`  ${s === "error" ? "ERROR" : "warn "}  ${c.padEnd(20)} ${String(hits[c].length).padStart(4)}   in ${new Set(hits[c].map((h) => h.file)).size} files`);
    if (verbose) hits[c].forEach((h) => console.log(`        ${h.file}:${h.line}  ${h.text}`));
  }
}
console.log(`\n  ERRORS: ${errors}    WARNINGS: ${warns}${strict ? "   (strict mode: warnings fail)" : ""}\n`);
if (!verbose && (errors || warns)) console.log("  (re-run with --verbose to list every line)\n");
process.exit(errors || (strict && warns) ? 1 : 0);
