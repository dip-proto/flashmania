import { GameState, TrackBlock, BlockType, CarState, GhostFrame } from './types';
import { Car } from './car';
import { Track } from './track';
import { Renderer } from './renderer';
import { InputManager } from './input';
import { AudioManager } from './audio';
import { GhostManager } from './ghost';

export class Game {
  private car: Car;
  private track: Track;
  private renderer: Renderer;
  private input: InputManager;
  private audio: AudioManager;
  private ghost: GhostManager;
  private state: GameState = GameState.Menu;
  private level: number = 1;
  private elapsedTime: number = 0;
  private raceStarted: boolean = false;
  private lastTime: number = 0;
  private showGhost: boolean = true;
  private ghostFrame: GhostFrame | null = null;
  private currentCheckpoint: number = 0;
  private checkpointTimes: number[] = [];
  private finishTime: number = 0;
  private showCheckpoint: boolean = false;
  private checkpointTimer: number = 0;
  private finishScreenVisible: boolean = false;

  // UI elements
  private timerEl: HTMLElement;
  private speedEl: HTMLElement;
  private surfaceEl: HTMLElement;
  private checkpointEl: HTMLElement;
  private medalEl: HTMLElement;
  private instructionsEl: HTMLElement;
  private finishScreenEl: HTMLElement;
  private ghostToggleEl: HTMLElement;
  private medalEmojiEl: HTMLElement;
  private finalTimeEl: HTMLElement;
  private finalMedalTextEl: HTMLElement;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.input = new InputManager();
    this.audio = new AudioManager();
    this.ghost = new GhostManager();
    this.track = new Track();
    this.car = new Car(0, 0);

    // UI elements
    this.timerEl = document.getElementById('timer')!;
    this.speedEl = document.getElementById('speed')!;
    this.surfaceEl = document.getElementById('surface-label')!;
    this.checkpointEl = document.getElementById('checkpoint')!;
    this.medalEl = document.getElementById('medal-display')!;
    this.instructionsEl = document.getElementById('instructions')!;
    this.finishScreenEl = document.getElementById('finish-screen')!;
    this.ghostToggleEl = document.getElementById('ghost-toggle')!;
    this.medalEmojiEl = document.getElementById('medal-emoji')!;
    this.finalTimeEl = document.getElementById('final-time')!;
    this.finalMedalTextEl = document.getElementById('final-medal-text')!;

