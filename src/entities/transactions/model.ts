import type { TransactionType } from "./types";

export const transactionTypes: TransactionType[] = [
  "income",
  "expense",
  "transfer",
];

export const transactionTypeLabels: Record<TransactionType, string> = {
  expense: "Expense",
  income: "Income",
  transfer: "Transfer",
};

export const transactionTypeDescriptions: Record<TransactionType, string> = {
  expense: "Money going out",
  income: "Money coming in",
  transfer: "Move between accounts",
};

export const formatTransactionAmount = (
  amount: number,
  currency: string,
  type: TransactionType,
) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 2,
    style: "currency",
  }).format(amount);

  if (type === "income") {
    return `+${formattedAmount}`;
  }

  if (type === "expense") {
    return `-${formattedAmount}`;
  }

  return formattedAmount;
};

export const formatTransactionDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
