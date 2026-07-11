import { useState, type FormEvent } from "react";
import {
  accountCurrencies,
  accountCurrencyLabels,
  accountTypeLabels,
  accountTypes,
  defaultAccountCurrency,
  type Account,
  type AccountCurrency,
  type AccountFormValues,
  type AccountType,
} from "../../../entities/accounts";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Label from "../../../shared/components/Label";

type AccountFormProps = {
  account?: Account | null;
  errorMessage?: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: AccountFormValues) => void;
};

const getInitialValues = (account?: Account | null): AccountFormValues => ({
  currency: account?.currency ?? defaultAccountCurrency,
  initialBalance: "0",
  isActive: account?.isActive ?? true,
  name: account?.name ?? "",
  type: account?.type ?? "cash",
});

export default function AccountForm({
  account,
  errorMessage,
  isSubmitting,
  onCancel,
  onSubmit,
}: AccountFormProps) {
  const [values, setValues] = useState<AccountFormValues>(
    getInitialValues(account),
  );
  const isEditing = Boolean(account);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04] sm:p-6"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
          {isEditing ? "Edit account" : "New account"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          {isEditing ? account?.name : "Create an account"}
        </h2>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <Label htmlFor="account-name">Account name</Label>
          <Input
            autoComplete="off"
            id="account-name"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="Everyday cash"
            required
            value={values.name}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="account-type">Type</Label>
            <select
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-950 shadow-sm shadow-slate-950/[0.02] outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
              id="account-type"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  type: event.target.value as AccountType,
                }))
              }
              value={values.type}
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {accountTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="account-currency">Currency</Label>
            <select
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-950 shadow-sm shadow-slate-950/[0.02] outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
              id="account-currency"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  currency: event.target.value as AccountCurrency,
                }))
              }
              value={values.currency}
            >
              {accountCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {accountCurrencyLabels[currency]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isEditing ? (
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">
              Balance is managed by transactions.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              You can edit account details, but the current balance stays
              protected.
            </p>
          </div>
        ) : (
          <div>
            <Label htmlFor="account-initial-balance">Initial balance</Label>
            <Input
              id="account-initial-balance"
              inputMode="decimal"
              min="0"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  initialBalance: event.target.value,
                }))
              }
              required
              step="0.01"
              type="number"
              value={values.initialBalance}
            />
          </div>
        )}

        {isEditing ? (
          <label className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4">
            <span>
              <span className="block text-sm font-semibold text-slate-950">
                Active account
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                Inactive accounts stay visible but can be ignored in new flows.
              </span>
            </span>
            <input
              checked={values.isActive}
              className="size-5 accent-green-600"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  isActive: event.target.checked,
                }))
              }
              type="checkbox"
            />
          </label>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button
          disabled={isSubmitting}
          onClick={onCancel}
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button isLoading={isSubmitting} type="submit">
          {isEditing ? "Save changes" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
