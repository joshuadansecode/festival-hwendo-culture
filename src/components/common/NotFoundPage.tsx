import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

export const NotFoundPage: React.FC = () => {
  const { setActiveTab } = useFestival();
  return <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 text-center text-white"><div><p className="text-xs font-black uppercase tracking-widest text-amber-400">Erreur 404</p><h1 className="mt-3 text-5xl font-black">Page introuvable</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">Cette adresse ne correspond à aucune page du Festival HWENDO-CULTURE.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => setActiveTab('accueil')} className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase text-black"><Home className="mr-2 inline h-4 w-4" />Accueil</button><button onClick={() => window.history.back()} className="rounded-xl border border-neutral-700 px-5 py-3 text-xs font-black uppercase text-white"><ArrowLeft className="mr-2 inline h-4 w-4" />Retour</button></div></div></main>;
};
