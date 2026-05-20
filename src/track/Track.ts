/**
 * Track — Modular track system.
 * Tracks are built from segments (straight, curve, hill, loop, wallride, jump).
 * Each segment has a surface type and optional special pads.
 */

import * as THREE from 'three';
import { SurfaceType, SURFACES } from '../physics/Surfaces';

export type SegmentType = 'straight' | 'curve' | 'hill' | 'loop' | 'wallride' | 'jump' | 'spiral';

export type SpecialPadType = 'booster' | 'engine_off' | 'fragile' | 'no_steering' | 'no_brakes' | 'checkpoint' | 'finish';

export interface TrackSegment {
  type: SegmentType;
  length: number;
  surface: SurfaceType;
  curveRadius?: number;    // for curves (positive = right, negative = left)
  heightChange?: number;    // for hills
  jumpHeight?: number;      // for jumps
  loopRadius?: number;      // for loops
  wallSide?: 'left' | 'right'; // for wallrides
  spiralDirection?: 1 | -1;    // for spirals
  specialPad?: SpecialPadType;
  specialPadPosition?: number;  // 0-1 along segment
}

export interface TrackPoint {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  normal: THREE.Vector3;
  up: THREE.Vector3;
  surface: SurfaceType;
  specialPad?: SpecialPadType;
  segmentIndex: number;
}

export class Track {
  private segments: TrackSegment[] = [];
  private points: TrackPoint[] = [];
  private mesh: THREE.Group;
  private checkpoints: THREE.Group;
  private finishLine: THREE.Group | null = null;
  private resolution = 20; // points per segment

  constructor() {
    this.mesh = new THREE.Group();
    this.mesh.name = 'track';
    this.checkpoints = new THREE.Group();
    this.checkpoints.name = 'checkpoints';
  }

  addSegment(segment: TrackSegment) {
    this.segments.push(segment);
  }

  /**
   * Build the track geometry from segments
   */
  build(): void {
    this.points = [];
    this.mesh.clear();
    this.checkpoints.clear();
    this.finishLine = null;

    let pos = new THREE.Vector3(0, 0, 0);
    let dir = new THREE.Vector3(0, 0, -1); // forward = -Z
    let up = new THREE.Vector3(0, 1, 0);

    const roadWidth = 8;
    const wallHeight = 1.2;

    for (let si = 0; si < this.segments.length; si++) {
      const seg = this.segments[si];
      const pts: TrackPoint[] = [];
      const surf = SURFACES[seg.surface];
      const segmentStartPos = pos.clone();
      const segmentStartDir = dir.clone();
      const segmentStartUp = up.clone();

      for (let i = 0; i <= this.resolution; i++) {
        const t = i / this.resolution;

        const newPos = segmentStartPos.clone();
        const newDir = segmentStartDir.clone();
        const newUp = segmentStartUp.clone();

        // Sample every point from the segment start so physics and mesh stay aligned.
        this.calculateSegmentPoint(seg, t, segmentStartPos, segmentStartDir, segmentStartUp, newPos, newDir, newUp);

        // Check for special pad
        let specialPad: SpecialPadType | undefined;
        if (seg.specialPad && seg.specialPadPosition !== undefined && Math.abs(t - seg.specialPadPosition) < 0.02) {
          specialPad = seg.specialPad;
        }

        pts.push({
          position: newPos.clone(),
          direction: newDir.clone(),
          normal: newUp.clone(),
          up: newUp.clone(),
          surface: seg.surface,
          specialPad,
          segmentIndex: si,
        });
      }

      const lastPt = pts[pts.length - 1];
      pos = lastPt.position.clone();
      dir = lastPt.direction.clone();
      up = lastPt.up.clone();

      // Build road mesh for this segment
      this.buildRoadSegment(pts, roadWidth, wallHeight, surf);

      // Build special pad visual
      if (seg.specialPad && seg.specialPadPosition !== undefined) {
        const padIdx = Math.floor(seg.specialPadPosition * this.resolution);
        const padPt = pts[Math.min(padIdx, pts.length - 1)];
        if (padPt) {
          this.buildSpecialPad(padPt, seg.specialPad, roadWidth);
        }
      }

      this.points.push(...pts);
    }
  }

