import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   (then, in another terminal)  npx playwright test tests/motion.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("smooth scroll is off and content is visible immediately", async ({ page }) => {
    await page.goto(`${BASE}/design/motion`, { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    // every reveal card is fully opaque without scrolling
    const opacities = await page.getByTestId("card").evaluateAll((els) =>
      els.map((el) => getComputedStyle(el.parentElement as HTMLElement).opacity)
    );
    expect(opacities.length).toBe(9);
    for (const o of opacities) expect(o).toBe("1");
  });
});

test.describe("full motion", () => {
  test("Lenis is active and reveals trigger on scroll", async ({ page }) => {
    await page.goto(`${BASE}/design/motion`, { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
    await expect(page.locator("html")).toHaveClass(/lenis/);
    const last = page.getByTestId("card").last();
    await last.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 600);
    await expect
      .poll(() => last.evaluate((el) => getComputedStyle(el.parentElement as HTMLElement).opacity))
      .toBe("1");
  });
});

for (const path of ["/", "/design/motion", "/projects"]) {
  test(`no layout shift while scrolling ${path}`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as any[]) if (!e.hadRecentInput) (window as any).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(150);
    }
    const cls = await page.evaluate(() => (window as any).__cls as number);
    expect(cls).toBeLessThan(0.02); // stricter than Google's 0.1 "good" line
  });
}
