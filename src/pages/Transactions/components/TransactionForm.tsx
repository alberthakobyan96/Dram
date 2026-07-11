import { useState, type FormEvent } from "react";
import { formatAccountBalance, type Account } from "../../../entities/accounts";
import type { Category } from "../../../entities/categories";
import type {
  CreateTransactionInput,
  TransactionFormValues,
  TransactionType,
} from "../../../entities/transactions";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Label from "../../../shared/components/Label";
import TransactionTypeTabs from "./TransactionTypeTabs";

type TransactionFormProps = {
  accounts: Account[];
  categories: Category[];
  errorMessage?: string;
  isSubmitting: boolean;
  onSubmit: (input: CreateTransactionInput) => void;
  onTypeChange: (type: TransactionType) => void;
  type: TransactionType;
};

const toDatetimeLocalValue = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
};

const getInitialValues = (
  type: TransactionType,
  accounts: Account[],
  categories: Category[],
): TransactionFormValues => {
  const firstAccount = accounts[0];
  const secondAccount = accounts.find((account) => account.id !== firstAccount?.id);
  const firstCategory = categories.find((category) => category.type === type);

  return {
    accountId: firstAccount?.id ?? "",
    amount: "",
    categoryId: type === "transfer" ? "" : (firstCategory?.id ?? ""),
    destinationAccountId: type === "transfer" ? (secondAccount?.id ?? "") : "",
    note: "",
    occurredAt: toDatetimeLocalValue(new Date()),
    type,
  };
};

