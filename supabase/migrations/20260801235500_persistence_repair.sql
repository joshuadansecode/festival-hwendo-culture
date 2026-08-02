-- Ensure core editable records and public media infrastructure exist.
-- Existing administrator changes are preserved with ON CONFLICT DO NOTHING.

insert into storage.buckets (id, name, public)
values ('festival-media', 'festival-media', true)
on conflict (id) do update set public = true;

insert into public.events (
  id, title, subtitle, description, event_date, event_time, location, status, program_items, jury
)
values
  (
    'general',
    'Festival HWENDO-CULTURE 2026',
    'Événement majeur de valorisation des cultures endogènes du Bénin',
    'Rassemblement culturel annuel consacré aux traditions, aux arts et au savoir-faire béninois.',
    '12 au 15 Novembre 2026',
    '09h00 - 23h00',
    'Abomey-Calavi, Bénin',
    'à venir',
    '[]'::jsonb,
    '[]'::jsonb
  ),
  (
    'miss-endo',
    'Concours Miss ENDO-CULTURE',
    'Élection de l’Ambassadrice des Beautés et Valeurs Endogènes',
    'Compétition culturelle récompensant l’intelligence, l’éloquence et l’engagement communautaire.',
    'Vendredi 13 Novembre 2026',
    '19h00',
    'Salle du Peuple de la Mairie d’Abomey-Calavi',
    'à venir',
    '[]'::jsonb,
    '[]'::jsonb
  ),
  (
    'nuit-elegance',
    'La Nuit de l’Élégance Africaine',
    'Top Model-Mannequin Afrique & Concours des Stylistes',
    'Grande soirée consacrée à la mode africaine, au mannequinat culturel et au génie créatif.',
    'Samedi 14 Novembre 2026',
    '20h00',
    'Lieu à confirmer',
    'à venir',
    '[]'::jsonb,
    '[]'::jsonb
  ),
  (
    'match-gala',
    'Grand Match de Gala HWENDO',
    'Ancienne Génération vs Nouvelle Génération',
    'Rencontre sportive fraternelle entre les légendes et les jeunes talents béninois.',
    'Dimanche 15 Novembre 2026',
    '16h00',
    'Terrain Synthétique d’Abomey-Calavi',
    'à venir',
    '[]'::jsonb,
    '[]'::jsonb
  )
on conflict (id) do nothing;

insert into public.voting_config (
  id, price_per_vote_fcfa, currency, is_voting_open,
  show_leaderboard_publicly, min_votes_per_purchase
)
values (true, 200, 'FCFA', false, true, 1)
on conflict (id) do nothing;
