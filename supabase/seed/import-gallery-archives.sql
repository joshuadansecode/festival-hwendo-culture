-- Run after migration 20260731143000_storage_gallery_import.sql.
-- This returns the number of imported image objects.
select public.import_gallery_storage_archives();

-- Verification: inspect imported records and generated public URLs.
select id, title, storage_path, public_url, edition
from public.gallery_items_public
where storage_path is not null
order by edition, storage_path;
