import { WalletCards } from "lucide-react";
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
    <section className="overflow-hidden rounded-[32px] bg-green-950 p-6 text-white shadow-2xl shadow-green-950/20 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-green-100/80">Total balance</p>
          <p className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            {formatCurrency(summary.totalBalance, summary.currency)}
          </p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-green-100">
          <WalletCards className="size-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100/70">
              Available
            </p>
            <p className="mt-2 text-sm leading-6 text-green-50/85">
              Connect accounts to start tracking real balances.
            </p>
          </div>
          <span className="rounded-full bg-green-300/15 px-3 py-1 text-xs font-semibold text-green-100">
            Secure
          </span>
        </div>
      </div>
    </section>
  );
}
