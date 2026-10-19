// Advanced Web Audio API Synthesizer for Indian Festive Music & Sound Effects
// 100% self-contained: No external audio files needed, works offline and zero broken links!

class FestiveAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.droneGain = null;
    this.melodyInterval = null;
    this.masterGain = null;
    this.currentScaleIndex = 0;

    // Indian Raga inspired frequencies (Pentatonic Bhupali / Khamaj festive notes)
    // C4, D4, E4, G4, A4, C5, D5, E5, G5
    this.notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("AudioContext not supported:", e);
    }
  }

  startMusic() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // Background synthetic drone disabled in favor of Kamariya song!
    this.isPlaying = false;
  }


  stopMusic() {
    this.isPlaying = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      } catch (e) {
        // ignore
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.5, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Atmospheric Tanpura meditative drone (Sa - Pa - Sa')
  startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;

    const droneFreqs = [130.81, 196.0, 261.63, 392.0]; // C3, G3, C4, G4
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
    this.droneGain.connect(this.masterGain);

    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 80, this.ctx.currentTime);

      // Subtle LFO vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(this.droneGain);
      osc.start();
    });
  }

  // Soft Indian Sitar / Santoor-like plucked arpeggio
  startMelodicArpeggio() {
    const playPluck = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      const note = this.notes[Math.floor(Math.random() * this.notes.length)];
      this.playPluckedString(note, 0.12, 1.8);

      // Occasionally play a gentle second note for harmony
      if (Math.random() > 0.45) {
        setTimeout(() => {
          if (!this.isPlaying || !this.ctx) return;
          const harmNote = this.notes[(this.notes.indexOf(note) + 2) % this.notes.length];
          this.playPluckedString(harmNote, 0.08, 1.4);
        }, 320);
      }
    };

    // Schedule gentle plucks every 1.5 - 2.8 seconds
    const scheduleNext = () => {
      if (!this.isPlaying) return;
      playPluck();
      const nextTime = 1400 + Math.random() * 1600;
      this.melodyInterval = setTimeout(scheduleNext, nextTime);
    };

    scheduleNext();
  }

  playPluckedString(freq, volume = 0.15, duration = 1.5) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Pluck brightness filter envelope
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4.5, now);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.35);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio node failure fallback
    }
  }

  // Realistic Temple Bell (Authentic Brass Pooja Ghanti chime)
  playTempleBell() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Classic bell frequencies: fundamental + upper harmonics
      const freqs = [1046.5, 2093, 3135, 4186, 5232];
      const gains = [0.22, 0.15, 0.09, 0.05, 0.02];

      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(gains[i], now);
        // Long exponential decay for rich metallic resonance
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 - (i * 0.3));

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {
      console.warn("Temple bell error:", e);
    }
  }

  // Wooden Dandiya Strike clack
  playDandiyaClack() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Wooden strike pitch drop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.14);

      // Light metallic resonance chime on strike
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(1800, now);
      chimeGain.gain.setValueAtTime(0.08, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      chime.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chime.start(now);
      chime.stop(now + 0.35);
    } catch (e) {}
  }

  // Magical Chime for cards & reveals
  playChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });
    } catch (e) {}
  }

  // Royal Fanfare for Big Surprise
  playFanfare() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Celebratory ascending chords
      const chord = [392.0, 523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.9);
      });
    } catch (e) {}
  }

  // Playful victory / 10/10 rating fanfare
  playCuteTrumpet() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      pitches.forEach((p, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p, now + i * 0.07);

        gain.gain.setValueAtTime(0.18, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.55);
      });
    } catch (e) {}
  }
}

export const audioSystem = new FestiveAudioEngine();
