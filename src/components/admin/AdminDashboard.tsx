import React, { useMemo, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { CommitteeMember, GalleryItem, NewsArticle, Participant, Partner, ProgramActivity } from '../../types';
import {
  Activity, CalendarDays, Check, ChevronRight, CircleDollarSign, Clock3, Download,
  Eye, FileText, Handshake, Image, LayoutDashboard, Lock, LogOut, Menu, Newspaper,
  Pencil, Plus, Search, Settings, ShieldCheck, Trash2, Upload, Users, Vote, X,
} from 'lucide-react';

type AdminTab = 'overview' | 'participants' | 'events' | 'program' | 'news' | 'media' | 'team' | 'voting' | 'transactions' | 'activity';
type Editor = { type: 'participant' | 'news' | 'media' | 'committee' | 'partner' | 'program'; data: any } | null;
type Toast = { kind: 'success' | 'error'; message: string } | null;

const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: 'participants', label: 'Participants', icon: Users },
  { id: 'events', label: 'Événements', icon: CalendarDays },
  { id: 'program', label: 'Programme', icon: Clock3 },
  { id: 'news', label: 'Actualités', icon: Newspaper },
  { id: 'media', label: 'Médias', icon: Image },
  { id: 'team', label: 'Équipe & partenaires', icon: Handshake },
  { id: 'voting', label: 'Campagne de vote', icon: Vote },
  { id: 'transactions', label: 'Transactions', icon: CircleDollarSign },
  { id: 'activity', label: "Journal d'activité", icon: Activity },
];

const emptyParticipant = { name: '', number: '', category: 'top-model', country: 'Bénin', community: '', photo: '', biography: '', projectDescription: '', voteActive: true, socials: {} };
const emptyNews = { title: '', slug: '', category: 'Annonce', summary: '', content: '', image: '', date: new Date().toISOString().slice(0, 10), author: 'Festival Hwendo-Culture', featured: false };
const emptyMedia = { title: '', type: 'image', url: '', category: 'general', edition: 'Édition 2026', date: new Date().toISOString().slice(0, 10) };
const emptyCommittee = { name: '', role: '', category: 'commission', photo: '', biography: '', whatsapp: '', facebook: '', displayOrder: 1 };
const emptyPartner = { name: '', logo: '', category: 'Sponsor Officiel', websiteUrl: '', description: '' };
const emptyProgram = { date: '', time: '', title: '', eventCategory: 'general', location: '', description: '', status: 'à venir' };

const inputClass = 'w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500';
const cardClass = 'rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg';

