import { ReceiptText } from "lucide-react";
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
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04] sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Recent transactions
          </h2>
          <p className="mt-1 text-sm text-slate-500">Latest account activity</p>
        </div>
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
