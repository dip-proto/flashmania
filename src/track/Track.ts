import * as THREE from 'three';
import { TrackSegment } from './TrackSegment';
import { SurfaceType, SURFACE_PROPS, SpecialPad } from '../types/Surface';

export class Track {
  private segments: TrackSegment[] = [];
  private checkpoints: Checkpoint[] = [];
  private currentCheckpoint: number = -1;
  public name: string;
  public bronzeTime: number;
  public silverTime: number;
  public goldTime: number;
  public authorTime: number;

  constructor(name: string, bronze: number, silver: number, gold: number, author: number) {
    this.name = name;
    this.bronzeTime = bronze;
    this.silverTime = silver;
    this.goldTime = gold;
    this.authorTime = author;
  }

  addSegment(seg: TrackSegment): void {
    this.segments.push(seg);
  }

  addCheckpoint(pos: THREE.Vector3, isFinish?: boolean): void {
    this.checkpoints.push({ position: pos.clone(), isFinish });
  }

  build(): THREE.Object3D[] {
    const meshes: THREE.Object3D[] = [];
    for (const seg of this.segments) {
      meshes.push(seg.mesh);
    }

    // Add checkpoint arches / rings
    for (let i = 0; i < this.checkpoints.length; i++) {
      const cp = this.checkpoints[i];
      const archGroup = new THREE.Group();

      // Arch ring (like a gateway)
      const ringGeo = new THREE.TorusGeometry(3, 0.25, 8, 16);
      const isFinish = cp.isFinish;
      const ringMat = new THREE.MeshStandardMaterial({
        color: isFinish ? 0xFFD700 : 0x00FF88,
        emissive: isFinish ? 0x442200 : 0x003322,
        emissiveIntensity: 0.5,
        metalness: 0.6,
        roughness: 0.3,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      archGroup.add(ring);

      // Inner glow disc for finish line
      if (isFinish) {
        const discGeo = new THREE.RingGeometry(1.5, 2.8, 16);
        const discMat = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          emissive: 0xFFFFAA,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        });
        const disc = new THREE.Mesh(discGeo, discMat);
        archGroup.add(disc);
      }

      archGroup.position.copy(cp.position);
      meshes.push(archGroup);
    }

    return meshes;
  }

  startCheckpoints(): void {
    this.currentCheckpoint = -1;
  }

  advanceCheckpoint(): void {
    this.currentCheckpoint++;
  }

  getNextCheckpoint(): THREE.Vector3 | null {
    if (this.currentCheckpoint + 1 < this.checkpoints.length) {
      return this.checkpoints[this.currentCheckpoint + 1].position;
    }
    return null;
  }

  getCheckpointCount(): number {
    return this.checkpoints.length;
  }

  getNextCheckpointIndex(): number | null {
    if (this.currentCheckpoint + 1 < this.checkpoints.length) {
      return this.currentCheckpoint + 1;
    }
    return null;
  }

  getCheckpointPosition(index: number): THREE.Vector3 | null {
    if (index >= 0 && index < this.checkpoints.length) {
      return this.checkpoints[index].position;
    }
    return null;
  }

  getFinishLine(): THREE.Vector3 | null {
    if (this.checkpoints.length > 0) {
      return this.checkpoints[this.checkpoints.length - 1].position.clone();
    }
    return null;
  }

  getSurfaceAt(pos: THREE.Vector3): SurfaceType {
    let closestDist = Infinity;
    let surface = SurfaceType.ASPHALT;

    for (const seg of this.segments) {
      const local = new THREE.Vector3().copy(pos).sub(seg.mesh.position);
      // Approximate inverse Y-rotation for simplicity
      const yaw = seg.rotation.y;
      const cosY = Math.cos(-yaw);
      const sinY = Math.sin(-yaw);
      const rx = local.x * cosY - local.z * sinY;
      const rz = local.x * sinY + local.z * cosY;

      // Check top face (width=8 → halfW=4, length=10 → halfL=5)
      if (Math.abs(rx) < 4.5 && Math.abs(rz) < 5.5 && Math.abs(local.y) < 3) {
        const dist = local.length();
        if (dist < closestDist) {
          closestDist = dist;
          surface = seg.getSurfaceType();
        }
      }
    }

    return surface;
  }

  getSpecialPadAt(pos: THREE.Vector3): SpecialPad {
    for (const seg of this.segments) {
      if (seg.getSpecialPad() === SpecialPad.NONE) continue;

      const local = new THREE.Vector3().copy(pos).sub(seg.mesh.position);
      const yaw = seg.rotation.y;
      const cosY = Math.cos(-yaw);
      const sinY = Math.sin(-yaw);
      const rx = local.x * cosY - local.z * sinY;
      const rz = local.x * sinY + local.z * cosY;

      if (Math.abs(rx) < 3.5 && Math.abs(rz) < 4.5 && Math.abs(local.y) < 2) {
        return seg.getSpecialPad();
      }
    }
    return SpecialPad.NONE;
  }

  getTrackHeight(x: number, z: number): number {
    let highestY = -Infinity;

    for (const seg of this.segments) {
      const local = new THREE.Vector3(x - seg.mesh.position.x, 0, z - seg.mesh.position.z);
      const yaw = seg.rotation.y;
      const cosY = Math.cos(-yaw);
      const sinY = Math.sin(-yaw);
      const rx = local.x * cosY - local.z * sinY;
      // rz not needed for height check

      if (Math.abs(rx) < 4.5) {
        // The top of the segment is at mesh.position.y + halfHeight
        const segTop = seg.mesh.position.y + 0.75;
        if (segTop > highestY) {
          highestY = segTop;
        }
      }
    }

    return Math.max(highestY, -Infinity);
  }
}

interface Checkpoint {
  position: THREE.Vector3;
  isFinish?: boolean;
}
