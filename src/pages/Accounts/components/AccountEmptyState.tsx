import { WalletCards } from "lucide-react";
import Button from "../../../shared/components/Button";

type AccountEmptyStateProps = {
  onCreate: () => void;
};

export default function AccountEmptyState({ onCreate }: AccountEmptyStateProps) {
  return (
    <section className="rounded-[28px] border border-dashed border-green-200 bg-white p-8 text-center shadow-xl shadow-slate-950/[0.04]">
      <div className="mx-auto flex size-14 items-center justify-center rounded-3xl bg-green-50 text-green-700">
        <WalletCards className="size-7" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">
        No accounts yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Add cash, cards, or bank accounts to start building your financial
        picture.
      </p>
      <Button className="mx-auto mt-6 max-w-xs" onClick={onCreate} type="button">
        Create first account
      </Button>
    </section>
  );
}
