export type AccountType = "cash" | "bank_card" | "bank_account";

export type AccountCurrency = "AMD" | "USD" | "EUR";

export type Account = {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  currency: AccountCurrency;
  currentBalance: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateAccountInput = {
  name: string;
  type: AccountType;
  currency: AccountCurrency;
  initialBalance: number;
};

export type UpdateAccountInput = {
  id: string;
  name?: string;
  type?: AccountType;
  currency?: AccountCurrency;
  isActive?: boolean;
};

export type AccountFormValues = {
  name: string;
  type: AccountType;
  currency: AccountCurrency;
  initialBalance: string;
  isActive: boolean;
};
