import * as THREE from 'three';
import { Engine } from '../engine/Engine';
import { SurfaceType, SURFACE_PROPS, SpecialPad } from '../types/Surface';

export class Car {
  private model: THREE.Group;
  private velocity: THREE.Vector3 = new THREE.Vector3();
  private speed: number = 0;
  private isAirborne: boolean = false;
  private engineOn: boolean = true;
  private fragileTimer: number = 0;
  private noSteeringTimer: number = 0;
  private noBrakesTimer: number = 0;

  // Physics constants
  private readonly MAX_SPEED = 35; // m/s ~126 km/h
  private readonly ACCELERATION = 18; // m/s^2
  private readonly BRAKE_FORCE = 25;
  private readonly STEER_RATE = 3.0; // rad/s
  private readonly AIR_RESISTANCE = 0.012;
  private readonly DRAG_COEFF = 0.008;
  private readonly GRAVITY = -9.81;
  private readonly BOOST_FORCE = 50;

  // Drift tracking
  private driftAngle: number = 0;

  constructor(private engine: Engine, private track: any) {
    this.model = new THREE.Group();
    this.buildModel();
    this.resetPosition();
  }

  private buildModel(): void {
    // Body — sleek racing shape
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-0.9, -1.75);
    bodyShape.lineTo(1.0, -1.6);
    bodyShape.lineTo(1.2, 0.3);
    bodyShape.lineTo(1.0, 0.8);
    bodyShape.lineTo(0.9, 1.5);
    bodyShape.lineTo(-0.9, 1.75);
    bodyShape.lineTo(-1.0, 0.8);
    bodyShape.lineTo(-1.2, 0.3);
    bodyShape.lineTo(-1.0, -1.6);
    bodyShape.closePath();

