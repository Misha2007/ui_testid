const { test, expect } = require("@playwright/test");

test("Kasutaja sisselogimine", async ({ page }) => {
  await page.goto("https://bosystem.netlify.app/login");

  await page.fill('input[name="email"]', "john@gmail.com");
  await page.fill('input[name="password"]', "qwerty");
  await page.click(".login_button");

  await expect(page.locator("text=My Profile")).toBeVisible();
});
