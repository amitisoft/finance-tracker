# Regression Test Scenarios (Positive First, Then Negative)

## 1) Objective
Validate that all key product flows work after any code change.

## 2) Test Order
1. Execute all **Positive** scenarios first.
2. Execute all **Negative** scenarios next.
3. Mark each case `Pass/Fail` with evidence (API response or UI screenshot).

## 3) Test Environment
- Backend: `http://localhost:5213`
- Frontend: `http://localhost:5173`
- Test user: create a fresh user for clean run

## 4) Positive Scenarios (Run First)

### A. Auth
- P-AUTH-01: User can register with valid first name, last name, email, password.
- P-AUTH-02: User can log in with valid credentials.
- P-AUTH-03: Protected routes load after login.
- P-AUTH-04: Refresh token flow works when access token expires.
- P-AUTH-05: User can log out and is redirected to login page.

### B. Dashboard
- P-DASH-01: Dashboard summary API returns 200 with valid token.
- P-DASH-02: Dashboard shows total balance, income, expense, savings, goals, recurring count.
- P-DASH-03: New user with no data still loads dashboard (zero values, no crash).

### C. Accounts
- P-ACC-01: Create account with valid name/type/currency/balance.
- P-ACC-02: Created account appears in account list.
- P-ACC-03: Multiple accounts can be created.

### D. Categories / Settings
- P-CAT-01: Category list loads for logged-in user.
- P-CAT-02: Create category from settings page.
- P-CAT-03: Update category details.
- P-CAT-04: Delete category (if not protected/default).

### E. Transactions
- P-TXN-01: Create expense transaction from transactions page.
- P-TXN-02: Create quick transaction from topbar modal.
- P-TXN-03: Transaction list updates after create.
- P-TXN-04: Search filter returns matching transactions.
- P-TXN-05: Dashboard values update after transaction create.

### F. Budgets
- P-BUD-01: Create monthly budget.
- P-BUD-02: Budget list loads by month/year.
- P-BUD-03: Utilization and alert level display correctly.
- P-BUD-04: Update budget amount/category.

### G. Goals
- P-GOAL-01: Create goal with valid target and current amount.
- P-GOAL-02: Goal card/progress renders.
- P-GOAL-03: Contribute amount updates progress.
- P-GOAL-04: Withdraw amount updates progress.

### H. Recurring
- P-REC-01: Create recurring item with valid account/category/frequency/amount/date.
- P-REC-02: Recurring list shows newly created item.
- P-REC-03: Due recurring count reflects on dashboard.

### I. Reports
- P-REP-01: Category spend report loads for date range.
- P-REP-02: Income vs expense report loads.
- P-REP-03: Savings progress report loads.

### J. UI / Navigation
- P-UI-01: Sidebar navigation works for all menu items.
- P-UI-02: Sidebar footer stays inside sidebar (no overflow/spill).
- P-UI-03: Responsive layout works at mobile/tablet widths.
- P-UI-04: No blocking JS errors in browser console.

## 5) Negative Scenarios (Run After Positive)

### A. Auth Validation / Security
- N-AUTH-01: Register with existing email -> proper error message.
- N-AUTH-02: Register with weak password -> validation error.
- N-AUTH-03: Login with wrong password -> invalid credentials.
- N-AUTH-04: Login with unknown email -> invalid credentials.
- N-AUTH-05: Call protected API without token -> 401.
- N-AUTH-06: Call protected API with malformed/expired token -> 401.

### B. Accounts
- N-ACC-01: Create account with missing required fields -> validation error.
- N-ACC-02: Create account with invalid balance (negative if disallowed) -> validation error.

### C. Transactions
- N-TXN-01: Create transaction with missing accountId -> validation error.
- N-TXN-02: Create transaction with amount <= 0 -> validation error.
- N-TXN-03: Transfer with same source/destination account -> validation error.
- N-TXN-04: Expense with insufficient balance -> business error.

### D. Budgets
- N-BUD-01: Create budget with month outside 1-12 -> validation error.
- N-BUD-02: Create budget with amount <= 0 -> validation error.
- N-BUD-03: Create duplicate budget for same month/year/category -> validation error.

### E. Goals
- N-GOAL-01: Create goal with invalid amount values -> validation error.
- N-GOAL-02: Withdraw more than available/allowed -> business error.

### F. Recurring
- N-REC-01: Create recurring with missing required fields -> validation error.
- N-REC-02: Create recurring with invalid frequency -> validation error.

### G. Reports / Date Inputs
- N-REP-01: Invalid date range input (from > to) -> handled error.
- N-REP-02: Missing date params where required -> validation error.

### H. Infra / Runtime
- N-INF-01: Backend down -> frontend shows API/network error gracefully.
- N-INF-02: Wrong `VITE_API_URL` -> clear network failure behavior.
- N-INF-03: CORS mismatch origin -> request blocked as expected.

## 6) Exit Criteria
Release is acceptable when:
- All positive cases pass.
- All negative cases return expected safe behavior/messages.
- No P0/P1 open defects.

## 7) Suggested Execution Sheet (per case)
For each case record:
- Case ID
- Build/commit
- Steps executed
- Expected result
- Actual result
- Pass/Fail
- Evidence link/screenshot
