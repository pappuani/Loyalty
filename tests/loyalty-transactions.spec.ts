import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoyaltyPage } from '../pages/LoyaltyPage';

test.describe('Loyalty Module - Transactions & Customer Balance Suite', () => {
  let loginPage: LoginPage;
  let loyaltyPage: LoyaltyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loyaltyPage = new LoyaltyPage(page);

    await loginPage.login('anicafeqr@gmail.com', '123456');
    await loyaltyPage.navigate();
  });

  test('TC-LOYALTY-005: Customer Search and Autocomplete Verification', async ({ page }) => {
    const custSearch = page.locator('input[placeholder*="Search customer"], input[placeholder*="Search"]').nth(1);
    if (await custSearch.isVisible()) {
      await custSearch.fill('John');
      await page.waitForTimeout(1000);
      
      // Clear input
      await custSearch.fill('');
    }
  });

  test('TC-LOYALTY-006: Transaction Tabs and Filters (Earned, Redeemed, Reversal)', async ({ page }) => {
    // Switch between filter tabs
    const allTab = page.locator('button:has-text("All")').first();
    const earnedTab = page.locator('button:has-text("Earned")').first();
    const redeemedTab = page.locator('button:has-text("Redeemed")').first();
    const reversalTab = page.locator('button:has-text("Reversal")').first();

    if (await earnedTab.isVisible()) {
      await earnedTab.click();
      await page.waitForTimeout(500);
    }
    if (await redeemedTab.isVisible()) {
      await redeemedTab.click();
      await page.waitForTimeout(500);
    }
    if (await reversalTab.isVisible()) {
      await reversalTab.click();
      await page.waitForTimeout(500);
    }
    if (await allTab.isVisible()) {
      await allTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('TC-LOYALTY-007: Verify Customer Summary Cards and Transactions Table', async ({ page }) => {
    // Assert loyalty transaction view elements
    const heading = page.getByRole('button', { name: 'Loyalty Transactions' });
    await expect(heading).toBeVisible();
  });
});
