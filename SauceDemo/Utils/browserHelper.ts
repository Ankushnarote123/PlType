export class BrowserHelper {
    // Get the current window handle (returns the URL of the current page)
    static async getCurrentWindowHandle(page: any): Promise<string> {
        const currentUrl = page.url();
        console.log(`Current window handle (URL): ${currentUrl}`);
        return currentUrl;
    }   

     static async createNewWindow(page: any): Promise<void> {
        await page.context().newPage();
        console.log('New browser window (tab) created.');
    }

    static async switchToTab(page: any): Promise<void> {
        const context = page.context(); 
        const allPages = await context.pages();
        const newTab = allPages.find((p: any) => p.url() !== page.url());
    
        if (newTab) {
            await newTab.bringToFront();
        } else {
            console.error('No new tab found'); 
        }
    }

     static async closeTab(page: any): Promise<void> {
        await page.close();
        console.log('Tab closed');
    }
    
    static async maximizeWindow(page: any): Promise<void> {
        const viewport = { width: 1920, height: 1080 };
        await page.setViewportSize(viewport);
        console.log('Browser window maximized.');
    }

    static async takeScreenshot(page: any, path: string): Promise<void> {
        await page.screenshot({ path });
        console.log(`Screenshot saved at: ${path}`);
    }
    static async getCookies(page: any): Promise<any[]> {
        const cookies = await page.context().cookies();
        console.log('Cookies retrieved:', cookies);
        return cookies;
    }

    static async clearCookies(page: any): Promise<void> {
        await page.context().clearCookies();
        console.log('All cookies cleared.');
    }





}