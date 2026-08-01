import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

export const ProgrammePage: React.FC = () => {
  const { program } = useFestival();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-white">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Calendrier des activités</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">Programme Officiel</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Retrouvez les heures, lieux et déroulés de l'ensemble des compétitions et cérémonies du festival.
        </p>
      </div>

      <div className="space-y-6">
        {program.map((item) => (
          <div key={item.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/40 transition-all shadow-lg">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>

              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {item.status}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2">
              <div className="flex items-center space-x-1 text-amber-300 font-semibold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{item.location}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
