import { test, expect } from "@playwright/test"; 

test('navigate to page and login', async ({ page }) => {
    
  await page.goto("https://www.orangehrm.com/en/30-day-free-trial");


  
//using getbyrole
 await page.locator('input[placeholder="Pick a username for your OrangeHRM trial."]').fill("britisghj");
 console.log("Username filled");

   await page.getByRole('textbox', { name: "Full Name"}).fill('Gir');
    console.log("Full name filled");

 await page.locator('input[placeholder="Business Email*"]').fill("gshssj@gmail.com");
    console.log("Email filled");
 await page.locator('#Form_getForm_Contact_Holder input').fill("000000003888");
    console.log("Phone number filled");

//dropdown selection
 //await page.locator('select[name="Country"]').selectOption('India');
   
 const countryDropdown = page.locator('select[name="Country"]');
 await countryDropdown.selectOption({ label: 'Austria' });
 
 
 console.log("Country selected" + await countryDropdown.inputValue());

 //print all options in the dropdown
 const options = await page.locator('#Form_getForm_Country > option').allTextContents();
 //const count = await options.count();
// const allTextContents = await options.allTextContents();
 //console.log("Country options:", allTextContents, "Count:", count);


 //printing all country values using for loop
   for(const opt of options)
    {
        console.log(opt);
    }

});

//================================================================================================================

//pages handling in orangehrm
test('handle multiple pages', async ({ page }) => {
    await page.goto("https://www.orangehrm.com/en/30-day-free-trial");

   // await page.getByRole('link', { name: 'Privacy Policy' }).first().click();

    const [newPage] = await Promise.all([ 
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Privacy Policy' }).first().click()
    ]);

    await expect(newPage).toHaveURL('https://www.orangehrm.com/policies/orangehrm-privacy-policy');
    await expect(newPage.getByRole('heading', { name: 'OrangeHRM Privacy Policy' })).toBeVisible();

    const headingText = await newPage.getByRole('heading', {name: "OrangeHRM Privacy Policy"});
    await expect(headingText).toHaveText("OrangeHRM Privacy Policy");

    console.log("newPage title is: " + await headingText.textContent());

    // Close the new page
    await newPage.close();

    // Back to the original page
    await page.bringToFront();
    console.log("Original page title is: " + await page.title());

});


//================================================================================================================


//waitForNavigation example in herokuapp
test('Handle navigation after login', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  // Fill login form
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');

  // Click login and wait for SAME-TAB navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);

  // Verify successful navigation
  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('h2')).toHaveText('Secure Area');
});

//================================================================================================================
//popup alert, prompt handling 
test.only('handle popup and print title', async ({ page }) => {
    await page.goto('https://demo.guru99.com/test/delete_customer.php');

    //handle the js popup
    page.on('dialog' , async dialog =>{
        console.log('dialog message: '+ dialog.message());
       
        await dialog.accept();
        console.log("popup accepted"); 
    })
    // Click button that triggers alert
    await page.getByRole('button', { name: 'Submit' }).click();
 // taking ss of page after accepting popup
     await page.screenshot({path: 'popup.png'});
    await page.waitForTimeout(3000);

    });

//================================================================================================================

//handling model popup alert
test('Handle modal dialog', async ({ page }) => {
 
    await page.goto('https://demoqa.com/modal-dialogs');

  await page.waitForLoadState('load');
  // Open modal
  await page.locator('#showSmallModal').click();

  //Verify modal is visible
  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();

  // 3️⃣ Read modal text
  const text = await modal.textContent();
  console.log('Modal text:', text);

  await page.screenshot({path: 'model.png'});
  // 4️⃣ Close modal
  await page.click('#closeSmallModal');

  // 5️⃣ Verify modal closed
  await expect(modal).toBeHidden();
});

//================================================================================================================
   
//handling js alert in the-internet website
test('Handle JS Alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Listen for alert
  page.on('dialog', async dialog => {
    console.log('Alert text:', dialog.message());
    await dialog.accept(); // click OK
  });

  // Click button that triggers alert
  await page.click('text=Click for JS Alert');

  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

 //================================================================================================================ 
  

  test('Flipkart search test', async ({ page }) => {
  
  
 await page.goto("https://www.flipkart.com/");

   await page.getByRole('textbox', {name:"Search for Products, Brands and More"}).click();
   await page.waitForTimeout(3000); 
    
 
    await page.getByRole('textbox', {name:"Search for Products, Brands and More"}).fill('iphone 15');

  await page.waitForTimeout(3000);
    
  const products = page.locator('ul li');

    const count = await products.count();
    console.log('Total products:', count);


    for (let i = 0; i < count; i++) {
       // console.log(await products.nth(i).textContent());
     await products.nth(i).click();
     break;

    }   

    await page.waitForLoadState('domcontentloaded');

  // 7️⃣ Get and print title
  const title = await page.title();
  console.log('Product Page Title:', title);

  // Optional assertion
  await expect(page).toHaveURL(/search.*iphone/i);

});


//================================================================================================================
