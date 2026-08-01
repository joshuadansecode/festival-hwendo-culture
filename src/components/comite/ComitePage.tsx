import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { Users, Phone, ShieldCheck } from 'lucide-react';

export const ComitePage: React.FC = () => {
  const { committee } = useFestival();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-white">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Équipe dirigeante</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">Comité d'Organisation</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Découvrez les personnalités, acteurs culturels et cadres dévoués à la réussite du Festival HWENDO-CULTURE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committee.map((member) => (
          <div key={member.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all shadow-xl space-y-4">
            
            <div className="flex items-center space-x-4">
              <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/40 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                  {member.category}
                </span>
                <h3 className="font-extrabold text-white text-base mt-1">{member.name}</h3>
                <p className="text-xs text-amber-300 font-semibold">{member.role}</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">{member.biography}</p>

            {member.whatsapp && (
              <a
                href={`https://wa.me/${member.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-bold hover:underline pt-2 border-t border-neutral-800 w-full"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Direct WhatsApp</span>
              </a>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
