import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Facebook, Heart, Share2, Vote } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { CountryFlag } from '../common/CountryFlag';

export const ParticipantProfilePage: React.FC<{ participantId: string }> = ({ participantId }) => {
  const { participants, setActiveTab, openVoteModalForParticipant } = useFestival();
  const [copied, setCopied] = useState(false);
  const participant = participants.find((item) => item.id === participantId);

  if (!participant) return null;

  const profileUrl = `${window.location.origin}/participants/${encodeURIComponent(participant.id)}`;
  const shareText = `Soutenez ${participant.name}, candidat(e) n°${participant.number} au Festival HWENDO-CULTURE.`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6">
      <button onClick={() => setActiveTab('participants')} className="mb-6 text-xs font-bold text-amber-400">
        <ArrowLeft className="mr-2 inline h-4 w-4" />Tous les participants
      </button>
      <section className="grid overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900 lg:grid-cols-[.8fr_1.2fr]">
        <img src={participant.photo} alt={participant.name} className="h-[420px] w-full object-cover lg:h-full" />
        <div className="space-y-5 p-6 sm:p-10">
          <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase text-black">N° {participant.number} • {participant.category}</span>
          <h1 className="display-title text-4xl font-black sm:text-6xl">{participant.name}</h1>
          <p className="text-sm font-bold text-amber-300"><CountryFlag country={participant.country} />{participant.community && ` • ${participant.community}`}</p>
          <p className="leading-7 text-gray-300">{participant.biography}</p>
          <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-amber-400">Son projet</p>
            <p className="mt-2 text-sm leading-6 text-gray-300">{participant.projectDescription || 'Projet culturel à découvrir prochainement.'}</p>
          </div>
          {participant.voteActive && <button onClick={() => openVoteModalForParticipant(participant)} className="w-full rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase text-black hover:bg-amber-400"><Vote className="mr-2 inline h-4 w-4" />Voter pour ce candidat</button>}
          <div className="text-xs text-gray-500"><Heart className="mr-1 inline h-3.5 w-3.5 text-red-400" />{participant.votesCount.toLocaleString()} votes actuels</div>
          <div className="border-t border-neutral-800 pt-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-amber-400"><Share2 className="mr-2 inline h-4 w-4" />Partager ce candidat</p>
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2.5 text-xs font-black text-white hover:bg-green-500">WhatsApp</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-black text-white hover:bg-blue-500"><Facebook className="h-4 w-4" />Facebook</a>
              <button onClick={copyLink} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 px-3 py-2.5 text-xs font-black text-gray-200 hover:border-amber-500/60">{copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}{copied ? 'Lien copié' : 'Copier le lien'}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
