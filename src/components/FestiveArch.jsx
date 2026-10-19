import React from 'react';

export default function FestiveArch({ children, title, subtitle, className = '' }) {
  return (
    <div className={`relative max-w-5xl mx-auto px-4 py-8 sm:py-12 ${className}`}>
      {/* Golden Arch Frame SVG */}
      <div className="absolute inset-0 pointer-events-none -z-0 opacity-40">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 600 800"
          fill="none"
        >
          {/* Temple Arch Outline */}
          <path
            d="M 50 780 L 50 300 C 50 120, 200 40, 300 30 C 400 40, 550 120, 550 300 L 550 780"
            stroke="url(#archGoldGrad)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <path
            d="M 65 780 L 65 310 C 65 140, 210 60, 300 50 C 390 60, 535 140, 535 310 L 535 780"
            stroke="url(#archGoldGrad)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Top Arch Pinnacle (Kalas/Trishul motif) */}
          <circle cx="300" cy="25" r="8" fill="#ffd700" opacity="0.8" />
          <path d="M 300 10 L 300 25" stroke="#ffd700" strokeWidth="2" />

          <defs>
            <linearGradient id="archGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ff8c00" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header section if provided */}
      {(title || subtitle) && (
        <div className="text-center mb-10 relative z-10">
          {/* Decorative Top Flourish */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-400 text-lg sm:text-xl">🪔</span>
            <span className="text-amber-300 font-cinzel text-xs tracking-widest uppercase">
              Navratri Mahotsav
            </span>
            <span className="text-amber-400 text-lg sm:text-xl">🪔</span>
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {title && (
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-3 drop-shadow-lg">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-sm sm:text-lg text-amber-200/90 font-cormorant italic max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Content inside Arch */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
