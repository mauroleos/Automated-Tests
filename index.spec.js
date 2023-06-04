const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo UI Automation Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should add items to the cart and complete checkout', async () => {
    await driver.get('https://www.saucedemo.com');

// Log into the site
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.css('.btn_action')).click();


    // Sort the items
    await driver.wait(until.elementLocated(By.css('.product_sort_container')), 10000);
    await driver.findElement(By.css('.product_sort_container')).sendKeys('lohi', Key.RETURN);
    
    // Add two or more items to the shopping cart
    const itemElements = await driver.findElements(By.css('.inventory_item_name'));
    const itemNames = await Promise.all(itemElements.map((element) => element.getText()));
    const itemsToAdd = itemNames.slice(0, 2); // Add first two items
    for (const itemName of itemsToAdd) {
        const addButton = await driver.findElement(By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`));
        await addButton.click();
        await driver.sleep(1000); // Add a delay after clicking the "Add to Cart" button
      }
      

// Visit the shopping cart
await driver.findElement(By.css('.shopping_cart_link')).click();

// Add a delay to allow time for items to be added to the cart
await driver.sleep(1000);

// Assert that the items that you added are in the cart
const cartItemElements = await driver.findElements(By.xpath('//div[@class="cart_item_label"]/a'));
const cartItemNames = await Promise.all(cartItemElements.map((element) => element.getText()));
const itemFound = itemsToAdd.some((itemName) => cartItemNames.includes(itemName));
console.log('Items added to cart:', cartItemNames);
console.log('Expected items:', itemsToAdd);
assert(itemFound, `Expected items to be in the cart, but the actual items are: ${cartItemNames.join(', ')}`);


    // Remove an item and then continue shopping
    await driver.sleep(1000); // Add a delay before locating the "REMOVE" button
    const removeButton = await driver.findElement(By.css('.cart_item .btn_secondary'));
    await removeButton.click();
            await driver.navigate().back();

// Add another item
const backpackButton = await driver.findElement(By.xpath('//div[contains(text(), "Sauce Labs Backpack")]/ancestor::div[@class="inventory_item"]//button'));
await backpackButton.click();


// Checkout
await driver.findElement(By.css('.shopping_cart_link')).click();
await driver.findElement(By.css('.checkout_button')).click();

// Fill out the form
await driver.findElement(By.id('first-name')).sendKeys('Bruce');
await driver.findElement(By.id('last-name')).sendKeys('Wayne');
await driver.findElement(By.id('postal-code')).sendKeys('1');

// Add a delay to allow time for the form to be filled
await driver.sleep(1000);

// Click on the "Continue" button
await driver.findElement(By.css('.cart_button')).click();

// Add a delay to allow time for the page to navigate
await driver.sleep(1000);

// Click on the "Finish" button
await driver.findElement(By.id('finish')).click();


// Verify if checkout was successful
try {
    await driver.wait(until.elementLocated(By.css('.complete-header')), 5000);
    const isCheckoutComplete = await driver.wait(
        until.elementLocated(By.css('.complete-header')),
        10000
      ).isDisplayed();
          console.log('Is checkout complete?', isCheckoutComplete);
  } catch (error) {
    console.log('Error occurred during checkout:', error);
}
  

// Assert you are purchasing the correct items
const purchasedItemElements = await driver.findElements(By.css('.inventory_item_name'));
const purchasedItemNames = await Promise.all(purchasedItemElements.map((element) => element.getText()));
console.log('Purchased items:', purchasedItemNames);
const expectedItem = 'Sauce Labs Backpack';
const itemFound2 = purchasedItemNames.includes(expectedItem);
assert(itemFound2, `Expected '${expectedItem}' to be in the purchased items, but the purchased items are: ${purchasedItemNames.join(', ')}`);


    // Assert the total price
    const totalPrice = await driver.findElement(By.css('.summary_total_label')).getText();
    assert(totalPrice === '$29.99', 'Total price should be $29.99');

    // Finish checkout
    await driver.findElement(By.id('finish')).click();

    // Fill out the form
await driver.findElement(By.id('first-name')).sendKeys('Bruce');
await driver.findElement(By.id('last-name')).sendKeys('Wayne');
await driver.findElement(By.id('postal-code')).sendKeys('1');

// Click on the "Continue" button
await driver.findElement(By.css('.cart_button')).click();

// Add a delay to allow time for the page to navigate
await driver.sleep(1000);

// Click on the "Finish" button
await driver.findElement(By.id('finish')).click();


  }, 30000);
});