    this.init();
  }

  private init() {
    this.track.generateTrack(this.level);
    const startPos = this.track.getStartPosition();
    this.car.reset(startPos.x, startPos.y);
    this.ghost.startRecording();
    this.lastTime = performance.now();
  }

  start() {
    this.state = GameState.Racing;
    this.raceStarted = true;
    this.elapsedTime = 0;
    this.currentCheckpoint = 0;
    this.checkpointTimes = [];
    this.finishTime = 0;
    this.finishScreenVisible = false;

    // Hide instructions
    this.instructionsEl.style.display = 'none';
    this.finishScreenEl.style.display = 'none';

    // Start audio
    this.audio.init();
    this.audio.resume();

    // Start ghost recording
    this.ghost.startRecording();

    // Reset car
    const startPos = this.track.getStartPosition();
    this.car.reset(startPos.x, startPos.y);
    this.lastTime = performance.now();
  }

  restart() {
    this.start();
  }

  update() {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    // Update input state
    this.input.tick();

    // Handle input
    if (this.input.consumeKey('Enter')) {
      if (this.state === GameState.Menu) {
        this.start();
      } else if (this.state === GameState.Finished) {
        this.restart();
      }
    }
    if (this.input.consumeKey('KeyR')) {
      if (this.state === GameState.Racing) {
        this.restart();
      } else if (this.state === GameState.Finished) {
        this.restart();
      }
    }
    if (this.input.consumeKey('KeyG')) {
      this.showGhost = !this.showGhost;
      this.ghostToggleEl.textContent = this.showGhost ? 'Ghost: ON' : 'Ghost: OFF';
    }

    if (this.state === GameState.Racing) {
      this.updateRacing(dt);
    }

    // Update camera
    this.renderer.updateCamera(this.car.state.x, this.car.state.y, dt);

    // Add particle effects
    if (this.state === GameState.Racing) {
      const cs = this.car.state;
      if (cs.driftAngle > 0.15 && !cs.isAirborne) {
        this.renderer.addDriftParticles(cs.x, cs.y, cs.angle, cs.driftAngle, cs.speed);
      }
      if (cs.boostTimer > 0) {
        this.renderer.addBoostParticles(cs.x, cs.y, cs.angle);
      }
    }

    // Render
    this.renderer.render(this.track, this.car.state, this.ghostFrame, dt);
  }

  private updateRacing(dt: number) {
    if (!this.raceStarted) return;

    // Update car physics
    const input = this.input.getState();
    this.car.update(dt, input, this.track.blocks);

    // Update audio
    this.audio.update(this.car.state, dt);

    // Update ghost
    if (this.ghost.isRecordingActive()) {
      this.ghost.recordFrame(this.car.state);
    }

    // Get ghost frame
    this.ghostFrame = this.showGhost ? this.ghost.getGhostFrame() : null;

    // Update timer
    this.elapsedTime += dt;

    // Check checkpoints
    this.checkCheckpoints();

    // Check finish line
    this.checkFinishLine();

    // Update UI
    this.updateUI();

    // Update camera shake for drift
    if (this.car.state.driftAngle > 0.2) {
      this.renderer.setCameraShake(this.car.state.driftAngle * 5);
    }

    // Checkpoint display
    if (this.showCheckpoint) {
      this.checkpointTimer -= dt;
      if (this.checkpointTimer <= 0) {
        this.showCheckpoint = false;
      }
    }
  }

  private checkCheckpoints() {
    const car = this.car.state;
    for (const block of this.track.blocks) {
      if (block.type === BlockType.Checkpoint && block.checkpointIndex !== undefined) {
        if (block.checkpointIndex > this.currentCheckpoint) {
          if (this.isPointInBlock(car.x, car.y, block)) {
            this.currentCheckpoint = block.checkpointIndex;
            this.checkpointTimes.push(this.elapsedTime);
            this.audio.playCheckpoint();
            this.showCheckpoint = true;
            this.checkpointTimer = 1.5;
            this.checkpointEl.textContent = `Checkpoint ${this.currentCheckpoint}`;
            this.checkpointEl.style.opacity = '1';
          }
        }
      }
    }
  }

  private checkFinishLine() {
    const car = this.car.state;
    for (const block of this.track.blocks) {
      if (block.type === BlockType.FinishLine) {
        if (this.isPointInBlock(car.x, car.y, block)) {
          this.finishRace();
          return;
        }
      }
    }
  }

  private finishRace() {
    this.finishTime = this.elapsedTime;
    this.state = GameState.Finished;
    this.finishScreenVisible = true;

    // Stop recording
    this.ghost.stopRecording();
    this.ghost.setBestTime(this.finishTime);

    // Play finish sound
    this.audio.playFinish();

    // Stop audio
    this.audio.stopAll();

    // Calculate medal
    const medal = this.track.getMedalForTime(this.finishTime);

    // Show finish screen
    this.finishScreenEl.style.display = 'block';
    this.medalEmojiEl.textContent = this.track.getMedalEmoji(medal);
    this.finalTimeEl.textContent = `Time: ${this.finishTime.toFixed(2)}s`;
    this.finalMedalTextEl.textContent = `Medal: ${medal.toUpperCase()}`;
    this.finalMedalTextEl.style.color = this.track.getMedalColor(medal);
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

  private updateUI() {
    // Timer
    const timeStr = this.elapsedTime.toFixed(2) + 's';
    this.timerEl.textContent = timeStr;

    // Speed
    const speedKmh = this.car.getSpeedKmh();
    this.speedEl.textContent = `${speedKmh.toFixed(0)} km/h`;

    // Surface
    this.surfaceEl.textContent = this.car.state.surface;

    // Medal display
    if (this.state === GameState.Racing) {
      const medal = this.track.getMedalForTime(this.elapsedTime);
      this.medalEl.textContent = this.track.getMedalEmoji(medal);
      this.medalEl.style.color = this.track.getMedalColor(medal);
    }

    // Ghost toggle
    this.ghostToggleEl.textContent = this.showGhost ? 'Ghost: ON' : 'Ghost: OFF';
  }

  getState(): GameState {
    return this.state;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
  }
}