import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/resume.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test("resume page shows only the PDF, full screen, with no site navigation", async ({ page }) => {
  await page.goto(`${BASE}/resume`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("iframe")).toHaveAttribute("src", /\.pdf/);
  expect(await page.locator("nav").count()).toBe(0);
  expect(await page.locator("footer").count()).toBe(0);
  await expect(page.getByRole("link", { name: "Close" })).toBeVisible();
});

test("home page has a View Resume button that opens /resume in a new tab", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const link = page.getByRole("link", { name: "View Resume" }).first();
  await expect(link).toHaveAttribute("href", "/resume");
  await expect(link).toHaveAttribute("target", "_blank");
});

test("stats show 12K+ followers and a 4.96 rating", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const stats = page.getByLabel("Key numbers");
  await stats.scrollIntoViewIfNeeded();
  await expect(stats).toContainText("12K+", { timeout: 6000 });
  await expect(stats).toContainText("4.96", { timeout: 6000 });
});

test("experience filters no longer include Websites or ChatBots", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const group = page.getByRole("group", { name: "Filter experience" });
  await expect(group.getByRole("button", { name: "Websites" })).toHaveCount(0);
  await expect(group.getByRole("button", { name: "ChatBots" })).toHaveCount(0);
});
