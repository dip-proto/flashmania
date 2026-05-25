import { CarState, SurfaceType, SURFACE_PHYSICS } from './types';

export class AudioManager {
  private audioCtx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private surfaceNoise: OscillatorNode | null = null;
  private surfaceGain: GainNode | null = null;
  private windNoise: OscillatorNode | null = null;
  private windGain: GainNode | null = null;
  private checkpointOsc: OscillatorNode | null = null;
  private checkpointGain: GainNode | null = null;
  private boostOsc: OscillatorNode | null = null;
  private boostGain: GainNode | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;
    try {
      this.audioCtx = new AudioContext();
      this.createEngineSound();
      this.createSurfaceSound();
      this.createWindSound();
      this.createCheckpointSound();
      this.createBoostSound();
      this.initialized = true;
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }

  private createEngineSound() {
    if (!this.audioCtx) return;
    this.engineOsc = this.audioCtx.createOscillator();
    this.engineGain = this.audioCtx.createGain();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.value = 80;
    this.engineGain.gain.value = 0;
    this.engineOsc.connect(this.engineGain);
    this.engineGain.connect(this.audioCtx.destination);
    this.engineOsc.start();
  }

  private createSurfaceSound() {
    if (!this.audioCtx) return;
    this.surfaceNoise = this.audioCtx.createOscillator();
    this.surfaceGain = this.audioCtx.createGain();
    this.surfaceNoise.type = 'sawtooth';
    this.surfaceNoise.frequency.value = 200;
    this.surfaceGain.gain.value = 0;
    this.surfaceNoise.connect(this.surfaceGain);
    this.surfaceGain.connect(this.audioCtx.destination);
    this.surfaceNoise.start();
  }

  private createWindSound() {
    if (!this.audioCtx) return;
    this.windNoise = this.audioCtx.createOscillator();
    this.windGain = this.audioCtx.createGain();
    this.windNoise.type = 'sine';
    this.windNoise.frequency.value = 600;
    this.windGain.gain.value = 0;
    this.windNoise.connect(this.windGain);
    this.windGain.connect(this.audioCtx.destination);
    this.windNoise.start();
  }

  private createCheckpointSound() {
    if (!this.audioCtx) return;
    this.checkpointOsc = this.audioCtx.createOscillator();
    this.checkpointGain = this.audioCtx.createGain();
    this.checkpointOsc.type = 'sine';
    this.checkpointOsc.frequency.value = 880;
    this.checkpointGain.gain.value = 0;
    this.checkpointOsc.connect(this.checkpointGain);
    this.checkpointGain.connect(this.audioCtx.destination);
    this.checkpointOsc.start();
  }

  private createBoostSound() {
    if (!this.audioCtx) return;
    this.boostOsc = this.audioCtx.createOscillator();
    this.boostGain = this.audioCtx.createGain();
    this.boostOsc.type = 'sine';
    this.boostOsc.frequency.value = 440;
    this.boostGain.gain.value = 0;
    this.boostOsc.connect(this.boostGain);
    this.boostGain.connect(this.audioCtx.destination);
    this.boostOsc.start();
  }

  update(carState: CarState, dt: number) {
    if (!this.initialized || !this.audioCtx) return;

    const speed = carState.speed;
    const surf = SURFACE_PHYSICS[carState.surface];

    // Engine sound: pitch up/down based on speed
    if (this.engineOsc && this.engineGain) {
      const engineFreq = 80 + (speed / 420) * 300;
      this.engineOsc.frequency.setTargetAtTime(engineFreq, this.audioCtx.currentTime, 0.05);
      const engineVol = Math.min(0.15, speed / 420 * 0.15);
      this.engineGain.gain.setTargetAtTime(carState.engineOff ? 0 : engineVol, this.audioCtx.currentTime, 0.05);
    }

    // Surface sound: different per surface type
    if (this.surfaceNoise && this.surfaceGain) {
      const surfVol = Math.min(0.08, speed / 420 * 0.08);
      const driftVol = surfVol * (1 + carState.driftAngle * 2);
      this.surfaceNoise.frequency.setTargetAtTime(
        this.getSurfaceFreq(carState.surface, carState.driftAngle),
        this.audioCtx.currentTime, 0.05
      );
      this.surfaceGain.gain.setTargetAtTime(
        surfVol + (carState.driftAngle > 0.1 ? 0.05 : 0),
        this.audioCtx.currentTime, 0.05
      );
    }

    // Wind sound: gets louder at high speed
    if (this.windNoise && this.windGain) {
      const windVol = Math.min(0.06, (speed / 420) * 0.06);
      this.windNoise.frequency.setTargetAtTime(
        600 + (speed / 420) * 400,
        this.audioCtx.currentTime, 0.05
      );
      this.windGain.gain.setTargetAtTime(windVol, this.audioCtx.currentTime, 0.05);
    }
  }

  private getSurfaceFreq(surface: SurfaceType, driftAngle: number): number {
    switch (surface) {
      case SurfaceType.Asphalt: return 200 + driftAngle * 500;
      case SurfaceType.Dirt: return 150 + driftAngle * 200;
      case SurfaceType.Ice: return 100 + driftAngle * 600;
      case SurfaceType.Grass: return 180;
      case SurfaceType.Plastic: return 250 + driftAngle * 300;
      default: return 200;
    }
  }

  playCheckpoint() {
    if (!this.initialized || !this.audioCtx || !this.checkpointOsc || !this.checkpointGain) return;
    this.checkpointOsc.frequency.value = 880;
    this.checkpointGain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    this.checkpointGain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.3);
  }

  playBoost() {
    if (!this.initialized || !this.audioCtx || !this.boostOsc || !this.boostGain) return;
    this.boostOsc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
    this.boostOsc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.3);
    this.boostGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    this.boostGain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);
  }

  playFinish() {
    if (!this.initialized || !this.audioCtx) return;
    // Play a celebration sound
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 440;
    gain.gain.value = 0.3;
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime + 0.2);
    osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime + 0.4);
    osc.frequency.setValueAtTime(880, this.audioCtx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);
    osc.stop(this.audioCtx.currentTime + 1.5);
  }

  stopAll() {
    if (!this.initialized || !this.audioCtx) return;
    if (this.engineGain) this.engineGain.gain.value = 0;
    if (this.surfaceGain) this.surfaceGain.gain.value = 0;
    if (this.windGain) this.windGain.gain.value = 0;
    if (this.checkpointGain) this.checkpointGain.gain.value = 0;
    if (this.boostGain) this.boostGain.gain.value = 0;
  }

  resume() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }
}