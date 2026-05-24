import * as THREE from 'three';
import { Engine } from './Engine';
import { Car } from '../car/Car';
import { Track } from '../track/Track';
import { GameState, MedalType } from '../types/GameState';

export interface GhostFrame {
  t: number;
  pos: [number, number, number];
  rot: [number, number, number];
}

export class GameManager {
  private engine: Engine;
  private car: Car | null = null;
  private track: Track | null = null;
  private state: GameState = GameState.READY;

  // Timing
  private raceTimer: number = 0;
  private bestTime: number = Infinity;

  // Ghost recording
  private ghostFrames: GhostFrame[] = [];
  private lastGhostRecordTime = 0;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public getEngine(): Engine { return this.engine; }
  public getCar(): Car | null { return this.car; }
  public getTrack(): Track | null { return this.track; }
  public getState(): GameState { return this.state; }
  public getRaceTimer(): number { return this.raceTimer; }
  public getBestTime(): number { return this.bestTime === Infinity ? 0 : this.bestTime; }

  loadTrack(track: Track): void {
    this.track = track;
    this.car = new Car(this.engine, track);
    this.engine.getScene().add(this.car.getModel());

    // Add track to scene
    const trackMeshes = track.build();
    for (const mesh of trackMeshes) {
      this.engine.getScene().add(mesh);
    }
  }

  startRace(): void {
    if (!this.car || !this.track) return;
    this.state = GameState.RACING;
    this.raceTimer = 0;
    this.ghostFrames = [];
    this.lastGhostRecordTime = 0;
    this.track.startCheckpoints();
    this.engine.getAudio().init();
    this.engine.getAudio().resume();
    this.engine.getAudio().startEngine();
    this.engine.getAudio().startWind();
  }

  pauseRace(): void {
    if (this.state === GameState.RACING) {
      this.state = GameState.PAUSED;
    } else if (this.state === GameState.PAUSED) {
      this.state = GameState.RACING;
    }
  }

  resetRace(): void {
    if (!this.car || !this.track) return;
    this.state = GameState.READY;
    this.raceTimer = 0;
    this.ghostFrames = [];
    this.car.reset();
    this.engine.getAudio().stopEngine();
  }

  completeRace(): void {
    if (this.state !== GameState.RACING) return;
    const finishTime = this.raceTimer;
    this.state = GameState.FINISHED;
    this.engine.getAudio().playFinish();
    this.engine.getAudio().stopEngine();

    if (finishTime < this.bestTime) {
      this.bestTime = finishTime;
    }

    console.log(`Race finished! Time: ${finishTime.toFixed(3)}s`);
  }

  getMedal(): MedalType | null {
    if (this.state !== GameState.FINISHED || !this.track) return null;
    const t = this.raceTimer;
    if (t <= this.track.authorTime) return MedalType.AUTHOR;
    if (t <= this.track.goldTime) return MedalType.GOLD;
    if (t <= this.track.silverTime) return MedalType.SILVER;
    if (t <= this.track.bronzeTime) return MedalType.BRONZE;
    return null;
  }

  private recordGhostFrame(): void {
    if (!this.car || this.state !== GameState.RACING) return;
    const pos = this.car.getPosition();
    const rot = this.car.getRotation();
    this.ghostFrames.push({
      t: this.raceTimer,
      pos: [pos.x, pos.y, pos.z],
      rot: [rot.x, rot.y, rot.z],
    });
  }

  getGhostData(): GhostFrame[] {
    return this.ghostFrames;
  }

  update(deltaTime: number): void {
    if (!this.car) return;

    // Update car physics
    this.car.update(deltaTime);

    // Update timer and audio
    if (this.state === GameState.RACING && this.track && this.car) {
      this.raceTimer += deltaTime;

      // Engine pitch
      const speedRatio = Math.min(this.car.getSpeed() / 40, 1);
      this.engine.getAudio().updateEngine(speedRatio);
      this.engine.getAudio().updateWind(speedRatio);

      // Record ghost at ~10 Hz
      if (this.raceTimer - this.lastGhostRecordTime > 0.1) {
        this.recordGhostFrame();
        this.lastGhostRecordTime = this.raceTimer;
      }

      // Surface audio update
      if (this.track) {
        const surface = this.track.getSurfaceAt(this.car.getPosition());
        this.engine.getAudio().setSurface(surface);
      }

      // Check checkpoints — find next unpassed checkpoint
      const cpIdx = this.track.getNextCheckpointIndex();
      if (cpIdx !== null && cpIdx < this.track.getCheckpointCount()) {
        const cpPos = this.track.getCheckpointPosition(cpIdx);
        if (cpPos) {
          const dist = this.car.getPosition().distanceTo(cpPos);
          if (dist < 6) {
            this.engine.getAudio().playCheckpoint();
            // If this was the last checkpoint (finish), complete race
            if (cpIdx === this.track.getCheckpointCount() - 1) {
              this.completeRace();
            } else {
              this.track.advanceCheckpoint();
            }
          }
        }
      }
    }

    // Update camera to follow car
    this.updateCamera();
  }

  private updateCamera(): void {
    if (!this.car || !this.engine) return;

    const carPos = this.car.getPosition();
    const camDist = 14;
    const camHeight = 7;

    // Calculate camera offset behind the car based on its facing direction
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(this.car.getModel().quaternion);

    const targetPos = carPos.clone()
      .addScaledVector(forward, -camDist)
      .add(new THREE.Vector3(0, camHeight, 0));

    // Smooth camera follow
    this.engine.getCamera().position.lerp(targetPos, 0.12);
    this.engine.getCamera().lookAt(carPos.clone().add(new THREE.Vector3(0, 1.5, 0)));
  }
}
