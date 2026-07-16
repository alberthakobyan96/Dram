import type { Account, AccountCurrency } from "../accounts";
import type { Category } from "../categories";
import type { Transaction } from "../transactions";
import type {
  DashboardCurrencyAmount,
  DashboardSummary,
  DashboardTransaction,
} from "./types";

const currencyOrder: AccountCurrency[] = ["AMD", "USD", "EUR"];

const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

const sortCurrencies = (currencies: Iterable<AccountCurrency>) =>
  Array.from(new Set(currencies)).sort(
    (left, right) =>
      currencyOrder.indexOf(left) - currencyOrder.indexOf(right),
  );

const groupAmounts = (
  entries: Array<{ amount: number; currency: AccountCurrency }>,
  currencies: AccountCurrency[],
): DashboardCurrencyAmount[] => {
  const totals = new Map<AccountCurrency, number>();

  entries.forEach(({ amount, currency }) => {
    totals.set(currency, (totals.get(currency) ?? 0) + amount);
  });

  return currencies.map((currency) => ({
    amount: roundMoney(totals.get(currency) ?? 0),
    currency,
  }));
};

export const buildDashboardSummary = (
  accounts: Account[],
  monthlyTransactions: Transaction[],
): DashboardSummary => {
  const activeAccounts = accounts.filter((account) => account.isActive);
  const balanceCurrencies = sortCurrencies(
    activeAccounts.map((account) => account.currency),
  );
  const monthlyCurrencies = sortCurrencies([
    ...balanceCurrencies,
    ...monthlyTransactions
      .filter((transaction) => transaction.type !== "transfer")
      .map((transaction) => transaction.currency),
  ]);

  return {
    activeAccountCount: activeAccounts.length,
    monthlyExpenses: groupAmounts(
      monthlyTransactions.filter(
        (transaction) => transaction.type === "expense",
      ),
      monthlyCurrencies,
    ),
    monthlyIncome: groupAmounts(
      monthlyTransactions.filter(
        (transaction) => transaction.type === "income",
      ),
      monthlyCurrencies,
    ),
    totalBalances: groupAmounts(
      activeAccounts.map((account) => ({
        amount: account.currentBalance,
        currency: account.currency,
      })),
      balanceCurrencies,
    ),
  };
};

export const buildDashboardTransactions = (
  transactions: Transaction[],
  accounts: Account[],
  categories: Category[],
): DashboardTransaction[] => {
  const accountsById = new Map(accounts.map((account) => [account.id, account]));
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  );

  return transactions.slice(0, 5).map((transaction) => ({
    accountName:
      accountsById.get(transaction.accountId)?.name ?? "Unknown account",
    amount: transaction.amount,
    categoryName:
      transaction.type === "transfer"
        ? "Transfer"
        : (categoriesById.get(transaction.categoryId)?.name ??
          "Unknown category"),
    currency: transaction.currency,
    destinationAccountName:
      transaction.type === "transfer"
        ? (accountsById.get(transaction.destinationAccountId)?.name ??
          "Unknown account")
        : null,
    id: transaction.id,
    occurredAt: transaction.occurredAt,
    type: transaction.type,
  }));
};

export const formatDashboardAmount = (
  amount: number,
  currency: AccountCurrency,
) =>
  new Intl.NumberFormat("en-US", {
    currency,
    currencyDisplay: "code",
    style: "currency",
  }).format(amount);
