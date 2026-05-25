import { TrackBlock, BlockType, SurfaceType } from './types';

export class Track {
  blocks: TrackBlock[];
  checkpoints: number[];
  startBlock: TrackBlock | null;
  finishBlock: TrackBlock | null;
  medalThresholds: { bronze: number; silver: number; gold: number; author: number };

  constructor() {
    this.blocks = [];
    this.checkpoints = [];
    this.startBlock = null;
    this.finishBlock = null;
    this.medalThresholds = { bronze: 45, silver: 35, gold: 28, author: 22 };
  }

  generateTrack(level: number) {
    this.blocks = [];
    this.checkpoints = [];
    this.startBlock = null;
    this.finishBlock = null;

    const blockWidth = 200;
    const blockHeight = 80;
    let cx = 0;
    let cy = 0;
    let angle = 0;

    // Create a track with modular blocks
    const trackSequence = this.getTrackSequence(level);

    for (let i = 0; i < trackSequence.length; i++) {
      const seg = trackSequence[i];

      const block: TrackBlock = {
        type: seg.type,
        surface: seg.surface,
        x: cx,
        y: cy,
        width: blockWidth,
        height: blockHeight,
        angle: angle,
        checkpointIndex: seg.checkpoint,
      };

      this.blocks.push(block);

      if (seg.type === BlockType.StartLine) {
        this.startBlock = block;
      }
      if (seg.type === BlockType.FinishLine) {
        this.finishBlock = block;
      }
      if (seg.checkpoint !== undefined) {
        this.checkpoints.push(this.checkpoints.length);
      }

      // Advance position
      const advance = seg.advance || 0;
      cx += Math.cos(angle) * advance;
      cy += Math.sin(angle) * advance;
      angle += seg.turn || 0;
    }
  }

  private getTrackSequence(level: number) {
    // Different tracks based on level
    if (level === 1) {
      return this.track1();
    } else if (level === 2) {
      return this.track2();
    } else {
      return this.track3();
    }
  }

  private track1() {
    return [
      { type: BlockType.StartLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 300, turn: 0, checkpoint: 0 },
      { type: BlockType.CurveRight, surface: SurfaceType.Dirt, advance: 200, turn: 0.4, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Dirt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.RampUp, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Jump, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: 1 },
      { type: BlockType.Straight, surface: SurfaceType.Ice, advance: 300, turn: 0, checkpoint: undefined },
      { type: BlockType.CurveLeft, surface: SurfaceType.Ice, advance: 250, turn: -0.5, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Grass, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: 2 },
      { type: BlockType.CurveRight, surface: SurfaceType.Plastic, advance: 200, turn: 0.3, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.EngineOff, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.FinishLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
    ];
  }

  private track2() {
    return [
      { type: BlockType.StartLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Dirt, advance: 250, turn: 0, checkpoint: 0 },
      { type: BlockType.CurveLeft, surface: SurfaceType.Dirt, advance: 200, turn: -0.4, checkpoint: undefined },
      { type: BlockType.RampUp, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Loop, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Jump, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: 1 },
      { type: BlockType.Straight, surface: SurfaceType.Ice, advance: 300, turn: 0, checkpoint: undefined },
      { type: BlockType.CurveRight, surface: SurfaceType.Ice, advance: 250, turn: 0.5, checkpoint: undefined },
      { type: BlockType.Fragile, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: 2 },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.WallRide, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Grass, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.CurveLeft, surface: SurfaceType.Grass, advance: 200, turn: -0.3, checkpoint: undefined },
      { type: BlockType.FinishLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
    ];
  }

  private track3() {
    return [
      { type: BlockType.StartLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Dirt, advance: 250, turn: 0, checkpoint: 0 },
      { type: BlockType.CurveRight, surface: SurfaceType.Dirt, advance: 200, turn: 0.5, checkpoint: undefined },
      { type: BlockType.NoSteering, surface: SurfaceType.Ice, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Ice, advance: 250, turn: 0, checkpoint: 1 },
      { type: BlockType.CurveLeft, surface: SurfaceType.Ice, advance: 200, turn: -0.4, checkpoint: undefined },
      { type: BlockType.RampUp, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Loop, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.WallRide, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: 2 },
      { type: BlockType.Booster, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Plastic, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.EngineOff, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Fragile, surface: SurfaceType.Asphalt, advance: 200, turn: 0, checkpoint: 3 },
      { type: BlockType.NoBrakes, surface: SurfaceType.Ice, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.Jump, surface: SurfaceType.Asphalt, advance: 250, turn: 0, checkpoint: undefined },
      { type: BlockType.Straight, surface: SurfaceType.Grass, advance: 200, turn: 0, checkpoint: undefined },
      { type: BlockType.CurveRight, surface: SurfaceType.Grass, advance: 200, turn: 0.3, checkpoint: undefined },
      { type: BlockType.FinishLine, surface: SurfaceType.Asphalt, advance: 0, turn: 0, checkpoint: undefined },
    ];
  }

  getStartPosition(): { x: number; y: number } {
    if (this.startBlock) {
      return { x: this.startBlock.x, y: this.startBlock.y };
    }
    return { x: 0, y: 0 };
  }

  getBlockAt(x: number, y: number): TrackBlock | null {
    for (const block of this.blocks) {
      if (this.isPointInBlock(x, y, block)) {
        return block;
      }
    }
    return null;
  }

  private isPointInBlock(x: number, y: number, block: TrackBlock): boolean {
    const dx = x - block.x;
    const dy = y - block.y;
    const cos = Math.cos(-block.angle);
    const sin = Math.sin(-block.angle);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;
    const hw = block.width / 2;
    const hh = block.height / 2;
    return localX >= -hw && localX <= hw && localY >= -hh && localY <= hh;
  }

  getMedalForTime(time: number): string {
    if (time <= this.medalThresholds.author) return 'author';
    if (time <= this.medalThresholds.gold) return 'gold';
    if (time <= this.medalThresholds.silver) return 'silver';
    if (time <= this.medalThresholds.bronze) return 'bronze';
    return 'none';
  }

  getMedalEmoji(medal: string): string {
    switch (medal) {
      case 'author': return '🏆';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '❌';
    }
  }

  getMedalColor(medal: string): string {
    switch (medal) {
      case 'author': return '#ff0';
      case 'gold': return '#ffd700';
      case 'silver': return '#c0c0c0';
      case 'bronze': return '#cd7f32';
      default: return '#888';
    }
  }
}