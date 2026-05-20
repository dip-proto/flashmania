/**
 * AudioManager — Web Audio API based sound system.
 * Generates engine sounds, surface sounds, checkpoint dings, and crash sounds procedurally.
 */

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Engine sound
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;

  // Surface noise
  private surfaceNoise: AudioBufferSourceNode | null = null;
  private surfaceGain: GainNode | null = null;
  private surfaceFilter: BiquadFilterNode | null = null;

  private initialized = false;

  init() {
    if (this.initialized) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /** Start the engine sound */
  startEngine() {
    if (!this.ctx || !this.masterGain) return;

    // Main oscillator
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.value = 80;

    // Sub oscillator for depth
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'square';
    subOsc.frequency.value = 40;

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 400;
    this.engineFilter.Q.value = 2;

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.value = 0.15;

    this.engineOsc.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    subOsc.connect(this.engineGain);
    subOsc.start();
    this.engineOsc.start();

    // Store sub osc reference for cleanup
    (this.engineOsc as any)._subOsc = subOsc;
  }

  /** Update engine sound based on RPM and speed */
  updateEngine(rpm: number, speed: number) {
    if (!this.engineOsc || !this.engineGain || !this.engineFilter) return;
    const freq = 60 + rpm * 4;
    this.engineOsc.frequency.setTargetAtTime(freq, this.ctx!.currentTime, 0.05);
    const subFreq = freq * 0.5;
    ((this.engineOsc as any)._subOsc as OscillatorNode)?.frequency.setTargetAtTime(subFreq, this.ctx!.currentTime, 0.05);
    this.engineFilter.frequency.setTargetAtTime(300 + rpm * 3, this.ctx!.currentTime, 0.05);
    this.engineGain.gain.setTargetAtTime(0.08 + Math.min(speed / 100, 1) * 0.12, this.ctx!.currentTime, 0.05);
  }

  stopEngine() {
    try {
      this.engineOsc?.stop();
      ((this.engineOsc as any)._subOsc as OscillatorNode)?.stop();
    } catch {}
    this.engineOsc = null;
    this.engineGain = null;
    this.engineFilter = null;
  }

  /** Start surface noise (white noise through filter) */
  startSurfaceNoise() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.surfaceNoise = this.ctx.createBufferSource();
    this.surfaceNoise.buffer = buffer;
    this.surfaceNoise.loop = true;

    this.surfaceFilter = this.ctx.createBiquadFilter();
    this.surfaceFilter.type = 'bandpass';
    this.surfaceFilter.frequency.value = 2000;
    this.surfaceFilter.Q.value = 0.5;

    this.surfaceGain = this.ctx.createGain();
    this.surfaceGain.gain.value = 0.03;

    this.surfaceNoise.connect(this.surfaceFilter);
    this.surfaceFilter.connect(this.surfaceGain);
    this.surfaceGain.connect(this.masterGain);
    this.surfaceNoise.start();
  }

  /** Update surface sound based on surface type and speed */
  updateSurface(surface: string, speed: number) {
    if (!this.surfaceGain || !this.surfaceFilter || !this.ctx) return;
    const vol = Math.min(speed / 50, 1) * 0.06;
    this.surfaceGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);

    switch (surface) {
      case 'asphalt':
        this.surfaceFilter.frequency.setTargetAtTime(3000, this.ctx.currentTime, 0.1);
        this.surfaceFilter.Q.setTargetAtTime(1, this.ctx.currentTime, 0.1);
        break;
      case 'dirt':
        this.surfaceFilter.frequency.setTargetAtTime(800, this.ctx.currentTime, 0.1);
        this.surfaceFilter.Q.setTargetAtTime(0.3, this.ctx.currentTime, 0.1);
        break;
      case 'ice':
        this.surfaceFilter.frequency.setTargetAtTime(5000, this.ctx.currentTime, 0.1);
        this.surfaceFilter.Q.setTargetAtTime(3, this.ctx.currentTime, 0.1);
        this.surfaceGain.gain.setTargetAtTime(vol * 0.3, this.ctx.currentTime, 0.1);
        break;
      case 'grass':
        this.surfaceFilter.frequency.setTargetAtTime(1200, this.ctx.currentTime, 0.1);
        this.surfaceFilter.Q.setTargetAtTime(0.5, this.ctx.currentTime, 0.1);
        break;
      case 'plastic':
        this.surfaceFilter.frequency.setTargetAtTime(4000, this.ctx.currentTime, 0.1);
        this.surfaceFilter.Q.setTargetAtTime(2, this.ctx.currentTime, 0.1);
        break;
    }
  }

  stopSurfaceNoise() {
    try { this.surfaceNoise?.stop(); } catch {}
    this.surfaceNoise = null;
  }

  /** Play checkpoint ding sound */
  playCheckpoint() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);

    // Second ding
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 1600;
    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0, this.ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(this.ctx.currentTime + 0.08);
    osc2.stop(this.ctx.currentTime + 0.4);
  }

  /** Play finish line sound */
  playFinish() {
    if (!this.ctx || !this.masterGain) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, this.ctx!.currentTime + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(this.ctx!.currentTime + i * 0.12);
      osc.stop(this.ctx!.currentTime + i * 0.12 + 0.4);
    });
  }

  /** Play boost sound */
  playBoost() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  /** Play crash/bump sound */
  playCrash() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.15;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
  }

  /** Play countdown beep */
  playBeep(high: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = high ? 880 : 440;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  /** Play "GO!" sound */
  playGo() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 660;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  destroy() {
    this.stopEngine();
    this.stopSurfaceNoise();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}