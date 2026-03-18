-- Reset all Finance Tracker app data while keeping schema/tables.
-- Safe to run in Supabase SQL Editor.

TRUNCATE TABLE
  public.transactions,
  public.recurring_transactions,
  public.budgets,
  public.goals,
  public.categories,
  public.accounts,
  public.password_reset_tokens,
  public.refresh_tokens,
  public.users
RESTART IDENTITY CASCADE;
