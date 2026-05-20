/**
 * VehiclePhysics — Car physics simulation.
 * Implements acceleration, braking, steering, drifting, gravity, air control,
 * and surface-dependent behavior.
 */

import { SurfaceType, SURFACES } from './Surfaces';
import { InputState } from '../input/InputManager';

export interface VehicleState {
  // Position
  x: number; y: number; z: number;
  // Orientation (yaw, pitch, roll in radians)
  yaw: number; pitch: number; roll: number;
  // Velocity
  vx: number; vy: number; vz: number;
  // Angular velocity
  angularVel: number;
  // Derived
  speed: number;
  rpm: number;
  onGround: boolean;
  surface: SurfaceType;
  // Effects
  engineOff: boolean;
  noSteering: boolean;
  noBrakes: boolean;
  fragile: boolean;
  wet: boolean;
  boostTimer: number;
  // Crash
  crashed: boolean;
  crashTimer: number;
}

export class VehiclePhysics {
  // Constants
  private readonly MAX_SPEED = 65;           // m/s (~234 km/h)
  private readonly ACCEL_FORCE = 28;         // m/s² forward
  private readonly BRAKE_FORCE = 35;         // m/s² braking
  private readonly STEER_SPEED = 2.8;        // rad/s
  private readonly DRAG = 0.995;             // air drag per frame
  private readonly GRAVITY = -20;            // m/s²
  private readonly BOUNCE = 0.35;            // bounce coefficient
  private readonly GROUND_FRICTION = 0.97;   // rolling resistance
  private readonly AIR_CONTROL_FORCE = 15;   // air brake rotation force
  private readonly WHEEL_BASE = 1.8;         // distance front to rear
  private readonly DRIFT_THRESHOLD = 0.3;    // lateral velocity threshold for drift

  private state: VehicleState;

  constructor() {
    this.state = this.createDefaultState();
  }

  private createDefaultState(): VehicleState {
    return {
      x: 0, y: 5, z: 0,
      yaw: 0, pitch: 0, roll: 0,
      vx: 0, vy: 0, vz: 0,
      angularVel: 0,
      speed: 0,
      rpm: 0,
      onGround: false,
      surface: 'asphalt',
      engineOff: false,
      noSteering: false,
      noBrakes: false,
      fragile: false,
      wet: false,
      boostTimer: 0,
      crashed: false,
      crashTimer: 0,
    };
  }

  getState(): VehicleState {
    return { ...this.state };
  }

  reset() {
    this.state = this.createDefaultState();
  }

  /**
   * Set initial position and orientation
   */
  setTransform(x: number, y: number, z: number, yaw: number) {
    this.state.x = x;
    this.state.y = y;
    this.state.z = z;
    this.state.yaw = yaw;
    this.state.pitch = 0;
    this.state.roll = 0;
    this.state.vx = 0;
    this.state.vy = 0;
    this.state.vz = 0;
    this.state.angularVel = 0;
  }

