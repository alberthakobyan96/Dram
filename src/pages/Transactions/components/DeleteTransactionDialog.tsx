import Button from "../../../shared/components/Button";
import {
  formatTransactionAmount,
  type Transaction,
} from "../../../entities/transactions";

type DeleteTransactionDialogProps = {
  errorMessage?: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  transaction: Transaction;
};

export default function DeleteTransactionDialog({
  errorMessage,
  isDeleting,
  onCancel,
  onConfirm,
  transaction,
}: DeleteTransactionDialogProps) {
  return (
    <div
      aria-labelledby="delete-transaction-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-slate-950/30 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/20">
        <h2
          className="text-xl font-bold tracking-tight text-slate-950"
          id="delete-transaction-title"
        >
          Delete transaction?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          This will reverse the balance change for{" "}
          <span className="font-semibold text-slate-800">
            {formatTransactionAmount(
              transaction.amount,
              transaction.currency,
              transaction.type,
            )}
          </span>
          .
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
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
