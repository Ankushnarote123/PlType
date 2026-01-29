import { test, expect } from '@playwright/test';

test('navigate to page and login', async ({ page }) => {
    
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
});

test("products count", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await page.waitForLoadState("networkidle");


    const products = page.locator('div[class="inventory_item_label"]');

    const count = await products.count();
    console.log('Total products:', count);

    for (let i = 0; i < count; i++) {
        console.log(await products.nth(i).textContent());
    }
});

test("add to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");      
    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await page.waitForLoadState("networkidle");     
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    console.log("Added to cart: Sauce Labs Backpack");
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
    console.log("Cart badge shows 1 item.");

});

test("complete the purchase", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");      
    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await page.waitForLoadState("networkidle");     
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();          
    await page.locator('.shopping_cart_link').click();
    await page.locator('button[data-test="checkout"]').click();
    await page.waitForTimeout(5000); 
    await page.waitForLoadState("networkidle");
    await page.locator('[data-test="firstName"]').fill("John");
    await page.locator('[data-test="lastName"]').fill("Doe");
    await page.locator('[data-test="postalCode"]').fill("12345");

    await page.locator('input[data-test="continue"]').click();
    await page.waitForTimeout(5000);
    await page.locator('button[data-test="finish"]').click();
    await page.waitForLoadState("domcontentloaded");
    const confirmationMessage = page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    console.log("Purchase completed successfully.");
});