# Loyalty Module Test Automation

Automated test suite covering the **Loyalty Module** (`/owner/loyalty`) of the Cafe QR Admin portal using **Playwright** and **TypeScript** following the **Page Object Model (POM)** architecture.

---

## 📁 Project Structure

```
Loyalty-module-automation/
├── pages/
│   ├── LoginPage.ts            # Authentication & session handling
│   └── LoyaltyPage.ts          # Loyalty programs & transactions POM
├── tests/
│   ├── loyalty-programs.spec.ts     # Program creation, modal, search tests
│   ├── loyalty-transactions.spec.ts # Customer search, filters, balance tests
│   └── loyalty-e2e.spec.ts          # End-to-end user journeys
├── playwright.config.ts        # Browser, timeouts & reporter configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Test scripts & project metadata
```

---

## 🚀 Running the Tests

### Execute All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Specific Test Suites
```bash
# Loyalty Programs Suite
npm run test:programs

# Customer Loyalty & Transactions Suite
npm run test:transactions

# End-to-End Suite
npm run test:e2e
```

### View Interactive HTML Test Report
```bash
npm run report
```

---

## 🧪 Test Coverage

| Test Case ID | Suite | Description |
|---|---|---|
| **TC-LOYALTY-001** | Programs | Verify Loyalty page URL, header, navigation, and layout |
| **TC-LOYALTY-002** | Programs | Search and filter loyalty programs in real-time |
| **TC-LOYALTY-003** | Programs | Open, interact with, and dismiss New Program modal |
| **TC-LOYALTY-004** | Programs | Validate program creation form fields and controls |
| **TC-LOYALTY-005** | Transactions | Customer search and dropdown autocomplete behavior |
| **TC-LOYALTY-006** | Transactions | Filter transactions across tabs (All, Earned, Redeemed, Reversal) |
| **TC-LOYALTY-007** | Transactions | Validate customer selection view and history container |
| **TC-LOYALTY-E2E-001** | E2E | Full navigation, search, program and transaction workflow |
