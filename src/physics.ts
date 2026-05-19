import { Car, ControlInputs, Particle, TileType, Track } from './types';
import { TILE_SIZE } from './tracks';

export function createCar(x: number, y: number, heading = 0): Car {
  return {
    x,
    y,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    heading,
    angularVelocity: 0,
    isDrifting: false,
    driftTrailTimer: 0,
    isAirborne: false,
    currentSurface: 'road',
    wetFactor: 0,
    engineOffTimer: 0,
    noSteerBrakesTimer: 0,
    steeringDamaged: false,
    fragileTimer: 0,
    boostEffectTimer: 0,
    speed: 0,
  };
}

export function isDriveable(type: TileType): boolean {
  return (
    type !== 'empty' &&
    type !== 'wall'
  );
}

export function getTileAt(track: Track, fx: number, fy: number): TileType {
  const col = Math.floor(fx / TILE_SIZE);
  const row = Math.floor(fy / TILE_SIZE);
  if (col < 0 || col >= track.gridWidth || row < 0 || row >= track.gridHeight) {
    return 'empty';
  }
  return track.tiles[`${col},${row}`] || 'empty';
}



export function updateCar(
  car: Car,
  inputs: ControlInputs,
  track: Track,
  dt: number
): { particles: Particle[]; screenShake: number; soundTrigger: string | null } {
  const particles: Particle[] = [];
  let screenShake = 0;
  let soundTrigger: string | null = null;

  // Max cap dt to prevent extreme tunnels during lag frames
  if (dt > 0.1) dt = 0.1;

  // 1. Tick Timers down
  if (car.boostEffectTimer > 0) car.boostEffectTimer = Math.max(0, car.boostEffectTimer - dt);
  if (car.engineOffTimer > 0) car.engineOffTimer = Math.max(0, car.engineOffTimer - dt);
  if (car.noSteerBrakesTimer > 0) car.noSteerBrakesTimer = Math.max(0, car.noSteerBrakesTimer - dt);
  if (car.fragileTimer > 0) car.fragileTimer = Math.max(0, car.fragileTimer - dt);
  if (car.wetFactor > 0) car.wetFactor = Math.max(0, car.wetFactor - dt);

  // 2. Air Suspension & Z mechanics
  if (car.isAirborne) {
    // Apply gravity
    const gravity = 800; // px/s^2
    let activeGravity = gravity;

    // Air Control: Tapping brakes causes a steep nose-dive to snap back to earth!
    const isBraking = inputs.brake && car.noSteerBrakesTimer <= 0;
    if (isBraking) {
      activeGravity = gravity * 3.5; // Snap-down torque
    }

    car.vz -= activeGravity * dt;
    car.z += car.vz * dt;

    // Air control steering dampening (slight heading adjustment allowed in the air)
    let steerDir = 0;
    if (car.noSteerBrakesTimer <= 0) {
      if (inputs.left) steerDir -= 0.5;
      if (inputs.right) steerDir += 0.5;
    }
    car.heading += steerDir * 2.2 * dt;

    // Air resistance on horizontal speeds
    car.vx *= Math.pow(0.98, dt * 60);
    car.vy *= Math.pow(0.98, dt * 60);

    // Airborne trail visual effects
    if (Math.random() < 0.2) {
      particles.push({
        x: car.x + (Math.random() * 10 - 5),
        y: car.y + (Math.random() * 10 - 5),
        z: car.z - 2,
        vx: -car.vx * 0.1,
        vy: -car.vy * 0.1,
        vz: 0,
        life: 1,
        maxLife: 0.4,
        color: 'rgba(255,255,255,0.15)',
        size: 3,
        type: 'smoke',
      });
    }

    // Check Landing trigger
    if (car.z <= 0) {
      const tileType = getTileAt(track, car.x, car.y);
      if (isDriveable(tileType)) {
        // Safe Landing!
        car.z = 0;
        car.isAirborne = false;
        soundTrigger = car.vz < -500 ? 'heavy_land' : 'land';
        screenShake = Math.min(10, Math.abs(car.vz) * 0.015);
        car.vz = 0;

        // Spark explosion on impact
        for (let i = 0; i < 15; i++) {
          particles.push({
            x: car.x,
            y: car.y,
            z: 0,
            vx: (Math.random() - 0.5) * 400 - car.vx * 0.2,
            vy: (Math.random() - 0.5) * 400 - car.vy * 0.2,
            vz: Math.random() * 300,
            life: 1,
            maxLife: 0.5 + Math.random() * 0.3,
            color: '#00f2fe',
            size: 2 + Math.random() * 3,
            type: 'spark',
          });
        }
      } else {
        // Landed off-track / on empty space. Keep falling into the void!
        if (car.z < -450) {
          // Triggers crash/reset
          soundTrigger = 'void_fall';
        }
      }
    }
  } else {
    // 3. Ground Mechanics
    const tileType = getTileAt(track, car.x, car.y);
    car.currentSurface = tileType;

    // Check if stepped off of the racing track into empty space!
    if (tileType === 'empty') {
      car.isAirborne = true;
      car.vz = 0; // Starts falling
    } else {
      // Manage Gimmick & Special Tiles triggering
      if (tileType === 'booster') {
        if (car.boostEffectTimer <= 0) {
          car.boostEffectTimer = 1.2; // Golden speed mode for 1.2s
          soundTrigger = 'boost';
          screenShake = 4;
        }
      } else if (tileType === 'engine_off') {
        if (car.engineOffTimer <= 0) {
          car.engineOffTimer = 3.0; // engine off!
          soundTrigger = 'engine_cut';
        }
      } else if (tileType === 'fragile') {
        if (car.fragileTimer <= 0) {
          car.fragileTimer = 5.0; // Trigger fragile alert!
          soundTrigger = 'fragile_alert';
        }
      } else if (tileType === 'no_steer_brakes') {
        if (car.noSteerBrakesTimer <= 0) {
          car.noSteerBrakesTimer = 1.3; // Lock controls!
          soundTrigger = 'lock_alert';
        }
      } else if (tileType === 'ramp') {
        const speedKmh = Math.sqrt(car.vx * car.vx + car.vy * car.vy);
        if (speedKmh > 250) {
          // Launch off the Ramp tile!
          car.isAirborne = true;
          car.z = 2;
          car.vz = speedKmh * 0.45; // Speed determines jump height
          soundTrigger = 'jump';
        }
      } else if (tileType === 'plastic') {
        if (car.wetFactor < 0.9) {
          car.wetFactor = 1.0; // Wet tires!
          soundTrigger = 'splash';
        }
      }
    }
  }

  // Calculate speed
  car.speed = Math.sqrt(car.vx * car.vx + car.vy * car.vy);

  // 4. Ground Steering Physics
  let steerInput = 0;
  if (!car.isAirborne && car.noSteerBrakesTimer <= 0) {
    if (inputs.left) steerInput -= 1.0;
    if (inputs.right) steerInput += 1.0;
  }

  // Handle steer breaking alignment from fragile walls impact
  if (car.steeringDamaged) {
    // constant hard pull to the left
    steerInput -= 0.35;
  }

  if (steerInput !== 0) {
    // Steering radius relies on speed (tight at mid speed, wider at extreme speeds)
    const turnSensitivity = 3.8;
    const speedFactor = Math.min(1.0, car.speed / 130);
    const aeroDampening = Math.max(0.4, 1.2 - car.speed / 1200);
    
    let steerGripMod = 1.0;
    if (car.currentSurface === 'ice') steerGripMod = 0.45; // Ice delays turn response
    else if (car.currentSurface === 'dirt') steerGripMod = 0.8;

    car.heading += steerInput * turnSensitivity * speedFactor * aeroDampening * steerGripMod * dt;
  }

  // Normalize heading
  car.heading = (car.heading + Math.PI * 2) % (Math.PI * 2);

  // 5. Traction & Acceleration Physics (On Ground)
  if (!car.isAirborne) {
    // Surface coefficient configuration
    let maxSpeed = 750; // default (px/sec)
    let accelRate = 480; // px/sec^2
    let drag = 0.55; // rolling drag
    let baseGrip = 7.5; // lateral friction grip

    switch (car.currentSurface) {
      case 'dirt':
        maxSpeed = 620;
        accelRate = 350;
        drag = 0.65;
        baseGrip = 1.9; // easy slides
        break;
      case 'ice':
        maxSpeed = 580;
        accelRate = 120; // very slippery acceleration
        drag = 0.15; // slide for days
        baseGrip = 0.22; // ice skating sliding
        break;
      case 'grass':
        maxSpeed = 380; // dampened top speed
        accelRate = 280;
        drag = 1.5; // very high friction resistance
        baseGrip = 8.0; // stable lines
        break;
      case 'plastic':
        maxSpeed = 680;
        accelRate = 380;
        drag = 0.3;
        baseGrip = 1.2;
        break;
      default: // road, start, finish, checkpoint, booster, engine_off, fragile, no_steer_brakes
        maxSpeed = 780;
        accelRate = 540;
        drag = 0.45;
        baseGrip = 8.0;
        break;
    }

    // Gimmick boosts adjustments
    if (car.boostEffectTimer > 0) {
      maxSpeed += 650;
      accelRate += 1100;
    }

    // Engine Cutout
    if (car.engineOffTimer > 0) {
      accelRate = 0; // Purely coaster glide mechanics
    }

    // Wet tire degradation
    if (car.wetFactor > 0) {
      baseGrip *= (1.0 - car.wetFactor * 0.8); // 80% loss in lateral grip
      accelRate *= (1.0 - car.wetFactor * 0.4); // 40% loss of pull power
    }

    // Keyboard forces
    const isAccelerating = inputs.accel && car.engineOffTimer <= 0;
    const isBraking = inputs.brake && car.noSteerBrakesTimer <= 0;

    // Resolve local speed vectors:
    // Frame of reference relative to the car heading
    const cosH = Math.cos(car.heading);
    const sinH = Math.sin(car.heading);
    
    // Project world velocities (vx, vy) into car local space (forward, lateral)
    let fwdSpeed = car.vx * cosH + car.vy * sinH;
    let latSpeed = -car.vx * sinH + car.vy * cosH;

    // Forward force
    if (isAccelerating) {
      if (fwdSpeed < maxSpeed) {
        fwdSpeed += accelRate * dt;
      }
    }
    if (isBraking) {
      // Multiplier penalty for reversing vs active braking
      if (fwdSpeed > 50) {
        fwdSpeed -= 1500 * dt; // Aggressive braking grab
      } else {
        fwdSpeed -= 250 * dt; // Slow reverse
      }
    }

    // Apply native engine deceleration/coastal drag
    if (!isAccelerating && !isBraking) {
      fwdSpeed -= Math.sign(fwdSpeed) * drag * 100 * dt;
      if (Math.abs(fwdSpeed) < 10) fwdSpeed = 0;
    }

    // Drift / Slide Mechanics
    // Is the user requesting a manual slide hook? (tapping brake + turning hard at speed)
    const driftRequestedInput = inputs.drift && Math.abs(steerInput) > 0 && car.speed > 250;
    
    // Natural friction threshold breach
    const naturalSlideThreshold = 280;
    const isSlippingNaturally = Math.abs(latSpeed) > naturalSlideThreshold && baseGrip < 3.0;

    car.isDrifting = driftRequestedInput || isSlippingNaturally;

    let activeGrip = baseGrip;
    if (car.isDrifting) {
      // Reduce side grip during drift sliding
      activeGrip *= 0.15;
    }

    // Apply lateral resistance (reduces drift angle sliding vector)
    const prevLatSpeed = latSpeed;
    latSpeed = latSpeed * Math.exp(-activeGrip * 2.2 * dt);
    if (Math.abs(latSpeed) < 1.0) latSpeed = 0;

    // Re-project local velocities back to global coordinates
    car.vx = fwdSpeed * cosH - latSpeed * sinH;
    car.vy = fwdSpeed * sinH + latSpeed * cosH;

    // 6. Spawn smoke / surface particle spray
    car.driftTrailTimer += dt;
    const slideIntensity = Math.abs(prevLatSpeed - latSpeed);

    if (slideIntensity > 20 || car.isDrifting) {
      let particleType: Particle['type'] = 'smoke';
      let particleColor = 'rgba(255, 255, 255, 0.4)';
      let sizeFactor = 1;

      if (car.currentSurface === 'dirt') {
        particleType = 'dirt';
        particleColor = 'rgba(160, 110, 60, 0.65)';
        sizeFactor = 1.5;
      } else if (car.currentSurface === 'ice') {
        particleType = 'ice';
        particleColor = 'rgba(190, 230, 255, 0.7)';
        sizeFactor = 1.25;
      } else if (car.currentSurface === 'plastic') {
        particleType = 'plastic';
        particleColor = 'rgba(100, 200, 255, 0.8)';
        sizeFactor = 1.8;
      }

      // Add a couple trail puffs under the tires
      const tireL = {
        x: car.x - Math.cos(car.heading + 0.3) * 12,
        y: car.y - Math.sin(car.heading + 0.3) * 12,
      };
      const tireR = {
        x: car.x - Math.cos(car.heading - 0.3) * 12,
        y: car.y - Math.sin(car.heading - 0.3) * 12,
      };

      if (Math.random() < 0.4) {
        particles.push({
          x: tireL.x,
          y: tireL.y,
          z: 0,
          vx: -car.vx * 0.2 + (Math.random() - 0.5) * 50,
          vy: -car.vy * 0.2 + (Math.random() - 0.5) * 50,
          vz: Math.random() * 50,
          life: 1,
          maxLife: 0.6 * sizeFactor,
          color: particleColor,
          size: (3 + Math.random() * 4) * sizeFactor,
          type: particleType,
        });
        particles.push({
          x: tireR.x,
          y: tireR.y,
          z: 0,
          vx: -car.vx * 0.2 + (Math.random() - 0.5) * 50,
          vy: -car.vy * 0.2 + (Math.random() - 0.5) * 50,
          vz: Math.random() * 50,
          life: 1,
          maxLife: 0.6 * sizeFactor,
          color: particleColor,
          size: (3 + Math.random() * 4) * sizeFactor,
          type: particleType,
        });
      }
    }

    // Booster gold fire trails
    if (car.boostEffectTimer > 0 && Math.random() < 0.6) {
      particles.push({
        x: car.x - Math.cos(car.heading) * 15 + (Math.random() - 0.5) * 8,
        y: car.y - Math.sin(car.heading) * 15 + (Math.random() - 0.5) * 8,
        z: 0,
        vx: -car.vx * 0.15 + (Math.random() - 0.5) * 40,
        vy: -car.vy * 0.15 + (Math.random() - 0.5) * 40,
        vz: 10 + Math.random() * 80,
        life: 1,
        maxLife: 0.3 + Math.random() * 0.2,
        color: Math.random() < 0.6 ? '#ffd700' : '#ff007f',
        size: 3 + Math.random() * 4,
        type: 'boost',
      });
    }
  }

  // 7. Grid Collision Handling with non-driveable wall zones Or Track limits
  // Map our bounding boundaries box. We model the car as a circular bounding sphere with radius R = 13.
  const boundsRadius = 13;
  
  // Calculate next potential spot
  let nextX = car.x + car.vx * dt;
  let nextY = car.y + car.vy * dt;

  // Multi-point wall check:
  // Center, and 4 points at the compass margins relative to radius
  const collisionPoints = [
    { x: nextX, y: nextY },
    { x: nextX - boundsRadius, y: nextY },
    { x: nextX + boundsRadius, y: nextY },
    { x: nextX, y: nextY - boundsRadius },
    { x: nextX, y: nextY + boundsRadius },
  ];

  let hitWallX = false;
  let hitWallY = false;

  for (const pt of collisionPoints) {
    const tile = getTileAt(track, pt.x, pt.y);
    if (tile === 'wall' || (tile === 'empty' && !car.isAirborne)) {
      // Determine direction of collision to apply proper normal bounce pushes
      // Simple resolution: compare cell centers to find entry point
      const currentTileX = getTileAt(track, car.x, pt.y);
      const currentTileY = getTileAt(track, pt.x, car.y);

      if (currentTileX === 'wall' || (currentTileX === 'empty' && !car.isAirborne)) {
        hitWallX = true;
      }
      if (currentTileY === 'wall' || (currentTileY === 'empty' && !car.isAirborne)) {
        hitWallY = true;
      }
      
      // Safety fallback
      if (!hitWallX && !hitWallY) {
        hitWallX = true;
        hitWallY = true;
      }
    }
  }

  if (hitWallX || hitWallY) {
    // Collision happened! Let's bounce velocity components

    
    // Impact hardness factor
    const impactStrength = Math.sqrt(car.vx * car.vx + car.vy * car.vy);
    
    if (hitWallX) {
      car.vx = -car.vx * 0.35; // bounce slightly
      nextX = car.x; // freeze movement update
    }
    if (hitWallY) {
      car.vy = -car.vy * 0.35;
      nextY = car.y;
    }

    // Trigger physical impact consequences
    if (impactStrength > 100) {
      soundTrigger = 'crash';
      screenShake = Math.min(12, impactStrength * 0.015);
      
      // Spark splash graphics
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: car.x,
          y: car.y,
          z: car.z,
          vx: (Math.random() - 0.5) * 200,
          vy: (Math.random() - 0.5) * 200,
          vz: Math.random() * 150,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.3,
          color: '#ffd700',
          size: 1 + Math.random() * 3,
          type: 'spark',
        });
      }

      // Check FRAGILE tile penalty
      if (car.fragileTimer > 0 || getTileAt(track, car.x, car.y) === 'fragile') {
        if (!car.steeringDamaged) {
          car.steeringDamaged = true; // Steering misaligned!
          soundTrigger = 'fragile_break';
        }
      }
    }
  }

  // Update actual position to resolved bounds
  car.x = nextX;
  car.y = nextY;

  return {
    particles,
    screenShake,
    soundTrigger,
  };
}
