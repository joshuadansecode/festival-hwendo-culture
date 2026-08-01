-- Candidate seed for VLAVONOU Nélly Rose.
-- Upload public/candidates/nelly-rose.jpeg to a public Supabase Storage bucket
-- (for example, "festival-media") before running this statement, then replace
-- the placeholder URL with the resulting public URL.

insert into public.participants (
  id,
  number,
  name,
  category,
  country,
  community,
  photo,
  biography,
  project_description,
  votes_count,
  vote_active,
  socials
)
values (
  'part-tm-18',
  '18',
  'VLAVONOU Nélly Rose',
  'top-model',
  'Bénin',
  '',
  'REPLACE_WITH_SUPABASE_STORAGE_PUBLIC_URL',
  'Âgée de 19 ans, Nélly Rose défend une mode qui raconte l’Afrique d’aujourd’hui et célèbre les différentes façons d’être belle.',
  'Développer son potentiel dans le mannequinat et montrer au monde la richesse des talents africains.',
  0,
  true,
  '{"facebook":"https://facebook.com/festivalhwendoculture","instagram":"https://instagram.com/festivalhwendoculture","tiktok":"https://tiktok.com/@festivalhwendoculture"}'::jsonb
)
on conflict (id) do update set
  number = excluded.number,
  name = excluded.name,
  category = excluded.category,
  country = excluded.country,
  community = excluded.community,
  photo = excluded.photo,
  biography = excluded.biography,
  project_description = excluded.project_description,
  vote_active = excluded.vote_active,
  socials = excluded.socials;
