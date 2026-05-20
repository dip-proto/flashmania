import { VehicleState, createInitialVehicle, updateVehicle, VehicleInput } from './vehicle';
import { Track, TrackBlock, BlockEffect } from './track';
import { SurfaceType, SURFACE_PROPERTIES } from './surfaces';
import { Renderer } from './renderer';
import { Controls } from './controls';
import { GhostRecorder, GhostSnapshot } from './ghost';
import { buildSampleTrack } from './track';
import { AudioSystem } from './audio';

export type Medal = 'none' | 'bronze' | 'silver' | 'gold' | 'author';

export interface GameState {
  phase: 'running' | 'finished' | 'waiting';
  elapsed: number;
  medal: Medal;
  bestLap: number;
  checkpointTimes: number[];
  crossedFinish: boolean;
}

export class Game {
  private vehicle: VehicleState;
  private track: Track;
  private renderer: Renderer;
  private controls: Controls;
  private ghostRecorder: GhostRecorder;
  private ghosts: GhostSnapshot[] = [];
  private state: GameState;
  private running: boolean = false;
  private lastTime: number = 0;
  private lastCheckpointId: number = 0;
  private audio: AudioSystem;
  private prevCheckpointHit: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.track = buildSampleTrack();
    this.vehicle = createInitialVehicle(this.track.start.x, this.track.start.y);
    this.controls = new Controls();
    this.ghostRecorder = new GhostRecorder();
    this.state = this.freshState();
    this.audio = new AudioSystem();
  }

  private freshState(): GameState {
    return {
      phase: 'waiting',
      elapsed: 0,
      medal: 'none',
      bestLap: 0,
      checkpointTimes: [],
      crossedFinish: false,
    };
  }

  start() {
    this.state = this.freshState();
    this.state.phase = 'running';
    this.vehicle = createInitialVehicle(this.track.start.x, this.track.start.y);
    this.lastCheckpointId = 0;
    this.ghostRecorder.reset();
    this.ghosts = [];
    this.lastTime = performance.now();
    this.running = true;
    this.prevCheckpointHit = false;
    this.audio.start();
    this.loop();
  }

  restart() {
    this.start();
  }

  private loop() {
    if (!this.running) return;

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    if (this.state.phase === 'running') {
      this.update(dt);
    }
    this.render();

    requestAnimationFrame(() => this.loop());
  }

  private update(dt: number) {
    if (this.controls.consumeRestart()) {
      this.restart();
      return;
    }
    const input = this.controls.getInput();
    this.vehicle = updateVehicle(this.vehicle, input, dt);
    this.handleTrackCollisions(dt);
    this.checkCheckpoints();
    this.ghostRecorder.record(this.vehicle, dt);
    this.state.elapsed += dt;

    // Audio update
    this.audio.update(
      this.vehicle.speed,
      this.vehicle.onSurface,
      this.vehicle.drifting,
      this.vehicle.airborne,
    );
  }

  private handleTrackCollisions(dt: number) {
    const v = this.vehicle;
    const blocks = this.track.blocks;

    let onBlock: TrackBlock | null = null;
    for (const block of blocks) {
      if (
        v.pos.x >= block.x &&
        v.pos.x <= block.x + block.width &&
        v.pos.y >= block.y &&
        v.pos.y <= block.y + block.height
      ) {
        onBlock = block;
        break;
      }
    }

    if (onBlock) {
      this.vehicle.onSurface = onBlock.surface;

      if (this.vehicle.airborne) {
        this.vehicle.airborne = false;
        this.vehicle.groundedTimer = 0;
      }
      this.vehicle.groundedTimer += dt;

      switch (onBlock.effect) {
        case BlockEffect.Booster: {
          const fwd = { x: Math.cos(this.vehicle.angle), y: Math.sin(this.vehicle.angle) };
          this.vehicle.vel.x += fwd.x * 10;
          this.vehicle.vel.y += fwd.y * 10;
          break;
        }
        case BlockEffect.EngineOff:
          this.vehicle.engineOn = false;
          break;
        case BlockEffect.Fragile:
          this.vehicle.fragile = true;
          break;
        case BlockEffect.NoSteering:
          this.vehicle.noSteering = true;
          break;
        case BlockEffect.NoBrakes:
          this.vehicle.noBrakes = true;
          break;
      }

      if (onBlock.surface === SurfaceType.Plastic) {
        this.vehicle.wetTires = true;
        this.vehicle.wetTimer = 2.0;
      }

      if (onBlock.ramp && this.vehicle.groundedTimer > 0.1) {
        const speed = Math.sqrt(this.vehicle.vel.x ** 2 + this.vehicle.vel.y ** 2);
        if (speed > 5) {
          this.vehicle.airborne = true;
          this.vehicle.vel.y -= speed * 0.6;
          this.vehicle.vel.x *= 1.2;
        }
      }
    } else {
      this.vehicle.airborne = true;
      this.vehicle.noSteering = false;
      this.vehicle.noBrakes = false;
    }

    if (onBlock && onBlock.effect !== BlockEffect.EngineOff) {
      this.vehicle.engineOn = true;
    }

    // Fragile wall collision
    if (this.vehicle.fragile) {
      for (const block of blocks) {
        const margin = 4;
        const nearLeft = Math.abs(v.pos.x - block.x) < margin;
        const nearRight = Math.abs(v.pos.x - (block.x + block.width)) < margin;
        const nearTop = Math.abs(v.pos.y - block.y) < margin;
        const nearBottom = Math.abs(v.pos.y - (block.y + block.height)) < margin;

        if ((nearLeft || nearRight) && v.pos.y >= block.y && v.pos.y <= block.y + block.height) {
          this.vehicle.angle += (Math.random() - 0.5) * 0.5;
          if (nearLeft) this.vehicle.vel.x = Math.abs(this.vehicle.vel.x) * 0.3;
          if (nearRight) this.vehicle.vel.x = -Math.abs(this.vehicle.vel.x) * 0.3;
        }
        if ((nearTop || nearBottom) && v.pos.x >= block.x && v.pos.x <= block.x + block.width) {
          this.vehicle.angle += (Math.random() - 0.5) * 0.5;
          if (nearTop) this.vehicle.vel.y = Math.abs(this.vehicle.vel.y) * 0.3;
          if (nearBottom) this.vehicle.vel.y = -Math.abs(this.vehicle.vel.y) * 0.3;
        }
      }
    }
  }

  private checkCheckpoints() {
    const blocks = this.track.blocks;
    let hitCheckpoint = false;
    for (const block of blocks) {
      if (!block.isCheckpoint && !block.isFinish) continue;

      const v = this.vehicle;
      const onCheckpoint =
        v.pos.x >= block.x &&
        v.pos.x <= block.x + block.width &&
        v.pos.y >= block.y &&
        v.pos.y <= block.y + block.height;

      if (onCheckpoint) {
        if (block.isFinish && !this.state.crossedFinish) {
          this.state.crossedFinish = true;
          this.audio.playFinish();
          this.finishRun();
          return;
        }
        if (block.isCheckpoint && block.checkpointId !== undefined) {
          if (block.checkpointId === this.lastCheckpointId + 1) {
            this.lastCheckpointId = block.checkpointId;
            this.state.checkpointTimes.push(this.state.elapsed);
            hitCheckpoint = true;
          }
        }
      }
    }
    if (hitCheckpoint && !this.prevCheckpointHit) {
      this.audio.playCheckpoint();
    }
    this.prevCheckpointHit = hitCheckpoint;
  }

  private finishRun() {
    this.state.phase = 'finished';
    this.ghosts = this.ghostRecorder.getSnapshots();
    this.state.bestLap = this.state.elapsed;

    const t = this.state.bestLap;
    if (t <= this.track.authorMedal) this.state.medal = 'author';
    else if (t <= this.track.goldMedal) this.state.medal = 'gold';
    else if (t <= this.track.silverMedal) this.state.medal = 'silver';
    else if (t <= this.track.bronzeMedal) this.state.medal = 'bronze';
    else this.state.medal = 'none';
  }

  private render() {
    this.renderer.render(this.vehicle, this.track, this.ghosts, this.state);
  }
}
