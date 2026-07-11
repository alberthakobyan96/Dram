import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

type AccountsHeaderProps = {
  isCreating: boolean;
  onCreate: () => void;
};

export default function AccountsHeader({
  isCreating,
  onCreate,
}: AccountsHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-green-700 focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Dashboard
        </Link>
        <div className="mt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Accounts
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Manage your money sources
          </h1>
          <p className="mt-2 max-w-xl text-base text-slate-500">
            Create and organize the accounts that power your DRAM dashboard.
          </p>
        </div>
      </div>

      <Button
        className="sm:w-auto"
        disabled={isCreating}
        onClick={onCreate}
        type="button"
      >
        <Plus className="size-5" aria-hidden="true" />
        New account
      </Button>
    </header>
  );
}
