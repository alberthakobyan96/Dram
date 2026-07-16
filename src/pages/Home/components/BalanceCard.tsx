import { WalletCards } from "lucide-react";
import {
  formatDashboardAmount,
  type DashboardSummary,
} from "../../../entities/dashboard";

type BalanceCardProps = {
  errorMessage: string | null;
  isLoading: boolean;
  onRetry: () => void;
  summary: DashboardSummary;
};

export default function BalanceCard({
  errorMessage,
  isLoading,
  onRetry,
  summary,
}: BalanceCardProps) {
  const hasMultipleCurrencies = summary.totalBalances.length > 1;
  const accountLabel = `${summary.activeAccountCount} active account${
    summary.activeAccountCount === 1 ? "" : "s"
  }`;

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-green-900/70 bg-green-950 p-4 text-white shadow-lg shadow-green-950/10 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-green-100/80">
          Total balance
        </p>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-green-100">
          <WalletCards className="size-5" aria-hidden="true" />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-3 grid gap-2" aria-label="Loading balances">
          <div className="h-9 w-48 max-w-full animate-pulse rounded-xl bg-white/15" />
          <div className="h-6 w-36 max-w-full animate-pulse rounded-lg bg-white/10" />
        </div>
      ) : errorMessage ? (
        <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
          <p className="min-w-0 text-xl font-bold text-white">
            Balance unavailable
          </p>
          <button
            className="min-h-11 shrink-0 rounded-2xl bg-white/10 px-4 text-sm font-semibold text-green-50 outline-none transition hover:bg-white/15 focus-visible:ring-4 focus-visible:ring-white/20"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : summary.totalBalances.length > 0 ? (
        <div className="mt-3 grid min-w-0 gap-1.5">
          {summary.totalBalances.map(({ amount, currency }) => (
            <p
              className={`max-w-full break-words font-bold leading-tight tracking-normal tabular-nums ${
                hasMultipleCurrencies
                  ? "text-[26px] sm:text-3xl"
                  : "text-[36px] sm:text-5xl"
              }`}
              key={currency}
            >
              {formatDashboardAmount(amount, currency)}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-2xl font-bold tracking-normal text-white">
          No active accounts
        </p>
      )}

      <p className="mt-3 border-t border-white/10 pt-3 text-xs font-medium leading-5 text-green-50/75">
        {isLoading
          ? "Loading active account balances"
          : errorMessage
            ? errorMessage
            : summary.activeAccountCount > 0
              ? `${accountLabel} · Balances shown by currency`
              : "Add an account to start tracking your balance"}
      </p>
    </section>
  );
}
