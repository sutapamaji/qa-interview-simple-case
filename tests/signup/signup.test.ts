import { test, expect } from '@playwright/test';
import { signup } from '../../helper/signup';
import { SignupPage } from '../../pages/SignupPage';
import { LoginPage } from '../../pages/LoginPage';

// Describe the sign-up form test suite
test.describe('Sign Up form tests', () => {
  test('signing up to Strawberry QA Chapter Website with new account', async ({ page }) => {

    const newUser = await signup();
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);

    // Navigate to the sign-up page
    await signupPage.navigateToSignup();

    // Ensure the sign-up form is fully loaded
    await signupPage.waitForSignupPageToLoad();

    // Fill data to the mandatory fields
    await signupPage.enterFirstName(newUser.firstName);
    await signupPage.enterLastName(newUser.lastName);
    await signupPage.enterEmail(newUser.email);
    await signupPage.enterPassword(newUser.password);

    // Click the submit button to sign up
    await signupPage.submit();

    // Assert that the "Log out" button is visible, indicating a successful sign up
    const isLogoutVisible = await loginPage.isLogoutButtonVisible();
    expect(isLogoutVisible).toBeTruthy();
    console.log(`Sign up successful for the user: ${newUser.firstName} ${newUser.lastName}`);

    // Log out to verify login with the new account
    await page.click('button:has-text("Log out")');
    await loginPage.waitForLoginPageToLoad();

    // Verify login with signed up creds
    await loginPage.navigateToLogin();

    // Ensure the login form is fully loaded
    await loginPage.waitForLoginPageToLoad();

    console.log(`Logging in with newly registered user email: ${newUser.email} and password: ${newUser.password}`);
    await loginPage.enterEmail(newUser.email);
    await loginPage.enterPassword(newUser.password);
    await loginPage.login();

    await loginPage.isLogoutButtonVisible();
    console.log(`Logging in sucessful with newly registered user`);

    // Assert that the "Log out" button is visible, indicating a successful login
    const isLogoutButtonVisible = await loginPage.isLogoutButtonVisible();
    expect(isLogoutButtonVisible).toBeTruthy();

    // Log out to prepare for the next test case
    await page.click('button:has-text("Log out")');
    await loginPage.waitForLoginPageToLoad();
  });
});