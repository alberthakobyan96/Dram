create or replace function public.assert_account_balance_update_allowed()
returns trigger
language plpgsql
as $$
begin
  if old.current_balance is distinct from new.current_balance
    and coalesce(current_setting('dram.allow_balance_update', true), '') <> 'on'
  then
    raise exception 'Account balances can only be changed by secure transaction functions.';
  end if;

  return new;
end;
$$;

drop trigger if exists accounts_protect_balance on public.accounts;
create trigger accounts_protect_balance
before update of current_balance on public.accounts
for each row execute function public.assert_account_balance_update_allowed();

create or replace function public.apply_transaction_balance(
  p_type public.transaction_type,
  p_amount numeric,
  p_account_id uuid,
  p_destination_account_id uuid,
  p_direction integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform set_config('dram.allow_balance_update', 'on', true);

  if p_type = 'income' then
    update public.accounts
    set current_balance = current_balance + (p_amount * p_direction)
    where id = p_account_id;
  elsif p_type = 'expense' then
    update public.accounts
    set current_balance = current_balance - (p_amount * p_direction)
    where id = p_account_id;
  elsif p_type = 'transfer' then
    update public.accounts
    set current_balance = current_balance - (p_amount * p_direction)
    where id = p_account_id;

    update public.accounts
    set current_balance = current_balance + (p_amount * p_direction)
    where id = p_destination_account_id;
  else
    raise exception 'Unsupported transaction type.';
  end if;
end;
$$;

create or replace function public.validate_transaction_input(
  p_user_id uuid,
  p_type public.transaction_type,
  p_amount numeric,
  p_currency public.finance_currency,
  p_category_id uuid,
  p_account_id uuid,
  p_destination_account_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_account_currency public.finance_currency;
  v_destination_currency public.finance_currency;
  v_category_type public.category_type;
begin
  if p_user_id is null then
    raise exception 'Authentication is required.';
  end if;

  if p_amount is null or p_amount <= 0 then
    raise exception 'Transaction amount must be greater than zero.';
  end if;

  select currency
  into v_account_currency
  from public.accounts
  where id = p_account_id
    and user_id = p_user_id
    and is_active = true;

  if v_account_currency is null then
    raise exception 'Account not found or inactive.';
  end if;

  if v_account_currency <> p_currency then
    raise exception 'Transaction currency must match account currency.';
  end if;

  if p_type in ('income', 'expense') then
    if p_destination_account_id is not null then
      raise exception 'Destination account is only allowed for transfers.';
    end if;

    if p_category_id is null then
      raise exception 'Income and expense transactions require a category.';
    end if;

    select type
    into v_category_type
    from public.categories
    where id = p_category_id
      and is_active = true
      and (user_id is null or user_id = p_user_id);

    if v_category_type is null then
      raise exception 'Category not found or inactive.';
    end if;

    if v_category_type <> p_type::text::public.category_type then
      raise exception 'Category type must match transaction type.';
    end if;
  elsif p_type = 'transfer' then
    if p_category_id is not null then
      raise exception 'Transfers cannot have a category.';
    end if;

    if p_destination_account_id is null then
      raise exception 'Transfers require a destination account.';
    end if;

    if p_account_id = p_destination_account_id then
      raise exception 'Transfer source and destination accounts must be different.';
    end if;

    select currency
    into v_destination_currency
    from public.accounts
    where id = p_destination_account_id
      and user_id = p_user_id
      and is_active = true;

    if v_destination_currency is null then
      raise exception 'Destination account not found or inactive.';
    end if;

    if v_destination_currency <> p_currency then
      raise exception 'Transfer currency must match destination account currency.';
    end if;
  else
    raise exception 'Unsupported transaction type.';
  end if;
end;
$$;

create or replace function public.create_transaction(
  p_type public.transaction_type,
  p_amount numeric,
  p_currency public.finance_currency,
  p_account_id uuid,
  p_occurred_at timestamptz,
  p_category_id uuid default null,
  p_destination_account_id uuid default null,
  p_note text default null
)
returns public.transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_transaction public.transactions;
begin
  perform public.validate_transaction_input(
    v_user_id,
    p_type,
    p_amount,
    p_currency,
    p_category_id,
    p_account_id,
    p_destination_account_id
  );

  insert into public.transactions (
    user_id,
    type,
    amount,
    currency,
    category_id,
    account_id,
    destination_account_id,
    occurred_at,
    note
  )
  values (
    v_user_id,
    p_type,
    p_amount,
    p_currency,
    p_category_id,
    p_account_id,
    p_destination_account_id,
    p_occurred_at,
    nullif(trim(p_note), '')
  )
  returning * into v_transaction;

  perform public.apply_transaction_balance(
    p_type,
    p_amount,
    p_account_id,
    p_destination_account_id,
    1
  );

  return v_transaction;
end;
$$;

create or replace function public.update_transaction(
  p_transaction_id uuid,
  p_type public.transaction_type,
  p_amount numeric,
  p_currency public.finance_currency,
  p_account_id uuid,
  p_occurred_at timestamptz,
  p_category_id uuid default null,
  p_destination_account_id uuid default null,
  p_note text default null
)
returns public.transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_old_transaction public.transactions;
  v_new_transaction public.transactions;
begin
  select *
  into v_old_transaction
  from public.transactions
  where id = p_transaction_id
    and user_id = v_user_id
  for update;

  if v_old_transaction.id is null then
    raise exception 'Transaction not found.';
  end if;

  perform public.validate_transaction_input(
    v_user_id,
    p_type,
    p_amount,
    p_currency,
    p_category_id,
    p_account_id,
    p_destination_account_id
  );

  perform public.apply_transaction_balance(
    v_old_transaction.type,
    v_old_transaction.amount,
    v_old_transaction.account_id,
    v_old_transaction.destination_account_id,
    -1
  );

  update public.transactions
  set
    type = p_type,
    amount = p_amount,
    currency = p_currency,
    category_id = p_category_id,
    account_id = p_account_id,
    destination_account_id = p_destination_account_id,
    occurred_at = p_occurred_at,
    note = nullif(trim(p_note), '')
  where id = p_transaction_id
    and user_id = v_user_id
  returning * into v_new_transaction;

  perform public.apply_transaction_balance(
    p_type,
    p_amount,
    p_account_id,
    p_destination_account_id,
    1
  );

  return v_new_transaction;
end;
$$;

create or replace function public.delete_transaction(p_transaction_id uuid)
returns public.transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_transaction public.transactions;
begin
  select *
  into v_transaction
  from public.transactions
  where id = p_transaction_id
    and user_id = v_user_id
  for update;

  if v_transaction.id is null then
    raise exception 'Transaction not found.';
  end if;

  perform public.apply_transaction_balance(
    v_transaction.type,
    v_transaction.amount,
    v_transaction.account_id,
    v_transaction.destination_account_id,
    -1
  );

  delete from public.transactions
  where id = p_transaction_id
    and user_id = v_user_id;

  return v_transaction;
end;
$$;

revoke all on function public.apply_transaction_balance(
  public.transaction_type,
  numeric,
  uuid,
  uuid,
  integer
) from public;

revoke all on function public.validate_transaction_input(
  uuid,
  public.transaction_type,
  numeric,
  public.finance_currency,
  uuid,
  uuid,
  uuid
) from public;

revoke all on function public.create_transaction(
  public.transaction_type,
  numeric,
  public.finance_currency,
  uuid,
  timestamptz,
  uuid,
  uuid,
  text
) from public;

revoke all on function public.update_transaction(
  uuid,
  public.transaction_type,
  numeric,
  public.finance_currency,
  uuid,
  timestamptz,
  uuid,
  uuid,
  text
) from public;

revoke all on function public.delete_transaction(uuid) from public;

grant execute on function public.create_transaction(
  public.transaction_type,
  numeric,
  public.finance_currency,
  uuid,
  timestamptz,
  uuid,
  uuid,
  text
) to authenticated;

grant execute on function public.update_transaction(
  uuid,
  public.transaction_type,
  numeric,
  public.finance_currency,
  uuid,
  timestamptz,
  uuid,
  uuid,
  text
) to authenticated;

grant execute on function public.delete_transaction(uuid) to authenticated;
