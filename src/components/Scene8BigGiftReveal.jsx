import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../utils/audioSystem';
import { Gift, Heart, Sparkles, RotateCcw, Star, Flower2 } from 'lucide-react';
import Diya from './Diya';

export default function Scene8BigGiftReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    setFlash(true);
    audioSystem.playFanfare();

    // Golden light flash transition
    setTimeout(() => setFlash(false), 800);

    // Multi-stage celebratory confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#ffd700', '#ff2a7a', '#ff9900', '#ffffff', '#e91e63'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleReplay = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleOpenGift();
    }, 400);
  };

  return (
    <section id="surprise" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Deep Royal Midnight & Crimson Backdrop */}
      <div className="absolute inset-0 bg-radial from-[#4e0719]/80 via-[#27030d]/90 to-[#100105] -z-10" />

      {/* Screen Golden Flash on Opening */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 transition-opacity duration-700 ease-out ${
          flash ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Rotating Ornamental Rings around Gift */}
      <div className="absolute w-[360px] sm:w-[600px] h-[360px] sm:h-[600px] rounded-full border border-amber-400/25 animate-spin-slow pointer-events-none flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-amber-300/35 animate-spin-reverse-slow flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full border border-rose-400/20" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-4 shadow-md">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>The Grand Finale Surprise</span>
          <Gift className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-3">
          Ankita, tere liye ek last surprise hai... 🎁
        </h2>

        <p className="text-sm sm:text-lg text-amber-100/90 font-cormorant italic max-w-xl mx-auto">
          "A special moment to remind you how much you are cherished."
        </p>
      </div>

      {/* 3D Golden Gift Box & Rangoli Platform */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* Glowing Rangoli Pedestal Platform */}
        <div className="relative flex items-center justify-center">
          <div className="w-64 sm:w-88 h-64 sm:h-88 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-400/20 to-rose-600/30 blur-xl absolute" />
          
          <svg viewBox="0 0 200 200" className="w-64 sm:w-88 h-64 sm:h-88 opacity-50 animate-spin-slow pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <circle
                key={i}
                cx={100 + 70 * Math.cos((i * Math.PI) / 4)}
                cy={100 + 70 * Math.sin((i * Math.PI) / 4)}
                r="4"
                fill="#ffd700"
              />
            ))}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#ff9900" strokeWidth="0.8" />
          </svg>

          {/* 3D Gift Box Object */}
          <div className="relative z-20 my-6">
            
            {/* 3D Box Perspective */}
            <div className="relative w-48 sm:w-60 h-48 sm:h-60 flex flex-col items-center justify-center">
              
              {/* Box Lid with Lift Animation */}
              <div
                className={`w-52 sm:w-64 h-16 sm:h-20 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-2xl border-2 border-yellow-100 shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center relative transition-all duration-700 ${
                  isOpen ? '-translate-y-24 rotate-[-12deg] opacity-75 scale-95' : 'translate-y-2'
                }`}
              >
                {/* Golden Ribbon Cross on Lid */}
                <div className="w-8 h-full bg-rose-600 shadow-md border-x border-yellow-200" />
                
                {/* 3D Golden Ribbon Bow on Top */}
                <div className="absolute -top-7 flex items-center justify-center">
                  <div className="w-12 h-8 rounded-full bg-rose-600 border border-yellow-200 shadow-lg -rotate-45" />
                  <div className="w-12 h-8 rounded-full bg-rose-600 border border-yellow-200 shadow-lg rotate-45 -ml-4" />
                  <div className="w-5 h-5 rounded-full bg-yellow-400 border border-yellow-100 shadow absolute" />
                </div>
              </div>

              {/* Box Body */}
              <div className="w-48 sm:w-60 h-40 sm:h-48 bg-gradient-to-br from-[#7a1226] via-[#520917] to-[#30040c] rounded-2xl border-2 border-amber-400/80 shadow-[0_20px_45px_rgba(0,0,0,0.8)] overflow-hidden relative flex items-center justify-center -mt-2">
                {/* Ribbon strip across body */}
                <div className="w-8 h-full bg-rose-600 shadow border-x border-yellow-300/60" />
                <div className="h-8 w-full bg-rose-600 shadow border-y border-yellow-300/60 absolute" />

                {/* Sparkling particle core inside box */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-yellow-400/30 blur-md animate-ping" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Action Button: "Open Your Gift ❤️" */}
        {!isOpen ? (
          <button
            onClick={handleOpenGift}
            className="mt-6 px-10 sm:px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-[#3d030c] font-cinzel font-bold text-base sm:text-lg tracking-wider hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,215,0,0.6)] cursor-pointer transition-all duration-300 flex items-center gap-3"
          >
            <span>Open Your Gift ❤️</span>
            <Gift className="w-5 h-5 fill-[#3d030c]" />
          </button>
        ) : (
          /* THE REVEAL CARD FROM PROMPT */
          <div className="mt-8 max-w-2xl w-full glass-royal rounded-3xl p-6 sm:p-10 border-2 border-amber-300/90 shadow-[0_0_60px_rgba(255,215,0,0.4)] animate-in fade-in zoom-in-95 duration-700 text-center relative overflow-hidden">
            
            {/* Top Decorative Badge */}
            <div className="flex justify-center -mt-12 mb-4">
              <div className="p-3.5 bg-gradient-to-tr from-amber-600 via-yellow-400 to-rose-600 rounded-full shadow-xl border-2 border-yellow-200">
                <Heart className="w-8 h-8 fill-rose-700 text-rose-800" />
              </div>
            </div>

            {/* Main Reveal Headline */}
            <h3 className="text-3xl sm:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-4">
              Surprise, Meri Kudi! ❤️
            </h3>

            {/* Supporting Message */}
            <p className="text-lg sm:text-2xl text-amber-100 font-cormorant font-semibold tracking-wide mb-6 leading-relaxed divine-text-glow">
              "Is Navratri mera gift chhota sa ho sakta hai, par tujhe khush dekhne ki wish dil se hai."
            </p>

            {/* Festive Wish */}
            <div className="my-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 inline-block">
              <h4 className="text-xl sm:text-3xl font-cinzel-dec font-bold text-rose-300 gold-text-glow">
                Happy Ashtami/Navami, Ankita! 🌸
              </h4>
            </div>

            {/* Final Affectionate Blessing Line */}
            <p className="text-base sm:text-xl text-amber-200/90 font-cormorant italic max-w-xl mx-auto leading-relaxed mb-8">
              "Rab kare teri life hamesha khushiyon, pyaar aur success se bhari rahe."
            </p>

            {/* Replay Button: "Ek Baar Phir Dekho ✨" */}
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 font-cinzel text-xs sm:text-sm tracking-wider cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Ek Baar Phir Dekho ✨</span>
            </button>

          </div>
        )}

      </div>

      {/* Surrounding Flanking Diyas */}
      <div className="flex items-center justify-center gap-6 mt-14 z-20">
        <Diya size="md" />
        <Diya size="lg" showGlow={true} />
        <Diya size="md" />
      </div>

    </section>
  );
}
