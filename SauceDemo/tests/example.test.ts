import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});



test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('iphone');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  
  //clicking on searched product and it is showing results on same page
  await page.getByRole('link', { name: 'iphone 16', exact: true }).click();
  await page.locator('div:nth-child(2) > .i5kg2N > .BMOCJ3 > .ybaCDx').first().click();
  await page.locator('label').filter({ hasText: /^oneme$/ }).click();
 
  //navigating to new page/tab
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'oneme F17 MAX (Silver, 16 GB' }).click();
  const page1 = await page1Promise;
  await page1.locator('._1psv1zeb9._1psv1ze0._7dzyg20 > div > .css-175oi2r > svg').click();
  await page1.getByRole('link', { name: 'Cart 1 Cart' }).click();
  await page1.getByRole('button', { name: 'Add Item' }).click();
  
});