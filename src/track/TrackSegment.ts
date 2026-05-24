import * as THREE from 'three';
import { SurfaceType, SURFACE_PROPS, SpecialPad } from '../types/Surface';

export class TrackSegment {
  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshStandardMaterial;
  public mesh: THREE.Mesh;
  public position: THREE.Vector3;
  public rotation: THREE.Euler;
  public surfaceType: SurfaceType;
  public specialPad: SpecialPad;

  constructor(
    width: number = 8,
    length: number = 10,
    height: number = 1.5,
    surface: SurfaceType = SurfaceType.ASPHALT,
    pad: SpecialPad = SpecialPad.NONE
  ) {
    this.geometry = new THREE.BoxGeometry(width, height, length);
    const props = SURFACE_PROPS[surface];

    if (pad === SpecialPad.BOOSTER) {
      // Boosters are golden
      this.material = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x332200,
        emissiveIntensity: 0.3,
      });
    } else if (pad === SpecialPad.ENGINE_OFF) {
      this.material = new THREE.MeshStandardMaterial({
        color: 0xFF4444,
        metalness: 0.3,
        roughness: 0.5,
        emissive: 0x331111,
        emissiveIntensity: 0.2,
      });
    } else if (pad === SpecialPad.FRAGILE) {
      this.material = new THREE.MeshStandardMaterial({
        color: 0xAA44FF,
        metalness: 0.3,
        roughness: 0.5,
        emissive: 0x221133,
        emissiveIntensity: 0.2,
      });
    } else if (pad === SpecialPad.NO_STEERING) {
      this.material = new THREE.MeshStandardMaterial({
        color: 0xFF8800,
        metalness: 0.3,
        roughness: 0.5,
        emissive: 0x332200,
        emissiveIntensity: 0.2,
      });
    } else if (pad === SpecialPad.NO_BRAKES) {
      this.material = new THREE.MeshStandardMaterial({
        color: 0x44FF88,
        metalness: 0.3,
        roughness: 0.5,
        emissive: 0x113322,
        emissiveIntensity: 0.2,
      });
    } else {
      this.material = new THREE.MeshStandardMaterial({
        color: props.color,
        metalness: 0.1,
        roughness: surface === SurfaceType.ICE ? 0.1 : 0.8,
      });
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.position = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0);
    this.surfaceType = surface;
    this.specialPad = pad;
  }

  setPosition(x: number, y: number, z: number): void {
    this.position.set(x, y, z);
    this.mesh.position.copy(this.position);
  }

  setRotation(yaw: number, pitch: number = 0, roll: number = 0): void {
    this.rotation.set(pitch, yaw, roll);
    this.mesh.rotation.copy(this.rotation);
  }

  getSurfaceType(): SurfaceType {
    return this.surfaceType;
  }

  getSpecialPad(): SpecialPad {
    return this.specialPad;
  }
}
