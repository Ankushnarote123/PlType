import { Page } from "@playwright/test";
import { ElementHelper } from "../Utils/elementHelper";

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private username = '[data-test="username"]';
    private password = '[data-test="password"]';
    private loginButton = '[data-test="login-button"]';
    private errorMessage = 'h3[data-test="error"]';

    // Actions
    async goto() {
        console.log('Navigating to /');
  await this.page.goto('/');

}


    async login(user: string, pass: string) {
        await ElementHelper.isElementDisplayed(this.page, this.username);
        await this.page.fill(this.username, user);
        await ElementHelper.isElementDisplayed(this.page, this.password);
        await this.page.fill(this.password, pass);
        await ElementHelper.isElementDisplayed(this.page, this.loginButton);
        await this.page.click(this.loginButton);
    }
    async validateErrorMessage() {
        await ElementHelper.isElementDisplayed(this.page, this.errorMessage);
        return this.page.textContent(this.errorMessage);
    }
}
