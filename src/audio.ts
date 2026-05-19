// Audio system for engine, surfaces, and effects

import { SurfaceType, CarState } from './types';

export class AudioSystem {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private engineOscillator: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private surfaceOscillator: OscillatorNode | null = null;
  private surfaceGain: GainNode | null = null;
  private muted: boolean = false;
  private lastSurface: SurfaceType = 'air';
  private windOscillator: OscillatorNode | null = null;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;

  async init(): Promise<void> {
    try {
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
    } catch (e) {
      console.warn('Audio initialization failed:', e);
    }
  }

  async resume(): Promise<void> {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : 0.3;
    }
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  private ensureEngine(): void {
    if (!this.audioContext || !this.masterGain || this.engineOscillator) return;

    this.engineOscillator = this.audioContext.createOscillator();
    this.engineGain = this.audioContext.createGain();

    this.engineOscillator.type = 'sawtooth';
    this.engineOscillator.frequency.value = 80;
    this.engineGain.gain.value = 0;

    this.engineOscillator.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);
    this.engineOscillator.start();
  }

  updateEngine(car: CarState): void {
    if (!this.audioContext || !this.engineOscillator || !this.engineGain) return;

    const speed = car.speed;
    const rpm = car.engineRPM;

    // Engine frequency based on RPM (80Hz idle to ~400Hz max)
    const freq = 80 + (rpm / 7000) * 320;
    this.engineOscillator.frequency.setTargetAtTime(freq, this.audioContext.currentTime, 0.1);

    // Engine volume based on throttle and speed
    const throttleVolume = car.engineRPM > 100 ? 0.15 : 0.05;
    const speedVolume = Math.min(speed / 200, 1) * 0.1;
    const targetVolume = Math.max(throttleVolume, speedVolume);

    this.engineGain.gain.setTargetAtTime(targetVolume, this.audioContext.currentTime, 0.1);
  }

  // Wind sound for high speeds
  private ensureWind(): void {
    if (!this.audioContext || !this.masterGain || this.windOscillator) return;

    this.windOscillator = this.audioContext.createOscillator();
    this.windGain = this.audioContext.createGain();
    this.windFilter = this.audioContext.createBiquadFilter();

    this.windOscillator.type = 'sawtooth';
    this.windOscillator.frequency.value = 100;
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 500;
    this.windGain.gain.value = 0;

    this.windOscillator.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    this.windOscillator.start();
  }

  updateWind(car: CarState): void {
    if (!this.audioContext || !this.windOscillator || !this.windGain || !this.windFilter) return;

    const speed = car.speed;
    const intensity = Math.max(0, (speed - 150) / 200); // Start at 150, max at 350

    if (intensity <= 0) {
      this.windGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.2);
      return;
    }

    // Wind frequency based on speed
    const freq = 80 + intensity * 400;
    this.windOscillator.frequency.setTargetAtTime(freq, this.audioContext.currentTime, 0.1);
    this.windFilter.frequency.setTargetAtTime(300 + intensity * 800, this.audioContext.currentTime, 0.1);

    const volume = intensity * 0.15;
    this.windGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.1);
  }

  private ensureSurface(): void {
    if (!this.audioContext || !this.masterGain || this.surfaceOscillator) return;

    this.surfaceOscillator = this.audioContext.createOscillator();
    this.surfaceGain = this.audioContext.createGain();

    this.surfaceOscillator.type = 'triangle';
    this.surfaceOscillator.frequency.value = 200;
    this.surfaceGain.gain.value = 0;

    this.surfaceOscillator.connect(this.surfaceGain);
    this.surfaceGain.connect(this.masterGain);
    this.surfaceOscillator.start();
  }

  updateSurface(car: CarState): void {
    if (!this.audioContext || !this.surfaceOscillator || !this.surfaceGain) return;
    if (car.isAirborne) {
      this.surfaceGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
      return;
    }

    const surface = car.surface;
    const speed = car.speed;
    const isDrifting = car.isDrifting;

    // Surface-specific audio
    let freq = 200;
    let volume = 0;

    switch (surface) {
      case 'asphalt':
        if (isDrifting && speed > 50) {
          freq = 600 + Math.random() * 200;
          volume = 0.12;
        } else if (speed > 100) {
          freq = 150 + speed * 0.5;
          volume = 0.03;
        }
        break;
      case 'dirt':
        freq = 80 + Math.random() * 40;
        volume = isDrifting ? 0.15 : Math.min(speed / 200, 1) * 0.08;
        break;
      case 'ice':
        freq = 800 + Math.random() * 100;
        volume = isDrifting ? 0.2 : (speed > 80 ? 0.05 : 0);
        break;
      case 'grass':
        freq = 120 + Math.random() * 30;
        volume = Math.min(speed / 150, 1) * 0.06;
        break;
      case 'plastic':
        freq = 400 + Math.random() * 150;
        volume = speed > 30 ? 0.1 : 0;
        break;
    }

    this.surfaceOscillator.frequency.setTargetAtTime(freq, this.audioContext.currentTime, 0.05);
    this.surfaceGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.05);
    this.lastSurface = surface;
  }

  playCheckpoint(): void {
    if (!this.audioContext || !this.masterGain || this.muted) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    osc.stop(this.audioContext.currentTime + 0.3);
  }

  playFinish(): void {
    if (!this.audioContext || !this.masterGain || this.muted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.15;

      osc.connect(gain);
      gain.connect(this.masterGain!);

      const startTime = this.audioContext!.currentTime + i * 0.15;
      osc.start(startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      osc.stop(startTime + 0.4);
    });
  }

  playBoost(): void {
    if (!this.audioContext || !this.masterGain || this.muted) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 200;
    gain.gain.value = 0.15;

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    osc.stop(this.audioContext.currentTime + 0.3);
  }

  playCrash(): void {
    if (!this.audioContext || !this.masterGain || this.muted) return;

    const bufferSize = this.audioContext.sampleRate * 0.2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = 800;

    source.buffer = buffer;
    gain.gain.value = 0.3;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
  }
}