const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://practice.expandtesting.com/add-remove-elements");

    // wait 10 seconds before looking for element
    let button = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Add Element']")),
      10000
    );

    for (let i = 0; i < 5; i++) {
      // adding 5 elements
      console.log("Clicked");
      await button.click();
    }

    let elements = await driver.wait(
      until.elementsLocated(By.className("added-manually")),
      10000
    );

    console.log("Start removing elements");
    for (let element of elements) {
      // removing all elements
      await element.click();
    }

    console.log("All elements removed");
  } finally {
    // else quit
    console.log("Press Enter to close the browser...");
    process.stdin.once("data", async () => {
      await driver.quit();
      process.exit();
    });
  }
})();
