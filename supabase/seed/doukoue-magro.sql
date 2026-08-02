-- Candidate 19: Doukoué Magro.
-- Replace the temporary image URL after uploading the official visual.

insert into public.participants (
  id, number, name, category, country, community, photo,
  biography, project_description, votes_count, vote_active, socials
)
values (
  'part-tm-19',
  '19',
  'Doukoué Magro',
  'top-model',
  'Guinée',
  '',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  'Originaire de Guinée, Doukoué Magro incarne l’élégance, le charisme et la fierté de la jeunesse africaine.',
  'Valoriser l’identité culturelle du continent et démontrer que la mode est un puissant moyen d’expression, de rassemblement et de promotion des richesses africaines.',
  0,
  true,
  '{}'::jsonb
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
