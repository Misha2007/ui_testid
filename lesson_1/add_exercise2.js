const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://www.saucedemo.com/");

    // get username input && write username
    let username = await driver.wait(
      until.elementLocated(By.id("user-name")),
      10000
    );
    await username.sendKeys("standard_user");

    // get password input && write password
    let password = await driver.wait(
      until.elementLocated(By.id("password")),
      10000
    );
    await password.sendKeys("secret_sauce");

    // get button && click on it
    let button = await driver.wait(
      until.elementLocated(By.id("login-button")),
      10000
    );
    await button.click();

    // check success
    await driver.wait(
      until.elementLocated(By.className("inventory_item")),
      2000
    );

    console.log("Auth is successful");

    let loaded = await driver.wait(async function () {
      const items = await driver.findElements(
        By.className("inventory_item_name")
      );
      return items.length > 2;
    }, 10000);

    if (!loaded) {
      throw new Error("Items are not loaded");
    }

    for (let item of await driver.findElements(
      By.className("inventory_item")
    )) {
      console.log(await item.getText());
    }
  } catch (ex) {
    console.log("Auth is failed", ex);
  } finally {
    // Wait for user input in Node.js to close the browser
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    await new Promise((resolve) =>
      readline.question("Press Enter to close the browser...", () => {
        readline.close();
        resolve();
      })
    );
    await driver.quit();
  }
})();
