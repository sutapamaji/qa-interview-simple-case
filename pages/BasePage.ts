import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async waitForSignupPageToLoad() {
        await this.page.waitForSelector('text=Become a member');
    }
}