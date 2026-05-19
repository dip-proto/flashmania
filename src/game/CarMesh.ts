import * as THREE from 'three';
import { CarState } from '../engine/Physics.js';
import { Vec3 } from '../engine/Vector.js';

/** Creates and manages the 3D car mesh */
export class CarMesh {
  private group: THREE.Group;
  private bodyMat!: THREE.MeshStandardMaterial;
  private wheelMeshes: THREE.Mesh[] = [];
  private headlightMeshes: THREE.Mesh[] = [];
  private taillightMeshes: THREE.Mesh[] = [];
  private steerAngle = 0;

  constructor(private scene: THREE.Scene) {
    this.group = new THREE.Group();
    this.createCarModel();
    this.scene.add(this.group);
  }

  private createCarModel(): void {
    // Car body - sleek shape
    const bodyGeo = new THREE.BoxGeometry(2.0, 0.8, 4.2);
    this.bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0066FF,
      metalness: 0.8,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, this.bodyMat);
    body.position.y = 0.4;
    body.castShadow = true;
    this.group.add(body);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.6, 0.5, 2.0);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x222244,
      metalness: 0.5,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.y = 1.05;
    cabin.position.z = -0.2;
    this.group.add(cabin);

    // Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.8, 0.08, 0.4);
    const spoilerMat = new THREE.MeshStandardMaterial({ color: 0x0044CC, metalness: 0.5, roughness: 0.3 });
    const spoiler = new THREE.Mesh(spoilerGeo, spoilerMat);
    spoiler.position.y = 1.4;
    spoiler.position.z = 1.8;
    this.group.add(spoiler);
    // Spoiler supports
    const supportGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const supportL = new THREE.Mesh(supportGeo, spoilerMat);
    supportL.position.set(-0.7, 1.2, 1.8);
    this.group.add(supportL);
    const supportR = new THREE.Mesh(supportGeo, spoilerMat);
    supportR.position.set(0.7, 1.2, 1.8);
    this.group.add(supportR);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 });

    const wheelPositions = [
      { x: -1.1, y: 0.35, z: -1.3 },  // FL
      { x: 1.1, y: 0.35, z: -1.3 },   // FR
      { x: -1.1, y: 0.35, z: 1.3 },   // RL
      { x: 1.1, y: 0.35, z: 1.3 },    // RR
    ];

    for (const wp of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wp.x, wp.y, wp.z);
      wheel.castShadow = true;
      this.group.add(wheel);
      this.wheelMeshes.push(wheel);
    }

    // Headlights (front)
    const headlightGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const headlightMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFAA, emissiveIntensity: 0.8 });
    const headlightL = new THREE.Mesh(headlightGeo, headlightMat);
    headlightL.position.set(-0.7, 0.6, -2.1);
    this.group.add(headlightL);
    this.headlightMeshes.push(headlightL);
    const headlightR = new THREE.Mesh(headlightGeo, headlightMat);
    headlightR.position.set(0.7, 0.6, -2.1);
    this.group.add(headlightR);
    this.headlightMeshes.push(headlightR);

    // Taillights (back)
    const taillightGeo = new THREE.BoxGeometry(0.3, 0.15, 0.05);
    const taillightMat = new THREE.MeshStandardMaterial({ color: 0xFF0000, emissive: 0xFF0000, emissiveIntensity: 0.3 });
    const taillightL = new THREE.Mesh(taillightGeo, taillightMat);
    taillightL.position.set(-0.7, 0.6, 2.1);
    this.group.add(taillightL);
    this.taillightMeshes.push(taillightL);
    const taillightR = new THREE.Mesh(taillightGeo, taillightMat);
    taillightR.position.set(0.7, 0.6, 2.1);
    this.group.add(taillightR);
    this.taillightMeshes.push(taillightR);

    // Headlight spots
    const spotL = new THREE.SpotLight(0xFFFFCC, 5, 30, Math.PI / 6, 0.5);
    spotL.position.set(-0.7, 0.6, -2.1);
    spotL.target.position.set(-0.7, 0, -15);
    this.group.add(spotL);
    this.group.add(spotL.target);

    const spotR = new THREE.SpotLight(0xFFFFCC, 5, 30, Math.PI / 6, 0.5);
    spotR.position.set(0.7, 0.6, -2.1);
    spotR.target.position.set(0.7, 0, -15);
    this.group.add(spotR);
    this.group.add(spotR.target);
  }

  update(state: CarState, dt: number): void {
    // Position
    this.group.position.set(state.position.x, state.position.y, state.position.z);

    // Rotation from quaternion
    this.group.quaternion.set(state.rotation.x, state.rotation.y, state.rotation.z, state.rotation.w);

    // Wheel spin based on speed
    const spinSpeed = state.speed * 3;
    for (const wheel of this.wheelMeshes) {
      wheel.rotation.x += spinSpeed * dt;
    }

    // Body color changes for effects
    if (state.isBoosting) {
      this.bodyMat.emissive.setHex(0xFF8800);
      this.bodyMat.emissiveIntensity = 0.5;
    } else if (state.isEngineOff) {
      this.bodyMat.emissive.setHex(0x330000);
      this.bodyMat.emissiveIntensity = 0.3;
    } else if (state.isFragile) {
      this.bodyMat.emissive.setHex(0xFF69B4);
      this.bodyMat.emissiveIntensity = 0.2;
    } else {
      this.bodyMat.emissive.setHex(0x000000);
      this.bodyMat.emissiveIntensity = 0;
    }

    // Brake lights brighter when braking
    for (const tail of this.taillightMeshes) {
      const mat = tail.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = state.isBraking ? 1.0 : 0.3;
    }

    // Steering visual on front wheels
    this.steerAngle += (state.steeringAngle * 0.5 - this.steerAngle) * 10 * dt;
    this.wheelMeshes[0].rotation.y = this.steerAngle;
    this.wheelMeshes[1].rotation.y = this.steerAngle;
  }

  /** Create a ghost (translucent) version of this car */
  createGhost(): CarGhostMesh {
    return new CarGhostMesh(this.scene);
  }

  setPosition(pos: Vec3): void {
    this.group.position.set(pos.x, pos.y, pos.z);
  }

  dispose(): void {
    this.scene.remove(this.group);
  }
}

/** Ghost car mesh - translucent, no collision */
export class CarGhostMesh {
  private group: THREE.Group;

  constructor(private scene: THREE.Scene) {
    this.group = new THREE.Group();
    this.createGhostModel();
    this.scene.add(this.group);
  }

  private createGhostModel(): void {
    const bodyGeo = new THREE.BoxGeometry(2.0, 0.8, 4.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.4;
    this.group.add(body);

    const cabinGeo = new THREE.BoxGeometry(1.6, 0.5, 2.0);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x88AACC,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.y = 1.05;
    cabin.position.z = -0.2;
    this.group.add(cabin);
  }

  update(position: Vec3, rotation: { x: number; y: number; z: number; w: number }): void {
    this.group.position.set(position.x, position.y, position.z);
    this.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  dispose(): void {
    this.scene.remove(this.group);
  }
}