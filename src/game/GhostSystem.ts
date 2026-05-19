import { Vec3, Quat } from '../engine/Vector.js';

/** A single recorded frame of ghost data */
export interface GhostFrame {
  time: number;
  position: Vec3;
  rotation: { x: number; y: number; z: number; w: number };
  speed: number;
}

/** Manages recording and playback of ghost runs */
export class GhostSystem {
  private recording: GhostFrame[] = [];
  private isRecording = false;
  private startTime = 0;
  private recordInterval = 0.05; // Record every 50ms (20 fps)
  private lastRecordTime = 0;

  // Best ghost (the one to display)
  private bestGhost: GhostFrame[] | null = null;
  private playbackIndex = 0;
  private playbackTime = 0;

  /** Start recording a new run */
  startRecording(startTime: number): void {
    this.recording = [];
    this.isRecording = true;
    this.startTime = startTime;
    this.lastRecordTime = -1;
  }

  /** Record a frame if enough time has passed */
  recordFrame(time: number, position: Vec3, rotation: Quat, speed: number): void {
    if (!this.isRecording) return;
    const elapsed = time - this.startTime;
    if (elapsed - this.lastRecordTime < this.recordInterval) return;
    this.lastRecordTime = elapsed;

    this.recording.push({
      time: elapsed,
      position: position.clone(),
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w },
      speed,
    });
  }

  /** Stop recording and save if this is the best run */
  stopRecording(finishTime: number): GhostFrame[] | null {
    this.isRecording = false;
    if (this.recording.length === 0) return null;

    // Check if this is the best ghost
    if (!this.bestGhost || finishTime < this.getLastTime()) {
      this.bestGhost = [...this.recording];
    }
    return this.recording;
  }

  /** Cancel recording (e.g., on reset) */
  cancelRecording(): void {
    this.isRecording = false;
    this.recording = [];
  }

  /** Get playback position for current time */
  getPlaybackPosition(currentTime: number): { position: Vec3; rotation: { x: number; y: number; z: number; w: number }; speed: number } | null {
    if (!this.bestGhost || this.bestGhost.length === 0) return null;

    // Find the two frames to interpolate between
    let frameA = this.bestGhost[0];
    let frameB = this.bestGhost[0];

    for (let i = 1; i < this.bestGhost.length; i++) {
      if (this.bestGhost[i].time > currentTime) {
        frameB = this.bestGhost[i];
        break;
      }
      frameA = this.bestGhost[i];
      frameB = this.bestGhost[i];
    }

    // Interpolate
    const t = frameB.time === frameA.time ? 0 : (currentTime - frameA.time) / (frameB.time - frameA.time);
    const pos = frameA.position.lerp(frameB.position, t);
    // Simple rotation interpolation (use frameA for simplicity)
    return {
      position: pos,
      rotation: frameA.rotation,
      speed: frameA.speed,
    };
  }

  /** Get total time of the best ghost */
  getBestTime(): number | null {
    if (!this.bestGhost || this.bestGhost.length === 0) return null;
    return this.getLastTime();
  }

  private getLastTime(): number {
    return this.recording[this.recording.length - 1]?.time ?? Infinity;
  }

  /** Whether we have a ghost to display */
  hasGhost(): boolean {
    return this.bestGhost !== null && this.bestGhost.length > 0;
  }
}