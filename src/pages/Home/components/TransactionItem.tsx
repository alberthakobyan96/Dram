import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { Transaction } from "../../../entities/dashboard";

type TransactionItemProps = {
  currency: string;
  transaction: Transaction;
};

const formatAmount = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));

export default function TransactionItem({
  currency,
  transaction,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? ArrowDownLeft : ArrowUpRight;

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
          isIncome ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
        }`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-950">
          {transaction.title}
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">
          {transaction.category} · {formatDate(transaction.date)}
        </p>
      </div>

      <p
        className={`text-sm font-semibold ${
          isIncome ? "text-green-700" : "text-slate-950"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatAmount(transaction.amount, currency)}
      </p>
    </li>
  );
}
