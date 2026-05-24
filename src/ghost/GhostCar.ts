import * as THREE from 'three';

export interface GhostFrame {
  t: number;
  pos: [number, number, number];
  rot: [number, number, number];
}

export class GhostCar {
  private model: THREE.Group;
  private frames: GhostFrame[] = [];
  private currentTimer: number = 0;

  constructor() {
    this.model = new THREE.Group();
    this.buildModel();
  }

  private buildModel(): void {
    // Semi-transparent ghost car (same shape as real car but ghostly)
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.6, 3.5);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x44AAFF,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    this.model.add(body);

    // Cockpit
    const cockpitGeo = new THREE.BoxGeometry(1.4, 0.5, 1.8);
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x2266AA,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.55, -0.3);
    this.model.add(cockpit);

    // Wheels (ghost-style)
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 8);
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.3,
    });
    const wheelPositions = [
      [-1, -0.35, 1], [1, -0.35, 1],
      [-1, -0.35, -1.2], [1, -0.35, -1.2],
    ];
    for (const [x, y, z] of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      this.model.add(wheel);
    }
  }

  public getModel(): THREE.Group { return this.model; }

  public loadFrames(frames: GhostFrame[]): void {
    this.frames = frames;
  }

  public start(): void {
    this.currentTimer = 0;
  }

  public update(deltaTime: number): void {
    this.currentTimer += deltaTime;
    if (this.frames.length === 0) return;

    // Find the frame corresponding to current timer
    let idx = 0;
    for (; idx < this.frames.length - 1; idx++) {
      if (this.currentTimer <= this.frames[idx + 1].t) break;
    }

    const f0 = this.frames[idx];
    const f1 = this.frames[Math.min(idx + 1, this.frames.length - 1)];

    // Interpolate between frames
    const duration = f1.t - f0.t;
    const t = duration > 0 ? (this.currentTimer - f0.t) / duration : 0;
    const s = Math.max(0, Math.min(1, t));

    this.model.position.set(
      THREE.MathUtils.lerp(f0.pos[0], f1.pos[0], s),
      THREE.MathUtils.lerp(f0.pos[1], f1.pos[1], s),
      THREE.MathUtils.lerp(f0.pos[2], f1.pos[2], s),
    );

    const euler = new THREE.Euler(
      THREE.MathUtils.lerp(f0.rot[0], f1.rot[0], s),
      THREE.MathUtils.lerp(f0.rot[1], f1.rot[1], s),
      THREE.MathUtils.lerp(f0.rot[2], f1.rot[2], s),
    );
    this.model.rotation.copy(euler);
  }

  public isFinished(): boolean {
    return this.currentTimer > (this.frames[this.frames.length - 1]?.t ?? Infinity);
  }
}
