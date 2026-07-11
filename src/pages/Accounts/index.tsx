import { useState } from "react";
import type {
  Account,
  AccountFormValues,
  CreateAccountInput,
  UpdateAccountInput,
} from "../../entities/accounts";
import {
  useCreateAccountMutation,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from "../../features/accounts/hooks/useAccountMutations";
import { useAccounts } from "../../features/accounts/hooks/useAccounts";
import AccountEmptyState from "./components/AccountEmptyState";
import AccountForm from "./components/AccountForm";
import AccountList from "./components/AccountList";
import AccountsHeader from "./components/AccountsHeader";
import DeleteAccountDialog from "./components/DeleteAccountDialog";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong.";

export default function AccountsPage() {
  const accountsQuery = useAccounts();
  const createAccountMutation = useCreateAccountMutation();
  const updateAccountMutation = useUpdateAccountMutation();
  const deleteAccountMutation = useDeleteAccountMutation();

  const [isCreating, setIsCreating] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);
  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const accounts = accountsQuery.data ?? [];
  const isFormVisible = isCreating || editingAccount !== null;
  const isFormSubmitting =
    createAccountMutation.isPending || updateAccountMutation.isPending;

  const openCreateForm = () => {
    setDeleteError("");
    setEditingAccount(null);
    setFormError("");
    setSuccessMessage("");
    setIsCreating(true);
  };

  const closeForm = () => {
    setEditingAccount(null);
    setFormError("");
    setIsCreating(false);
  };

  const handleEdit = (account: Account) => {
    setDeleteError("");
    setFormError("");
    setSuccessMessage("");
    setIsCreating(false);
    setEditingAccount(account);
  };

  const handleSubmit = async (values: AccountFormValues) => {
    setFormError("");
    setSuccessMessage("");

    try {
      if (editingAccount) {
        const input: UpdateAccountInput = {
          currency: values.currency,
          id: editingAccount.id,
          isActive: values.isActive,
          name: values.name.trim(),
          type: values.type,
        };

        await updateAccountMutation.mutateAsync(input);
        setSuccessMessage("Account updated.");
      } else {
        const initialBalance = Number(values.initialBalance);

        if (!Number.isFinite(initialBalance) || initialBalance < 0) {
          setFormError("Initial balance must be zero or greater.");
          return;
        }

        const input: CreateAccountInput = {
          currency: values.currency,
          initialBalance,
          name: values.name.trim(),
          type: values.type,
        };

        await createAccountMutation.mutateAsync(input);
        setSuccessMessage("Account created.");
      }

      closeForm();
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  const handleToggleStatus = async (account: Account) => {
    setSuccessMessage("");
    setFormError("");
    setDeleteError("");

    try {
      await updateAccountMutation.mutateAsync({
        id: account.id,
        isActive: !account.isActive,
      });
      setSuccessMessage(
        account.isActive ? "Account deactivated." : "Account activated.",
      );
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!deletingAccount) {
      return;
    }

    setDeleteError("");

    try {
      await deleteAccountMutation.mutateAsync(deletingAccount.id);
      setDeletingAccount(null);
      setSuccessMessage("Account deleted.");
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-5xl gap-6">
        <AccountsHeader isCreating={isCreating} onCreate={openCreateForm} />

        {successMessage ? (
          <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            {successMessage}
          </div>
        ) : null}

        {accountsQuery.isLoading ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                className="h-64 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.04]"
                key={item}
              />
            ))}
          </section>
        ) : null}

        {accountsQuery.isError ? (
          <div className="rounded-[28px] border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {getErrorMessage(accountsQuery.error)}
          </div>
        ) : null}

        {isFormVisible ? (
          <AccountForm
            account={editingAccount}
            errorMessage={formError}
            isSubmitting={isFormSubmitting}
            key={editingAccount?.id ?? "new-account"}
            onCancel={closeForm}
            onSubmit={handleSubmit}
          />
        ) : null}

        {!accountsQuery.isLoading &&
        !accountsQuery.isError &&
        accounts.length === 0 &&
        !isFormVisible ? (
          <AccountEmptyState onCreate={openCreateForm} />
        ) : null}

        {!accountsQuery.isLoading && !accountsQuery.isError && accounts.length > 0 ? (
          <AccountList
            accounts={accounts}
            onDelete={(account) => {
              setDeleteError("");
              setDeletingAccount(account);
            }}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        ) : null}
      </div>

      {deletingAccount ? (
        <DeleteAccountDialog
          account={deletingAccount}
          errorMessage={deleteError}
          isDeleting={deleteAccountMutation.isPending}
          onCancel={() => {
            setDeleteError("");
            setDeletingAccount(null);
          }}
          onConfirm={handleDelete}
        />
      ) : null}
    </main>
  );
}
