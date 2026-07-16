import { ChevronRight, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { useDashboardData } from "../../features/dashboard/hooks/useDashboardData";
import { supabase } from "../../shared/api/supabase";
import BalanceCard from "./components/BalanceCard";
import DashboardHeader from "./components/DashboardHeader";
import MonthlySummary from "./components/MonthlySummary";
import QuickActions from "./components/QuickActions";
import RecentTransactions from "./components/RecentTransactions";

const getFirstName = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const cleanValue = value.includes("@") ? value.split("@")[0] : value;
  const [firstName] = cleanValue.split(/[\s._-]+/).filter(Boolean);

  if (!firstName) {
    return undefined;
  }

  return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`;
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 5) {
    return "Good night";
  }

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  if (hour < 22) {
    return "Good evening";
  }

  return "Good night";
};

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const dashboard = useDashboardData();
  const displaySource =
    typeof user?.user_metadata.first_name === "string"
      ? user.user_metadata.first_name
      : typeof user?.user_metadata.full_name === "string"
        ? user.user_metadata.full_name
        : undefined;
  const firstName = getFirstName(displaySource);

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-50 px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+12px)] text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-6xl gap-3 sm:gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid min-w-0 gap-3 sm:gap-6">
          <DashboardHeader
            firstName={firstName}
            greeting={getGreeting()}
            onLogout={signOut}
          />
          <BalanceCard
            errorMessage={dashboard.balance.errorMessage}
            isLoading={dashboard.balance.isLoading}
            onRetry={dashboard.balance.retry}
            summary={dashboard.summary}
          />
          <QuickActions />
          <section className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-950/[0.03] sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-[17px] font-semibold text-slate-950">
                Accounts
              </h2>
              <Link
                aria-label="Open accounts"
                className="inline-flex min-h-11 items-center gap-1 rounded-xl px-1 text-sm font-semibold text-green-700 outline-none transition hover:text-green-800 focus-visible:ring-4 focus-visible:ring-green-600/10"
                to="/accounts"
              >
                View
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <Link
              className="flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5 outline-none transition hover:bg-green-50 focus-visible:ring-4 focus-visible:ring-green-600/10"
              to="/accounts"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                  <WalletCards className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-950">
                    Cash, cards, and bank accounts
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500 sm:text-sm">
                    Manage balances and account status
                  </span>
                </span>
              </span>
              <ChevronRight
                className="size-5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </Link>
          </section>
          <MonthlySummary
            errorMessage={dashboard.monthly.errorMessage}
            isLoading={dashboard.monthly.isLoading}
            onRetry={dashboard.monthly.retry}
            summary={dashboard.summary}
          />
        </div>

        <div className="min-w-0 lg:pt-[94px]">
          <RecentTransactions
            errorMessage={dashboard.recent.errorMessage}
            isLoading={dashboard.recent.isLoading}
            onRetry={dashboard.recent.retry}
            transactions={dashboard.transactions}
          />
        </div>
      </div>
    </main>
  );
}
