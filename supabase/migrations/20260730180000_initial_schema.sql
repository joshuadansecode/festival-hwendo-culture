-- HWENDO-CULTURE initial database schema.
-- Run this migration in Supabase SQL Editor. Review seed data before production use.

create extension if not exists pgcrypto;

create type public.event_status as enum ('à venir', 'en cours', 'terminé');
create type public.participant_category as enum (
  'miss-endo', 'top-model', 'styliste', 'match-gala-old', 'match-gala-new'
);
create type public.member_category as enum ('bureau', 'commission', 'jury');
create type public.news_category as enum ('Annonce', 'Résultat', 'Interview', 'Vote', 'Culture');
create type public.media_type as enum ('image', 'video');
create type public.partner_category as enum (
  'Sponsor Officiel', 'Média Partner', 'Institution', 'Partenaire Technique'
);
create type public.payment_method as enum (
  'MTN Mobile Money', 'Moov Money', 'Celtiis Cash', 'Carte Bancaire'
);
create type public.payment_status as enum ('reussi', 'en_attente', 'echoue', 'rembourse');

create table public.events (
  id text primary key,
  title text not null,
  subtitle text not null default '',
  logo_url text,
  description text not null default '',
  event_date text not null default '',
  event_time text not null default '',
  location text not null default '',
  status public.event_status not null default 'à venir',
  program_items jsonb not null default '[]'::jsonb,
  jury jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.participants (
  id text primary key,
  number text not null,
  name text not null,
  category public.participant_category not null,
  country text not null default 'Bénin',
  community text not null default '',
  photo text not null default '',
  biography text not null default '',
  project_description text,
  votes_count bigint not null default 0 check (votes_count >= 0),
  vote_active boolean not null default true,
  socials jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.committee_members (
  id text primary key,
  name text not null,
  role text not null,
  category public.member_category not null,
  photo text not null default '',
  biography text not null default '',
  whatsapp text,
  facebook text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news (
  id text primary key,
  title text not null,
  slug text not null unique,
  category public.news_category not null,
  summary text not null default '',
  content text not null default '',
  image text not null default '',
  published_date text not null default '',
  author text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id text primary key,
  title text not null,
  media_type public.media_type not null default 'image',
  url text not null,
  thumbnail_url text,
  event_category text not null default 'general',
  edition text not null default '',
  media_date text not null default '',
  created_at timestamptz not null default now()
);

create table public.partners (
  id text primary key,
  name text not null,
  logo text not null default '',
  category public.partner_category not null,
  website_url text,
  description text,
  created_at timestamptz not null default now()
);

create table public.program_activities (
  id text primary key,
  activity_date text not null default '',
  activity_time text not null default '',
  title text not null,
  event_category text not null default 'general',
  location text not null default '',
  description text not null default '',
  status public.event_status not null default 'à venir',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.voting_config (
  id boolean primary key default true check (id),
  price_per_vote_fcfa integer not null default 100 check (price_per_vote_fcfa > 0),
  currency text not null default 'FCFA',
  start_date timestamptz,
  end_date timestamptz,
  is_voting_open boolean not null default false,
  show_leaderboard_publicly boolean not null default true,
  min_votes_per_purchase integer not null default 1 check (min_votes_per_purchase > 0),
  updated_at timestamptz not null default now()
);

create table public.vote_transactions (
  id uuid primary key default gen_random_uuid(),
  receipt_number text not null unique,
  participant_id text not null references public.participants(id),
  quantity integer not null check (quantity > 0),
  price_per_vote_fcfa integer not null check (price_per_vote_fcfa > 0),
  total_amount_fcfa integer not null check (total_amount_fcfa > 0),
  voter_name text not null default 'Anonyme',
  voter_phone text not null,
  payment_method public.payment_method not null,
  status public.payment_status not null default 'en_attente',
  transaction_ref text,
  created_at timestamptz not null default now()
);

create index participants_category_idx on public.participants(category);
create index participants_votes_idx on public.participants(votes_count desc);
create index transactions_participant_idx on public.vote_transactions(participant_id);
create index transactions_status_idx on public.vote_transactions(status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_updated_at before update on public.events
for each row execute function public.set_updated_at();
create trigger participants_updated_at before update on public.participants
for each row execute function public.set_updated_at();
create trigger committee_members_updated_at before update on public.committee_members
for each row execute function public.set_updated_at();
create trigger news_updated_at before update on public.news
for each row execute function public.set_updated_at();
create trigger program_activities_updated_at before update on public.program_activities
for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.participants enable row level security;
alter table public.committee_members enable row level security;
alter table public.news enable row level security;
alter table public.gallery_items enable row level security;
alter table public.partners enable row level security;
alter table public.program_activities enable row level security;
alter table public.faqs enable row level security;
alter table public.voting_config enable row level security;
alter table public.vote_transactions enable row level security;

-- Public content is readable. Writes require an authenticated admin policy later.
create policy "public can read events" on public.events for select using (true);
create policy "public can read participants" on public.participants for select using (true);
create policy "public can read committee" on public.committee_members for select using (true);
create policy "public can read news" on public.news for select using (true);
create policy "public can read gallery" on public.gallery_items for select using (true);
create policy "public can read partners" on public.partners for select using (true);
create policy "public can read program" on public.program_activities for select using (true);
create policy "public can read faqs" on public.faqs for select using (true);
create policy "public can read voting config" on public.voting_config for select using (true);

-- Transactions are intentionally not publicly readable or writable.
-- Production vote creation must go through a server-side payment webhook.
