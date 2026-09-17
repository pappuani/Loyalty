import { Page, Locator, expect } from '@playwright/test';

export interface LoyaltyProgramData {
  name: string;
  description?: string;
  branch?: string;
  isDefault?: boolean;
  isActive?: boolean;
  minSpend?: number;
  earnPoints?: number;
  earnType?: 'Flat Points' | 'Percentage of Spend';
  redemptionRate?: number; // Spend equivalent per point
  minRedemptionPoints?: number;
  maxRedeemType?: 'Unlimited' | 'Percentage' | 'Fixed';
  maxRedeemValue?: number;
}

export class LoyaltyPage {
  readonly page: Page;

  // Header & Navigation
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;

  // Loyalty Programs Section
  readonly programsSectionTitle: Locator;
  readonly programSearchInput: Locator;
  readonly newProgramButton: Locator;
  readonly programsTable: Locator;
  readonly programRows: Locator;

  // Program Modal
  readonly programModal: Locator;
  readonly modalTitle: Locator;
  readonly programNameInput: Locator;
  readonly programDescInput: Locator;
  readonly programBranchSelect: Locator;
  readonly defaultProgramToggle: Locator;
  readonly activeProgramToggle: Locator;
  readonly minSpendInput: Locator;
  readonly earnPointsInput: Locator;
  readonly earnTypeSelect: Locator;
  readonly redemptionRateInput: Locator;
  readonly minRedeemPointsInput: Locator;
  readonly maxRedeemTypeSelect: Locator;
  readonly maxRedeemValueInput: Locator;
  readonly rewardRateDisplay: Locator;
  readonly saveProgramButton: Locator;
  readonly cancelProgramButton: Locator;
  readonly modalCloseButton: Locator;

  // Customer Loyalty & Transactions Section
  readonly customerSearchInput: Locator;
  readonly customerDropdownOptions: Locator;
  readonly customerNameBadge: Locator;
  readonly customerPhoneBadge: Locator;

  // Balance Cards
  readonly balanceCard: Locator;
  readonly lifetimeEarnedCard: Locator;
  readonly lifetimeRedeemedCard: Locator;

  // Transaction Filters & Table
  readonly allFilterTab: Locator;
  readonly earnedFilterTab: Locator;
  readonly redeemedFilterTab: Locator;
  readonly reversalFilterTab: Locator;
  readonly transactionsTable: Locator;
  readonly transactionRows: Locator;
  readonly emptyTransactionsState: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.pageTitle = page.locator('h1, h2').filter({ hasText: /Loyalty/i }).first();
    this.pageSubtitle = page.locator('text=Configure loyalty points, earn/redemption rules');

    // Programs Section
    this.programsSectionTitle = page.locator('text=Loyalty Programs').first();
    this.programSearchInput = page.locator('input[placeholder*="Search programs"], input[placeholder*="Search"]').first();
    this.newProgramButton = page.locator('button:has-text("New Program"), button:has-text("Add Program"), button:has-text("Create")').first();
    this.programsTable = page.locator('table').first();
    this.programRows = page.locator('table tbody tr');

    // Modal
    this.programModal = page.locator('div[role="dialog"], .modal, div.fixed.inset-0').first();
    this.modalTitle = page.locator('h2, h3, div').filter({ hasText: /(Create|Edit|New) Loyalty Program/i }).first();
    this.programNameInput = page.locator('input#name, input[name="name"], input[placeholder*="Program Name"]').first();
    this.programDescInput = page.locator('textarea#description, textarea[name="description"], textarea[placeholder*="Description"]').first();
    this.programBranchSelect = page.locator('select#branch, select[name="branch"], select').first();
    this.defaultProgramToggle = page.locator('input[type="checkbox"]#isDefault, input[type="checkbox"][name="isDefault"]').first();
    this.activeProgramToggle = page.locator('input[type="checkbox"]#isActive, input[type="checkbox"][name="isActive"]').first();
    
