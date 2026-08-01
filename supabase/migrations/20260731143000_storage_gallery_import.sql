-- Gallery Storage automation for the public festival-media bucket.
-- Run after the initial schema migration.

alter table public.gallery_items
  add column if not exists storage_path text;

create or replace view public.gallery_items_public as
select
  g.id,
  g.title,
  g.media_type,
  coalesce(
    g.url,
    'https://lggoklxtjfqxtafwubrs.supabase.co/storage/v1/object/public/festival-media/' || g.storage_path
  ) as public_url,
  g.thumbnail_url,
  g.event_category,
  g.edition,
  g.media_date,
  g.created_at
from public.gallery_items g;

grant select on public.gallery_items_public to anon, authenticated;

-- Imports every object currently present in the two archive folders.
-- It is safe to run repeatedly: the generated id is deterministic.
create or replace function public.import_gallery_storage_archives()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  imported_count integer := 0;
  object_row record;
  relative_path text;
  archive_name text;
  archive_edition text;
  archive_category text := 'miss-endo';
  generated_id text;
begin
  for object_row in
    select name
    from storage.objects
    where bucket_id = 'festival-media'
      and (
        name like 'miss-endo-2025/%'
        or name like 'challenge-cuisine-2025/%'
      )
      and lower(name) ~ '\\.(jpg|jpeg|png|webp)$'
  loop
    relative_path := object_row.name;
    if relative_path like 'miss-endo-2025/%' then
      archive_name := 'Miss ENDO-CULTURE - Édition 2';
      archive_edition := 'Édition 2 • 2025';
    else
      archive_name := 'Challenge cuisine de Miss ENDO-CULTURE';
      archive_edition := 'Challenge cuisine • 2025';
    end if;

    generated_id := 'storage-' || md5(relative_path);

    insert into public.gallery_items (
      id,
      title,
      media_type,
      url,
      storage_path,
      event_category,
      edition,
      media_date
    ) values (
      generated_id,
      archive_name,
      'image',
      '',
      relative_path,
      archive_category,
      archive_edition,
      '2025-11-01'
    )
    on conflict (id) do update set
      storage_path = excluded.storage_path,
      title = excluded.title,
      edition = excluded.edition;

    imported_count := imported_count + 1;
  end loop;

  return imported_count;
end;
$$;

revoke all on function public.import_gallery_storage_archives() from public;
grant execute on function public.import_gallery_storage_archives() to authenticated;

-- Storage is public for reads. Upload/delete remains an administrator operation.
drop policy if exists "public can read festival media" on storage.objects;
create policy "public can read festival media"
on storage.objects for select
to public
using (bucket_id = 'festival-media');
