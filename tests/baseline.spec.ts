import { test } from "@playwright/test";
const routes = ["/", "/services", "/projects", "/blog", "/testimonials", "/schedule", "/chat", "/links"];
for (const r of routes) {
  test(`baseline ${r}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("https://saadai.vercel.app" + r, { waitUntil: "networkidle" });
    await page.screenshot({ path: `docs/baseline/${r === "/" ? "home" : r.slice(1)}.png`, fullPage: true });
  });
}