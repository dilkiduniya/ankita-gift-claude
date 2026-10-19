import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Repeat,
  Heart,
  ChevronDown,
  ChevronUp,
  Music,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const HOOK_START = 74; // 1:14 (74 seconds)
const HOOK_END = 105;  // 1:45 (105 seconds)
const PAUSE_DURATION_MS = 2800; // ~2.8 seconds silent pause before repeat

export default function SpotifyPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(HOOK_START);
  const [duration, setDuration] = useState(200); // fallback duration
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isSegmentLoop, setIsSegmentLoop] = useState(true);
  const [isSilentPausing, setIsSilentPausing] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const loopTimeoutRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Initialize and attempt autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = HOOK_START;
    audio.volume = volume;

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          // Browser blocked un-interacted autoplay with sound
          setNeedsGesture(true);
        });
    };

    tryPlay();

    // Unlock audio instantly on first interaction anywhere
    const handleFirstGesture = () => {
      if (audio.paused) {
        if (isSegmentLoop && (audio.currentTime < HOOK_START || audio.currentTime >= HOOK_END)) {
          audio.currentTime = HOOK_START;
        }
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setNeedsGesture(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    const handlePlayEvent = () => {
      if (audio.paused) {
        if (isSegmentLoop && (audio.currentTime < HOOK_START || audio.currentTime >= HOOK_END)) {
          audio.currentTime = HOOK_START;
        }
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setNeedsGesture(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('playKamariya', handlePlayEvent);

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('playKamariya', handlePlayEvent);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };

  }, []);

  // Time update listener handling 1:14 -> 1:45 looping with silent pause
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || isSilentPausing) return;

    setCurrentTime(audio.currentTime);

    // If segment loop is active and reached 1:45 (105s)
    if (isSegmentLoop && audio.currentTime >= HOOK_END) {
      audio.pause();
      setIsPlaying(false);
      setIsSilentPausing(true);

      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

      // Silent pause for ~3 seconds, then restart at 1:14
      loopTimeoutRef.current = setTimeout(() => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = HOOK_START;
        setCurrentTime(HOOK_START);
        setIsSilentPausing(false);
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }, PAUSE_DURATION_MS);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 200);
      if (audioRef.current.currentTime < HOOK_START) {
        audioRef.current.currentTime = HOOK_START;
        setCurrentTime(HOOK_START);
      }
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSilentPausing) {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      setIsSilentPausing(false);
      audio.currentTime = HOOK_START;
      audio.play().then(() => setIsPlaying(true));
      return;
    }

    if (audio.paused) {
      if (isSegmentLoop && (audio.currentTime < HOOK_START || audio.currentTime >= HOOK_END)) {
        audio.currentTime = HOOK_START;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Seek handler (user scrubbing progress bar)
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    setIsSilentPausing(false);

    audio.currentTime = newTime;
    setCurrentTime(newTime);

    // If seeking outside hook while loop is on, let user listen freely or auto-disable
    if (isSegmentLoop && (newTime < HOOK_START || newTime > HOOK_END)) {
      // User deliberately scrubbing outside hook
    }
  };

  // Jump directly to 1:14 Hook
  const jumpToHook = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    setIsSilentPausing(false);
    audio.currentTime = HOOK_START;
    setCurrentTime(HOOK_START);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  // Skip 5 seconds
  const skipTime = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;

    let target = audio.currentTime + delta;
    if (target < 0) target = 0;
    if (target > duration) target = duration;

    audio.currentTime = target;
    setCurrentTime(target);
  };

  // Toggle Volume & Mute
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.muted = nextMuted;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.9 },
        colors: ['#ff2a7a', '#ffd700'],
      });
    }
  };

  // Segment loop progress percentages for golden range marker
  const hookStartPercent = duration > 0 ? (HOOK_START / duration) * 100 : 37;
  const hookEndPercent = duration > 0 ? (HOOK_END / duration) * 100 : 52.5;

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/kamariya.mp3"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = isSegmentLoop ? HOOK_START : 0;
            audioRef.current.play();
          }
        }}
      />

      {/* Floating Prompt Banner if Autoplay required user click */}
      {needsGesture && (
        <div
          onClick={togglePlay}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 cursor-pointer animate-bounce"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-500 text-white font-cinzel text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(255,215,0,0.8)] border border-yellow-200">
            <Music className="w-4 h-4 animate-spin" />
            <span>Tap Anywhere to Play "Kamariya" for Ankita 🎶❤️</span>
          </div>
        </div>
      )}

      {/* MINIMIZED PILL (When collapsed) */}
      {isMinimized ? (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#160207]/90 border border-amber-400/40 text-amber-200 shadow-2xl backdrop-blur-md hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
            <span className="font-cinzel text-xs font-bold tracking-wide">
              {isPlaying ? 'Kamariya (Playing 🎶)' : 'Kamariya (Paused)'}
            </span>
            <ChevronUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        /* FULL SPOTIFY-STYLE BOTTOM BAR */
        <div className="fixed bottom-0 left-0 right-0 z-50 select-none">
          {/* Top border glow line */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          {/* Player Container */}
          <div className="bg-[#120206]/95 backdrop-blur-xl border-t border-amber-500/20 px-3 sm:px-6 py-2.5 sm:py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
              
              {/* LEFT: Track Info & Artwork */}
              <div className="flex items-center justify-between w-full md:w-auto md:min-w-[240px] gap-3">
                <div className="flex items-center gap-3">
                  {/* Rotating Vinyl Record Artwork */}
                  <div className="relative group cursor-pointer" onClick={togglePlay}>
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-yellow-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden ${
                        isPlaying ? 'ring-2 ring-amber-400/80 shadow-[0_0_15px_rgba(255,215,0,0.4)]' : ''
                      }`}
                    >
                      <div className="w-full h-full rounded-[10px] bg-[#22040c] flex flex-col items-center justify-center text-center p-1 relative">
                        <span className="text-base sm:text-lg">🪔</span>
                        <div
                          className={`absolute inset-0 border border-amber-400/30 rounded-[10px] ${
                            isPlaying ? 'animate-spin-slow' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Playing Equalizer Overlay */}
                    {isPlaying && (
                      <div className="absolute -bottom-1 -right-1 flex items-end gap-[1.5px] bg-black/70 px-1 py-0.5 rounded">
                        <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2.5" />
                        <span className="w-1 bg-rose-400 rounded-full animate-bounce h-3.5" style={{ animationDelay: '100ms' }} />
                        <span className="w-1 bg-yellow-300 rounded-full animate-bounce h-2" style={{ animationDelay: '200ms' }} />
                      </div>
                    )}
                  </div>

                  {/* Title & Artist */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel font-bold text-amber-100 text-sm sm:text-base tracking-wide hover:underline cursor-pointer">
                        Kamariya
                      </span>
                      {isSegmentLoop && (
                        <span className="text-[10px] font-montserrat font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
                          1:14 - 1:45 Hook
                        </span>
                      )}
                    </div>
                    <p className="font-montserrat text-[11px] sm:text-xs text-amber-200/70 truncate max-w-[160px] sm:max-w-[200px]">
                      Mitron • Darshan Raval | For Ankita ❤️
                    </p>
                  </div>
                </div>

                {/* Like Button & Collapse Toggle (Mobile) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className="p-1.5 rounded-full text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title={isLiked ? 'Loved' : 'Love this song'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-full text-amber-300/60 hover:text-amber-100 transition-colors cursor-pointer md:hidden"
                    title="Minimize player"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CENTER: Playback Controls & Timeline Slider */}
              <div className="flex flex-col items-center w-full max-w-xl">
                
                {/* Control Buttons Row */}
                <div className="flex items-center gap-3 sm:gap-5 mb-1.5">
                  {/* Jump directly to Hook 1:14 button */}
                  <button
                    onClick={jumpToHook}
                    className="text-[11px] font-cinzel font-bold px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:text-amber-100 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                    title="Jump to 1:14 Hook timestamp"
                  >
                    <span>⏮ 01:14</span>
                  </button>

                  {/* Rewind 5s */}
                  <button
                    onClick={() => skipTime(-5)}
                    className="text-xs font-montserrat text-amber-200/70 hover:text-amber-100 transition-colors cursor-pointer"
                    title="Rewind 5 seconds"
                  >
                    -5s
                  </button>

                  {/* Main Play / Pause Button */}
                  <button
                    onClick={togglePlay}
                    className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
                      isPlaying
                        ? 'bg-amber-400 text-stone-950 scale-105 shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                        : 'bg-white text-stone-950 hover:scale-105 hover:bg-amber-300'
                    }`}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-stone-950" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-stone-950 ml-0.5" />
                    )}
                  </button>

                  {/* Forward 5s */}
                  <button
                    onClick={() => skipTime(5)}
                    className="text-xs font-montserrat text-amber-200/70 hover:text-amber-100 transition-colors cursor-pointer"
                    title="Forward 5 seconds"
                  >
                    +5s
                  </button>

                  {/* Segment Loop Toggle: 01:14 - 01:45 */}
                  <button
                    onClick={() => setIsSegmentLoop(!isSegmentLoop)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-cinzel font-semibold transition-all cursor-pointer ${
                      isSegmentLoop
                        ? 'bg-rose-500/25 border border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(255,42,122,0.4)]'
                        : 'bg-stone-800/60 border border-stone-600 text-stone-400 hover:text-stone-200'
                    }`}
                    title={
                      isSegmentLoop
                        ? 'Hook Loop Mode: ON (Plays 1:14 - 1:45 and repeats with 3s silent pause)'
                        : 'Full Song Mode (Plays through entire song)'
                    }
                  >
                    <Repeat className={`w-3 h-3 ${isSegmentLoop ? 'animate-spin-slow text-yellow-300' : ''}`} />
                    <span className="hidden sm:inline">
                      {isSegmentLoop ? 'Loop 1:14-1:45 🔁' : 'Loop Off'}
                    </span>
                  </button>
                </div>

                {/* Progress Bar & Timestamps */}
                <div className="flex items-center gap-2 sm:gap-3 w-full">
                  <span className="font-montserrat text-[11px] text-amber-200/70 w-9 text-right font-mono">
                    {formatTime(currentTime)}
                  </span>

                  {/* Timeline with Hook Segment Highlight */}
                  <div className="relative flex-1 flex items-center h-4 group cursor-pointer">
                    {/* Background Track */}
                    <div className="absolute inset-x-0 h-1 sm:h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      {/* Golden Highlight band for 1:14 to 1:45 Hook */}
                      <div
                        className="absolute h-full bg-amber-400/40 border-x border-amber-300/80"
                        style={{
                          left: `${hookStartPercent}%`,
                          width: `${hookEndPercent - hookStartPercent}%`,
                        }}
                        title="Hook Section: 01:14 - 01:45"
                      />
                    </div>

                    {/* Played Track Fill */}
                    <div
                      className="absolute left-0 h-1 sm:h-1.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full pointer-events-none group-hover:h-2 transition-all"
                      style={{
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                      }}
                    />

                    {/* Range Input Slider for Scrubbing */}
                    <input
                      type="range"
                      min={0}
                      max={duration || 200}
                      step={0.5}
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                      aria-label="Seek track position"
                    />
                  </div>

                  <span className="font-montserrat text-[11px] text-amber-200/70 w-9 text-left font-mono">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Silent Pause status indicator */}
                {isSilentPausing && (
                  <div className="text-[10px] font-montserrat text-yellow-300 animate-pulse mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>Hook finished! Repeating in 3 seconds... 🔁</span>
                  </div>
                )}
              </div>

              {/* RIGHT: Volume & Minimize Controls */}
              <div className="hidden md:flex items-center justify-end gap-3 min-w-[200px]">
                {/* Volume icon */}
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* Volume Slider */}
                <div className="w-20 relative flex items-center h-4 group">
                  <div className="absolute inset-x-0 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    aria-label="Volume controller"
                  />
                </div>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-full text-amber-300/60 hover:text-amber-100 transition-colors cursor-pointer ml-1"
                  title="Minimize Player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
