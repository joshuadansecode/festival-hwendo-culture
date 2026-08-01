-- Production administration support: immutable activity journal.

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_activity_created_idx
  on public.admin_activity_logs(created_at desc);
create index if not exists admin_activity_entity_idx
  on public.admin_activity_logs(entity_type, entity_id);

alter table public.admin_activity_logs enable row level security;

drop policy if exists "admins read activity logs" on public.admin_activity_logs;
create policy "admins read activity logs" on public.admin_activity_logs
for select to authenticated using (public.is_admin());

drop policy if exists "admins create activity logs" on public.admin_activity_logs;
create policy "admins create activity logs" on public.admin_activity_logs
for insert to authenticated
with check (public.is_admin() and admin_user_id = auth.uid());

-- Logs are intentionally immutable from the browser: no update/delete policy.
