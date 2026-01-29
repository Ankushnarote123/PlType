import { test, expect } from "@playwright/test"; 

test('navigate to page and login', async ({ page }) => {
    
    await page.goto("https://www.flipkart.com/");

    await page.locator('input[class="lNPl8b"]').click(); 
    await page.locator('input[class="lNPl8b"]').fill("redmi note 10 pro");
  await page.waitForTimeout(3000);
    const products = page.locator('div[class="_4rR01T"]');

    const count = await products.count();
    console.log('Total products:', count);
    await products.first().click();


    for (let i = 0; i < count; i++) {
        console.log(await products.nth(i).textContent());
        await page.waitForTimeout(3000);

    }   

    //await page.locator('[data-test="password"]').fill("secret_sauce");
    //await page.locator('[data-test="login-button"]').click();
});