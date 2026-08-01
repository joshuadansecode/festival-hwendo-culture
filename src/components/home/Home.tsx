import React, { useState, useEffect } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { LogoFestivalHwendo, LogoMissEndo, LogoNuitElegance } from '../common/Logos';
import { 
  Trophy, Sparkles, Calendar, Vote, Heart, ArrowRight, ShieldCheck, 
  MapPin, Clock, Users, Play, Newspaper, CheckCircle2 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { 
    setActiveTab, 
    participants, 
    events, 
    news, 
    partners, 
    gallery,
    openVoteModalForParticipant,
    votingConfig 
  } = useFestival();

  // Countdown timer calculation to next event (12 Nov 2026)
  const targetDate = new Date('2026-11-12T09:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sorted candidates for leaderboard
  const topCandidates = [...participants].sort((a, b) => b.votesCount - a.votesCount).slice(0, 5);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION WITH COUNTDOWN */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-neutral-950 overflow-hidden border-b border-amber-500/20 px-4 sm:px-6">
        
        {/* Decorative Background Artwork */}
        {gallery[0]?.url && <img src={gallery[0].url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-neutral-950/75 to-neutral-950 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="media-overlay relative z-10 max-w-5xl mx-auto text-center space-y-8 py-12">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-black/35 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Édition Officielle 2026 • Bénin</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="display-title text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
              FESTIVAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">HWENDO-CULTURE</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
              Promouvoir, préserver et assurer la transmission adéquate des cultures endogènes béninoises aux générations futures.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-neutral-900/80 backdrop-blur-md border border-amber-500/30 p-4 sm:p-5 rounded-2xl max-w-xl mx-auto shadow-2xl space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Compte à rebours avant le grand lancement
            </p>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="block text-2xl sm:text-4xl font-black text-amber-400">{timeLeft.days}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Jours</span>
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="block text-2xl sm:text-4xl font-black text-amber-400">{timeLeft.hours}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Heures</span>
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="block text-2xl sm:text-4xl font-black text-amber-400">{timeLeft.minutes}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Minutes</span>
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="block text-2xl sm:text-4xl font-black text-amber-400">{timeLeft.seconds}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Secondes</span>
              </div>
            </div>
          </div>

          {/* Action Call to Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('voter')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black uppercase text-sm tracking-wider rounded-xl shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Vote className="w-5 h-5" />
              <span>Voter Maintenant ({votingConfig.pricePerVoteFCFA} FCFA)</span>
            </button>

            <button
              onClick={() => setActiveTab('festival')}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 font-bold uppercase text-sm tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Découvrir le festival</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* 2. THE THREE MAJOR EVENTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Au cœur du festival
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Les Trois Événements Majeurs
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Une célébration d'exception alliant beauté endogène, mode africaine haute couture et fraternité sportive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Miss ENDO-CULTURE */}
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <LogoMissEndo className="h-10" />
              <h3 className="text-xl font-bold text-amber-400">Concours Miss ENDO-CULTURE</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Élection de l'ambassadrice des valeurs traditionnelles, des contes, danses et projets sociaux culturels béninois.
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Salle du Peuple de la Mairie d'Abomey-Calavi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Vendredi 13 Novembre 2026 • 19h00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('miss-endo')}
              className="w-full py-2.5 bg-neutral-950 group-hover:bg-amber-500 group-hover:text-black text-amber-400 font-bold text-xs uppercase rounded-xl border border-neutral-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Voir le concours</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Nuit de l'Élégance Africaine */}
          <div className="bg-neutral-900 border border-orange-500/30 rounded-2xl p-6 space-y-4 hover:border-orange-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <LogoNuitElegance className="h-10" />
              <h3 className="text-xl font-bold text-orange-400">Nuit de l'Élégance Africaine</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Concours Top Model-Mannequin Afrique et Élection du Meilleur Créateur / Styliste avec présentation des collections Tissu Kanvo.
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Lieu prestigieux (Modifiable depuis l'admin)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>Samedi 14 Novembre 2026 • 20h00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('nuit-elegance')}
              className="w-full py-2.5 bg-neutral-950 group-hover:bg-orange-500 group-hover:text-black text-orange-400 font-bold text-xs uppercase rounded-xl border border-neutral-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Découvrir l'événement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Match de Gala */}
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-500/40">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-black text-emerald-400 uppercase">Match de Gala HWENDO</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-400">Ancienne vs Nouvelle Génération</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rencontre fraternelle entre les légendes historiques du sport béninois et les jeunes prodiges montants.
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Terrain synthétique d'Abomey-Calavi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Dimanche 15 Novembre 2026 • 16h00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('match-gala')}
              className="w-full py-2.5 bg-neutral-950 group-hover:bg-emerald-500 group-hover:text-black text-emerald-400 font-bold text-xs uppercase rounded-xl border border-neutral-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Détails du match</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* 3. FEATURED PARTICIPANTS & POSTER ARTWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Ambassadeurs de l'élégance
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Participants à la Une
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('participants')}
            className="text-xs font-extrabold text-amber-400 hover:underline uppercase flex items-center space-x-1"
          >
            <span>Voir tous les participants</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {participants.slice(0, 4).map((participant) => (
            <div 
              key={participant.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-amber-500/60 transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950">
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                    {participant.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-extrabold text-base leading-tight mt-1">{participant.name}</h3>
                  <p className="text-xs text-gray-300 font-medium">{participant.country}{participant.community ? ` • ${participant.community}` : ''}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <strong>{participant.votesCount.toLocaleString()} votes</strong>
                  </span>
                  <span className="text-emerald-400 font-semibold">{participant.country}</span>
                </div>

                <button
                  onClick={() => openVoteModalForParticipant(participant)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase rounded-xl transition-colors shadow flex items-center justify-center space-x-1.5"
                >
                  <Vote className="w-4 h-4" />
                  <span>Voter pour {participant.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>


      {/* 4. LIVE RANKING LEADERBOARD */}
      <section className="bg-neutral-900 border-y border-amber-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Transparence & Classement
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Classement Général des Votes
            </h2>
            <p className="text-sm text-gray-400">
              Mise à jour instantanée après chaque vote validé.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="p-4 bg-gradient-to-r from-amber-950 via-neutral-900 to-amber-950 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Top Participants</span>
              <span className="text-xs text-gray-400">Mise à jour en temps réel</span>
            </div>

            <div className="divide-y divide-neutral-800">
              {topCandidates.map((c, index) => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-neutral-900/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      index === 0 ? 'bg-amber-400 text-black' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      index === 2 ? 'bg-amber-700 text-white' : 'bg-neutral-800 text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>

                    <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-lg object-cover border border-amber-500/30" />

                    <div>
                      <h4 className="font-bold text-white text-sm">{c.name}</h4>
                      <p className="text-xs text-gray-400">{c.community} • N° {c.number}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-sm font-black text-amber-400">{c.votesCount.toLocaleString()} votes</span>
                    </div>

                    <button
                      onClick={() => openVoteModalForParticipant(c)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-amber-500 hover:text-black text-amber-400 font-bold text-xs rounded-lg transition-colors"
                    >
                      Voter
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-neutral-900 text-center">
              <button
                onClick={() => setActiveTab('voter')}
                className="text-xs font-bold text-amber-400 hover:underline uppercase"
              >
                Voir le classement complet de toutes les catégories →
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 5. RECENT NEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white uppercase">Dernières Actualités</h2>
          <button onClick={() => setActiveTab('actualites')} className="text-xs font-bold text-amber-400 hover:underline uppercase">
            Toutes les actualités
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item, index) => (
            <div key={item.id} onClick={() => setActiveTab('actualites')} className={`group cursor-pointer bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden space-y-3 p-4 hover:-translate-y-1 hover:border-amber-500/50 transition-all duration-300 ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <div className="overflow-hidden rounded-xl"><img src={item.image} alt={item.title} loading="lazy" className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h3 className="font-bold text-white text-sm line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. PARTNERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center space-y-4">
          <p className="text-xs font-bold uppercase text-amber-400 tracking-widest">
            Ils soutiennent la culture endogène du Bénin
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p) => (
              <div key={p.id} className="text-xs text-gray-300 font-bold bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-800">
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
