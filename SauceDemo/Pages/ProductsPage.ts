import { Page } from "@playwright/test";

export class ProductsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locator
    private products = 'div.inventory_item_label';
    private cartBadge = '.shopping_cart_badge';
    private addToCartButton = 'button[data-test="add-to-cart-sauce-labs-backpack"]';

    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async getProductCount(): Promise<number> {
        return await this.page.locator(this.products).count();
    }

    async printAllProductNames() {
        const items = this.page.locator(this.products);
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            console.log(await items.nth(i).textContent());
        }
    }

    async addToCart() {
        await this.page.locator(this.addToCartButton).click();
        console.log("Added to cart: Sauce Labs Backpack");
    }

    async getCartItemCount(): Promise<string> {
        return await this.page.locator(this.cartBadge).textContent() || '0';
    }
}
