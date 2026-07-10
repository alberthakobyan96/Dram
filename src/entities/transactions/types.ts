import type { AccountCurrency } from "../accounts";

export type TransactionType = "income" | "expense" | "transfer";

type TransactionBase = {
  id: string;
  userId: string;
  amount: number;
  currency: AccountCurrency;
  accountId: string;
  occurredAt: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IncomeTransaction = TransactionBase & {
  type: "income";
  categoryId: string;
  destinationAccountId: null;
};

export type ExpenseTransaction = TransactionBase & {
  type: "expense";
  categoryId: string;
  destinationAccountId: null;
};

export type TransferTransaction = TransactionBase & {
  type: "transfer";
  categoryId: null;
  destinationAccountId: string;
};

export type Transaction =
  | IncomeTransaction
  | ExpenseTransaction
  | TransferTransaction;

export type CreateIncomeTransactionInput = {
  type: "income";
  amount: number;
  currency: AccountCurrency;
  categoryId: string;
  accountId: string;
  occurredAt: string;
  note?: string | null;
};

export type CreateExpenseTransactionInput = {
  type: "expense";
  amount: number;
  currency: AccountCurrency;
  categoryId: string;
  accountId: string;
  occurredAt: string;
  note?: string | null;
};

export type CreateTransferTransactionInput = {
  type: "transfer";
  amount: number;
  currency: AccountCurrency;
  accountId: string;
  destinationAccountId: string;
  occurredAt: string;
  note?: string | null;
};

export type CreateTransactionInput =
  | CreateIncomeTransactionInput
  | CreateExpenseTransactionInput
  | CreateTransferTransactionInput;

export type UpdateTransactionInput = CreateTransactionInput & {
  id: string;
};
