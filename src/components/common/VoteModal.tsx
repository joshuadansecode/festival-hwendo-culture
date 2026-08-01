import React, { useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { X, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const VoteModal: React.FC = () => {
  const { 
    isVoteModalOpen, 
    setIsVoteModalOpen, 
    selectedParticipantForVote, 
    votingConfig,
    startLeekPayCheckout
  } = useFestival();

  const [quantity, setQuantity] = useState<number>(5);
  const [customQty, setCustomQty] = useState<string>('');
  const [voterName, setVoterName] = useState<string>('');
  const [voterPhone, setVoterPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isVoteModalOpen || !selectedParticipantForVote) return null;

  const currentVotesCount = customQty ? parseInt(customQty, 10) || 1 : quantity;
  const pricePerVote = votingConfig.pricePerVoteFCFA;
  const totalAmountFCFA = currentVotesCount * pricePerVote;

  const quickPackages = [1, 5, 10, 25, 50, 100];

  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (currentVotesCount < 1) {
      setErrorMessage('Le nombre de votes doit être d’au moins 1.');
      return;
    }

    if (!voterPhone || voterPhone.trim().length < 8) {
      setErrorMessage('Veuillez entrer un numéro de téléphone valide (ex: +229 01XX XX XX).');
      return;
    }

    setIsSubmitting(true);

    const result = await startLeekPayCheckout({
      participantId: selectedParticipantForVote.id,
      quantity: currentVotesCount,
      voterName: voterName.trim() || 'Supporter Anonyme',
      voterPhone: voterPhone.trim(),
    });
    setIsSubmitting(false);
    if (result.error) setErrorMessage(result.error);
    else if (result.paymentUrl) window.location.assign(result.paymentUrl);
  };

  return (
    <div translate="no" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-950 via-neutral-900 to-amber-950 p-5 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Voter pour le candidat
            </h3>
          </div>
          <button 
            onClick={() => setIsVoteModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitVote} className="p-6 space-y-6">
          
          {/* Candidate Card preview */}
          <div className="flex items-center space-x-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="relative">
              <img 
                src={selectedParticipantForVote.photo} 
                alt={selectedParticipantForVote.name}
                className="w-20 h-20 object-cover rounded-lg border-2 border-amber-500/60 shadow" 
              />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-black px-2 py-0.5 rounded-full shadow">
                N° {selectedParticipantForVote.number}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-base">
                {selectedParticipantForVote.name}
              </h4>
              <p className="text-xs text-amber-400 font-medium capitalize mt-0.5">
                {selectedParticipantForVote.category.replace('-', ' ')} • {selectedParticipantForVote.community}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-300">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span><strong>{selectedParticipantForVote.votesCount.toLocaleString()}</strong> votes actuels</span>
              </div>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              Choisir le nombre de votes ({pricePerVote} FCFA / vote)
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {quickPackages.map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => { setQuantity(qty); setCustomQty(''); }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                    !customQty && quantity === qty 
                      ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-lg shadow-amber-500/20' 
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:border-amber-500/50'
                  }`}
                >
                  +{qty}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="number"
                min="1"
                placeholder="Autre nombre de votes personnalisé..."
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Calculated Price Summary */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 p-4 rounded-xl border border-amber-500/40 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300 uppercase">Total à payer</span>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-400">
                {totalAmountFCFA.toLocaleString()} FCFA
              </span>
              <p className="text-[10px] text-gray-400">
                ({currentVotesCount} vote{currentVotesCount > 1 ? 's' : ''} × {pricePerVote} FCFA)
              </p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Votre Nom & Prénom (Facultatif)
              </label>
              <input
                type="text"
                placeholder="Ex: Koffi Mensah"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Numéro Mobile Money Bénin <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+229 01 00 00 00"
                value={voterPhone}
                onChange={(e) => setVoterPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>LeekPay vous proposera le moyen de paiement disponible après validation.</span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Security badge */}
          <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Paiement sécurisé et comptabilisation instantanée du vote</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black uppercase text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Validation du paiement en cours...</span>
              </span>
            ) : (
              <span>Payer {totalAmountFCFA.toLocaleString()} FCFA & Voter</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
