import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Participant, 
  FestivalEvent, 
  CommitteeMember, 
  NewsArticle, 
  GalleryItem, 
  Partner, 
  VotingCampaignConfig,
  VoteTransaction,
  ProgramActivity,
  AdminStats,
  FaqItem,
  AdminActivity
} from '../types';
import { 
  initialParticipants, 
  initialEvents, 
  initialCommittee, 
  initialNews, 
  initialGallery, 
  initialPartners, 
  initialVotingConfig,
  initialProgram,
  initialFaqs
} from '../data/initialData';
import { supabase } from '../lib/supabase';

export type TabType = 
  | 'accueil' 
  | 'festival' 
  | 'nuit-elegance' 
  | 'miss-endo' 
  | 'match-gala' 
  | 'participants' 
  | 'voter' 
  | 'programme' 
  | 'actualites' 
  | 'galerie' 
  | 'comite' 
  | 'contact' 
  | 'admin';

interface FestivalContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  participants: Participant[];
  events: FestivalEvent[];
  committee: CommitteeMember[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  partners: Partner[];
  program: ProgramActivity[];
  votingConfig: VotingCampaignConfig;
  transactions: VoteTransaction[];
  adminStats: AdminStats;
  faqs: FaqItem[];
  adminActivities: AdminActivity[];
  
  // Modals state
  isVoteModalOpen: boolean;
  setIsVoteModalOpen: (open: boolean) => void;
  selectedParticipantForVote: Participant | null;
  openVoteModalForParticipant: (participant: Participant) => void;
  
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  currentReceipt: VoteTransaction | null;
  
  // Admin auth
  isAdminLoggedIn: boolean;
  isAdminAuthLoading: boolean;
  signInAdmin: (email: string, password: string) => Promise<{ error?: string }>;
  signOutAdmin: () => Promise<void>;

  // Actions
  processVote: (voteData: {
    participantId: string;
    quantity: number;
    voterName: string;
    voterPhone: string;
    paymentMethod: 'MTN Mobile Money' | 'Moov Money' | 'Celtiis Cash' | 'Carte Bancaire';
  }) => { success: boolean; transaction?: VoteTransaction; error?: string };
  startLeekPayCheckout: (voteData: {
    participantId: string;
    quantity: number;
    voterName: string;
    voterPhone: string;
    customerEmail?: string;
  }) => Promise<{ paymentUrl?: string; error?: string }>;

  // Admin Actions
  addParticipant: (participant: Omit<Participant, 'id' | 'votesCount'>) => Promise<void>;
  updateParticipant: (id: string, updated: Partial<Participant>) => Promise<void>;
  deleteParticipant: (id: string) => Promise<void>;
  updateEventLocationAndDate: (eventId: string, location: string, date: string, time: string) => Promise<void>;
  updateEvent: (eventId: string, updated: Partial<FestivalEvent>) => Promise<void>;
  updateVotingConfig: (config: Partial<VotingCampaignConfig>) => Promise<void>;
  addNewsArticle: (news: Omit<NewsArticle, 'id'>) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => Promise<void>;
  deleteCommitteeMember: (id: string) => Promise<void>;
  addFaq: (faq: Omit<FaqItem, 'id'>) => Promise<void>;
  updateFaq: (id: string, updated: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  updateNewsArticle: (id: string, updated: Partial<NewsArticle>) => Promise<void>;
  deleteNewsArticle: (id: string) => Promise<void>;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  updateCommitteeMember: (id: string, updated: Partial<CommitteeMember>) => Promise<void>;
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, updated: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
  addProgramActivity: (activity: Omit<ProgramActivity, 'id'>) => Promise<void>;
  updateProgramActivity: (id: string, updated: Partial<ProgramActivity>) => Promise<void>;
  deleteProgramActivity: (id: string) => Promise<void>;
  uploadAdminMedia: (file: File, folder: string) => Promise<{ url?: string; error?: string }>;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'hwendo_festival_state_v1';

export const FestivalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabType>('accueil');
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved).theme ?? 'dark' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [events, setEvents] = useState<FestivalEvent[]>(initialEvents);
  const [committee, setCommittee] = useState<CommitteeMember[]>(initialCommittee);
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [program, setProgram] = useState<ProgramActivity[]>(initialProgram);
  const [votingConfig, setVotingConfig] = useState<VotingCampaignConfig>(initialVotingConfig);
  const [transactions, setTransactions] = useState<VoteTransaction[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [adminActivities, setAdminActivities] = useState<AdminActivity[]>([]);
  
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedParticipantForVote, setSelectedParticipantForVote] = useState<Participant | null>(null);
  
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<VoteTransaction | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminAuthLoading, setIsAdminAuthLoading] = useState(true);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Sync html data-theme attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load state from local storage on boot
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.participants) setParticipants(parsed.participants);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.committee) setCommittee(parsed.committee);
        if (parsed.news) setNews(parsed.news);
        if (parsed.gallery) setGallery(parsed.gallery);
        if (parsed.votingConfig) setVotingConfig(parsed.votingConfig);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.faqs) setFaqs(parsed.faqs);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, []);

  // Load the remaining public editorial content when records exist remotely.
  useEffect(() => {
    let cancelled = false;

    const loadEditorialContent = async () => {
      if (!supabase) return;
      const [eventsResult, committeeResult, newsResult, faqResult, votingResult, partnersResult, programResult] = await Promise.all([
        supabase.from('events').select('*').order('created_at'),
        supabase.from('committee_members').select('*').order('display_order'),
        supabase.from('news').select('*').order('published_date', { ascending: false }),
        supabase.from('faqs').select('*').order('display_order'),
        supabase.from('voting_config').select('*').eq('id', true).maybeSingle(),
        supabase.from('partners').select('*').order('created_at'),
        supabase.from('program_activities').select('*').order('activity_date'),
      ]);
      if (cancelled) return;

      if (eventsResult.data?.length) setEvents(eventsResult.data.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        logoUrl: item.logo_url ?? undefined,
        description: item.description,
        date: item.event_date,
        time: item.event_time,
        location: item.location,
        status: item.status,
        programItems: item.program_items ?? [],
        jury: item.jury ?? [],
      })));
      if (committeeResult.data?.length) setCommittee(committeeResult.data.map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        category: item.category,
        photo: item.photo,
        biography: item.biography,
        whatsapp: item.whatsapp ?? undefined,
        facebook: item.facebook ?? undefined,
        displayOrder: item.display_order,
      })));
      if (newsResult.data?.length) setNews(newsResult.data.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        summary: item.summary,
        content: item.content,
        image: item.image,
        date: item.published_date,
        author: item.author,
        featured: item.featured,
      })));
      if (faqResult.data?.length) setFaqs(faqResult.data.map((item) => ({
        id: item.id,
        q: item.question,
        a: item.answer,
        displayOrder: item.display_order,
      })));
      if (partnersResult.data?.length) setPartners(partnersResult.data.map((item) => ({
        id: item.id,
        name: item.name,
        logo: item.logo,
        category: item.category,
        websiteUrl: item.website_url ?? undefined,
        description: item.description ?? undefined,
      })));
      if (programResult.data?.length) setProgram(programResult.data.map((item) => ({
        id: item.id,
        date: item.activity_date,
        time: item.activity_time,
        title: item.title,
        eventCategory: item.event_category,
        location: item.location,
        description: item.description,
        status: item.status,
      })));
      if (votingResult.data) setVotingConfig({
        pricePerVoteFCFA: votingResult.data.price_per_vote_fcfa,
        currency: votingResult.data.currency,
        startDate: votingResult.data.start_date ?? '',
        endDate: votingResult.data.end_date ?? '',
        isVotingOpen: votingResult.data.is_voting_open,
        showLeaderboardPublicly: votingResult.data.show_leaderboard_publicly,
        minVotesPerPurchase: votingResult.data.min_votes_per_purchase,
      });
    };

    void loadEditorialContent();
    return () => { cancelled = true; };
  }, []);

  // Load published participants from Supabase and keep local data as fallback.
  useEffect(() => {
    let cancelled = false;

    const loadRemoteParticipants = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('participants')
        .select('id,number,name,category,country,community,photo,biography,project_description,votes_count,vote_active,socials')
        .order('number', { ascending: true });

      if (cancelled || error || !data?.length) return;
      const localById = new Map(initialParticipants.map((participant) => [participant.id, participant]));
      setParticipants(data.map((item) => ({
        id: item.id,
        number: item.number,
        name: item.name,
        category: item.category,
        country: item.country,
        community: item.community ?? '',
        photo: item.photo && !item.photo.includes('REPLACE_WITH_') && !item.photo.includes('STORAGE_BASE_URL') ? item.photo : localById.get(item.id)?.photo ?? '',
        biography: item.biography,
        projectDescription: item.project_description ?? undefined,
        votesCount: Number(item.votes_count),
        voteActive: item.vote_active,
        socials: item.socials ?? undefined,
      })));
    };

    void loadRemoteParticipants();
    return () => { cancelled = true; };
  }, []);

  // Restore and continuously verify the Supabase administrator session.
  useEffect(() => {
    if (!supabase) {
      setIsAdminAuthLoading(false);
      return;
    }

    const verifyAdmin = async (userId?: string) => {
      if (!userId) {
        setIsAdminLoggedIn(false);
        setIsAdminAuthLoading(false);
        return;
      }
      const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', userId).maybeSingle();
      setIsAdminLoggedIn(Boolean(data));
      setIsAdminAuthLoading(false);
    };

    void supabase.auth.getSession().then(({ data }) => verifyAdmin(data.session?.user.id));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void verifyAdmin(session?.user.id);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signInAdmin = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase n’est pas configuré.' };
    setIsAdminAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsAdminAuthLoading(false);
      return { error: 'Identifiants incorrects.' };
    }
    const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', data.user.id).maybeSingle();
    if (!admin) {
      await supabase.auth.signOut();
      setIsAdminAuthLoading(false);
      return { error: 'Ce compte ne possède pas les droits administrateur.' };
    }
    setIsAdminLoggedIn(true);
    setIsAdminAuthLoading(false);
    return {};
  };

  const signOutAdmin = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAdminLoggedIn(false);
  };

  useEffect(() => {
    if (!supabase || !isAdminLoggedIn) return;
    void Promise.all([
      supabase.from('admin_activity_logs').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('vote_transactions').select('*,participants(name,number,category)').order('created_at', { ascending: false }),
    ]).then(([activityResult, transactionResult]) => {
      if (activityResult.data) setAdminActivities(activityResult.data.map((item) => ({
        id: item.id,
        action: item.action,
        entityType: item.entity_type,
        entityId: item.entity_id ?? undefined,
        details: item.details ?? undefined,
        createdAt: item.created_at,
      })));
      if (transactionResult.data) setTransactions(transactionResult.data.map((item) => ({
        id: item.id,
        receiptNumber: item.receipt_number,
        participantId: item.participant_id,
        participantName: item.participants?.name ?? 'Participant',
        participantNumber: item.participants?.number ?? '',
        category: item.participants?.category ?? 'top-model',
        quantity: item.quantity,
        pricePerVoteFCFA: item.price_per_vote_fcfa,
        totalAmountFCFA: item.total_amount_fcfa,
        voterName: item.voter_name,
        voterPhone: item.voter_phone,
        paymentMethod: item.payment_method,
        status: item.status === 'rembourse' ? 'echoue' : item.status,
        timestamp: item.created_at,
        transactionRef: item.transaction_ref ?? '',
      })));
    });
  }, [isAdminLoggedIn]);

  const logAdminActivity = async (
    action: string,
    entityType: string,
    entityId?: string,
    details: Record<string, unknown> = {},
  ) => {
    if (!supabase || !isAdminLoggedIn) return;
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return;
    const { data } = await supabase.from('admin_activity_logs').insert({
      admin_user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId ?? null,
      details,
    }).select().maybeSingle();
    if (data) setAdminActivities((current) => [{
      id: data.id,
      action: data.action,
      entityType: data.entity_type,
      entityId: data.entity_id ?? undefined,
      details: data.details ?? undefined,
      createdAt: data.created_at,
    }, ...current]);
  };

  const uploadAdminMedia = async (file: File, folder: string) => {
    if (!supabase || !isAdminLoggedIn) return { error: 'Session administrateur requise.' };
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeFolder = folder.replace(/[^a-z0-9/-]/gi, '-').toLowerCase();
    const path = `${safeFolder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from('festival-media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) return { error: error.message };
    const url = supabase.storage.from('festival-media').getPublicUrl(path).data.publicUrl;
    await logAdminActivity('upload', 'media', path, { name: file.name, size: file.size });
    return { url };
  };

  // Prefer the published Storage-backed gallery when the database is ready.
  useEffect(() => {
    let cancelled = false;

    const loadRemoteGallery = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('gallery_items')
        .select('id,title,media_type,url,storage_path,thumbnail_url,event_category,edition,media_date,created_at')
        .order('created_at', { ascending: false });

      if (cancelled || error || !data?.length) return;

      const remoteGallery: GalleryItem[] = data
        .map((item) => {
          const storageUrl = item.storage_path
            ? supabase.storage.from('festival-media').getPublicUrl(item.storage_path).data.publicUrl
            : '';

          return {
            id: item.id,
            title: item.title,
            type: item.media_type,
            url: item.url || storageUrl,
            thumbnailUrl: item.thumbnail_url ?? undefined,
            category: item.event_category,
            edition: item.edition,
            date: item.media_date,
          };
        })
        .filter((item) => Boolean(item.url));

      if (remoteGallery.length) setGallery(remoteGallery);
    };

    void loadRemoteGallery();
    return () => { cancelled = true; };
  }, []);

  // Sync state to local storage when changed
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        theme,
        participants,
        events,
        committee,
        news,
        gallery,
        votingConfig,
        transactions,
        faqs
      }));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [theme, participants, events, committee, news, gallery, votingConfig, transactions, faqs]);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openVoteModalForParticipant = (participant: Participant) => {
    setSelectedParticipantForVote(participant);
    setIsVoteModalOpen(true);
  };

  // Calculate stats dynamically
  const totalVotesCount = participants.reduce((sum, p) => sum + p.votesCount, 0);
  const totalRevenueFCFA = transactions
    .filter(t => t.status === 'reussi')
    .reduce((sum, t) => sum + t.totalAmountFCFA, 0);
  
  const adminStats: AdminStats = {
    totalVisitorsCount: 48920 + transactions.length * 5,
    totalVotesCount: totalVotesCount,
    totalRevenueFCFA: totalRevenueFCFA,
    activeCandidatesCount: participants.filter(p => p.voteActive).length
  };

  // Voting action
  const processVote = (voteData: {
    participantId: string;
    quantity: number;
    voterName: string;
    voterPhone: string;
    paymentMethod: 'MTN Mobile Money' | 'Moov Money' | 'Celtiis Cash' | 'Carte Bancaire';
  }) => {
    if (!votingConfig.isVotingOpen) {
      return { success: false, error: "Les votes sont actuellement fermés." };
    }

    const participant = participants.find(p => p.id === voteData.participantId);
    if (!participant) {
      return { success: false, error: "Participant non trouvé." };
    }

    const totalAmount = voteData.quantity * votingConfig.pricePerVoteFCFA;
    const refRandom = Math.floor(100000 + Math.random() * 900000);
    const receiptNum = `REC-HW2026-${Date.now().toString().slice(-6)}`;

    const newTransaction: VoteTransaction = {
      id: `tx-${Date.now()}`,
      receiptNumber: receiptNum,
      participantId: participant.id,
      participantName: participant.name,
      participantNumber: participant.number,
      category: participant.category,
      quantity: voteData.quantity,
      pricePerVoteFCFA: votingConfig.pricePerVoteFCFA,
      totalAmountFCFA: totalAmount,
      voterName: voteData.voterName || 'Anonyme',
      voterPhone: voteData.voterPhone,
      paymentMethod: voteData.paymentMethod,
      status: 'reussi',
      timestamp: new Date().toISOString(),
      transactionRef: `PAY-BENIN-${refRandom}`
    };

    // Update participant votes count
    setParticipants(prev => prev.map(p => {
      if (p.id === participant.id) {
        return { ...p, votesCount: p.votesCount + voteData.quantity };
      }
      return p;
    }));

    // Record transaction
    setTransactions(prev => [newTransaction, ...prev]);

    // Set current receipt and open receipt modal
    setCurrentReceipt(newTransaction);
    setIsVoteModalOpen(false);
    setIsReceiptModalOpen(true);

    return { success: true, transaction: newTransaction };
  };

  const startLeekPayCheckout = async (voteData: {
    participantId: string;
    quantity: number;
    voterName: string;
    voterPhone: string;
    customerEmail?: string;
  }) => {
    if (!supabase) return { error: 'Supabase n’est pas configuré.' };
    const { data, error } = await supabase.functions.invoke('leekpay-checkout', {
      body: {
        participant_id: voteData.participantId,
        quantity: voteData.quantity,
        voter_name: voteData.voterName,
        voter_phone: voteData.voterPhone,
        customer_email: voteData.customerEmail,
      },
    });
    if (error) {
      try {
        const response = (error as { context?: Response }).context;
        if (response) {
          const payload = await response.clone().json();
          if (payload?.error) return { error: String(payload.error) };
        }
      } catch {
        // Fall back to the generic Functions client error below.
      }
      return { error: error.message || 'Impossible de démarrer le paiement.' };
    }
    if (!data?.payment_url) return { error: data?.error || 'Lien de paiement indisponible.' };
    return { paymentUrl: data.payment_url as string };
  };

  // Admin CRUD Functions
  const addParticipant = async (newP: Omit<Participant, 'id' | 'votesCount'>) => {
    const created: Participant = {
      ...newP,
      id: `part-${Date.now()}`,
      votesCount: 0
    };
    if (supabase) {
      const { error } = await supabase.from('participants').insert({
        id: created.id, number: created.number, name: created.name, category: created.category,
        country: created.country, community: created.community, photo: created.photo,
        biography: created.biography, project_description: created.projectDescription ?? null,
        votes_count: 0, vote_active: created.voteActive, socials: created.socials ?? {},
      });
      if (error) throw new Error(error.message);
    }
    setParticipants(prev => [...prev, created]);
    void logAdminActivity('create', 'participant', created.id, { name: created.name });
  };

  const updateParticipant = async (id: string, updated: Partial<Participant>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.number !== undefined) payload.number = updated.number;
      if (updated.name !== undefined) payload.name = updated.name;
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.country !== undefined) payload.country = updated.country;
      if (updated.community !== undefined) payload.community = updated.community;
      if (updated.photo !== undefined) payload.photo = updated.photo;
      if (updated.biography !== undefined) payload.biography = updated.biography;
      if (updated.projectDescription !== undefined) payload.project_description = updated.projectDescription;
      if (updated.votesCount !== undefined) payload.votes_count = updated.votesCount;
      if (updated.voteActive !== undefined) payload.vote_active = updated.voteActive;
      if (updated.socials !== undefined) payload.socials = updated.socials;
      const { error } = await supabase.from('participants').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    void logAdminActivity('update', 'participant', id, updated as Record<string, unknown>);
  };

  const deleteParticipant = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('participants').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setParticipants(prev => prev.filter(p => p.id !== id));
    void logAdminActivity('delete', 'participant', id);
  };

  const updateEventLocationAndDate = async (eventId: string, location: string, date: string, time: string) => {
    if (supabase) {
      const current = events.find((event) => event.id === eventId);
      if (!current) return;
      const { error } = await supabase.from('events').upsert({
        id: current.id, title: current.title, subtitle: current.subtitle,
        logo_url: current.logoUrl ?? null, description: current.description,
        event_date: date, event_time: time, location, status: current.status,
        program_items: current.programItems, jury: current.jury ?? [],
      });
      if (error) throw new Error(error.message);
    }
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, location, date, time } : ev));
    void logAdminActivity('update', 'event', eventId, { location, date, time });
  };

  const updateEvent = async (eventId: string, updated: Partial<FestivalEvent>) => {
    const current = events.find((event) => event.id === eventId);
    if (!current) return;
    const next = { ...current, ...updated };
    if (supabase) {
      const { error } = await supabase.from('events').upsert({
        id: next.id,
        title: next.title,
        subtitle: next.subtitle,
        logo_url: next.logoUrl ?? null,
        description: next.description,
        event_date: next.date,
        event_time: next.time,
        location: next.location,
        status: next.status,
        program_items: next.programItems,
        jury: next.jury ?? [],
      });
      if (error) throw new Error(error.message);
    }
    setEvents((items) => items.map((event) => event.id === eventId ? next : event));
    void logAdminActivity('update', 'event', eventId, updated as Record<string, unknown>);
  };

  const updateVotingConfig = async (config: Partial<VotingCampaignConfig>) => {
    const next = { ...votingConfig, ...config };
    if (supabase) {
      const { error } = await supabase.from('voting_config').upsert({
        id: true,
        price_per_vote_fcfa: next.pricePerVoteFCFA,
        currency: next.currency,
        start_date: next.startDate || null,
        end_date: next.endDate || null,
        is_voting_open: next.isVotingOpen,
        show_leaderboard_publicly: next.showLeaderboardPublicly,
        min_votes_per_purchase: next.minVotesPerPurchase,
      });
      if (error) throw new Error(error.message);
    }
    setVotingConfig(prev => ({ ...prev, ...config }));
    void logAdminActivity('update', 'voting_config', 'primary', config as Record<string, unknown>);
  };

  const addNewsArticle = async (newsData: Omit<NewsArticle, 'id'>) => {
    const article: NewsArticle = {
      ...newsData,
      id: `news-${Date.now()}`
    };
    if (supabase) {
      const { error } = await supabase.from('news').insert({
        id: article.id, title: article.title, slug: article.slug, category: article.category,
        summary: article.summary, content: article.content, image: article.image,
        published_date: article.date, author: article.author, featured: article.featured ?? false,
      });
      if (error) throw new Error(error.message);
    }
    setNews(prev => [article, ...prev]);
    void logAdminActivity('create', 'news', article.id, { title: article.title });
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const galleryItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    if (supabase) {
      const { error } = await supabase.from('gallery_items').insert({
        id: galleryItem.id, title: galleryItem.title, media_type: galleryItem.type,
        url: galleryItem.url, thumbnail_url: galleryItem.thumbnailUrl ?? null,
        event_category: galleryItem.category, edition: galleryItem.edition, media_date: galleryItem.date,
      });
      if (error) throw new Error(error.message);
    }
    setGallery(prev => [galleryItem, ...prev]);
    void logAdminActivity('create', 'gallery', galleryItem.id, { title: galleryItem.title });
  };

  const addCommitteeMember = async (memberData: Omit<CommitteeMember, 'id'>) => {
    const member: CommitteeMember = {
      ...memberData,
      id: `com-${Date.now()}`
    };
    if (supabase) {
      const { error } = await supabase.from('committee_members').insert({
        id: member.id, name: member.name, role: member.role, category: member.category,
        photo: member.photo, biography: member.biography, whatsapp: member.whatsapp ?? null,
        facebook: member.facebook ?? null, display_order: member.displayOrder,
      });
      if (error) throw new Error(error.message);
    }
    setCommittee(prev => [...prev, member]);
    void logAdminActivity('create', 'committee', member.id, { name: member.name });
  };

  const deleteCommitteeMember = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('committee_members').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setCommittee(prev => prev.filter(c => c.id !== id));
    void logAdminActivity('delete', 'committee', id);
  };

  const addFaq = async (faqData: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faqData,
      id: `faq-${Date.now()}`,
      displayOrder: faqs.length + 1
    };
    if (supabase) {
      const { error } = await supabase.from('faqs').insert({
        id: newFaq.id, question: newFaq.q, answer: newFaq.a, display_order: newFaq.displayOrder,
      });
      if (error) throw new Error(error.message);
    }
    setFaqs(prev => [...prev, newFaq]);
    void logAdminActivity('create', 'faq', newFaq.id);
  };

  const updateFaq = async (id: string, updated: Partial<FaqItem>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.q !== undefined) payload.question = updated.q;
      if (updated.a !== undefined) payload.answer = updated.a;
      if (updated.displayOrder !== undefined) payload.display_order = updated.displayOrder;
      const { error } = await supabase.from('faqs').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    void logAdminActivity('update', 'faq', id);
  };

  const deleteFaq = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setFaqs(prev => prev.filter(f => f.id !== id));
    void logAdminActivity('delete', 'faq', id);
  };

  const updateNewsArticle = async (id: string, updated: Partial<NewsArticle>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.title !== undefined) payload.title = updated.title;
      if (updated.slug !== undefined) payload.slug = updated.slug;
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.summary !== undefined) payload.summary = updated.summary;
      if (updated.content !== undefined) payload.content = updated.content;
      if (updated.image !== undefined) payload.image = updated.image;
      if (updated.date !== undefined) payload.published_date = updated.date;
      if (updated.author !== undefined) payload.author = updated.author;
      if (updated.featured !== undefined) payload.featured = updated.featured;
      const { error } = await supabase.from('news').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setNews((current) => current.map((item) => item.id === id ? { ...item, ...updated } : item));
    void logAdminActivity('update', 'news', id, updated as Record<string, unknown>);
  };

  const deleteNewsArticle = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setNews((current) => current.filter((item) => item.id !== id));
    void logAdminActivity('delete', 'news', id);
  };

  const updateGalleryItem = async (id: string, updated: Partial<GalleryItem>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.title !== undefined) payload.title = updated.title;
      if (updated.type !== undefined) payload.media_type = updated.type;
      if (updated.url !== undefined) payload.url = updated.url;
      if (updated.thumbnailUrl !== undefined) payload.thumbnail_url = updated.thumbnailUrl;
      if (updated.category !== undefined) payload.event_category = updated.category;
      if (updated.edition !== undefined) payload.edition = updated.edition;
      if (updated.date !== undefined) payload.media_date = updated.date;
      const { error } = await supabase.from('gallery_items').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setGallery((current) => current.map((item) => item.id === id ? { ...item, ...updated } : item));
    void logAdminActivity('update', 'gallery', id);
  };

  const deleteGalleryItem = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setGallery((current) => current.filter((item) => item.id !== id));
    void logAdminActivity('delete', 'gallery', id);
  };

  const updateCommitteeMember = async (id: string, updated: Partial<CommitteeMember>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.name !== undefined) payload.name = updated.name;
      if (updated.role !== undefined) payload.role = updated.role;
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.photo !== undefined) payload.photo = updated.photo;
      if (updated.biography !== undefined) payload.biography = updated.biography;
      if (updated.whatsapp !== undefined) payload.whatsapp = updated.whatsapp;
      if (updated.facebook !== undefined) payload.facebook = updated.facebook;
      if (updated.displayOrder !== undefined) payload.display_order = updated.displayOrder;
      const { error } = await supabase.from('committee_members').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setCommittee((current) => current.map((item) => item.id === id ? { ...item, ...updated } : item));
    void logAdminActivity('update', 'committee', id);
  };

  const addPartner = async (data: Omit<Partner, 'id'>) => {
    const partner = { ...data, id: `partner-${Date.now()}` };
    if (supabase) {
      const { error } = await supabase.from('partners').insert({
        id: partner.id, name: partner.name, logo: partner.logo, category: partner.category,
        website_url: partner.websiteUrl ?? null, description: partner.description ?? null,
      });
      if (error) throw new Error(error.message);
    }
    setPartners((current) => [...current, partner]);
    void logAdminActivity('create', 'partner', partner.id, { name: partner.name });
  };

  const updatePartner = async (id: string, updated: Partial<Partner>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.name !== undefined) payload.name = updated.name;
      if (updated.logo !== undefined) payload.logo = updated.logo;
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.websiteUrl !== undefined) payload.website_url = updated.websiteUrl;
      if (updated.description !== undefined) payload.description = updated.description;
      const { error } = await supabase.from('partners').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setPartners((current) => current.map((item) => item.id === id ? { ...item, ...updated } : item));
    void logAdminActivity('update', 'partner', id);
  };

  const deletePartner = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setPartners((current) => current.filter((item) => item.id !== id));
    void logAdminActivity('delete', 'partner', id);
  };

  const addProgramActivity = async (data: Omit<ProgramActivity, 'id'>) => {
    const activity = { ...data, id: `program-${Date.now()}` };
    if (supabase) {
      const { error } = await supabase.from('program_activities').insert({
        id: activity.id, activity_date: activity.date, activity_time: activity.time,
        title: activity.title, event_category: activity.eventCategory, location: activity.location,
        description: activity.description, status: activity.status,
      });
      if (error) throw new Error(error.message);
    }
    setProgram((current) => [...current, activity]);
    void logAdminActivity('create', 'program', activity.id, { title: activity.title });
  };

  const updateProgramActivity = async (id: string, updated: Partial<ProgramActivity>) => {
    if (supabase) {
      const payload: Record<string, unknown> = {};
      if (updated.date !== undefined) payload.activity_date = updated.date;
      if (updated.time !== undefined) payload.activity_time = updated.time;
      if (updated.title !== undefined) payload.title = updated.title;
      if (updated.eventCategory !== undefined) payload.event_category = updated.eventCategory;
      if (updated.location !== undefined) payload.location = updated.location;
      if (updated.description !== undefined) payload.description = updated.description;
      if (updated.status !== undefined) payload.status = updated.status;
      const { error } = await supabase.from('program_activities').update(payload).eq('id', id);
      if (error) throw new Error(error.message);
    }
    setProgram((current) => current.map((item) => item.id === id ? { ...item, ...updated } : item));
    void logAdminActivity('update', 'program', id);
  };

  const deleteProgramActivity = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('program_activities').delete().eq('id', id);
      if (error) throw new Error(error.message);
    }
    setProgram((current) => current.filter((item) => item.id !== id));
    void logAdminActivity('delete', 'program', id);
  };

  return (
    <FestivalContext.Provider value={{
      activeTab,
      setActiveTab,
      theme,
      toggleTheme,
      setTheme,
      participants,
      events,
      committee,
      news,
      gallery,
      partners,
      program,
      votingConfig,
      transactions,
      adminStats,
      faqs,
      adminActivities,

      isVoteModalOpen,
      setIsVoteModalOpen,
      selectedParticipantForVote,
      openVoteModalForParticipant,

      isReceiptModalOpen,
      setIsReceiptModalOpen,
      currentReceipt,

      isAdminLoggedIn,
      isAdminAuthLoading,
      signInAdmin,
      signOutAdmin,

      processVote,
      startLeekPayCheckout,
      addParticipant,
      updateParticipant,
      deleteParticipant,
      updateEventLocationAndDate,
      updateEvent,
      updateVotingConfig,
      addNewsArticle,
      addGalleryItem,
      addCommitteeMember,
      deleteCommitteeMember,
      addFaq,
      updateFaq,
      deleteFaq,
      updateNewsArticle,
      deleteNewsArticle,
      updateGalleryItem,
      deleteGalleryItem,
      updateCommitteeMember,
      addPartner,
      updatePartner,
      deletePartner,
      addProgramActivity,
      updateProgramActivity,
      deleteProgramActivity,
      uploadAdminMedia,
    }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
};
