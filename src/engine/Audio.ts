/** Audio system for game sounds using Web Audio API */
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private surfaceNoiseNode: AudioBufferSourceNode | null = null;
  private surfaceGain: GainNode | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
      this.surfaceGain = this.ctx.createGain();
      this.surfaceGain.gain.value = 0.0;
      this.surfaceGain.connect(this.masterGain);
      this.initialized = true;

      // Create engine oscillator
      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.value = 80;
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.value = 0.15;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);
      this.engineOsc.start();
    } catch {
      console.warn('Audio initialization failed');
    }
  }

  /** Update engine pitch based on speed (0-1 normalized) */
  updateEngine(speedRatio: number, isAccelerating: boolean): void {
    if (!this.engineOsc || !this.engineGain || !this.ctx) return;
    const basePitch = 60 + speedRatio * 300;
    const pitch = isAccelerating ? basePitch * 1.15 : basePitch * 0.85;
    this.engineOsc.frequency.setTargetAtTime(pitch, this.ctx.currentTime, 0.05);
    const vol = 0.08 + speedRatio * 0.15;
    this.engineGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
  }

  /** Play surface sound (would need actual audio files for real implementation) */
  setSurfaceNoise(surface: string, intensity: number): void {
    // In a full implementation, this would mix surface-specific sounds
    // For now, we just adjust volume to indicate surface change
    if (!this.surfaceGain || !this.ctx) return;
    const vol = intensity * 0.1;
    this.surfaceGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
  }

  /** Ding sound for checkpoints */
  playCheckpoint(): void {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.value = 0.3;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  /** Sound for finishing the race */
  playFinish(): void {
    if (!this.ctx || !this.masterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.3;
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.5 + i * 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      const startTime = this.ctx!.currentTime + i * 0.15;
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  /** Booster sound */
  playBoost(): void {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 200;
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3);
    gain.gain.value = 0.2;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  /** Crash/impact sound */
  playCrash(): void {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.3;
    source.connect(gain);
    gain.connect(this.masterGain);
    source.start();
  }

  destroy(): void {
    this.engineOsc?.stop();
    this.ctx?.close();
  }
}