const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");
const { setTimeout } = require("node:timers/promises");

let browser;
let page;

setDefaultTimeout(60000);

Before(async function () {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given("kasutaja avab Rimi kodulehe", async () => {
  await page.goto("https://www.rimi.ee", { waitUntil: "networkidle2" });
});

Then("koduleht peaks laadima edukalt", async () => {
  const title = await page.title();
  expect(title).to.not.be.empty;
});

When("kasutaja otsib toodet {string}", async (product) => {
  await page.type("input[class='header-search__input']", product);
  await page.keyboard.press("Enter");
  await setTimeout(2000);
});

Then("otsingutulemused peaksid sisaldama toodet", async () => {
  const results = await page.$$(".search-results__item");
  expect(results.length).to.be.greaterThan(0);
});

When("kasutaja avab kategooria {string}", async (category) => {
  if (category === "Valmistoit") {
    await page.goto(
      "https://www.rimi.ee/epood/ee/parimad-pakkumised?currentPage=1&pageSize=40&query=%3Arelevance%3AassortmentStatus%3AinAssortment%3AinStockFlag%3Atrue%3AfirstLevelCategory%3AValmistoit%257E7",
      { waitUntil: "networkidle2" },
    );
  }
});

Then("kategooria leht peaks avanema", async () => {
  await page.waitForSelector(".product-grid__item");

  const products = await page.$$(`.product-grid__item`);
  if (products.length === 0) {
    throw new Error("Tooteid ei leitud");
  }
});
