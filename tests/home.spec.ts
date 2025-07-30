// tests/home.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import homeTestData from '../data/homeData.json';

const BASE_URL = 'https://rtbnewbackend-nbe-0001-ignore-captcha-auto.pxzhunter.com/';

test.describe('Verify Customer Type on Home Page', () => {
  for (const data of homeTestData) {
    test(`[${data.caseId}] Should display correct customer type for ${data.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      await page.goto(BASE_URL);
      await loginPage.login(data.email, data.password);

      await page.waitForURL('**/Home', { timeout: 10000 });
      await homePage.verifyCustomerType(data.expectedType);
    });
  }
});