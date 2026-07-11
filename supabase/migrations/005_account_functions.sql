create or replace function public.create_account(
  p_name text,
  p_type public.account_type,
  p_currency public.finance_currency,
  p_initial_balance numeric default 0
)
returns public.accounts
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_account public.accounts;
begin
  if v_user_id is null then
    raise exception 'Authentication is required.';
  end if;

  if p_name is null or char_length(trim(p_name)) = 0 then
    raise exception 'Account name is required.';
  end if;

  if p_initial_balance is null then
    raise exception 'Initial balance is required.';
  end if;

  if p_initial_balance < 0 then
    raise exception 'Initial balance must be greater than or equal to zero.';
  end if;

  insert into public.accounts (
    user_id,
    name,
    type,
    currency,
    current_balance
  )
  values (
    v_user_id,
    trim(p_name),
    p_type,
    p_currency,
    p_initial_balance
  )
  returning * into v_account;

  return v_account;
end;
$$;

create or replace function public.prevent_account_currency_change_with_transactions()
returns trigger
language plpgsql
as $$
begin
  if old.currency is distinct from new.currency
    and exists (
      select 1
      from public.transactions
      where user_id = old.user_id
        and (account_id = old.id or destination_account_id = old.id)
      limit 1
    )
  then
    raise exception 'Account currency cannot be changed after transactions exist.';
  end if;

  return new;
end;
$$;

drop trigger if exists accounts_prevent_currency_change_with_transactions on public.accounts;
create trigger accounts_prevent_currency_change_with_transactions
before update of currency on public.accounts
for each row execute function public.prevent_account_currency_change_with_transactions();

create or replace function public.prevent_account_delete_with_transactions()
returns trigger
language plpgsql
as $$
begin
  if exists (
    select 1
    from public.transactions
    where user_id = old.user_id
      and (account_id = old.id or destination_account_id = old.id)
    limit 1
  ) then
    raise exception 'Account cannot be deleted because it has transactions. Deactivate the account instead.';
  end if;

  return old;
end;
$$;

drop trigger if exists accounts_prevent_delete_with_transactions on public.accounts;
create trigger accounts_prevent_delete_with_transactions
before delete on public.accounts
for each row execute function public.prevent_account_delete_with_transactions();

revoke all on function public.create_account(
  text,
  public.account_type,
  public.finance_currency,
  numeric
) from public;
revoke execute on function public.create_account(
  text,
  public.account_type,
  public.finance_currency,
  numeric
) from anon;
grant execute on function public.create_account(
  text,
  public.account_type,
  public.finance_currency,
  numeric
) to authenticated;

revoke all on function public.prevent_account_currency_change_with_transactions()
from public;
revoke execute on function public.prevent_account_currency_change_with_transactions()
from anon, authenticated;

revoke all on function public.prevent_account_delete_with_transactions()
from public;
revoke execute on function public.prevent_account_delete_with_transactions()
from anon, authenticated;
