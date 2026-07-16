import { LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardHeaderProps = {
  firstName?: string;
  greeting: string;
  onLogout: () => void;
};

export default function DashboardHeader({
  firstName,
  greeting,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="grid min-w-0 gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex min-w-0 items-center gap-2.5">
          <img
            src="/favicon.png"
            alt="DRAM"
            className="size-7 shrink-0 rounded-[10px] sm:size-8 sm:rounded-xl"
          />
          <span className="truncate text-sm font-bold uppercase tracking-[0.18em] text-green-700">
            DRAM
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            aria-label="Open profile"
            className="flex size-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/15"
            to="/profile"
          >
            <UserRound className="size-5" aria-hidden="true" />
          </Link>
          <button
            aria-label="Sign out"
            className="flex size-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/15"
            type="button"
            onClick={onLogout}
          >
            <LogOut className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium leading-5 text-slate-500">
          {greeting},
        </p>
        <h1 className="mt-0.5 truncate text-[28px] font-bold leading-[1.08] tracking-normal text-slate-950 sm:text-4xl">
          {firstName ?? "Welcome"} <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 text-sm leading-5 text-slate-500 sm:text-base">
          Your financial snapshot is ready.
        </p>
      </div>
    </header>
  );
}
