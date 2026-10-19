import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import SpotifyPlayer from './components/SpotifyPlayer';
import FloatingParticlesCanvas from './components/FloatingParticlesCanvas';
import ThreeNavratriCanvas from './components/ThreeNavratriCanvas';
import Scene1MagicalEntry from './components/Scene1MagicalEntry';
import Scene2NavratriWelcome from './components/Scene2NavratriWelcome';
import Scene3DevotionalBlessing from './components/Scene3DevotionalBlessing';
import Scene4KanjakSpecial from './components/Scene4KanjakSpecial';
import Scene5LoveLetter from './components/Scene5LoveLetter';
import Scene6LoveGarden from './components/Scene6LoveGarden';
import Scene7DandiyaMagic from './components/Scene7DandiyaMagic';
import Scene8BigGiftReveal from './components/Scene8BigGiftReveal';
import Scene9Ending from './components/Scene9Ending';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [inMainExperience, setInMainExperience] = useState(false);

  const handleOpenSurprise = () => {
    setInMainExperience(true);

    // Smooth scroll down to welcome scene
    setTimeout(() => {
      const welcomeElement = document.getElementById('welcome');
      if (welcomeElement) {
        welcomeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInMainExperience(false);
  };

  return (
    <div className="relative min-h-screen text-[#fff7eb] bg-[#140207] overflow-x-hidden">
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Background Floating Canvas Particles (Sparkles & Petals) */}
      <FloatingParticlesCanvas />

      {/* 3D Three.js Background Elements */}
      <ThreeNavratriCanvas />

      {/* Spotify-Style Music Player (Always docked at bottom) */}
      <SpotifyPlayer />

      {!inMainExperience ? (
        /* SCENE 1 — THE MAGICAL ENTRY (Hero Entrance) */
        <Scene1MagicalEntry onOpenSurprise={handleOpenSurprise} />
      ) : (
        /* FULL SEAMLESS FESTIVE EXPERIENCE */
        <main className="relative z-10 transition-opacity duration-1000 animate-in fade-in pb-28">
          
          {/* Quick Jump Bar / Navigation Indicator (Floats above Spotify Player) */}
          <nav className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-gold border border-amber-400/30 text-xs font-cinzel text-amber-200 shadow-xl backdrop-blur-md">
            <a href="#welcome" className="hover:text-amber-400 transition-colors px-2 py-0.5">Welcome</a>
            <span>•</span>
            <a href="#blessing" className="hover:text-amber-400 transition-colors px-2 py-0.5">Blessings</a>
            <span>•</span>
            <a href="#kanjak" className="hover:text-amber-400 transition-colors px-2 py-0.5 text-yellow-300 font-bold">Kanjak 👑</a>
            <span>•</span>
            <a href="#letter" className="hover:text-rose-400 transition-colors px-2 py-0.5 text-rose-300">Love Letter ❤️</a>
            <span>•</span>
            <a href="#garden" className="hover:text-amber-400 transition-colors px-2 py-0.5">Garden</a>
            <span>•</span>
            <a href="#dandiya" className="hover:text-amber-400 transition-colors px-2 py-0.5">Dandiya 💃</a>
            <span>•</span>
            <a href="#surprise" className="hover:text-amber-400 transition-colors px-2 py-0.5 text-amber-300 font-bold">Surprise 🎁</a>
          </nav>

          {/* SCENE 2: The Navratri Welcome */}
          <Scene2NavratriWelcome />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="mx-3 text-amber-400 text-sm">✦ 🪔 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* SCENE 3: A Divine Festive Blessing */}
          <Scene3DevotionalBlessing />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="mx-3 text-amber-400 text-sm">✦ 👑 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* SCENE 4: Kanjak Special — Meri Navratri Ki Maharani 😂❤️ */}
          <Scene4KanjakSpecial />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-rose-400" />
            <span className="mx-3 text-rose-400 text-sm">✦ 💌 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-rose-400" />
          </div>

          {/* SCENE 5: A Personal Love Letter */}
          <Scene5LoveLetter />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="mx-3 text-amber-400 text-sm">✦ 🌸 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* SCENE 6: The Interactive Love Garden */}
          <Scene6LoveGarden />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="mx-3 text-amber-400 text-sm">✦ 💃 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* SCENE 7: A Little Navratri Magic (Dandiya) */}
          <Scene7DandiyaMagic />

          {/* Section Divider Ornament */}
          <div className="flex items-center justify-center my-6 opacity-60">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="mx-3 text-amber-400 text-sm">✦ 🎁 ✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* SCENE 8: The Big Surprise Reveal */}
          <Scene8BigGiftReveal />

          {/* SCENE 9: The Beautiful Ending */}
          <Scene9Ending onRestart={handleRestart} />

        </main>
      )}
    </div>
  );
}