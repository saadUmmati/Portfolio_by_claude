import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/sections.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("home page HTML stays light (tech marquee no longer repeats 10x)", async ({ request }) => {
    const body = await (await request.get(`${BASE}/`)).text();
    console.log(`home html: ${Math.round(body.length / 1024)} KB, svg elements: ${body.split("<svg").length - 1}`);
    expect(body.length).toBeLessThan(1_000_000); // was ~1.96 MB
  });

  test("work gallery pins and slides sideways with scroll", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.locator("#work").scrollIntoViewIfNeeded();
    for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(120); }
    await page.waitForTimeout(600);
    const x = await page.getByTestId("work-track").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    console.log(`work track translateX: ${Math.round(x)}px`);
    expect(x).toBeLessThan(-100);
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

  test("work is a swipeable row, nothing pins, page never scrolls sideways", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const track = page.getByTestId("work-track");
    expect(await track.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  test("marquee is a static grid and the work row is not pinned", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    expect(await page.locator("[data-track] [data-dup]").first().isVisible()).toBe(false);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
  });
});
