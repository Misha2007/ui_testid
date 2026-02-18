const { Builder, By, Key, until, Select } = require("selenium-webdriver");

class AddExercise4 {
  constructor() {
    this.name = "AddExercise4";
    this.driver = new Builder().forBrowser("chrome").build();
  }

  async checkDisplayed() {
    await Promise.all([
      this.driver.wait(async () => {
        const items = await this.driver.findElements(
          By.className("inventory_item_name")
        );
        return items.length == 6;
      }, 10000),

      this.driver.wait(async () => {
        const items = await this.driver.findElements(
          By.className("inventory_item_price")
        );
        return items.length == 6;
      }, 10000),

      this.driver.wait(async () => {
        const items = await this.driver.findElements(
          By.className("btn btn_primary btn_small btn_inventory")
        );
        return items.length == 6;
      }, 10000),
    ]);
    console.log("All items are loaded");
    return true;
  }

  async firstSubTask() {
    try {
      // get username input && write username
      let username = await this.driver.wait(
        until.elementLocated(By.id("user-name")),
        10000
      );
      await username.sendKeys("standard_user");

      // get password input && write password
      let password = await this.driver.wait(
        until.elementLocated(By.id("password")),
        10000
      );
      await password.sendKeys("secret_sauce");

      // get button && click on it
      let button = await this.driver.wait(
        until.elementLocated(By.id("login-button")),
        10000
      );
      await button.click();

      // check success
      await this.driver.wait(
        until.elementLocated(By.className("inventory_item")),
        2000
      );

      console.log("Auth is successful");

      await this.checkDisplayed();

      //   Alternative way (not used):

      //   let loaded = await this.driver.wait(async () => {
      //     const items = await this.driver.findElements(
      //       By.className("inventory_item_name")
      //     );
      //     return items.length == 6;
      //   }, 10000);

      //   let loadedPrice = await this.driver.wait(async () => {
      //     const items = await this.driver.findElements(
      //       By.className("inventory_item_price")
      //     );
      //     return items.length == 6;
      //   }, 10000);

      //   let loadedButton = await this.driver.wait(async () => {
      //     const items = await this.driver.findElements(
      //       By.className("btn btn_primary btn_small btn_inventory")
      //     );
      //     return items.length == 6;
      //   }, 10000);

      console.log("First subtask is completed");
    } catch (ex) {
      console.log("Auth is failed", ex);
    }
  }

  async secondSubTask() {
    try {
      const items = await this.driver.findElements(
        By.className("inventory_item_name")
      );
      for (let item of items) {
        item.click();
        await this.checkDisplayed();
      }

      console.log("Second subtask is completed");
    } catch (ex) {
      console.log("Cannot get items", ex);
    }
  }

  async thirdSubTask() {
    try {
      const dropdown_select = new Select(
        await this.driver.findElement(By.className("product_sort_container"))
      );

      const dropdown = await this.driver.findElement(
        By.className("product_sort_container")
      );

      console.log("Select:", dropdown_select);

      const options = await dropdown_select.getOptions();
      console.log("Options length:", options.length);

      for (let i = 0; i < options.length; i++) {
        if (i > 1) {
          await dropdown.sendKeys(await options[i].getAttribute("value"));
          await this.checkDisplayed();

          const item_names = await this.driver.findElements(
            By.className("inventory_item_price")
          );

          for (let item of item_names) {
            console.log("Item prices after sorting:", await item.getText());
          }
        } else {
          await dropdown.sendKeys(await options[i].getAttribute("value"));

          await this.checkDisplayed();

          const item_names = await this.driver.findElements(
            By.className("inventory_item_name")
          );

          for (let item of item_names) {
            console.log(
              "Item names after sorting :",
              (await options[i].getAttribute("value")) + (await item.getText())
            );
          }

          console.log("-----");
        }
      }

      console.log("Third subtask is completed");
    } catch (ex) {
      console.log("Cannot sort items", ex);
    }
  }

  async __main__() {
    await this.driver.get("https://www.saucedemo.com/");

    console.log("Press Enter to close the browser...");
    process.stdin.once("data", async () => {
      await this.driver.quit();
      process.exit();
    });

    await this.firstSubTask();
    await this.secondSubTask();
    await this.thirdSubTask();
  }
}

let addExercise4 = new AddExercise4();
addExercise4.__main__();
