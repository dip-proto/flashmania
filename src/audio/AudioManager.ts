import { SurfaceType } from '../types/Surface';

// Procedural audio using Web Audio API — no external assets needed
export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Engine sound
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;

  // Surface noise (noise-based)
  private surfaceNoise: AudioBufferSourceNode | null = null;
  private surfaceGain: GainNode | null = null;
  private surfaceFilter: BiquadFilterNode | null = null;

  // Wind noise
  private windNoise: AudioBufferSourceNode | null = null;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;

  constructor() {
    // AudioContext is lazy-created on first user interaction (required by browsers)
  }

  init(): void {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);
  }

  // Resume audio context (needed after user gesture)
  resume(): void {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Engine Sound ---
  startEngine(): void {
    if (!this.ctx || !this.masterGain) return;
    this.init();

    // Primary engine oscillator — low sawtooth for that rumble
    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.value = 60;

    // Secondary oscillator — slight detune for richness
    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'square';
    this.engineOsc2.frequency.value = 30;

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.value = 0.15;

    const engineFilter = this.ctx.createBiquadFilter();
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 400;

    this.engineOsc1.connect(engineFilter);
    this.engineOsc2.connect(engineFilter);
    engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.engineOsc1.start();
    this.engineOsc2.start();
  }

  updateEngine(speedRatio: number): void {
    if (!this.engineOsc1 || !this.engineOsc2) return;
    // Pitch goes from 60 Hz (idle) to ~300 Hz (max speed)
    const pitch = 60 + speedRatio * 240;
    this.engineOsc1.frequency.setTargetAtTime(pitch, this.ctx!.currentTime, 0.05);
    this.engineOsc2.frequency.setTargetAtTime(pitch / 2, this.ctx!.currentTime, 0.05);

    // Engine gets louder at higher RPM
    if (this.engineGain) {
      this.engineGain.gain.setTargetAtTime(0.1 + speedRatio * 0.15, this.ctx!.currentTime, 0.05);
    }
  }

  stopEngine(): void {
    try {
      this.engineOsc1?.stop();
      this.engineOsc2?.stop();
    } catch { /* already stopped */ }
    this.engineOsc1 = null;
    this.engineOsc2 = null;
  }

  // --- Surface Noise ---
  setSurface(type: SurfaceType): void {
    if (!this.ctx || !this.masterGain) return;
    this.init();

    // Create or recreate noise source based on surface type
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Stop previous noise
    try { this.surfaceNoise?.stop(); } catch {}

    this.surfaceNoise = this.ctx.createBufferSource();
    this.surfaceNoise.buffer = buffer;
    this.surfaceNoise.loop = true;

    this.surfaceFilter = this.ctx.createBiquadFilter();
    this.surfaceGain = this.ctx.createGain();

    // Configure filter and gain based on surface
    switch (type) {
      case SurfaceType.ASPHALT:
        this.surfaceFilter.type = 'bandpass';
        this.surfaceFilter.frequency.value = 800;
        this.surfaceFilter.Q.value = 2;
        this.surfaceGain.gain.value = 0.06;
        break;
      case SurfaceType.DIRT:
        this.surfaceFilter.type = 'highpass';
        this.surfaceFilter.frequency.value = 300;
        this.surfaceGain.gain.value = 0.1;
        break;
      case SurfaceType.ICE:
        this.surfaceFilter.type = 'highpass';
        this.surfaceFilter.frequency.value = 2000;
        this.surfaceGain.gain.value = 0.03;
        break;
      case SurfaceType.GRASS:
        this.surfaceFilter.type = 'bandpass';
        this.surfaceFilter.frequency.value = 600;
        this.surfaceFilter.Q.value = 1;
        this.surfaceGain.gain.value = 0.05;
        break;
      case SurfaceType.PLASTIC:
        this.surfaceFilter.type = 'highpass';
        this.surfaceFilter.frequency.value = 1200;
        this.surfaceGain.gain.value = 0.08;
        break;
    }

    this.surfaceNoise.connect(this.surfaceFilter);
    this.surfaceFilter.connect(this.surfaceGain);
    this.surfaceGain.connect(this.masterGain);
    this.surfaceNoise.start();
  }

  // --- Wind ---
  startWind(): void {
    if (!this.ctx || !this.masterGain) return;
    this.init();

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.windNoise = this.ctx.createBufferSource();
    this.windNoise.buffer = buffer;
    this.windNoise.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'highpass';
    this.windFilter.frequency.value = 3000;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0;

    this.windNoise.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    this.windNoise.start();
  }

  updateWind(speedRatio: number): void {
    if (!this.windGain || !this.ctx) return;
    // Wind gets louder at speed — only noticeable above ~50% max speed
    const volume = Math.max(0, (speedRatio - 0.5) * 0.12);
    this.windGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);

    // Wind filter sweeps up with speed for that "whooshing" effect
    if (this.windFilter) {
      this.windFilter.frequency.setTargetAtTime(3000 + speedRatio * 4000, this.ctx.currentTime, 0.1);
    }
  }

  // --- Sound Effects ---
  private lastDriftSound = 0;
  triggerDrift(): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (now - this.lastDriftSound < 0.3) return; // throttle drift sounds
    this.lastDriftSound = now;

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800 + Math.random() * 400;
    filter.Q.value = 3;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    src.start(now);
    src.stop(now + 0.15);
  }

  playCheckpoint(): void {
    if (!this.ctx || !this.masterGain) return;
    // Ding-ding-ding: three quick beeps
    const now = this.ctx.currentTime;
    [0, 0.12, 0.24].forEach((offset, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 2 ? 880 : 660; // rising pitch
      gain.gain.value = 0.3;
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  playFinish(): void {
    if (!this.ctx || !this.masterGain) return;
    // Victory fanfare: ascending arpeggio
    const now = this.ctx.currentTime;
    const notes = [523, 659, 784, 1047]; // C-E-G-C
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = 0.25;
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.4);
    });

    // Also play three checkpoint-style dings for the "ding-ding-ding" finish sound
    [0, 0.12, 0.24].forEach((offset, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 2 ? 880 : 660;
      gain.gain.value = 0.2;
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + offset);
      osc.stop(now + offset + 0.2);
    });
  }

  playDrift(): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 200;
    gain.gain.value = 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    const filter = this.ctx!.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}
