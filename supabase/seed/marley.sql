-- Candidate seed for ALLAMOU Kotchami Marley.
-- Upload public/candidates/marley.jpeg to a public Supabase Storage bucket,
-- then replace the image URL before running this statement.

insert into public.participants (
  id, number, name, category, country, community, photo,
  biography, project_description, votes_count, vote_active, socials
)
values (
  'part-tm-17',
  '17',
  'ALLAMOU Kotchami Marley',
  'top-model',
  'Bénin',
  '',
  'REPLACE_WITH_SUPABASE_STORAGE_PUBLIC_URL',
  'Âgé de 21 ans, Marley porte une prestance naturelle et défend une élégance masculine africaine qui mérite d’être célébrée.',
  'Représenter la jeunesse béninoise et l’élégance africaine à travers le mannequinat en hissant haut le drapeau du Bénin.',
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
