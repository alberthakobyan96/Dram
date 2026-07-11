import Button from "../../../shared/components/Button";
import type { Account } from "../../../entities/accounts";

type DeleteAccountDialogProps = {
  account: Account;
  errorMessage?: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountDialog({
  account,
  errorMessage,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteAccountDialogProps) {
  return (
    <div
      aria-labelledby="delete-account-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-slate-950/30 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/20">
        <h2
          className="text-xl font-bold tracking-tight text-slate-950"
          id="delete-account-title"
        >
          Delete {account.name}?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Accounts with transactions cannot be deleted. If this account already
          has activity, deactivate it instead to keep your history intact.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            disabled={isDeleting}
            onClick={onCancel}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            className="border-red-600 bg-red-600 shadow-red-600/20 hover:bg-red-700 focus-visible:ring-red-600/20"
            isLoading={isDeleting}
            onClick={onConfirm}
            type="button"
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}
