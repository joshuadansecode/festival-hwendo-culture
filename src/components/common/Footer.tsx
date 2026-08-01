import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { LogoFestivalHwendo, LogoMissEndo, LogoNuitElegance } from './Logos';
import { Phone, Mail, MapPin, Facebook, Instagram, Shield, ArrowUp, Vote } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, gallery } = useFestival();
  const footerGallery = gallery.filter((item) => item.type === 'image' && item.url).slice(0, 3);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-amber-500/30 pt-10 sm:pt-16 pb-6 sm:pb-8 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto mb-10 max-w-7xl px-4 sm:mb-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-5 py-6 text-black shadow-2xl shadow-orange-500/10 sm:flex sm:items-center sm:justify-between sm:px-8">
          <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full border-[28px] border-black/5" />
          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.22em]">Faites entendre votre voix</p>
            <h2 className="mt-1 text-xl font-black uppercase leading-tight sm:text-3xl">Votez pour votre candidat préféré</h2>
          </div>
          <button
            onClick={() => { setActiveTab('voter'); scrollToTop(); }}
            className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-transform hover:scale-[1.03] sm:mt-0 sm:w-auto"
          >
            <Vote className="h-4 w-4 text-amber-400" /> Voter maintenant
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Logos & Partners Bar */}
        <div className="pb-7 border-b border-neutral-800">
          <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-widest text-amber-400 mb-5">
            Les identités du festival
          </p>
          <div translate="no" className="grid grid-cols-2 items-center justify-items-center gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-10">
            <div className="col-span-2"><LogoFestivalHwendo variant="color" className="h-10" /></div>
            <div className="origin-center scale-[0.82] sm:scale-100"><LogoMissEndo className="h-10" /></div>
            <div className="origin-center scale-[0.82] sm:scale-100"><LogoNuitElegance className="h-10" /></div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8">
          
          {/* Col 1: About */}
          <div className="col-span-2 lg:col-span-1 space-y-3 sm:space-y-4">
            <div translate="no" className="hidden sm:block"><LogoFestivalHwendo variant="color" className="h-12" /></div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              Le Festival HWENDO-CULTURE est l’événement de référence consacré à la promotion, la préservation et la transmission adéquate des cultures endogènes béninoises aux générations futures.
            </p>
            <div className="flex items-center space-x-3 text-amber-400">
              <span className="text-xs font-bold uppercase tracking-wider">Bénin • Afrique de l'Ouest</span>
            </div>
            {footerGallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 pt-1" aria-label="Aperçu du festival">
                {footerGallery.map((item) => (
                  <button key={item.id} onClick={() => setActiveTab('galerie')} className="group aspect-square overflow-hidden rounded-lg border border-neutral-800">
                    <img src={item.url} alt="Moment du Festival HWENDO-CULTURE" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Navigation Quick Links */}
          <div className="space-y-3 min-w-0">
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-[11px] sm:text-xs text-gray-300 leading-snug">
              <li>
                <button onClick={() => setActiveTab('accueil')} className="hover:text-amber-400 transition-colors">
                  • Accueil
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('festival')} className="hover:text-amber-400 transition-colors">
                  • Présentation du Festival
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('miss-endo')} className="hover:text-amber-400 transition-colors">
                  • Concours Miss ENDO-CULTURE
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('nuit-elegance')} className="hover:text-amber-400 transition-colors">
                  • Nuit de l'Élégance Africaine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('match-gala')} className="hover:text-amber-400 transition-colors">
                  • Match de Gala HWENDO
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('participants')} className="hover:text-amber-400 transition-colors">
                  • Candidates & Participants
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Links & Voting */}
          <div className="space-y-3 min-w-0">
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              Espace Public
            </h4>
            <ul className="space-y-2.5 text-[11px] sm:text-xs text-gray-300 leading-snug">
              <li>
                <button onClick={() => setActiveTab('voter')} className="text-amber-400 font-bold hover:underline">
                  • Plateforme de Votes en Ligne
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('programme')} className="hover:text-amber-400 transition-colors">
                  • Programme des Activités
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('actualites')} className="hover:text-amber-400 transition-colors">
                  • Actualités & Annonces
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('galerie')} className="hover:text-amber-400 transition-colors">
                  • Galerie Photos & Vidéos
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comite')} className="hover:text-amber-400 transition-colors">
                  • Comité d'Organisation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1 mt-2">
                  <Shield className="w-3 h-3 text-amber-500" />
                  <span>Administration du site</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              Contact & Réseaux
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <a 
                href="https://wa.me/2290160744415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-400 hover:underline font-bold"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +229 01 60 74 44 15</span>
              </a>

              <a 
                href="mailto:festivalhwendoculture@gmail.com"
                className="flex items-center space-x-2 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="break-all">festivalhwendoculture@gmail.com</span>
              </a>

              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mairie d'Abomey-Calavi & Salle du Peuple, Bénin</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-400 mb-2">Suivez-nous :</p>
              <div className="flex items-center gap-2">
                <a 
                  href="https://facebook.com/festivalhwendoculture" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  translate="no"
                  aria-label="Facebook Festival Hwendo-Culture"
                  title="Facebook Festival Hwendo-Culture"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-300 transition-colors hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com/festivalhwendoculture" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  translate="no"
                  aria-label="Instagram Miss Endo-Culture"
                  title="Instagram Miss Endo-Culture"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-300 transition-colors hover:border-pink-500 hover:bg-pink-600 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-gray-500 gap-4">
          <p className="text-center sm:text-left">
            © 2026 Festival HWENDO-CULTURE 🇧🇯. Tous droits réservés. Patrimoine & Culture Endogène du Bénin.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 rounded-lg border border-neutral-800 flex items-center space-x-1 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Haut de page</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
