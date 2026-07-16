import { ArrowUpRight, WalletCards } from "lucide-react";
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
    <section className="overflow-hidden rounded-[28px] bg-green-950 p-5 text-white shadow-xl shadow-green-950/15 sm:rounded-[32px] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-green-100/80">
            Total balance
          </p>

          {isLoading ? (
            <div className="mt-3 grid gap-2" aria-label="Loading balances">
              <div className="h-8 w-44 animate-pulse rounded-xl bg-white/15" />
              <div className="h-6 w-32 animate-pulse rounded-lg bg-white/10" />
            </div>
          ) : errorMessage ? (
            <p className="mt-2 text-2xl font-bold tracking-normal text-white sm:mt-3 sm:text-3xl">
              Balance unavailable
            </p>
          ) : summary.totalBalances.length > 0 ? (
            <div
              className={`mt-2 flex flex-wrap gap-x-5 gap-y-1.5 sm:mt-3 ${
                hasMultipleCurrencies ? "items-baseline" : ""
              }`}
            >
              {summary.totalBalances.map(({ amount, currency }) => (
                <p
                  className={
                    hasMultipleCurrencies
                      ? "text-2xl font-bold leading-none tracking-normal sm:text-3xl"
                      : "text-[34px] font-bold leading-none tracking-normal sm:text-5xl"
                  }
                  key={currency}
                >
                  {formatDashboardAmount(amount, currency)}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-2xl font-bold tracking-normal text-white sm:mt-3 sm:text-3xl">
              No active accounts
            </p>
          )}
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-green-100 sm:size-12">
          <WalletCards className="size-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur sm:mt-7 sm:p-4">
        <p className="min-w-0 text-sm leading-5 text-green-50/85">
          {isLoading
            ? "Loading active account balances."
            : errorMessage
              ? errorMessage
              : summary.activeAccountCount > 0
                ? `${accountLabel}, grouped by currency.`
                : "Add an account to start tracking your balance."}
        </p>

        {errorMessage && !isLoading ? (
          <button
            className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-green-50 outline-none transition hover:bg-white/15 focus-visible:ring-4 focus-visible:ring-white/15"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-300/15 px-3 py-1 text-xs font-bold text-green-100">
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            Secure
          </span>
        )}
      </div>
    </section>
  );
}
