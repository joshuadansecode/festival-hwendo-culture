import React, { useEffect, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { NewsArticle } from '../../types';
import { Newspaper, Calendar, User, X, Share2, MessageCircle, Facebook, Link, ExternalLink, Phone, Mail, ClipboardCheck } from 'lucide-react';
import { articleSlugFromPath } from '../../lib/routes';

export const ActualitesPage: React.FC = () => {
  const { news } = useFestival();
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const syncArticleFromUrl = () => {
      const slug = articleSlugFromPath(window.location.pathname);
      setActiveArticle(slug ? news.find((article) => article.slug === slug) ?? null : null);
    };
    syncArticleFromUrl();
    window.addEventListener('popstate', syncArticleFromUrl);
    return () => window.removeEventListener('popstate', syncArticleFromUrl);
  }, [news]);

  const openArticle = (article: NewsArticle, replace = false) => {
    setActiveArticle(article);
    setLinkCopied(false);
    const path = `/actualites/${encodeURIComponent(article.slug)}`;
    window.history[replace ? 'replaceState' : 'pushState']({ article: article.slug }, '', path);
  };

  const closeArticle = () => {
    setActiveArticle(null);
    setLinkCopied(false);
    window.history.pushState({}, '', '/actualites');
  };

  const articleUrl = activeArticle
    ? `${window.location.origin}/actualites/${activeArticle.slug}`
    : '';

  const copyArticleLink = async () => {
    if (!activeArticle) return;
    try {
      await navigator.clipboard.writeText(articleUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      setLinkCopied(false);
    }
  };

  const getArticleAction = (article: NewsArticle) => {
    if (article.slug.includes('inscriptions')) {
      return { label: 'Voir le formulaire', url: 'https://forms.gle/F4AM5ng6kYEffKXs5' };
    }
    if (article.slug.includes('ambassadeurs')) {
      return { label: 'Devenir ambassadeur', url: 'https://forms.gle/bWnuLPbXqnybVrMN9' };
    }
    if (article.slug.includes('sponsors')) {
      return { label: 'Devenir partenaire', url: 'mailto:ajdcas.benin02@gmail.com' };
    }
    if (article.slug.includes('stands')) {
      return { label: 'Réserver un stand', url: 'https://wa.me/229016074415' };
    }
    return null;
  };

  const relatedArticles = activeArticle
    ? news.filter((article) => article.id !== activeArticle.id && article.category === activeArticle.category).slice(0, 2)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-white">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Presse & Communiqués</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">Actualités du Festival</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Suivez toutes les annonces officielles, résumés de conférences et résultats intermédiaires.
        </p>
      </div>

      <div className="space-y-6">
        {news.slice(0, 1).map((item) => (
          <div 
            key={item.id} 
            onClick={() => openArticle(item)}
            className="group grid overflow-hidden rounded-2xl border border-amber-500/35 bg-neutral-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/70 md:grid-cols-[1.45fr_1fr] cursor-pointer"
          >
            <div className="relative min-h-64 bg-neutral-950 sm:min-h-80">
              <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {item.category}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 space-y-4 sm:p-8">
              <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.date}</span>
                <span>•</span>
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.author}</span>
              </div>

              <h3 className="text-xl font-bold leading-snug text-white sm:text-3xl">{item.title}</h3>
              <p className="text-sm leading-6 text-gray-400">{item.summary}</p>

              <button className="text-xs font-bold text-amber-400 hover:underline pt-2">
                Lire l'article complet →
              </button>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {news.slice(1).map((item) => (
          <div key={item.id} onClick={() => openArticle(item)} className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
            <div className="relative h-48 bg-neutral-950">
              <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-black">{item.category}</span>
            </div>
            <div className="flex flex-1 flex-col p-5 space-y-3">
              <div className="flex items-center space-x-2 text-[11px] text-gray-400"><Calendar className="h-3.5 w-3.5 text-amber-400" /><span>{item.date}</span><span>•</span><User className="h-3.5 w-3.5 text-amber-400" /><span>{item.author}</span></div>
              <h3 className="line-clamp-2 text-base font-bold leading-snug text-white">{item.title}</h3>
              <p className="line-clamp-3 text-xs text-gray-400">{item.summary}</p>
              <button className="mt-auto pt-2 text-left text-xs font-bold text-amber-400 hover:underline">Lire l'article complet →</button>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="mobile-safe-modal fixed inset-0 z-50 flex items-start justify-center bg-black/85 p-3 pt-20 backdrop-blur-md overflow-y-auto overscroll-contain sm:items-center sm:p-4 sm:pt-4">
          <div className="min-h-full flex items-start justify-center p-4 pt-20 sm:pt-24 pb-10">
            <div className="relative w-full max-w-2xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl text-white p-5 sm:p-6 space-y-4">
            
            <div className="flex justify-between items-start">
              <span className="bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded-full uppercase">
                {activeArticle.category}
              </span>
              <button onClick={closeArticle} className="p-2 text-gray-400 hover:text-white bg-neutral-800 rounded-full" aria-label="Fermer l'article">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black">{activeArticle.title}</h2>

            <div className="flex items-center space-x-3 text-xs text-gray-400 border-b border-neutral-800 pb-3">
              <span>Par {activeArticle.author}</span>
              <span>•</span>
              <span>Publié le {activeArticle.date}</span>
            </div>

            <div className="rounded-xl bg-black/40 border border-neutral-800 overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="block w-full h-auto max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <div className="text-sm text-gray-300 leading-7 space-y-4 whitespace-pre-line">
              <p className="font-semibold text-amber-200">{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
            </div>

            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Partager cette annonce</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a href={`https://wa.me/?text=${encodeURIComponent(`${activeArticle.title} ${articleUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600/90 px-3 py-2 text-xs font-bold text-white hover:bg-green-500">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600/90 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <button onClick={copyArticleLink} className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-neutral-700">
                  {linkCopied ? <ClipboardCheck className="w-4 h-4 text-emerald-400" /> : <Link className="w-4 h-4" />}
                  {linkCopied ? 'Copié' : 'Copier le lien'}
                </button>
                <a href="tel:+229016074415" className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black hover:bg-amber-400">
                  <Phone className="w-4 h-4" /> Contact
                </a>
              </div>
            </div>

            {getArticleAction(activeArticle) && (
              <a href={getArticleAction(activeArticle)?.url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-black uppercase tracking-wide text-black hover:from-amber-400 hover:to-orange-400">
                <ExternalLink className="w-4 h-4" />
                {getArticleAction(activeArticle)?.label}
              </a>
            )}

            <div className="flex flex-wrap gap-3 border-t border-neutral-800 pt-3 text-xs text-gray-400">
              <a href="mailto:festivalhwendoculture@gmail.com" className="inline-flex items-center gap-1.5 hover:text-amber-300"><Mail className="w-3.5 h-3.5" /> festivalhwendoculture@gmail.com</a>
              <a href="https://wa.me/229016074415" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-amber-300"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp du festival</a>
            </div>

            {relatedArticles.length > 0 && (
              <div className="border-t border-neutral-800 pt-4">
                <p className="mb-3 text-xs font-black uppercase tracking-wider text-amber-400">À découvrir aussi</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {relatedArticles.map((article) => (
                    <button key={article.id} onClick={() => openArticle(article, true)} className="flex items-center gap-3 rounded-lg bg-neutral-800/70 p-2 text-left hover:bg-neutral-800">
                      <img src={article.image} alt="" className="h-12 w-16 rounded object-cover" />
                      <span className="line-clamp-2 text-xs font-bold text-gray-200">{article.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
