-- Run this diagnostic query first in Supabase SQL Editor.
-- It identifies whether the migration, view, function and Storage objects exist.

select 'gallery_items table' as check_name,
       to_regclass('public.gallery_items') is not null as ok;

select 'storage_path column' as check_name,
       exists (
         select 1
         from information_schema.columns
         where table_schema = 'public'
           and table_name = 'gallery_items'
           and column_name = 'storage_path'
       ) as ok;

select 'gallery_items_public view' as check_name,
       to_regclass('public.gallery_items_public') is not null as ok;

select 'import function' as check_name,
       exists (
         select 1
         from pg_proc
         where pronamespace = 'public'::regnamespace
           and proname = 'import_gallery_storage_archives'
       ) as ok;

select bucket_id, name
from storage.objects
where bucket_id = 'festival-media'
order by name;