  /**
   * Main physics update
   * @param dt Delta time in seconds
   * @param input Current input state
   * @param groundY Height of ground at car position (or null if no ground)
   * @param groundNormal Normal of ground surface (or null)
   * @param groundSurface Surface type at car position
   */
  update(
    dt: number,
    input: InputState,
    groundY: number | null,
    groundNormal: { x: number; y: number; z: number } | null,
    groundSurface: SurfaceType | null,
  ) {
    const s = this.state;

    // Clamp dt to prevent physics explosions
    dt = Math.min(dt, 0.033);

    // Update timers
    if (s.boostTimer > 0) s.boostTimer = Math.max(0, s.boostTimer - dt);
    if (s.crashTimer > 0) {
      s.crashTimer -= dt;
      if (s.crashTimer <= 0) {
        s.crashed = false;
      }
    }

    // Check if on ground
    const carBottom = s.y - 0.5; // car height offset
    s.onGround = groundY !== null && carBottom >= groundY - 0.1 && carBottom <= groundY + 0.3;
    if (groundSurface) s.surface = groundSurface;

    // Calculate forward/right vectors from yaw
    const fwdX = Math.sin(s.yaw);
    const fwdZ = Math.cos(s.yaw);
    const rightX = Math.cos(s.yaw);
    const rightZ = -Math.sin(s.yaw);

    // Velocity in car-local coordinates
    const forwardVel = s.vx * fwdX + s.vz * fwdZ;
    const lateralVel = s.vx * rightX + s.vz * rightZ;

    // Speed
    s.speed = Math.sqrt(s.vx * s.vx + s.vz * s.vz);

    // RPM based on speed
    const maxSpd = this.MAX_SPEED * (SURFACES[s.surface]?.maxSpeedFactor ?? 1);
    s.rpm = Math.min(1, s.speed / maxSpd);

    // Get surface properties
    const surf = SURFACES[s.surface] || SURFACES.asphalt;
    let grip = surf.grip;
    let accelGrip = surf.accelGrip;

    // Wet effect (reduces grip)
    if (s.wet) {
      grip *= 0.5;
      accelGrip *= 0.5;
    }

    // --- CRASHED STATE ---
    if (s.crashed) {
      s.vx *= 0.95;
      s.vz *= 0.95;
      s.angularVel *= 0.9;
      s.yaw += s.angularVel * dt;
      s.x += s.vx * dt;
      s.z += s.vz * dt;
      return;
    }

    // --- AIR PHYSICS ---
    if (!s.onGround) {
      // Gravity
      s.vy += this.GRAVITY * dt;

      // Air control: braking in air rotates car nose down
      if (input.brake) {
        s.pitch -= this.AIR_CONTROL_FORCE * dt * 0.02;
        s.pitch = Math.max(s.pitch, -0.5);
      }

      // Slight drag in air
      s.vx *= Math.pow(this.DRAG, dt * 60);
      s.vz *= Math.pow(this.DRAG, dt * 60);

      // Apply pitch to trajectory
      s.y += s.vy * dt;
      s.x += s.vx * dt;
      s.z += s.vz * dt;

      // Ground collision
      if (groundY !== null && s.y - 0.5 <= groundY) {
        s.y = groundY + 0.5;
        // Bounce
        s.vy = Math.abs(s.vy) * this.BOUNCE;
        if (Math.abs(s.vy) < 1) s.vy = 0;

        // Landing impact
        if (Math.abs(s.vy) > 5) {
          this.triggerCrash();
        }

        // Align to ground normal
        if (groundNormal) {
          const targetPitch = Math.atan2(-groundNormal.x, groundNormal.y);
          s.pitch += (targetPitch - s.pitch) * 0.3;
        }
      }
      return;
    }

    // --- GROUND PHYSICS ---

    // Keep on ground
    if (groundY !== null) {
      s.y = groundY + 0.5;
    }

    // Acceleration
    const accelInput = input.forward - input.backward;
    if (!s.engineOff) {
      if (accelInput > 0 && forwardVel < maxSpd) {
        const accel = this.ACCEL_FORCE * accelInput * accelGrip;
        s.vx += fwdX * accel * dt;
        s.vz += fwdZ * accel * dt;
      } else if (accelInput < 0) {
        // Reverse
        const accel = this.ACCEL_FORCE * 0.4 * accelInput * accelGrip;
        s.vx += fwdX * accel * dt;
        s.vz += fwdZ * accel * dt;
      }
    }

    // Boost
    if (s.boostTimer > 0) {
      const boostAccel = this.ACCEL_FORCE * 2.5;
      s.vx += fwdX * boostAccel * dt;
      s.vz += fwdZ * boostAccel * dt;
    }

    // Braking
    if (input.brake && !s.noBrakes && forwardVel > 0) {
      const brakeForce = this.BRAKE_FORCE * accelGrip;
      const brakeAmount = Math.min(brakeForce * dt, forwardVel);
      s.vx -= fwdX * brakeAmount;
      s.vz -= fwdZ * brakeAmount;
    }

    // Steering
    let steerInput = input.right - input.left;
    if (s.noSteering) steerInput = 0;

    // Speed-dependent steering (more responsive at medium speeds)
    const speedFactor = Math.min(s.speed / 10, 1);
    const highSpeedReduction = s.speed > 30 ? 1 - (s.speed - 30) / 80 : 1;
    const steerAmount = this.STEER_SPEED * steerInput * speedFactor * highSpeedReduction * dt;

    // Drifting: at high lateral velocity, car slides
    const isDrifting = Math.abs(lateralVel) > this.DRIFT_THRESHOLD * s.speed * 0.3 && s.speed > 5;

    if (isDrifting) {
      // Reduced steering in drift, car slides
      s.yaw += steerAmount * 0.6;
      // Lateral friction is low
      const lateralFriction = Math.pow(1 - grip * 0.15, dt * 60);
      const newLateralVel = lateralVel * lateralFriction;
      const lateralDiff = newLateralVel - lateralVel;
      s.vx += rightX * lateralDiff;
      s.vz += rightZ * lateralDiff;
    } else {
      s.yaw += steerAmount;
      // Strong lateral grip
      const lateralFriction = Math.pow(1 - grip * 0.6, dt * 60);
      const newLateralVel = lateralVel * lateralFriction;
      const lateralDiff = newLateralVel - lateralVel;
      s.vx += rightX * lateralDiff;
      s.vz += rightZ * lateralDiff;
    }

    // Rolling resistance
    const resistance = Math.pow(this.GROUND_FRICTION, dt * 60);
    s.vx *= resistance;
    s.vz *= resistance;

    // Air drag
    s.vx *= Math.pow(this.DRAG, dt * 60);
    s.vz *= Math.pow(this.DRAG, dt * 60);

    // Speed cap
    const currentSpeed = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
    if (currentSpeed > maxSpd) {
      const scale = maxSpd / currentSpeed;
      s.vx *= scale;
      s.vz *= scale;
    }

    // Update position
    s.x += s.vx * dt;
    s.z += s.vz * dt;

    // Roll based on lateral velocity (visual tilt)
    const targetRoll = -lateralVel * 0.04;
    s.roll += (targetRoll - s.roll) * 0.1;

    // Pitch from acceleration
    const targetPitch = -accelInput * 0.02;
    s.pitch += (targetPitch - s.pitch) * 0.1;

    // Angular velocity for visual
    s.angularVel = steerInput * speedFactor * 0.5;

    // Wet timer decay
    if (s.wet && s.surface === 'asphalt') {
      s.wet = false; // dries on asphalt
    }
    if (s.surface === 'plastic') {
      s.wet = true;
    }
  }

