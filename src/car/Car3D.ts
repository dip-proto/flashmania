/**
 * Car3D — Visual representation of the car.
 */

import * as THREE from 'three';
import { VehicleState } from '../physics/VehiclePhysics';

export class Car3D {
  private group: THREE.Group;
  private body!: THREE.Mesh;
  private wheels: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.buildCar();
  }

  private buildCar(): void {
    // Body
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.6, 3.2);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: 0xff3300,
      emissive: 0x330000,
      shininess: 80,
    });
    this.body = new THREE.Mesh(bodyGeo, bodyMat);
    this.body.position.y = 0.3;
    this.group.add(this.body);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.5, 1.5);
    const cabinMat = new THREE.MeshPhongMaterial({
      color: 0x333355,
      emissive: 0x111122,
      shininess: 100,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.75, -0.2);
    this.group.add(cabin);

    // Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.6, 0.08, 0.4);
    const spoilerMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const spoiler = new THREE.Mesh(spoilerGeo, spoilerMat);
    spoiler.position.set(0, 0.8, 1.4);
    this.group.add(spoiler);

    // Spoiler supports
    for (const x of [-0.6, 0.6]) {
      const supportGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
      const support = new THREE.Mesh(supportGeo, spoilerMat);
      support.position.set(x, 0.6, 1.4);
      this.group.add(support);
    }

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 12);
    const wheelMat = new THREE.MeshPhongMaterial({ color: 0x111111 });
    const wheelPositions = [
      { x: -1, y: -0.1, z: -1 },
      { x: 1, y: -0.1, z: -1 },
      { x: -1, y: -0.1, z: 1 },
      { x: 1, y: -0.1, z: 1 },
    ];

    for (const pos of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos.x, pos.y, pos.z);
      this.wheels.push(wheel);
      this.group.add(wheel);
    }

    // Headlights
    for (const x of [-0.6, 0.6]) {
      const lightGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMat = new THREE.MeshPhongMaterial({
        color: 0xffffcc,
        emissive: 0xffffaa,
        emissiveIntensity: 0.8,
      });
      const light = new THREE.Mesh(lightGeo, lightMat);
      light.position.set(x, 0.3, -1.6);
      this.group.add(light);
    }

    // Taillights
    for (const x of [-0.6, 0.6]) {
      const tailGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const tailMat = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
      });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.set(x, 0.3, 1.6);
      this.group.add(tail);
    }
  }

  update(state: VehicleState): void {
    this.group.position.set(state.x, state.y, state.z);
    this.group.rotation.set(state.pitch, state.yaw, state.roll);

    // Wheel rotation based on speed
    const wheelAngle = state.speed * 0.3;
    for (const wheel of this.wheels) {
      wheel.rotation.x = wheelAngle;
    }
  }

  getGroup(): THREE.Group {
    return this.group;
  }
}