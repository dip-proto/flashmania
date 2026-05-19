import { SurfaceType, BlockEffect } from '../engine/Physics.js';

/** Medal tier */
export type MedalTier = 'none' | 'bronze' | 'silver' | 'gold' | 'author';

/** Current game state */
export enum GameState {
  Menu = 'menu',
  Countdown = 'countdown',
  Racing = 'racing',
  Finished = 'finished',
  Paused = 'paused',
}

/** Tracks progress through checkpoints */
export class GameStateManager {
  state: GameState = GameState.Menu;
  raceTime = 0;
  bestTime: number | null = null;
  checkpointTimes: number[] = [];
  nextCheckpoint = 0;
  totalCheckpoints = 0;
  lapCount = 0;

  // Medal times (in seconds)
  medalTimes = { bronze: 60, silver: 45, gold: 35, author: 30 };

  // Countdown
  countdownValue = 3;
  countdownTimer = 0;

  // Current surface/effect display
  currentSurface: SurfaceType = SurfaceType.Asphalt;
  currentEffect: BlockEffect = BlockEffect.None;

  // Race stats
  maxSpeed = 0;
   currentSpeedKmh = 0;

  /** Reset for a new race */
  reset(): void {
    this.raceTime = 0;
    this.checkpointTimes = [];
    this.nextCheckpoint = 0;
    this.lapCount = 0;
    this.maxSpeed = 0;
    this.currentSpeedKmh = 0;
    this.currentSurface = SurfaceType.Asphalt;
    this.currentEffect = BlockEffect.None;
  }

  /** Start the countdown */
  startCountdown(): void {
    this.state = GameState.Countdown;
    this.countdownValue = 3;
    this.countdownTimer = 0;
  }

  /** Update countdown, returns true when countdown finishes */
  updateCountdown(dt: number): boolean {
    this.countdownTimer += dt;
    if (this.countdownTimer >= 1) {
      this.countdownValue--;
      this.countdownTimer = 0;
      if (this.countdownValue < 0) {
        this.state = GameState.Racing;
        return true;
      }
    }
    return false;
  }

  /** Check a checkpoint */
  checkCheckpoint(checkpointIndex: number): boolean {
    if (checkpointIndex === this.nextCheckpoint) {
      this.checkpointTimes.push(this.raceTime);
      this.nextCheckpoint++;
      return true;
    }
    return false;
  }

  /** Finish the race */
  finish(): MedalTier {
    this.state = GameState.Finished;
    if (this.bestTime === null || this.raceTime < this.bestTime) {
      this.bestTime = this.raceTime;
    }
    return this.getMedal(this.raceTime);
  }

  /** Get medal for a given time */
  getMedal(time: number): MedalTier {
    if (time <= this.medalTimes.author) return 'author';
    if (time <= this.medalTimes.gold) return 'gold';
    if (time <= this.medalTimes.silver) return 'silver';
    if (time <= this.medalTimes.bronze) return 'bronze';
    return 'none';
  }

  /** Format time as M:SS.mmm */
  static formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const wholeSecs = Math.floor(secs);
    const millis = Math.floor((secs - wholeSecs) * 1000);
    return `${mins}:${wholeSecs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
  }

  /** Get medal display name and color */
  static getMedalDisplay(medal: MedalTier): { name: string; color: string } {
    switch (medal) {
      case 'author': return { name: '★ AUTHOR ★', color: '#FFD700' };
      case 'gold': return { name: '🥇 GOLD', color: '#FFD700' };
      case 'silver': return { name: '🥈 SILVER', color: '#C0C0C0' };
      case 'bronze': return { name: '🥉 BRONZE', color: '#CD7F32' };
      default: return { name: '', color: '#FFFFFF' };
    }
  }
}