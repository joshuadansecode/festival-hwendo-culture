-- Historical gallery covers for the 2025 archives.
-- The remaining album images can be inserted later with the same shape.

insert into public.gallery_items (
  id, title, media_type, url, event_category, edition, media_date
)
values
(
  'gal-miss-endo-2025-01',
  'Miss ENDO-CULTURE - Édition 2',
  'image',
  '/News/miss%20endo%20culture%20edition%202/619678344_896247719824864_714335955224342296_n.jpg',
  'miss-endo',
  'Édition 2 • 2025',
  '2025-11-01'
),
(
  'gal-cuisine-2025-01',
  'Challenge cuisine de Miss ENDO-CULTURE',
  'image',
  '/News/challenge%20cuisine%20edition%202025%20de%20miss%20endo%20culturee/574945799_122198032772334145_3849784051774526817_n.jpg',
  'miss-endo',
  'Challenge cuisine • 2025',
  '2025-11-02'
)
on conflict (id) do update set
  title = excluded.title,
  media_type = excluded.media_type,
  url = excluded.url,
  event_category = excluded.event_category,
  edition = excluded.edition,
  media_date = excluded.media_date;
