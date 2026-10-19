import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../utils/audioSystem';
import { Flower2, Heart, Sparkles, Moon, Star } from 'lucide-react';
import Diya from './Diya';

const gardenCards = [
  {
    id: 1,
    title: 'Teri Smile 🌸',
    message: 'Teri smile kisi bhi ordinary din ko special bana sakti hai.',
    icon: Flower2,
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderColor: 'border-pink-400/40',
    petalColors: ['#ff2a7a', '#ff80ab', '#ffffff', '#ffd700'],
  },
  {
    id: 2,
    title: 'Meri Punjabi Kudi ❤️',
    message: 'Tera apna sa andaaz aur teri cute si vibes — ekdum priceless.',
    icon: Heart,
    gradient: 'from-rose-600/25 via-amber-500/15 to-transparent',
    borderColor: 'border-rose-400/50',
    petalColors: ['#e91e63', '#d81b60', '#ffb300', '#ffd700'],
  },
  {
    id: 3,
    title: 'Teri Khushiyan ✨',
    message: 'Meri wish hai ki tere har din mein kuch na kuch aisa ho jo tujhe dil se khush kar de.',
    icon: Sparkles,
    gradient: 'from-amber-500/25 via-yellow-500/15 to-transparent',
    borderColor: 'border-amber-400/50',
    petalColors: ['#ffd700', '#ff9900', '#ffe082', '#ffffff'],
  },
];

export default function Scene6LoveGarden() {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (card) => {
    setActiveCardId(card.id);
    audioSystem.playChime();

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: card.petalColors,
    });
  };

  return (
    <section id="garden" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Moonlit Night Garden Sky */}
      <div className="absolute inset-0 bg-radial from-[#1e072b]/70 via-[#18031a]/85 to-[#0e0110] -z-10" />

      {/* Moon in sky */}
      <div className="absolute top-12 right-8 sm:right-24 flex items-center justify-center pointer-events-none">
        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-tr from-amber-100 via-amber-50 to-white shadow-[0_0_40px_rgba(255,245,210,0.8)] opacity-85" />
      </div>

      {/* Floating Golden Fireflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-300 blur-[1px] animate-pulse"
            style={{
              top: `${15 + (i * 7) % 70}%`,
              left: `${10 + (i * 13) % 80}%`,
              animationDuration: `${2.5 + (i % 3)}s`,
              boxShadow: '0 0 10px #ffd700, 0 0 20px #ff9900',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-4 shadow-md">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>The Interactive Love Garden</span>
          <Star className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-4">
          Ek Magical Shaam, Tere Naam ✨
        </h2>

        <p className="text-sm sm:text-lg text-amber-100/90 font-cormorant italic max-w-xl mx-auto leading-relaxed">
          "Tap on each blooming card to unlock the feelings that make you so special to me."
        </p>
      </div>

      {/* Three Floating Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full mx-auto relative z-20">
        {gardenCards.map((card) => {
          const Icon = card.icon;
          const isActive = activeCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`group relative glass-royal rounded-3xl p-6 sm:p-8 cursor-pointer select-none transition-all duration-500 overflow-hidden border-2 ${
                isActive
                  ? `${card.borderColor} scale-105 shadow-[0_0_35px_rgba(255,215,0,0.5)]`
                  : 'border-amber-400/20 hover:border-amber-400/60 hover:-translate-y-2'
              }`}
            >
              {/* Internal ambient radial glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.gradient} transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
                }`}
              />

              {/* Glowing Corner Accents */}
              <div className="absolute top-3 right-3 text-amber-300/60 text-xs">✦</div>

              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Icon Container with blooming glow */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 ${
                    isActive ? 'scale-115 rotate-12' : 'group-hover:scale-110'
                  } bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-300/40 shadow-inner`}
                >
                  <Icon className="w-8 h-8 text-amber-300 group-hover:text-amber-100 transition-colors" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-cinzel-dec font-bold text-amber-100 mb-3 tracking-wide">
                  {card.title}
                </h3>

                {/* Card Message */}
                <p className="text-base sm:text-xl text-amber-100/90 font-cormorant italic leading-relaxed mb-6">
                  "{card.message}"
                </p>

                {/* Interactive Status Indicator */}
                <div className="mt-auto pt-4 border-t border-amber-400/20 w-full flex items-center justify-center">
                  <span className="text-xs font-montserrat tracking-wider uppercase text-amber-300/80 group-hover:text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isActive ? 'Petals Bloomed 🌸' : 'Tap to Bloom ✨'}</span>
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Bottom Diyas in Garden */}
      <div className="flex items-center justify-center gap-8 mt-14 z-20">
        <Diya size="md" />
        <Diya size="lg" showGlow={true} />
        <Diya size="md" />
      </div>

    </section>
  );
}