    const bodyExtrudeSettings = { depth: 0.5, bevelEnabled: false };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, bodyExtrudeSettings);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xE03030,
      metalness: 0.7,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    body.position.y = 0.5;
    body.castShadow = true;
    this.model.add(body);

    // Cockpit canopy (transparent)
    const canopyGeo = new THREE.SphereGeometry(0.8, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x44AAFF,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.scale.set(1.4, 0.35, 0.7);
    canopy.position.set(0, 0.8, -0.2);
    this.model.add(canopy);

    // Front splitter
    const frontGeo = new THREE.BoxGeometry(2.0, 0.08, 0.4);
    const splitterMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const splitter = new THREE.Mesh(frontGeo, splitterMat);
    splitter.position.set(0, -0.15, 1.9);
    this.model.add(splitter);

    // Rear wing + supports
    const wingGeo = new THREE.BoxGeometry(2.6, 0.08, 0.3);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const wing = new THREE.Mesh(wingGeo, wingMat);
    wing.position.set(0, 1.0, -1.65);
    this.model.add(wing);

    for (const x of [-0.8, 0.8]) {
      const support = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.08), wingMat);
      support.position.set(x, 0.75, -1.65);
      this.model.add(support);
    }

    // Wheels (4) — positioned so they visually look correct
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 });

    const wheelData = [
      { x: -0.9, y: -0.35, z: 1.2 },   // front-left
      { x: 0.9, y: -0.35, z: 1.2 },    // front-right
      { x: -0.9, y: -0.35, z: -1.3 },  // rear-left
      { x: 0.9, y: -0.35, z: -1.3 },   // rear-right
    ];

    for (const w of wheelData) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(w.x, w.y, w.z);
      wheel.castShadow = true;
      this.model.add(wheel);
    }

    // Headlights (emissive spheres)
    const headlightGeo = new THREE.SphereGeometry(0.12, 8, 6);
    for (const x of [-0.7, 0.7]) {
      const hl = new THREE.Mesh(headlightGeo, new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, emissive: 0xFFFFAA, emissiveIntensity: 3,
      }));
      hl.position.set(x, -0.1, 1.92);
      this.model.add(hl);
    }

    // Tail lights
    for (const x of [-0.7, 0.7]) {
      const tl = new THREE.Mesh(headlightGeo, new THREE.MeshStandardMaterial({
        color: 0xFF0000, emissive: 0xFF0000, emissiveIntensity: 2,
      }));
      tl.position.set(x, -0.1, -1.82);
      this.model.add(tl);
    }
  }

  public getModel(): THREE.Group { return this.model; }
  public getPosition(): THREE.Vector3 { return this.model.position.clone(); }
  public getRotation(): THREE.Euler {
    return new THREE.Euler().setFromQuaternion(this.model.quaternion);
  }
  public getSpeed(): number { return this.speed; }

  private resetPosition(): void {
    // Find starting position on track
    this.model.position.set(0, 5, 0);
    this.model.rotation.set(0, Math.PI / 2, 0);
  }

  public reset(): void {
    this.resetPosition();
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.driftAngle = 0;
    this.isAirborne = false;
    this.engineOn = true;
    this.fragileTimer = 0;
    this.noSteeringTimer = 0;
    this.noBrakesTimer = 0;
  }

  public update(deltaTime: number): void {
    const input = this.engine.getInput().getState();

    // Clamp dt to prevent physics explosions
    const dt = Math.min(deltaTime, 0.033); // cap at ~30fps effective rate

    // Determine surface under car
    const pos = this.model.position;
    const surfaceType: SurfaceType = this.track.getSurfaceAt(pos);
    const props = SURFACE_PROPS[surfaceType];
    const grip = props.grip;

    // Check for special pads
    const pad = this.track.getSpecialPadAt(pos);
    this.handleSpecialPads(pad);

    // Decay timers
    if (this.fragileTimer > 0) this.fragileTimer -= dt;
    if (this.noSteeringTimer > 0) this.noSteeringTimer -= dt;
    if (this.noBrakesTimer > 0) this.noBrakesTimer -= dt;

    // Get forward and right vectors in car local space
    const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(this.model.quaternion);
    const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(this.model.quaternion);
    const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(this.model.quaternion);

    // Project velocity into car's forward plane
    const currentSpeedForward = this.velocity.dot(forwardVec);
    const currentSpeedLateral = Math.abs(this.velocity.dot(rightVec));

    // Calculate total horizontal speed
    const horizontalSpeed = new THREE.Vector3(this.velocity.x, 0, this.velocity.z).length();
    this.speed = horizontalSpeed;

    // --- Ground detection ---
    const trackHeight = this.track.getTrackHeight(pos.x, pos.z);
    this.isAirborne = (pos.y > trackHeight + 1.5);

    // --- Acceleration ---
    if (!this.isAirborne && this.engineOn && input.forward) {
      const maxSurfSpeed = this.MAX_SPEED * props.maxSpeed;
      const accelAmount = Math.min(this.ACCELERATION, (maxSurfSpeed - horizontalSpeed) * 3);
      if (accelAmount > 0) {
        this.velocity.addScaledVector(forwardVec, accelAmount * dt * grip);
      }
    }

    // --- Braking ---
    if (input.backward && this.noBrakesTimer <= 0) {
      let brakeForce = this.BRAKE_FORCE;
      if (!this.isAirborne && input.forward) {
        brakeForce = -5; // Engine brake
      }
      this.velocity.addScaledVector(forwardVec, brakeForce * dt * (this.isAirborne ? 0 : grip));
    }

    // --- Steering & Drift Physics ---
    let steerAmount = 0;
    if (this.noSteeringTimer <= 0) {
      if (input.left) steerAmount += 1;
      if (input.right) steerAmount -= 1;
    }

    if (!this.isAirborne && this.speed > 0.5) {
      // How much of the velocity is lateral (sliding)?
      const lateralRatio = currentSpeedLateral / Math.max(horizontalSpeed, 0.1);

      // Steering effectiveness depends on speed and grip
      let turnRate = steerAmount * this.STEER_RATE * dt;

      if (lateralRatio > 0.3 && grip < 0.6) {
        // DRIFTING: The car is sliding sideways
        // Steering becomes less effective at turning directly,
        // but more effective at initiating the slide
        const driftFactor = Math.pow(1 - grip, 2);

        // Add lateral impulse from steering while sliding
        this.velocity.addScaledVector(rightVec, steerAmount * lateralRatio * horizontalSpeed * driftFactor * dt * 0.5);

        // Reduced direct turning while deep in a slide
        turnRate *= (1 - driftFactor * 0.7);

        // Counter-steer: the car naturally wants to keep sliding, so turning into it helps straighten out
        this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, steerAmount * lateralRatio * 0.5, dt * 2);

      } else {
        // Normal grip steering
        // At very high speeds, reduce steering angle to simulate the need for smaller inputs
        const speedSteerMod = 1 / (1 + horizontalSpeed * this.DRAG_COEFF);
        turnRate *= speedSteerMod;
        this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, 0, dt * 5);
      }

      // Apply yaw rotation
      const worldUp = new THREE.Vector3(0, 1, 0);
      const angleAxis = new THREE.Quaternion().setFromAxisAngle(worldUp, turnRate);
      this.model.quaternion.multiply(angleAxis);

      // Body roll for visual feedback
      const rollAmount = steerAmount * 0.25 * Math.min(horizontalSpeed / 15, 1);
      this.model.rotateZ(rollAmount * dt * 5);
    } else if (this.isAirborne && steerAmount !== 0) {
      // Air steering — less effective than ground
      const worldUp = new THREE.Vector3(0, 1, 0);
      const angleAxis = new THREE.Quaternion().setFromAxisAngle(worldUp, steerAmount * this.STEER_RATE * 0.4 * dt);
      this.model.quaternion.multiply(angleAxis);
    }

    // --- Air Control: brake to nose-dive ---
    if (this.isAirborne && input.backward) {
      const pitchSpeed = -3.0; // Nose down
      const rollQ = new THREE.Quaternion().setFromAxisAngle(
        this.model.children[0] ? rightVec : new THREE.Vector3(1, 0, 0),
        pitchSpeed * dt
      );
      this.model.quaternion.multiply(rollQ);
    }

    // --- Aerodynamic drag ---
    const speed = this.speed;
    if (speed > 0.5) {
      const drag = this.AIR_RESISTANCE * speed * speed * dt;
      const horizontalVel = new THREE.Vector3(this.velocity.x, 0, this.velocity.z);
      horizontalVel.normalize().multiplyScalar(-Math.min(drag, speed));
      this.velocity.add(horizontalVel);
    }

    // --- Lateral friction (pulls lateral velocity toward zero based on grip) ---
    if (!this.isAirborne && currentSpeedLateral > 0.1) {
      const lateralFriction = grip * horizontalSpeed * dt * 5;
      const lateralVelDir = rightVec.clone().multiplyScalar(this.velocity.dot(rightVec));
      this.velocity.addScaledVector(lateralVelDir, -Math.min(lateralFriction, currentSpeedLateral) / Math.max(currentSpeedLateral, 0.1));
    }

    // --- Gravity ---
    if (this.isAirborne || pos.y > trackHeight + 0.5) {
      this.velocity.y += this.GRAVITY * dt;
    }

    // Apply velocity to position
    pos.addScaledVector(this.velocity, dt);

    // --- Ground collision / snap ---
    if (!this.isAirborne) {
      const groundY = trackHeight + 0.5;
      if (pos.y < groundY + 0.3) {
        // Landing impact
        if (this.velocity.y < -1) {
          // Bounce slightly
          this.velocity.y *= -0.1;
        } else {
          this.velocity.y = 0;
        }
        pos.y = groundY + 0.3;

        // Re-enable engine after landing if it was on
        this.engineOn = true;
      }
    }

    // Speed clamping per surface (when on track)
    if (!this.isAirborne) {
      const maxSurfSpeed = this.MAX_SPEED * props.maxSpeed;
      if (horizontalSpeed > maxSurfSpeed) {
        const scale = maxSurfSpeed / horizontalSpeed;
        this.velocity.x *= scale;
        this.velocity.z *= scale;
      }
    }

    // --- Safety: reset if fallen too far ---
    if (pos.y < -50) {
      this.reset();
    }

    // --- Wheel spin visual ---
    const wheelSpin = speed * 3 * dt;
    for (let i = 4; i <= 7 && i < this.model.children.length; i++) {
      const child = this.model.children[i] as THREE.Mesh;
      if (child.geometry instanceof THREE.CylinderGeometry) {
        child.rotation.x += wheelSpin;
      }
    }

    // --- Drift sound trigger ---
    const lateralRatio2 = Math.abs(this.velocity.dot(rightVec)) / Math.max(horizontalSpeed, 0.1);
    if (!this.isAirborne && lateralRatio2 > 0.4 && horizontalSpeed > 10) {
      this.engine.getAudio().triggerDrift();
    }
  }

  private handleSpecialPads(pad: SpecialPad): void {
    switch (pad) {
      case SpecialPad.BOOSTER:
        const f = new THREE.Vector3(0, 0, -1).applyQuaternion(this.model.quaternion);
        this.velocity.addScaledVector(f, this.BOOST_FORCE * 0.033); // per-frame impulse
        break;

      case SpecialPad.ENGINE_OFF:
        this.engineOn = false;
        break;

      case SpecialPad.FRAGILE:
        if (this.fragileTimer <= 0) {
          this.fragileTimer = 5; // 5 seconds of fragile
        }
        // When fragile, collisions with walls damage steering
        break;

      case SpecialPad.NO_STEERING:
        this.noSteeringTimer = Math.max(this.noSteeringTimer, 2);
        break;

      case SpecialPad.NO_BRAKES:
        this.noBrakesTimer = Math.max(this.noBrakesTimer, 2);
        break;
    }
  }
}
