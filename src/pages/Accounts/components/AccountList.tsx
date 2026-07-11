import type { Account } from "../../../entities/accounts";
import AccountCard from "./AccountCard";

type AccountListProps = {
  accounts: Account[];
  onDelete: (account: Account) => void;
  onEdit: (account: Account) => void;
  onToggleStatus: (account: Account) => void;
};

export default function AccountList({
  accounts,
  onDelete,
  onEdit,
  onToggleStatus,
}: AccountListProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {accounts.map((account) => (
        <AccountCard
          account={account}
          key={account.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </section>
  );
}