  private calculateSegmentPoint(
    seg: TrackSegment, t: number, startPos: THREE.Vector3,
    startDir: THREE.Vector3, startUp: THREE.Vector3,
    outPos: THREE.Vector3, outDir: THREE.Vector3, outUp: THREE.Vector3,
  ): void {
    const dist = seg.length * t;

    switch (seg.type) {
      case 'straight': {
        outPos.copy(startPos).addScaledVector(startDir, dist);
        outDir.copy(startDir);
        outUp.copy(startUp);
        break;
      }
      case 'curve': {
        const radius = seg.curveRadius || 30;
        const angle = dist / Math.abs(radius);
        const sign = radius > 0 ? 1 : -1;

        // Curve in horizontal plane
        const right = new THREE.Vector3().crossVectors(startDir, new THREE.Vector3(0, 1, 0)).normalize();
        const center = startPos.clone().addScaledVector(right, sign * radius);

        const baseAngle = Math.atan2(startPos.x - center.x, startPos.z - center.z);
        const currentAngle = baseAngle + angle * sign;

        outPos.set(
          center.x + Math.sin(currentAngle) * radius,
          startPos.y,
          center.z + Math.cos(currentAngle) * radius,
        );

        // Direction is tangent
        outDir.set(-Math.cos(currentAngle) * sign, 0, Math.sin(currentAngle) * sign);
        outUp.copy(startUp);
        break;
      }
      case 'hill': {
        const heightChange = seg.heightChange || 0;
        const straightDist = seg.length * 0.7;
        const hillDist = seg.length * 0.3;

        if (t < 0.7) {
          const st = t / 0.7;
          outPos.copy(startPos).addScaledVector(startDir, straightDist * st);
          outDir.copy(startDir);
          outUp.copy(startUp);
      } else {
          const st = (t - 0.7) / 0.3;
          const hillAngle = st * Math.PI * 0.5;
          const forward = startDir.clone();
          const upDir = startUp.clone();

          // Position: linear forward progress, cosine height curve (starts horizontal)
          outPos.copy(startPos)
            .addScaledVector(startDir, straightDist + hillDist * st)
            .addScaledVector(upDir, heightChange * (1 - Math.cos(hillAngle)));

          // Direction: tangent to the cosine height curve
          const tangentUp = heightChange * (Math.PI / 2) * Math.sin(hillAngle);
          outDir.copy(forward).multiplyScalar(hillDist)
            .addScaledVector(upDir, tangentUp).normalize();
          outUp.copy(startUp);
      }
        break;
      }
      case 'loop': {
        const radius = seg.loopRadius || 10;
        const angle = (dist / (Math.PI * 2 * radius)) * Math.PI * 2;

        const forward = startDir.clone();
        const upDir = startUp.clone();

        outPos.copy(startPos)
          .addScaledVector(forward, radius * (1 - Math.cos(angle)))
          .addScaledVector(upDir, radius * Math.sin(angle));

        outDir.copy(forward).multiplyScalar(Math.sin(angle))
          .addScaledVector(upDir, Math.cos(angle)).normalize();

        // Up vector rotates with loop
        const right = new THREE.Vector3().crossVectors(forward, upDir).normalize();
        outUp.copy(upDir).multiplyScalar(Math.cos(angle))
          .addScaledVector(forward, -Math.sin(angle)).normalize();
        break;
      }
      case 'wallride': {
        const side = seg.wallSide === 'right' ? 1 : -1;
        const wallDist = 6;

        // Drive up wall
        const straightDist = seg.length * 0.5;
        if (t < 0.5) {
          outPos.copy(startPos).addScaledVector(startDir, straightDist * (t / 0.5));
          outDir.copy(startDir);
          outUp.copy(startUp);
        } else {
          const st = (t - 0.5) / 0.5;
          const wallAngle = st * Math.PI * 0.45;

          const right = new THREE.Vector3().crossVectors(startDir, startUp).normalize().multiplyScalar(side);

          outPos.copy(startPos)
            .addScaledVector(startDir, straightDist)
            .addScaledVector(right, wallDist * (1 - Math.cos(wallAngle)))
            .addScaledVector(startUp, wallDist * Math.sin(wallAngle));

          outDir.copy(startDir).multiplyScalar(Math.cos(wallAngle))
            .addScaledVector(startUp, Math.sin(wallAngle)).normalize();
          outUp.copy(right);
        }
        break;
      }
      case 'jump': {
        const jumpH = seg.jumpHeight || 8;
        const rampFwd = seg.length * 0.3;
        const rampH = jumpH * 0.3;
        const arcFwd = seg.length * 0.4;
        const landFwd = seg.length * 0.3;

        if (t < 0.3) {
          // Ramp up — straight line from (0,0) to (rampFwd, rampH)
          const st = t / 0.3;
          outPos.copy(startPos)
            .addScaledVector(startDir, rampFwd * st)
            .addScaledVector(startUp, rampH * st);
          const rampAngle = Math.atan2(rampH, rampFwd);
          outDir.copy(startDir).multiplyScalar(Math.cos(rampAngle))
            .addScaledVector(startUp, Math.sin(rampAngle)).normalize();
          outUp.copy(startUp);
        } else if (t < 0.7) {
          // Airborne arc — sine arc from rampH to jumpH peak and back to rampH
          const st = (t - 0.3) / 0.4;
          const arcH = (jumpH - rampH) * Math.sin(st * Math.PI);
          outPos.copy(startPos)
            .addScaledVector(startDir, rampFwd + arcFwd * st)
            .addScaledVector(startUp, rampH + arcH);
          outDir.copy(startDir);
          outUp.copy(startUp);
        } else {
          // Landing — linear forward, linear descent from rampH to 0
          const st = (t - 0.7) / 0.3;
          outPos.copy(startPos)
            .addScaledVector(startDir, rampFwd + arcFwd + landFwd * st)
            .addScaledVector(startUp, rampH * (1 - st));
          const landAngle = Math.atan2(rampH, landFwd);
          outDir.copy(startDir).multiplyScalar(Math.cos(landAngle * st))
            .addScaledVector(startUp, -Math.sin(landAngle * st)).normalize();
          outUp.copy(startUp);
        }
        break;
      }
      case 'spiral': {
        const dir = seg.spiralDirection || 1;
        const radius = 15;
        const totalAngle = dist * 0.3 * dir;

        const right = new THREE.Vector3().crossVectors(startDir, startUp).normalize();
        const progress = startDir.clone().multiplyScalar(dist * Math.cos(totalAngle * 0.3));
        const lateral = right.clone().multiplyScalar(Math.sin(totalAngle) * radius * 0.3);
        const vertical = startUp.clone().multiplyScalar(Math.sin(totalAngle * 0.5) * 3);

        outPos.copy(startPos).add(progress).add(lateral).add(vertical);
        outDir.copy(startDir)
          .addScaledVector(right, Math.cos(totalAngle) * 0.3 * dir)
          .normalize();
        outUp.copy(startUp);
        break;
      }
    }
  }