export const AdminDashboard: React.FC = () => {
  const ctx = useFestival();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState<Editor>(null);
  const [confirm, setConfirm] = useState<{ label: string; action: () => Promise<void> } | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [teamView, setTeamView] = useState<'committee' | 'partners'>('committee');

  const notify = (message: string, kind: Toast['kind'] = 'success') => {
    setToast({ message, kind });
    window.setTimeout(() => setToast(null), 2600);
  };

  const runMutation = async (action: () => Promise<void>, successMessage: string) => {
    setSaving(true);
    try {
      await action();
      notify(successMessage);
      return true;
    } catch (error) {
      notify(error instanceof Error ? error.message : "L'enregistrement a échoué.", 'error');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await ctx.signInAdmin(email.trim(), password);
    setLoginError(result.error ?? '');
  };

  const filteredParticipants = useMemo(() => ctx.participants.filter((item) =>
    `${item.name} ${item.number} ${item.country}`.toLowerCase().includes(search.toLowerCase())), [ctx.participants, search]);
  const filteredTransactions = useMemo(() => ctx.transactions.filter((item) =>
    `${item.receiptNumber} ${item.participantName} ${item.voterPhone}`.toLowerCase().includes(search.toLowerCase())), [ctx.transactions, search]);

  const upload = async (file: File, folder: string, field: string) => {
    setUploading(true);
    const result = await ctx.uploadAdminMedia(file, folder);
    setUploading(false);
    if (result.error) return notify(result.error, 'error');
    setEditor((current) => current ? { ...current, data: { ...current.data, [field]: result.url } } : current);
    notify('Média téléversé.');
  };

  const saveEditor = async () => {
    if (!editor) return;
    const { type, data } = editor;
    let action: () => Promise<void>;
    if (type === 'participant') action = () => data.id ? ctx.updateParticipant(data.id, data) : ctx.addParticipant(data);
    else if (type === 'news') action = () => data.id ? ctx.updateNewsArticle(data.id, data) : ctx.addNewsArticle(data);
    else if (type === 'media') action = () => data.id ? ctx.updateGalleryItem(data.id, data) : ctx.addGalleryItem(data);
    else if (type === 'committee') action = () => data.id ? ctx.updateCommitteeMember(data.id, data) : ctx.addCommitteeMember(data);
    else if (type === 'partner') action = () => data.id ? ctx.updatePartner(data.id, data) : ctx.addPartner(data);
    else action = () => data.id ? ctx.updateProgramActivity(data.id, data) : ctx.addProgramActivity(data);
    if (await runMutation(action, 'Modification enregistrée dans Supabase.')) setEditor(null);
  };

  const requestDelete = (label: string, action: () => Promise<void>) => setConfirm({ label, action });

  const exportTransactions = () => {
    const rows = [['Reçu', 'Participant', 'Votes', 'Montant', 'Statut', 'Téléphone'], ...filteredTransactions.map((t) => [t.receiptNumber, t.participantName, String(t.quantity), String(t.totalAmountFCFA), t.status, t.voterPhone])];
    const blob = new Blob([rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions-hwendo-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (!ctx.isAdminLoggedIn) return (
    <div className="mx-auto my-20 max-w-md px-4">
      <div className={`${cardClass} p-7 text-white`}>
        <div className="mb-6 text-center"><Lock className="mx-auto mb-3 h-10 w-10 text-amber-400" /><h1 className="text-2xl font-black">Administration sécurisée</h1><p className="mt-2 text-xs text-gray-400">Accès réservé aux comptes administrateurs autorisés.</p></div>
        <form onSubmit={login} className="space-y-4">
          <input className={inputClass} type="email" required autoComplete="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={inputClass} type="password" required autoComplete="current-password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          {loginError && <p className="text-xs font-bold text-red-400">{loginError}</p>}
          <button disabled={ctx.isAdminAuthLoading} className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black uppercase text-black disabled:opacity-50">{ctx.isAdminAuthLoading ? 'Vérification...' : 'Se connecter'}</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {sidebarOpen && <button className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Fermer" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-800 bg-neutral-950 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="border-b border-neutral-800 p-5"><div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-amber-400">Festival Hwendo</p><h2 className="mt-1 text-xl font-black">Administration</h2></div><button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X /></button></div></div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">{navItems.map((item) => <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); setSearch(''); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${tab === item.id ? 'bg-amber-500 text-black' : 'text-gray-300 hover:bg-neutral-900 hover:text-white'}`}><item.icon className="h-4 w-4" />{item.label}<ChevronRight className="ml-auto h-3.5 w-3.5" /></button>)}</nav>
        <div className="space-y-1 border-t border-neutral-800 p-3">
          <button onClick={() => ctx.setActiveTab('accueil')} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-300 hover:bg-neutral-900 hover:text-white"><Eye className="h-4 w-4 text-amber-400" />Voir le site public</button>
          <button onClick={() => void ctx.signOutAdmin()} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10"><LogOut className="h-4 w-4" />Déconnexion</button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-neutral-800 bg-neutral-950/90 px-4 py-3 backdrop-blur sm:px-6"><button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-neutral-800 p-2 lg:hidden"><Menu className="h-5 w-5" /></button><div><h1 className="text-lg font-black">{navItems.find((item) => item.id === tab)?.label}</h1><p className="text-[11px] text-gray-500">Contenus synchronisés avec Supabase</p></div><span className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />Connecté</span></header>
        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          {tab === 'overview' && <Overview ctx={ctx} onNavigate={setTab} />}
          {tab === 'participants' && <ParticipantsSection items={filteredParticipants} search={search} setSearch={setSearch} onAdd={() => setEditor({ type: 'participant', data: { ...emptyParticipant } })} onEdit={(data) => setEditor({ type: 'participant', data: { ...data } })} onToggle={(p) => void runMutation(() => ctx.updateParticipant(p.id, { voteActive: !p.voteActive }), 'Statut du vote mis à jour.')} onDelete={(p) => requestDelete(p.name, () => ctx.deleteParticipant(p.id))} />}
          {tab === 'events' && <EventsSection events={ctx.events} save={(id, data) => runMutation(() => ctx.updateEvent(id, data), 'Événement mis à jour.')} />}
          {tab === 'program' && <CrudGrid title="Programme" items={ctx.program} add={() => setEditor({ type: 'program', data: { ...emptyProgram } })} edit={(item) => setEditor({ type: 'program', data: { ...item } })} remove={(item) => requestDelete(item.title, () => ctx.deleteProgramActivity(item.id))} render={(item: ProgramActivity) => <><b>{item.title}</b><small>{item.date} • {item.time}</small><small>{item.location}</small></>} />}
          {tab === 'news' && <CrudGrid title="Actualités & annonces" items={ctx.news} add={() => setEditor({ type: 'news', data: { ...emptyNews } })} edit={(item) => setEditor({ type: 'news', data: { ...item } })} remove={(item) => requestDelete(item.title, () => ctx.deleteNewsArticle(item.id))} render={(item: NewsArticle) => <><img src={item.image} alt="" className="h-24 w-full rounded-lg object-cover" /><b>{item.title}</b><small>{item.category} • {item.date}</small></>} />}
          {tab === 'media' && <CrudGrid title={`${ctx.gallery.length} médias`} items={ctx.gallery.slice(0, 60)} add={() => setEditor({ type: 'media', data: { ...emptyMedia } })} edit={(item) => setEditor({ type: 'media', data: { ...item } })} remove={(item) => requestDelete(item.title, () => ctx.deleteGalleryItem(item.id))} render={(item: GalleryItem) => <><img src={item.thumbnailUrl || item.url} alt="" className="h-32 w-full rounded-lg object-cover" /><b>{item.title}</b><small>{item.edition}</small></>} />}
          {tab === 'team' && <TeamSection view={teamView} setView={setTeamView} committee={ctx.committee} partners={ctx.partners} add={() => setEditor(teamView === 'committee' ? { type: 'committee', data: { ...emptyCommittee } } : { type: 'partner', data: { ...emptyPartner } })} edit={(item) => setEditor(teamView === 'committee' ? { type: 'committee', data: { ...item } } : { type: 'partner', data: { ...item } })} remove={(item) => requestDelete(item.name, () => teamView === 'committee' ? ctx.deleteCommitteeMember(item.id) : ctx.deletePartner(item.id))} />}
          {tab === 'voting' && <VotingSection config={ctx.votingConfig} save={(data) => runMutation(() => ctx.updateVotingConfig(data), 'Campagne mise à jour.')} />}
          {tab === 'transactions' && <TransactionsSection items={filteredTransactions} search={search} setSearch={setSearch} exportCsv={exportTransactions} />}
          {tab === 'activity' && <ActivitySection items={ctx.adminActivities} />}
        </main>
      </div>

      {editor && <EditorModal editor={editor} setEditor={setEditor} save={saveEditor} upload={upload} uploading={uploading} saving={saving} />}
      {confirm && <ConfirmDialog label={confirm.label} close={() => setConfirm(null)} saving={saving} confirm={async () => { if (await runMutation(async () => { await confirm.action(); }, 'Suppression effectuée.')) setConfirm(null); }} />}
      {toast && <div className={`fixed bottom-5 right-5 z-[120] flex max-w-sm items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-2xl ${toast.kind === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}><Check className="h-4 w-4" />{toast.message}</div>}
    </div>
  );
};

const Overview = ({ ctx, onNavigate }: any) => {
  const successful = ctx.transactions.filter((t: any) => t.status === 'reussi');
  const stats = [
    ['Participants actifs', ctx.participants.filter((p: Participant) => p.voteActive).length, Users, 'participants'],
    ['Médias publiés', ctx.gallery.length, Image, 'media'],
    ['Actualités', ctx.news.length, Newspaper, 'news'],
    ['Recettes confirmées', `${successful.reduce((sum: number, t: any) => sum + t.totalAmountFCFA, 0).toLocaleString()} FCFA`, CircleDollarSign, 'transactions'],
  ];
  return <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, Icon, target]: any) => <button key={label} onClick={() => onNavigate(target)} className={`${cardClass} p-5 text-left transition hover:-translate-y-1 hover:border-amber-500/50`}><Icon className="mb-4 h-5 w-5 text-amber-400" /><p className="text-2xl font-black">{value}</p><p className="mt-1 text-xs text-gray-400">{label}</p></button>)}</div><div className="grid gap-6 xl:grid-cols-2"><section className={`${cardClass} p-5`}><h3 className="mb-4 font-black">État de la campagne</h3><div className={`rounded-xl p-4 ${ctx.votingConfig.isVotingOpen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}><b>{ctx.votingConfig.isVotingOpen ? 'Votes ouverts' : 'Votes fermés'}</b><p className="mt-1 text-xs">{ctx.votingConfig.pricePerVoteFCFA} FCFA par vote • minimum {ctx.votingConfig.minVotesPerPurchase}</p></div></section><section className={`${cardClass} p-5`}><h3 className="mb-4 font-black">Activité récente</h3><div className="space-y-3">{ctx.adminActivities.slice(0, 5).map((a: any) => <div key={a.id} className="flex justify-between border-b border-neutral-800 pb-2 text-xs"><span><b>{a.action}</b> • {a.entityType}</span><time className="text-gray-500">{new Date(a.createdAt).toLocaleString('fr-FR')}</time></div>)}{!ctx.adminActivities.length && <p className="text-xs text-gray-500">Le journal sera disponible après la migration SQL.</p>}</div></section></div></>;
};

const SearchBar = ({ value, setValue, placeholder = 'Rechercher...' }: any) => <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" /><input className={`${inputClass} pl-9`} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} /></div>;

const ParticipantsSection = ({ items, search, setSearch, onAdd, onEdit, onToggle, onDelete }: any) => <section className="space-y-4"><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><SearchBar value={search} setValue={setSearch} placeholder="Nom, numéro ou pays..." /><button onClick={onAdd} className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black"><Plus className="mr-2 inline h-4 w-4" />Ajouter</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((p: Participant) => <article key={p.id} className={`${cardClass} overflow-hidden`}><div className="flex gap-4 p-4"><img src={p.photo} alt={p.name} className="h-24 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><span className="text-[10px] font-black text-amber-400">N° {p.number} • {p.category}</span><h3 className="truncate font-black">{p.name}</h3><p className="text-xs text-gray-400">{p.country}</p><button onClick={() => onToggle(p)} className={`mt-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${p.voteActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{p.voteActive ? 'Vote actif' : 'Vote fermé'}</button></div></div><div className="flex border-t border-neutral-800"><button onClick={() => onEdit(p)} className="flex-1 p-3 text-xs font-bold text-amber-400"><Pencil className="mr-1 inline h-3.5 w-3.5" />Modifier</button><button onClick={() => onDelete(p)} className="flex-1 p-3 text-xs font-bold text-red-400"><Trash2 className="mr-1 inline h-3.5 w-3.5" />Supprimer</button></div></article>)}</div></section>;

const EventsSection = ({ events, save }: any) => <div className="grid gap-5 lg:grid-cols-2">{events.map((event: any) => <EventCard key={event.id} event={event} save={save} />)}</div>;
const EventCard = ({ event, save }: any) => { const [data, setData] = useState({ title: event.title, subtitle: event.subtitle, description: event.description, location: event.location, date: event.date, time: event.time, status: event.status }); return <article className={`${cardClass} space-y-4 p-5`}><Field label="Titre"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field><Field label="Sous-titre"><input className={inputClass} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} /></Field><Field label="Description"><textarea className={`${inputClass} min-h-24`} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></Field><Field label="Lieu"><input className={inputClass} value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} /></Field><div className="grid grid-cols-2 gap-3"><Field label="Date"><input className={inputClass} value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} /></Field><Field label="Heure"><input className={inputClass} value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })} /></Field></div><Field label="Statut"><select className={inputClass} value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}><option>à venir</option><option>en cours</option><option>terminé</option></select></Field><button onClick={() => save(event.id, data)} className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black">Enregistrer</button></article>; };

