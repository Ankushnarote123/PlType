import { test, expect } from "@playwright/test";

 /*test.use({
    actionTimeout: 10000
  });*/


//single file upload test
test('file upload test', async({page})=>
{   
    await page.goto("http://cgi-lib.berkeley.edu/ex/fup.html");        

    const filePath = 'C:\\Users\\Lenovo\\Downloads\\Unconfirmed 477808.crdownload';

    await page.locator('input[name="upfile"]').setInputFiles(filePath);  
    
    await page.waitForTimeout(5000);

});


//multiple file upload test
test.only('multiple file upload', async({page})=>
{

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    await page.locator('#filesToUpload').setInputFiles([
        'C:\\Users\\Lenovo\\Downloads\\Unconfirmed 477808.crdownload',
        "C:\\Users\\Lenovo\\Downloads\\image (6).png",
        "C:\\Users\\Lenovo\\Downloads\\image (5).png" ]);
           
    await page.waitForTimeout(5000);
});


test('mouse hover actions', async({page})=>
{

    await page.goto("https://www.spicejet.com/");

    await page.locator('//div[contains (text(), "Add-ons")]').hover();
  
await page.getByText('Student Discount').click();
//await page.getByRole('link', { name: 'Student Discount' }).click();

//await page.getByText('SpiceLock').click()
// ;



});

