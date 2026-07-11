import type { Account } from "../../../entities/accounts";
import type { Category } from "../../../entities/categories";
import type { Transaction } from "../../../entities/transactions";
import TransactionCard from "./TransactionCard";
import TransactionEmptyState from "./TransactionEmptyState";

type TransactionListProps = {
  accounts: Account[];
  categories: Category[];
  onDelete: (transaction: Transaction) => void;
  transactions: Transaction[];
};

export default function TransactionList({
  accounts,
  categories,
  onDelete,
  transactions,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return <TransactionEmptyState kind="transactions" />;
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Recent Activity
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Latest balance-changing events
          </p>
        </div>
      </div>
      <ul className="grid gap-3">
        {transactions.map((transaction) => (
          <TransactionCard
            accounts={accounts}
            categories={categories}
            key={transaction.id}
            onDelete={onDelete}
            transaction={transaction}
          />
        ))}
      </ul>
    </section>
  );
}
