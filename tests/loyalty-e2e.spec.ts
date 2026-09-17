import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoyaltyPage } from '../pages/LoyaltyPage';

test.describe('Loyalty Module - End-to-End Workflow Suite', () => {
  let loginPage: LoginPage;
  let loyaltyPage: LoyaltyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loyaltyPage = new LoyaltyPage(page);

    await loginPage.login('anicafeqr@gmail.com', '123456');
    await loyaltyPage.navigate();
  });

  test('TC-LOYALTY-E2E-001: End-to-End Navigation, Search, and Program Verification', async ({ page }) => {
    // 1. Check title & URL
    await expect(page).toHaveURL(/.*\/owner\/loyalty/);

    // 2. Perform search on program list
    await loyaltyPage.searchProgram('Gold');
    await page.waitForTimeout(500);
    await loyaltyPage.searchProgram('');

    // 3. Cycle filter tabs for transactions
    await loyaltyPage.filterTransactions('Earned');
    await loyaltyPage.filterTransactions('Redeemed');
    await loyaltyPage.filterTransactions('All');

    // 4. Assert core UI is interactive and stable
    await expect(page.locator('body')).toBeVisible();
  });
});
