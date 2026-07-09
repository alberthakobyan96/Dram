import { dashboardDefaultState } from "../../entities/dashboard";
import { useAuthStore } from "../../entities/auth";
import { supabase } from "../../shared/api/supabase";
import BalanceCard from "./components/BalanceCard";
import DashboardHeader from "./components/DashboardHeader";
import MonthlySummary from "./components/MonthlySummary";
import QuickActions from "./components/QuickActions";
import RecentTransactions from "./components/RecentTransactions";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const displayName =
    typeof user?.user_metadata.full_name === "string"
      ? user.user_metadata.full_name
      : user?.email;

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <DashboardHeader displayName={displayName} onLogout={signOut} />
          <BalanceCard summary={dashboardDefaultState.summary} />
          <MonthlySummary summary={dashboardDefaultState.summary} />
          <QuickActions />
        </div>

        <div className="lg:pt-[120px]">
          <RecentTransactions
            currency={dashboardDefaultState.summary.currency}
            transactions={dashboardDefaultState.transactions}
          />
        </div>
      </div>
    </main>
  );
}
