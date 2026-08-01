-- Prerequisite: create the user first in Authentication > Users > Add user.
-- Replace the email below, then run this script once in SQL Editor.

insert into public.admin_users (user_id, display_name)
select id, 'Administrateur principal'
from auth.users
where lower(email) = lower('emmadedjan@gmail.com')
on conflict (user_id) do update set display_name = excluded.display_name;

-- This must return one row. If it returns zero rows, the Auth user/email does not exist.
select au.user_id, au.display_name, u.email
from public.admin_users au
join auth.users u on u.id = au.user_id;
