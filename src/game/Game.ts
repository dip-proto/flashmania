import * as THREE from 'three';
import { CarPhysics, CarState, BlockEffect, SurfaceType } from '../engine/Physics.js';
import { Vec3 } from '../engine/Vector.js';
import { InputManager } from '../engine/Input.js';
import { AudioSystem } from '../engine/Audio.js';
import { CarMesh, CarGhostMesh } from './CarMesh.js';
import { CameraController } from './Camera.js';
import { GameState, GameStateManager, MedalTier } from './GameState.js';
import { GhostSystem } from './GhostSystem.js';
import { UIManager } from './UIManager.js';
import { TrackMeshBuilder, querySurface } from '../track/TrackBuilder.js';
import { TrackDefinition } from '../track/types.js';
import { createDemoTrack, createBeginnerTrack, createIceMountainTrack } from '../track/tracks.js';

/** Main game controller - ties all systems together */
export class Game {
  // Three.js
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Systems
  private input: InputManager;
  private audio: AudioSystem;
  private physics: CarPhysics;
  private carMesh: CarMesh | null = null;
  private ghostMesh: CarGhostMesh | null = null;
  private cameraController: CameraController;
  private gameState: GameStateManager;
  private ghostSystem: GhostSystem;
  private ui: UIManager;
  private trackBuilder: TrackMeshBuilder;

  // Track data
  private currentTrack: TrackDefinition | null = null;
  private collisionBoxes: { min: Vec3; max: Vec3; surface: SurfaceType; effect: BlockEffect }[] = [];
  private availableTracks: TrackDefinition[] = [];

  // Flag effects
  private activeEffects: Set<BlockEffect> = new Set();
  private lastCheckpointIndex = -1;
  private wasOnFinish = false;

  // Timing
  private lastTime = 0;
  private isRunning = false;

