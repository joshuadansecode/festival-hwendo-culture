-- Remove only the three fictional Top Model records from the original prototype.
-- This does not affect the real candidates (part-tm-01-new through part-tm-18)
-- or the Miss ENDO-CULTURE records.

delete from public.participants
where id in ('part-tm-01', 'part-tm-02', 'part-tm-03');
