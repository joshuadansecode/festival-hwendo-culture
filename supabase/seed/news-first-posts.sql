-- First official Festival HWENDO-CULTURE announcements.
-- Replace /News/... paths with Supabase Storage public URLs before production.

insert into public.news (id, title, slug, category, summary, content, image, published_date, author, featured)
values
('news-miss-coming-soon', 'Miss Endo-Culture arrive : l’élégance et la culture ont un nouveau visage', 'miss-endo-culture-arrive', 'Annonce', 'Le Festival Hwendo-Culture annonce le lancement du concours Miss Endo-Culture.', 'Dans la continuité de notre engagement pour la promotion des talents culturels, le Festival Hwendo-Culture est fier d’annoncer le lancement de Miss Endo-Culture. Cette compétition est ouverte aux jeunes femmes désireuses de porter haut les valeurs de l’élégance, de la culture et du patrimoine africain. Informations et inscriptions : WhatsApp +229 01 60 74 44 15. Page Facebook : Miss Endo-Culture. Les dates, critères et modalités seront communiqués prochainement. Restez connectés.', '/News/miss%20endo%20culture%20cooming%20sung.jpg', '2026-06-01', 'Festival Hwendo-Culture', true),
('news-sponsors-nuit-elegance', 'Votre marque a une histoire. La Nuit de l’Élégance Africaine a une scène.', 'appel-partenaires-sponsors-nuit-elegance', 'Annonce', 'Le festival ouvre ses partenariats aux entreprises, marques et institutions.', 'La Nuit de l’Élégance Africaine, 3ème édition, est un rendez-vous culturel, une vitrine médiatique et une plateforme d’influence. Nous recherchons des sponsors et partenaires dans les domaines média, logistique, financier et technique. Contact : WhatsApp +229 01 60 74 44 15. Email : ajdcas.benin02@gmail.com.', '/News/appel%20aux%20partenaire%20et%20sponsors.jpg', '2026-06-15', 'Festival Hwendo-Culture', false),
('news-stands-disponibles', 'Votre stand vous attend : places limitées', 'stands-disponibles-nuit-elegance', 'Annonce', 'Des stands sont disponibles pour les exposants, artisans, artistes, restaurateurs et marques.', 'Le Festival Hwendo-Culture vous ouvre ses portes pour La Nuit de l’Élégance Africaine, 3ème édition. Réservez dès maintenant au +229 01 60 74 44 15.', '/News/stands%20disponible.jpg', '2026-06-16', 'Festival Hwendo-Culture', false),
('news-inscriptions-nuit-elegance', 'Appel à inscriptions : La Nuit de l’Élégance Africaine 3', 'inscriptions-nuit-elegance-africaine-3', 'Annonce', 'Les inscriptions sont ouvertes aux mannequins, jeunes créateurs, stylistes et passionnés de mode africaine.', 'Les inscriptions sont ouvertes jusqu’au 30 juin 2026. Formulaire : https://forms.gle/F4AM5ng6kYEffKXs5. Informations : WhatsApp +229 60 74 44 15.', '/News/la%20nuit%20de%20l%27elegance%20inscription%20aux%20%20concours.jpg', '2026-06-01', 'Festival Hwendo-Culture', true),
('news-ambassadeurs-benevoles', 'Devenez ambassadeur ou ambassadrice bénévole du Festival', 'ambassadeurs-benevoles-festival-2026', 'Annonce', 'Le festival recrute des ambassadeurs et ambassadrices bénévoles.', 'Rejoignez les ambassadeurs bénévoles du Festival Hwendo-Culture 2026. Formulaire : https://forms.gle/bWnuLPbXqnybVrMN9. Date limite : samedi 16 mai 2026 à 18h59.', '/News/festival%20endo%20culture.jpg', '2026-05-01', 'Festival Hwendo-Culture', false),
('news-ambassadrices-adaptation-culturelle', 'Les ambassadrices de Miss Endo-Culture à Miss Adaptation Culturelle 2026', 'ambassadrices-miss-adaptation-culturelle-2026', 'Culture', 'Les ambassadrices ont pris part à une soirée riche en couleurs et en valorisation culturelle.', 'Les Ambassadrices de Miss Endo-Culture ont pris part à la soirée de l’élection Miss Adaptation Culturelle 2026. Toutes nos félicitations aux lauréates, à Armélie Kanhonou et Esther Abeni.', '/News/anbassadrice.jpg', '2026-06-06', 'Miss Endo-Culture', false)
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  category = excluded.category,
  summary = excluded.summary,
  content = excluded.content,
  image = excluded.image,
  published_date = excluded.published_date,
  author = excluded.author,
  featured = excluded.featured;
