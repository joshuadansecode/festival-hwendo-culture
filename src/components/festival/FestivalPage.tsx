import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Globe2, Heart, Languages, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { LogoFestivalHwendo } from '../common/Logos';

const values = [
  { title: 'Identité', text: 'Connaître nos racines pour mieux affirmer qui nous sommes.', icon: Heart },
  { title: 'Transmission', text: 'Faire circuler les savoirs, les langues et les gestes entre générations.', icon: BookOpen },
  { title: 'Excellence', text: 'Donner aux talents culturels un cadre professionnel pour rayonner.', icon: Sparkles },
  { title: 'Fraternité', text: 'Réunir les communautés autour d’une mémoire et d’un avenir communs.', icon: Users },
];

export const FestivalPage: React.FC = () => {
  const { gallery, events, setActiveTab } = useFestival();
  const visualMoments = gallery.filter((item) => item.type === 'image' && item.url).slice(0, 4);
  const eventCards = [
    { id: 'miss-endo', title: 'Miss ENDO-CULTURE', text: 'Une ambassadrice pour porter l’élégance, la culture et les valeurs endogènes.', image: '/branding/miss-endo-culture.jpeg' },
    { id: 'nuit-elegance', title: 'Nuit de l’Élégance Africaine', text: 'Le talent des mannequins et des stylistes africains sous les projecteurs.', image: '/branding/nuit-elegance-africaine.jpeg' },
    { id: 'match-gala', title: 'Match de Gala HWENDO', text: 'Une rencontre fraternelle entre mémoire sportive et nouvelle génération.', image: visualMoments[1]?.url ?? '/branding/festival-hwendo-culture.jpeg' },
  ];

  return (
    <div className="text-white">
      <section className="relative min-h-[600px] overflow-hidden border-b border-amber-500/20">
        <img src={visualMoments[0]?.url ?? '/branding/festival-hwendo-culture.jpeg'} alt="Patrimoine culturel du Festival HWENDO-CULTURE" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-end px-5 pb-14 sm:px-8 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <LogoFestivalHwendo variant="color" className="h-12 sm:h-14" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">À propos du festival</p>
            <h1 className="display-title text-4xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">Nos racines sont notre avenir.</h1>
            <p className="max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">HWENDO-CULTURE est un mouvement dédié à la valorisation, à la sauvegarde et à la transmission des cultures endogènes béninoises.</p>
            <button onClick={() => setActiveTab('nuit-elegance')} className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase text-black hover:bg-amber-400">Découvrir nos événements <ArrowRight className="ml-1 inline h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-widest text-amber-400">L’origine du mouvement</p>
            <h2 className="display-title text-3xl font-black sm:text-5xl">Que signifie HWENDO ?</h2>
            <p className="text-base leading-8 text-gray-300">En langue Fon, « Hwendo » évoque l’héritage des ancêtres, les coutumes, la mémoire et la sagesse qui fondent une identité. Le festival transforme cet héritage en une expérience vivante, accessible et tournée vers les générations futures.</p>
            <p className="text-sm leading-7 text-gray-400">À travers la mode, la gastronomie, les arts, le sport et la parole, nous créons un pont entre les traditions du Dahomey et les aspirations de la jeunesse africaine.</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900 p-7 shadow-2xl sm:p-10"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[28px] border-amber-500/10" /><ShieldCheck className="relative mb-5 h-10 w-10 text-amber-400" /><h3 className="relative text-2xl font-black">Notre objectif</h3><p className="relative mt-4 text-sm leading-7 text-gray-300">Promouvoir, préserver et assurer une transmission adéquate de nos cultures endogènes aux générations futures, à travers les âges.</p></div>
        </section>

        <section className="space-y-6"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-widest text-amber-400">Notre raison d’être</p><h2 className="mt-2 display-title text-3xl font-black sm:text-5xl">Préserver ce qui nous rassemble</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ title, text, icon: Icon }, index) => <article key={title} className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg ${index === 0 ? 'border-amber-500/50 bg-amber-500/10' : 'border-neutral-800 bg-neutral-900'}`}><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-8 border-amber-500/5" /><div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400"><Icon className="h-5 w-5" /></div><h3 className="relative text-lg font-black">{title}</h3><p className="relative mt-2 text-sm leading-6 text-gray-400">{text}</p></article>)}</div></section>

        <section className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6"><Globe2 className="mb-4 h-7 w-7 text-amber-400" /><p className="text-3xl font-black">Bénin</p><p className="mt-1 text-xs text-gray-300">Un patrimoine ouvert à l’Afrique et au monde.</p></div><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"><Languages className="mb-4 h-7 w-7 text-amber-400" /><p className="text-3xl font-black">Nos langues</p><p className="mt-1 text-xs text-gray-400">Des mots, des récits et des savoirs à transmettre.</p></div><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"><Users className="mb-4 h-7 w-7 text-amber-400" /><p className="text-3xl font-black">La jeunesse</p><p className="mt-1 text-xs text-gray-400">Actrice de la sauvegarde et de la création.</p></div></section>

        <section className="space-y-5"><div><p className="text-xs font-black uppercase tracking-widest text-amber-400">Notre impact</p><h2 className="mt-2 display-title text-3xl font-black sm:text-5xl">Une énergie qui grandit</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"><p className="text-3xl font-black text-amber-400">3</p><p className="mt-1 text-xs text-gray-400">événements majeurs</p></div><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"><p className="text-3xl font-black text-amber-400">19+</p><p className="mt-1 text-xs text-gray-400">talents en compétition</p></div><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"><p className="text-3xl font-black text-amber-400">2025</p><p className="mt-1 text-xs text-gray-400">archives déjà vivantes</p></div><div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"><p className="text-3xl font-black text-amber-400">1</p><p className="mt-1 text-xs text-gray-400">mission : transmettre</p></div></div></section>

        <section className="space-y-6"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-widest text-amber-400">Le festival en action</p><h2 className="mt-2 display-title text-3xl font-black sm:text-5xl">Trois expériences, une même mission</h2></div><button onClick={() => setActiveTab('programme')} className="rounded-xl border border-amber-500/40 px-4 py-2.5 text-xs font-black uppercase text-amber-400 hover:bg-amber-500 hover:text-black">Voir le programme <ArrowRight className="ml-1 inline h-4 w-4" /></button></div><div className="grid gap-5 lg:grid-cols-3">{eventCards.map((event) => <button key={event.id} onClick={() => setActiveTab(event.id as any)} className="group relative min-h-[310px] overflow-hidden rounded-2xl border border-neutral-800 text-left"><img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" /><div className="relative flex min-h-[310px] flex-col justify-end p-5"><h3 className="text-xl font-black">{event.title}</h3><p className="mt-2 text-sm leading-6 text-gray-200">{event.text}</p><span className="mt-4 text-xs font-black uppercase text-amber-400">Explorer <ArrowRight className="ml-1 inline h-4 w-4" /></span></div></button>)}</div></section>

        <section className="grid items-center gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-xs font-black uppercase tracking-widest text-amber-400">Une mémoire en mouvement</p><h2 className="mt-2 display-title text-3xl font-black sm:text-5xl">Les moments qui racontent notre histoire</h2><p className="mt-4 text-sm leading-7 text-gray-400">Chaque édition rassemble des visages, des gestes et des émotions qui rendent la culture visible et vivante.</p><button onClick={() => setActiveTab('galerie')} className="mt-6 rounded-xl border border-amber-500/40 px-5 py-3 text-xs font-black uppercase text-amber-400 hover:bg-amber-500 hover:text-black">Ouvrir les archives</button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{visualMoments.slice(0, 3).map((item, index) => <button key={item.id} onClick={() => setActiveTab('galerie')} className={`group relative h-48 overflow-hidden rounded-2xl border border-neutral-800 text-left ${index === 1 ? 'sm:mt-8' : ''}`}><img src={item.url} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" /><span className="absolute bottom-3 left-3 right-3 text-xs font-bold">{item.edition || 'Archive du festival'}</span></button>)}</div></section>

        <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8"><div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/branding/festival-hwendo-culture.jpeg')] bg-cover bg-center opacity-10" /><div className="relative"><p className="text-xs font-black uppercase tracking-widest text-amber-400">Une histoire qui continue</p><div className="mt-6 grid gap-6 sm:grid-cols-3"><div className="border-l-2 border-amber-500 pl-4"><span className="text-xs font-black text-amber-400">ÉDITION 1</span><p className="mt-2 text-sm font-bold">Les premières voix du mouvement.</p></div><div className="border-l-2 border-amber-500 pl-4"><span className="text-xs font-black text-amber-400">ÉDITION 2 • 2025</span><p className="mt-2 text-sm font-bold">Miss, cuisine et élégance africaine.</p></div><div className="border-l-2 border-amber-500 pl-4"><span className="text-xs font-black text-amber-400">ÉDITION 3 • 2026</span><p className="mt-2 text-sm font-bold">Une nouvelle scène pour nos talents.</p></div></div></div></section>

        <section className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/80 via-neutral-900 to-amber-950/80 p-7 sm:p-10"><span className="text-xs font-black uppercase tracking-widest text-amber-400">Message du comité</span><h2 className="mt-3 display-title text-3xl font-black sm:text-5xl">« Préserver nos racines pour nourrir l’avenir »</h2><blockquote className="mt-5 max-w-3xl border-l-4 border-amber-500 pl-4 text-sm italic leading-7 text-gray-300">Un peuple qui oublie la mémoire de ses pères s’assèche comme une rivière sans source. HWENDO-CULTURE est l’espace où notre jeunesse réapprend la fierté de ses langues, de ses traditions et de son élégance.</blockquote><p className="mt-5 text-xs font-black text-amber-400">Sossa Germain VODOUHE • Promoteur du Festival</p></section>

        <section className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:flex-row sm:items-center sm:p-8"><div><h2 className="text-2xl font-black">Rejoignez le mouvement</h2><p className="mt-2 text-sm text-gray-400">Participez à la sauvegarde et au rayonnement de nos cultures.</p></div><div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"><button onClick={() => setActiveTab('participants')} className="rounded-xl bg-amber-500 px-5 py-3 text-center text-xs font-black uppercase text-black">Participer</button><button onClick={() => setActiveTab('contact')} className="rounded-xl border border-neutral-700 px-5 py-3 text-center text-xs font-black uppercase text-white">Nous contacter</button></div></section>
      </div>
    </div>
  );
};
