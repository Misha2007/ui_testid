require("dotenv").config();

const { test, expect } = require("@playwright/test");

const EMAIL = process.env.SISSELOGIMIS_EMAIL;
const PASSWORD = process.env.SISSELOGIMIS_PASSWORD;
const LOGIN_URL = process.env.SISSELOGIMIS_URL;
const TEACHERS = process.env.TEACHERS;

test("Tunniplaani test", async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill("#Kasutajatunnus_id", EMAIL);
  await page.fill("#Parool_id", PASSWORD);
  await page.click("#Sisene_id");
  await page.waitForLoadState("load");
  const currentURL = page.url();
  console.log(currentURL);
  await page.waitForURL("https://opilane.siseveeb.voco.ee/");
  await page.getByRole("option", { name: "Õppetöö" }).first().click();
  await page.locator('div.v-list-item:has-text("Tunniplaan")').first().click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "tunniplaan.png" });
});

const teachers = JSON.parse(TEACHERS);

for (const teacher of teachers) {
  test(`Õpetaja ${teacher.firstName} ${teacher.lastName} tunniplaan`, async ({
    page,
  }) => {
    // login
    await page.goto(LOGIN_URL);
    await page.fill("#Kasutajatunnus_id", EMAIL);
    await page.fill("#Parool_id", PASSWORD);
    await page.click("#Sisene_id");
    await page.waitForLoadState("load");
    const currentURL = page.url();
    console.log(currentURL);
    await page.waitForURL("https://opilane.siseveeb.voco.ee/");
    await page.locator('[id="Vana õpilase vaade_id"]').click();
    await page.getByText("Kutseõpe").first().click();
    await page.waitForTimeout(1000);

    await page
      .locator("#opetaja.plan_filter_select.form-control.input-sm")
      .waitFor({ state: "hidden" });

    // teachers schedule
    await page.selectOption(
      "#opetaja.plan_filter_select.form-control.input-sm",
      { label: `${teacher.lastName}, ${teacher.firstName}` },
      { force: true },
    );

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${teacher.firstName}_${teacher.lastName}_schedule.png`,
    });
  });
}

test("Testimine erinevate locatoritega", async ({ page }) => {
  await page.goto(LOGIN_URL);

  const usernameInput = page.getByRole("textbox", { name: /kasutajatunnus/i });
  await expect(usernameInput).toBeVisible();

  const loginButton = page.getByRole("button", { name: "Sisene" });
  await expect(loginButton).toBeVisible();

  const passwordInput = page.getByLabel(/parool/i);
  await expect(passwordInput).toBeVisible();
});

test("Lehe laadimise aeg", async ({ page }) => {
  const start = performance.now();
  await page.goto(LOGIN_URL);
  await page.waitForLoadState("load");
  const end = performance.now();
  console.log(`Leht laadis ${Math.round(end - start)}ms`);
});

test("Vale parooliga sisselogimine", async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill("#Kasutajatunnus_id", EMAIL);
  await page.fill("#Parool_id", PASSWORD);
  await page.click("#Sisene_id");
  await page.waitForLoadState("load");
  const currentURL = page.url();
  console.log(currentURL);
  const errorMessage = page
    .locator('.error, .alert, [class*="error"], [class*="alert"]')
    .first();

  const errorByText = page
    .getByText(/vale|incorrect|vigane|parool|password/i)
    .first();
  await expect(errorMessage.or(errorByText)).toBeVisible({ timeout: 5000 });
  console.log(
    "Error message text:",
    await errorMessage.or(errorByText).textContent(),
  );
});
