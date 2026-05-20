/**
 * Game — Main game class. Manages the game loop, rendering, and all subsystems.
 */

import * as THREE from 'three';
import { InputManager } from '../input/InputManager';
import { AudioManager } from '../audio/AudioManager';
import { VehiclePhysics } from '../physics/VehiclePhysics';
import { Car3D } from '../car/Car3D';
import { Track } from '../track/Track';
import { createSampleTrack, SAMPLE_MEDAL_TIMES } from '../track/SampleTrack';
import { GhostSystem } from '../ghost/GhostSystem';
import { HUD, getMedal, MedalTimes } from '../ui/HUD';
import { SurfaceType } from '../physics/Surfaces';

type GameState = 'menu' | 'countdown' | 'racing' | 'finished';

export class Game {
  // Three.js
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;

  // Systems
  private input: InputManager;
  private audio: AudioManager;
  private physics: VehiclePhysics;
  private car: Car3D;
  private track: Track;
  private ghost: GhostSystem;
  private hud: HUD;

  // Game state
  private state: GameState = 'menu';
  private raceTime = 0;
  private checkpointsPassed = 0;
  private totalCheckpoints = 0;
  private medalTimes: MedalTimes = SAMPLE_MEDAL_TIMES;
  private bestTime: number | null = null;

  // Countdown
  private countdownTimer = 0;
  private countdownValue = 3;

  // Camera
  private cameraOffset = new THREE.Vector3(0, 5, 12);
  private cameraLookAhead = new THREE.Vector3(0, 2, 15);
  private smoothCameraPos = new THREE.Vector3();
  private smoothCameraTarget = new THREE.Vector3();

  // Pad tracking (prevent re-triggering)
  private triggeredPads = new Set<string>();

  constructor() {
    // Three.js setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    this.scene.fog = new THREE.Fog(0x87CEEB, 80, 250);

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 500);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('game-container')!.prepend(this.renderer.domElement);

    this.clock = new THREE.Clock();

    // Systems
    this.input = new InputManager();
    this.audio = new AudioManager();
    this.physics = new VehiclePhysics();
    this.car = new Car3D();
    this.track = createSampleTrack();
    this.ghost = new GhostSystem();
    this.hud = new HUD();

    // Lighting
    this.setupLighting();

    // Skybox / environment
    this.setupEnvironment();

    // Add track to scene
    this.scene.add(this.track.getMesh());
    this.scene.add(this.track.getCheckpoints());
    this.scene.add(this.car.getGroup());
    this.scene.add(this.ghost.getGroup());

    // Count checkpoints
    this.totalCheckpoints = this.track.countCheckpoints();

    // Position car at start
    this.resetCarPosition();

    // Initialize camera position
    this.smoothCameraPos.copy(this.car.getGroup().position).add(this.cameraOffset);
    this.smoothCameraTarget.copy(this.car.getGroup().position);

    // Event listeners
    window.addEventListener('resize', () => this.onResize());
    this.setupUI();

