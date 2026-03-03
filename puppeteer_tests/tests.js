import puppeteer from "puppeteer";

const BASE_URL = "https://the-internet.herokuapp.com";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

/* 1. A/B Testimine */
await page.goto(`${BASE_URL}/abtest`);
const heading = await page.$eval("h3", (el) => el.textContent.trim());
console.log("A/B Test heading:", heading);

/* 2. Lisa/Eemalda Elemendid */
await page.goto(`${BASE_URL}/add_remove_elements/`);

await page.click('button[onclick="addElement()"]');
await page.click('button[onclick="addElement()"]');

let deleteButtons = await page.$$(".added-manually");
console.log("Delete buttons after adding:", deleteButtons.length);

if (deleteButtons.length !== 2) {
  console.log("Error: Expected 2 delete buttons");
}

await deleteButtons[0].click();

deleteButtons = await page.$$(".added-manually");
console.log("Delete buttons after removing one:", deleteButtons.length);

/* 3. Katkised Pildid */
await page.goto(`${BASE_URL}/broken_images`);

const brokenImagesCount = await page.$$eval(
  "img",
  (imgs) =>
    imgs.filter((img) => !img.complete || img.naturalWidth === 0).length,
);

console.log("Broken images:", brokenImagesCount);

/* 4. Checkboxes */
await page.goto(`${BASE_URL}/checkboxes`);

const checkboxes = await page.$$('input[type="checkbox"]');

for (const checkbox of checkboxes) {
  const isChecked = await (await checkbox.getProperty("checked")).jsonValue();
  if (!isChecked) {
    await checkbox.click();
  }
}

const allChecked = await page.$$eval('input[type="checkbox"]', (boxes) =>
  boxes.every((box) => box.checked),
);

console.log("All checkboxes checked:", allChecked);

/* 5. Kontekstimenüü */
await page.goto(`${BASE_URL}/context_menu`);

page.on("dialog", async (dialog) => {
  console.log("Alert message:", dialog.message());
  await dialog.accept();
});

const hotSpot = await page.$("#hot-spot");
await hotSpot.click({ button: "right" });

/* 6. Loe elemendid */
await page.goto(`${BASE_URL}/disappearing_elements`);

const menuItemsCount = await page.$$eval(
  "#content ul li",
  (items) => items.length,
);
console.log("Navigation menu items:", menuItemsCount);

/* 7. Dropdown */
await page.goto(`${BASE_URL}/dropdown`);

await page.select("#dropdown", "2");

const selectedValue = await page.$eval("#dropdown", (el) => el.value);
console.log("Selected dropdown value:", selectedValue);

await browser.close();
