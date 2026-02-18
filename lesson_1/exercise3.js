const { Builder, By, Key, until } = require("selenium-webdriver");

async function basicSearch() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://www.w3schools.com/html/html_forms.asp");

    await driver
      .findElement(By.name("firstname"))
      .sendKeys("John", Key.TAB, "Doe", Key.ENTER);

    console.log("Vorm on esitatud.");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

basicSearch();
