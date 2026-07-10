alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

revoke update on public.accounts from anon, authenticated;
grant update (name, type, currency, is_active) on public.accounts to authenticated;

drop policy if exists "Users can read own accounts" on public.accounts;
create policy "Users can read own accounts"
on public.accounts
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create own accounts" on public.accounts;
create policy "Users can create own accounts"
on public.accounts
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update own accounts" on public.accounts;
create policy "Users can update own accounts"
on public.accounts
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can delete own accounts" on public.accounts;
create policy "Users can delete own accounts"
on public.accounts
for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can read default and own categories" on public.categories;
create policy "Users can read default and own categories"
on public.categories
for select
to authenticated
using (user_id is null or user_id = auth.uid());

drop policy if exists "Users can create own custom categories" on public.categories;
create policy "Users can create own custom categories"
on public.categories
for insert
to authenticated
with check (user_id = auth.uid() and is_default = false);

drop policy if exists "Users can update own custom categories" on public.categories;
create policy "Users can update own custom categories"
on public.categories
for update
to authenticated
using (user_id = auth.uid() and is_default = false)
with check (user_id = auth.uid() and is_default = false);

drop policy if exists "Users can delete own custom categories" on public.categories;
create policy "Users can delete own custom categories"
on public.categories
for delete
to authenticated
using (user_id = auth.uid() and is_default = false);

drop policy if exists "Users can read own transactions" on public.transactions;
create policy "Users can read own transactions"
on public.transactions
for select
to authenticated
using (user_id = auth.uid());

-- Transaction writes are intentionally not exposed through direct table RLS
-- policies. Use the secure PostgreSQL functions in 004_transaction_functions.sql
-- so transaction rows and account balance changes happen atomically.
