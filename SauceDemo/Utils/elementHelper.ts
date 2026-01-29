export class ElementHelper {

 static async isElementDisplayed(page: any, locator: string, timeout = 5000 ): Promise<boolean> {
    const element = page.locator(locator);
    try {
      await element.waitFor({ state: "visible", timeout });
      return true;
    } catch {
      return false; 
    }
  }
  
  static async waitForElementVisible(page: any, locator: string, timeout = 90000): Promise<void> {
    const element = await page.locator(locator);
    await element.waitFor({ state: 'visible'});
  }

  static async waitForElementClickable(page: any, locator: string): Promise<void> {
    const element = await page.locator(locator);
   await element.waitFor({ state: 'attached'});
    await element.waitFor({ state: 'visible'});
  }

  static async doubleClickElement(page: any, locator: string, timeout = 15000): Promise<void> {
     const element = page.locator(locator);
     const maxAttempts = 2;
 
     for (let attempt = 1; attempt <= maxAttempts; attempt++) {
       try {
        
         await element.waitFor({ state: 'visible', timeout });
         await element.dblclick();
         console.log(`Double-clicked element with locator: "${locator}" on attempt ${attempt}`);
         return; 
       } catch (err) {
         console.warn(`Attempt ${attempt} failed to double-click element ${locator}: ${err}`);
         if (attempt === maxAttempts) {
           throw new Error(`Failed to double-click element ${locator} after ${maxAttempts} attempts.`);
         }
         await page.waitForTimeout(1000 * attempt); 
       }
     }
   }

   static async isElementPresent(page: any, locator: string): Promise<boolean> {
    const element = await page.locator(locator);
    return await element.count() > 0;
  }

  static async isElementInvisible(page: any, locator: string): Promise<boolean> {
    const element = await page.locator(locator);
    return !(await element.isVisible());
  }

  static async dragAndDropElement(page: any, sourceLocator: string, targetLocator: string): Promise<void> {
    const source = await page.locator(sourceLocator);
    const target = await page.locator(targetLocator);
    await source.dragTo(target);
  }

  static async acceptAlert(page: any): Promise<void> {
    const alert = await page.on('dialog', async (dialog:any) => {
      if (dialog.type() === 'alert') {
        await dialog.accept();
        console.log('Alert accepted');
      }
    });
  }

  static async dismissAlert(page: any): Promise<void> {
    const alert = await page.on('dialog', async (dialog:any)=> {
      if (dialog.type() === 'alert') {
        await dialog.dismiss();
        console.log('Alert dismissed');
      }
    });

}
}

