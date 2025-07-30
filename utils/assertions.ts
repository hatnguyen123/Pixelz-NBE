import { expect } from '@playwright/test';

export async function expectTextMatch(actual: string, expected: string) {
  expect(actual.trim().toLowerCase()).toContain(expected.toLowerCase());
}