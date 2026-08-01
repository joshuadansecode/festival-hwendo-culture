import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Facebook, Instagram, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

export const ContactPage: React.FC = () => {
  const { faqs } = useFestival();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-white">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Écrivez-nous</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">Contact & Localisation</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          L'équipe du Festival HWENDO-CULTURE reste disponible pour répondre à toutes vos interrogations.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <a 
          href="https://wa.me/2290160744415" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-neutral-900 border border-emerald-500/40 p-6 rounded-2xl hover:border-emerald-400 transition-all flex items-center space-x-4 group shadow-xl"
        >
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">WhatsApp Officiel</h3>
            <p className="text-xs text-emerald-400 font-bold mt-0.5">+229 01 60 74 44 15</p>
            <p className="text-[10px] text-gray-400">Réponse rapide garantie</p>
          </div>
        </a>

        <a 
          href="mailto:festivalhwendoculture@gmail.com" 
          className="bg-neutral-900 border border-amber-500/40 p-6 rounded-2xl hover:border-amber-400 transition-all flex items-center space-x-4 group shadow-xl"
        >
          <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-bold shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">E-mail Officiel</h3>
            <p className="text-xs text-amber-300 font-bold mt-0.5">festivalhwendoculture@gmail.com</p>
            <p className="text-[10px] text-gray-400">Pour partenariats & presse</p>
          </div>
        </a>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center space-x-4 shadow-xl">
          <div className="w-12 h-12 bg-neutral-800 text-amber-400 rounded-xl flex items-center justify-center font-bold shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Siège & Lieux</h3>
            <p className="text-xs text-gray-300 mt-0.5">Mairie d'Abomey-Calavi, Bénin</p>
            <p className="text-[10px] text-gray-400">Salle du Peuple & Terrains</p>
          </div>
        </div>

      </div>

      {/* Form & Map section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-6 shadow-xl">
          <h2 className="text-xl font-extrabold uppercase text-amber-400">Formulaire de Message</h2>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-extrabold text-white">Message envoyé avec succès !</h3>
              <p className="text-xs text-emerald-200">Notre équipe de communication vous recontactera très prochainement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-bold">Nom complet *</label>
                <input required type="text" placeholder="Votre nom..." className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Numéro Téléphone / WhatsApp *</label>
                <input required type="tel" placeholder="+229..." className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Votre Message *</label>
                <textarea required rows={4} placeholder="Tapez votre message ici..." className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500" />
              </div>

              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase rounded-xl flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>

        {/* Map location & FAQ */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <h2 className="text-xl font-extrabold uppercase text-amber-400">Localisation des événements</h2>
            <p className="text-xs text-gray-300">
              Les activités du festival sont principalement concentrées au cœur de la ville d'Abomey-Calavi, à proximité de la Mairie et du Palais des congrès.
            </p>
            <div className="w-full h-48 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center relative overflow-hidden">
              <span className="text-xs text-gray-400 font-bold">Interactive Map Preview — Abomey-Calavi, Bénin</span>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold uppercase text-amber-400 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Foire aux questions (FAQ)</span>
              </h2>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                {faqs.length} question{faqs.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-2.5">
              {faqs.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">Aucune question fréquente enregistrée pour le moment.</p>
              ) : (
                faqs.map((faq) => (
                  <div key={faq.id} className="border border-neutral-800 rounded-xl overflow-hidden transition-all hover:border-amber-500/40">
                    <button
                      onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                      className="w-full p-3.5 text-left font-bold text-xs text-white flex justify-between items-center bg-neutral-950 hover:bg-neutral-800/80 transition-colors"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaqId === faq.id && (
                      <div className="p-4 bg-neutral-900 text-xs text-gray-300 border-t border-neutral-800 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
