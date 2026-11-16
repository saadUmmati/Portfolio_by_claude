import { test, expect } from "@playwright/test";

// Run against a production build:  npm run build && npm run start   then   npx playwright test tests/rich.spec.ts
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  // the opening loader is tested on its own (tests/phase7.spec.ts); everywhere else it is skipped
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
});
test.use({ viewport: { width: 1440, height: 900 } });

test("floating pill shows 'Got an AI product in mind?' and hides at the contact section", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const pill = page.getByText("Got an AI product in mind?").first();
  await expect(pill).toBeVisible();
  await page.locator("#contact").evaluate((el) => el.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(800);
  const opacity = await page.locator("div.glass.fixed").first().evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeLessThan(0.1);
});

test("mega menu opens on Services and lists real services and projects", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /^Services/ }).hover();
  const mega = page.locator("#mega");
  await expect(mega).toBeVisible();
  await expect(mega.getByText(/All \d+ services/)).toBeVisible();
  await expect(mega.getByText("ClipGallery")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(mega).toHaveCount(0);
});

test("the name stretches under the mouse (letter widths change)", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const letters = page.locator("h1 .stretch-l");
  const widths = () => letters.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().width));
  const before = await widths();
  const box = (await letters.nth(2).boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
  await page.waitForTimeout(700);
  const after = await widths();
  expect(after[2]).toBeGreaterThan(before[2] + 4);
});

test("the ask bar opens the AI assistant with the question", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByLabel(/Ask .*AI assistant/).fill("What on-device projects have you built?");
  await page.keyboard.press("Enter");
  await expect(page.getByText("Ask my AI Assistant")).toBeVisible();
  await expect(page.getByText("What on-device projects have you built?").first()).toBeVisible();
});

test("closing CTA and resume button exist", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#start")).toContainText("Got an AI product in mind?");
  await expect(page.getByRole("link", { name: /Start a project/ }).first()).toHaveAttribute("href", "/#contact");
});
