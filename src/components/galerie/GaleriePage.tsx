import React, { useEffect, useRef, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { GalleryItem } from '../../types';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  Facebook,
  FolderOpen,
  Image as ImageIcon,
  Images,
  MessageCircle,
  Play,
  Share2,
  X,
} from 'lucide-react';

const PAGE_SIZE = 12;

const categoryLabels: Record<string, string> = {
  'miss-endo': 'Miss ENDO-CULTURE',
  'nuit-elegance': "Nuit de l'Élégance",
  'match-gala': 'Match de Gala',
  general: 'Festival général',
};

const getAlbumDescription = (edition: string) => {
  if (edition.includes('Défi culinaire') || edition.includes('Challenge cuisine')) {
    return 'Saveurs, gestes et savoir-faire : revivez le patrimoine culinaire porté par les candidates.';
  }
  if (edition.includes('Attestations')) {
    return 'Les talents de la mode africaine célébrés au terme d’une soirée d’exception.';
  }
  if (edition.includes('Ell’Art')) {
    return 'Une collection où matières, silhouettes et héritage africain dialoguent sur le podium.';
  }
  if (edition.includes('Christy')) {
    return 'Découvrez les créations et les passages marquants de Christy’s Fashion Store.';
  }
  return 'Une sélection de moments forts, de rencontres et d’émotions de cette édition.';
};

const getPhotoMeta = (item: GalleryItem, index: number) => {
  const position = index % 6;
  if (item.edition.includes('Défi culinaire') || item.edition.includes('Challenge cuisine')) {
    const captions = [
      'Les candidates au cœur de la préparation',
      'Les saveurs locales mises à l’honneur',
      'Gestes et savoir-faire culinaires',
      'Présentation des mets identitaires',
      'Un moment de partage autour du patrimoine',
      'Les talents du challenge culinaire',
    ];
    return { tag: position === 4 ? 'Ambiance' : 'Cuisine', caption: captions[position] };
  }
  if (item.edition.includes('Attestations')) {
    return { tag: 'Cérémonie', caption: position % 2 === 0 ? 'Les talents célébrés sur la scène' : 'Remise des attestations aux participants' };
  }
  if (item.edition.includes('Ell’Art')) {
    return { tag: position % 3 === 0 ? 'Coulisses' : 'Tenue', caption: 'Création Ell’Art présentée sur le podium' };
  }
  if (item.edition.includes('Christy')) {
    return { tag: position % 3 === 0 ? 'Ambiance' : 'Tenue', caption: 'Silhouette de la collection Christy’s Fashion' };
  }
  return { tag: categoryLabels[item.category] ?? 'Festival', caption: item.title };
};

const getEditorialLayout = (index: number) => {
  const position = index % 8;
  if (position === 0) return 'md:col-span-7 md:row-span-2';
  if (position === 1) return 'md:col-span-5';
  if (position === 2) return 'md:col-span-5';
  if (position === 3) return 'md:col-span-4';
  if (position === 4) return 'md:col-span-4';
  if (position === 5) return 'md:col-span-4';
  if (position === 6) return 'md:col-span-5';
  return 'md:col-span-7';
};