  /**
   * Trigger crash state (from wall collision or big landing)
   */
  triggerCrash() {
    this.state.crashed = true;
    this.state.crashTimer = 1.5;
    this.state.angularVel = (Math.random() - 0.5) * 5;
  }

  /**
   * Apply boost effect
   */
  applyBoost() {
    this.state.boostTimer = 0.8;
  }

  /**
   * Apply engine off effect
   */
  applyEngineOff(duration: number = 3) {
    this.state.engineOff = true;
    setTimeout(() => {
      this.state.engineOff = false;
    }, duration * 1000);
  }

  /**
   * Apply no steering effect
   */
  applyNoSteering(duration: number = 2) {
    this.state.noSteering = true;
    setTimeout(() => {
      this.state.noSteering = false;
    }, duration * 1000);
  }

  /**
   * Apply no brakes effect
   */
  applyNoBrakes(duration: number = 2) {
    this.state.noBrakes = true;
    setTimeout(() => {
      this.state.noBrakes = false;
    }, duration * 1000);
  }

  /**
   * Apply fragile effect
   */
  applyFragile(duration: number = 5) {
    this.state.fragile = true;
    setTimeout(() => {
      this.state.fragile = false;
    }, duration * 1000);
  }

  /**
   * Check if car hit a wall while fragile
   */
  hitWallWhileFragile() {
    if (this.state.fragile) {
      this.triggerCrash();
      return true;
    }
    return false;
  }

  /**
   * Get speed in km/h for display
   */
  getSpeedKmh(): number {
    return this.state.speed * 3.6;
  }
}