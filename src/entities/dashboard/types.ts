import type { AccountCurrency } from "../accounts";
import type { TransactionType } from "../transactions";

export type DashboardCurrency = AccountCurrency;

export type DashboardCurrencyAmount = {
  amount: number;
  currency: DashboardCurrency;
};

export type DashboardSummary = {
  activeAccountCount: number;
  monthlyExpenses: DashboardCurrencyAmount[];
  monthlyIncome: DashboardCurrencyAmount[];
  totalBalances: DashboardCurrencyAmount[];
};

export type DashboardTransaction = {
  accountName: string;
  amount: number;
  categoryName: string;
  currency: DashboardCurrency;
  destinationAccountName: string | null;
  id: string;
  occurredAt: string;
  type: TransactionType;
};

export type DashboardState = {
  summary: DashboardSummary;
  transactions: DashboardTransaction[];
};
