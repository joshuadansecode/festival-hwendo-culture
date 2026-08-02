import { 
  Participant, 
  FestivalEvent, 
  CommitteeMember, 
  NewsArticle, 
  GalleryItem, 
  Partner, 
  VotingCampaignConfig,
  ProgramActivity,
  FaqItem
} from '../types';

export const initialVotingConfig: VotingCampaignConfig = {
  pricePerVoteFCFA: 100,
  currency: 'FCFA',
  startDate: '2026-10-01T00:00:00Z',
  endDate: '2026-11-20T23:59:59Z',
  isVotingOpen: true,
  showLeaderboardPublicly: true,
  minVotesPerPurchase: 1
};

export const initialParticipants: Participant[] = [
  // Top Model Category
  {
    id: 'part-tm-19',
    number: '19',
    name: 'Doukoué Magro',
    category: 'top-model',
    country: 'Guinée',
    community: '',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    biography: 'Originaire de Guinée, Doukoué Magro incarne l’élégance, le charisme et la fierté de la jeunesse africaine.',
    projectDescription: 'Valoriser l’identité culturelle du continent et démontrer que la mode est un puissant moyen d’expression, de rassemblement et de promotion des richesses africaines.',
    votesCount: 0,
    voteActive: true,
    socials: {}
  },
  {
    id: 'part-tm-18',
    number: '18',
    name: 'VLAVONOU Nélly Rose',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/nelly-rose.jpeg',
    biography: 'Âgée de 19 ans, Nélly Rose défend une mode qui raconte l’Afrique d’aujourd’hui et célèbre les différentes façons d’être belle.',
    projectDescription: 'Développer son potentiel dans le mannequinat et montrer au monde la richesse des talents africains.',
    votesCount: 0,
    voteActive: true,
    socials: {
      instagram: 'https://instagram.com/festivalhwendoculture',
      facebook: 'https://facebook.com/festivalhwendoculture',
      tiktok: 'https://tiktok.com/@festivalhwendoculture'
    }
  },
  {
    id: 'part-tm-17',
    number: '17',
    name: 'ALLAMOU Kotchami Marley',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/marley.jpeg',
    biography: 'Âgé de 21 ans, Marley porte une prestance naturelle et défend une élégance masculine africaine qui mérite d’être célébrée.',
    projectDescription: 'Représenter la jeunesse béninoise et l’élégance africaine à travers le mannequinat en hissant haut le drapeau du Bénin.',
    votesCount: 0,
    voteActive: true,
    socials: {
      instagram: 'https://instagram.com/festivalhwendoculture',
      facebook: 'https://facebook.com/festivalhwendoculture',
      tiktok: 'https://tiktok.com/@festivalhwendoculture'
    }
  },
  {
    id: 'part-tm-16',
    number: '16',
    name: 'BOTON Jean Paul',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/jean-paul.jpeg',
    biography: 'Âgé de 26 ans, Jean Paul défend une élégance masculine africaine engagée et la valorisation de nos traditions par la mode.',
    projectDescription: 'Mettre en lumière la culture béninoise, inspirer les jeunes créateurs et montrer que la mode peut valoriser nos traditions.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-15',
    number: '15',
    name: 'TIKADA Doris',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/doris.jpeg',
    biography: 'Âgée de 21 ans, Doris est passionnée par le mannequinat et souhaite représenter fièrement le Bénin.',
    projectDescription: 'Développer son potentiel, acquérir de l’expérience et donner le meilleur d’elle-même dans cette aventure.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-14',
    number: '14',
    name: 'GUEDEGBE Belvina',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/belvina.jpeg',
    biography: 'Âgée de 20 ans, Belvina souhaite apprendre, développer son potentiel et représenter fièrement son pays.',
    projectDescription: 'Faire du mannequinat une passion et donner le meilleur de soi-même dans une compétition formatrice.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-13',
    number: '13',
    name: 'Elvis FATON',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/elvis.jpeg',
    biography: 'Âgé de 22 ans, Elvis rêve de podium et souhaite progresser auprès des meilleurs professionnels.',
    projectDescription: 'Montrer son potentiel, travailler sur soi et représenter fièrement le Bénin.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-12',
    number: '12',
    name: 'NGOT Verges Richi',
    category: 'top-model',
    country: 'Congo Brazzaville',
    community: '',
    photo: '/candidates/verges.jpeg',
    biography: 'Âgé de 26 ans, Verges voit le mannequinat comme un moyen d’exprimer l’art, la culture et la confiance en soi.',
    projectDescription: 'Promouvoir la richesse culturelle et faire connaître son talent avec discipline, passion et professionnalisme.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-11',
    number: '11',
    name: 'Himadou Amadou Abdoul Salam',
    category: 'top-model',
    country: 'Niger',
    community: '',
    photo: '/candidates/salam.jpeg',
    biography: 'Âgé de 23 ans, Salam rappelle que la mentalité et le travail sont essentiels pour devenir top modèle.',
    projectDescription: 'Travailler sa mentalité et progresser dans le mannequinat avec détermination.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-10',
    number: '10',
    name: 'Sadou Gounia Aïchatou',
    category: 'top-model',
    country: 'Niger',
    community: '',
    photo: '/candidates/aichatou.jpeg',
    biography: 'Âgée de 26 ans, Aïchatou poursuit son rêve de mannequinat et veut montrer que la taille ne limite pas le talent.',
    projectDescription: 'Prouver que chaque femme peut être mannequin et développer son potentiel avec passion.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-09',
    number: '09',
    name: 'Abdoul Wahid Adamou',
    category: 'top-model',
    country: 'Niger',
    community: '',
    photo: '/candidates/abdoul.jpeg',
    biography: 'Âgé de 21 ans, Abdoul souhaite montrer son talent sur la scène internationale et promouvoir les jeunes mannequins africains.',
    projectDescription: 'Profiter de la visibilité du festival pour promouvoir les talents et les créations africaines.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-08',
    number: '08',
    name: 'KOBA Winoc Jeffrey',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/jeffrey.jpeg',
    biography: 'Âgé de 21 ans, Jeffry veut représenter dignement le Bénin et faire découvrir son potentiel de mannequin.',
    projectDescription: 'Grandir, apprendre auprès des professionnels et inspirer les jeunes à croire en leurs rêves.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-07',
    number: '07',
    name: 'ASSOGBA Rachad',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/rachad.jpeg',
    biography: 'Âgé de 31 ans, Rachad souhaite révéler la culture béninoise au monde.',
    projectDescription: 'Révéler la culture béninoise au monde à travers le mannequinat et l’élégance africaine.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-06',
    number: '06',
    name: 'Anémone Iris',
    category: 'top-model',
    country: 'Niger',
    community: '',
    photo: '/candidates/iris.jpeg',
    biography: 'Âgée de 21 ans, Iris considère ce concours comme un tremplin vers le mannequinat professionnel.',
    projectDescription: 'Apprendre auprès de ses aînés, construire son image et franchir une nouvelle étape professionnelle.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-05',
    number: '05',
    name: 'Kiema Carmel',
    category: 'top-model',
    country: 'Burkina Faso',
    community: '',
    photo: '/candidates/carmel.jpeg',
    biography: 'Âgée de 28 ans, Carmel veut montrer au monde la bravoure et la richesse de ses racines burkinabè.',
    projectDescription: 'Célébrer les racines africaines et transmettre les symboles hérités des ancêtres.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-04',
    number: '04',
    name: 'Rrésor BEHANZIN',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/tresor.jpeg',
    biography: 'Âgé de 28 ans, Trésor poursuit une quête de perfection et souhaite faire prévaloir son talent avec dignité.',
    projectDescription: 'Exprimer son talent avec ambition, distinction et élégance africaine.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-03-new',
    number: '03',
    name: 'HOGBONOUTO Ekiane',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/eliane.jpeg',
    biography: 'Âgée de 21 ans, Éliane souhaite mettre en œuvre son potentiel dans le domaine du mannequinat.',
    projectDescription: 'Développer son potentiel et faire rayonner les talents africains sur la scène de la mode.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-02-new',
    number: '02',
    name: 'Yamoussa Sylla',
    category: 'top-model',
    country: 'Guinée Conakry',
    community: '',
    photo: '/candidates/sylla.jpeg',
    biography: 'Âgé de 20 ans, Sylla veut défendre la mode guinéenne et africaine avec fierté, discipline et professionnalisme.',
    projectDescription: 'Apprendre, grandir et représenter la catégorie Révélation Mannequin Afrique avec engagement.',
    votesCount: 0,
    voteActive: true
  },
  {
    id: 'part-tm-01-new',
    number: '01',
    name: 'DOKPA Virgilance',
    category: 'top-model',
    country: 'Bénin',
    community: '',
    photo: '/candidates/virgilance.jpeg',
    biography: 'Âgée de 20 ans, Virgilance est passionnée par le mannequinat et souhaite développer son potentiel.',
    projectDescription: 'Gagner en expérience et relever de nouveaux défis avec sérieux et détermination.',
    votesCount: 0,
    voteActive: true
  },

  // Miss ENDO-CULTURE Candidates
  {
    id: 'part-me-01',
    number: '01',
    name: 'TOSSOU Amandine Sèna',
    category: 'miss-endo',
    country: 'Bénin',
    community: 'Xwla - Ouidah',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
    biography: 'Originaire de Ouidah, Amandine est diplômée en sociologie et fervente défenseure des danses et rites endogènes du littoral béninois.',
    projectDescription: 'Sensibilisation de la jeunesse scolaire à la préservation du patrimoine immatériel et sauvegarde des contes et légendes du Dahomey.',
    votesCount: 15320,
    voteActive: true,
    socials: { facebook: 'Amandine Sena Miss', instagram: '@amandine_sena' }
  },
  {
    id: 'part-me-02',
    number: '02',
    name: 'AGBOSSA Prisca Mahoussi',
    category: 'miss-endo',
    country: 'Bénin',
    community: 'Nago - Kétou',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800',
    biography: 'Porte-flambeau de la culture Yoruba-Nago de Kétou, Prisca allie élégance, connaissance des masques Gèlèdé et prise de parole engagée.',
    projectDescription: 'Création de modules numériques d’apprentissage des langues endogènes du Bénin pour les jeunes générations.',
    votesCount: 14100,
    voteActive: true,
    socials: { tiktok: '@prisca_endo' }
  },
  {
    id: 'part-me-03',
    number: '03',
    name: 'BIAOU Biowa Fatoumata',
    category: 'miss-endo',
    country: 'Bénin',
    community: 'Bariba - Parakou',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    biography: 'Fille du nord du Bénin, Fatoumata célèbre la beauté de la Gaani, des tenues équestres et la noblesse des traditions Baatonu.',
    projectDescription: 'Autonomisation des jeunes filles artisanes à Parakou et valorisation de la poterie traditionnelle du Borgou.',
    votesCount: 11890,
    voteActive: true
  },
  {
    id: 'part-me-04',
    number: '04',
    name: 'SOSSOU Flora Ezin',
    category: 'miss-endo',
    country: 'Bénin',
    community: 'Mahi - Savalou',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    biography: 'Flora porte fièrement les coutumes Mahi de Savalou et promeut la fête de l’Igname comme carrefour d’unité culturelle.',
    projectDescription: 'Archivage vidéo des cérémonies ancestrales béninoises et valorisation de la gastronomie locale.',
    votesCount: 9540,
    voteActive: true
  },
  {
    id: 'part-me-05',
    number: '05',
    name: 'DANDJINOU Chancelle Yêyinou',
    category: 'miss-endo',
    country: 'Bénin',
    community: 'Toffin - Ganvié',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    biography: 'Ambassadrice de la cité lacustre de Ganvié, Chancelle milite pour la sauvegarde des écosystèmes aquatiques et des modes de vie lacustres.',
    projectDescription: 'Eco-tourisme culturel à Ganvié et promotion des chants sacrés des femmes sur pirogue.',
    votesCount: 8900,
    voteActive: true
  },

  // Stylistes Category
  {
    id: 'part-st-01',
    number: '01',
    name: 'Maison KOKO’DINDO Couture',
    category: 'styliste',
    country: 'Bénin',
    community: 'Abomey-Calavi',
    photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800',
    biography: 'Créateur visionnaire spécialisé dans les assemblages de tissus Akoko et Kanvo revisités en haute couture africaine.',
    projectDescription: 'Collection « La Renaissance des Rois du Dahomey ».',
    votesCount: 6800,
    voteActive: true
  },
  {
    id: 'part-st-02',
    number: '02',
    name: 'AHOÉVÉ Haute Couture',
    category: 'styliste',
    country: 'Bénin',
    community: 'Cotonou',
    photo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    biography: 'Atelier de création mettant à l’honneur le batik béninois, le pagne tressé et les perles écologiques.',
    projectDescription: 'Collection « Élégance Endogène 2026 ».',
    votesCount: 5410,
    voteActive: true
  }
];

