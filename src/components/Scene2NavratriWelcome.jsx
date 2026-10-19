import React from 'react';
import Diya from './Diya';
import Toran from './Toran';
import FestiveArch from './FestiveArch';
import { Sparkles, Heart } from 'lucide-react';

export default function Scene2NavratriWelcome() {
  return (
    <section id="welcome" className="relative min-h-screen py-16 sm:py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Top Traditional Marigold Toran */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Toran />
      </div>

      {/* Decorative Golden Arch Wrapper */}
      <FestiveArch className="w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 relative z-20">
          
          {/* Subtle Auspicious Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
            <span className="text-amber-400">✨</span>
            <span>Jai Mata Di • Ashtami & Navami</span>
            <span className="text-amber-400">✨</span>
          </div>

          {/* Headline from Prompt */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-6 leading-tight drop-shadow-xl">
            Shubh Navratri, <br className="hidden sm:inline" />
            <span className="font-greatvibes text-rose-400 text-4xl sm:text-6xl md:text-7xl font-normal block mt-2">
              Meri Pyaari Ankita ❤️
            </span>
          </h1>

          {/* Supporting Text from Prompt */}
          <p className="text-lg sm:text-2xl text-amber-100 font-cormorant font-semibold tracking-wide mb-4 max-w-2xl leading-relaxed divine-text-glow">
            "Is Ashtami/Navami, meri sabse special kudi ke liye ek chhota sa digital gift."
          </p>

          {/* Subtle Blessing Line from Prompt */}
          <p className="text-sm sm:text-lg text-amber-200/80 font-cormorant italic max-w-xl mx-auto leading-relaxed mb-10">
            "Tu khush rahe, hasti rahe, aur teri life hamesha pyaar aur roshni se bhari rahe."
          </p>

          {/* Visual Centerpiece: Intricate Rangoli with Glowing Center Diya & Flanking Diyas */}
          <div className="relative my-6 flex items-center justify-center">
            {/* Spinning Golden Rangoli Mandala Background */}
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-amber-500/30 flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                {/* Concentric Petal Rings */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <path
                    key={i}
                    d="M 100 100 Q 90 40 100 20 Q 110 40 100 100"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="0.8"
                    transform={`rotate(${i * 30} 100 100)`}
                  />
                ))}
                {Array.from({ length: 16 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={100 + 65 * Math.cos((i * Math.PI) / 8)}
                    cy={100 + 65 * Math.sin((i * Math.PI) / 8)}
                    r="2.5"
                    fill="#ff9900"
                  />
                ))}
                <circle cx="100" cy="100" r="45" fill="none" stroke="#ff2a7a" strokeWidth="0.8" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#ffd700" strokeWidth="1" />
              </svg>
            </div>

            {/* Glowing Diyas Arrangement */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Diya size="xl" showGlow={true} />
              </div>
            </div>

            {/* Flanking Small Diyas */}
            <div className="absolute -left-12 sm:-left-20 top-1/2 -translate-y-1/2">
              <Diya size="md" />
            </div>
            <div className="absolute -right-12 sm:-right-20 top-1/2 -translate-y-1/2">
              <Diya size="md" />
            </div>
          </div>

          {/* Scroll down prompt */}
          <div className="mt-8 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
              Scroll down to explore your gift
            </span>
            <span className="text-amber-400 text-sm animate-bounce">↓</span>
          </div>

        </div>
      </FestiveArch>
    </section>
  );
}
