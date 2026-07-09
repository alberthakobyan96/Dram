import { LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardHeaderProps = {
  displayName?: string;
  onLogout: () => void;
};

export default function DashboardHeader({
  displayName,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="DRAM"
            className="size-8 rounded-xl"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            DRAM
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
          Good to see you{displayName ? `, ${displayName}` : ""}
        </h1>
        <p className="mt-2 text-base leading-7 text-slate-500">
          Your financial snapshot is ready.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          aria-label="Open profile"
          className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/10"
          to="/profile"
        >
          <UserRound className="size-5" aria-hidden="true" />
        </Link>
        <button
          aria-label="Sign out"
          className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-green-600/10"
          type="button"
          onClick={onLogout}
        >
          <LogOut className="size-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
