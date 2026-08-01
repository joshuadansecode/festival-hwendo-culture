-- Import automatique des archives de La Nuit de l'Élégance Africaine 2025.
-- Prérequis : téléverser les images dans festival-media sous ces dossiers :
--   nuit-elegance-2025-attestations/
--   nuit-elegance-2025-ellart/
--   nuit-elegance-2025-christys/

insert into public.gallery_items (
  id,
  title,
  media_type,
  url,
  storage_path,
  event_category,
  edition,
  media_date
)
select
  'storage-' || md5(name),
  case
    when name like 'nuit-elegance-2025-attestations/%'
      then 'Remise des attestations aux mannequins et stylistes'
    when name like 'nuit-elegance-2025-ellart/%'
      then 'Collection Ell’Art Créations'
    else 'Collection Christy’s Fashion Store'
  end,
  'image',
  '',
  name,
  'nuit-elegance',
  case
    when name like 'nuit-elegance-2025-attestations/%'
      then 'Attestations • Édition 2 • 2025'
    when name like 'nuit-elegance-2025-ellart/%'
      then 'Ell’Art Créations • Édition 2 • 2025'
    else 'Christy’s Fashion • Édition 2 • 2025'
  end,
  '2025-11-01'
from storage.objects
where bucket_id = 'festival-media'
  and (
    name like 'nuit-elegance-2025-attestations/%'
    or name like 'nuit-elegance-2025-ellart/%'
    or name like 'nuit-elegance-2025-christys/%'
  )
  and lower(name) ~ '\.(jpg|jpeg|png|webp)$'
on conflict (id) do update set
  title = excluded.title,
  storage_path = excluded.storage_path,
  event_category = excluded.event_category,
  edition = excluded.edition,
  media_date = excluded.media_date;

-- Résumé de contrôle par album.
select edition, count(*) as nombre_photos
from public.gallery_items
where storage_path like 'nuit-elegance-2025-%'
group by edition
order by edition;