    this.minSpendInput = page.locator('input#minSpend, input[name="minSpend"], input[type="number"]').nth(0);
    this.earnPointsInput = page.locator('input#earnPoints, input[name="earnPoints"], input[type="number"]').nth(1);
    this.earnTypeSelect = page.locator('select#earnType, select[name="earnType"]').first();
    this.redemptionRateInput = page.locator('input#redemptionRate, input[name="redemptionRate"]').first();
    this.minRedeemPointsInput = page.locator('input#minRedeemPoints, input[name="minRedeemPoints"]').first();
    this.maxRedeemTypeSelect = page.locator('select#maxRedeemType, select[name="maxRedeemType"]').first();
    this.maxRedeemValueInput = page.locator('input#maxRedeemValue, input[name="maxRedeemValue"]').first();
    this.rewardRateDisplay = page.locator('text=Reward Rate:').first();

    this.saveProgramButton = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Create Program")').first();
    this.cancelProgramButton = page.locator('button:has-text("Cancel")').first();
    this.modalCloseButton = page.locator('button[aria-label="Close"], button:has-text("✕")').first();

    // Customer & Transactions
    this.customerSearchInput = page.locator('input[placeholder*="Search customer by name or phone"]').first();
    this.customerDropdownOptions = page.locator('div.absolute, ul.dropdown, div[role="listbox"]').locator('div, li');
    this.customerNameBadge = page.locator('[data-testid="customer-name"], .customer-name').first();
    this.customerPhoneBadge = page.locator('[data-testid="customer-phone"], .customer-phone').first();

    // Summary Cards
    this.balanceCard = page.locator('div:has-text("Available Balance"), div:has-text("Current Balance")').first();
    this.lifetimeEarnedCard = page.locator('div:has-text("Lifetime Earned")').first();
    this.lifetimeRedeemedCard = page.locator('div:has-text("Lifetime Redeemed")').first();

    // Transaction Filters
    this.allFilterTab = page.locator('button:has-text("All"), div:has-text("All")').first();
    this.earnedFilterTab = page.locator('button:has-text("Earned"), div:has-text("Earned")').first();
    this.redeemedFilterTab = page.locator('button:has-text("Redeemed"), div:has-text("Redeemed")').first();
    this.reversalFilterTab = page.locator('button:has-text("Reversal"), div:has-text("Reversal")').first();

    this.transactionsTable = page.locator('table').nth(1);
    this.transactionRows = page.locator('table').nth(1).locator('tbody tr');
    this.emptyTransactionsState = page.locator('text=No transactions found, text=No loyalty transactions');
  }

  async navigate() {
    await this.page.goto('/owner/loyalty');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async openNewProgramModal() {
    await this.newProgramButton.click();
    await this.page.waitForTimeout(500);
  }

  async fillProgramForm(data: LoyaltyProgramData) {
    if (data.name) {
      await this.programNameInput.fill(data.name);
    }
    if (data.description && await this.programDescInput.isVisible()) {
      await this.programDescInput.fill(data.description);
    }
    if (data.minSpend !== undefined && await this.minSpendInput.isVisible()) {
      await this.minSpendInput.fill(data.minSpend.toString());
    }
    if (data.earnPoints !== undefined && await this.earnPointsInput.isVisible()) {
      await this.earnPointsInput.fill(data.earnPoints.toString());
    }
  }

  async saveProgram() {
    await this.saveProgramButton.click();
    await this.page.waitForTimeout(1000);
  }

  async closeModal() {
    if (await this.cancelProgramButton.isVisible()) {
      await this.cancelProgramButton.click();
    } else if (await this.modalCloseButton.isVisible()) {
      await this.modalCloseButton.click();
    }
    await this.page.waitForTimeout(500);
  }

  async searchProgram(query: string) {
    await this.programSearchInput.fill(query);
    await this.page.waitForTimeout(500);
  }

  async searchCustomer(query: string) {
    await this.customerSearchInput.fill(query);
    await this.page.waitForTimeout(500);
  }

  async filterTransactions(type: 'All' | 'Earned' | 'Redeemed' | 'Reversal') {
    const tab = this.page.locator(`button:has-text("${type}"), [role="tab"]:has-text("${type}")`).first();
    await tab.click();
    await this.page.waitForTimeout(500);
  }
}
