import { ArrowUpRight, WalletCards } from "lucide-react";
import type { DashboardSummary } from "../../../entities/dashboard";

type BalanceCardProps = {
  summary: DashboardSummary;
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export default function BalanceCard({ summary }: BalanceCardProps) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-green-950 p-5 text-white shadow-xl shadow-green-950/15 sm:rounded-[32px] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-green-100/80">
            Total balance
          </p>
          <p className="mt-2 text-[34px] font-bold leading-none tracking-normal sm:mt-3 sm:text-5xl">
            {formatCurrency(summary.totalBalance, summary.currency)}
          </p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-green-100 sm:size-12">
          <WalletCards className="size-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur sm:mt-7 sm:p-4">
        <p className="min-w-0 text-sm leading-5 text-green-50/85">
          Connect accounts to start tracking real balances.
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-300/15 px-3 py-1 text-xs font-bold text-green-100">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          Secure
        </span>
      </div>
    </section>
  );
}
