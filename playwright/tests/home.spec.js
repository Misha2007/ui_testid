const { test, expect } = require("@playwright/test");

test("Koduleht ja riikide navigeermine", async ({ page }) => {
  await page.goto("https://bosystem.netlify.app/");
  await page.goto("https://bosystem.netlify.app/contries");
  await page.click("text=Estonia");
  await expect(page).toHaveURL("https://bosystem.netlify.app/result/Estonia");
});
