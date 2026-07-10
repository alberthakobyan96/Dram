import type { AccountCurrency, AccountType } from "./types";

export const accountTypes: AccountType[] = [
  "cash",
  "bank_card",
  "bank_account",
];

export const accountCurrencies: AccountCurrency[] = ["AMD", "USD", "EUR"];

export const defaultAccountCurrency: AccountCurrency = "AMD";
