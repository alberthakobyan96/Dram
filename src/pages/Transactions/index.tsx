import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import type { Transaction, TransactionType } from "../../entities/transactions";
import { useAccounts } from "../../features/accounts/hooks/useAccounts";
import { useCategories } from "../../features/categories/hooks/useCategories";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} from "../../features/transactions/hooks/useTransactionMutations";
import { useTransactions } from "../../features/transactions/hooks/useTransactions";
import DeleteTransactionDialog from "./components/DeleteTransactionDialog";
import TransactionEmptyState from "./components/TransactionEmptyState";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const transactionTypes: TransactionType[] = ["income", "expense", "transfer"];

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong.";

const getInitialType = (value: string | null): TransactionType =>
  transactionTypes.includes(value as TransactionType)
    ? (value as TransactionType)
    : "income";

const creationTitles: Record<TransactionType, string> = {
  expense: "Add expense",
  income: "Add income",
  transfer: "Transfer",
};

export default function TransactionsPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = getInitialType(searchParams.get("type"));
  const isCreationPage = location.pathname.endsWith("/new");
  const accountsQuery = useAccounts();
  const categoriesQuery = useCategories();
  const transactionsQuery = useTransactions();
  const createTransactionMutation = useCreateTransactionMutation();
  const deleteTransactionMutation = useDeleteTransactionMutation();
  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formVersion, setFormVersion] = useState(0);
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);

  const accounts = accountsQuery.data ?? [];
  const activeAccounts = accounts.filter((account) => account.isActive);
  const categories = categoriesQuery.data ?? [];
  const transactions = transactionsQuery.data ?? [];
  const isLoading =
    accountsQuery.isLoading ||
    categoriesQuery.isLoading ||
    (!isCreationPage && transactionsQuery.isLoading);
  const hasCategoriesError = categoriesQuery.isError;
  const selectedTypeCategories = categories.filter(
    (category) => category.type === selectedType,
  );
  const isCategoryUnavailable =
    selectedType !== "transfer" && selectedTypeCategories.length === 0;

  const handleTypeChange = (type: TransactionType) => {
    setFormError("");
    setSuccessMessage("");
    setSearchParams({ type });
  };

  const handleSubmit = async (
    input: Parameters<typeof createTransactionMutation.mutateAsync>[0],
  ) => {
    setFormError("");
    setSuccessMessage("");

    try {
      await createTransactionMutation.mutateAsync(input);
      setSuccessMessage("Transaction created.");
      setFormVersion((current) => current + 1);
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!deletingTransaction) {
      return;
    }

    setDeleteError("");

    try {
      await deleteTransactionMutation.mutateAsync(deletingTransaction.id);
      setDeletingTransaction(null);
      setSuccessMessage("Transaction deleted.");
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-3 text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-5xl gap-4 sm:gap-5">
        <header
          className={
            isCreationPage
              ? "flex items-center justify-between gap-3"
              : undefined
          }
        >
          {isCreationPage ? (
            <>
              <Link
                aria-label="Go back"
                className="flex size-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
                to="/"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </Link>
              <h1 className="text-lg font-bold tracking-tight text-slate-950">
                {creationTitles[selectedType]}
              </h1>
              <Link
                aria-label="Cancel"
                className="flex size-10 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
                to="/transactions"
              >
                <X className="size-5" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-green-700 focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
                to="/"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Dashboard
              </Link>
              <div className="mt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                  Transactions
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Record money movement
                </h1>
                <p className="mt-2 max-w-xl text-base text-slate-500">
                  Add income, expenses, and transfers while DRAM keeps balances
                  in sync.
                </p>
              </div>
            </>
          )}
        </header>

        {successMessage ? (
          <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            {successMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-4">
            <div className="h-96 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.04]" />
            <div className="h-24 animate-pulse rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-950/[0.03]" />
          </div>
        ) : null}

        {accountsQuery.isError ? (
          <div className="rounded-[28px] border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {getErrorMessage(accountsQuery.error)}
          </div>
        ) : null}

        {!isCreationPage && transactionsQuery.isError ? (
          <div className="rounded-[28px] border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {getErrorMessage(transactionsQuery.error)}
          </div>
        ) : null}

        {!isLoading && !accountsQuery.isError && activeAccounts.length === 0 ? (
          <TransactionEmptyState kind="accounts" />
        ) : null}

        {!isLoading && hasCategoriesError ? (
          <div className="rounded-[28px] border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            Categories are unavailable: {getErrorMessage(categoriesQuery.error)}
          </div>
        ) : null}

        {!isLoading &&
        !accountsQuery.isError &&
        (isCreationPage || !transactionsQuery.isError) &&
        activeAccounts.length > 0 &&
        !hasCategoriesError ? (
          <>
            {isCategoryUnavailable ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                No {selectedType} categories are available. Add or seed
                categories before creating this transaction type.
              </div>
            ) : null}

            <TransactionForm
              accounts={activeAccounts}
              categories={categories}
              errorMessage={formError}
              isSubmitting={createTransactionMutation.isPending}
              key={`${selectedType}-${formVersion}`}
              onSubmit={handleSubmit}
              onTypeChange={handleTypeChange}
              type={selectedType}
            />

            {!isCreationPage ? (
              <TransactionList
                accounts={accounts}
                categories={categories}
                onDelete={(transaction) => {
                  setDeleteError("");
                  setDeletingTransaction(transaction);
                }}
                transactions={transactions}
              />
            ) : null}
          </>
        ) : null}
      </div>

      {deletingTransaction ? (
        <DeleteTransactionDialog
          errorMessage={deleteError}
          isDeleting={deleteTransactionMutation.isPending}
          onCancel={() => {
            setDeleteError("");
            setDeletingTransaction(null);
          }}
          onConfirm={handleDelete}
          transaction={deletingTransaction}
        />
      ) : null}
    </main>
  );
}
