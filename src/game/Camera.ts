import * as THREE from 'three';
import { Vec3 } from '../engine/Vector.js';
import { CarState } from '../engine/Physics.js';
import { GameState } from './GameState.js';

/** Camera modes */
export enum CameraMode {
  Chase = 'chase',
  Far = 'far',
  Top = 'top',
}

/** Manages the game camera - follows the car with smooth interpolation */
export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private mode: CameraMode = CameraMode.Chase;
  private smoothPosition = new Vec3(0, 5, 10);
  private smoothLookAt = new Vec3(0, 0, 0);

  // Camera configuration per mode
  private configs: Record<CameraMode, { offset: Vec3; lookAhead: number; smoothness: number; fov: number }> = {
    [CameraMode.Chase]: { offset: new Vec3(0, 4, 10), lookAhead: 8, smoothness: 4, fov: 70 },
    [CameraMode.Far]: { offset: new Vec3(0, 8, 18), lookAhead: 12, smoothness: 3, fov: 60 },
    [CameraMode.Top]: { offset: new Vec3(0, 25, 5), lookAhead: 5, smoothness: 5, fov: 50 },
  };

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  /** Update camera position based on car state */
  update(carState: CarState, dt: number, gameState: GameState): void {
    const cfg = this.configs[this.mode];
    const pos = carState.position;
    const forward = carState.forward;

    // Target camera position: behind and above the car
    const targetPos = new Vec3(
      pos.x - forward.x * cfg.offset.z + carState.up.x * cfg.offset.y,
      pos.y - forward.y * cfg.offset.z + carState.up.y * cfg.offset.y,
      pos.z - forward.z * cfg.offset.z + carState.up.z * cfg.offset.y
    );

    // Target look-at: ahead of the car
    const lookAtPos = new Vec3(
      pos.x + forward.x * cfg.lookAhead,
      pos.y + forward.y * cfg.lookAhead + 1,
      pos.z + forward.z * cfg.lookAhead
    );

    // Smooth interpolation
    const t = 1 - Math.exp(-cfg.smoothness * dt);
    this.smoothPosition = this.smoothPosition.lerp(targetPos, t);
    this.smoothLookAt = this.smoothLookAt.lerp(lookAtPos, t);

    // Apply to Three.js camera
    this.camera.position.set(this.smoothPosition.x, this.smoothPosition.y, this.smoothPosition.z);
    this.camera.lookAt(this.smoothLookAt.x, this.smoothLookAt.y, this.smoothLookAt.z);

    // FOV interpolation
    this.camera.fov += (cfg.fov - this.camera.fov) * t;
    this.camera.updateProjectionMatrix();

    // Speed-based FOV boost during racing
    if (gameState === GameState.Racing) {
      const speedBoost = Math.min(carState.speed * 0.5, 15);
      this.camera.fov += speedBoost * t;
      this.camera.updateProjectionMatrix();
    }
  }

  /** Reset camera to car position instantly */
  resetToCar(carState: CarState): void {
    const cfg = this.configs[this.mode];
    const pos = carState.position;
    const forward = carState.forward;

    this.smoothPosition = new Vec3(
      pos.x - forward.x * cfg.offset.z + carState.up.x * cfg.offset.y,
      pos.y - forward.y * cfg.offset.z + carState.up.y * cfg.offset.y,
      pos.z - forward.z * cfg.offset.z + carState.up.z * cfg.offset.y
    );

    this.smoothLookAt = new Vec3(
      pos.x + forward.x * cfg.lookAhead,
      pos.y + forward.y * cfg.lookAhead + 1,
      pos.z + forward.z * cfg.lookAhead
    );
  }

  /** Cycle camera mode */
  cycleMode(): CameraMode {
    const modes = [CameraMode.Chase, CameraMode.Far, CameraMode.Top];
    const idx = modes.indexOf(this.mode);
    this.mode = modes[(idx + 1) % modes.length];
    return this.mode;
  }

  setMode(mode: CameraMode): void {
    this.mode = mode;
  }

  getMode(): CameraMode {
    return this.mode;
  }
}