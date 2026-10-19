import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../utils/audioSystem';
import { Sparkles, Music2, Flame } from 'lucide-react';
import Diya from './Diya';

export default function Scene7DandiyaMagic() {
  const [clashing, setClashing] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [sparks, setSparks] = useState([]);

  const handleClash = () => {
    setClashing(true);
    setBeatCount((prev) => prev + 1);
    audioSystem.playDandiyaClack();

    // Trigger golden sparks & confetti
    const sparkId = Date.now();
    setSparks((prev) => [...prev, sparkId]);

    confetti({
      particleCount: 22,
      spread: 50,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#ff9900', '#ff2a7a', '#ffffff'],
    });

    setTimeout(() => setClashing(false), 220);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s !== sparkId));
    }, 1000);
  };

  const getPunjabiHype = () => {
    if (beatCount === 0) return 'Tap anywhere on the dandiya sticks to dance! 💃';
    if (beatCount < 5) return 'Aye Haalo! Thoda aur josh! 💃✨';
    if (beatCount < 10) return 'Chak De Phatte! Garba vibe on fire! 🔥❤️';
    if (beatCount < 15) return 'Dholida dhol re vagad! Ankita rocks! 🎶👑';
    return 'Absolute Garba Queen! Unlimited blessings unlocked! 🥳💃❤️';
  };

  return (
    <section id="dandiya" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Festive Background Ambient Lighting */}
      <div className="absolute inset-0 bg-radial from-[#380415]/70 via-[#1c020a]/85 to-[#0d0105] -z-10" />

      {/* Decorative Garba circle in background */}
      <div className="absolute w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full border border-dashed border-amber-500/20 animate-spin-slow pointer-events-none flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full border border-amber-400/25 animate-spin-reverse-slow" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-4 shadow-md">
          <Music2 className="w-3.5 h-3.5 text-amber-400" />
          <span>A Little Navratri Magic</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Headline from Prompt */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-4 leading-tight">
          Thoda sa garba, thodi si masti, <br />
          <span className="font-greatvibes text-rose-400 text-3xl sm:text-5xl md:text-6xl font-normal block mt-2">
            aur dher saari khushiyan! 💃❤️
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-amber-200/90 font-cormorant italic max-w-xl mx-auto">
          "Navratri festive energy without garba is incomplete! Let’s strike the dandiyas!"
        </p>
      </div>

      {/* Interactive 3D Dandiya Arena */}
      <div
        onClick={handleClash}
        className="relative z-20 w-80 sm:w-96 h-72 sm:h-80 cursor-pointer select-none group flex items-center justify-center"
        title="Click anywhere to clash the Dandiya sticks!"
      >
        {/* Glow Aura under strike point */}
        <div
          className={`absolute w-36 h-36 rounded-full transition-all duration-300 pointer-events-none ${
            clashing
              ? 'bg-amber-300/60 blur-2xl scale-150'
              : 'bg-amber-500/20 blur-xl group-hover:bg-amber-400/30'
          }`}
        />

        {/* Spark Ripples on strike */}
        {sparks.map((id) => (
          <div
            key={id}
            className="absolute w-28 h-28 rounded-full border-2 border-yellow-300 animate-ping pointer-events-none"
          />
        ))}

        {/* Two Floating Dandiya Sticks with Rhythmic Movement */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Left Dandiya Stick */}
          <div
            className={`absolute transition-transform duration-150 origin-bottom-left ${
              clashing
                ? 'rotate-[32deg] translate-x-6 -translate-y-2'
                : 'rotate-[18deg] group-hover:rotate-[24deg] animate-float-gentle'
            }`}
          >
            <div className="relative w-5 sm:w-6 h-52 sm:h-64 rounded-full bg-gradient-to-t from-[#c2185b] via-[#ffd700] to-[#ff6f00] shadow-[0_0_20px_rgba(255,215,0,0.7)] border border-yellow-200 flex flex-col justify-between p-1">
              {/* Golden rings on stick */}
              <div className="w-full h-3 bg-yellow-200 rounded-full shadow" />
              <div className="w-full h-2 bg-amber-900 rounded-full" />
              <div className="w-full h-3 bg-yellow-200 rounded-full shadow" />
              <div className="w-full h-2 bg-amber-900 rounded-full" />
              {/* Bottom Hanging Ghunghroo / Tassel */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-md border border-amber-600 flex items-center justify-center">
                <span className="text-[8px]">🔔</span>
              </div>
            </div>
          </div>

          {/* Right Dandiya Stick */}
          <div
            className={`absolute transition-transform duration-150 origin-bottom-right ${
              clashing
                ? '-rotate-[32deg] -translate-x-6 -translate-y-2'
                : '-rotate-[18deg] group-hover:-rotate-[24deg] animate-float-reverse'
            }`}
          >
            <div className="relative w-5 sm:w-6 h-52 sm:h-64 rounded-full bg-gradient-to-t from-[#7b1fa2] via-[#ffd700] to-[#e91e63] shadow-[0_0_20px_rgba(255,42,122,0.7)] border border-yellow-200 flex flex-col justify-between p-1">
              {/* Golden rings on stick */}
              <div className="w-full h-3 bg-yellow-200 rounded-full shadow" />
              <div className="w-full h-2 bg-purple-950 rounded-full" />
              <div className="w-full h-3 bg-yellow-200 rounded-full shadow" />
              <div className="w-full h-2 bg-purple-950 rounded-full" />
              {/* Bottom Hanging Ghunghroo / Tassel */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-md border border-purple-700 flex items-center justify-center">
                <span className="text-[8px]">🔔</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Hype & Beats Counter */}
      <div className="relative z-20 text-center mt-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-gold text-amber-200 border border-amber-400/40 shadow-lg">
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="font-cinzel text-xs sm:text-sm font-bold">
            Garba Beats Clapped: <span className="text-yellow-400 font-bold text-base">{beatCount}</span>
          </span>
        </div>

        <p className="font-cormorant italic text-base sm:text-xl text-amber-100 font-semibold mt-3 animate-in fade-in">
          {getPunjabiHype()}
        </p>

        <p className="text-[11px] font-montserrat text-amber-300/60 mt-1 uppercase tracking-widest">
          (Tap repeatedly for rapid garba rhythm! 🥁)
        </p>
      </div>

      {/* Decorative Diyas */}
      <div className="flex items-center justify-center gap-8 mt-12 z-20">
        <Diya size="md" />
        <Diya size="md" />
      </div>

    </section>
  );
}
