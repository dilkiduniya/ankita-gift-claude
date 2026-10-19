import React from 'react';

export default function Toran({ className = '' }) {
  // Traditional Indian Toran: Mango leaves (aam ke patte) & Marigold flowers (genda phool)
  const items = Array.from({ length: 12 });

  return (
    <div className={`w-full overflow-hidden flex justify-center pointer-events-none select-none ${className}`}>
      <div className="flex items-start justify-center gap-1 sm:gap-3 w-full max-w-6xl px-2">
        {items.map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1 max-w-[70px]">
            {/* Hanging thread */}
            <div className="w-[1.5px] h-2 sm:h-4 bg-amber-400/60" />
            
            {/* Mango Leaf */}
            <svg viewBox="0 0 30 60" className="w-5 sm:w-8 h-8 sm:h-12 -mt-1 drop-shadow-md">
              <path
                d="M 15 0 C 26 18, 28 42, 15 60 C 2 42, 4 18, 15 0 Z"
                fill="url(#mangoLeafGrad)"
                stroke="#2d6a4f"
                strokeWidth="0.8"
              />
              <line x1="15" y1="5" x2="15" y2="52" stroke="#52b788" strokeWidth="0.7" opacity="0.7" />
            </svg>

            {/* Marigold flower */}
            <div className="relative -mt-2">
              <div
                className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-lg ${
                  i % 2 === 0
                    ? 'bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400'
                    : 'bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-300'
                } flex items-center justify-center animate-pulse`}
                style={{ animationDuration: `${3 + (i % 3)}s` }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-800/40" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <svg className="hidden">
        <defs>
          <linearGradient id="mangoLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="60%" stopColor="#1b4332" />
            <stop offset="100%" stopColor="#081c15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
