import { test, expect } from "@playwright/test";

// The automated gradient gate: scans the COMPUTED styles of every element on every page, in both themes.
// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/styles.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ROUTES = ["/", "/projects", "/services", "/blog", "/testimonials", "/schedule", "/chat", "/links"];

test.use({ viewport: { width: 1440, height: 900 } });

for (const theme of ["dark", "light"] as const) {
  for (const route of ROUTES) {
    test(`no gradients on ${route} (${theme})`, async ({ page }) => {
      await page.addInitScript((t) => {
        try { localStorage.setItem("theme", t); } catch {}
        document.documentElement.classList.toggle("dark", t === "dark");
      }, theme);
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);

      const offenders = await page.evaluate(() => {
        const bad: string[] = [];
        for (const el of Array.from(document.querySelectorAll("*"))) {
          const cs = getComputedStyle(el);
          for (const prop of ["backgroundImage", "maskImage", "webkitMaskImage", "borderImageSource", "listStyleImage"] as const) {
            const v = (cs as any)[prop] as string;
            if (v && v.includes("gradient")) bad.push(`${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).slice(0, 60)} -> ${prop}`);
          }
        }
        // SVG <linearGradient>/<radialGradient> elements are gradients too
        document.querySelectorAll("linearGradient, radialGradient").forEach(() => bad.push("svg gradient element"));
        return bad;
      });
      if (offenders.length) console.log(offenders.slice(0, 8).join("\n"));
      expect(offenders).toEqual([]);
    });
  }
}
