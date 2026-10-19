import React, { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, FastForward } from 'lucide-react';
import Diya from './Diya';

const fullLetter = `Hey Ankita ❤️

Pata hai, main shayad har baar perfect tareeke se apni feelings express nahi kar pata, lekin tu mere liye bahut special hai.

Is Navratri socha ki tujhe kuch aisa doon jo sirf ek gift nahi, balki tere chehre pe smile laane ki ek chhoti si koshish ho.

Teri smile, teri cute si baatein aur tera woh apna sa andaaz mere liye bahut precious hai. Main chahta hoon ki tu hamesha khush rahe, apne saare dreams poore kare aur tujhe life mein woh sab mile jo tera dil chahta hai.

Aaj ka ye chhota sa surprise sirf tere liye hai, meri Punjabi kudi. ❤️

Happy Navratri, Ankita. Tu special hai, aur ye baat tujhe yaad dilane ke liye kisi special occasion ka wait nahi karna chahiye.

— Tera apna ❤️`;

export default function Scene5LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioSystem.playChime();

    // Gentle rose petal and gold particle burst
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2a7a', '#ffd700', '#ffffff', '#e91e63'],
    });

    // Start typewriter
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping) return;
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [isTyping]);

  const handleSkip = () => {
    setIsTyping(false);
    setDisplayedText(fullLetter);
  };

  return (
    <section id="letter" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Rose-red and gold romantic background */}
      <div className="absolute inset-0 bg-radial from-[#4a0818]/80 via-[#26030c]/90 to-[#120106] -z-10" />

      {/* Romantic glow rings */}
      <div className="absolute w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase mb-4 shadow-md">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Dil Se Ek Paigaam</span>
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide mb-3">
          Ankita, tere liye kuch dil se...
        </h2>

        <p className="text-sm sm:text-base text-rose-200/80 font-cormorant italic">
          {!isOpen
            ? "Tap the golden heart seal on the royal envelope below to read ❤️"
            : "A heartfelt message written especially for you ✨"}
        </p>
      </div>

      {/* 3D Envelope Container */}
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center">
        
        {!isOpen ? (
          /* UNOPENED 3D ROYAL ENVELOPE */
          <div
            onClick={handleOpenEnvelope}
            className="group relative w-72 sm:w-96 h-48 sm:h-64 cursor-pointer select-none perspective-1000 transition-transform duration-500 hover:scale-105 active:scale-95"
            title="Click to open your handwritten love letter"
          >
            {/* Envelope Shadow */}
            <div className="absolute inset-x-4 -bottom-4 h-8 bg-black/60 blur-xl rounded-full" />

            {/* Envelope Body */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#6b0f1e] via-[#460611] to-[#2b030a] rounded-2xl border-2 border-amber-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center">
              
              {/* Envelope flap folds */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Triangular top flap silhouette */}
                <svg viewBox="0 0 100 60" className="w-full h-auto absolute top-0 left-0 opacity-40">
                  <polygon points="0,0 100,0 50,38" fill="#881324" stroke="#ffd700" strokeWidth="0.8" />
                </svg>
                {/* Bottom folds */}
                <svg viewBox="0 0 100 60" className="w-full h-auto absolute bottom-0 left-0 opacity-40">
                  <polygon points="0,60 100,60 50,22" fill="#500814" stroke="#ffd700" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Center Golden Wax Heart Seal */}
              <div className="relative z-30 p-4 rounded-full bg-gradient-to-tr from-yellow-600 via-amber-400 to-yellow-300 shadow-[0_0_25px_rgba(255,215,0,0.8)] border-2 border-yellow-100 group-hover:scale-115 transition-transform duration-300 flex items-center justify-center">
                <Heart className="w-8 sm:w-10 h-8 sm:h-10 fill-rose-700 text-rose-800 drop-shadow-md" />
              </div>

              {/* Golden Corner Accents */}
              <div className="absolute top-2 left-2 text-amber-300/60 text-xs">✦</div>
              <div className="absolute top-2 right-2 text-amber-300/60 text-xs">✦</div>
              <div className="absolute bottom-2 left-2 text-amber-300/60 text-xs">✦</div>
              <div className="absolute bottom-2 right-2 text-amber-300/60 text-xs">✦</div>

              {/* Prompt on envelope */}
              <div className="absolute bottom-4 z-20 font-cinzel text-xs uppercase tracking-widest text-amber-200/90 group-hover:text-amber-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Tap Seal to Open Letter</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>
            </div>
          </div>
        ) : (
          /* OPENED HANDWRITTEN ROYAL LETTER */
          <div className="relative w-full glass-royal rounded-3xl p-6 sm:p-10 border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-700">
            
            {/* Parchment inner texture container */}
            <div className="relative bg-gradient-to-b from-[#fffbf0] to-[#fff3db] text-[#331118] rounded-2xl p-6 sm:p-10 shadow-inner border border-amber-300/80">
              
              {/* Corner Filigrees on Parchment */}
              <div className="absolute top-3 left-3 text-amber-800/40 text-lg sm:text-xl">❦</div>
              <div className="absolute top-3 right-3 text-amber-800/40 text-lg sm:text-xl">❦</div>
              <div className="absolute bottom-3 left-3 text-amber-800/40 text-lg sm:text-xl">❦</div>
              <div className="absolute bottom-3 right-3 text-amber-800/40 text-lg sm:text-xl">❦</div>

              {/* Skip typewriter button */}
              {isTyping && (
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-8 sm:right-10 flex items-center gap-1 text-[11px] font-montserrat font-semibold text-rose-800/80 hover:text-rose-950 bg-amber-200/60 hover:bg-amber-300/70 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Read Full</span>
                </button>
              )}

              {/* Letter Header */}
              <div className="border-b border-amber-800/20 pb-4 mb-6 text-center">
                <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-widest text-amber-900/70">
                  Navratri Love Letter • Ashtami / Navami
                </span>
              </div>

              {/* Handwritten Content with Typewriter or Full */}
              <div className="font-cormorant text-lg sm:text-2xl text-[#2d0e14] whitespace-pre-line leading-relaxed sm:leading-loose tracking-wide">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-rose-600 animate-pulse ml-1 align-middle" />
                )}
              </div>

              {/* Decorative Bottom Stamp */}
              <div className="mt-8 pt-4 border-t border-amber-800/15 flex items-center justify-between">
                <span className="font-greatvibes text-2xl text-rose-700">
                  Forever Yours ❤️
                </span>
                <div className="flex items-center gap-1 text-amber-800/60 text-xs font-cinzel">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>With Pure Heart</span>
                </div>
              </div>

            </div>

            {/* Small Diya below letter */}
            <div className="flex justify-center mt-6">
              <Diya size="md" showGlow={true} />
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
