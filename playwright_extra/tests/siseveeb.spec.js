require("dotenv").config();

const { test, expect } = require("@playwright/test");

const EMAIL = process.env.SISSELOGIMIS_EMAIL;
const PASSWORD = process.env.SISSELOGIMIS_PASSWORD;
const LOGIN_URL = process.env.SISSELOGIMIS_URL;
const TUNNIPLAAN_URL = process.env.TUNNIPLAAN_URL;

test("Tunniplaani test", async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="Kasutajatunnus"]', EMAIL);
  await page.fill('input[name="Parool"]', PASSWORD);
  await page.click('button[type="button"]');
  await page.waitForLoadState("load");
  const currentURL = page.url();
  console.log(currentURL);
  await page.locator("text=Menüü").waitFor();
  await page.screenshot({ path: "my_timetable.png" });
});

const teachers = [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Jane", lastName: "Smith" },
];

for (const teacher of teachers) {
  test(`Õpetaja ${teacher.firstName} ${teacher.lastName} tunniplaan`, async ({
    page,
  }) => {
    await page.goto(TUNNIPLAAN_URL);
    await page.selectOption("#opetaja", `${lastName}, ${firstName}`);

    await page.click("button#search");
    await page.waitForSelector(".teacher-timetable");
    await page.screenshot({
      path: `${teacher.firstName}_${teacher.lastName}_schedule.png`,
    });
  });
}

test("Lehe laadimise aeg", async ({ page }) => {
  const start = performance.now();
  await page.goto(DASHBOARD_URL);
  await page.waitForLoadState("load");
  const end = performance.now();
  console.log(`Leht laadis ${Math.round(end - start)}ms`);
});

test("Vale parooliga sisselogimine", async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="password"]', "wrongpassword");
  await page.click('button[type="submit"]');
  await expect(page.locator(".error-message")).toHaveText(
    "Vale kasutajanimi või parool",
  );
});