    // Load best time from localStorage
    const saved = localStorage.getItem('flashmania_best_time');
    if (saved) this.bestTime = parseFloat(saved);
  }

  private setupLighting(): void {
    // Ambient
    const ambient = new THREE.AmbientLight(0x6688aa, 0.6);
    this.scene.add(ambient);

    // Hemisphere
    const hemi = new THREE.HemisphereLight(0x88bbff, 0x445522, 0.5);
    this.scene.add(hemi);

    // Directional (sun)
    const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
    sun.position.set(50, 80, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -80;
    sun.shadow.camera.right = 80;
    sun.shadow.camera.top = 80;
    sun.shadow.camera.bottom = -80;
    this.scene.add(sun);
  }

  private setupEnvironment(): void {
    // Ground plane (far below track)
    const groundGeo = new THREE.PlaneGeometry(1000, 1000);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x225522 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -20;
    this.scene.add(ground);

    // Some decorative clouds
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
    for (let i = 0; i < 20; i++) {
      const cloudGeo = new THREE.SphereGeometry(5 + Math.random() * 10, 8, 6);
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 400,
        40 + Math.random() * 30,
        (Math.random() - 0.5) * 400,
      );
      cloud.scale.set(1 + Math.random(), 0.4 + Math.random() * 0.3, 1 + Math.random());
      this.scene.add(cloud);
    }
  }

  private setupUI(): void {
    const startBtn = document.getElementById('btn-start')!;
    const restartBtn = document.getElementById('btn-restart')!;

    startBtn.addEventListener('click', () => {
      this.audio.init();
      this.audio.resume();
      this.startCountdown();
    });

    restartBtn.addEventListener('click', () => {
      this.audio.init();
      this.audio.resume();
      this.restartRace();
    });

    // R key to restart
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR') {
        this.restartRace();
      }
    });
  }

  private resetCarPosition(): void {
    const startInfo = this.track.getStartInfo();
    const startDir = startInfo.direction;
    const yaw = Math.atan2(startDir.x, startDir.z);

    this.physics.setTransform(
      startInfo.position.x,
      startInfo.position.y + 0.5,
      startInfo.position.z,
      yaw,
    );
  }

  private startCountdown(): void {
    this.state = 'countdown';
    this.countdownValue = 3;
    this.countdownTimer = 0;
    this.raceTime = 0;
    this.checkpointsPassed = 0;
    this.triggeredPads.clear();

    this.hud.hideMenu();
    this.hud.clear();
    this.resetCarPosition();

    // Show ghost if available
    if (this.ghost.hasRecording()) {
      this.ghost.show();
    } else {
      this.ghost.hide();
    }

    // Start recording
    this.ghost.startRecording();

    this.audio.playBeep(false);
    this.hud.showCountdown('3');
  }

  private restartRace(): void {
    this.ghost.stopRecording();
    this.startCountdown();
  }

  private startRace(): void {
    this.state = 'racing';
    this.hud.hideCountdown();
    this.audio.startEngine();
    this.audio.startSurfaceNoise();
    this.audio.playGo();
  }

  private finishRace(): void {
    this.state = 'finished';
    this.ghost.stopRecording();
    this.audio.stopEngine();
    this.audio.stopSurfaceNoise();
    this.audio.playFinish();

    // Save best time
    if (!this.bestTime || this.raceTime < this.bestTime) {
      this.bestTime = this.raceTime;
      localStorage.setItem('flashmania_best_time', this.raceTime.toString());
    }

    // Show medal
    const medal = getMedal(this.raceTime, this.medalTimes);
    this.hud.showMedal(medal, this.raceTime, this.medalTimes);

    // Show ghost for next attempt
    if (this.ghost.hasRecording()) {
      this.ghost.show();
    }
  }

  private updateCountdown(dt: number): void {
    this.countdownTimer += dt;

    if (this.countdownTimer >= 1) {
      this.countdownTimer -= 1;
      this.countdownValue--;

      if (this.countdownValue > 0) {
        this.hud.showCountdown(String(this.countdownValue));
        this.audio.playBeep(false);
      } else if (this.countdownValue === 0) {
        this.hud.showCountdown('GO!');
        this.audio.playGo();
        setTimeout(() => this.startRace(), 500);
      }
    }
  }

  private updatePhysics(dt: number): void {
    const input = this.input.update();
    const state = this.physics.getState();

    // Query ground
    const ground = this.track.queryGround(state.x, state.z);
    const groundY = ground?.y ?? null;
    const groundNormal = ground?.normal ?? null;
    const groundSurface = ground?.surface ?? null;

    // Update physics
    this.physics.update(dt, input, groundY, groundNormal, groundSurface);

    // Check for special pads
    this.checkSpecialPads(state);

    // Check checkpoints
    if (this.track.queryCheckpoint(state.x, state.z)) {
      const cpKey = `${Math.round(state.x / 10)},${Math.round(state.z / 10)}`;
      if (!this.triggeredPads.has(cpKey)) {
        this.triggeredPads.add(cpKey);
        this.checkpointsPassed++;
        this.audio.playCheckpoint();
        this.hud.updateCheckpoints(this.checkpointsPassed, this.totalCheckpoints);
      }
    }

    // Check finish
    if (this.track.queryFinish(state.x, state.z)) {
      this.finishRace();
    }

    // Check if car fell off the map
    if (state.y < -30) {
      this.resetCarPosition();
      this.audio.playCrash();
    }
  }

  private checkSpecialPads(state: ReturnType<VehiclePhysics['getState']>): void {
    const pad = this.track.querySpecialPad(state.x, state.y, state.z);
    if (!pad) return;

    const padKey = `${pad}_${Math.round(state.x)}_${Math.round(state.z)}`;
    if (this.triggeredPads.has(padKey)) return;
    this.triggeredPads.add(padKey);

    switch (pad) {
      case 'booster':
        this.physics.applyBoost();
        this.audio.playBoost();
        this.hud.updateStatus('⚡ BOOST!');
        setTimeout(() => this.hud.updateStatus(''), 1000);
        break;
      case 'engine_off':
        this.physics.applyEngineOff();
        this.hud.updateStatus('⚠ ENGINE OFF');
        setTimeout(() => this.hud.updateStatus(''), 3000);
        break;
      case 'fragile':
        this.physics.applyFragile();
        this.hud.updateStatus('💔 FRAGILE');
        setTimeout(() => this.hud.updateStatus(''), 2000);
        break;
      case 'no_steering':
        this.physics.applyNoSteering();
        this.hud.updateStatus('🔒 NO STEERING');
        setTimeout(() => this.hud.updateStatus(''), 2000);
        break;
      case 'no_brakes':
        this.physics.applyNoBrakes();
        this.hud.updateStatus('🔒 NO BRAKES');
        setTimeout(() => this.hud.updateStatus(''), 2000);
        break;
    }
  }

  private updateCamera(dt: number): void {
    const state = this.physics.getState();
    const carPos = this.car.getGroup().position;

    // Calculate ideal camera position behind car
    const fwdX = Math.sin(state.yaw);
    const fwdZ = Math.cos(state.yaw);

    const idealPos = new THREE.Vector3(
      carPos.x - fwdX * this.cameraOffset.z,
      carPos.y + this.cameraOffset.y,
      carPos.z - fwdZ * this.cameraOffset.z,
    );

    const idealTarget = new THREE.Vector3(
      carPos.x + fwdX * this.cameraLookAhead.z,
      carPos.y + this.cameraLookAhead.y,
      carPos.z + fwdZ * this.cameraLookAhead.z,
    );

    // Smooth interpolation
    const lerpFactor = 1 - Math.pow(0.01, dt || 0.016);
    this.smoothCameraPos.lerp(idealPos, lerpFactor * 3);
    this.smoothCameraTarget.lerp(idealTarget, lerpFactor * 5);

    this.camera.position.copy(this.smoothCameraPos);
    this.camera.lookAt(this.smoothCameraTarget);
  }

  private updateHUD(dt: number): void {
    const state = this.physics.getState();

    if (this.state === 'racing') {
      this.raceTime += dt;
    }

    this.hud.updateTimer(this.raceTime);
    this.hud.updateSpeed(this.physics.getSpeedKmh());
    this.hud.updateSurface(state.surface);

    // Update status with active effects
    let status = '';
    if (state.engineOff) status += '⚠ ENGINE OFF ';
    if (state.fragile) status += '💔 FRAGILE ';
    if (state.noSteering) status += '🔒 NO STEER ';
    if (state.noBrakes) status += '🔒 NO BRAKE ';
    if (state.boostTimer > 0) status += '⚡ BOOST ';
    if (state.crashed) status += '💥 CRASHED!';
    if (state.wet) status += '💧 WET ';
    this.hud.updateStatus(status);
  }

  private updateAudio(): void {
    const state = this.physics.getState();
    this.audio.updateEngine(state.rpm, state.speed);
    this.audio.updateSurface(state.surface, state.speed);
  }

  private updateGhost(): void {
    const state = this.physics.getState();

    if (this.state === 'racing') {
      this.ghost.recordFrame(
        state.x, state.y, state.z,
        state.yaw, state.pitch, state.roll,
      );
    }

    // Update ghost replay
    if (this.state === 'racing' && this.ghost.hasRecording()) {
      this.ghost.update(this.raceTime);
    }
  }

  private updateMinimap(): void {
    const state = this.physics.getState();
    const trackPoints = this.track.getPoints().map(p => ({
      x: p.position.x,
      z: p.position.z,
    }));

    const ghostState = this.ghost.hasRecording()
      ? { x: this.ghost.getGroup().position.x, z: this.ghost.getGroup().position.z }
      : null;

    this.hud.drawMinimap(
      trackPoints,
      state.x, state.z, state.yaw,
      ghostState?.x ?? null,
      ghostState?.z ?? null,
    );
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Public API
  start(): void {
    this.hud.showMenu();
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.05);

    // Update based on state
    if (this.state === 'countdown') {
      this.updateCountdown(dt);
    } else if (this.state === 'racing') {
      this.updatePhysics(dt);
    }

    // Always update visuals
    const state = this.physics.getState();
    this.car.update(state);
    this.updateCamera(dt);
    this.updateHUD(dt);

    if (this.state === 'racing') {
      this.updateAudio();
      this.updateGhost();
      this.updateMinimap();
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }
}