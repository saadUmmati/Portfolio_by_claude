import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/phase7.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const skipLoader = () => sessionStorage.setItem("loaded", "1");

test.describe("loading screen", () => {
  test("shows your name, then lifts away once, and not again in the same tab", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "commit" });
    await expect(page.locator("#loader")).toBeVisible();
    await expect(page.locator("#loader")).toContainText(/Ahmed/i);
    await expect(page.locator("#loader")).toHaveCount(0, { timeout: 12000 });
    await expect(page.locator("html")).toHaveAttribute("data-loaded", "1");
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#loader")).toBeHidden();
  });
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test.beforeEach(async ({ page }) => { await page.addInitScript(skipLoader); });

  test("404 page: status, rows, your cut-out and a way home", async ({ page }) => {
    const res = await page.goto(`${BASE}/this-page-does-not-exist`);
    expect(res?.status()).toBe(404);
    await expect(page.getByText("404 NOT FOUND").first()).toBeAttached();
    await expect(page.getByRole("img", { name: /Ahmed/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });

  test("style guide: sections exist and the page is not indexed", async ({ page }) => {
    await page.goto(`${BASE}/style-guide`);
    await expect(page.getByRole("heading", { level: 1, name: "Style guide" })).toBeVisible();
    for (const id of ["colors", "typography", "buttons", "forms", "rich-text", "cards", "surfaces", "motion", "spacing"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("about: hovering a phrase swells its picture", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const phrase = page.locator("#about h2 > span").nth(1);
    await phrase.scrollIntoViewIfNeeded();
    const pic = phrase.locator("span[aria-hidden='true']");
    const before = (await pic.boundingBox())!.width;
    await phrase.hover();
    await page.waitForTimeout(900);
    expect((await pic.boundingBox())!.width).toBeGreaterThan(before * 1.8);
  });

  test("services: 4 highlighted services and a link to the full list", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const s = page.locator("#services");
    await expect(s.getByRole("link", { name: /View service/ })).toHaveCount(4);
    await expect(s.getByRole("link", { name: /All \d+ services/ })).toHaveAttribute("href", "/services");
  });

  test("services: the picture drifts as you scroll", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const pic = page.locator("#services .aspect-\\[4\\/3\\]").first();
    await pic.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const t = () => pic.evaluate((el) => getComputedStyle(el).transform);
    const a = await t();
    for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 150); await page.waitForTimeout(80); }
    await page.waitForTimeout(500);
    expect(await t()).not.toBe(a);
  });

  test("tools & integrations: the tools panel sits in the right half", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const panel = page.locator("#stack [data-track]").first().locator("xpath=ancestor::div[contains(@class,'border')][1]");
    await panel.scrollIntoViewIfNeeded();
    const box = (await panel.boundingBox())!;
    expect(box.x + box.width / 2).toBeGreaterThan(720);
  });

  test("testimonials: big names render and the row drifts by itself", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const track = page.locator("#testimonials .select-none");
    await track.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const x = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    const a = await x();
    await page.waitForTimeout(1500);
    expect(await x()).not.toBe(a);
  });

  test("images are optimised at high quality (q=90) and large enough", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const row = page.locator("#work ul a").first();
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    await page.mouse.move(700, 450);
    await page.waitForTimeout(800);
    const img = page.locator("#work div[aria-hidden='true'] img").first();
    const src = await img.evaluate((el: HTMLImageElement) => el.currentSrc);
    expect(src).toMatch(/q=90/);
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThanOrEqual(640);
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test.beforeEach(async ({ page }) => { await page.addInitScript(skipLoader); });

  for (const path of ["/", "/this-page-does-not-exist", "/style-guide"]) {
    test(`no sideways scrolling on ${path}`, async ({ page }) => {
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    });
  }

  test("services pictures show under the titles and testimonials are swipeable", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.locator("#services").scrollIntoViewIfNeeded();
    expect(await page.locator("#services img").first().isVisible()).toBe(true);
    await expect(page.locator("#testimonials .cursor-grab")).toBeAttached();
  });
});