  private buildRoadSegment(
    pts: TrackPoint[],
    width: number,
    wallHeight: number,
    surf: typeof SURFACES['asphalt'],
  ): void {
    if (pts.length < 2) return;

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const r = (surf.color >> 16) & 0xff;
    const g = (surf.color >> 8) & 0xff;
    const b = surf.color & 0xff;

    // Generate vertices for road surface
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i];
      const dir = pt.direction.clone().normalize();
      const up = pt.normal.clone().normalize();
      const right = new THREE.Vector3().crossVectors(dir, up).normalize();

      // Left and right edges
      const left = pt.position.clone().addScaledVector(right, -width / 2);
      const rightEdge = pt.position.clone().addScaledVector(right, width / 2);

      vertices.push(left.x, left.y, left.z);
      vertices.push(rightEdge.x, rightEdge.y, rightEdge.z);

      const colorVar = (i % 2 === 0) ? 0 : 0.03; // subtle checkerboard
      colors.push(r / 255 + colorVar, g / 255 + colorVar, b / 255 + colorVar);
      colors.push(r / 255 + colorVar, g / 255 + colorVar, b / 255 + colorVar);

      // Wall vertices
      const wallLeft = left.clone().addScaledVector(up, wallHeight);
      const wallRight = rightEdge.clone().addScaledVector(up, wallHeight);
      vertices.push(wallLeft.x, wallLeft.y, wallLeft.z);
      vertices.push(wallRight.x, wallRight.y, wallRight.z);
      colors.push(0.6, 0.6, 0.65);
      colors.push(0.6, 0.6, 0.65);
    }

    // Generate indices
    const vertsPerPt = 4;
    for (let i = 0; i < pts.length - 1; i++) {
      const base = i * vertsPerPt;
      // Road surface
      indices.push(base, base + 1, base + vertsPerPt);
      indices.push(base + 1, base + vertsPerPt + 1, base + vertsPerPt);
      // Left wall
      indices.push(base + 2, base, base + vertsPerPt);
      indices.push(base + 2, base + vertsPerPt, base + vertsPerPt + 2);
      // Right wall
      indices.push(base + 1, base + 3, base + vertsPerPt + 3);
      indices.push(base + 1, base + vertsPerPt + 3, base + vertsPerPt + 1);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      shininess: surf.type === 'ice' ? 100 : surf.type === 'plastic' ? 80 : 20,
      transparent: surf.type === 'ice',
      opacity: surf.type === 'ice' ? 0.85 : 1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.mesh.add(mesh);
  }

  private buildSpecialPad(pt: TrackPoint, type: SpecialPadType, roadWidth: number): void {
    const dir = pt.direction.clone().normalize();
    const up = pt.normal.clone().normalize();
    const right = new THREE.Vector3().crossVectors(dir, up).normalize();

    let color: number;
    let emissive: number;
    let scale = 1;

    switch (type) {
      case 'booster':
        color = 0xFFD700;
        emissive = 0xFF8800;
        scale = 1.2;
        break;
      case 'engine_off':
        color = 0x333333;
        emissive = 0x220000;
        break;
      case 'fragile':
        color = 0xFF69B4;
        emissive = 0xFF1493;
        break;
      case 'no_steering':
        color = 0x00FF00;
        emissive = 0x00AA00;
        break;
      case 'no_brakes':
        color = 0xFF0000;
        emissive = 0xAA0000;
        break;
      case 'checkpoint':
        color = 0x4488FF;
        emissive = 0x2244AA;
        scale = 1;
        // Build arch
        this.buildCheckpointArch(pt, roadWidth);
        return;
      case 'finish':
        color = 0xFFFFFF;
        emissive = 0x888888;
        scale = 1;
        this.buildFinishLine(pt, roadWidth);
        return;
      default:
        color = 0x888888;
        emissive = 0x444444;
    }

    const padGeo = new THREE.PlaneGeometry(roadWidth * 0.8 * scale, 1.5 * scale);
    const padMat = new THREE.MeshPhongMaterial({
      color,
      emissive,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.copy(pt.position).addScaledVector(up, 0.05);
    pad.lookAt(pt.position.clone().add(dir));
    pad.rotateX(Math.PI / 2);
    this.mesh.add(pad);
  }

  private buildCheckpointArch(pt: TrackPoint, roadWidth: number): void {
    const dir = pt.direction.clone().normalize();
    const up = pt.normal.clone().normalize();
    const right = new THREE.Vector3().crossVectors(dir, up).normalize();

    const archHeight = 5;
    const archMat = new THREE.MeshPhongMaterial({
      color: 0x4488FF,
      emissive: 0x2244AA,
      emissiveIntensity: 0.3,
    });

    // Two pillars
    for (const side of [-1, 1]) {
      const pillarGeo = new THREE.BoxGeometry(0.3, archHeight, 0.3);
      const pillar = new THREE.Mesh(pillarGeo, archMat);
      pillar.position.copy(pt.position)
        .addScaledVector(right, side * roadWidth / 2)
        .addScaledVector(up, archHeight / 2);
      this.checkpoints.add(pillar);
    }

    // Top bar
    const barGeo = new THREE.BoxGeometry(roadWidth + 0.6, 0.3, 0.3);
    const bar = new THREE.Mesh(barGeo, archMat);
    bar.position.copy(pt.position)
      .addScaledVector(up, archHeight);
    this.checkpoints.add(bar);

    // Checkpoint plane (invisible collision marker)
    const planeGeo = new THREE.PlaneGeometry(roadWidth, archHeight);
    const planeMat = new THREE.MeshBasicMaterial({
      visible: false,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.copy(pt.position).addScaledVector(up, archHeight / 2);
    plane.lookAt(pt.position.clone().add(dir));
    plane.userData.isCheckpoint = true;
    this.checkpoints.add(plane);
  }

  private buildFinishLine(pt: TrackPoint, roadWidth: number): void {
    const dir = pt.direction.clone().normalize();
    const up = pt.normal.clone().normalize();
    const right = new THREE.Vector3().crossVectors(dir, up).normalize();

    const archHeight = 6;
    const archMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      emissive: 0x444444,
      emissiveIntensity: 0.3,
    });

    // Two pillars
    for (const side of [-1, 1]) {
      const pillarGeo = new THREE.BoxGeometry(0.4, archHeight, 0.4);
      const pillar = new THREE.Mesh(pillarGeo, archMat);
      pillar.position.copy(pt.position)
        .addScaledVector(right, side * roadWidth / 2)
        .addScaledVector(up, archHeight / 2);
      this.checkpoints.add(pillar);
    }

    // Top bar with "FINISH"
    const barGeo = new THREE.BoxGeometry(roadWidth + 1, 0.5, 0.4);
    const bar = new THREE.Mesh(barGeo, archMat);
    bar.position.copy(pt.position)
      .addScaledVector(up, archHeight);
    this.checkpoints.add(bar);

    // Checkered floor pattern
    const checkGeo = new THREE.PlaneGeometry(roadWidth, 2);
    const checkMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      emissive: 0x222222,
      side: THREE.DoubleSide,
    });
    const check = new THREE.Mesh(checkGeo, checkMat);
    check.position.copy(pt.position).addScaledVector(up, 0.05);
    check.lookAt(pt.position.clone().add(dir));
    check.rotateX(Math.PI / 2);
    this.checkpoints.add(check);

    this.finishLine = new THREE.Group();
    this.finishLine.position.copy(pt.position);
    this.finishLine.userData.isFinish = true;
  }

  /**
   * Query ground height and surface at a position
   */
  queryGround(x: number, z: number): { y: number; normal: THREE.Vector3; surface: SurfaceType } | null {
    let closestDist = Infinity;
    let result: { y: number; normal: THREE.Vector3; surface: SurfaceType } | null = null;

    // Search nearby track points
    for (let i = 0; i < this.points.length; i += 2) {
      const pt = this.points[i];
      const dx = pt.position.x - x;
      const dz = pt.position.z - z;
      const dist = dx * dx + dz * dz;

      if (dist < closestDist && dist < 100) {
        closestDist = dist;
        result = {
          y: pt.position.y,
          normal: pt.normal.clone(),
          surface: pt.surface,
        };
      }
    }

    return result;
  }

  /**
   * Check if position is near a special pad
   */
  querySpecialPad(x: number, y: number, z: number): SpecialPadType | null {
    for (const pt of this.points) {
      if (!pt.specialPad) continue;
      if (pt.specialPad === 'checkpoint' || pt.specialPad === 'finish') continue;

      const dx = pt.position.x - x;
      const dy = pt.position.y - y;
      const dz = pt.position.z - z;
      const dist = dx * dx + dy * dy + dz * dz;

      if (dist < 9) { // 3 unit radius
        return pt.specialPad;
      }
    }
    return null;
  }

  /**
   * Check if near a checkpoint
   */
  queryCheckpoint(x: number, z: number): boolean {
    for (const pt of this.points) {
      if (pt.specialPad !== 'checkpoint') continue;
      const dx = pt.position.x - x;
      const dz = pt.position.z - z;
      if (dx * dx + dz * dz < 25) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if near finish line
   */
  queryFinish(x: number, z: number): boolean {
    for (const pt of this.points) {
      if (pt.specialPad !== 'finish') continue;
      const dx = pt.position.x - x;
      const dz = pt.position.z - z;
      if (dx * dx + dz * dz < 25) {
        return true;
      }
    }
    return false;
  }

  /**
   * Count checkpoints
   */
  countCheckpoints(): number {
    let count = 0;
    for (const pt of this.points) {
      if (pt.specialPad === 'checkpoint') count++;
    }
    return count;
  }

  /**
   * Get start position and direction
   */
  getStartInfo(): { position: THREE.Vector3; direction: THREE.Vector3 } {
    if (this.points.length === 0) {
      return { position: new THREE.Vector3(0, 1, 0), direction: new THREE.Vector3(0, 0, -1) };
    }
    const first = this.points[0];
    return {
      position: first.position.clone(),
      direction: first.direction.clone(),
    };
  }

  getMesh(): THREE.Group {
    return this.mesh;
  }

  getCheckpoints(): THREE.Group {
    return this.checkpoints;
  }

  getPoints(): TrackPoint[] {
    return this.points;
  }

  getSegments(): TrackSegment[] {
    return this.segments;
  }
}