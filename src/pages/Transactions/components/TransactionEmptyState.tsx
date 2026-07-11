import { Link } from "react-router-dom";
import { ReceiptText, WalletCards } from "lucide-react";

type TransactionEmptyStateProps = {
  kind: "accounts" | "transactions";
};

export default function TransactionEmptyState({
  kind,
}: TransactionEmptyStateProps) {
  if (kind === "accounts") {
    return (
      <section className="rounded-[28px] border border-dashed border-green-200 bg-white p-8 text-center shadow-xl shadow-slate-950/[0.04]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-3xl bg-green-50 text-green-700">
          <WalletCards className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-950">
          Add an account first
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Transactions need an active cash, card, or bank account before DRAM
          can update balances.
        </p>
        <Link
          className="mx-auto mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-2xl border border-transparent bg-green-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/20"
          to="/accounts"
        >
          Go to accounts
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/[0.04]">
      <div className="mx-auto flex size-14 items-center justify-center rounded-3xl bg-green-50 text-green-700">
        <ReceiptText className="size-7" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">
        No transactions yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Income, expenses, and transfers will appear here after you create them.
      </p>
    </section>
  );
}
