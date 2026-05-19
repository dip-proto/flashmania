import { GhostFrame, Car } from './types';

// Linear interpolation helper
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Angular interpolation (handles wrap-around at 2*PI smoothly)
function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return a + diff * t;
}

export class GhostManager {
  private activeRecording: GhostFrame[] = [];
  private lastSearchIndex = 0; // Monotonic pointer optimization

  public startRecording(): void {
    this.activeRecording = [];
    this.lastSearchIndex = 0;
  }

  public recordFrame(timeMs: number, car: Car): void {
    // Avoid writing duplicate timeline states if clock is paused
    if (
      this.activeRecording.length > 0 &&
      this.activeRecording[this.activeRecording.length - 1].time === timeMs
    ) {
      return;
    }

    this.activeRecording.push({
      time: timeMs,
      x: car.x,
      y: car.y,
      z: car.z,
      heading: car.heading,
      isDrifting: car.isDrifting,
      speed: car.speed,
    });
  }

  public getRecording(): GhostFrame[] {
    return this.activeRecording;
  }

  /**
   * Search and interpolate a GhostFrame at a exact millisecond timestamp.
   * Leverages binary search for optimal lookup overhead across large frame arrays.
   */
  public getGhostFrameAt(ghostData: GhostFrame[] | null, timeMs: number): GhostFrame | null {
    if (!ghostData || ghostData.length === 0) return null;

    const len = ghostData.length;

    // Boundary checks
    if (timeMs <= ghostData[0].time) return ghostData[0];
    if (timeMs >= ghostData[len - 1].time) return ghostData[len - 1];

    // Attempt monotonic seek starting from last cursor (very common if time is incrementing linearly)
    let idx = this.lastSearchIndex;
    if (idx >= len) idx = len - 2;
    if (idx < 0) idx = 0;

    // Check if the timestamp is right between this index and the next
    if (ghostData[idx].time <= timeMs && ghostData[idx + 1].time > timeMs) {
      return this.interpolateFrames(ghostData[idx], ghostData[idx + 1], timeMs);
    }

    // Fallback: full Binary Search
    let low = 0;
    let high = len - 1;
    let foundIndex = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (ghostData[mid].time === timeMs) {
        foundIndex = mid;
        break;
      } else if (ghostData[mid].time < timeMs) {
        foundIndex = mid; // bracket candidate
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (foundIndex !== -1 && foundIndex < len - 1) {
      this.lastSearchIndex = foundIndex; // Cache cursor for next monotonic seek
      return this.interpolateFrames(
        ghostData[foundIndex],
        ghostData[foundIndex + 1],
        timeMs
      );
    }

    return ghostData[len - 1];
  }

  private interpolateFrames(
    f1: GhostFrame,
    f2: GhostFrame,
    timeMs: number
  ): GhostFrame {
    const range = f2.time - f1.time;
    const factor = range === 0 ? 0 : (timeMs - f1.time) / range;

    return {
      time: timeMs,
      x: lerp(f1.x, f2.x, factor),
      y: lerp(f1.y, f2.y, factor),
      z: lerp(f1.z, f2.z, factor),
      heading: lerpAngle(f1.heading, f2.heading, factor),
      isDrifting: f1.isDrifting, // binary state carries over
      speed: lerp(f1.speed, f2.speed, factor),
    };
  }

  // Persists the ghost recording into the local storage
  public saveGhost(trackId: string, frames: GhostFrame[]): boolean {
    try {
      const serialized = JSON.stringify(frames);
      localStorage.setItem(`ghost_${trackId}`, serialized);
      return true;
    } catch (e) {
      console.error('Failed to save ghost to localStorage:', e);
      return false;
    }
  }

  // Restores the ghost recording from the local storage
  public loadGhost(trackId: string): GhostFrame[] | null {
    try {
      const raw = localStorage.getItem(`ghost_${trackId}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error(`Failed to load ghost for ${trackId}:`, e);
      return null;
    }
  }

  // Deletes a ghost run
  public deleteGhost(trackId: string): void {
    localStorage.removeItem(`ghost_${trackId}`);
  }
}