export const initialEvents: FestivalEvent[] = [
  {
    id: 'general',
    title: 'Festival HWENDO-CULTURE 2026',
    subtitle: 'Événement majeur de valorisation des cultures endogènes du Bénin',
    description: 'Rassemblement culturel annuel célébrant l’identité, les traditions, les arts divinatoires, les rythmes vodoun, les danses patrimoniales et le savoir-faire artisanal béninois.',
    date: '12 au 15 Novembre 2026',
    time: '09h00 - 23h00',
    location: 'Esplanade du Palais Royal & Place Mairie d’Abomey-Calavi',
    status: 'à venir',
    programItems: [
      { time: '09h00', title: 'Cérémonie d’Ouverture Officielle', description: 'Libations traditionnelles, mot des dignitaires et prestation des troupes royales.' },
      { time: '14h00', title: 'Foire de l’Artisanat & Médecine Traditionnelle', description: 'Exposition des plantes médicinales, sculptures, tissage Kanvo et céramiques.' },
      { time: '20h00', title: 'Nuit des Rythmes et Danses Endogènes', description: 'Performances live de Tipinti, Sato, Zinli, Hundro et Kakagbo.' }
    ]
  },
  {
    id: 'nuit-elegance',
    title: 'La Nuit de l’Élégance Africaine',
    subtitle: 'Top Model-Mannequin Afrique & Concours des Stylistes',
    description: 'Grande soirée consacrée à la mode africaine, au mannequinat culturel et au génie créatif des plus grands stylistes et créateurs de mode du continent.',
    date: 'Samedi 14 Novembre 2026',
    time: '20h00 précises',
    location: 'Grand Palais des Congrès / Lieu prestigieux (à confirmer depuis l’admin)',
    status: 'à venir',
    programItems: [
      { time: '19h30', title: 'Tapis Rouge & Cocktail Culturel', description: 'Accueil des VIP, partenaires et médias sur le tapis rouge prestige.' },
      { time: '20h30', title: 'Défilé de la catégorie Top Model-Mannequin', description: 'Passage en tenue traditionnelle de parade et tenues royales.' },
      { time: '22h00', title: 'Passage des Stylistes & Élection Meilleur Créateur', description: 'Présentation des collections exclusives et délibération du jury.' }
    ],
    jury: [
      { name: 'Sonia EKOUE', role: 'Présidente du Jury Mode', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lamine KOUYATÉ', role: 'Styliste International', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 'miss-endo',
    title: 'Concours Miss ENDO-CULTURE',
    subtitle: 'Élection de l’Ambassadrice des Beautés et Valeurs Endogènes',
    description: 'Prestigieuse compétition visant à couronner la jeune femme incarnant l’intelligence, la maîtrise de sa culture d’origine, l’éloquence et l’engagement pour la communauté.',
    date: 'Vendredi 13 Novembre 2026',
    time: '19h00 - 00h00',
    location: 'Salle du Peuple de la Mairie d’Abomey-Calavi',
    status: 'à venir',
    programItems: [
      { time: '19h30', title: 'Hymne Endogène & Présentation des Candidates', description: 'Première apparition en tenue traditionnelle de leur communauté.' },
      { time: '21h00', title: 'Épreuve d’Éloquence & Défense des Projets Culturels', description: 'Questions du jury sur l’histoire, les traditions et les contes du Bénin.' },
      { time: '23h00', title: 'Couronnement de Miss ENDO-CULTURE & ses Dauphines', description: 'Proclamation des votes du public et de la note du jury.' }
    ]
  },
  {
    id: 'match-gala',
    title: 'Grand Match de Gala HWENDO',
    subtitle: 'Ancienne Génération vs Nouvelle Génération',
    description: 'Rencontre sportive fraternelle et festive opposant les légendes du football béninois aux jeunes talents montants dans une ambiance festive et conviviale.',
    date: 'Dimanche 15 Novembre 2026',
    time: '16h00',
    location: 'Terrain Synthétique d’Abomey-Calavi',
    status: 'à venir',
    programItems: [
      { time: '15h30', title: 'Animation Fanfare & Entrée des Équipes', description: 'Liaison culturelle entre musique traditionnelle et football.' },
      { time: '16h00', title: 'Coup d’Envoi du Match Légendes vs Espoirs', description: 'Deux mi-temps de 35 minutes sous la direction d’arbitres d’honneur.' },
      { time: '18h00', title: 'Remise du Trophée HWENDO & Troisième Mi-Temps', description: 'Partage de rafraîchissements et réjouissances populaires.' }
    ]
  }
];

export const initialCommittee: CommitteeMember[] = [
  {
    id: 'com-01',
    name: 'Sossa Germain VODOUHE',
    role: 'Promoteur & Directeur Général du Festival',
    category: 'bureau',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    biography: 'Acteur culturel émérite et défenseur passionné du patrimoine béninois, initiateur du Festival HWENDO-CULTURE pour la transmission des savoirs aux générations futures.',
    whatsapp: '+2290160744415',
    displayOrder: 1
  },
  {
    id: 'com-02',
    name: 'Mme Huguette ADJAHO',
    role: 'Présidente du Comité d’Organisation',
    category: 'bureau',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    biography: 'Gestionnaire de projets culturels chevronnée, veillant au déroulement harmonieux de l’ensemble des compétitions et cérémonies.',
    displayOrder: 2
  },
  {
    id: 'com-03',
    name: 'Dr Narcisse DOSSOU-YOVO',
    role: 'Coordonnateur Général & Conseiller Scientifique',
    category: 'bureau',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    biography: 'Enseignant-chercheur en anthropologie culturelle, garant de l’authenticité des contenus et épreuves traditionnelles.',
    displayOrder: 3
  },
  {
    id: 'com-04',
    name: 'Colette HOUNTONDJI',
    role: 'Responsable Communication & Relations Médias',
    category: 'commission',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    biography: 'Journaliste et spécialiste en communication digitale chargée de la visibilité internationale du festival.',
    whatsapp: '+2290160744415',
    displayOrder: 4
  },
  {
    id: 'com-05',
    name: 'Arnaud AKPO',
    role: 'Responsable Artistique & Programmation Musiques',
    category: 'commission',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    biography: 'Producteur de spectacles vivants régissant les prestations scènes et l’accompagnement des troupes folklores.',
    displayOrder: 5
  },
  {
    id: 'com-06',
    name: 'Clarisse KPANOU',
    role: 'Responsable des Candidates & Encadrement Miss',
    category: 'commission',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    biography: 'Ancienne reine de beauté et coach en prise de parole guidant les candidates du concours Miss ENDO-CULTURE.',
    displayOrder: 6
  }
];

export const initialNews: NewsArticle[] = [
  {
    id: 'news-miss-coming-soon',
    title: 'Miss Endo-Culture arrive : l’élégance et la culture ont un nouveau visage',
    slug: 'miss-endo-culture-arrive',
    category: 'Annonce',
    summary: 'Le Festival Hwendo-Culture annonce le lancement du concours Miss Endo-Culture.',
    content: 'Dans la continuité de notre engagement pour la promotion des talents culturels, le Festival Hwendo-Culture est fier d’annoncer le lancement de Miss Endo-Culture. Cette compétition est ouverte aux jeunes femmes désireuses de porter haut les valeurs de l’élégance, de la culture et du patrimoine africain. Informations et inscriptions : WhatsApp +229 01 60 74 44 15. Page Facebook : Miss Endo-Culture. Les dates, critères et modalités seront communiqués prochainement. Restez connectés.',
    image: '/News/miss%20endo%20culture%20cooming%20sung.jpg',
    date: '2026-06-01',
    author: 'Festival Hwendo-Culture',
    featured: true
  },
  {
    id: 'news-sponsors-nuit-elegance',
    title: 'Votre marque a une histoire. La Nuit de l’Élégance Africaine a une scène.',
    slug: 'appel-partenaires-sponsors-nuit-elegance',
    category: 'Annonce',
    summary: 'Le festival ouvre ses partenariats aux entreprises, marques et institutions.',
    content: 'La Nuit de l’Élégance Africaine, 3ème édition, est un rendez-vous culturel, une vitrine médiatique et une plateforme d’influence. Nous recherchons des sponsors et partenaires dans les domaines média, logistique, financier et technique. Les partenaires bénéficient d’une visibilité auprès d’un public engagé, d’une association au Made in Africa et d’un réseau de créateurs et professionnels. Contact : WhatsApp +229 01 60 74 44 15. Email : ajdcas.benin02@gmail.com.',
    image: '/News/appel%20aux%20partenaire%20et%20sponsors.jpg',
    date: '2026-06-15',
    author: 'Festival Hwendo-Culture',
    featured: false
  },
  {
    id: 'news-stands-disponibles',
    title: 'Votre stand vous attend : places limitées',
    slug: 'stands-disponibles-nuit-elegance',
    category: 'Annonce',
    summary: 'Des stands sont disponibles pour les exposants, artisans, artistes, restaurateurs et marques.',
    content: 'Le Festival Hwendo-Culture vous ouvre ses portes pour La Nuit de l’Élégance Africaine, 3ème édition. Les stands sont destinés aux exposants de mode, créateurs locaux, artisans, artistes, restaurateurs, commerçants et marques. Exposer permet de rencontrer un public passionné et des partenaires dans un cadre festif et professionnel. Réservez dès maintenant au +229 01 60 74 44 15.',
    image: '/News/stands%20disponible.jpg',
    date: '2026-06-16',
    author: 'Festival Hwendo-Culture',
    featured: false
  },
  {
    id: 'news-inscriptions-nuit-elegance',
    title: 'Appel à inscriptions : La Nuit de l’Élégance Africaine 3',
    slug: 'inscriptions-nuit-elegance-africaine-3',
    category: 'Annonce',
    summary: 'Les inscriptions sont ouvertes aux mannequins, jeunes créateurs, stylistes et passionnés de mode africaine.',
    content: 'Dans le cadre du Festival Hwendo-Culture 2026, les inscriptions pour la 3ème édition de la Nuit de l’Élégance Africaine sont ouvertes jusqu’au 30 juin 2026. Cette plateforme célèbre le talent, la créativité, l’innovation et l’authenticité de la mode africaine. Formulaire : https://forms.gle/F4AM5ng6kYEffKXs5. Informations : WhatsApp +229 60 74 44 15. Ensemble, faisons de nos tenues traditionnelles un symbole de fierté, d’élégance et d’héritage.',
    image: '/News/la%20nuit%20de%20l%27elegance%20inscription%20aux%20%20concours.jpg',
    date: '2026-06-01',
    author: 'Festival Hwendo-Culture',
    featured: true
  },
  {
    id: 'news-ambassadeurs-benevoles',
    title: 'Devenez ambassadeur ou ambassadrice bénévole du Festival',
    slug: 'ambassadeurs-benevoles-festival-2026',
    category: 'Annonce',
    summary: 'Le festival recrute des ambassadeurs et ambassadrices bénévoles pour rejoindre son équipe.',
    content: 'Vous êtes passionné par la culture, motivé, créatif, disponible et à l’aise avec la communication ? Rejoignez les ambassadeurs bénévoles du Festival Hwendo-Culture 2026. Vous participerez à la promotion du festival, la mobilisation du public, la visibilité des activités et l’animation autour de l’événement. Vous gagnerez une expérience enrichissante, un certificat de participation et un réseau professionnel. Lieu : Abomey-Calavi, Bénin. Formulaire : https://forms.gle/bWnuLPbXqnybVrMN9. Date limite : samedi 16 mai 2026 à 18h59.',
    image: '/News/festival%20endo%20culture.jpg',
    date: '2026-05-01',
    author: 'Festival Hwendo-Culture',
    featured: false
  },
  {
    id: 'news-ambassadrices-adaptation-culturelle',
    title: 'Les ambassadrices de Miss Endo-Culture à Miss Adaptation Culturelle 2026',
    slug: 'ambassadrices-miss-adaptation-culturelle-2026',
    category: 'Culture',
    summary: 'Les ambassadrices ont pris part à une soirée riche en couleurs, élégance et valorisation du patrimoine culturel.',
    content: 'Les Ambassadrices de Miss Endo-Culture ont eu l’honneur de prendre part à la soirée de l’élection Miss Adaptation Culturelle 2026. Nous adressons nos sincères félicitations au comité d’organisation et à tous les acteurs ayant contribué à la réussite de cette initiative. Toutes nos félicitations aux lauréates, à Armélie Kanhonou et Esther Abeni. Ensemble, continuons à promouvoir et à préserver nos valeurs culturelles.',
    image: '/News/anbassadrice.jpg',
    date: '2026-06-06',
    author: 'Miss Endo-Culture',
    featured: false
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-miss-endo-2025-01',
    title: 'Miss ENDO-CULTURE - Édition 2',
    type: 'image',
    url: '/News/miss%20endo%20culture%20edition%202/619678344_896247719824864_714335955224342296_n.jpg',
    category: 'miss-endo',
    edition: 'Édition 2 • 2025',
    date: '2025-11-01'
  },
  {
    id: 'gal-cuisine-2025-01',
    title: 'Challenge cuisine de Miss ENDO-CULTURE',
    type: 'image',
    url: '/News/challenge%20cuisine%20edition%202025%20de%20miss%20endo%20culturee/574945799_122198032772334145_3849784051774526817_n.jpg',
    category: 'miss-endo',
    edition: 'Challenge cuisine • 2025',
    date: '2025-11-02'
  },
  {
    id: 'gal-01',
    title: 'Passage féerique des candidates Miss ENDO-CULTURE en tenue royale',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    category: 'miss-endo',
    edition: 'Édition 2025',
    date: '2025-11-14'
  },
  {
    id: 'gal-02',
    title: 'Défilé Haute Couture - Nuit de l’Élégance Africaine',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    category: 'nuit-elegance',
    edition: 'Édition 2025',
    date: '2025-11-15'
  },
  {
    id: 'gal-03',
    title: 'Prestation rituelle des percussionnistes Vodoun Sato',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    category: 'general',
    edition: 'Édition 2025',
    date: '2025-11-13'
  },
  {
    id: 'gal-04',
    title: 'Gala Football : Anciennes gloires vs Nouvelle Génération',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    category: 'match-gala',
    edition: 'Édition 2025',
    date: '2025-11-16'
  },
  {
    id: 'gal-05',
    title: 'Vidéo synthèse : Temps forts du Festival HWENDO-CULTURE',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    category: 'general',
    edition: 'Édition 2025',
    date: '2025-11-17'
  }
];

export const initialPartners: Partner[] = [
  {
    id: 'part-01',
    name: 'Ministère du Tourisme, de la Culture et des Arts du Bénin',
    logo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=300',
    category: 'Institution',
    description: 'Parrainage institutionnel officiel'
  },
  {
    id: 'part-02',
    name: 'Mairie d’Abomey-Calavi',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=300',
    category: 'Institution',
    description: 'Partenaire hôte du festival'
  },
  {
    id: 'part-03',
    name: 'MTN Bénin',
    logo: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=300',
    category: 'Sponsor Officiel',
    description: 'Fournisseur réseau et solution de paiement MoMo'
  },
  {
    id: 'part-04',
    name: 'Moov Africa Bénin',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300',
    category: 'Sponsor Officiel',
    description: 'Partenaire télécom & Moov Money'
  },
  {
    id: 'part-05',
    name: 'ORTB - Télévision Nationale',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=300',
    category: 'Média Partner',
    description: 'Couverture médiatique en direct'
  }
];

export const initialProgram: ProgramActivity[] = [
  {
    id: 'prog-01',
    date: 'Jeudi 12 Novembre 2026',
    time: '09h00',
    title: 'Cérémonie d’ouverture & Bénédiction des Dignitaires Endogènes',
    eventCategory: 'general',
    location: 'Esplanade Mairie d’Abomey-Calavi',
    description: 'Rituel d’ouverture du festival, allocutions officielles, fanfares et libations royales.',
    status: 'à venir'
  },
  {
    id: 'prog-02',
    date: 'Vendredi 13 Novembre 2026',
    time: '19h00',
    title: 'Grande Finale du Concours Miss ENDO-CULTURE 2026',
    eventCategory: 'miss-endo',
    location: 'Salle du Peuple de la Mairie d’Abomey-Calavi',
    description: 'Élection de Miss ENDO-CULTURE, 1ère et 2ème dauphines avec passage traditionnel et défense des projets.',
    status: 'à venir'
  },
  {
    id: 'prog-03',
    date: 'Samedi 14 Novembre 2026',
    time: '20h00',
    title: 'La Nuit de l’Élégance Africaine (Top Model & Stylistes)',
    eventCategory: 'nuit-elegance',
    location: 'Lieu d’Élégance (Abomey-Calavi / Cotonou)',
    description: 'Défilé d’exception de mannequins africains et élection du meilleur créateur de mode endogène.',
    status: 'à venir'
  },
  {
    id: 'prog-04',
    date: 'Dimanche 15 Novembre 2026',
    time: '16h00',
    title: 'Grand Match de Gala : Ancienne vs Nouvelle Génération',
    eventCategory: 'match-gala',
    location: 'Terrain Synthétique d’Abomey-Calavi',
    description: 'Match de gala amical réunissant les figures historiques et pépites montantes du sport béninois.',
    status: 'à venir'
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-01',
    q: "Comment voter pour une candidate ou un participant ?",
    a: "Rendez-vous sur l'onglet 'Voter' ou sur la fiche du candidat, choisissez le nombre de votes (100 FCFA / vote) et effectuez le paiement sécurisé via MTN MoMo, Moov Money, Celtiis Cash ou Carte Bancaire.",
    displayOrder: 1
  },
  {
    id: 'faq-02',
    q: "Où se déroulent les événements du festival ?",
    a: "Le Concours Miss ENDO-CULTURE a lieu à la Salle du Peuple de la Mairie d'Abomey-Calavi. Le Match de Gala se joue au Terrain synthétique d'Abomey-Calavi. Le lieu exact de la Nuit de l'Élégance Africaine est consultable sur sa page dédiée.",
    displayOrder: 2
  },
  {
    id: 'faq-03',
    q: "Comment contacter l'organisation en cas de partenariat ou sponsors ?",
    a: "Vous pouvez nous écrire directement sur WhatsApp au +229 01 60 74 44 15 ou envoyer un e-mail à festivalhwendoculture@gmail.com.",
    displayOrder: 3
  }
];
