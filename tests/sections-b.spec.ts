import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/sections-b.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.use({ viewport: { width: 1440, height: 900 } });

test("experience: the violet rail draws as you scroll, and filters work", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const section = page.locator("#experience");
  await section.evaluate((el) => el.scrollIntoView({ block: "start" }));
  const fill = section.locator("div[aria-hidden='true'] > div").first();
  const scale = () => fill.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).d);
  const before = await scale();
  for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(100); }
  await page.waitForTimeout(500);
  const after = await scale();
  console.log(`rail scaleY: ${before.toFixed(2)} -> ${after.toFixed(2)}`);
  expect(after).toBeGreaterThan(before);

  const buttons = page.getByRole("group", { name: "Filter experience" }).getByRole("button");
  const all = await section.locator("h3").count();
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
  expect(await section.locator("h3").count()).toBeLessThanOrEqual(all);
});

test("proof network: hovering a point shows a solid tooltip", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const node = page.getByRole("button", { name: /^90%/ });
  await node.scrollIntoViewIfNeeded();
  await node.hover();
  await expect(page.getByText("Manual work eliminated on a client's ops pipeline").first()).toBeVisible();
});

test("blog cards render and the testimonial row can be dragged", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  expect(await page.locator("a[href^='/blog/']").count()).toBeGreaterThanOrEqual(3);
  const wrap = page.locator("#testimonials .cursor-grab");
  await wrap.evaluate((el) => el.scrollIntoView({ block: "center" }));
  const box = (await wrap.boundingBox())!;
  const x = () => page.locator("#testimonials .select-none").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  const before = await x();
  await page.mouse.move(box.x + box.width * 0.7, box.y + 150);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + 150, { steps: 14 });
  await page.mouse.up();
  await page.waitForTimeout(600);
  expect(await x()).toBeLessThan(before - 50);
});
