export type DashboardCurrency = "USD" | "AMD";

export type DashboardSummary = {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  currency: DashboardCurrency;
};

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
};

export type DashboardState = {
  summary: DashboardSummary;
  transactions: Transaction[];
};
