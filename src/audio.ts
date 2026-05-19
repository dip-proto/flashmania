import { Car } from './types';

export class AudioManager {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  // Sound sources & nodes
  private masterGain: GainNode | null = null;
  
  // Engine synth
  private engineOsc: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null; // Sub-octave for thickness
  private engineFilter: BiquadFilterNode | null = null;
  private engineGain: GainNode | null = null;

  // Tire skid / sliding hiss
  private noiseBuffer: AudioBuffer | null = null;
  private skidNoiseSource: AudioBufferSourceNode | null = null;
  private skidFilter: BiquadFilterNode | null = null;
  private skidGain: GainNode | null = null;

  // Surface texture crunchers (for dirt, ice, grass)
  private surfaceNoiseSource: AudioBufferSourceNode | null = null;
  private surfaceFilter: BiquadFilterNode | null = null;
  private surfaceGain: GainNode | null = null;

  // Environment wind
  private windSource: AudioBufferSourceNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;

  constructor() {
    // Audio context is not initialized until user interaction
  }

  public async unlock(): Promise<boolean> {
    if (this.isUnlocked) return true;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.isUnlocked = true;
      this.setupGlobalNodes();
      console.log('Web Audio engine unlocked and active.');
      return true;
    } catch (e) {
      console.error('Failed to unlock Web Audio context:', e);
      return false;
    }
  }

  private setupGlobalNodes(): void {
    if (!this.ctx) return;

    // Master Volume
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Build reusable white noise buffer (1 second)
    const sampleRate = this.ctx.sampleRate;
    this.noiseBuffer = this.ctx.createBuffer(1, sampleRate, sampleRate);
    const channelData = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < sampleRate; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }

    // Initialize looping sound nodes
    this.setupEngineSynth();
    this.setupSkidSynth();
    this.setupSurfaceSynth();
    this.setupWindSynth();
  }

  private setupEngineSynth(): void {
    if (!this.ctx || !this.masterGain) return;

    // Low engine rumble synth
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.setValueAtTime(30, this.ctx.currentTime); // sub oscillator

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(300, this.ctx.currentTime);
    this.engineFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime); // start silent

    // Connections
    this.engineOsc.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.engineOsc.start();
    this.engineOsc2.start();
  }

  private setupSkidSynth(): void {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    this.skidNoiseSource = this.ctx.createBufferSource();
    this.skidNoiseSource.buffer = this.noiseBuffer;
    this.skidNoiseSource.loop = true;

    this.skidFilter = this.ctx.createBiquadFilter();
    this.skidFilter.type = 'bandpass';
    this.skidFilter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    this.skidFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.skidGain = this.ctx.createGain();
    this.skidGain.gain.setValueAtTime(0, this.ctx.currentTime); // start silent

    this.skidNoiseSource.connect(this.skidFilter);
    this.skidFilter.connect(this.skidGain);
    this.skidGain.connect(this.masterGain);

    this.skidNoiseSource.start();
  }

  private setupSurfaceSynth(): void {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    this.surfaceNoiseSource = this.ctx.createBufferSource();
    this.surfaceNoiseSource.buffer = this.noiseBuffer;
    this.surfaceNoiseSource.loop = true;

    this.surfaceFilter = this.ctx.createBiquadFilter();
    this.surfaceFilter.type = 'bandpass';
    this.surfaceFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
    this.surfaceFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    this.surfaceGain = this.ctx.createGain();
    this.surfaceGain.gain.setValueAtTime(0, this.ctx.currentTime); // silent

    this.surfaceNoiseSource.connect(this.surfaceFilter);
    this.surfaceFilter.connect(this.surfaceGain);
    this.surfaceGain.connect(this.masterGain);

    this.surfaceNoiseSource.start();
  }

  private setupWindSynth(): void {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = this.noiseBuffer;
    this.windSource.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.windSource.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.windSource.start();
  }

  // Set overall audio master state (e.g. paused)
  public setMute(muted: boolean): void {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
  }

  /**
   * Called every tick of the physics loop to update looping synths
   */
  public update(car: Car, _dt: number): void {
    if (!this.isUnlocked || !this.ctx) return;

    const t = this.ctx.currentTime;
    const speed = car.speed;

    // 1. ENGINE SYNTH CALCULATIONS
    let rpmNormalized = 0;
    let gear = 1;

    // Simulate 4 speed gear ratios
    if (speed < 180) {
      gear = 1;
      rpmNormalized = speed / 180;
    } else if (speed < 380) {
      gear = 2;
      rpmNormalized = (speed - 180) / 200;
    } else if (speed < 620) {
      gear = 3;
      rpmNormalized = (speed - 380) / 240;
    } else {
      gear = 4;
      rpmNormalized = Math.min(1.0, (speed - 620) / 600);
    }

    // Engine frequency map based on gear and rpm
    const baseFreq = 48 + gear * 12;
    const pitch = baseFreq + rpmNormalized * 110;

    let engineVol = 0.16; // base volume

    // Engine Cutout gimmick or airborne mute
    if (car.engineOffTimer > 0) {
      engineVol = 0.0; // Complete cutout silence
    } else if (car.isAirborne) {
      // Whining engine pitch bounces on rev-limiter when in mid-air
      const airRev = 180 + Math.sin(t * 45) * 15;
      this.engineOsc?.frequency.setTargetAtTime(airRev, t, 0.05);
      this.engineOsc2?.frequency.setTargetAtTime(airRev / 2, t, 0.05);
      this.engineFilter?.frequency.setTargetAtTime(400, t, 0.05);
      this.engineGain?.gain.setTargetAtTime(0.08, t, 0.05);
    } else {
      // Normal driving
      this.engineOsc?.frequency.setTargetAtTime(pitch, t, 0.05);
      this.engineOsc2?.frequency.setTargetAtTime(pitch / 2, t, 0.05);
      
      const filterCutoff = 180 + rpmNormalized * 600 + (car.boostEffectTimer > 0 ? 300 : 0);
      this.engineFilter?.frequency.setTargetAtTime(filterCutoff, t, 0.05);
      this.engineGain?.gain.setTargetAtTime(engineVol, t, 0.05);
    }

    // 2. DRIFT / SKID screech
    if (!car.isAirborne && car.isDrifting && speed > 100) {
      let skidVol = Math.min(0.28, (speed - 100) / 800);
      let skidFreq = 1100 + rpmNormalized * 400 + Math.sin(t * 30) * 50;

      if (car.currentSurface === 'ice') {
        // Ice is a very smooth knife hiss
        skidVol *= 0.4;
        skidFreq = 500 + Math.sin(t * 10) * 10;
        this.skidFilter?.Q.setTargetAtTime(1.0, t, 0.05);
      } else if (car.currentSurface === 'dirt') {
        // Dirt is less whistle, more raw high scrapings
        skidVol *= 0.6;
        skidFreq = 650;
        this.skidFilter?.Q.setTargetAtTime(2.0, t, 0.05);
      } else {
        // Asphalt scream
        this.skidFilter?.Q.setTargetAtTime(6.0, t, 0.05);
      }

      this.skidFilter?.frequency.setTargetAtTime(skidFreq, t, 0.05);
      this.skidGain?.gain.setTargetAtTime(skidVol, t, 0.05);
    } else {
      this.skidGain?.gain.setTargetAtTime(0.0, t, 0.1);
    }

    // 3. SURFACE ACOUSTICS
    if (!car.isAirborne && speed > 30) {
      let surfVol = 0;
      let surfFreq = 200;
      let surfQ = 1.0;

      switch (car.currentSurface) {
        case 'dirt':
          // Crunchy gravel pops (modulated noise amplitude)
          surfVol = 0.2 + Math.abs(Math.sin(t * 80)) * 0.15;
          surfFreq = 180 + Math.random() * 200;
          surfQ = 1.5;
          break;
        case 'ice':
          // Soft buttery sweeping hiss
          surfVol = 0.08;
          surfFreq = 850 + Math.sin(t * 1.5) * 50;
          surfQ = 0.7;
          break;
        case 'grass':
          // Dampened soft friction rumble
          surfVol = 0.25;
          surfFreq = 100 + Math.sin(t * 10) * 15;
          surfQ = 2.0;
          break;
        case 'plastic':
          // Squeaky bouncy resonance
          surfVol = 0.12;
          surfFreq = 300 + Math.sin(t * 40) * 80;
          surfQ = 5.0;
          break;
        default: // Asphalt/Road (smooth high clean hum)
          surfVol = Math.min(0.06, speed / 1200);
          surfFreq = 150 + speed * 0.1;
          surfQ = 0.5;
          break;
      }

      // Proportional to speed
      const speedModifier = Math.min(1.0, speed / 300);
      this.surfaceFilter?.frequency.setTargetAtTime(surfFreq, t, 0.05);
      this.surfaceFilter?.Q.setTargetAtTime(surfQ, t, 0.05);
      this.surfaceGain?.gain.setTargetAtTime(surfVol * speedModifier, t, 0.05);
    } else {
      this.surfaceGain?.gain.setTargetAtTime(0.0, t, 0.1);
    }

    // 4. ENVIRONMENT WIND WHISTLE
    if (speed > 400) {
      const windVol = Math.min(0.18, (speed - 400) / 1000);
      const windFreq = 250 + (speed - 400) * 0.6 + Math.sin(t * 8) * 30;
      this.windFilter?.frequency.setTargetAtTime(windFreq, t, 0.08);
      this.windGain?.gain.setTargetAtTime(windVol, t, 0.1);
    } else {
      this.windGain?.gain.setTargetAtTime(0.0, t, 0.15);
    }
  }

  // ----------------------------------------------------
  // ONE-OFF SYNTHESIZED SOUND EFFECTS (SFX)
  // ----------------------------------------------------

  public triggerCheckpointDing(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const notes = [1300, 1560, 1950]; // Beautiful triad ding-ding-ding cascade
    const duration = 0.4;

    notes.forEach((freq, idx) => {
      const startTime = t + idx * 0.06;
      
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  }

  public triggerBoost(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // Low-mid sweeping rise roar
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.6);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, t);
    filter.frequency.exponentialRampToValueAtTime(3000, t + 0.4);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.85);

    // High golden spark whistle
    const sparkOsc = this.ctx.createOscillator();
    const sparkGain = this.ctx.createGain();

    sparkOsc.type = 'sine';
    sparkOsc.frequency.setValueAtTime(2200, t);
    sparkOsc.frequency.linearRampToValueAtTime(400, t + 0.4);

    sparkGain.gain.setValueAtTime(0.1, t);
    sparkGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

    sparkOsc.connect(sparkGain);
    sparkGain.connect(this.masterGain);

    sparkOsc.start(t);
    sparkOsc.stop(t + 0.45);
  }

  public triggerCrash(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // Noise explosion
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(250, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(30, t + 0.4);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.6);

    // Deep low body-hit oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(45, t + 0.25);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  public triggerLand(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // Bass thump landing
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.15);

    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  public triggerHeavyLand(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    this.triggerLand();

    // Extra tire-compression crash sound
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.25);
  }

  public triggerFragileAlert(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // High ominous cyber synth double beep
    [t, t + 0.15].forEach((startTime, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 880 : 980, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  public triggerFragileBreak(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // Glass/steering breaking metallic clink
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2800, t);
    osc.frequency.linearRampToValueAtTime(1400, t + 0.35);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(3500, t);
    osc2.frequency.linearRampToValueAtTime(50, t + 0.35);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + 0.45);
    osc2.stop(t + 0.45);
  }

  public triggerLockAlert(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // Aggressive descending locking zap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.25);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  public triggerVoidFall(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // Descending falling engine noise pitch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.95);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 1.1);
  }

  public triggerVoidResetThump(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.15);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  public triggerEngineCut(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // High frequency power cut squeal / static popping
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.linearRampToValueAtTime(10, t + 0.25);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  public triggerSplash(): void {
    if (!this.isUnlocked || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;

    // Water splash swoosh sfx
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(150, t + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.5);
  }
}
