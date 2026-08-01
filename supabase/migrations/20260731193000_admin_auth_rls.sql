-- Secure administration with Supabase Auth and row-level security.
-- Run once after the initial schema migration.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Administrateur',
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins can read own role" on public.admin_users;
create policy "admins can read own role"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

-- Authenticated administrators manage editorial content.
drop policy if exists "admins manage participants" on public.participants;
create policy "admins manage participants" on public.participants
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage events" on public.events;
create policy "admins manage events" on public.events
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage committee" on public.committee_members;
create policy "admins manage committee" on public.committee_members
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage news" on public.news;
create policy "admins manage news" on public.news
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage gallery" on public.gallery_items;
create policy "admins manage gallery" on public.gallery_items
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage partners" on public.partners;
create policy "admins manage partners" on public.partners
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage program" on public.program_activities;
create policy "admins manage program" on public.program_activities
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage faqs" on public.faqs;
create policy "admins manage faqs" on public.faqs
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage voting config" on public.voting_config;
create policy "admins manage voting config" on public.voting_config
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins read transactions" on public.vote_transactions;
create policy "admins read transactions" on public.vote_transactions
for select to authenticated using (public.is_admin());

-- Public media remains readable; only administrators can change Storage files.
drop policy if exists "admins upload festival media" on storage.objects;
create policy "admins upload festival media" on storage.objects
for insert to authenticated with check (bucket_id = 'festival-media' and public.is_admin());

drop policy if exists "admins update festival media" on storage.objects;
create policy "admins update festival media" on storage.objects
for update to authenticated using (bucket_id = 'festival-media' and public.is_admin())
with check (bucket_id = 'festival-media' and public.is_admin());

drop policy if exists "admins delete festival media" on storage.objects;
create policy "admins delete festival media" on storage.objects
for delete to authenticated using (bucket_id = 'festival-media' and public.is_admin());
