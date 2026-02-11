import { test, expect } from '@playwright/test';
import { ElementHelper } from '../Utils/elementHelper';


test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('iphone 15');
  await page.getByRole('button', { name: 'iphone 15', exact: true }).click();
  await page.getByRole('link', { name: 'Apply New filter to narrow' }).click();
  await page.locator('.a-link-normal').first().click();
  await page.getByRole('link', { name: 'Add to List' }).click();
});




test('Amazon search test', async ({ page }) => {
  await page.goto('https://www.amazon.com');
//dismiss popup if appears
   const dismissButton = page.getByRole('button', { name: 'Dismiss' });

  if (await dismissButton.isVisible({ timeout: 3000 })) {
    await dismissButton.click();
  }
// Search for iPhone 14
  await page.locator('input[id="twotabsearchtextbox"]').click();
  await page.locator('input[id="twotabsearchtextbox"]').fill('iphone 14');
  
  //get the list of products
  await page.waitForTimeout(5000); 
  const prodLocator = page.locator('//div[@class="left-pane-results-container"]//div[@class="s-suggestion-container"]');
  const prodCount = await prodLocator.count();
  console.log('Total products found:', prodCount);

  
// Log all product titles from the first page
  for (let i = 0; i < prodCount; i++) {
    const name = await prodLocator.nth(i).textContent();
    console.log(`${i + 1}: ${name}`);
  }
  
//select 1st product from the list
 await prodLocator.nth(1).click();
 console.log("Clicked on the first product");



});





//login button
////a[@class="ol1oIH" and text()='Login'] 

//checkbox
//input[@type='checkbox']//following-sibling::div[@class='buvtMR' and text()='IAIR']


test('E2E ecommerce flow', async ({ page }) => {
  // Open site
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Validate navigation
  await expect(page).toHaveURL(/inventory/);

  // Click first product
  await page.locator('.inventory_item_name').first().click();

  // Validate product page
  //await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
const addbtn= page.getByRole('button', { name: 'Add to cart' });

await expect(addbtn).toBeVisible();

await expect(page).toHaveTitle



});
