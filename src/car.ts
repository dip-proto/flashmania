import { CarState, InputState, SurfaceType, SURFACE_PHYSICS, TrackBlock, BlockType } from './types';

export class Car {
  state: CarState;
  private maxSpeed = 420;
  private accel = 300;
  private brakeForce = 500;
  private turnSpeed = 3.5;
  private driftTurnBoost = 1.8;
  private airControl = 2.5;
  private gravity = 600;
  private jumpForce = 450;
  private width = 18;
  private height = 10;
  private boostMultiplier = 2.5;
  private boostDuration = 0.8;

  constructor(x: number, y: number) {
    this.state = {
      x, y,
      angle: 0,
      speed: 0,
      angularVelocity: 0,
      driftAngle: 0,
      isAirborne: false,
      airTime: 0,
      engineOff: false,
      fragile: false,
      brokenSteering: false,
      noSteering: false,
      noBrakes: false,
      boostTimer: 0,
      surface: SurfaceType.Asphalt,
      checkpointIndex: 0,
    };
  }

  reset(x: number, y: number) {
    this.state = {
      x, y,
      angle: 0,
      speed: 0,
      angularVelocity: 0,
      driftAngle: 0,
      isAirborne: false,
      airTime: 0,
      engineOff: false,
      fragile: false,
      brokenSteering: false,
      noSteering: false,
      noBrakes: false,
      boostTimer: 0,
      surface: SurfaceType.Asphalt,
      checkpointIndex: 0,
    };
  }

  update(dt: number, input: InputState, blocks: TrackBlock[]) {
    const s = this.state;
    const surf = SURFACE_PHYSICS[s.surface];

    // Determine what block the car is on
    const block = this.getBlockUnderCar(blocks);
    if (block) {
      s.surface = block.surface;
      this.applyBlockEffects(block);
    }

    // Check airborne (from ramp or jump)
    if (s.isAirborne) {
      s.airTime += dt;
      // Air control
      if (input.steerLeft && !s.noSteering && !s.brokenSteering) {
        s.angle -= this.airControl * dt;
      }
      if (input.steerRight && !s.noSteering && !s.brokenSteering) {
        s.angle += this.airControl * dt;
      }
      // Nose dive in air
      if (input.brake && !s.noBrakes) {
        s.speed *= 0.95; // slight slowdown
        // Snap downward
        s.y += this.gravity * dt * 0.3;
      }
      // Gravity
      s.y += this.gravity * dt * 0.15;
      // Apply gravity to speed reduction
      s.speed += this.gravity * dt * 0.02; // slight speed from falling
    }

    // Steering (only if on ground and not no-steering)
    if (!s.noSteering && !s.brokenSteering && !s.isAirborne) {
      const turnMultiplier = s.driftAngle !== 0 ? this.driftTurnBoost : 1;
      if (input.steerLeft) {
        s.angle -= this.turnSpeed * turnMultiplier * dt;
      }
      if (input.steerRight) {
        s.angle += this.turnSpeed * turnMultiplier * dt;
      }
    }

    // Acceleration
    if (!s.engineOff && !s.isAirborne) {
      if (input.accelerate) {
        let effectiveAccel = this.accel * (1 - surf.speedPenalty);
        // Boost
        if (s.boostTimer > 0) {
          effectiveAccel *= this.boostMultiplier;
          s.boostTimer -= dt;
        }
        s.speed += effectiveAccel * dt;
      }
    } else if (s.boostTimer > 0) {
      // Boost still works when engine is off
      s.speed += this.accel * this.boostMultiplier * dt;
      s.boostTimer -= dt;
    }

    // Braking
    if (input.brake && !s.noBrakes) {
      if (s.isAirborne) {
        s.speed -= this.brakeForce * 0.5 * dt;
      } else {
        s.speed -= this.brakeForce * dt;
      }
    }

    // Drift mechanics
    if (input.drift && !s.isAirborne && s.speed > 50) {
      s.driftAngle = Math.min(s.driftAngle + 2.5 * dt, 0.6);
      // Drift reduces grip, allows sliding
      if (input.steerLeft || input.steerRight) {
        // Counter-steer effect
        s.angle += s.driftAngle * dt * 2;
      }
    } else {
      s.driftAngle *= 0.9; // decay drift
    }

    // Surface friction
    const friction = surf.friction * (1 + s.driftAngle * 0.5);
    s.speed -= s.speed * friction * dt;

    // Clamp speed
    const effectiveMax = s.boostTimer > 0 ? this.maxSpeed * this.boostMultiplier : this.maxSpeed;
    s.speed = Math.max(0, Math.min(s.speed, effectiveMax));

    // Move car
    const velX = Math.cos(s.angle) * s.speed;
    const velY = Math.sin(s.angle) * s.speed;
    s.x += velX * dt;
    s.y += velY * dt;

    // Check if car lands (for airborne)
    if (s.isAirborne) {
      // Simple landing: if there's a block under the car, land
      if (block) {
        s.isAirborne = false;
        s.airTime = 0;
        // Landing impact
        s.speed *= 0.9;
      }
    }

    // Update drift angle based on grip
    if (!input.drift) {
      s.driftAngle *= (1 - surf.grip * 0.5);
    }
  }

  private getBlockUnderCar(blocks: TrackBlock[]): TrackBlock | null {
    for (const block of blocks) {
      if (this.isPointInBlock(this.state.x, this.state.y, block)) {
        return block;
      }
    }
    return null;
  }

  private isPointInBlock(x: number, y: number, block: TrackBlock): boolean {
    // Transform point to block local space
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

  private applyBlockEffects(block: TrackBlock) {
    const s = this.state;
    switch (block.type) {
      case BlockType.Booster:
        s.boostTimer = this.boostDuration;
        break;
      case BlockType.EngineOff:
        s.engineOff = true;
        break;
      case BlockType.Fragile:
        s.fragile = true;
        break;
      case BlockType.NoSteering:
        s.noSteering = true;
        break;
      case BlockType.NoBrakes:
        s.noBrakes = true;
        break;
      case BlockType.RampUp:
        if (s.speed > 100) {
          s.isAirborne = true;
          s.airTime = 0;
        }
        break;
      case BlockType.Jump:
        if (s.speed > 80) {
          s.isAirborne = true;
          s.airTime = 0;
        }
        break;
      case BlockType.Loop:
        // Loop effect: simulate G-force
        s.speed *= 0.98; // slight speed reduction from loop
        break;
      case BlockType.WallRide:
        // Wall ride: car sticks to wall
        s.speed *= 0.95;
        break;
      default:
        // Reset flags when not on special blocks
        s.engineOff = false;
        s.noSteering = false;
        s.noBrakes = false;
        s.fragile = false;
    }
  }

  checkWallCollision(blocks: TrackBlock[]): boolean {
    // Check if car hits any wall (simplified)
    for (const block of blocks) {
      if (this.isPointInBlock(this.state.x, this.state.y, block)) {
        // Check if fragile and hit wall
        if (this.state.fragile) {
          this.state.brokenSteering = true;
        }
        return true;
      }
    }
    return false;
  }

  getSpeedKmh(): number {
    return this.state.speed * 0.36; // px/s to km/h
  }
}