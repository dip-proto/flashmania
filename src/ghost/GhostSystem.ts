/**
 * GhostSystem — Records and replays car positions as ghost cars.
 */

import * as THREE from 'three';

export interface GhostFrame {
  x: number; y: number; z: number;
  yaw: number; pitch: number; roll: number;
  time: number;
}

export class GhostSystem {
  private recording: GhostFrame[] = [];
  private isRecording = false;
  private startTime = 0;
  private ghostMesh: THREE.Group;
  private ghostTrail: THREE.Line | null = null;
  private frameInterval = 1 / 30; // Record at 30fps
  private lastRecordTime = 0;

  constructor() {
    this.ghostMesh = new THREE.Group();
    this.ghostMesh.name = 'ghosts';
    this.buildGhostCar();
  }

  private buildGhostCar(): void {
    // Semi-transparent ghost car
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.6, 3.2);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: 0x8888ff,
      transparent: true,
      opacity: 0.4,
      shininess: 80,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    this.ghostMesh.add(body);

    const cabinGeo = new THREE.BoxGeometry(1.4, 0.5, 1.5);
    const cabinMat = new THREE.MeshPhongMaterial({
      color: 0x333355,
      transparent: true,
      opacity: 0.3,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.75, -0.2);
    this.ghostMesh.add(cabin);
  }

  startRecording(): void {
    this.recording = [];
    this.isRecording = true;
    this.startTime = performance.now();
    this.lastRecordTime = 0;
  }

  stopRecording(): void {
    this.isRecording = false;
  }

  recordFrame(x: number, y: number, z: number, yaw: number, pitch: number, roll: number): void {
    if (!this.isRecording) return;

    const elapsed = (performance.now() - this.startTime) / 1000;
    if (elapsed - this.lastRecordTime >= this.frameInterval) {
      this.lastRecordTime = elapsed;
      this.recording.push({ x, y, z, yaw, pitch, roll, time: elapsed });
    }
  }

  /**
   * Update ghost position based on current race time
   */
  update(currentTime: number): boolean {
    if (this.recording.length === 0) return false;

    // Find the frame closest to current time
    let frame = this.recording[0];
    for (let i = 0; i < this.recording.length; i++) {
      if (this.recording[i].time <= currentTime) {
        frame = this.recording[i];
      } else {
        break;
      }
    }

    this.ghostMesh.position.set(frame.x, frame.y, frame.z);
    this.ghostMesh.rotation.set(frame.pitch, frame.yaw, frame.roll);
    this.ghostMesh.visible = true;

    return true;
  }

  hide(): void {
    this.ghostMesh.visible = false;
  }

  show(): void {
    if (this.recording.length > 0) {
      this.ghostMesh.visible = true;
    }
  }

  hasRecording(): boolean {
    return this.recording.length > 0;
  }

  getRecording(): GhostFrame[] {
    return [...this.recording];
  }

  getBestTime(): number | null {
    if (this.recording.length === 0) return null;
    return this.recording[this.recording.length - 1].time;
  }

  clear(): void {
    this.recording = [];
    this.isRecording = false;
    this.hide();
  }

  getGroup(): THREE.Group {
    return this.ghostMesh;
  }

  getFrameCount(): number {
    return this.recording.length;
  }
}