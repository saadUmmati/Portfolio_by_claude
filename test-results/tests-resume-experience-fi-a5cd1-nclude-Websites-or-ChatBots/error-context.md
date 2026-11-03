# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\resume.spec.ts >> experience filters no longer include Websites or ChatBots
- Location: tests\resume.spec.ts:29:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // Run against a production build:  npm run build && npm run start   then   npx playwright test tests/resume.spec.ts
  4  | const BASE = process.env.BASE_URL ?? "http://localhost:3000";
  5  | 
  6  | test("resume page shows only the PDF, full screen, with no site navigation", async ({ page }) => {
  7  |   await page.goto(`${BASE}/resume`, { waitUntil: "domcontentloaded" });
  8  |   await expect(page.locator("iframe")).toHaveAttribute("src", /\.pdf/);
  9  |   expect(await page.locator("nav").count()).toBe(0);
  10 |   expect(await page.locator("footer").count()).toBe(0);
  11 |   await expect(page.getByRole("link", { name: "Close" })).toBeVisible();
  12 | });
  13 | 
  14 | test("home page has a View Resume button that opens /resume in a new tab", async ({ page }) => {
  15 |   await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  16 |   const link = page.getByRole("link", { name: "View Resume" }).first();
  17 |   await expect(link).toHaveAttribute("href", "/resume");
  18 |   await expect(link).toHaveAttribute("target", "_blank");
  19 | });
  20 | 
  21 | test("stats show 12K+ followers and a 4.96 rating", async ({ page }) => {
  22 |   await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  23 |   const stats = page.getByLabel("Key numbers");
  24 |   await stats.scrollIntoViewIfNeeded();
  25 |   await expect(stats).toContainText("12K+", { timeout: 6000 });
  26 |   await expect(stats).toContainText("4.96", { timeout: 6000 });
  27 | });
  28 | 
  29 | test("experience filters no longer include Websites or ChatBots", async ({ page }) => {
> 30 |   await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  31 |   const group = page.getByRole("group", { name: "Filter experience" });
  32 |   await expect(group.getByRole("button", { name: "Websites" })).toHaveCount(0);
  33 |   await expect(group.getByRole("button", { name: "ChatBots" })).toHaveCount(0);
  34 | });
  35 | 
```