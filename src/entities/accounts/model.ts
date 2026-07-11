import type { AccountCurrency, AccountType } from "./types";

export const accountTypes: AccountType[] = [
  "cash",
  "bank_card",
  "bank_account",
];

export const accountCurrencies: AccountCurrency[] = ["AMD", "USD", "EUR"];

export const defaultAccountCurrency: AccountCurrency = "AMD";

export const accountTypeLabels: Record<AccountType, string> = {
  cash: "Cash",
  bank_card: "Bank card",
  bank_account: "Bank account",
};

export const accountCurrencyLabels: Record<AccountCurrency, string> = {
  AMD: "AMD",
  USD: "USD",
  EUR: "EUR",
};

export const formatAccountBalance = (
  amount: number,
  currency: AccountCurrency,
) =>
  new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
  }).format(amount);
