import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../data/loginData.json';

test.describe('Login multiple test cases from JSON', () => {
  for (const data of testData) {
    const title = data.expectSuccess
      ? `✅ [${data.caseId}] Đăng nhập thành công với ${data.email}`
      : `❌ [${data.caseId}] Login thất bại với ${data.email || '[email trống]'}`;

    test(title, async ({ page }) => {
      const loginPage = new LoginPage(page);
      console.log(`\n--- Running ${data.caseId} ---`);

      await loginPage.goto();
      await loginPage.login(data.email, data.password);

      if (data.expectSuccess) {
        await page.waitForURL('**/Home', { timeout: 10000 });
        await expect(page.locator('.user-profile strong')).toBeVisible();
        console.log(`[${data.caseId}] → Login success.`);
      } else {
        await page.waitForTimeout(2000);
        const errText = await loginPage.getErrorMessage();

        if (errText) {
          console.log(`[${data.caseId}] UI Error message: "${errText}"`);
          expect(errText.length).toBeGreaterThan(0);
        } else {
          const { emailValid, emailMissing, passwordMissing } = await loginPage.getHtml5Validation();
          console.log(`[${data.caseId}] Validation - emailValid: ${emailValid}, emailMissing: ${emailMissing}, passwordMissing: ${passwordMissing}`);
          expect(emailMissing || passwordMissing || !emailValid).toBeTruthy();
        }
      }
    });
  }
});