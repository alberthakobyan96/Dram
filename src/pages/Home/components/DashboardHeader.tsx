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
    <header className="flex items-start justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2.5">
          <img
            src="/favicon.png"
            alt="DRAM"
            className="size-7 rounded-[10px] sm:size-8 sm:rounded-xl"
          />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">
            DRAM
          </span>
        </div>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.08] tracking-normal text-slate-950 sm:text-4xl">
          {greeting}
          {firstName ? `, ${firstName}` : ""} 👋
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-base">
          Your financial snapshot is ready.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          aria-label="Open profile"
          className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/10 sm:size-11"
          to="/profile"
        >
          <UserRound className="size-5" aria-hidden="true" />
        </Link>
        <button
          aria-label="Sign out"
          className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/10 sm:size-11"
          type="button"
          onClick={onLogout}
        >
          <LogOut className="size-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
