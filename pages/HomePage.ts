import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly customerTypeLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    // Dùng locator động chọn cả 2 loại:
    this.customerTypeLabel = page.locator('li.account-type span.label, label.account-type span.label-text');
  }

  // Lấy text của customer type (SOLO, ENTERPRISE...)
  async getCustomerType(): Promise<string> {
    await this.customerTypeLabel.first().waitFor({ timeout: 10000 });
    return (await this.customerTypeLabel.first().innerText()).trim();
  }

  // So sánh với giá trị mong đợi
  async verifyCustomerType(expectedType: string): Promise<void> {
    const actualType = await this.getCustomerType();
    expect(actualType).toBe(expectedType);
  }
}