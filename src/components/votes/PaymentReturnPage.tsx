import React from 'react';
import { CheckCircle2, Clock3, Home, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

interface PaymentReturnPageProps {
  status: 'success' | 'cancelled';
}

export const PaymentReturnPage: React.FC<PaymentReturnPageProps> = ({ status }) => {
  const { setActiveTab } = useFestival();
  const successful = status === 'success';

  const leaveReturnPage = (tab: 'accueil' | 'voter') => {
    setActiveTab(tab);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12 text-white">
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] ${successful ? 'from-emerald-900/30' : 'from-orange-900/25'} via-neutral-950 to-neutral-950`} />

      <section className="relative w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 text-center shadow-2xl backdrop-blur sm:p-10">
        <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${successful ? 'bg-emerald-500/15 text-emerald-400' : 'bg-orange-500/15 text-orange-400'}`}>
          {successful ? <CheckCircle2 className="h-11 w-11" /> : <XCircle className="h-11 w-11" />}
        </div>

        <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-amber-400">
          Vote Festival HWENDO-CULTURE
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          {successful ? 'Paiement reçu' : 'Paiement annulé'}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
          {successful
            ? 'LeekPay a reçu votre paiement. La comptabilisation est en cours de confirmation sécurisée.'
            : "Aucun vote n'a été débité. Vous pouvez reprendre le processus quand vous le souhaitez."}
        </p>

        {successful && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-left text-xs leading-5 text-emerald-100">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <span>La comptabilisation est effectuée côté serveur et protégée contre les confirmations en double.</span>
          </div>
        )}

        {successful && <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400"><Clock3 className="h-4 w-4 text-amber-400" />Le classement se met à jour après réception du webhook.</div>}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button onClick={() => leaveReturnPage('voter')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase text-black hover:bg-amber-400">
            <RotateCcw className="h-4 w-4" />
            {successful ? 'Voir le classement' : 'Reprendre le vote'}
          </button>
          <button onClick={() => leaveReturnPage('accueil')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-950 px-5 py-3 text-xs font-black uppercase text-gray-200 hover:border-amber-500/50">
            <Home className="h-4 w-4" /> Accueil
          </button>
        </div>
      </section>
    </main>
  );
};
