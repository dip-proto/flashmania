import { SurfaceType, SURFACE_PROPERTIES } from './surfaces';

export interface Vec2 {
  x: number;
  y: number;
}

export interface VehicleState {
  pos: Vec2;
  vel: Vec2;
  angle: number;          // heading in radians
  angularVel: number;
  speed: number;
  onSurface: SurfaceType;
  drifting: boolean;
  airborne: boolean;
  engineOn: boolean;
  fragile: boolean;
  noSteering: boolean;
  noBrakes: boolean;
  wetTires: boolean;
  wetTimer: number;
  groundedTimer: number;
}

export interface VehicleInput {
  steer: number;    // -1..1
  accelerate: boolean;
  brake: boolean;
  tapBrake: boolean; // for air-control nose-dive
}

export function createInitialVehicle(x: number, y: number): VehicleState {
  return {
    pos: { x, y },
    vel: { x: 0, y: 0 },
    angle: 0,
    angularVel: 0,
    speed: 0,
    onSurface: SurfaceType.Asphalt,
    drifting: false,
    airborne: true,  // start on the track surface after dropping
    engineOn: true,
    fragile: false,
    noSteering: false,
    noBrakes: false,
    wetTires: false,
    wetTimer: 0,
    groundedTimer: 0,
  };
}

export function updateVehicle(
  state: VehicleState,
  input: VehicleInput,
  dt: number,
): VehicleState {
  const surf = SURFACE_PROPERTIES[state.onSurface];
  const grip = state.drifting ? surf.driftGrip : surf.grip;
  const maxSpeed = 30; // units/sec, "top speed"
  const accelForce = 18; // acceleration when pressing accelerate
  const brakeForce = 15;
  const dragCoeff = 0.3;
  const steerSpeed = 1.8; // radians per second for steering

  let newState = { ...state };

  // --- Engine off zone ---
  if (!newState.engineOn) {
    // no acceleration
  }

  // --- Fragile: hitting walls handled by track collision ---

  // --- No steering / No brakes lock ---
  const canSteer = !newState.noSteering;
  const canBrake = !newState.noBrakes;

  // --- Air control ---
  if (newState.airborne) {
    // Nose-dive: tap brake in air tilts velocity downward
    if (input.tapBrake) {
      newState.vel.y += 2.0;
    }
    // Very light steering in air (rotation only)
    if (canSteer) {
      newState.angle += input.steer * 0.8 * dt;
    }
    // Apply gravity
    newState.vel.y += 18 * dt;
    // Drag in air
    newState.vel.x *= (1 - 0.01);
    newState.vel.y *= (1 - 0.01);
  } else {
    // --- Ground physics ---

    // Acceleration / braking
    if (input.accelerate && newState.engineOn) {
      const ax = Math.cos(newState.angle) * accelForce * dt;
      const ay = Math.sin(newState.angle) * accelForce * dt;
      newState.vel.x += ax;
      newState.vel.y += ay;
    }
    if (input.brake && canBrake) {
      // Braking reduces velocity toward zero
      const brakeDecel = brakeForce * dt;
      const spd = Math.sqrt(newState.vel.x ** 2 + newState.vel.y ** 2);
      if (spd > 0) {
        const brakeVec = brakeDecel / spd;
        newState.vel.x -= newState.vel.x * brakeVec;
        newState.vel.y -= newState.vel.y * brakeVec;
      }
    }

    // Steering: rotate heading and apply lateral friction
    if (canSteer && Math.abs(input.steer) > 0.01) {
      const steerAmount = input.steer * steerSpeed * dt * grip;
      newState.angle += steerAmount;

      // Apply drift mechanics
      if (Math.abs(input.steer) > 0.7 && grip < 0.5) {
        newState.drifting = true;
      } else {
        newState.drifting = false;
      }
    } else {
      newState.drifting = false;
    }

    // Grip-based lateral friction: kill velocity perpendicular to heading
    const heading = newState.angle;
    const forward = { x: Math.cos(heading), y: Math.sin(heading) };
    const speedFwd = newState.vel.x * forward.x + newState.vel.y * forward.y;
    const latFriction = grip * 0.8;
    // Project velocity onto forward direction
    newState.vel.x = forward.x * speedFwd + (newState.vel.x - forward.x * speedFwd) * (1 - latFriction * dt);
    newState.vel.y = forward.y * speedFwd + (newState.vel.y - forward.y * speedFwd) * (1 - latFriction * dt);

    // Drag
    const drag = dragCoeff * dt;
    newState.vel.x *= (1 - drag);
    newState.vel.y *= (1 - drag);

    // Speed loss during drift
    if (newState.drifting) {
      const loss = surf.speedLoss * dt;
      newState.vel.x *= (1 - loss);
      newState.vel.y *= (1 - loss);
    }

    // Cap speed
    const spd = Math.sqrt(newState.vel.x ** 2 + newState.vel.y ** 2);
    if (spd > maxSpeed) {
      const scale = maxSpeed / spd;
      newState.vel.x *= scale;
      newState.vel.y *= scale;
    }

    // Wet tire drying
    if (newState.wetTires) {
      newState.wetTimer -= dt;
      if (newState.wetTimer <= 0) {
        newState.wetTires = false;
        newState.wetTimer = 0;
      }
    }
  }

  // --- Integrate position ---
  newState.pos.x += newState.vel.x * dt;
  newState.pos.y += newState.vel.y * dt;

  // Compute speed scalar
  newState.speed = Math.sqrt(newState.vel.x ** 2 + newState.vel.y ** 2);

  return newState;
}
