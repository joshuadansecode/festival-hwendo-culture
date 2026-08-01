-- LeekPay checkout tracking and idempotent vote settlement.

alter table public.vote_transactions
  add column if not exists checkout_id text unique,
  add column if not exists leekpay_status text;

create index if not exists vote_transactions_checkout_idx
  on public.vote_transactions(checkout_id);

create or replace function public.settle_vote_transaction(transaction_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  transaction_row public.vote_transactions;
begin
  select * into transaction_row
  from public.vote_transactions
  where id = transaction_id and status = 'reussi';

  if not found then return; end if;

  update public.participants
  set votes_count = votes_count + transaction_row.quantity,
      updated_at = now()
  where id = transaction_row.participant_id;
end;
$$;

revoke all on function public.settle_vote_transaction(uuid) from public, anon, authenticated;

-- Only the server-side webhook may create/update vote transactions.
-- Existing RLS policies intentionally do not grant public insert/update access.
