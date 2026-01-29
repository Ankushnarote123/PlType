import {test, expect, Page} from "@playwright/test";
export class ConfirmationPage{

    constructor(private page:Page){      
    }

    private confirmationMessage = '.complete-header';   
    async getConfirmationMessage() {
        return this.page.locator(this.confirmationMessage).innerText();
    }
    
    async validateElementsOnConfirmationPage() {
        const confirmationMsg = await this.getConfirmationMessage();
        expect(confirmationMsg).toBe("Thank you for your order!");
    }   
}
    