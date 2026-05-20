import { VehicleState } from './vehicle';

export interface GhostSnapshot {
  pos: { x: number; y: number };
  angle: number;
  speed: number;
}

/**
 * Records vehicle snapshots at fixed intervals for ghost replay.
 */
export class GhostRecorder {
  private interval: number = 0.05; // 50ms snapshots
  private timer: number = 0;
  private snapshots: GhostSnapshot[] = [];

  reset() {
    this.snapshots = [];
    this.timer = 0;
  }

  record(v: VehicleState, dt: number) {
    this.timer += dt;
    if (this.timer >= this.interval) {
      this.timer = 0;
      this.snapshots.push({
        pos: { x: v.pos.x, y: v.pos.y },
        angle: v.angle,
        speed: v.speed,
      });
    }
  }

  getSnapshots(): GhostSnapshot[] {
    return [...this.snapshots];
  }
}

/**
 * Creates a "perfect" ghost by slightly modifying input — we just simulate
 * a slower run for demo purposes.
 */
export function generateDemoGhost(trackStart: { x: number; y: number }): GhostSnapshot[] {
  const ghost: GhostSnapshot[] = [];
  // Generate a simple path along the track
  for (let i = 0; i < 200; i++) {
    const t = i / 200;
    ghost.push({
      pos: {
        x: trackStart.x + t * 800,
        y: trackStart.y + Math.sin(t * 8) * 40,
      },
      angle: Math.sin(t * 4) * 0.3,
      speed: 20 * (1 - t * 0.3),
    });
  }
  return ghost;
}
