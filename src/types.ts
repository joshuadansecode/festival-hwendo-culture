export type EventCategory = 'miss-endo' | 'nuit-elegance' | 'match-gala' | 'general';

export type ParticipantCategory = 
  | 'miss-endo' 
  | 'top-model' 
  | 'styliste' 
  | 'match-gala-old' 
  | 'match-gala-new';

export interface Participant {
  id: string;
  number: string; // e.g. "01", "02"
  name: string;
  category: ParticipantCategory;
  country: string; // Default: Benin
  community: string; // e.g. "Fon - Abomey", "Goun - Porto-Novo", "Yoruba - Ketou", "Bariba - Parakou"
  photo: string;
  biography: string;
  projectDescription?: string;
  votesCount: number;
  voteActive: boolean;
  socials?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface FestivalEvent {
  id: EventCategory;
  title: string;
  subtitle: string;
  logoUrl?: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: 'à venir' | 'en cours' | 'terminé';
  programItems: { time: string; title: string; description: string }[];
  jury?: { name: string; role: string; photo: string }[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  category: 'bureau' | 'commission' | 'jury';
  photo: string;
  biography: string;
  whatsapp?: string;
  facebook?: string;
  displayOrder: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Annonce' | 'Résultat' | 'Interview' | 'Vote' | 'Culture';
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  category: EventCategory;
  edition: string; // e.g. "Édition 2026"
  date: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Sponsor Officiel' | 'Média Partner' | 'Institution' | 'Partenaire Technique';
  websiteUrl?: string;
  description?: string;
}

export interface VotingCampaignConfig {
  pricePerVoteFCFA: number; // e.g. 100 FCFA
  currency: string; // "FCFA"
  startDate: string;
  endDate: string;
  isVotingOpen: boolean;
  showLeaderboardPublicly: boolean;
  minVotesPerPurchase: number;
}

export interface VoteTransaction {
  id: string;
  receiptNumber: string;
  participantId: string;
  participantName: string;
  participantNumber: string;
  category: ParticipantCategory;
  quantity: number;
  pricePerVoteFCFA: number;
  totalAmountFCFA: number;
  voterName: string;
  voterPhone: string;
  paymentMethod: 'MTN Mobile Money' | 'Moov Money' | 'Celtiis Cash' | 'Carte Bancaire';
  status: 'reussi' | 'en_attente' | 'echoue';
  timestamp: string;
  transactionRef: string;
}

export interface ProgramActivity {
  id: string;
  date: string;
  time: string;
  title: string;
  eventCategory: EventCategory;
  location: string;
  description: string;
  status: 'à venir' | 'en cours' | 'terminé';
}

export interface AdminStats {
  totalVisitorsCount: number;
  totalVotesCount: number;
  totalRevenueFCFA: number;
  activeCandidatesCount: number;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  displayOrder?: number;
}

export interface AdminActivity {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  createdAt: string;
}
