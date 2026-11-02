import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/hero.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const PALETTE = [[0, 0, 0], [226, 232, 240], [139, 92, 246]];

test.describe("desktop + WebGL", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("name + poster render instantly, 3D canvas mounts, hero pins on scroll", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Muhammad Saad Ahmed");
    await expect(page.getByRole("img", { name: /terrain of layered ridgelines/i })).toBeVisible();
    await expect(page.locator("section[aria-label='Introduction'] canvas")).toBeVisible({ timeout: 15000 });
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(800);
    expect(await page.locator(".pin-spacer").count()).toBeGreaterThan(0);
  });

  test("every pixel of the hero is palette black / slate / violet (edges aside)", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.locator("section[aria-label='Introduction'] canvas").waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    const png = PNG.sync.read(await page.locator("section[aria-label='Introduction']").screenshot());
    let exact = 0;
    const total = png.width * png.height;
    for (let i = 0; i < png.data.length; i += 4) {
      const [r, g, b] = [png.data[i], png.data[i + 1], png.data[i + 2]];
      if (PALETTE.some(([pr, pg, pb]) => Math.abs(r - pr) < 6 && Math.abs(g - pg) < 6 && Math.abs(b - pb) < 6)) exact++;
    }
    const share = exact / total;
    console.log(`exact palette pixels: ${(share * 100).toFixed(2)}%`);
    expect(share).toBeGreaterThan(0.9); // the rest is anti-aliased edges of hairlines and text
  });

  test("no WebGL: poster stays, no canvas, no pin", async ({ page }) => {
    await page.addInitScript(() => {
      const orig = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...a: any[]) {
        if (/webgl/i.test(type)) return null;
        return (orig as any).call(this, type, ...a);
      } as any;
    });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await expect(page.getByRole("img", { name: /terrain of layered ridgelines/i })).toBeVisible();
    expect(await page.locator("section[aria-label='Introduction'] canvas").count()).toBe(0);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  test("poster only: no canvas, no pin", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Muhammad Saad Ahmed");
    expect(await page.locator("section[aria-label='Introduction'] canvas").count()).toBe(0);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test("poster only on touch devices", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Muhammad Saad Ahmed");
    expect(await page.locator("section[aria-label='Introduction'] canvas").count()).toBe(0);
  });
});
