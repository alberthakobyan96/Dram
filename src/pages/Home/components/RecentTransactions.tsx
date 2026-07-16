import { ReceiptText } from "lucide-react";
import type { DashboardTransaction } from "../../../entities/dashboard";
import EmptyState from "./EmptyState";
import TransactionItem from "./TransactionItem";

type RecentTransactionsProps = {
  errorMessage: string | null;
  isLoading: boolean;
  onRetry: () => void;
  transactions: DashboardTransaction[];
};

export default function RecentTransactions({
  errorMessage,
  isLoading,
  onRetry,
  transactions,
}: RecentTransactionsProps) {
  return (
    <section className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-950/[0.03] sm:p-6">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-[17px] font-semibold text-slate-950">
          Recent activity
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Latest account activity
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-2" aria-label="Loading recent transactions">
          {[0, 1, 2].map((item) => (
            <div
              className="h-16 animate-pulse rounded-2xl bg-slate-100"
              key={item}
            />
          ))}
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-5 text-center">
          <h3 className="text-sm font-semibold text-red-800">
            Recent activity unavailable
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs break-words text-sm leading-5 text-red-700">
            {errorMessage}
          </p>
          <button
            className="mt-3 min-h-11 rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 outline-none transition hover:bg-red-100 focus-visible:ring-4 focus-visible:ring-red-600/15"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : transactions.length > 0 ? (
        <ul className="grid min-w-0 gap-1">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<ReceiptText className="size-5" aria-hidden="true" />}
          title="No transactions yet"
          description="Your latest income, expenses, and transfers will appear here."
        />
      )}
    </section>
  );
}
