import { BasePage } from './BasePage';
import { urls } from '../helper/config';

export class SignupPage extends BasePage {

    async navigateToSignup() {
        await this.page.goto(urls.signup);
    }

    async enterFirstName(firstName: string) {
        await this.page.getByLabel('First Name').fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.getByLabel('Last Name').fill(lastName);
    }

    async enterEmail(email: string) {
        await this.page.getByLabel('Email').fill(email);
    }

    async enterPassword(password: string) {
        await this.page.getByLabel('Password', { exact: true }).fill(password);
    }

    async submit() {
        await this.page.getByRole('button', { name: /Submit/i }).click();
    }

    async isLoggedOutButtonVisible() {
        await this.page.waitForSelector('button:has-text("Log out")');
    }
}