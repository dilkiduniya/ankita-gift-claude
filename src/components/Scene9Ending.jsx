import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import Diya from './Diya';

export default function Scene9Ending({ onRestart }) {
  const scrollToTop = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="ending" className="relative min-h-[70vh] py-20 px-4 flex flex-col items-center justify-center overflow-hidden border-t border-amber-500/20">
      
      {/* Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180208] via-[#100105] to-[#0a0003] -z-10" />

      {/* Subtle Slow Spinning Golden Mandala in Background */}
      <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full border border-amber-500/10 flex items-center justify-center animate-spin-slow pointer-events-none opacity-40">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M 100 100 Q 95 50 100 30 Q 105 50 100 100"
              fill="none"
              stroke="#ffd700"
              strokeWidth="0.6"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd700" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative z-20 text-center max-w-xl mx-auto flex flex-col items-center">
        
        {/* Trio of Peaceful Glowing Diyas */}
        <div className="flex items-center gap-6 mb-8">
          <Diya size="sm" />
          <Diya size="lg" showGlow={true} />
          <Diya size="sm" />
        </div>

        {/* Text 1 from prompt */}
        <h3 className="text-2xl sm:text-4xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-4">
          Made with love, just for Ankita ❤️
        </h3>

        {/* Text 2 from prompt */}
        <p className="text-base sm:text-xl text-amber-100/90 font-cormorant italic leading-relaxed mb-6 max-w-md">
          "Har festival special hota hai, par kuch log usse aur bhi special bana dete hain."
        </p>

        {/* Tiny animated golden heart */}
        <div className="my-4 animate-bounce">
          <div className="relative flex items-center justify-center">
            <Heart className="w-8 h-8 fill-amber-400 text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-white absolute -top-1 -right-1" />
          </div>
        </div>

        {/* Discreet replay button that takes her back to the beginning */}
        <button
          onClick={scrollToTop}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-gold text-amber-300 hover:text-amber-100 hover:border-amber-400 text-xs sm:text-sm font-cinzel tracking-wider cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 shadow-md group"
          title="Return to the beginning of the surprise"
        >
          <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          <span>Wapas Shuru Se Dekhein 💫</span>
        </button>

        <p className="text-[11px] font-montserrat text-amber-400/50 mt-6 tracking-widest uppercase">
          Happy Navratri 🪔 Ashtami • Navami
        </p>

      </div>
    </footer>
  );
}
