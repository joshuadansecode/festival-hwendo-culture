-- Repair script: safe to run even if the migration was partially executed.
-- Run this entire script, not only the final SELECT.

alter table public.gallery_items
  add column if not exists storage_path text;

create or replace view public.gallery_items_public as
select
  g.id,
  g.title,
  g.media_type,
  case
    when g.storage_path is not null and g.storage_path <> '' then
      'https://lggoklxtjfqxtafwubrs.supabase.co/storage/v1/object/public/festival-media/' || g.storage_path
    else g.url
  end as public_url,
  g.thumbnail_url,
  g.event_category,
  g.edition,
  g.media_date,
  g.created_at
from public.gallery_items g;

grant select on public.gallery_items_public to anon, authenticated;

create or replace function public.import_gallery_storage_archives()
returns integer
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  imported_count integer := 0;
  object_row record;
  archive_name text;
  archive_edition text;
  generated_id text;
begin
  for object_row in
    select name
    from storage.objects
    where bucket_id = 'festival-media'
      and (name like 'miss-endo-2025/%' or name like 'challenge-cuisine-2025/%')
      and lower(name) ~ '\\.(jpg|jpeg|png|webp)$'
  loop
    if object_row.name like 'miss-endo-2025/%' then
      archive_name := 'Miss ENDO-CULTURE - Édition 2';
      archive_edition := 'Édition 2 • 2025';
    else
      archive_name := 'Challenge cuisine de Miss ENDO-CULTURE';
      archive_edition := 'Challenge cuisine • 2025';
    end if;

    generated_id := 'storage-' || md5(object_row.name);

    insert into public.gallery_items (
      id, title, media_type, url, storage_path, event_category, edition, media_date
    ) values (
      generated_id, archive_name, 'image', '', object_row.name, 'miss-endo', archive_edition, '2025-11-01'
    )
    on conflict (id) do update set
      title = excluded.title,
      storage_path = excluded.storage_path,
      edition = excluded.edition;

    imported_count := imported_count + 1;
  end loop;

  return imported_count;
end;
$$;

revoke all on function public.import_gallery_storage_archives() from public;
grant execute on function public.import_gallery_storage_archives() to authenticated;

select public.import_gallery_storage_archives() as imported_count;

select id, title, storage_path, public_url, edition
from public.gallery_items_public
where storage_path is not null
order by edition, storage_path;