export default function TransactionForm({
  accounts,
  categories,
  errorMessage,
  isSubmitting,
  onSubmit,
  onTypeChange,
  type,
}: TransactionFormProps) {
  const [values, setValues] = useState<TransactionFormValues>(
    getInitialValues(type, accounts, categories),
  );
  const [validationError, setValidationError] = useState("");
  const selectedAccount = accounts.find(
    (account) => account.id === values.accountId,
  );
  const destinationAccount = accounts.find(
    (account) => account.id === values.destinationAccountId,
  );
  const filteredCategories = categories.filter(
    (category) => category.type === type,
  );
  const isTransfer = type === "transfer";
  const accountLabel = type === "income" ? "Destination account" : "Source account";
  const categoryLabel = type === "income" ? "Income category" : "Expense category";
  const transferAmount = Number(values.amount);
  const amount = Number(values.amount);
  const isCreateInvalid =
    !isTransfer &&
    (!selectedAccount ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !values.occurredAt ||
      !values.categoryId ||
      filteredCategories.length === 0);
  const isTransferInvalid =
    isTransfer &&
    (!selectedAccount ||
      !destinationAccount ||
      !Number.isFinite(transferAmount) ||
      transferAmount <= 0 ||
      !values.occurredAt ||
      selectedAccount.id === destinationAccount.id ||
      selectedAccount.currency !== destinationAccount.currency);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    const amount = Number(values.amount);

    if (!selectedAccount) {
      setValidationError("Select an account.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setValidationError("Amount must be greater than zero.");
      return;
    }

    if (!values.occurredAt) {
      setValidationError("Select a date and time.");
      return;
    }

    if (isTransfer) {
      if (!destinationAccount) {
        setValidationError("Select a destination account.");
        return;
      }

      if (selectedAccount.id === destinationAccount.id) {
        setValidationError("Source and destination accounts must be different.");
        return;
      }

      if (selectedAccount.currency !== destinationAccount.currency) {
        setValidationError("Transfer accounts must use the same currency.");
        return;
      }

      onSubmit({
        accountId: selectedAccount.id,
        amount,
        currency: selectedAccount.currency,
        destinationAccountId: destinationAccount.id,
        note: values.note.trim() || null,
        occurredAt: new Date(values.occurredAt).toISOString(),
        type: "transfer",
      });
      return;
    }

    if (filteredCategories.length === 0) {
      setValidationError(`No ${type} categories are available.`);
      return;
    }

    if (!values.categoryId) {
      setValidationError("Select a category.");
      return;
    }

    const commonInput = {
      accountId: selectedAccount.id,
      amount,
      currency: selectedAccount.currency,
      note: values.note.trim() || null,
      occurredAt: new Date(values.occurredAt).toISOString(),
    };

    if (type === "income") {
      onSubmit({
        ...commonInput,
        categoryId: values.categoryId,
        type: "income",
      });
      return;
    }

    onSubmit({
      ...commonInput,
      categoryId: values.categoryId,
      type: "expense",
    });
  };

  if (isTransfer) {
    return (
      <form
        className="w-full max-w-full overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+88px)] sm:pb-0"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full max-w-full gap-3 sm:gap-5">
          <TransactionTypeTabs value={type} onChange={onTypeChange} />

          <section className="box-border w-full max-w-full rounded-[24px] bg-white px-4 py-3 shadow-lg shadow-slate-950/[0.03] ring-1 ring-slate-200">
            <Label className="mb-1 text-xs uppercase tracking-[0.16em] text-slate-400" htmlFor="transaction-amount">
              Amount
            </Label>
            <div className="flex w-full max-w-full items-baseline justify-center gap-2 overflow-hidden">
              <span className="shrink-0 text-[38px] font-bold leading-none tracking-normal text-green-700 sm:text-5xl">
                {selectedAccount?.currency ?? "AMD"}
              </span>
              <input
                className="w-[min(42vw,160px)] min-w-0 max-w-full bg-transparent text-left text-[38px] font-bold leading-none tracking-normal text-slate-950 outline-none placeholder:text-slate-300 sm:w-[220px] sm:text-5xl"
                id="transaction-amount"
                inputMode="decimal"
                min="0.01"
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    amount: event.target.value,
                  }))
                }
                placeholder="0"
                required
                step="0.01"
                type="number"
                value={values.amount}
              />
            </div>
            <p className="mt-1.5 truncate text-center text-sm font-medium text-slate-500">
              Available:{" "}
              <span className="font-semibold text-slate-700">
                {selectedAccount
                  ? formatAccountBalance(
                      selectedAccount.currentBalance,
                      selectedAccount.currency,
                    )
                  : "AMD 0.00"}
              </span>
            </p>
          </section>

          <section className="box-border w-full max-w-full rounded-[28px] bg-white p-3 shadow-xl shadow-slate-950/[0.04] ring-1 ring-slate-200">
            <div className="grid w-full max-w-full grid-cols-[24px_minmax(0,1fr)] gap-x-2">
              <div className="grid grid-rows-[1fr_auto_1fr] pt-6 text-green-700">
                <span className="flex h-[62px] items-center justify-center text-xl font-bold leading-none">
                  ↓
                </span>
                <button
                  aria-label="Swap accounts"
                  className="flex size-6 items-center justify-center rounded-full text-base font-bold leading-none text-slate-400 transition hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      accountId: current.destinationAccountId,
                      destinationAccountId: current.accountId,
                    }))
                  }
                  type="button"
                >
                  ⇅
                </button>
                <span className="flex h-[62px] items-center justify-center text-xl font-bold leading-none">
                  ↑
                </span>
              </div>

              <div className="grid min-w-0 gap-2">
                <div className="min-w-0">
                  <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-account">
                    From
                  </Label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10">
                    <select
                      className="box-border h-8 w-full max-w-full bg-transparent text-lg font-bold text-slate-950 outline-none"
                      id="transaction-account"
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          accountId: event.target.value,
                        }))
                      }
                      value={values.accountId}
                    >
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 truncate text-sm font-medium text-slate-500">
                      {selectedAccount
                        ? `${selectedAccount.currency} · Available ${formatAccountBalance(
                            selectedAccount.currentBalance,
                            selectedAccount.currency,
                          )}`
                        : "Select source account"}
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-destination-account">
                    To
                  </Label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10">
                    <select
                      className="box-border h-8 w-full max-w-full bg-transparent text-lg font-bold text-slate-950 outline-none"
                      id="transaction-destination-account"
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          destinationAccountId: event.target.value,
                        }))
                      }
                      value={values.destinationAccountId}
                    >
                      <option value="">Select destination</option>
                      {accounts.map((account) => (
                        <option
                          disabled={account.id === selectedAccount?.id}
                          key={account.id}
                          value={account.id}
                        >
                          {account.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 truncate text-sm font-medium text-slate-500">
                      {destinationAccount
                        ? `${destinationAccount.currency} · Balance ${formatAccountBalance(
                            destinationAccount.currentBalance,
                            destinationAccount.currency,
                          )}`
                        : "Choose where money lands"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="box-border w-full max-w-full rounded-[24px] bg-white p-3 shadow-lg shadow-slate-950/[0.03] ring-1 ring-slate-200">
            <div className="grid w-full max-w-full gap-3 sm:grid-cols-2">
              <div className="min-w-0">
                <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-date">
                  Date and time
                </Label>
                <Input
                  className="h-11 rounded-2xl bg-slate-50 text-sm"
                  id="transaction-date"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      occurredAt: event.target.value,
                    }))
                  }
                  required
                  type="datetime-local"
                  value={values.occurredAt}
                />
              </div>

              <div className="min-w-0">
                <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-note">
                  Note
                </Label>
                <Input
                  className="h-11 rounded-2xl bg-slate-50 text-sm"
                  id="transaction-note"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  placeholder="Optional"
                  value={values.note}
                />
              </div>
            </div>
          </section>

          {validationError || errorMessage ? (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {validationError || errorMessage}
            </div>
          ) : null}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur sm:static sm:mt-5 sm:border-0 sm:bg-transparent sm:p-0">
          <Button
            disabled={isTransferInvalid || isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Transfer money
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form
      className="w-full max-w-full overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+88px)] sm:pb-0"
      onSubmit={handleSubmit}
    >
      <div className="grid w-full max-w-full gap-3 sm:gap-5">
        <TransactionTypeTabs value={type} onChange={onTypeChange} />

        <section className="box-border w-full max-w-full rounded-[24px] bg-white px-4 py-3 shadow-lg shadow-slate-950/[0.03] ring-1 ring-slate-200">
          <Label className="mb-1 text-xs uppercase tracking-[0.16em] text-slate-400" htmlFor="transaction-amount">
            Amount
          </Label>
          <div className="flex w-full max-w-full items-baseline justify-center gap-2 overflow-hidden">
            <span className="shrink-0 text-[38px] font-bold leading-none tracking-normal text-green-700 sm:text-5xl">
              {selectedAccount?.currency ?? "AMD"}
            </span>
            <input
              className="w-[min(42vw,160px)] min-w-0 max-w-full bg-transparent text-left text-[38px] font-bold leading-none tracking-normal text-slate-950 outline-none placeholder:text-slate-300 sm:w-[220px] sm:text-5xl"
              id="transaction-amount"
              inputMode="decimal"
              min="0.01"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              placeholder="0"
              required
              step="0.01"
              type="number"
              value={values.amount}
            />
          </div>
          <p className="mt-1.5 truncate text-center text-sm font-medium text-slate-500">
            Available:{" "}
            <span className="font-semibold text-slate-700">
              {selectedAccount
                ? formatAccountBalance(
                    selectedAccount.currentBalance,
                    selectedAccount.currency,
                  )
                : "AMD 0.00"}
            </span>
          </p>
        </section>

        <section className="box-border w-full max-w-full rounded-[28px] bg-white p-3 shadow-xl shadow-slate-950/[0.04] ring-1 ring-slate-200">
          <div className="grid w-full max-w-full gap-2">
            <div className="min-w-0">
              <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-account">
                {accountLabel}
              </Label>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10">
                <select
                  className="box-border h-8 w-full max-w-full bg-transparent text-lg font-bold text-slate-950 outline-none"
                  id="transaction-account"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      accountId: event.target.value,
                    }))
                  }
                  value={values.accountId}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 truncate text-sm font-medium text-slate-500">
                  {selectedAccount
                    ? `${selectedAccount.currency} · Available ${formatAccountBalance(
                        selectedAccount.currentBalance,
                        selectedAccount.currency,
                      )}`
                    : "Select account"}
                </p>
              </div>
            </div>

            <div className="min-w-0">
              <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-category">
                {categoryLabel}
              </Label>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10">
                <select
                  className="box-border h-8 w-full max-w-full bg-transparent text-lg font-bold text-slate-950 outline-none disabled:cursor-not-allowed"
                  disabled={filteredCategories.length === 0}
                  id="transaction-category"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      categoryId: event.target.value,
                    }))
                  }
                  value={values.categoryId}
                >
                  {filteredCategories.length === 0 ? (
                    <option value="">No categories available</option>
                  ) : null}
                  {filteredCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 truncate text-sm font-medium text-slate-500">
                  {type === "income"
                    ? "Choose where money came from"
                    : "Choose how to classify this spend"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="box-border w-full max-w-full rounded-[24px] bg-white p-3 shadow-lg shadow-slate-950/[0.03] ring-1 ring-slate-200">
          <div className="grid w-full max-w-full gap-3 sm:grid-cols-2">
            <div className="min-w-0">
              <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-date">
                Date and time
              </Label>
              <Input
                className="h-11 rounded-2xl bg-slate-50 text-sm"
                id="transaction-date"
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    occurredAt: event.target.value,
                  }))
                }
                required
                type="datetime-local"
                value={values.occurredAt}
              />
            </div>

            <div className="min-w-0">
              <Label className="mb-1 px-1 text-xs uppercase tracking-[0.14em] text-slate-400" htmlFor="transaction-note">
                Note
              </Label>
              <Input
                className="h-11 rounded-2xl bg-slate-50 text-sm"
                id="transaction-note"
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    note: event.target.value,
                  }))
                }
                placeholder="Optional"
                value={values.note}
              />
            </div>
          </div>
        </section>

        {validationError || errorMessage ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {validationError || errorMessage}
          </div>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur sm:static sm:mt-5 sm:border-0 sm:bg-transparent sm:p-0">
        <Button
          disabled={isCreateInvalid || isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          {type === "income" ? "Add income" : "Add expense"}
        </Button>
      </div>
    </form>
  );
}