const CrudGrid = ({ title, items, add, edit, remove, render }: any) => <section className="space-y-4"><div className="flex items-center justify-between"><h2 className="font-black">{title}</h2><button onClick={add} className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black"><Plus className="mr-1 inline h-4 w-4" />Ajouter</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item: any) => <article key={item.id} className={`${cardClass} flex flex-col gap-2 p-4`}>{render(item)}<div className="mt-auto flex gap-2 pt-3"><button onClick={() => edit(item)} className="flex-1 rounded-lg bg-neutral-800 p-2 text-xs font-bold text-amber-400"><Pencil className="mr-1 inline h-3.5 w-3.5" />Modifier</button><button onClick={() => remove(item)} className="rounded-lg bg-red-500/10 p-2 text-red-400"><Trash2 className="h-4 w-4" /></button></div></article>)}</div></section>;

const TeamSection = ({ view, setView, committee, partners, add, edit, remove }: any) => { const items = view === 'committee' ? committee : partners; return <section className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex rounded-xl bg-neutral-900 p-1"><button onClick={() => setView('committee')} className={`rounded-lg px-4 py-2 text-xs font-bold ${view === 'committee' ? 'bg-amber-500 text-black' : ''}`}>Comité</button><button onClick={() => setView('partners')} className={`rounded-lg px-4 py-2 text-xs font-bold ${view === 'partners' ? 'bg-amber-500 text-black' : ''}`}>Partenaires</button></div><button onClick={add} className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black"><Plus className="mr-1 inline h-4 w-4" />Ajouter</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item: any) => <article key={item.id} className={`${cardClass} flex items-center gap-4 p-4`}><img src={view === 'committee' ? item.photo : item.logo} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><b className="block truncate">{item.name}</b><small className="text-gray-400">{view === 'committee' ? item.role : item.category}</small></div><button onClick={() => edit(item)}><Pencil className="h-4 w-4 text-amber-400" /></button><button onClick={() => remove(item)}><Trash2 className="h-4 w-4 text-red-400" /></button></article>)}</div></section>; };

