import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  height?: number;
}

export const LogoFestivalHwendo: React.FC<LogoProps> = ({ className = "h-12", variant = 'color' }) => {
  return (
    <div translate="no" className={`inline-flex flex-col items-center justify-center font-sans tracking-wider ${className}`}>
      <div className="flex items-center space-x-1">
        <span className={`text-2xl md:text-3xl font-black tracking-tight ${variant === 'dark' ? 'text-black' : 'text-amber-400'}`}>FEST</span>
        <div className="relative inline-block w-6 h-8 bg-amber-500 rounded-sm flex items-center justify-center font-bold text-black text-xs shadow-inner">
          <svg viewBox="0 0 100 120" className="w-5 h-7 fill-amber-950"><path d="M20,10 C40,5 70,10 85,25 C95,35 90,55 75,65 C65,72 60,85 50,110 C40,110 30,95 25,80 C15,65 5,45 10,25 Z" /></svg>
        </div>
        <span className={`text-2xl md:text-3xl font-black tracking-tight ${variant === 'dark' ? 'text-black' : 'text-amber-400'}`}>VAL</span>
      </div>
      <div className="w-full flex items-center justify-between text-[10px] text-amber-500 my-0.5 tracking-widest opacity-90 select-none"><span>▲</span><span>•</span><span>♪</span><span>•</span><span>Δ</span><span>•</span><span>0</span><span>•</span><span>▲</span><span>•</span><span>♪</span></div>
      <div className={`text-xs md:text-sm font-extrabold tracking-widest uppercase ${variant === 'dark' ? 'text-gray-900' : 'text-white'}`}>HWENDO-CULTURE</div>
    </div>
  );
};

export const LogoNuitElegance: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div translate="no" className={`inline-flex items-center space-x-3 bg-neutral-950 px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-md ${className}`}>
      <div className="relative w-8 h-8 flex items-center justify-center"><svg viewBox="0 0 100 100" className="w-8 h-8 fill-orange-500"><path d="M50,10 C70,10 90,30 85,60 C80,80 60,95 50,95 C40,95 20,80 15,60 C10,30 30,10 50,10 Z M50,20 C40,35 35,55 45,80 C50,85 55,80 52,65 C50,50 60,30 50,20 Z" /></svg></div>
      <div className="flex flex-col text-left"><span className="text-[10px] italic font-serif text-orange-400 -mb-1">La</span><span className="text-xs font-black uppercase text-orange-500 tracking-wider">NUIT DE L'ÉLÉGANCE</span><span className="text-[9px] font-bold uppercase tracking-widest text-amber-300">AFRICAINE</span></div>
    </div>
  );
};

export const LogoMissEndo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div translate="no" className={`inline-flex items-center space-x-3 bg-black px-3 py-1.5 rounded-lg border border-amber-400/40 shadow-lg ${className}`}>
      <div className="relative w-8 h-8 flex items-center justify-center"><svg viewBox="0 0 100 100" className="w-8 h-8"><path d="M50,20 C30,35 10,60 20,85 C40,70 48,50 50,20 Z" fill="#D4AF37" /><path d="M50,20 C70,35 90,60 80,85 C60,70 52,50 50,20 Z" fill="#EAB308" /><path d="M50,10 L54,18 L62,14 L58,24 L42,24 L38,14 L46,18 Z" fill="#F59E0B" /><polygon points="50,92 56,86 50,80 44,86" fill="#FEF08A" /></svg></div>
      <div className="flex flex-col text-left"><span className="text-[11px] font-serif italic text-amber-300 -mb-1">Miss</span><span className="text-sm font-black uppercase text-amber-400 tracking-widest">ENDO-CULTURE</span></div>
    </div>
  );
};
