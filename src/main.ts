// Main game loop and controller

import { CarState, Track, GameState, InputState, Medal, SurfaceType, SpecialEffect } from './types';
import { Physics } from './physics';
import { PHYSICS_CONFIG } from './config';
import { Renderer } from './renderer';
import { AudioSystem } from './audio';
import { InputHandler } from './input';
import { createDemoTrack, getTrackBounds } from './track';

export class Game {
  private physics: Physics;
  private renderer: Renderer;
  private audio: AudioSystem;
  private input: InputHandler;
  private track: Track;
  private car: CarState;
  private gameState: GameState;
  private lastTime: number = 0;
  private animationId: number = 0;

  private uiTimer: HTMLElement;
  private uiSpeed: HTMLElement;
  private uiSurface: HTMLElement;
  private medalDisplay: HTMLElement;
  private checkpointFlash: HTMLElement;

  constructor(canvas: HTMLCanvasElement) {
    this.physics = new Physics(PHYSICS_CONFIG);
    this.renderer = new Renderer(canvas);
    this.audio = new AudioSystem();
    this.input = new InputHandler();

    this.track = createDemoTrack();
    this.car = this.createInitialCarState();
    this.gameState = {
      status: 'menu',
      raceTime: 0,
      checkpointsPassed: 0,
      currentMedal: null
    };

    // UI elements
    this.uiTimer = document.getElementById('timer') as HTMLElement;
    this.uiSpeed = document.getElementById('speed') as HTMLElement;
    this.uiSurface = document.getElementById('surface') as HTMLElement;
    this.medalDisplay = document.getElementById('medal-display') as HTMLElement;
    this.checkpointFlash = document.getElementById('checkpoint-flash') as HTMLElement;

    this.init();
  }

  private async init(): Promise<void> {
    await this.audio.init();

    // Start on first interaction
    const startHandler = async () => {
      await this.audio.resume();
      this.startRace();
      window.removeEventListener('keydown', startHandler);
      window.removeEventListener('click', startHandler);
      window.removeEventListener('gamepadconnected', startHandler);
    };

    window.addEventListener('keydown', startHandler);
    window.addEventListener('click', startHandler);
    window.addEventListener('gamepadconnected', startHandler);

    this.gameLoop(0);
  }

  private createInitialCarState(): CarState {
    return {
      position: { ...this.track.startPosition },
      velocity: { x: 0, y: 0 },
      rotation: this.track.startRotation,
      angularVelocity: 0,
      speed: 0,
      isAirborne: true,
      isDrifting: false,
      steeringAngle: 0,
      engineRPM: 0,
      surface: 'air',
      effects: new Set()
    };
  }

  private startRace(): void {
    this.car = this.createInitialCarState();
    this.gameState = {
      status: 'countdown',
      raceTime: 0,
      checkpointsPassed: 0,
      currentMedal: null
    };

    // Start countdown
    setTimeout(() => {
      this.gameState.status = 'racing';
    }, 1500);
  }

  private restart(): void {
    this.startRace();
  }

