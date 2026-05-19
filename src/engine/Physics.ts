import { Vec3, Quat, clamp, lerp } from './Vector.js';

/** Surface types with distinct physical properties */
export enum SurfaceType {
  Asphalt = 'asphalt',
  Dirt = 'dirt',
  Ice = 'ice',
  Grass = 'grass',
  Plastic = 'plastic',
  None = 'none',
}

/** Special block effects */
export enum BlockEffect {
  None = 'none',
  Booster = 'booster',
  EngineOff = 'engine_off',
  Fragile = 'fragile',
  NoSteer = 'no_steer',
  NoBrake = 'no_brake',
  Start = 'start',
  Finish = 'finish',
  Checkpoint = 'checkpoint',
}

/** Surface physics properties */
export const SURFACE_PROPS: Record<SurfaceType, {
  grip: number;      // 0-1 friction multiplier
  drag: number;      // Speed damping
  rollingResist: number;  // Rolling resistance
  color: number;     // Hex color for mesh
}> = {
  [SurfaceType.Asphalt]: { grip: 0.95, drag: 0.002, rollingResist: 0.01, color: 0x444444 },
  [SurfaceType.Dirt]:    { grip: 0.55, drag: 0.008, rollingResist: 0.03, color: 0x8B6914 },
  [SurfaceType.Ice]:    { grip: 0.08, drag: 0.001, rollingResist: 0.002, color: 0xAADDFF },
  [SurfaceType.Grass]:  { grip: 0.75, drag: 0.012, rollingResist: 0.05, color: 0x2D7A2D },
  [SurfaceType.Plastic]:{ grip: 0.35, drag: 0.005, rollingResist: 0.02, color: 0xFF66CC },
  [SurfaceType.None]:   { grip: 0.0,  drag: 0.0,   rollingResist: 0.0, color: 0x000000 },
};

/** Car configuration */
export interface CarConfig {
  maxSpeed: number;        // km/h -> converted internally
  acceleration: number;    // m/s²
  brakeForce: number;      // m/s²
  steeringSpeed: number;   // rad/s at low speed
  steeringSpeedHigh: number; // rad/s at high speed
  mass: number;            // kg
  downforceCoeff: number;  // Aero downforce
  bodyLength: number;
  bodyWidth: number;
  bodyHeight: number;
}

export const DEFAULT_CAR_CONFIG: CarConfig = {
  maxSpeed: 300,       // km/h
  acceleration: 30,    // m/s²
  brakeForce: 45,      // m/s²
  steeringSpeed: 4.0,
  steeringSpeedHigh: 2.0,
  mass: 1200,
  downforceCoeff: 0.3,
  bodyLength: 4.2,
  bodyWidth: 2.0,
  bodyHeight: 1.2,
};

/** Car physics state */
export class CarState {
  position = new Vec3(0, 1, 0);
  velocity = new Vec3(0, 0, 0);
  rotation = Quat.IDENTITY.clone();
  yaw = 0;          // Heading angle (radians)
  pitch = 0;        // Nose up/down
  roll = 0;         // Side tilt
  steeringAngle = 0; // Current steering input (-1 to 1)
  speed = 0;        // Forward speed m/s
  isAirborne = false;
  isDrifting = false;
  currentSurface = SurfaceType.Asphalt;
  currentEffect = BlockEffect.None;
  isBoosting = false;
  boostTimer = 0;
  isEngineOff = false;
  engineOffTimer = 0;
  isFragile = false;
  fragileTimer = 0;
  isNoSteer = false;
  noSteerTimer = 0;
  isNoBrake = false;
  noBrakeTimer = 0;
  wetTiresTimer = 0;  // Seconds of reduced grip from wet surfaces
  isAccelerating = false;
  isBraking = false;
  /** Direction the car faces (forward vector) */
  forward = new Vec3(0, 0, -1);
  /** Right vector of car */
  right = new Vec3(1, 0, 0);
  /** Up vector of car */
  up = new Vec3(0, 1, 0);
  /** Total distance along checkpoints */
  checkpointProgress = 0;
  /** Track surface normal under wheels */
  surfaceNormal = new Vec3(0, 1, 0);
  /** If fragile and hit wall */
  isBroken = false;
  brokenSteerOffset = 0;
}

/** The car physics simulation */
export class CarPhysics {
  config: CarConfig;
  state: CarState;
  private gravity = -20; // m/s² (slightly higher than real for faster gameplay)

  constructor(config: CarConfig = DEFAULT_CAR_CONFIG) {
    this.config = config;
    this.state = new CarState();
  }

