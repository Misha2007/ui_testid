const { test, expect } = require("@playwright/test");
test("Hotelli otsing", async ({ page }) => {
  await page.goto(
    "https://bosystem.netlify.app/search?country=Thailand&from=03-12-2025&to=03-22-2025&people=2",
  );
  await page.selectOption("select", "Thailand");
  await page.selectOption("#peopleNumber", "2");

  await page.click(".search-icon");

  await page.waitForSelector(".destination-card");

  const results = await page.locator(".destination-card").count();
  expect(results).toBeGreaterThan(0);
});
