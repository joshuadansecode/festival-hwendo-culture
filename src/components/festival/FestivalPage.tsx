import React from 'react';
import { LogoFestivalHwendo } from '../common/Logos';
import { ShieldCheck, Heart, Sparkles, BookOpen, Award, Users, CheckCircle } from 'lucide-react';

export const FestivalPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 text-white">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <LogoFestivalHwendo variant="color" className="h-16 mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
          À Propos du Festival HWENDO-CULTURE
        </h1>
        <p className="text-amber-400 text-sm font-bold uppercase tracking-wider max-w-2xl mx-auto">
          Sanctuaire de sauvegarde et de transmission des identités endogènes béninoises
        </p>
      </div>

      {/* 1. Présentation générale & Objectifs */}
      <div className="bg-neutral-900 border border-amber-500/30 p-8 rounded-2xl space-y-6 shadow-xl">
        <h2 className="text-2xl font-black text-amber-400 uppercase flex items-center space-x-2">
          <BookOpen className="w-6 h-6" />
          <span>Présentation Générale</span>
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Le Festival HWENDO-CULTURE est un rendez-vous annuel incontournable consacré à la valorisation, à la sauvegarde et à la promotion des traditions endogènes béninoises et ouest-africaines. En langue nationale Fon, <strong>« Hwendo »</strong> désigne l’héritage des ancêtres, les coutumes séculaires et la sagesse populaire qui fondent notre identité commune.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          À une époque marquée par la mondialisation et l’érosion des repères traditionnels, le festival s’impose comme un pont culturel reliant le passé glorieux du Dahomey aux aspirations des jeunes générations.
        </p>
      </div>

      {/* 2. Importance des cultures endogènes & Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Valeurs Fondamentales</h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Authenticité :</strong> Fidélité aux rituels, danses, musiques et récits ancestraux.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Fraternité & Unité :</strong> Rassemblement de l'ensemble des communautés du Bénin.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Dignité & Prestige :</strong> Valorisation des parures, tissus royaux (Kanvo) et de la beauté naturelle.</span>
            </li>
          </ul>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Importance de la Transmission</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Assurer que les chants sacrés, la médecine des plantes, les masques sacrés (Gèlèdé, Egun, Zangbéto) et la philosophie du Vodoun conservent leur noblesse morale et leur potentiel de développement touristique et économique pour le Bénin.
          </p>
        </div>

      </div>

      {/* 3. Mot de l'Organisation */}
      <div className="bg-gradient-to-r from-amber-950/80 via-neutral-900 to-amber-950/80 border border-amber-500/40 p-8 rounded-2xl space-y-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Message du Comité</span>
        <h3 className="text-xl font-black text-white">« Préserver nos racines pour nourrir l'avenir »</h3>
        <blockquote className="text-sm italic text-gray-300 border-l-4 border-amber-500 pl-4 py-1">
          « Un peuple qui oublie la mémoire de ses pères s'assèche comme une rivière sans source. Le Festival HWENDO-CULTURE est l'autel où notre jeunesse réapprend la fierté d'être béninois, la noblesse de nos langues et l'élégance de notre haute couture africaine. »
        </blockquote>
        <p className="text-xs font-extrabold text-amber-400 pt-2">
          — Sossa Germain VODOUHE, Promoteur du Festival
        </p>
      </div>

    </div>
  );
};
