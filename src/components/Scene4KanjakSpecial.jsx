import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Diya from './Diya';
import { audioSystem } from '../utils/audioSystem';
import { Crown, Sparkles, Heart, Star, Gift, CheckCircle2 } from 'lucide-react';

export default function Scene4KanjakSpecial() {
  const [activeCard, setActiveCard] = useState(null);
  const [surpriseClaimed, setSurpriseClaimed] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingScore, setRatingScore] = useState(10);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Playful reactions for reward cards
  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
    audioSystem.playChime();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#ff8c00', '#ff2a7a'],
    });
  };

  // Claim Royal Surprise
  const handleClaimSurprise = () => {
    setSurpriseClaimed(true);
    audioSystem.playCuteTrumpet();
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffffff', '#ff2a7a', '#ff9900'],
    });
  };

  // Rating submit feedback
  const handleRate = (score) => {
    setRatingScore(score);
    setRatingSubmitted(true);
    audioSystem.playCuteTrumpet();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ffd700', '#ff4081'],
    });
  };

  return (
    <section id="kanjak" className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Decorative Courtyard Glow Background */}
      <div className="absolute inset-0 bg-radial from-[#400612]/70 via-[#220309]/80 to-[#120105] -z-10" />

      {/* Rangoli motif floor */}
      <div className="absolute bottom-0 w-[550px] sm:w-[850px] h-40 bg-gradient-to-t from-amber-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Floating Sparkles & Crowns Header */}
      <div className="max-w-4xl mx-auto w-full text-center relative z-20">
        
        {/* Dramatic announcement banner */}
        <div className="inline-block animate-bounce mb-4">
          <div className="px-5 py-2 rounded-full bg-rose-600/30 border border-rose-400 text-rose-200 text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,42,122,0.4)]">
            🚨 RUKO RUKO, EK IMPORTANT BAAT HAI! 🚨
          </div>
        </div>

        {/* Lead-in humorous text with dramatic pause vibe */}
        <h3 className="text-lg sm:text-2xl text-amber-200 font-cinzel font-semibold mb-2">
          Navratri mein Kanjak Pujan toh suna hoga...
        </h3>

        {/* Big Reveal with Animated Crown */}
        <div className="relative inline-block my-4">
          {/* Animated 3D Floating Crown */}
          <div className="absolute -top-10 sm:-top-14 left-1/2 -translate-x-1/2 animate-float-gentle">
            <div className="relative">
              <Crown className="w-10 sm:w-14 h-10 sm:h-14 text-yellow-300 fill-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]" />
              <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-ping" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel-dec font-bold gold-shimmer-text tracking-wide px-4 py-2 leading-tight">
            PAR MERI PUNJABI KUDI ANKITA KA <br />
            <span className="text-rose-400 font-greatvibes text-4xl sm:text-6xl md:text-7xl font-normal block mt-2">
              SPECIAL TREATMENT ALAG HAI! 😂❤️
            </span>
          </h2>
        </div>

        {/* Digital Royal Invitation Card */}
        <div className="mt-6 mb-10 max-w-2xl mx-auto glass-royal rounded-3xl p-6 sm:p-8 relative border-2 border-amber-400/50 shadow-2xl overflow-hidden">
          {/* Ornate corner filigree */}
          <div className="absolute top-2 left-2 text-amber-400/40 text-lg">⚜️</div>
          <div className="absolute top-2 right-2 text-amber-400/40 text-lg">⚜️</div>
          <div className="absolute bottom-2 left-2 text-amber-400/40 text-lg">⚜️</div>
          <div className="absolute bottom-2 right-2 text-amber-400/40 text-lg">⚜️</div>

          <div className="inline-flex items-center gap-2 text-amber-300 font-cinzel text-xs sm:text-sm uppercase tracking-widest mb-3">
            <span>👑</span>
            <span>VIP ROYAL PASS</span>
            <span>👑</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-cinzel-dec font-bold text-amber-100 gold-text-glow mb-3">
            👑 ANKITA JI KA ROYAL KANJAK SPECIAL 👑
          </h3>

          <p className="text-base sm:text-xl text-amber-200/90 font-cormorant italic leading-relaxed">
            "Prasad bhi milega, princess wali izzat bhi... <br />
            Aur boyfriend ki taraf se unlimited pyaar bhi! 😂❤️"
          </p>

          {/* Symbolic Traditional Prasad Thali Illustration (Halwa, Puri, Chana) */}
          <div className="my-6 flex flex-col items-center">
            <div className="relative group cursor-pointer" title="Auspicious Kanya Pujan Prasad Thali">
              {/* Brass Thali Plate */}
              <div className="w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-tr from-yellow-700 via-amber-400 to-yellow-600 p-2 shadow-2xl border-4 border-yellow-300 flex items-center justify-center relative">
                
                {/* Inner Thali Rim */}
                <div className="w-full h-full rounded-full bg-[#3a0a14] border-2 border-dashed border-amber-400/60 p-3 relative flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle Flower Petals around plate */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 blur-[1px]" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 blur-[1px]" />

                  {/* 1. Halwa Bowl (Sooji ka Halwa) */}
                  <div className="absolute top-4 left-6 sm:left-10 text-center">
                    <div className="w-14 sm:w-18 h-14 sm:h-18 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-600 border border-amber-300 shadow-md flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-amber-100">🍯 Halwa</span>
                    </div>
                    <span className="text-[10px] text-amber-200/80 font-montserrat">Desi Ghee</span>
                  </div>

                  {/* 2. Crispy Golden Puri */}
                  <div className="absolute top-4 right-6 sm:right-10 text-center">
                    <div className="w-14 sm:w-18 h-14 sm:h-18 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-300 border border-yellow-200 shadow-md flex items-center justify-center animate-pulse">
                      <span className="text-xs sm:text-sm font-bold text-amber-900">🫓 Puri</span>
                    </div>
                    <span className="text-[10px] text-amber-200/80 font-montserrat">Garma Garam</span>
                  </div>

                  {/* 3. Masaledar Sukha Chana Bowl */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                    <div className="w-16 sm:w-20 h-14 sm:h-16 rounded-full bg-gradient-to-r from-stone-800 via-amber-900 to-stone-900 border border-amber-500 shadow-md flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-amber-200">🥣 Chana</span>
                    </div>
                    <span className="text-[10px] text-amber-200/80 font-montserrat">Kala Chana</span>
                  </div>

                  {/* Center Diya on Thali */}
                  <div className="relative z-10">
                    <Diya size="sm" showGlow={true} interactive={false} />
                  </div>

                </div>
              </div>
            </div>
            <span className="text-xs text-amber-300/80 font-cinzel tracking-wider mt-3">
              ✨ Shubh Kanjak Prasad (Symbolic) ✨
            </span>
          </div>

        </div>

        {/* 3 Animated Reward Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto my-8">
          
          {/* Card 1: HALWA MODE 🍯 */}
          <div
            onClick={() => handleCardClick('halwa')}
            className={`glass-gold rounded-2xl p-5 cursor-pointer text-center transition-all duration-300 border ${
              activeCard === 'halwa'
                ? 'border-yellow-300 scale-105 shadow-[0_0_25px_rgba(255,215,0,0.5)]'
                : 'border-amber-500/30 hover:border-amber-400 hover:-translate-y-1'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/20 mx-auto flex items-center justify-center mb-3 text-2xl shadow-inner">
              🍯
            </div>
            <h4 className="font-cinzel font-bold text-amber-300 text-base sm:text-lg mb-2">
              HALWA MODE
            </h4>
            <p className="font-cormorant italic text-sm sm:text-base text-amber-100/90 leading-snug">
              "Sweetness toh already tere andar unlimited hai."
            </p>
            <span className="inline-block mt-3 text-[11px] font-montserrat text-amber-400/80 uppercase tracking-wider">
              {activeCard === 'halwa' ? '✨ Activated!' : 'Tap to Activate'}
            </span>
          </div>

          {/* Card 2: ROYAL TREATMENT 👑 */}
          <div
            onClick={() => handleCardClick('royal')}
            className={`glass-gold rounded-2xl p-5 cursor-pointer text-center transition-all duration-300 border ${
              activeCard === 'royal'
                ? 'border-yellow-300 scale-105 shadow-[0_0_25px_rgba(255,215,0,0.5)]'
                : 'border-amber-500/30 hover:border-amber-400 hover:-translate-y-1'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/20 mx-auto flex items-center justify-center mb-3 text-2xl shadow-inner">
              👑
            </div>
            <h4 className="font-cinzel font-bold text-amber-300 text-base sm:text-lg mb-2">
              ROYAL TREATMENT
            </h4>
            <p className="font-cormorant italic text-sm sm:text-base text-amber-100/90 leading-snug">
              "Aaj ki queen tu hai. Waise baaki din bhi orders tere hi chalte hain. 😂"
            </p>
            <span className="inline-block mt-3 text-[11px] font-montserrat text-amber-400/80 uppercase tracking-wider">
              {activeCard === 'royal' ? '👑 Queen Confirmed!' : 'Tap to Activate'}
            </span>
          </div>

          {/* Card 3: UNLIMITED PYAAR ❤️ */}
          <div
            onClick={() => handleCardClick('pyaar')}
            className={`glass-gold rounded-2xl p-5 cursor-pointer text-center transition-all duration-300 border ${
              activeCard === 'pyaar'
                ? 'border-rose-400 scale-105 shadow-[0_0_25px_rgba(255,42,122,0.5)]'
                : 'border-amber-500/30 hover:border-rose-400 hover:-translate-y-1'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-rose-500/20 mx-auto flex items-center justify-center mb-3 text-2xl shadow-inner">
              ❤️
            </div>
            <h4 className="font-cinzel font-bold text-rose-300 text-base sm:text-lg mb-2">
              UNLIMITED PYAAR
            </h4>
            <p className="font-cormorant italic text-sm sm:text-base text-amber-100/90 leading-snug">
              "Iska koi vrat, expiry date ya daily limit nahi hai."
            </p>
            <span className="inline-block mt-3 text-[11px] font-montserrat text-rose-300/80 uppercase tracking-wider">
              {activeCard === 'pyaar' ? '❤️ Infinite Love!' : 'Tap to Activate'}
            </span>
          </div>

        </div>

        {/* Interactive Moment: Claim Your Royal Surprise 👑 */}
        <div className="mt-8">
          {!surpriseClaimed ? (
            <button
              onClick={handleClaimSurprise}
              className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-stone-950 font-cinzel font-bold text-sm sm:text-base tracking-wider hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,215,0,0.6)] cursor-pointer transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <span>Claim Your Royal Surprise 👑</span>
              <Gift className="w-5 h-5 text-stone-900" />
            </button>
          ) : (
            <div className="max-w-2xl mx-auto glass-royal rounded-3xl p-6 sm:p-8 border border-amber-300/80 shadow-[0_0_40px_rgba(255,215,0,0.4)] animate-in fade-in zoom-in duration-500">
              
              {/* Floating crown over revealed message */}
              <div className="flex justify-center -mt-12 mb-3">
                <div className="p-3 bg-gradient-to-tr from-amber-600 to-yellow-400 rounded-full shadow-lg border-2 border-yellow-200">
                  <Crown className="w-8 h-8 text-stone-950" />
                </div>
              </div>

              <h3 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-amber-300 mb-4">
                Happy Ashtami, Meri Pyaari Ankita! ❤️😂
              </h3>

              <div className="text-amber-100 font-cormorant text-base sm:text-xl space-y-3 leading-relaxed text-left sm:text-center">
                <p>
                  "Aaj Kanjak ka din hai, toh socha meri favourite kudi ko bhi thoda extra special feel karwa doon. Prasad traditional, treatment royal, aur pyaar boyfriend wala — full package! 😂❤️"
                </p>
                <p>
                  "Maa Durga tujhe hamesha khush rakhe, tere saare dreams poore hon, aur teri smile hamesha aise hi bani rahe."
                </p>
                <p className="font-bold text-amber-200">
                  "Ab gift pasand aaya toh ek virtual smile toh banti hai, madam ji! 🫶"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-400/30 flex justify-center">
                <span className="text-xs font-montserrat text-amber-300/90 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Royal Treatment Claimed Successfully • Lifetime Validity
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Funny Optional Button: "Boyfriend Ko 10/10 Rating Do 😂" */}
        <div className="mt-8">
          {!showRating ? (
            <button
              onClick={() => setShowRating(true)}
              className="text-xs sm:text-sm font-cinzel text-amber-300/90 hover:text-amber-100 underline underline-offset-4 cursor-pointer hover:scale-105 transition-transform"
            >
              Boyfriend Ko 10/10 Rating Do 😂
            </button>
          ) : (
            <div className="max-w-md mx-auto glass-gold rounded-2xl p-5 border border-amber-400/40 mt-4 text-center">
              <h4 className="font-cinzel font-bold text-amber-200 text-sm sm:text-base mb-2">
                Rate Your Punjabi Boyfriend’s Surprise Effort ⭐️
              </h4>
              <p className="text-xs text-amber-200/70 font-cormorant italic mb-4">
                (Note: 10 se kam dena allowed nahi hai, par try kar sakti ho 😂)
              </p>

              {/* 1 to 10 Star Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 cursor-pointer ${
                      ratingScore >= star
                        ? 'bg-amber-400 text-stone-950 scale-110 shadow-md'
                        : 'bg-stone-800 text-amber-400/50 hover:bg-stone-700'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>

              {ratingSubmitted && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-cormorant leading-relaxed animate-in fade-in">
                  {ratingScore === 10 ? (
                    <span>
                      🎉 <strong>Wah ji wah! 10/10!</strong> Distinction ke saath pass ho gaya! Lifetime unlimited pyaar, pampering aur favourite snacks guaranteed! 😂❤️
                    </span>
                  ) : (
                    <span>
                      😂 <strong>{ratingScore}/10?</strong> Chalo koi nahi, bache hue marks agle Navratri gift mein cover kar lunga! Lekin smile guaranteed hai! ❤️
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
