import { BasePage } from './BasePage';
import { urls } from '../helper/config';

export class LoginPage extends BasePage {
    async navigateToLogin() {
        await this.page.goto(urls.login);
      }

    async enterEmail(email: string) {
        await this.page.getByLabel('Email').fill(email);
    }

    async enterPassword(password: string) {
        await this.page.getByLabel('Password', { exact: true }).fill(password);
    }

    async login() {
        await this.page.getByRole('button', { name: /Login/i }).click();
    }

    async isLogoutButtonVisible() {
        await this.page.waitForSelector('button:has-text("Log out")');
        return this.page.isVisible('button:has-text("Log out")');
    }

    async waitForLoginPageToLoad() {
        await this.page.waitForSelector('button:has-text("Login")');
    }
}