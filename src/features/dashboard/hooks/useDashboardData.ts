import { useMemo } from "react";
import {
  buildDashboardSummary,
  buildDashboardTransactions,
} from "../../../entities/dashboard";
import { useAccounts } from "../../accounts/hooks/useAccounts";
import { useCategories } from "../../categories/hooks/useCategories";
import { useTransactions } from "../../transactions/hooks/useTransactions";

const getCurrentMonthRange = () => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    occurredBefore: nextMonthStart.toISOString(),
    occurredFrom: monthStart.toISOString(),
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!error) {
    return null;
  }

  return error instanceof Error ? error.message : fallback;
};

export const useDashboardData = () => {
  const accountsQuery = useAccounts();
  const categoriesQuery = useCategories({ includeInactive: true });
  const monthRange = getCurrentMonthRange();
  const monthlyTransactionsQuery = useTransactions({
    fetchAll: true,
    ...monthRange,
  });
  const recentTransactionsQuery = useTransactions({ limit: 5 });

  const summary = useMemo(
    () =>
      buildDashboardSummary(
        accountsQuery.data ?? [],
        monthlyTransactionsQuery.data ?? [],
      ),
    [accountsQuery.data, monthlyTransactionsQuery.data],
  );
  const transactions = useMemo(
    () =>
      buildDashboardTransactions(
        recentTransactionsQuery.data ?? [],
        accountsQuery.data ?? [],
        categoriesQuery.data ?? [],
      ),
    [accountsQuery.data, categoriesQuery.data, recentTransactionsQuery.data],
  );

  return {
    balance: {
      errorMessage: getErrorMessage(
        accountsQuery.error,
        "Account balances are unavailable.",
      ),
      isLoading: accountsQuery.isLoading,
      retry: () => {
        void accountsQuery.refetch();
      },
    },
    monthly: {
      errorMessage: getErrorMessage(
        monthlyTransactionsQuery.error,
        "Monthly totals are unavailable.",
      ),
      isLoading:
        monthlyTransactionsQuery.isLoading || accountsQuery.isLoading,
      retry: () => {
        void monthlyTransactionsQuery.refetch();
      },
    },
    recent: {
      errorMessage:
        getErrorMessage(
          recentTransactionsQuery.error,
          "Recent transactions are unavailable.",
        ) ??
        getErrorMessage(
          accountsQuery.error,
          "Transaction accounts are unavailable.",
        ) ??
        getErrorMessage(
          categoriesQuery.error,
          "Transaction categories are unavailable.",
        ),
      isLoading:
        recentTransactionsQuery.isLoading ||
        accountsQuery.isLoading ||
        categoriesQuery.isLoading,
      retry: () => {
        void Promise.all([
          recentTransactionsQuery.refetch(),
          accountsQuery.refetch(),
          categoriesQuery.refetch(),
        ]);
      },
    },
    summary,
    transactions,
  };
};