  /** Reset car to starting position */
  reset(position: Vec3, yaw: number = 0): void {
    this.state.position = position.clone();
    this.state.velocity = Vec3.ZERO.clone();
    this.state.yaw = yaw;
    this.state.pitch = 0;
    this.state.roll = 0;
    this.state.steeringAngle = 0;
    this.state.speed = 0;
    this.state.isAirborne = false;
    this.state.isDrifting = false;
    this.state.isBoosting = false;
    this.state.boostTimer = 0;
    this.state.isEngineOff = false;
    this.state.engineOffTimer = 0;
    this.state.isFragile = false;
    this.state.fragileTimer = 0;
    this.state.isNoSteer = false;
    this.state.noSteerTimer = 0;
    this.state.isNoBrake = false;
    this.state.noBrakeTimer = 0;
    this.state.wetTiresTimer = 0;
    this.state.isBroken = false;
    this.state.brokenSteerOffset = 0;
    this.state.checkpointProgress = 0;
    this.state.currentSurface = SurfaceType.Asphalt;
    this.state.currentEffect = BlockEffect.None;
    this.state.surfaceNormal = new Vec3(0, 1, 0);
    this.updateDerivedVectors();
  }

  /** Update car frame vectors from yaw/pitch/roll */
  private updateDerivedVectors(): void {
    this.state.rotation = Quat.fromEulerYXZ(this.state.yaw, this.state.pitch, this.state.roll);
    this.state.forward = this.state.rotation.rotateVector(new Vec3(0, 0, -1));
    this.state.right = this.state.rotation.rotateVector(new Vec3(1, 0, 0));
    this.state.up = this.state.rotation.rotateVector(new Vec3(0, 1, 0));
  }

  /**
   * Main physics step
   * @param dt Delta time in seconds
   * @param input Steering/accel/brake inputs (-1 to 1 or 0/1)
   * @param getSurfaceInfo Function returning surface type and effect at a world position
   */
  update(
    dt: number,
    input: { accelerate: boolean; brake: boolean; steerInput: number },
    getSurfaceInfo: (pos: Vec3) => { surface: SurfaceType; effect: BlockEffect }
  ): void {
    const s = this.state;
    const cfg = this.config;

    // Get surface info under the car
    const info = getSurfaceInfo(s.position);
    s.currentSurface = s.isAirborne ? SurfaceType.None : info.surface;
    s.currentEffect = info.effect;

    // Process block effects
    this.processBlockEffects(dt, info.effect);

    // Effective input considering block effects
    let effectiveSteer = input.steerInput;
    let effectiveAccel = input.accelerate;
    let effectiveBrake = input.brake;

    if (s.isNoSteer) effectiveSteer = 0;
    if (s.isNoBrake) effectiveBrake = false;
    if (s.isEngineOff) effectiveAccel = false;

    // Fragile broken steering
    if (s.isBroken) {
      effectiveSteer += s.brokenSteerOffset;
    }

    // Update derived direction vectors
    this.updateDerivedVectors();

    // Forward speed (projection of velocity onto forward direction)
    s.speed = s.velocity.dot(s.forward);

    // Steer the car
    const speedFactor = Math.abs(s.speed) / (cfg.maxSpeed / 3.6);
    const steerRate = lerp(cfg.steeringSpeed, cfg.steeringSpeedHigh, clamp(speedFactor, 0, 1));
    const targetSteerAngle = effectiveSteer;
    s.steeringAngle = lerp(s.steeringAngle, targetSteerAngle, clamp(6 * dt, 0, 1));

    // Apply steering as yaw change
    if (Math.abs(s.speed) > 0.5) {
      const steerDir = s.speed >= 0 ? 1 : -1;
      s.yaw += s.steeringAngle * steerRate * steerDir * dt;
    }

    this.updateDerivedVectors();

    // Surface physics
    const surfaceObj = SURFACE_PROPS[s.currentSurface] || SURFACE_PROPS[SurfaceType.Asphalt];
    let grip = surfaceObj.grip;
    let drag = surfaceObj.drag;
    let rollingResist = surfaceObj.rollingResist;

    // Wet tires reduce grip
    if (s.wetTiresTimer > 0) {
      grip *= 0.4;
      s.wetTiresTimer -= dt;
    }
    if (s.currentSurface === SurfaceType.Plastic) {
      s.wetTiresTimer = 2.0; // Wet for 2 seconds after leaving plastic
    }

    // Acceleration
    if (effectiveAccel) {
      if (!s.isAirborne || s.speed > 5) {
        const accelForce = s.isBoosting ? cfg.acceleration * 2.5 : cfg.acceleration;
        // Reduce acceleration when airborne
        const accelMult = s.isAirborne ? 0.3 : 1.0;
        s.velocity.addScaledInPlace(s.forward, accelForce * accelMult * dt);
      }
      s.isAccelerating = true;
    } else {
      s.isAccelerating = false;
    }

    // Braking
    if (effectiveBrake) {
      s.isBraking = true;
      if (s.isAirborne) {
        // Air control: nose dive - pitch the car forward
        s.pitch -= 2.5 * dt;
      } else {
        const brakeForce = Math.abs(s.speed) > 1 ? cfg.brakeForce : cfg.brakeForce * Math.abs(s.speed);
        const brakeDir = s.speed >= 0 ? -1 : 1;
        s.velocity.addScaledInPlace(s.forward, brakeForce * brakeDir * dt);
      }
    } else {
      s.isBraking = false;
    }

    // Grip-based lateral friction (this creates drift behavior)
    if (!s.isAirborne) {
      const lateralVel = s.velocity.dot(s.right);
      const lateralFriction = grip * 14.0;
      const lateralDamping = clamp(lateralFriction * dt, 0, 1);
      const newLateralVel = lateralVel * (1 - lateralDamping);
      s.velocity.addScaledInPlace(s.right, newLateralVel - lateralVel);

      s.isDrifting = Math.abs(lateralVel) > 1.5;
    }

    // Gravity
    const gravForce = new Vec3(0, this.gravity * dt, 0);
    s.velocity.addInPlace(gravForce);

    // Air drag
    const speedVal = s.velocity.length();
    if (speedVal > 0.001) {
      const dragForce = drag * speedVal * dt;
      const dragVec = s.velocity.normalize().multiplyScalar(-dragForce);
      s.velocity.addInPlace(dragVec);
    }

    // Rolling resistance (only on ground)
    if (!s.isAirborne && Math.abs(s.speed) > 0.1) {
      const resistForce = rollingResist * s.speed * dt;
      s.velocity.addScaledInPlace(s.forward, -resistForce);
    }

    // Engine braking when not accelerating on ground
    if (!effectiveAccel && !s.isAirborne && Math.abs(s.speed) > 0.5) {
      const engineBrake = 3.0 * dt;
      s.velocity.addScaledInPlace(s.forward, -Math.sign(s.speed) * engineBrake);
    }

    // Speed cap
    const maxSpeedMs = cfg.maxSpeed / 3.6;
    if (s.velocity.length() > maxSpeedMs) {
      s.velocity.normalizeInPlace().scaleInPlace(maxSpeedMs);
    }

    // Integrate position
    s.position.addScaledInPlace(s.velocity, dt);

    // Airborne detection (set false by default - Game class handles ground snap)
    // This just gets set to true if we're notably above expected ground
    if (s.velocity.y > 1.0) {
      s.isAirborne = true;
    }

    // Air control - stable pitch/roll recovery
    if (s.isAirborne) {
      // Gently return pitch and roll toward 0 (air stability)
      s.pitch *= (1 - 3.0 * dt);
      s.roll *= (1 - 4.0 * dt);
    } else {
      // On ground, quickly align to surface
      s.pitch *= (1 - 10.0 * dt);
      s.roll *= (1 - 10.0 * dt);
    }

    // Update progress
    s.speed = s.velocity.dot(s.forward);
    this.updateDerivedVectors();
  }

