import React, { useState } from 'react';
import Diya from './Diya';
import { audioSystem } from '../utils/audioSystem';
import { Bell, Sparkles } from 'lucide-react';

export default function Scene3DevotionalBlessing() {
  const [bellRinging, setBellRinging] = useState(false);
  const [blessingRipples, setBlessingRipples] = useState([]);

  const handleRingBell = () => {
    setBellRinging(true);
    audioSystem.playTempleBell();

    const id = Date.now();
    setBlessingRipples((prev) => [...prev, id]);

    setTimeout(() => {
      setBellRinging(false);
    }, 1200);

    setTimeout(() => {
      setBlessingRipples((prev) => prev.filter((r) => r !== id));
    }, 2800);
  };

  return (
    <section id="blessing" className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Divine Halo & Light Rays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Radiating Divine Aura */}
        <div className="w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-300/20 to-amber-600/15 blur-3xl animate-pulse" />
        
        {/* Soft Sacred Light Beams */}
        <div
          className="absolute w-[800px] h-[800px] opacity-15"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,215,0,0.4) 15deg, transparent 30deg, rgba(255,180,0,0.3) 45deg, transparent 60deg, rgba(255,215,0,0.4) 75deg, transparent 90deg, rgba(255,180,0,0.3) 105deg, transparent 120deg, rgba(255,215,0,0.4) 135deg, transparent 150deg, rgba(255,180,0,0.3) 165deg, transparent 180deg, rgba(255,215,0,0.4) 195deg, transparent 210deg, rgba(255,180,0,0.3) 225deg, transparent 240deg, rgba(255,215,0,0.4) 255deg, transparent 270deg, rgba(255,180,0,0.3) 285deg, transparent 300deg, rgba(255,215,0,0.4) 315deg, transparent 330deg, rgba(255,180,0,0.3) 345deg, transparent 360deg)',
          }}
        />
      </div>

      {/* Hanging Temple Bell (Interactive Ghanti) */}
      <div className="relative z-30 mb-8 flex flex-col items-center">
        {/* Hanging golden chain */}
        <div className="w-[3px] h-12 sm:h-20 bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400" />
        
        {/* Bell Button */}
        <button
          onClick={handleRingBell}
          className={`relative group cursor-pointer flex flex-col items-center p-2 rounded-full transition-transform duration-300 ${
            bellRinging ? 'scale-115 rotate-12' : 'hover:scale-110 active:scale-95'
          }`}
          title="Click to ring temple bell for Maa Durga's blessings"
          aria-label="Ring the temple bell for divine blessings"
        >
          {/* Bell Glow Halo */}
          <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md group-hover:bg-amber-300/50 transition-colors" />

          {/* Golden Brass Temple Bell SVG */}
          <svg viewBox="0 0 80 80" className="w-14 sm:w-20 h-14 sm:h-20 relative z-10 drop-shadow-2xl">
            <defs>
              <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff2a8" />
                <stop offset="35%" stopColor="#ffd700" />
                <stop offset="70%" stopColor="#c59218" />
                <stop offset="100%" stopColor="#664503" />
              </linearGradient>
            </defs>

            {/* Top Loop */}
            <circle cx="40" cy="12" r="7" fill="none" stroke="url(#bellGrad)" strokeWidth="3" />
            
            {/* Bell Body */}
            <path
              d="M 28 20 C 28 20, 20 50, 14 58 C 14 62, 66 62, 66 58 C 60 50, 52 20, 52 20 Z"
              fill="url(#bellGrad)"
              stroke="#ffd700"
              strokeWidth="1.5"
            />
            
            {/* Bell Rim Lip */}
            <path
              d="M 12 58 C 12 64, 68 64, 68 58 L 66 62 C 66 67, 14 67, 14 62 Z"
              fill="#fff2a8"
            />

            {/* Bell Clapper (tongue) */}
            <circle cx="40" cy="65" r="5" fill="#ffd700" stroke="#aa771c" strokeWidth="1" />
          </svg>

          {/* Interactive Hint */}
          <span className="text-[11px] font-cinzel text-amber-300/80 uppercase tracking-widest mt-2 flex items-center gap-1 group-hover:text-amber-200">
            <Bell className="w-3 h-3 text-amber-400 animate-bounce" />
            <span>Tap To Ring 🔔</span>
          </span>
        </button>

        {/* Ring ripples */}
        {blessingRipples.map((id) => (
          <div
            key={id}
            className="absolute top-16 w-16 h-16 rounded-full border-2 border-amber-300/80 animate-ping pointer-events-none"
          />
        ))}
      </div>

      {/* Devotional Centerpiece: Respectful Silhouette & 3D Rotating Sacred Mandala */}
      <div className="relative z-20 flex items-center justify-center my-6">
        
        {/* Layer 1: Outer Rotating Golden Mandala */}
        <div className="w-72 sm:w-96 md:w-[440px] h-72 sm:h-96 md:h-[440px] rounded-full border border-amber-400/30 flex items-center justify-center animate-spin-slow">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-70">
            {/* 16 Sacred Lotus Petals */}
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={i}
                d="M 200 200 C 180 120, 190 70, 200 40 C 210 70, 220 120, 200 200"
                fill="rgba(255, 215, 0, 0.06)"
                stroke="#ffd700"
                strokeWidth="1.2"
                transform={`rotate(${i * 22.5} 200 200)`}
              />
            ))}
            {/* Concentric rings */}
            <circle cx="200" cy="200" r="160" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="#ff9900" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="95" fill="none" stroke="#ff2a7a" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Layer 2: Inner Reverse-Rotating Sacred Mandala Ring */}
        <div className="absolute w-52 sm:w-68 md:w-80 h-52 sm:h-68 md:h-80 rounded-full border border-amber-400/40 animate-spin-reverse-slow flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full h-full opacity-60">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d="M 150 150 Q 130 90 150 60 Q 170 90 150 150"
                fill="none"
                stroke="#ffe680"
                strokeWidth="1.2"
                transform={`rotate(${i * 30} 150 150)`}
              />
            ))}
          </svg>
        </div>

        {/* Layer 3: Central Respectful Artistic Silhouette of Maa Durga */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          {/* Radiant Halo */}
          <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-amber-400/20 blur-xl absolute" />

          {/* Artistic Sacred Silhouette (Trishul & Lotus Crown) */}
          <svg viewBox="0 0 100 100" className="w-24 sm:w-32 h-24 sm:h-32 relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            <defs>
              <linearGradient id="divineGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#ffe680" />
                <stop offset="80%" stopColor="#ffb300" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
            </defs>

            {/* Central Trishul (Trident) */}
            <path
              d="M 50 12 L 50 85 M 48 85 L 52 85"
              stroke="url(#divineGold)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Center Spear Tip */}
            <path
              d="M 50 8 L 54 22 L 50 19 L 46 22 Z"
              fill="url(#divineGold)"
            />
            {/* Left Prong */}
            <path
              d="M 50 32 C 40 32, 34 22, 34 16 L 36 15 C 37 23, 44 28, 50 28"
              fill="url(#divineGold)"
            />
            <path d="M 33 16 L 37 21 L 34 20 Z" fill="url(#divineGold)" />
            {/* Right Prong */}
            <path
              d="M 50 32 C 60 32, 66 22, 66 16 L 64 15 C 63 23, 56 28, 50 28"
              fill="url(#divineGold)"
            />
            <path d="M 67 16 L 63 21 L 66 20 Z" fill="url(#divineGold)" />

            {/* Sacred Lotus Base (Pedestal) */}
            <path
              d="M 50 78 C 38 78, 32 72, 32 68 C 38 68, 44 72, 50 72 C 56 72, 62 68, 68 68 C 68 72, 62 78, 50 78 Z"
              fill="url(#divineGold)"
              opacity="0.9"
            />
          </svg>

          {/* Sacred Mantra snippet */}
          <span className="font-cinzel text-amber-200/90 text-[10px] sm:text-xs tracking-widest uppercase mt-2">
            ॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥
          </span>
        </div>
      </div>

      {/* Devotional Texts from Prompt */}
      <div className="relative z-20 text-center max-w-2xl px-4 mt-6">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text mb-4 leading-tight">
          Maa Durga ki kripa hamesha tere saath rahe.
        </h2>

        <p className="text-base sm:text-xl text-amber-100 font-cormorant italic leading-relaxed divine-text-glow max-w-xl mx-auto">
          "Teri har wish poori ho, tere chehre ki smile kabhi kam na ho, aur teri zindagi khushiyon se chamakti rahe."
        </p>

        {/* Diyas at bottom */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <Diya size="md" />
          <Diya size="lg" showGlow={true} />
          <Diya size="md" />
        </div>
      </div>
    </section>
  );
}
