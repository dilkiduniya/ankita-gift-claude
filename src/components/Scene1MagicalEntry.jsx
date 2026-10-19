import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Diya from './Diya';
import { audioSystem } from '../utils/audioSystem';
import { Sparkles, Heart } from 'lucide-react';

export default function Scene1MagicalEntry({ onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Trigger Kamariya playback from 1:14
    window.dispatchEvent(new CustomEvent('playKamariya'));
    audioSystem.startMusic();
    audioSystem.playFanfare();


    // Luxurious gold & rose petal confetti burst
    const end = Date.now() + 1500;
    const colors = ['#ffd700', '#ff9900', '#ff2a7a', '#ffffff', '#e91e63'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Transition delay for light sweep effect
    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#4a0814] via-[#200308] to-[#0d0104] -z-10" />

      {/* Golden Light Sweep Overlay when clicked */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 bg-gradient-to-r from-transparent via-amber-200/90 to-transparent transition-transform duration-1000 ease-in-out ${
          isOpening ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
        }`}
      />

      {/* Decorative Traditional Rangoli Ring in Background */}
      <div className="absolute w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full border border-amber-500/20 animate-spin-slow pointer-events-none flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-amber-400/25 animate-spin-reverse-slow flex items-center justify-center">
          <div className="w-[75%] h-[75%] rounded-full border border-rose-500/15" />
        </div>
      </div>

      {/* Ambient Diyas on sides */}
      <div className="absolute top-12 left-6 sm:left-16 hidden sm:block animate-float-gentle">
        <Diya size="lg" />
      </div>
      <div className="absolute top-12 right-6 sm:right-16 hidden sm:block animate-float-reverse">
        <Diya size="lg" />
      </div>

      {/* Centerpiece Diya */}
      <div className="relative z-20 mb-6 sm:mb-8 animate-float-gentle">
        <Diya size="xl" showGlow={true} />
      </div>

      {/* Emotional Invitation Content */}
      <div className="relative z-20 text-center max-w-2xl px-4 flex flex-col items-center">
        {/* Subtle festive badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Shubh Navratri Ashtami & Navami Special</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Primary Prompt Text */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel-dec font-bold text-amber-100 gold-text-glow-lg leading-tight mb-4 tracking-wide">
          Ek chhota sa surprise hai,{' '}
          <span className="text-rose-400 font-greatvibes text-4xl sm:text-6xl md:text-7xl block sm:inline mt-1 sm:mt-0 font-normal">
            Ankita... ❤️
          </span>
        </h1>

        {/* Secondary Prompt Text */}
        <p className="text-base sm:text-xl md:text-2xl text-amber-200/90 font-cormorant italic font-normal tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
          "Is Navratri, tere liye kuch dil se banaya hai."
        </p>

        {/* Glowing 3D Golden Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className={`relative group px-8 sm:px-12 py-4 rounded-full font-cinzel font-bold text-base sm:text-lg tracking-wider transition-all duration-500 cursor-pointer overflow-hidden ${
            isOpening
              ? 'scale-95 opacity-80'
              : 'hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,215,0,0.5)]'
          }`}
        >
          {/* Glowing Golden Button Gradient Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 group-hover:from-yellow-400 group-hover:to-amber-500 transition-colors" />
          
          {/* Shimmer sweep */}
          <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

          {/* Button Outer Border */}
          <span className="absolute inset-0 rounded-full border-2 border-yellow-200/80 pointer-events-none" />

          {/* Button Content */}
          <span className="relative z-10 text-[#42040d] flex items-center gap-3 drop-shadow-sm">
            <span>Open Your Surprise ✨</span>
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600 group-hover:scale-125 transition-transform" />
          </span>
        </button>

        <p className="text-[11px] sm:text-xs text-amber-300/60 font-montserrat mt-4 tracking-wider">
          (Headphones recommended for magical sound 🎧)
        </p>
      </div>

      {/* Bottom Floating Diyas for mobile & small screens */}
      <div className="flex sm:hidden items-center justify-center gap-8 mt-12 z-20">
        <Diya size="md" />
        <Diya size="md" />
      </div>
    </div>
  );
}
