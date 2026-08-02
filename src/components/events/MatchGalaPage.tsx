import React from 'react';
import { Trophy, Calendar, MapPin, Shield, Users, Activity } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

export const MatchGalaPage: React.FC = () => {
  const { events } = useFestival();
  const eventDetails = events.find((event) => event.id === 'match-gala');
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-white">
      
      {/* Banner */}
      <div className="bg-neutral-900 border border-emerald-500/40 p-8 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-emerald-950 px-4 py-2 rounded-xl border border-emerald-500/50">
          <Trophy className="w-6 h-6 text-emerald-400" />
          <span className="font-black text-emerald-400 uppercase tracking-widest text-sm">Match de Gala HWENDO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          {eventDetails?.subtitle ?? <>Ancienne Génération <span className="text-emerald-400">vs</span> Nouvelle Génération</>}
        </h1>

        <p className="text-sm text-gray-300 max-w-2xl mx-auto">
          {eventDetails?.description ?? 'Rencontre sportive fraternelle opposant les légendes historiques du football béninois aux pépites de la nouvelle génération.'}
        </p>

        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-black/60 border border-emerald-500/30 px-6 py-3 rounded-xl text-xs font-bold text-emerald-300">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{eventDetails?.location ?? 'Lieu à confirmer'}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{eventDetails ? `${eventDetails.date} • ${eventDetails.time}` : 'Date à confirmer'}</span>
          </div>
        </div>
      </div>

      {/* Roster Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Old Gen */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-black text-amber-400 uppercase text-lg">Équipe Ancienne Génération</h3>
            <span className="text-xs bg-amber-500/10 text-amber-300 font-bold px-2.5 py-1 rounded">Légendes Béninoises</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Stéphane SESSÈGNON (Capitaine d'Honneur)</span>
              <span className="text-amber-400 font-bold">N° 10</span>
            </li>
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Razak OMOTOYOSSI</span>
              <span className="text-amber-400 font-bold">N° 9</span>
            </li>
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Mouri OGOUBIYI</span>
              <span className="text-amber-400 font-bold">N° 8</span>
            </li>
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Jocelyn AHOOUÉYA</span>
              <span className="text-amber-400 font-bold">N° 6</span>
            </li>
          </ul>
        </div>

        {/* New Gen */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-black text-emerald-400 uppercase text-lg">Équipe Nouvelle Génération</h3>
            <span className="text-xs bg-emerald-500/10 text-emerald-300 font-bold px-2.5 py-1 rounded">Espoirs du Bénin</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Prodiges des Centres de Formation d'Abomey-Calavi</span>
              <span className="text-emerald-400 font-bold">U20</span>
            </li>
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Sélection locale des Talents de la Jeunesse</span>
              <span className="text-emerald-400 font-bold">Espoirs</span>
            </li>
            <li className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between">
              <span>Relève du football national béninois</span>
              <span className="text-emerald-400 font-bold">Talents</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
