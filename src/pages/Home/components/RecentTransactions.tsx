import { ChevronRight, ReceiptText } from "lucide-react";
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
    <section className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/[0.03] sm:rounded-[28px] sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4 sm:mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Recent Activity
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 sm:mt-1">
            Latest account activity
          </p>
        </div>
        <ChevronRight className="size-5 text-slate-400" aria-hidden="true" />
      </div>

      {isLoading ? (
        <div className="grid gap-3" aria-label="Loading recent transactions">
          {[0, 1, 2].map((item) => (
            <div
              className="h-[70px] animate-pulse rounded-2xl bg-slate-100"
              key={item}
            />
          ))}
        </div>
      ) : errorMessage ? (
        <div className="rounded-[24px] border border-dashed border-red-200 bg-red-50 px-5 py-6 text-center">
          <h3 className="text-base font-semibold text-red-800">
            Recent activity unavailable
          </h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-red-700">
            {errorMessage}
          </p>
          <button
            className="mt-4 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 outline-none transition hover:bg-red-100 focus-visible:ring-4 focus-visible:ring-red-600/10"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : transactions.length > 0 ? (
        <ul className="grid gap-3">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<ReceiptText className="size-6" aria-hidden="true" />}
          title="No transactions yet"
          description="Your latest income, expenses, and transfers will appear here."
        />
      )}
    </section>
  );
}
