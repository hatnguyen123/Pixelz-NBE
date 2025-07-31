import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = '#sign-in-email';
  readonly passwordInput = '#login_password';
  readonly errorMessage = '.login-error';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'commit' });
  }

  async login(email: string, password: string, expectSuccess = false) {
    if (email !== undefined) {
      await this.page.locator(this.emailInput).fill(email);
    }
    if (password !== undefined) {
      await this.page.locator(this.passwordInput).fill(password);
    }
    if (expectSuccess) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
        this.page.locator(this.passwordInput).press('Enter'),
      ]);
    } else {
      await this.page.locator(this.passwordInput).press('Enter');
    }
  }

  async getHtml5Validation() {
    const emailValid = await this.page.$eval(this.emailInput, el => (el as HTMLInputElement).validity.valid);
    const emailMissing = await this.page.$eval(this.emailInput, el => (el as HTMLInputElement).validity.valueMissing);
    const passwordMissing = await this.page.$eval(this.passwordInput, el => (el as HTMLInputElement).validity.valueMissing);
    return { emailValid, emailMissing, passwordMissing };
  }

  async getErrorMessage() {
    const error = this.page.locator(this.errorMessage);
    if (await error.isVisible()) {
      return (await error.innerText()).trim();
    }
    return '';
  }
}