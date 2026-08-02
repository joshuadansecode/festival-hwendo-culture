import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFestival, TabType } from '../../context/FestivalContext';
import { LogoFestivalHwendo } from './Logos';
import { 
  Menu, X, Vote, Calendar, Image as ImageIcon, Users, 
  Newspaper, Phone, Shield, Sparkles, ChevronDown, Trophy, Info, Sun, Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, votingConfig, isAdminLoggedIn, theme, toggleTheme } = useFestival();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setEventsDropdownOpen(false);
  };

  const navItems = [
    { id: 'accueil' as TabType, label: 'Accueil' },
    { id: 'festival' as TabType, label: 'Le Festival' },
    { id: 'participants' as TabType, label: 'Participants' },
    { id: 'voter' as TabType, label: 'Voter', badge: votingConfig.isVotingOpen ? 'LIVE' : undefined },
    { id: 'programme' as TabType, label: 'Programme' },
    { id: 'actualites' as TabType, label: 'Actualités' },
    { id: 'galerie' as TabType, label: 'Galerie' },
    { id: 'comite' as TabType, label: 'Comité' },
    { id: 'contact' as TabType, label: 'Contact' },
  ];

  const isEventTabActive = ['nuit-elegance', 'miss-endo', 'match-gala'].includes(activeTab);

  return (
    <header translate="no" className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/30 text-white transition-all shadow-xl">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('accueil')} 
            className="flex items-center text-left focus:outline-none group"
          >
            <LogoFestivalHwendo variant="color" className="h-10 sm:h-12" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2">
            <button
              onClick={() => handleNavClick('accueil')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all ${
                activeTab === 'accueil' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-300 hover:text-amber-400 hover:bg-neutral-900'
              }`}
            >
              Accueil
            </button>

            <button
              onClick={() => handleNavClick('festival')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all ${
                activeTab === 'festival' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-300 hover:text-amber-400 hover:bg-neutral-900'
              }`}
            >
              Le Festival
            </button>

            {/* Events Dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
                className={`px-3 py-2 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all flex items-center space-x-1 ${
                  isEventTabActive ? 'bg-amber-500 text-black shadow-md' : 'text-gray-300 hover:text-amber-400 hover:bg-neutral-900'
                }`}
              >
                <span>Événements</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {eventsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-neutral-900 border border-amber-500/40 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('miss-endo')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/10 flex items-center space-x-2"
                  >
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Concours Miss ENDO-CULTURE</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('nuit-elegance')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-orange-400 hover:bg-orange-500/10 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Nuit de l'Élégance Africaine</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('match-gala')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Match de Gala HWENDO</span>
                  </button>
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all ${
                  activeTab === item.id 
                    ? 'bg-amber-500 text-black shadow-md' 
                    : 'text-gray-300 hover:text-amber-400 hover:bg-neutral-900'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="live-badge absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-black rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Vote Action Button & Theme Switcher */}
          <div className="hidden xl:flex items-center space-x-2 2xl:space-x-3">
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Passer au Mode Clair Élégant (Or & Ivoire)' : 'Passer au Mode Sombre Prestige'}
              className="p-2.5 bg-neutral-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500 rounded-xl transition-all flex items-center justify-center shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-amber-600" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('voter')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
            >
              <Vote className="w-4 h-4" />
              <span>Voter Maintenant</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-neutral-900 border border-amber-500/30 text-amber-400 rounded-lg"
              title="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-amber-600" />}
            </button>

            <button
              onClick={() => handleNavClick('voter')}
              className="hidden xs:inline-flex px-3 py-1.5 bg-amber-500 text-black text-[10px] sm:text-xs font-black rounded-lg uppercase"
            >
              Voter
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white bg-neutral-900 rounded-lg border border-neutral-800"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Modal/Drawer */}
      {mobileMenuOpen && createPortal(
        <>
        <button className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-sm xl:hidden" onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu" />
        <div translate="no" className="fixed bottom-0 right-0 top-0 z-[100] w-[min(88vw,360px)] overflow-y-auto overscroll-contain xl:hidden bg-neutral-950 border-l border-amber-500/30 px-5 pt-5 pb-7 space-y-2 shadow-2xl drawer-enter">
          <div className="mb-5 flex items-center justify-between border-b border-neutral-800 pb-4">
            <LogoFestivalHwendo variant="color" className="h-10" />
            <button onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 text-gray-200" aria-label="Fermer le menu"><X className="h-5 w-5" /></button>
          </div>
          <button
            onClick={() => handleNavClick('accueil')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase ${
              activeTab === 'accueil' ? 'bg-amber-500 text-black font-extrabold' : 'text-gray-200'
            }`}
          >
            Accueil
          </button>

          <button
            onClick={() => handleNavClick('festival')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase ${
              activeTab === 'festival' ? 'bg-amber-500 text-black font-extrabold' : 'text-gray-200'
            }`}
          >
            Le Festival
          </button>

          {/* Mobile Events Group */}
          <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800 space-y-1 my-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2">Nos 3 Événements</span>
            <button
              onClick={() => handleNavClick('miss-endo')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                activeTab === 'miss-endo' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-300'
              }`}
            >
              • Concours Miss ENDO-CULTURE
            </button>
            <button
              onClick={() => handleNavClick('nuit-elegance')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                activeTab === 'nuit-elegance' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-300'
              }`}
            >
              • Nuit de l'Élégance Africaine
            </button>
            <button
              onClick={() => handleNavClick('match-gala')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                activeTab === 'match-gala' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-300'
              }`}
            >
              • Match de Gala HWENDO
            </button>
          </div>

          {navItems.slice(2).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase flex justify-between items-center ${
                activeTab === item.id ? 'bg-amber-500 text-black font-extrabold' : 'text-gray-200'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="live-badge bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('admin')}
            className="w-full text-left px-4 py-2.5 bg-neutral-900 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold uppercase flex items-center space-x-2 mt-4"
          >
            <Shield className="w-4 h-4" />
            <span>Administration {isAdminLoggedIn && '(Connecté)'}</span>
          </button>
        </div>
        </>,
        document.body,
      )}

    </header>
  );
};
