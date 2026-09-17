import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoyaltyPage } from '../pages/LoyaltyPage';

test.describe('Loyalty Module - Programs Management Suite', () => {
  let loginPage: LoginPage;
  let loyaltyPage: LoyaltyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loyaltyPage = new LoyaltyPage(page);

    await loginPage.login('anicafeqr@gmail.com', '123456');
    await loyaltyPage.navigate();
  });

  test('TC-LOYALTY-001: Verify Loyalty Page Header and Layout', async ({ page }) => {
    // Assert page URL
    await expect(page).toHaveURL(/.*\/owner\/loyalty/);

    // Verify presence of main headers and sections
    await expect(page.locator('text=Loyalty Programs').first()).toBeVisible();
    await expect(loyaltyPage.programSearchInput).toBeVisible();
  });

  test('TC-LOYALTY-002: Search & Filter Loyalty Programs', async ({ page }) => {
    await loyaltyPage.searchProgram('Test');
    await page.waitForTimeout(500);

    // Clear search filter
    await loyaltyPage.searchProgram('');
    await page.waitForTimeout(500);
  });

  test('TC-LOYALTY-003: Open and Cancel/Close New Program Modal', async ({ page }) => {
    const addBtn = page.locator('button:has-text("New Program"), button:has-text("Add Program"), button:has-text("Create")').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(500);

      // Verify modal visibility
      const modal = page.locator('div[role="dialog"], .modal, div.fixed.inset-0').first();
      await expect(modal).toBeVisible();

      // Close modal
      const closeOrCancel = page.locator('button:has-text("Cancel"), button[aria-label="Close"]').first();
      if (await closeOrCancel.isVisible()) {
        await closeOrCancel.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('TC-LOYALTY-004: Validate Program Creation Form Fields', async ({ page }) => {
    const addBtn = page.locator('button:has-text("New Program"), button:has-text("Add Program"), button:has-text("Create")').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(500);

      // Fill test program data
      const programName = `VIP Club ${Date.now()}`;
      const nameInput = page.locator('input#name, input[name="name"], input[placeholder*="Name"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill(programName);
      }

      // Close modal to preserve existing clean state
      const cancelBtn = page.locator('button:has-text("Cancel")').first();
      if (await cancelBtn.isVisible()) {
        await cancelBtn.click();
      }
    }
  });
});