const VotingSection = ({ config, save }: any) => { const [data, setData] = useState({ ...config }); return <section className={`${cardClass} max-w-3xl space-y-5 p-6`}><div className="rounded-xl bg-amber-500/10 p-4 text-xs text-amber-200"><b>Important :</b> cette configuration ne valide aucun paiement. Les votes réels devront être crédités uniquement par webhook serveur.</div><div className="grid gap-4 sm:grid-cols-2"><Field label="Prix par vote"><input className={inputClass} type="number" value={data.pricePerVoteFCFA} onChange={(e) => setData({ ...data, pricePerVoteFCFA: Number(e.target.value) })} /></Field><Field label="Minimum par achat"><input className={inputClass} type="number" value={data.minVotesPerPurchase} onChange={(e) => setData({ ...data, minVotesPerPurchase: Number(e.target.value) })} /></Field><Field label="Début"><input className={inputClass} type="datetime-local" value={data.startDate?.slice(0, 16)} onChange={(e) => setData({ ...data, startDate: e.target.value })} /></Field><Field label="Fin"><input className={inputClass} type="datetime-local" value={data.endDate?.slice(0, 16)} onChange={(e) => setData({ ...data, endDate: e.target.value })} /></Field></div><label className="flex items-center gap-3"><input type="checkbox" checked={data.isVotingOpen} onChange={(e) => setData({ ...data, isVotingOpen: e.target.checked })} />Votes ouverts</label><label className="flex items-center gap-3"><input type="checkbox" checked={data.showLeaderboardPublicly} onChange={(e) => setData({ ...data, showLeaderboardPublicly: e.target.checked })} />Classement public</label><button onClick={() => save(data)} className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-black text-black">Enregistrer la campagne</button></section>; };

const TransactionsSection = ({ items, search, setSearch, exportCsv }: any) => <section className="space-y-4"><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><SearchBar value={search} setValue={setSearch} placeholder="Reçu, participant ou téléphone..." /><button onClick={exportCsv} className="rounded-xl border border-neutral-700 px-4 py-2 text-xs font-bold"><Download className="mr-2 inline h-4 w-4" />Exporter CSV</button></div><div className={`${cardClass} overflow-x-auto`}><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-neutral-950 text-gray-400"><tr>{['Reçu', 'Participant', 'Votes', 'Montant', 'Méthode', 'Statut', 'Téléphone'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-neutral-800">{items.map((t: any) => <tr key={t.id}><td className="p-3 font-mono">{t.receiptNumber}</td><td className="p-3 font-bold">{t.participantName}</td><td className="p-3">{t.quantity}</td><td className="p-3">{t.totalAmountFCFA.toLocaleString()} FCFA</td><td className="p-3">{t.paymentMethod}</td><td className="p-3"><span className={t.status === 'reussi' ? 'text-emerald-400' : 'text-amber-400'}>{t.status}</span></td><td className="p-3">{t.voterPhone.replace(/.(?=.{4})/g, '•')}</td></tr>)}</tbody></table></div></section>;

const ActivitySection = ({ items }: any) => <section className={`${cardClass} overflow-hidden`}><div className="divide-y divide-neutral-800">{items.map((item: any) => <div key={item.id} className="flex flex-col justify-between gap-2 p-4 sm:flex-row"><div><b className="capitalize">{item.action}</b><span className="text-gray-400"> • {item.entityType}</span>{item.entityId && <code className="ml-2 text-[10px] text-amber-400">{item.entityId}</code>}</div><time className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString('fr-FR')}</time></div>)}{!items.length && <p className="p-8 text-center text-sm text-gray-500">Aucune activité enregistrée.</p>}</div></section>;

