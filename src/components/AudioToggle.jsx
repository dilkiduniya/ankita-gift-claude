import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function AudioToggle({ isPlaying }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggle = () => {
    if (!isPlaying) {
      audioSystem.startMusic();
    }
    const muted = audioSystem.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-gold text-amber-300 hover:text-amber-100 hover:border-amber-400 transition-all duration-300 shadow-lg group cursor-pointer"
        title={isMuted ? 'Unmute Festive Music' : 'Mute Music'}
        aria-label="Toggle festive background music"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-rose-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
        )}

        <span className="text-xs font-montserrat font-medium tracking-wide hidden sm:inline">
          {isMuted ? 'Muted' : 'Festive Sangeet'}
        </span>

        {/* Animated Sound Bars when active */}
        {!isMuted && isPlaying && (
          <div className="flex items-end gap-[2px] h-3 ml-1">
            <span className="w-[2px] bg-amber-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-[2px] bg-amber-300 rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
            <span className="w-[2px] bg-amber-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </button>
    </div>
  );
}
