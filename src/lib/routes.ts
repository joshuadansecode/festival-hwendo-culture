import type { TabType } from '../context/FestivalContext';

export const tabRoutes: Record<TabType, string> = {
  accueil: '/',
  festival: '/festival',
  'miss-endo': '/miss-endo-culture',
  'nuit-elegance': '/nuit-elegance-africaine',
  'match-gala': '/match-de-gala',
  participants: '/participants',
  voter: '/voter',
  programme: '/programme',
  actualites: '/actualites',
  galerie: '/galerie',
  comite: '/comite-organisation',
  contact: '/contact',
  admin: '/admin',
};

const routeTabs = Object.entries(tabRoutes).reduce<Record<string, TabType>>(
  (routes, [tab, path]) => ({ ...routes, [path]: tab as TabType }),
  {},
);

export const normalizePath = (pathname: string) => {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
};

export const tabFromPath = (pathname: string): TabType => {
  const path = normalizePath(pathname);
  if (path.startsWith('/actualites/')) return 'actualites';
  if (path.startsWith('/galerie/')) return 'galerie';
  return routeTabs[path] ?? 'accueil';
};

export const participantIdFromPath = (pathname: string) => {
  const match = normalizePath(pathname).match(/^\/participants\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const participantIdFromVotePath = () => new URLSearchParams(window.location.search).get('participant');

export const pathForTab = (tab: TabType) => tabRoutes[tab];

export const articleSlugFromPath = (pathname: string) => {
  const match = normalizePath(pathname).match(/^\/actualites\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};
