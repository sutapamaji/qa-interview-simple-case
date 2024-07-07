import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe('login form tests', () => {
  existingUsers.forEach((existingUser, index) => {
    test(`logging in to Strawberry QA Chapter Website with existing account ${index + 1}`, async ({ page }) => {

      const loginPage = new LoginPage(page);

      // Navigate to the login page 
      await loginPage.navigateToLogin();

      // Wait for the login page to load
      await loginPage.waitForLoginPageToLoad();

      console.log(`Logging in with email: ${existingUser.email} and password: ${existingUser.password}`);
      await loginPage.enterEmail(existingUser.email);
      await loginPage.enterPassword(existingUser.password);
      await loginPage.login();

      // Assert that the "Log out" button is visible after login
      const isLogoutVisible = await loginPage.isLogoutButtonVisible();
      expect(isLogoutVisible).toBeTruthy();
      console.log(`Loggin successful for the user: ${existingUser.firstName} ${existingUser.lastName}`);

      // Log out to prepare for the next user
      await page.click('button:has-text("Log out")');
      await loginPage.waitForLoginPageToLoad();
    });
  });
});