import { Page } from "@playwright/test";



export class CartPage {
    constructor(private page: Page) {}

    private checkoutButton = 'button[data-test="checkout"]';
    private cartBtn = '.shopping_cart_link';
    private finishBtn = 'button[data-test="finish"]';
    

    async clickoncartbtn() {
        await this.page.locator(this.cartBtn).click();
    }

     async clickCheckout() {
        await this.page.click(this.checkoutButton);
        await this.page.waitForLoadState("networkidle");
    }

    async clickonFinishbtn() {
        await this.page.locator(this.finishBtn).click();
    }
}

    
    