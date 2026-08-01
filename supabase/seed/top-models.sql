-- HWENDO-CULTURE - 18 candidates Top Model-Mannequin Afrique.
-- Remplacez STORAGE_BASE_URL par l'URL publique de votre bucket Supabase Storage.
-- Exemple: https://<project-ref>.supabase.co/storage/v1/object/public/festival-media/candidates

do $$
declare
  storage_base_url text := 'STORAGE_BASE_URL';
begin
  insert into public.participants (
    id, number, name, category, country, community, photo,
    biography, project_description, votes_count, vote_active, socials
  ) values
    ('part-tm-01-new', '01', 'DOKPA Virgilance', 'top-model', 'Bénin', '', storage_base_url || '/virgilance.jpeg',
      'Âgée de 20 ans, Virgilance est passionnée par le mannequinat et souhaite développer son potentiel.',
      'Gagner en expérience et relever de nouveaux défis avec sérieux et détermination.', 0, true, '{}'::jsonb),
    ('part-tm-02-new', '02', 'Yamoussa Sylla', 'top-model', 'Guinée Conakry', '', storage_base_url || '/sylla.jpeg',
      'Âgé de 20 ans, Sylla veut défendre la mode guinéenne et africaine avec fierté, discipline et professionnalisme.',
      'Apprendre, grandir et représenter la catégorie Révélation Mannequin Afrique avec engagement.', 0, true, '{}'::jsonb),
    ('part-tm-03-new', '03', 'HOGBONOUTO Ekiane', 'top-model', 'Bénin', '', storage_base_url || '/eliane.jpeg',
      'Âgée de 21 ans, Éliane souhaite mettre en œuvre son potentiel dans le domaine du mannequinat.',
      'Développer son potentiel et faire rayonner les talents africains sur la scène de la mode.', 0, true, '{}'::jsonb),
    ('part-tm-04', '04', 'Rrésor BEHANZIN', 'top-model', 'Bénin', '', storage_base_url || '/tresor.jpeg',
      'Âgé de 28 ans, Trésor poursuit une quête de perfection et souhaite faire prévaloir son talent avec dignité.',
      'Exprimer son talent avec ambition, distinction et élégance africaine.', 0, true, '{}'::jsonb),
    ('part-tm-05', '05', 'Kiema Carmel', 'top-model', 'Burkina Faso', '', storage_base_url || '/carmel.jpeg',
      'Âgée de 28 ans, Carmel veut montrer au monde la bravoure et la richesse de ses racines burkinabè.',
      'Célébrer les racines africaines et transmettre les symboles hérités des ancêtres.', 0, true, '{}'::jsonb),
    ('part-tm-06', '06', 'Anémone Iris', 'top-model', 'Niger', '', storage_base_url || '/iris.jpeg',
      'Âgée de 21 ans, Iris considère ce concours comme un tremplin vers le mannequinat professionnel.',
      'Apprendre auprès de ses aînés, construire son image et franchir une nouvelle étape professionnelle.', 0, true, '{}'::jsonb),
    ('part-tm-07', '07', 'ASSOGBA Rachad', 'top-model', 'Bénin', '', storage_base_url || '/rachad.jpeg',
      'Âgé de 31 ans, Rachad souhaite révéler la culture béninoise au monde.',
      'Révéler la culture béninoise au monde à travers le mannequinat et l’élégance africaine.', 0, true, '{}'::jsonb),
    ('part-tm-08', '08', 'KOBA Winoc Jeffrey', 'top-model', 'Bénin', '', storage_base_url || '/jeffrey.jpeg',
      'Âgé de 21 ans, Jeffry veut représenter dignement le Bénin et faire découvrir son potentiel de mannequin.',
      'Grandir, apprendre auprès des professionnels et inspirer les jeunes à croire en leurs rêves.', 0, true, '{}'::jsonb),
    ('part-tm-09', '09', 'Abdoul Wahid Adamou', 'top-model', 'Niger', '', storage_base_url || '/abdoul.jpeg',
      'Âgé de 21 ans, Abdoul souhaite montrer son talent sur la scène internationale et promouvoir les jeunes mannequins africains.',
      'Profiter de la visibilité du festival pour promouvoir les talents et les créations africaines.', 0, true, '{}'::jsonb),
    ('part-tm-10', '10', 'Sadou Gounia Aïchatou', 'top-model', 'Niger', '', storage_base_url || '/aichatou.jpeg',
      'Âgée de 26 ans, Aïchatou poursuit son rêve de mannequinat et veut montrer que la taille ne limite pas le talent.',
      'Prouver que chaque femme peut être mannequin et développer son potentiel avec passion.', 0, true, '{}'::jsonb),
    ('part-tm-11', '11', 'Himadou Amadou Abdoul Salam', 'top-model', 'Niger', '', storage_base_url || '/salam.jpeg',
      'Âgé de 23 ans, Salam rappelle que la mentalité et le travail sont essentiels pour devenir top modèle.',
      'Travailler sa mentalité et progresser dans le mannequinat avec détermination.', 0, true, '{}'::jsonb),
    ('part-tm-12', '12', 'NGOT Verges Richi', 'top-model', 'Congo Brazzaville', '', storage_base_url || '/verges.jpeg',
      'Âgé de 26 ans, Verges voit le mannequinat comme un moyen d’exprimer l’art, la culture et la confiance en soi.',
      'Promouvoir la richesse culturelle et faire connaître son talent avec discipline, passion et professionnalisme.', 0, true, '{}'::jsonb),
    ('part-tm-13', '13', 'Elvis FATON', 'top-model', 'Bénin', '', storage_base_url || '/elvis.jpeg',
      'Âgé de 22 ans, Elvis rêve de podium et souhaite progresser auprès des meilleurs professionnels.',
      'Montrer son potentiel, travailler sur soi et représenter fièrement le Bénin.', 0, true, '{}'::jsonb),
    ('part-tm-14', '14', 'GUEDEGBE Belvina', 'top-model', 'Bénin', '', storage_base_url || '/belvina.jpeg',
      'Âgée de 20 ans, Belvina souhaite apprendre, développer son potentiel et représenter fièrement son pays.',
      'Faire du mannequinat une passion et donner le meilleur de soi-même dans une compétition formatrice.', 0, true, '{}'::jsonb),
    ('part-tm-15', '15', 'TIKADA Doris', 'top-model', 'Bénin', '', storage_base_url || '/doris.jpeg',
      'Âgée de 21 ans, Doris est passionnée par le mannequinat et souhaite représenter fièrement le Bénin.',
      'Développer son potentiel, acquérir de l’expérience et donner le meilleur d’elle-même dans cette aventure.', 0, true, '{}'::jsonb),
    ('part-tm-16', '16', 'BOTON Jean Paul', 'top-model', 'Bénin', '', storage_base_url || '/jean-paul.jpeg',
      'Âgé de 26 ans, Jean Paul défend une élégance masculine africaine engagée et la valorisation de nos traditions par la mode.',
      'Mettre en lumière la culture béninoise, inspirer les jeunes créateurs et montrer que la mode peut valoriser nos traditions.', 0, true, '{}'::jsonb),
    ('part-tm-17', '17', 'ALLAMOU Kotchami Marley', 'top-model', 'Bénin', '', storage_base_url || '/marley.jpeg',
      'Âgé de 21 ans, Marley porte une prestance naturelle et défend une élégance masculine africaine qui mérite d’être célébrée.',
      'Représenter la jeunesse béninoise et l’élégance africaine à travers le mannequinat en hissant haut le drapeau du Bénin.', 0, true, '{}'::jsonb),
    ('part-tm-18', '18', 'VLAVONOU Nélly Rose', 'top-model', 'Bénin', '', storage_base_url || '/nelly-rose.jpeg',
      'Âgée de 19 ans, Nélly Rose défend une mode qui raconte l’Afrique d’aujourd’hui et célèbre les différentes façons d’être belle.',
      'Développer son potentiel dans le mannequinat et montrer au monde la richesse des talents africains.', 0, true, '{}'::jsonb)
  on conflict (id) do update set
    number = excluded.number,
    name = excluded.name,
    category = excluded.category,
    country = excluded.country,
    community = excluded.community,
    photo = excluded.photo,
    biography = excluded.biography,
    project_description = excluded.project_description,
    vote_active = excluded.vote_active,
    socials = excluded.socials;
end $$;
