import { ChevronRight, ReceiptText } from "lucide-react";
import type { Transaction } from "../../../entities/dashboard";
import EmptyState from "./EmptyState";
import TransactionItem from "./TransactionItem";

type RecentTransactionsProps = {
  currency: string;
  transactions: Transaction[];
};

export default function RecentTransactions({
  currency,
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

      {transactions.length > 0 ? (
        <ul className="grid gap-3">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              currency={currency}
              transaction={transaction}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<ReceiptText className="size-6" aria-hidden="true" />}
          title="No transactions yet"
          description="Your recent income and expenses will appear here once financial activity is connected."
        />
      )}
    </section>
  );
}
