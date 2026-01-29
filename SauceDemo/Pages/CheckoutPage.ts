import {test,expect, Page} from "@playwright/test";

export class CheckoutPage{

 constructor(private page:Page){

 }

 private firstName = 'input[data-test="firstName"]';
 private lastName = 'input[data-test="lastName"]';
 private postalCode = 'input[data-test="postalCode"]';
 private continueButton = 'input[data-test="continue"]';

 async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.postalCode, postalCode);
 }

 async clickContinue() {
    await this.page.click(this.continueButton);
 }  




















}