import { SurfaceType } from './surfaces';

/**
 * Audio system using Web Audio API for:
 *  - Engine pitch based on speed
 *  - Surface-specific noise
 *  - Checkpoint dings
 *  - Wind at high speeds
 */
export class AudioSystem {
  private audioCtx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private windNode: AudioBufferSourceNode | null = null;
  private windGain: GainNode | null = null;
  private started: boolean = false;

  private currentSurface: SurfaceType = SurfaceType.Asphalt;
  private checkpointPlayed: boolean = false;

  start() {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new AudioContext();

      // --- Engine oscillator (sawtooth) ---
      this.engineGain = this.audioCtx.createGain();
      this.engineGain.gain.value = 0.08;
      this.engineGain.connect(this.audioCtx.destination);

      this.engineOsc = this.audioCtx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.value = 80;
      this.engineOsc.connect(this.engineGain);
      this.engineOsc.start();

      // --- Surface noise (filtered noise) ---
      this.noiseGain = this.audioCtx.createGain();
      this.noiseGain.gain.value = 0;
      this.noiseGain.connect(this.audioCtx.destination);

      // Generate noise buffer
      const sampleRate = this.audioCtx.sampleRate;
      const len = sampleRate * 0.5;
      const buf = this.audioCtx.createBuffer(1, len, sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuf = buf;

      // --- Wind noise ---
      this.windGain = this.audioCtx.createGain();
      this.windGain.gain.value = 0;
      this.windGain.connect(this.audioCtx.destination);

      this.started = true;
      this.restartNoise();
      this.restartWind();
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }

  private restartNoise() {
    if (!this.audioCtx || !this.noiseBuf) return;
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch {}
    }
    const src = this.audioCtx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;

    // Filter for surface color
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 3000;
    filter.Q.value = 1;
    src.connect(filter);
    filter.connect(this.noiseGain!);

    src.start();
    this.noiseNode = src;
  }

  private restartWind() {
    if (!this.audioCtx || !this.noiseBuf) return;
    if (this.windNode) {
      try { this.windNode.stop(); } catch {}
    }
    const src = this.audioCtx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 200;
    filter.Q.value = 0.5;
    src.connect(filter);
    filter.connect(this.windGain!);

    src.start();
    this.windNode = src;
  }

  update(speed: number, surface: SurfaceType, drifting: boolean, airborne: boolean) {
    if (!this.started) return;

    const speedNorm = Math.min(speed / 30, 1); // 0..1

    // --- Engine pitch: 80..400 Hz based on speed ---
    const engineHz = 80 + speedNorm * 320;
    if (this.engineOsc) {
      this.engineOsc.frequency.value = engineHz;
    }

    // Engine gain: louder when accelerating, quieter when airborne
    const engineVol = airborne ? 0.02 : 0.05 + speedNorm * 0.05;
    if (this.engineGain) {
      this.engineGain.gain.value = engineVol;
    }

    // --- Surface noise ---
    let noiseVol = 0;
    if (!airborne) {
      switch (surface) {
        case SurfaceType.Asphalt:
          noiseVol = 0.02 + (drifting ? 0.06 : 0);
          break;
        case SurfaceType.Dirt:
          noiseVol = 0.04 + speedNorm * 0.03;
          break;
        case SurfaceType.Ice:
          noiseVol = 0.01 + (drifting ? 0.05 : 0);
          break;
        case SurfaceType.Grass:
          noiseVol = 0.03;
          break;
        case SurfaceType.Plastic:
          noiseVol = 0.04;
          break;
      }
    }
    if (this.noiseGain) {
      this.noiseGain.gain.value = noiseVol;
    }

    // --- Wind: increases with speed ---
    const windVol = speedNorm * speedNorm * 0.1;
    if (this.windGain) {
      this.windGain.gain.value = windVol;
    }
  }

  playCheckpoint() {
    const ctx = this.audioCtx;
    if (!ctx || !this.started) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.type = 'sine';
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  playFinish() {
    const ctx = this.audioCtx;
    if (!ctx || !this.started) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + i * 0.15;
      gain.gain.value = 0.12;
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  stop() {
    if (this.engineOsc) {
      try { this.engineOsc.stop(); } catch {}
      this.engineOsc = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch {}
      this.noiseNode = null;
    }
    if (this.windNode) {
      try { this.windNode.stop(); } catch {}
      this.windNode = null;
    }
    this.started = false;
  }
}