  private gameLoop(timestamp: number): void {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(dt: number): void {
    // Handle restart
    if (this.input.consumeRestart()) {
      this.restart();
      return;
    }

    // Toggle mute with M
    // (would need to add to input handler, but for now audio has internal mute)

    if (this.gameState.status !== 'racing') {
      // Update audio even when not racing
      this.audio.updateEngine(this.car);
      return;
    }

    // Get input
    const input = this.input.getState();
    this.input.updateGamepad();

    // Store previous block
    const prevBlock = this.getCurrentBlock();

    // Update physics
    this.physics.update(this.car, input, dt);

    // Check surface and effects from track blocks
    this.updateTrackInteraction();

    // Update race time
    this.gameState.raceTime += dt * 1000;

    // Update medal
    this.updateMedal();

    // Update audio
    this.audio.updateEngine(this.car);
    this.audio.updateSurface(this.car);
    this.audio.updateWind(this.car);

    // Update gamepad haptics
    this.updateCarHaptics(this.car);

    // Check for checkpoint/finish
    this.checkCollisions();
  }

  private updateTrackInteraction(): void {
    const block = this.getCurrentBlock();

    if (block) {
      // Set surface type
      if (block.type === 'surface' && block.surfaceType) {
        this.car.surface = block.surfaceType;
      } else if (block.type === 'booster' || block.type === 'start') {
        this.car.surface = 'asphalt';
      } else {
        this.car.surface = 'air';
      }

      // Handle special effects
      this.car.effects.clear();
      if (block.specialEffect) {
        this.car.effects.add(block.specialEffect);
      }
      if (block.type === 'booster') {
        this.car.effects.add('boosted');
      }
    } else {
      this.car.surface = 'air';
    }

    // Airborne if not on a surface block
    this.car.isAirborne = !block || block.type === 'trigger';

    // Check nearby trigger blocks for no-brakes/no-steering
    for (const b of this.track.blocks) {
      if (b.type === 'trigger' && b.specialEffect) {
        if (this.isCarInBlock(b)) {
          this.car.effects.add(b.specialEffect!);
        }
      }
    }
  }

  private getCurrentBlock(): import('./types').Block | null {
    for (const block of this.track.blocks) {
      if (this.isCarInBlock(block)) {
        return block;
      }
    }
    return null;
  }

  private isCarInBlock(block: import('./types').Block): boolean {
    const { position } = this.car;
    const { center, width, height } = block;
    return (
      position.x >= center.x - width / 2 &&
      position.x <= center.x + width / 2 &&
      position.y >= center.y - height / 2 &&
      position.y <= center.y + height / 2
    );
  }

  private checkCollisions(): void {
    for (const block of this.track.blocks) {
      if (this.isCarInBlock(block)) {
        if (block.type === 'checkpoint' && !this.checkpointsPassed().includes(block.id)) {
          this.passCheckpoint(block.id);
        } else if (block.type === 'finish' && this.gameState.status === 'racing') {
          this.finishRace();
        }
      }
    }
  }

  private checkpointsPassed(): string[] {
    // Track which checkpoints have been passed
    return this.track.checkpoints.slice(0, this.gameState.checkpointsPassed);
  }

  private passCheckpoint(checkpointId: string): void {
    const index = this.track.checkpoints.indexOf(checkpointId);
    if (index === this.gameState.checkpointsPassed) {
      this.gameState.checkpointsPassed++;
      this.audio.playCheckpoint();
      this.showCheckpointFlash();
    }
  }

  private showCheckpointFlash(): void {
    this.checkpointFlash.classList.add('active');
    setTimeout(() => {
      this.checkpointFlash.classList.remove('active');
    }, 200);
  }

  private finishRace(): void {
    this.gameState.status = 'finished';
    this.audio.playFinish();
    this.showMedal();
  }

  private updateMedal(): void {
    const time = this.gameState.raceTime;
    const { bronze, silver, gold, author } = this.track.medalTimes;

    let medal: Medal | null = null;
    if (time <= author) medal = 'author';
    else if (time <= gold) medal = 'gold';
    else if (time <= silver) medal = 'silver';
    else if (time <= bronze) medal = 'bronze';

    this.gameState.currentMedal = medal;
  }

  private showMedal(): void {
    const medalEmojis: Record<Medal, string> = {
      bronze: '🥉',
      silver: '🥈',
      gold: '🥇',
      author: '⭐'
    };

    const medalColors: Record<Medal, string> = {
      bronze: '#cd7f32',
      silver: '#c0c0c0',
      gold: '#ffd700',
      author: '#ff69b4'
    };

    const medal = this.gameState.currentMedal || 'bronze';
    this.medalDisplay.textContent = medalEmojis[medal];
    this.medalDisplay.style.color = medalColors[medal];
    this.medalDisplay.classList.add('show');

    setTimeout(() => {
      this.medalDisplay.classList.remove('show');
    }, 3000);
  }

  private updateCarHaptics(car: CarState): void {
    const gamepads = navigator.getGamepads();
    const gamepad = Array.from(gamepads).find(g => g);

    if (!gamepad || !gamepad.vibrationActuator) return;

    let intensity = 0;
    let duration = 100;

    // Drift creates heavy rumble
    if (car.isDrifting) {
      intensity = 0.8;
      duration = 200;
    }
    // High speed creates medium rumble
    else if (car.speed > 250) {
      intensity = 0.4;
      duration = 150;
    }
    // Boost creates strong pulse
    else if (car.effects.has('boosted')) {
      intensity = 1.0;
      duration = 300;
    }
    // Engine off - light idle
    else if (car.effects.has('engineOff')) {
      intensity = 0.1;
      duration = 100;
    }

    if (intensity > 0) {
      gamepad.vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration,
        strongMagnitude: intensity,
        weakMagnitude: intensity * 0.5
      }).catch(() => {});
    }
  }

  private formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor(ms % 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
  }

  private render(): void {
    this.renderer.clear();
    this.renderer.drawTrack(this.track, this.gameState.checkpointsPassed);
    this.renderer.drawCar(this.car);

    // Update UI
    this.uiTimer.textContent = this.formatTime(this.gameState.raceTime);
    this.uiSpeed.textContent = `${Math.round(this.car.speed)} km/h`;

    const surfaceNames: Record<SurfaceType, string> = {
      asphalt: 'Road',
      dirt: 'Dirt',
      ice: 'Ice',
      grass: 'Grass',
      plastic: 'Plastic',
      air: 'Air'
    };
    this.uiSurface.textContent = surfaceNames[this.car.surface] || 'Air';

    // Show countdown
    if (this.gameState.status === 'countdown') {
      this.renderer.drawCountdown(1500);
    }

    // Show finish message
    if (this.gameState.status === 'finished') {
      this.renderer.drawFinishMessage(this.gameState.raceTime, this.gameState.currentMedal);
    }
  }
}

// Start the game
const canvas = document.getElementById('game') as HTMLCanvasElement;
new Game(canvas);