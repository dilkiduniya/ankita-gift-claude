import React, { useState } from 'react';
import { audioSystem } from '../utils/audioSystem';

export default function Diya({ size = 'md', className = '', showGlow = true, interactive = true }) {
  const [flared, setFlared] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size] || 'w-16 h-16';

  const handleClick = () => {
    if (!interactive) return;
    setFlared(true);
    audioSystem.playChime();
    setTimeout(() => setFlared(false), 1200);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      title={interactive ? 'Touch the Diya for extra blessings ✨' : ''}
    >
      {/* Radiating Light Aura / Bloom */}
      {showGlow && (
        <div
          className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
            flared
              ? 'w-48 h-48 bg-amber-400/40 blur-3xl scale-125'
              : 'w-28 h-28 bg-amber-500/25 blur-2xl group-hover:scale-115 group-hover:bg-amber-400/35'
          }`}
        />
      )}

      <svg
        viewBox="0 0 100 90"
        className={`${sizeClasses} transition-transform duration-300 ${flared ? 'scale-110' : 'group-hover:scale-105'}`}
      >
        <defs>
          {/* Flame Gradient */}
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff1a1a" />
            <stop offset="25%" stopColor="#ff5e13" />
            <stop offset="60%" stopColor="#ffb300" />
            <stop offset="90%" stopColor="#fff7a1" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Diya Base Gradient (Rich Brass & Gold) */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa771c" />
            <stop offset="100%" stopColor="#573804" />
          </linearGradient>

          {/* Oil Reservoir Shadow */}
          <radialGradient id="oilGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#7a2e00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3d1500" />
          </radialGradient>
        </defs>

        {/* Diya Base Shadow */}
        <ellipse cx="50" cy="80" rx="34" ry="6" fill="rgba(0,0,0,0.5)" filter="blur(3px)" />

        {/* Traditional Brass Diya Body */}
        <path
          d="M 16 52 C 16 75, 84 75, 84 52 C 84 50, 78 48, 50 48 C 22 48, 16 50, 16 52 Z"
          fill="url(#brassGrad)"
          stroke="#ffe680"
          strokeWidth="1.2"
        />

        {/* Diya Lip / Rim */}
        <ellipse
          cx="50"
          cy="50"
          rx="33"
          ry="7"
          fill="url(#oilGrad)"
          stroke="#ffd700"
          strokeWidth="1"
        />

        {/* Center Diya Stand/Pedestal */}
        <path
          d="M 40 70 Q 50 78 60 70 L 64 78 Q 50 82 36 78 Z"
          fill="url(#brassGrad)"
          stroke="#c99700"
          strokeWidth="0.8"
        />

        {/* Cotton Wick (Baati) */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="38"
          stroke="#4a220a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Realistic Flickering Flame */}
        <g className="diya-flame" style={{ transformOrigin: '50px 38px' }}>
          {/* Outer Flame Glow */}
          <path
            d="M 50 38 C 42 38, 41 24, 50 8 C 59 24, 58 38, 50 38 Z"
            fill="url(#flameGrad)"
            opacity="0.95"
          />
          {/* Inner Bright White Core */}
          <path
            d="M 50 38 C 46 38, 46 29, 50 18 C 54 29, 54 38, 50 38 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}
