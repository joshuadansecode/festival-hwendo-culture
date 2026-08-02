import React, { useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { CountryFlag } from '../common/CountryFlag';
import { Participant, ParticipantCategory } from '../../types';
import { Search, Filter, Vote, Heart, Sparkles, UserCheck, X, Share2 } from 'lucide-react';

export const ParticipantsPage: React.FC = () => {
  const { participants, openVoteModalForParticipant } = useFestival();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeParticipantModal, setActiveParticipantModal] = useState<Participant | null>(null);

  const categories = [
    { id: 'all', label: 'Tous les Participants' },
    { id: 'miss-endo', label: 'Miss ENDO-CULTURE' },
    { id: 'top-model', label: 'Top Model-Mannequin Afrique' },
    { id: 'styliste', label: 'Stylistes & Créateurs' },
  ];

  const filteredParticipants = participants.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.number.includes(searchTerm) ||
      p.community.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-white">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Les visages de l'édition 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
          Candidates & Participants
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Découvrez la liste complète des candidates Miss ENDO-CULTURE, des mannequins et des stylistes en compétition.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un nom, N° ou communauté..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'bg-neutral-950 text-gray-300 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredParticipants.map((participant) => (
          <div 
            key={participant.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-amber-500/60 transition-all duration-300 group flex flex-col justify-between shadow-xl"
          >
            <div 
              onClick={() => setActiveParticipantModal(participant)}
              className="relative aspect-[4/5] bg-neutral-950 cursor-pointer overflow-hidden"
            >
              <img 
                src={participant.photo} 
                alt={participant.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded-full shadow">
                N° {participant.number}
              </span>

              <div className="media-overlay absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] bg-black/60 text-amber-300 font-bold px-2 py-0.5 rounded uppercase">
                  {participant.category.replace('-', ' ')}
                </span>
                <h3 className="font-extrabold text-base mt-1 leading-tight">{participant.name}</h3>
                <p className="text-xs text-gray-300 font-medium"><CountryFlag country={participant.country} />{participant.community ? ` • ${participant.community}` : ''}</p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <strong>{participant.votesCount.toLocaleString()} votes</strong>
                </span>

                <button
                  onClick={() => setActiveParticipantModal(participant)}
                  className="text-[11px] text-amber-400 hover:underline font-bold"
                >
                  Voir fiche →
                </button>
              </div>

              <button
                onClick={() => openVoteModalForParticipant(participant)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase rounded-xl transition-colors shadow flex items-center justify-center space-x-1.5"
              >
                <Vote className="w-4 h-4" />
                <span>Voter maintenant</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredParticipants.length === 0 && (
        <div className="text-center py-16 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
          <p className="text-base text-gray-300 font-bold">Aucun participant trouvé.</p>
          <p className="text-xs text-gray-500">Essayez de modifier votre terme de recherche ou le filtre de catégorie.</p>
        </div>
      )}

      {/* Participant Detail Modal Drawer */}
      {activeParticipantModal && (
        <div className="mobile-safe-modal fixed inset-0 z-50 flex items-start justify-center p-3 pt-20 bg-black/85 backdrop-blur-md overflow-y-auto sm:items-center sm:p-4 sm:pt-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-white">
            
            <div className="relative h-64 sm:h-80 bg-neutral-950">
              <img 
                src={activeParticipantModal.photo} 
                alt={activeParticipantModal.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

              <button
                onClick={() => setActiveParticipantModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-amber-500 text-black font-black text-xs px-3 py-1 rounded-full uppercase">
                  N° {activeParticipantModal.number} • {activeParticipantModal.category.replace('-', ' ')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2">{activeParticipantModal.name}</h2>
                <p className="text-amber-300 text-xs font-bold"><CountryFlag country={activeParticipantModal.country} />{activeParticipantModal.community ? ` • ${activeParticipantModal.community}` : ''}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Biographie</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{activeParticipantModal.biography}</p>
              </div>

              {activeParticipantModal.projectDescription && (
                <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 space-y-1">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Projet Culturel & Social</h4>
                  <p className="text-xs text-amber-100">{activeParticipantModal.projectDescription}</p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div>
                  <p className="text-xs text-gray-400">Total des votes accumulés</p>
                  <p className="text-2xl font-black text-amber-400">{activeParticipantModal.votesCount.toLocaleString()} votes</p>
                </div>

                <button
                  onClick={() => {
                    const p = activeParticipantModal;
                    setActiveParticipantModal(null);
                    openVoteModalForParticipant(p);
                  }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase rounded-xl flex items-center space-x-2"
                >
                  <Vote className="w-4 h-4" />
                  <span>Voter pour {activeParticipantModal.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
