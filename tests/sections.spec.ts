import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/sections.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  // the opening loader is tested on its own (tests/phase7.spec.ts); everywhere else it is skipped
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("home page HTML stays light (tech marquee no longer repeats 10x)", async ({ request }) => {
    const body = await (await request.get(`${BASE}/`)).text();
    console.log(`home html: ${Math.round(body.length / 1024)} KB, svg elements: ${body.split("<svg").length - 1}`);
    expect(body.length).toBeLessThan(1_000_000); // was ~1.96 MB
  });

  test("work list: hovering a row shows a preview that follows the cursor", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const row = page.locator("#work ul a").first();
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    await page.mouse.move(600, 400);
    await page.waitForTimeout(500);
    const card = page.locator("#work div[aria-hidden='true']").first();
    expect(Number(await card.evaluate((el) => getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
    await expect(row).toHaveAttribute("href", /\/projects\//);
  });

  test("stats count up and show their final values", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.getByLabel("Key numbers").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Key numbers").getByText("10+", { exact: true })).toBeVisible({ timeout: 6000 });
  });

  test("tech marquee animates", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const track = page.locator("[data-track]").first();
    // a moving element is never "stable", so scroll with the DOM instead of Playwright's helper
    await track.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const a = await track.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(800);
    const b = await track.evaluate((el) => getComputedStyle(el).transform);
    expect(a).not.toBe(b);
  });

  test("scroll smoothness through the sections (prints p50/p95 frame time)", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      (window as any).__ft = [];
      let last = performance.now();
      const loop = (t: number) => { (window as any).__ft.push(t - last); last = t; requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    });
    for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(60); }
    const ft = (await page.evaluate(() => (window as any).__ft as number[])).slice(2).sort((a, b) => a - b);
    const p50 = ft[Math.floor(ft.length * 0.5)], p95 = ft[Math.floor(ft.length * 0.95)];
    console.log(`frame time p50 ${p50.toFixed(1)} ms, p95 ${p95.toFixed(1)} ms (16.7 ms = 60 fps)`);
    if (process.env.FRAME_GATE) expect(p95).toBeLessThan(33);
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("work rows show their image inline and the page never scrolls sideways", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    expect(await page.locator("#work ul a img").count()).toBeGreaterThan(0);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  test("marquee is a static grid and nothing is pinned", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    expect(await page.locator("[data-track] [data-dup]").first().isVisible()).toBe(false);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
  });
});
