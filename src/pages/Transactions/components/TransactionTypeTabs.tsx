import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
} from "lucide-react";
import {
  transactionTypeDescriptions,
  transactionTypeLabels,
  transactionTypes,
  type TransactionType,
} from "../../../entities/transactions";

type TransactionTypeTabsProps = {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
};

const icons = {
  expense: ArrowUpRight,
  income: ArrowDownLeft,
  transfer: ArrowLeftRight,
};

export default function TransactionTypeTabs({
  value,
  onChange,
}: TransactionTypeTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-[22px] bg-slate-100 p-1 sm:gap-2 sm:rounded-[26px] sm:p-1.5">
      {transactionTypes.map((type) => {
        const Icon = icons[type];
        const isActive = value === type;

        return (
          <button
            aria-pressed={isActive}
            className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[18px] px-2 text-xs font-bold transition outline-none focus-visible:ring-4 focus-visible:ring-green-600/10 sm:min-h-16 sm:gap-1 sm:rounded-2xl sm:text-sm ${
              isActive
                ? "bg-white text-green-700 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
            key={type}
            onClick={() => onChange(type)}
            title={transactionTypeDescriptions[type]}
            type="button"
          >
            <Icon className="size-4 sm:size-5" aria-hidden="true" />
            {transactionTypeLabels[type]}
          </button>
        );
      })}
    </div>
  );
}
