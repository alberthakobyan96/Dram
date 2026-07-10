create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'account_type') then
    create type public.account_type as enum ('cash', 'bank_card', 'bank_account');
  end if;

  if not exists (select 1 from pg_type where typname = 'finance_currency') then
    create type public.finance_currency as enum ('AMD', 'USD', 'EUR');
  end if;

  if not exists (select 1 from pg_type where typname = 'category_type') then
    create type public.category_type as enum ('income', 'expense');
  end if;

  if not exists (select 1 from pg_type where typname = 'transaction_type') then
    create type public.transaction_type as enum ('income', 'expense', 'transfer');
  end if;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  type public.account_type not null,
  currency public.finance_currency not null,
  current_balance numeric(18,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  type public.category_type not null,
  icon text not null check (char_length(trim(icon)) > 0),
  color text,
  is_default boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_default_owner_check check (
    (is_default = true and user_id is null)
    or (is_default = false and user_id is not null)
  )
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.transaction_type not null,
  amount numeric(18,2) not null check (amount > 0),
  currency public.finance_currency not null,
  category_id uuid references public.categories(id),
  account_id uuid not null references public.accounts(id),
  destination_account_id uuid references public.accounts(id),
  occurred_at timestamptz not null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transactions_shape_check check (
    (
      type in ('income', 'expense')
      and category_id is not null
      and destination_account_id is null
    )
    or (
      type = 'transfer'
      and category_id is null
      and destination_account_id is not null
      and account_id <> destination_account_id
    )
  )
);

create index if not exists accounts_user_id_is_active_idx
  on public.accounts (user_id, is_active);

create index if not exists categories_user_id_type_is_active_idx
  on public.categories (user_id, type, is_active);

create index if not exists categories_default_type_idx
  on public.categories (type, is_default)
  where is_default = true;

create unique index if not exists categories_default_name_type_idx
  on public.categories (lower(name), type)
  where is_default = true;

create unique index if not exists categories_user_name_type_idx
  on public.categories (user_id, lower(name), type)
  where user_id is not null;

create index if not exists transactions_user_id_occurred_at_idx
  on public.transactions (user_id, occurred_at desc);

create index if not exists transactions_account_id_idx
  on public.transactions (account_id);

create index if not exists transactions_destination_account_id_idx
  on public.transactions (destination_account_id);

create index if not exists transactions_category_id_idx
  on public.transactions (category_id);

drop trigger if exists accounts_set_updated_at on public.accounts;
create trigger accounts_set_updated_at
before update on public.accounts
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at
before update on public.transactions
for each row execute function public.set_updated_at();
