import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { LogoNuitElegance } from '../common/Logos';
import { Sparkles, Calendar, MapPin, Heart, Vote, Users, Award, ShieldCheck } from 'lucide-react';

export const NuitElegancePage: React.FC = () => {
  const { participants, events, openVoteModalForParticipant } = useFestival();
  
  const eventDetails = events.find(e => e.id === 'nuit-elegance') || events[1];
  const topModels = participants.filter(p => p.category === 'top-model');
  const stylistes = participants.filter(p => p.category === 'styliste');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-white">
      
      {/* Header */}
       <div className="bg-neutral-900 border border-orange-500/40 p-8 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden">
         <img src="/branding/nuit-elegance-africaine.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.09] blur-sm" />
         <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/80 to-neutral-950" />
         <div className="relative"><LogoNuitElegance className="h-16 mx-auto" /></div>

         <div className="relative space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-orange-400 uppercase tracking-tight">
            La Nuit de l'Élégance Africaine
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Gala de haute couture africaine, célébrant la beauté du mannequinat et le génie des créateurs de mode.
          </p>
        </div>

        {/* Location & Date */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-black/60 border border-orange-500/30 px-6 py-3 rounded-xl text-xs font-bold text-orange-300">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Lieu : {eventDetails.location}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>{eventDetails.date} • {eventDetails.time}</span>
          </div>
        </div>
      </div>

      {/* Categories Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 p-6 rounded-2xl border border-orange-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-orange-400">
            <Sparkles className="w-6 h-6" />
            <h3 className="font-extrabold text-lg uppercase">Catégorie Top Model-Mannequin Afrique</h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Concours récompensant les mannequins féminins et masculins portant avec charisme, port de tête majestueux et grâce les créations en tissus traditionnels africains.
          </p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-amber-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <Award className="w-6 h-6" />
            <h3 className="font-extrabold text-lg uppercase">Concours des Stylistes & Créateurs</h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Élection du meilleur créateur ou de la meilleure créatrice mettant à l'honneur les tissages traditionnels Kanvo, Batik et pagnes d'Afrique.
          </p>
        </div>
      </div>

      {/* Top Models Candidates */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase text-orange-400 border-b border-neutral-800 pb-3">
          Mannequins Sélectionnés (Top Model)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topModels.map((tm) => (
            <div key={tm.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all shadow-lg flex flex-col justify-between">
              <div className="relative aspect-[4/5] bg-neutral-950">
                <img src={tm.photo} alt={tm.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-orange-500 text-black text-xs font-black px-3 py-1 rounded-full">
                  N° {tm.number}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-base">{tm.name}</h3>
                  <p className="text-xs text-orange-300 font-bold">{tm.community} • {tm.country}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-gray-300 line-clamp-3">{tm.biography}</p>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span className="flex items-center space-x-1 text-xs text-gray-300">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <strong>{tm.votesCount.toLocaleString()} votes</strong>
                  </span>
                  <button
                    onClick={() => openVoteModalForParticipant(tm)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-black text-xs uppercase rounded-xl"
                  >
                    Voter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stylistes Candidates */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase text-amber-400 border-b border-neutral-800 pb-3">
          Créateurs & Maisons de Couture (Stylistes)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stylistes.map((st) => (
            <div key={st.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center space-x-4">
                <img src={st.photo} alt={st.name} className="w-20 h-20 rounded-xl object-cover border border-amber-500/30" />
                <div>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded">
                    N° {st.number}
                  </span>
                  <h3 className="font-bold text-white text-base mt-1">{st.name}</h3>
                  <p className="text-xs text-gray-400">{st.community}</p>
                </div>
              </div>

              <p className="text-xs text-gray-300">{st.biography}</p>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                <span className="text-xs text-gray-300 font-bold">{st.votesCount.toLocaleString()} votes</span>
                <button
                  onClick={() => openVoteModalForParticipant(st)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase rounded-xl"
                >
                  Voter pour le styliste
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
