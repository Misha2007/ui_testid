const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");

async function basicSearch() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://www.demoblaze.com/");

    await driver
      .findElement(By.xpath("/html/body/div[5]/div/div[1]/div/a[3]"))
      .click();

    let loaded = await driver.wait(async function () {
      const items = await driver.findElements(By.css("div.row div.col-lg-4"));
      return items.length > 0;
    }, 10000);
    driver.manage().window().fullscreen();

    if (loaded) {
      const items = await driver.findElements(By.css("div.row div.col-lg-4"));

      const texts = await Promise.all(items.map((el) => el.getText()));

      console.log(texts); // array of strings
    } else {
      console.log("No results found");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(
        path.join(__dirname, "screenshots", "screenshot2.jpg"),
        data,
        "base64"
      );
    });

    console.log("Screenshot saved as screenshot2.jpg");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

basicSearch();