export const GaleriePage: React.FC = () => {
  const { gallery } = useFestival();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const albumGridRef = useRef<HTMLDivElement>(null);

  const albums = Array.from(
    gallery.reduce((groups, item) => {
      const key = `${item.category}::${item.edition}`;
      const existing = groups.get(key);
      if (existing) existing.items.push(item);
      else groups.set(key, { key, category: item.category, edition: item.edition, items: [item] });
      return groups;
    }, new Map<string, { key: string; category: string; edition: string; items: GalleryItem[] }>()),
  ).map(([, album]) => album);

  const filteredAlbums = albums.filter(
    (album) => selectedCategory === 'all' || album.category === selectedCategory,
  );
  const activeAlbum = albums.find((album) => album.key === selectedAlbum) ?? null;
  const activeItems = activeAlbum?.items ?? [];
  const lightboxItem = lightboxIndex === null ? null : activeItems[lightboxIndex];

  const openAlbum = (albumKey: string) => {
    setSelectedAlbum(albumKey);
    setVisibleCount(PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLinkCopied(false);
  };

  const showPrevious = () => {
    if (!activeItems.length) return;
    setLightboxIndex((current) => current === null ? 0 : (current - 1 + activeItems.length) % activeItems.length);
  };

  const showNext = () => {
    if (!activeItems.length) return;
    setLightboxIndex((current) => current === null ? 0 : (current + 1) % activeItems.length);
  };

  const copyImageLink = async () => {
    if (!lightboxItem) return;
    await navigator.clipboard.writeText(lightboxItem.url);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1800);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, activeItems.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-white">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Immersion visuelle</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">Galerie Photos & Vidéos</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Revivez les défilés, concours et temps forts du festival, organisés par événement et par édition.
        </p>
      </div>

      {!activeAlbum ? (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
            {[
              { id: 'all', label: 'Tous les albums' },
              { id: 'miss-endo', label: 'Miss ENDO-CULTURE' },
              { id: 'nuit-elegance', label: "Nuit de l'Élégance" },
              { id: 'match-gala', label: 'Match de Gala' },
              { id: 'general', label: 'Festival général' },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-black'
                    : 'bg-neutral-900 text-gray-300 border border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredAlbums.map((album) => {
                const cover = album.items[0];
                return (
                  <button
                    key={album.key}
                    onClick={() => openAlbum(album.key)}
                    className="group text-left bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/60 transition-all shadow-xl"
                  >
                    <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                      <img
                        src={cover.type === 'video' && cover.thumbnailUrl ? cover.thumbnailUrl : cover.url}
                        alt={`Couverture de ${album.edition}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold backdrop-blur">
                        <Images className="w-3.5 h-3.5 text-amber-400" /> {album.items.length} médias
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                          {categoryLabels[album.category] ?? album.category}
                        </span>
                        <h2 className="mt-1 text-lg font-black leading-tight text-white">{album.edition}</h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 text-xs font-bold text-gray-300">
                      <span>Ouvrir l’album</span>
                      <FolderOpen className="w-4 h-4 text-amber-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-700 py-16 text-center text-gray-400">
              <ImageIcon className="mx-auto mb-3 h-10 w-10 text-neutral-600" />
              <p className="font-bold">Aucun album disponible dans cette catégorie.</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-amber-500/30 shadow-2xl sm:min-h-[520px]">
            <img
              src={activeItems[0]?.type === 'video' && activeItems[0]?.thumbnailUrl ? activeItems[0].thumbnailUrl : activeItems[0]?.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
            <div className="relative flex min-h-[420px] max-w-3xl flex-col justify-between p-6 sm:min-h-[520px] sm:p-12">
              <button onClick={() => setSelectedAlbum(null)} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:border-amber-400 hover:text-amber-300">
                <ArrowLeft className="h-4 w-4" /> Retour aux albums
              </button>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">{categoryLabels[activeAlbum.category]}</span>
                  <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase text-white backdrop-blur">{activeItems.length} médias</span>
                </div>
                <h2 className="max-w-2xl text-4xl font-black leading-[0.95] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">{activeAlbum.edition}</h2>
                <p className="max-w-xl text-sm leading-6 text-gray-200 sm:text-base">{getAlbumDescription(activeAlbum.edition)}</p>
                <button
                  onClick={() => albumGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-xs font-black uppercase tracking-wide text-black shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400"
                >
                  Explorer les moments <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div ref={albumGridRef} className="scroll-mt-32 space-y-3 pt-2">
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-400">Dans les coulisses</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="max-w-2xl text-2xl font-black leading-tight sm:text-4xl">Une histoire racontée en images</h3>
              <p className="max-w-md text-xs leading-5 text-gray-400">Chaque image témoigne d’un geste, d’une création ou d’une émotion qui fait vivre notre patrimoine.</p>
            </div>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[190px]">
            {activeItems.slice(0, visibleCount).map((item, index) => {
              const meta = getPhotoMeta(item, index);
              return (
                <button
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-amber-500/10 ${getEditorialLayout(index)}`}
                >
                  <img
                    src={item.type === 'video' && item.thumbnailUrl ? item.thumbnailUrl : item.url}
                    alt={meta.caption}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  {item.type === 'video' && <Play className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 fill-amber-500 text-amber-500" />}
                  <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="mb-2 inline-flex rounded-full bg-amber-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-black">{meta.tag}</span>
                    <p className={`${index % 8 === 0 ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'} max-w-lg font-bold leading-snug text-white drop-shadow-md`}>{meta.caption}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {visibleCount < activeItems.length && (
            <div className="text-center">
              <button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-black uppercase text-black hover:bg-amber-400">
                Charger plus ({activeItems.length - visibleCount})
              </button>
            </div>
          )}
        </>
      )}

      {lightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={lightboxItem.title}>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{activeAlbum?.edition}</p>
              <p className="text-xs text-gray-400">{lightboxIndex + 1} / {activeItems.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${lightboxItem.title} ${lightboxItem.url}`)}`} target="_blank" rel="noreferrer" className="rounded-full bg-green-600 p-2 text-white" aria-label="Partager sur WhatsApp"><MessageCircle className="h-4 w-4" /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(lightboxItem.url)}`} target="_blank" rel="noreferrer" className="rounded-full bg-blue-600 p-2 text-white" aria-label="Partager sur Facebook"><Facebook className="h-4 w-4" /></a>
              <button onClick={copyImageLink} className="rounded-full bg-white/10 p-2 text-white" aria-label="Copier le lien">{linkCopied ? <Share2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}</button>
              <button onClick={closeLightbox} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Fermer"><X className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6">
            <button onClick={showPrevious} className="absolute left-2 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-amber-500 hover:text-black sm:left-5" aria-label="Photo précédente"><ChevronLeft className="h-6 w-6" /></button>
            {lightboxItem.type === 'video' ? (
              <video src={lightboxItem.url} controls autoPlay className="max-h-full max-w-full rounded-xl bg-black" />
            ) : (
              <img src={lightboxItem.url} alt={lightboxItem.title} className="max-h-full max-w-full object-contain" />
            )}
            <button onClick={showNext} className="absolute right-2 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-amber-500 hover:text-black sm:right-5" aria-label="Photo suivante"><ChevronRight className="h-6 w-6" /></button>
          </div>

          <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-gray-400">
            Utilisez les flèches du clavier pour naviguer et Échap pour fermer.
          </div>
        </div>
      )}
    </div>
  );
};
