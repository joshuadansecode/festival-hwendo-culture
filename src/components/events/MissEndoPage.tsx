import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { LogoMissEndo } from '../common/Logos';
import { Trophy, Calendar, MapPin, Heart, Vote, CheckCircle, Sparkles, Award } from 'lucide-react';

export const MissEndoPage: React.FC = () => {
  const { participants, events, openVoteModalForParticipant } = useFestival();
  const eventDetails = events.find((event) => event.id === 'miss-endo');
  const missCandidates = participants.filter(p => p.category === 'miss-endo');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-white">
      
      {/* Event Header Banner */}
      <div className="bg-neutral-900 border border-amber-500/40 p-8 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <img src="/branding/miss-endo-culture.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/80 to-neutral-950" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative"><LogoMissEndo className="h-16 mx-auto" /></div>
        
         <div className="relative space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-amber-400 uppercase tracking-tight">
            {eventDetails?.title ?? 'Concours Miss ENDO-CULTURE'}
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            {eventDetails?.description ?? 'Élection officielle de Miss ENDO-CULTURE, Première Dauphine et Deuxième Dauphine.'}
          </p>
        </div>

        {/* Location & Date Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-black/60 border border-amber-500/30 px-6 py-3 rounded-xl text-xs font-bold text-amber-300">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{eventDetails?.location ?? 'Lieu à confirmer'}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{eventDetails ? `${eventDetails.date} • ${eventDetails.time}` : 'Date à confirmer'}</span>
          </div>
        </div>
      </div>

      {/* Objectives & Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
          <Trophy className="w-8 h-8 text-amber-400" />
          <h3 className="font-bold text-amber-400 text-base">Miss ENDO-CULTURE</h3>
          <p className="text-xs text-gray-300">
            Reine de beauté couronnée, ambassadrice principale du patrimoine culture endogène béninois.
          </p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
          <Award className="w-8 h-8 text-gray-300" />
          <h3 className="font-bold text-gray-300 text-base">1ère Dauphine</h3>
          <p className="text-xs text-gray-300">
            Vice-ambassadrice chargée des projets éducatifs et de la communication jeunesse.
          </p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
          <Award className="w-8 h-8 text-amber-700" />
          <h3 className="font-bold text-amber-600 text-base">2ème Dauphine</h3>
          <p className="text-xs text-gray-300">
            Ambassadrice des arts traditionnels et de la sauvegarde des contes populaires.
          </p>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-2xl font-black uppercase text-white flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Candidates Officielles Miss ENDO-CULTURE</span>
          </h2>
          <span className="text-xs text-amber-400 font-bold">
            {missCandidates.length} Candidates sélectionnées
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[4/5] bg-neutral-950">
                <img 
                  src={candidate.photo} 
                  alt={candidate.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-full">
                  N° {candidate.number}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-lg">{candidate.name}</h3>
                  <p className="text-xs text-amber-300 font-bold">{candidate.community}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2 text-xs text-gray-300">
                  <p className="line-clamp-2"><strong>Bio :</strong> {candidate.biography}</p>
                  {candidate.projectDescription && (
                    <p className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-200">
                      <strong>Projet Social :</strong> {candidate.projectDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span className="flex items-center space-x-1 text-xs text-gray-300">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <strong>{candidate.votesCount.toLocaleString()} votes</strong>
                  </span>

                  <button
                    onClick={() => openVoteModalForParticipant(candidate)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase rounded-xl transition-colors flex items-center space-x-1"
                  >
                    <Vote className="w-4 h-4" />
                    <span>Voter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
