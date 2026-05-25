import { GhostFrame, CarState } from './types';

export class GhostManager {
  private frames: GhostFrame[] = [];
  private replayIndex = 0;
  private isRecording = false;
  private isReplaying = false;
  private bestTime = Infinity;
  private bestFrames: GhostFrame[] = [];

  startRecording() {
    this.frames = [];
    this.isRecording = true;
    this.isReplaying = false;
    this.replayIndex = 0;
  }

  stopRecording() {
    this.isRecording = false;
    if (this.bestTime === Infinity) {
      this.bestTime = Infinity;
      this.bestFrames = [...this.frames];
    }
  }

  recordFrame(state: CarState) {
    if (!this.isRecording) return;
    this.frames.push({
      x: state.x,
      y: state.y,
      angle: state.angle,
      speed: state.speed,
      driftAngle: state.driftAngle,
      isAirborne: state.isAirborne,
      surface: state.surface,
    });
  }

  startReplay() {
    this.isReplaying = true;
    this.isRecording = false;
    this.replayIndex = 0;
  }

  stopReplay() {
    this.isReplaying = false;
  }

  getGhostFrame(): GhostFrame | null {
    if (!this.isReplaying || this.replayIndex >= this.bestFrames.length) return null;
    const frame = this.bestFrames[this.replayIndex];
    this.replayIndex++;
    return frame;
  }

  isRecordingActive(): boolean {
    return this.isRecording;
  }

  isReplayActive(): boolean {
    return this.isReplaying;
  }

  hasBestTime(): boolean {
    return this.bestFrames.length > 0;
  }

  getBestTime(): number {
    return this.bestTime;
  }

  setBestTime(time: number) {
    if (time < this.bestTime) {
      this.bestTime = time;
      this.bestFrames = [...this.frames];
    }
  }

  getGhostCount(): number {
    return this.bestFrames.length;
  }
}