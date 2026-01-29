import { test, expect } from "@playwright/test";    
import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from "../Pages/CheckoutPage";
import { ConfirmationPage } from "../Pages/ConfirmationPage"

import data from '../saucedemo.testdata.json';



const username = data.credentials.valid_username;
const password = data.credentials.valid_password;
const ivpass=data.invalid_credentials.invalid_password;
const ivuser=data.invalid_credentials.invalid_username;

/*test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
});*/


test('navigate to page and login', async ({ page }) => {
     const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password); 
    await page.waitForLoadState("domcontentloaded");
     const redirectedUrl = page.url();

     console.log("Redirected URL after login:", redirectedUrl);
     await expect.soft(redirectedUrl).toContain("/inventory.html");
});

test("products count", async ({ page }) => {
    
     const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

  const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();

    const count = await productsPage.getProductCount();
    console.log("Total products:", count);

    await productsPage.printAllProductNames();
});

test("add to cart", async ({ page }) => {
    
     const loginPage = new LoginPage(page);
     const productsPage = new ProductsPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
    await productsPage.waitForPageLoad(); 
    await productsPage.addToCart();
    const cartItemCount = await productsPage.getCartItemCount();
    await expect(cartItemCount).toBe('1');
    console.log("Cart badge shows 1 item.");
});

test('complete the purchase', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  await loginPage.login(username, password);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);
    await productsPage.waitForPageLoad(); 
    await productsPage.addToCart();
    await cartPage.clickoncartbtn();
    await cartPage.clickCheckout();
    await checkoutPage.enterCheckoutInformation("jcb", "test", "12345");
    await checkoutPage.clickContinue();
    await cartPage.clickonFinishbtn();
    await confirmationPage.getConfirmationMessage();
    await confirmationPage.validateElementsOnConfirmationPage();
});

test("validate invalid login", async ({ page }) => {
    const loginPage = new LoginPage(page);      
    await loginPage.goto();
     await loginPage.login(ivuser, ivpass);
     console.log("Attempted login with invalid credentials usind json data");
    const errorMessage = await loginPage.validateErrorMessage();
    await expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
    console.log("Error message displayed for invalid login.");
});