const Field = ({ label, children }: any) => <label className="block text-xs font-bold text-gray-400">{label}<div className="mt-1">{children}</div></label>;
const EditorModal = ({ editor, setEditor, save, upload, uploading }: any) => { const data = editor.data; const set = (key: string, value: any) => setEditor({ ...editor, data: { ...data, [key]: value } }); const imageField = editor.type === 'partner' ? 'logo' : editor.type === 'media' ? 'url' : editor.type === 'news' ? 'image' : editor.type === 'participant' || editor.type === 'committee' ? 'photo' : null; return <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/80 p-4 backdrop-blur"><div className="mx-auto my-8 max-w-2xl rounded-2xl border border-neutral-700 bg-neutral-900 p-5 text-white"><div className="mb-5 flex justify-between"><h2 className="text-xl font-black capitalize">{data.id ? 'Modifier' : 'Ajouter'} • {editor.type}</h2><button onClick={() => setEditor(null)}><X /></button></div><div className="grid gap-4 sm:grid-cols-2">{Object.entries(data).filter(([key]) => !['id', 'votesCount', 'socials', 'thumbnailUrl'].includes(key)).map(([key, value]) => { if (key === imageField) return <Field key={key} label="Image"><input className={inputClass} value={String(value ?? '')} onChange={(e) => set(key, e.target.value)} /><label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-600 p-3 text-xs text-amber-400"><Upload className="h-4 w-4" />{uploading ? 'Téléversement...' : 'Choisir un fichier'}<input hidden type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], editor.type, key)} /></label></Field>; if (typeof value === 'boolean') return <label key={key} className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={value} onChange={(e) => set(key, e.target.checked)} />{key}</label>; if (['biography', 'projectDescription', 'summary', 'content', 'description'].includes(key)) return <Field key={key} label={key}><textarea className={`${inputClass} min-h-24`} value={String(value ?? '')} onChange={(e) => set(key, e.target.value)} /></Field>; return <Field key={key} label={key}><input className={inputClass} value={String(value ?? '')} onChange={(e) => set(key, key === 'displayOrder' ? Number(e.target.value) : e.target.value)} /></Field>; })}</div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditor(null)} className="rounded-xl border border-neutral-700 px-4 py-2 text-xs font-bold">Annuler</button><button onClick={save} className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-black">Enregistrer</button></div></div></div>; };
const ConfirmDialog = ({ label, close, confirm }: any) => <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4"><div className={`${cardClass} max-w-md p-6 text-white`}><Trash2 className="mb-3 h-8 w-8 text-red-400" /><h3 className="text-xl font-black">Confirmer la suppression</h3><p className="mt-2 text-sm text-gray-400">« {label} » sera supprimé définitivement.</p><div className="mt-6 flex justify-end gap-3"><button onClick={close} className="rounded-xl border border-neutral-700 px-4 py-2 text-xs font-bold">Annuler</button><button onClick={confirm} className="rounded-xl bg-red-600 px-4 py-2 text-xs font-black">Supprimer</button></div></div></div>;