  constructor() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    document.body.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 500);

    // Camera
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 1000);

    // Input
    this.input = new InputManager();

    // Audio
    this.audio = new AudioSystem();

    // Physics
    this.physics = new CarPhysics();

    // Camera controller
    this.cameraController = new CameraController(this.camera);

    // Game state
    this.gameState = new GameStateManager();

    // Ghost system
    this.ghostSystem = new GhostSystem();

    // Track builder
    this.trackBuilder = new TrackMeshBuilder();

    // UI
    this.ui = new UIManager(document.getElementById('ui-overlay')!, this.audio);

    // Setup tracks
    this.availableTracks = [createBeginnerTrack(), createDemoTrack(), createIceMountainTrack()];

    // Setup scene lighting
    this.setupLighting();

    // Setup events
    this.setupEvents();

    // UI track selection
    this.ui.onTrackSelect((trackIndex: number) => {
      this.startTrack(trackIndex);
    });

    // Start
    this.gameState.state = GameState.Menu;
  }

  private setupLighting(): void {
    // Ambient
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    this.scene.add(ambient);

    // Sun
    const sun = new THREE.DirectionalLight(0xFFFFDD, 1.5);
    sun.position.set(100, 200, 100);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -200;
    sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 200;
    sun.shadow.camera.bottom = -200;
    this.scene.add(sun);

    // Hemisphere light (sky + ground)
    const hemiLight = new THREE.HemisphereLight(0x6688CC, 0x445522, 0.4);
    this.scene.add(hemiLight);
  }

  private setupEvents(): void {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        if (this.gameState.state === GameState.Menu) {
          // Resume if we were racing
          if (this.lastState === GameState.Racing || this.lastState === GameState.Countdown) {
            this.gameState.state = this.lastState;
          }
        } else if (this.gameState.state === GameState.Racing || this.gameState.state === GameState.Countdown) {
          this.lastState = this.gameState.state;
          this.gameState.state = GameState.Menu;
        } else if (this.gameState.state === GameState.Finished) {
          this.gameState.state = GameState.Menu;
        }
      }

      // C to cycle camera
      if (e.code === 'KeyC') {
        this.cameraController.cycleMode();
      }
    });

    // Click to initialize audio context
    window.addEventListener('click', () => {
      this.audio.init();
    }, { once: true });

    window.addEventListener('keydown', () => {
      this.audio.init();
    }, { once: true });
  }

  private lastState = GameState.Menu;

  /** Load and start a track */
  private startTrack(trackIndex: number): void {
    // Clean up previous track
    this.clearScene();

    this.currentTrack = this.availableTracks[trackIndex];
    this.gameState.medalTimes = {
      bronze: this.currentTrack.medals.bronze,
      silver: this.currentTrack.medals.silver,
      gold: this.currentTrack.medals.gold,
      author: this.currentTrack.medals.author,
    };

    // Build track geometry
    const trackMeshGroup = this.trackBuilder.build(this.currentTrack);
    this.scene.add(trackMeshGroup);
    this.collisionBoxes = this.trackBuilder.getCollisionBoxes();

    // Add ground plane
    const groundGeo = new THREE.PlaneGeometry(1000, 1000);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1a3a1a,
      roughness: 1.0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Add skybox hints - distant mountains
    this.addSkybox();

    // Create car
    this.carMesh = new CarMesh(this.scene);
    this.physics.reset(
      this.currentTrack.startPositions[0],
      this.currentTrack.startRotations[0] * Math.PI / 180
    );

    // Create ghost mesh
    this.ghostMesh = this.carMesh.createGhost();

    // Total checkpoints (excluding start/finish gates)
    this.gameState.totalCheckpoints = this.currentTrack.blocks.filter(
      b => b.isCheckpoint && b.effect !== BlockEffect.Finish && b.effect !== BlockEffect.Start
    ).length;
    this.gameState.nextCheckpoint = 0;

    // Hide ghost until we have a recording
    if (this.ghostMesh) {
      this.ghostMesh.setVisible(false);
    }

    // Start countdown
    this.gameState.reset();
    this.gameState.startCountdown();

    // Camera reset
    this.cameraController.resetToCar(this.physics.state);

    // Show track name
    if (document.querySelector('.fm-track-name')) {
      const el = document.querySelector('.fm-track-name') as HTMLElement;
      el.textContent = this.currentTrack.name;
    }

    this.isRunning = true;
  }

  private addSkybox(): void {
    // Simple sky sphere
    const skyGeo = new THREE.SphereGeometry(400, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a3e,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const r = 380;
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi) + 50;
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1.5 });
    const stars = new THREE.Points(starGeo, starMat);
    this.scene.add(stars);
  }

  private clearScene(): void {
    // Remove all objects except lights
    const toRemove: THREE.Object3D[] = [];
    this.scene.traverse((child) => {
      if (child !== this.scene && !(child instanceof THREE.Light)) {
        toRemove.push(child);
      }
    });
    for (const obj of toRemove) {
      this.scene.remove(obj);
    }

    if (this.carMesh) {
      this.carMesh.dispose();
      this.carMesh = null;
    }
    if (this.ghostMesh) {
      this.ghostMesh.dispose();
      this.ghostMesh = null;
    }
  }

  /** Main game loop */
  run(): void {
    this.lastTime = performance.now();
    const loop = (time: number) => {
      requestAnimationFrame(loop);

      const dt = Math.min((time - this.lastTime) / 1000, 0.05); // Cap at 50ms
      this.lastTime = time;

      this.input.update();
      this.update(dt);
      this.render();

      // UI update
      this.ui.update(this.gameState);
    };

    requestAnimationFrame(loop);
  }

  private update(dt: number): void {
    const gs = this.gameState;
    const ps = this.physics.state;

    // Handle restart
    if (this.input.restartJustPressed && this.currentTrack) {
      if (gs.state === GameState.Racing || gs.state === GameState.Finished || gs.state === GameState.Countdown) {
        // Save ghost if we finished
        if (gs.state === GameState.Finished) {
          this.ghostSystem.stopRecording(gs.raceTime);
        } else {
          this.ghostSystem.cancelRecording();
        }
        this.startTrack(this.availableTracks.indexOf(this.currentTrack));
        return;
      }
    }

    switch (gs.state) {
      case GameState.Menu:
        // Camera slowly rotates
        this.camera.position.set(
          Math.sin(performance.now() * 0.0001) * 20,
          10,
          Math.cos(performance.now() * 0.0001) * 20
        );
        this.camera.lookAt(0, 0, 0);
        break;

      case GameState.Countdown: {
        const started = gs.updateCountdown(dt);
        if (started) {
          // Countdown finished, start racing
          this.ghostSystem.startRecording(performance.now());
          this.audio.init();
        }
        if (this.carMesh) {
          this.carMesh.update(ps, dt);
        }
        this.cameraController.update(ps, dt, gs.state);
        break;
      }

      case GameState.Racing:
        this.updateRacing(dt);
        break;

      case GameState.Finished:
        // Car still visible but game paused
        if (this.carMesh) {
          this.carMesh.update(ps, dt);
        }
        this.cameraController.update(ps, dt, gs.state);
        // Update ghost
        this.updateGhost(gs.raceTime);
        break;
    }
  }

  private updateRacing(dt: number): void {
    const gs = this.gameState;
    const ps = this.physics.state;

    // Update race timer
    gs.raceTime += dt;
    gs.currentSpeedKmh = this.physics.getSpeedKmh();
    gs.maxSpeed = Math.max(gs.maxSpeed, gs.currentSpeedKmh);

    // Compute steering input
    let steerInput = 0;
    if (this.input.steerLeft) steerInput += 1;
    if (this.input.steerRight) steerInput -= 1;

    // Detect surface and effect under the car
    const surfaceInfo = querySurface(ps.position, this.collisionBoxes);
    gs.currentSurface = surfaceInfo.surface;
    gs.currentEffect = surfaceInfo.effect;

    // Track block effects - checkpoint detection
    if (surfaceInfo.effect === BlockEffect.Checkpoint || surfaceInfo.effect === BlockEffect.Finish) {
      if (surfaceInfo.effect === BlockEffect.Checkpoint) {
        // Find which checkpoint this is
        const track = this.currentTrack!;
        const cpBlocks = track.blocks.filter(b => b.isCheckpoint && b.effect !== BlockEffect.Finish && b.effect !== BlockEffect.Start);
        const cpBlock = cpBlocks.find(b => {
          const halfX = b.scale.x * 0.5 + 2;
          const halfZ = b.scale.z * 0.5 + 2;
          return ps.position.x >= b.position.x - halfX &&
                 ps.position.x <= b.position.x + halfX &&
                 ps.position.z >= b.position.z - halfZ &&
                 ps.position.z <= b.position.z + halfZ;
        });
        if (cpBlock && cpBlock.checkpointIndex !== undefined) {
          if (gs.checkCheckpoint(cpBlock.checkpointIndex)) {
            this.audio.playCheckpoint();
            this.ui.showEffectPopup('✓ CHECKPOINT', '#44FF44');
          }
        }
      }

      if (surfaceInfo.effect === BlockEffect.Finish) {
        // Finish only if all checkpoints passed
        const checkpointCount = this.currentTrack!.blocks.filter(
          b => b.isCheckpoint && b.effect !== BlockEffect.Finish && b.effect !== BlockEffect.Start
        ).length;
        if (!this.wasOnFinish && gs.nextCheckpoint >= checkpointCount) {
          this.wasOnFinish = true;
          const medal = gs.finish();
          this.audio.playFinish();
          this.ghostSystem.stopRecording(gs.raceTime);
          const medalDisplay = GameStateManager.getMedalDisplay(medal);
          this.ui.showEffectPopup(medalDisplay.name, medalDisplay.color);
        }
      }
    } else {
      this.wasOnFinish = false;
    }

    // Track current active effect for display
    this.activeEffects.clear();
    if (ps.isBoosting) this.activeEffects.add(BlockEffect.Booster);
    if (ps.isEngineOff) this.activeEffects.add(BlockEffect.EngineOff);
    if (ps.isFragile) this.activeEffects.add(BlockEffect.Fragile);
    if (ps.isNoSteer) this.activeEffects.add(BlockEffect.NoSteer);
    if (ps.isNoBrake) this.activeEffects.add(BlockEffect.NoBrake);

    // Display the most important active effect
    if (ps.isBoosting) gs.currentEffect = BlockEffect.Booster;
    else if (ps.isEngineOff) gs.currentEffect = BlockEffect.EngineOff;
    else if (ps.isFragile) gs.currentEffect = BlockEffect.Fragile;
    else if (ps.isNoSteer) gs.currentEffect = BlockEffect.NoSteer;
    else if (ps.isNoBrake) gs.currentEffect = BlockEffect.NoBrake;

    // Play boost sound on new boost
    if (ps.isBoosting && ps.boostTimer > dt * 0.8) {
      this.audio.playBoost();
    }

    // Update physics
    this.physics.update(dt, {
      accelerate: this.input.accelerate,
      brake: this.input.brake,
      steerInput,
    }, (pos: Vec3) => querySurface(pos, this.collisionBoxes));

    // Ground snap - keep car on top of track blocks
    this.snapToGround();

    // Update car mesh
    if (this.carMesh) {
      this.carMesh.update(ps, dt);
    }

    // Update camera
    this.cameraController.update(ps, dt, GameState.Racing);

    // Update audio
    this.audio.updateEngine(Math.abs(ps.speed) / (this.physics.config.maxSpeed / 3.6), ps.isAccelerating);
    const surfaceIntensity = ps.isDrifting ? 0.8 : Math.min(Math.abs(ps.speed) / 30, 0.5);
    this.audio.setSurfaceNoise(ps.currentSurface, surfaceIntensity);

    // Record ghost
    this.ghostSystem.recordFrame(
      performance.now(),
      ps.position,
      ps.rotation,
      ps.speed
    );

    // Show ghost
    this.updateGhost(gs.raceTime / 1); // ghost runs at same speed as player
  }

  /** Snap car to the ground (top of nearest track block below) */
  private snapToGround(): void {
    const pos = this.physics.state.position;
    const s = this.physics.state;
    
    // Find highest block surface below the car
    let bestY = -Infinity;
    let bestNormalY = 1;

    for (const box of this.collisionBoxes) {
      // Check if car is within XZ footprint of the block (with small tolerance)
      const tol = 0.5;
      if (pos.x >= box.min.x - tol && pos.x <= box.max.x + tol &&
          pos.z >= box.min.z - tol && pos.z <= box.max.z + tol) {
        // This block is below or at our level
        const blockTop = box.max.y;
        if (blockTop <= pos.y + 0.8 && blockTop > bestY) {
          bestY = blockTop;
        }
      }
    }

    // Default ground level
    if (bestY === -Infinity) bestY = 0;

    // The ground height is the top of the block + car half-height (0.6)
    const groundLevel = bestY + 0.6;

    // Detect if we're airborne
    const wasAirborne = s.isAirborne;
    s.isAirborne = pos.y > groundLevel + 0.3 && s.velocity.y > -0.5;

    // Ground collision - snap down if we're falling through or just above
    if (pos.y <= groundLevel) {
      if (s.velocity.y < 0) {
        // Hard landing detection
        if (s.velocity.y < -15) {
          // Very hard landing - could damage car in future
        }
        s.velocity.y = 0;
      }
      pos.y = groundLevel;
      s.isAirborne = false;
    }

    // Don't go below absolute ground
    if (pos.y < 0.6) {
      pos.y = 0.6;
      if (s.velocity.y < 0) s.velocity.y = 0;
      s.isAirborne = false;
    }

    // Out of bounds detection - if car falls too far below track or too far away
    if (pos.y < -10 || Math.abs(pos.x) > 500 || Math.abs(pos.z) > 500) {
      // Reset to start position
      const startPos = this.currentTrack!.startPositions[0];
      const startYaw = this.currentTrack!.startRotations[0] * Math.PI / 180;
      this.physics.reset(startPos, startYaw);
      this.wasOnFinish = false;
    }
  }

  /** Update ghost car position */
  private updateGhost(elapsedTime: number): void {
    if (!this.ghostMesh || !this.ghostSystem.hasGhost()) return;
    const ghostPos = this.ghostSystem.getPlaybackPosition(elapsedTime);
    if (ghostPos) {
      this.ghostMesh.update(ghostPos.position, ghostPos.rotation);
      this.ghostMesh.setVisible(true);
    }
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  destroy(): void {
    this.input.destroy();
    this.audio.destroy();
    this.renderer.dispose();
  }
}