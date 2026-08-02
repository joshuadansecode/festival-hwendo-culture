import React from 'react';
import { useFestival } from '../../context/FestivalContext';
import { CheckCircle2, Download, Share2, MessageCircle, X, Sparkles, Printer } from 'lucide-react';
import { LogoFestivalHwendo } from './Logos';

export const ReceiptModal: React.FC = () => {
  const { isReceiptModalOpen, setIsReceiptModalOpen, currentReceipt } = useFestival();

  if (!isReceiptModalOpen || !currentReceipt) return null;

  const formattedDate = new Date(currentReceipt.timestamp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const whatsappMessage = encodeURIComponent(
    `🏆 *FESTIVAL HWENDO-CULTURE 2026*\n\n` +
    `Je viens de voter pour le/la candidat(e) *${currentReceipt.participantName}* (N° ${currentReceipt.participantNumber}) !\n\n` +
    `🎟️ Votes crédités : *${currentReceipt.quantity} votes*\n` +
    `💳 Reçu N° : ${currentReceipt.receiptNumber}\n` +
    ` Votez vous aussi sur le site officiel du festival !`
  );

  const whatsappShareUrl = `https://wa.me/?text=${whatsappMessage}`;
  const festivalWhatsAppDirectUrl = `https://wa.me/2290160744415?text=${whatsappMessage}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mobile-safe-modal fixed inset-0 z-50 flex items-start justify-center p-3 pt-20 bg-black/85 backdrop-blur-md overflow-y-auto sm:items-center sm:p-4 sm:pt-4">
      <div className="relative w-full max-w-md bg-neutral-900 border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Celebration banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-4 text-center text-white relative">
          <button 
            onClick={() => setIsReceiptModalOpen(false)}
            className="absolute top-3 right-3 p-1 text-white/80 hover:text-white bg-black/20 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-extrabold text-lg">Paiement confirmé</h3>
          <p className="text-xs text-emerald-100 font-medium">Reçu de vote sécurisé</p>
        </div>

        {/* Printable Receipt area */}
        <div className="p-6 bg-neutral-950 text-white space-y-6 print:bg-white print:text-black" id="printable-receipt">
          
          <div className="text-center pb-4 border-b border-neutral-800">
            <LogoFestivalHwendo variant="color" className="h-10 mx-auto" />
            <span className="inline-block mt-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
              REÇU DE VOTE OFFICIEL
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>N° de Reçu:</span>
              <span className="font-mono text-white font-bold">{currentReceipt.receiptNumber}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Date & Heure:</span>
              <span className="text-gray-200 font-medium">{formattedDate}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Réf. Transaction:</span>
              <span className="font-mono text-amber-400">{currentReceipt.transactionRef}</span>
            </div>
          </div>

          {/* Participant Voted details */}
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Candidat Bénéficiaire</p>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-amber-400 text-sm">{currentReceipt.participantName}</h4>
                <p className="text-xs text-gray-300">N° {currentReceipt.participantNumber} • {currentReceipt.category.toUpperCase()}</p>
              </div>
              <span className="text-xl font-black text-white bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/40">
                +{currentReceipt.quantity} votes
              </span>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="space-y-2 text-xs border-t border-neutral-800 pt-3">
            <div className="flex justify-between text-gray-300">
              <span>Nom du Votant:</span>
              <span className="font-semibold text-white">{currentReceipt.voterName}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Téléphone:</span>
              <span className="font-mono text-white">{currentReceipt.voterPhone}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Mode de paiement:</span>
              <span className="font-medium text-emerald-400">{currentReceipt.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-neutral-800">
              <span>Montant Réglé:</span>
              <span className="text-amber-400 text-base">{currentReceipt.totalAmountFCFA.toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl text-[10px] text-gray-400">
            <div className="space-y-1">
              <p className="font-bold text-gray-300">Authenticité Garantie</p>
              <p>Festival HWENDO-CULTURE Bénin</p>
              <p>WhatsApp: +229 01 60 74 44 15</p>
            </div>
            <span className="rounded-lg border border-emerald-500/30 px-2 py-1 text-emerald-300">Référence vérifiable</span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 space-y-2">
          
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors shadow"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Partager mon vote sur WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-neutral-700"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le reçu</span>
            </button>

            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl flex items-center justify-center space-x-1 transition-colors"
            >
              <span>Fermer</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
