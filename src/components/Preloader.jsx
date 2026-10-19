import React, { useState, useEffect } from 'react';
import Diya from './Diya';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        // Smooth progression
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#130106] transition-opacity duration-800 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-600/15 blur-3xl -z-0 pointer-events-none animate-pulse" />

      {/* Center glowing Diya */}
      <div className="relative z-10 mb-6">
        <Diya size="xl" showGlow={true} interactive={false} />
      </div>

      {/* Decorative text */}
      <div className="relative z-10 text-center px-4 max-w-md">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-amber-400/80 mb-2">
          Ashtami & Navami Special
        </p>
        <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold gold-shimmer-text mb-3">
          Preparing Ankita's Surprise ❤️
        </h1>
        <p className="font-cormorant italic text-base text-amber-100/70 mb-6">
          "Diye ki roshni, phoolon ki mehak, aur dher saara pyaar..."
        </p>

        {/* Progress bar */}
        <div className="w-64 sm:w-80 h-2 bg-[#2a040d] rounded-full overflow-hidden border border-amber-500/30 mx-auto p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-montserrat text-xs text-amber-300/80 mt-2 block tracking-wider">
          {progress}%
        </span>
      </div>
    </div>
  );
}