  private processBlockEffects(dt: number, effect: BlockEffect): void {
    const s = this.state;
    // Decrease all timers
    if (s.boostTimer > 0) { s.boostTimer -= dt; if (s.boostTimer <= 0) s.isBoosting = false; }
    if (s.engineOffTimer > 0) { s.engineOffTimer -= dt; if (s.engineOffTimer <= 0) s.isEngineOff = false; }
    if (s.fragileTimer > 0) { s.fragileTimer -= dt; if (s.fragileTimer <= 0) { s.isFragile = false; s.isBroken = false; s.brokenSteerOffset = 0; } }
    if (s.noSteerTimer > 0) { s.noSteerTimer -= dt; if (s.noSteerTimer <= 0) s.isNoSteer = false; }
    if (s.noBrakeTimer > 0) { s.noBrakeTimer -= dt; if (s.noBrakeTimer <= 0) s.isNoBrake = false; }

    // Apply new effects
    if (effect === BlockEffect.Booster) {
      s.isBoosting = true;
      s.boostTimer = 0.4;
      s.velocity.addScaledInPlace(s.forward, 30); // Instant speed boost
    }
    if (effect === BlockEffect.EngineOff) {
      s.isEngineOff = true;
      s.engineOffTimer = 3.0;
    }
    if (effect === BlockEffect.Fragile) {
      s.isFragile = true;
      s.fragileTimer = 5.0;
    }
    if (effect === BlockEffect.NoSteer) {
      s.isNoSteer = true;
      s.noSteerTimer = 1.0;
    }
    if (effect === BlockEffect.NoBrake) {
      s.isNoBrake = true;
      s.noBrakeTimer = 1.0;
    }

    // Wall collision check for fragile
    if (s.isFragile && !s.isBroken) {
      // Check lateral velocity change (hitting wall)
      const lateralVel = s.velocity.dot(s.right);
      if (Math.abs(lateralVel) > 5) {
        s.isBroken = true;
        s.brokenSteerOffset = (Math.random() - 0.5) * 0.5;
      }
    }
  }

  /** Get current speed in km/h */
  getSpeedKmh(): number {
    return Math.abs(this.state.speed) * 3.6;
  }
}