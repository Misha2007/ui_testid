const { Builder, By, Key, until } = require("selenium-webdriver");
const { exec } = require("child_process");
const path = require("path");

async function basicSearch() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Open DuckDuckGo
    await driver.get("https://www.duckduckgo.com");

    // Type 'WebDriver' into the search box and press Enter
    await driver
      .findElement(By.name("q"))
      .sendKeys("Selenium WebDriver", Key.ENTER);

    // Wait for the first search result to appear
    let loaded = await driver.wait(async function () {
      const items = await driver.findElements(By.css("h2 a"));
      return items.length > 2;
    }, 10000);

    let results = "No results found";

    if (loaded) {
      const items = await driver.findElements(By.css("h2 a"));
      const firstResult = await items[0].getText();
      const secondResult = await items[1].getText();
      const thirdResult = await items[2].getText();
      const combinedResults = `${firstResult}, ${secondResult}, ${thirdResult}`;
      results = combinedResults;
    }

    console.log("First three results:", results);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const outputPath = path.join(__dirname, "screenshots", "screenshot1.jpg");

    exec(`gnome-screenshot -f "${outputPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error:", error);
        return;
      }
      console.log("Screenshot saved:", outputPath);
    });

    console.log("Screenshot saved as screenshot1.jpg");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

basicSearch();
