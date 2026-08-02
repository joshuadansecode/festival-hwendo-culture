import React, { useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { Vote, Search, Trophy, Sparkles, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VotesPage: React.FC = () => {
  const { participants, openVoteModalForParticipant, votingConfig } = useFestival();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCandidates = participants.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.number.includes(searchTerm) ||
      p.community.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.votesCount - a.votesCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-white">
      
      {/* Page Title & Voting Status Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-amber-950/40 to-neutral-900 border border-amber-500/40 p-8 rounded-2xl text-center space-y-4 shadow-2xl">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Portail de Vote Sécurisé • {votingConfig.pricePerVoteFCFA} FCFA / Vote</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
          Plateforme Officielle de Votes en Ligne
        </h1>

        <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Sélectionnez votre candidat(e) ou participant(e) favori(e), choisissez le nombre de votes et suivez le parcours de paiement sécurisé proposé par LeekPay.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-amber-300 font-bold">
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Paiement 100% Sécurisé Bénin</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Comptabilisation en direct</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Reçu Officiel Téléchargeable & WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, N° ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Toutes catégories' },
            { id: 'miss-endo', label: 'Miss ENDO-CULTURE' },
            { id: 'top-model', label: 'Top Model' },
            { id: 'styliste', label: 'Stylistes' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-amber-500 text-black font-black' 
                  : 'bg-neutral-950 text-gray-300 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates List with Vote Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map((candidate, idx) => (
          <div 
            key={candidate.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={candidate.photo} 
                  alt={candidate.name} 
                  className="w-20 h-20 rounded-xl object-cover border-2 border-amber-500/50"
                />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  #{idx + 1}
                </span>
              </div>

              <div className="flex-1">
                <span className="text-[10px] bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded uppercase">
                  N° {candidate.number} • {candidate.category.replace('-', ' ')}
                </span>
                <h3 className="font-extrabold text-white text-base mt-1">{candidate.name}</h3>
                <p className="text-xs text-gray-400">{candidate.community}</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">Votes actuels :</span>
              <span className="font-black text-amber-400 text-sm">{candidate.votesCount.toLocaleString()} votes</span>
            </div>

            <button
              onClick={() => openVoteModalForParticipant(candidate)}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black uppercase text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <Vote className="w-4 h-4" />
              <span>Voter pour {candidate.name.split(' ')[0]}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
