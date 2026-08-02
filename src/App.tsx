import React, { lazy, Suspense } from 'react';
import { FestivalProvider, useFestival } from './context/FestivalContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { VoteModal } from './components/common/VoteModal';
import { ReceiptModal } from './components/common/ReceiptModal';

import { Home } from './components/home/Home';
import { FestivalPage } from './components/festival/FestivalPage';
import { MissEndoPage } from './components/events/MissEndoPage';
import { NuitElegancePage } from './components/events/NuitElegancePage';
import { MatchGalaPage } from './components/events/MatchGalaPage';
import { ParticipantsPage } from './components/participants/ParticipantsPage';
import { VotesPage } from './components/votes/VotesPage';
import { ProgrammePage } from './components/programme/ProgrammePage';
import { ActualitesPage } from './components/actualites/ActualitesPage';
import { GaleriePage } from './components/galerie/GaleriePage';
import { ComitePage } from './components/comite/ComitePage';
import { ContactPage } from './components/contact/ContactPage';
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
import { PaymentReturnPage } from './components/votes/PaymentReturnPage';
import { NotFoundPage } from './components/common/NotFoundPage';
import { ParticipantProfilePage } from './components/participants/ParticipantProfilePage';
import { participantIdFromPath, tabFromPath } from './lib/routes';

const MainContent: React.FC = () => {
  const { activeTab } = useFestival();
  const path = window.location.pathname.replace(/\/$/, '');

  if (path === '/vote/success') return <PaymentReturnPage status="success" />;
  if (path === '/vote/cancelled') return <PaymentReturnPage status="cancelled" />;
  const participantId = participantIdFromPath(path);
  if (participantId) return <ParticipantProfilePage participantId={participantId} />;
  if (path && tabFromPath(path) === 'accueil') return <NotFoundPage />;

  if (activeTab === 'admin') {
    return (
      <main className="min-h-screen overflow-x-hidden bg-neutral-950 font-sans text-gray-100 selection:bg-amber-500 selection:text-black">
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-gray-400">Chargement de l’administration...</div>}><AdminDashboard /></Suspense>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden flex flex-col justify-between bg-neutral-950 font-sans text-gray-100 selection:bg-amber-500 selection:text-black">
      <div>
        <Navbar />
        <div>
          {activeTab === 'accueil' && <Home />}
          {activeTab === 'festival' && <FestivalPage />}
          {activeTab === 'miss-endo' && <MissEndoPage />}
          {activeTab === 'nuit-elegance' && <NuitElegancePage />}
          {activeTab === 'match-gala' && <MatchGalaPage />}
          {activeTab === 'participants' && <ParticipantsPage />}
          {activeTab === 'voter' && <VotesPage />}
          {activeTab === 'programme' && <ProgrammePage />}
          {activeTab === 'actualites' && <ActualitesPage />}
          {activeTab === 'galerie' && <GaleriePage />}
          {activeTab === 'comite' && <ComitePage />}
          {activeTab === 'contact' && <ContactPage />}
        </div>
      </div>
      
      <Footer />

      {/* Global Modals */}
      <VoteModal />
      <ReceiptModal />
    </main>
  );
};

export default function App() {
  return (
    <FestivalProvider>
      <MainContent />
    </FestivalProvider>
  );
}
