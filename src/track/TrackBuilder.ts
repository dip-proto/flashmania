import * as THREE from 'three';
import { Vec3 } from '../engine/Vector.js';
import { SurfaceType, BlockEffect, SURFACE_PROPS } from '../engine/Physics.js';
import { TrackBlock, TrackDefinition } from './types.js';

/** Colors for special effects */
const EFFECT_COLORS: Record<string, number> = {
  [BlockEffect.Booster]: 0xFFD700,     // Gold
  [BlockEffect.EngineOff]: 0xFF0000,   // Red
  [BlockEffect.Fragile]: 0xFF69B4,     // Pink
  [BlockEffect.NoSteer]: 0x00FFFF,     // Cyan
  [BlockEffect.NoBrake]: 0xFF4500,     // Orange-red
  [BlockEffect.Start]: 0x00FF00,       // Green
  [BlockEffect.Finish]: 0xFF1493,      // Deep Pink
  [BlockEffect.Checkpoint]: 0xFFFFFF,  // White
};

const CHECKPOINT_SEMI_ALPHA = 0.3;

export class TrackMeshBuilder {
  private meshes: THREE.Object3D[] = [];
  private collisionBoxes: { min: Vec3; max: Vec3; surface: SurfaceType; effect: BlockEffect }[] = [];

  /** Build track meshes from a track definition */
  build(trackDef: TrackDefinition): THREE.Group {
    const group = new THREE.Group();
    this.meshes = [];
    this.collisionBoxes = [];

    for (const block of trackDef.blocks) {
      const meshes = this.createBlockMesh(block);
      for (const mesh of meshes) {
        group.add(mesh);
        this.meshes.push(mesh);
      }
      this.addCollisionBox(block);
    }

    return group;
  }

  /** Get collision boxes for physics */
  getCollisionBoxes(): { min: Vec3; max: Vec3; surface: SurfaceType; effect: BlockEffect }[] {
    return this.collisionBoxes;
  }

  private addCollisionBox(block: TrackBlock): void {
    const hw = block.scale.x * 0.5;
    const hh = block.scale.y * 0.5;
    const hl = block.scale.z * 0.5;
    const pos = block.position;
    const sinR = Math.sin(block.rotation);
    const cosR = Math.cos(block.rotation);
    const pitch = block.pitch ?? 0;
    const roll = block.roll ?? 0;

    // For pitched/rolled blocks, expand the collision volume
    // to ensure the car can land on tilted surfaces
    const verticalExpansion = Math.abs(Math.sin(pitch)) * hl + Math.abs(Math.sin(roll)) * hw;

    // Rotated bounding box (approximate as AABB for simplicity)
    const extentX = Math.abs(hw * cosR) + Math.abs(hl * sinR) + 2;
    const extentZ = Math.abs(hw * sinR) + Math.abs(hl * cosR) + 2;

    this.collisionBoxes.push({
      min: new Vec3(pos.x - extentX, pos.y - hh - verticalExpansion, pos.z - extentZ),
      max: new Vec3(pos.x + extentX, pos.y + hh + verticalExpansion + 1, pos.z + extentZ),
      surface: block.surface,
      effect: block.effect,
    });
  }

  private createBlockMesh(block: TrackBlock): THREE.Object3D[] {
    const results: THREE.Object3D[] = [];
    const geo = new THREE.BoxGeometry(block.scale.x, block.scale.y, block.scale.z);

    let color = SURFACE_PROPS[block.surface]?.color ?? 0x666666;
    if (block.effect && EFFECT_COLORS[block.effect]) {
      color = EFFECT_COLORS[block.effect];
    }

    const isTransparent = block.effect === BlockEffect.Checkpoint;
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: block.surface === SurfaceType.Ice ? 0.1 : block.surface === SurfaceType.Plastic ? 0.3 : 0.7,
      metalness: block.surface === SurfaceType.Ice ? 0.8 : 0.1,
      transparent: isTransparent,
      opacity: isTransparent ? CHECKPOINT_SEMI_ALPHA : 1.0,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(block.position.x, block.position.y, block.position.z);
    mesh.rotation.y = block.rotation;
    if (block.pitch) mesh.rotation.x = block.pitch;
    if (block.roll) mesh.rotation.z = block.roll;

    // Add edge lines for visibility
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });
    const line = new THREE.LineSegments(edges, lineMat);
    line.position.copy(mesh.position);
    line.rotation.copy(mesh.rotation);
    results.push(mesh);
    results.push(line);

    // Add booster animation indicator
    if (block.effect === BlockEffect.Booster) {
      const arrowGeo = new THREE.ConeGeometry(0.5, 2, 4);
      const arrowMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFF8800, emissiveIntensity: 0.5 });
      const arrow = new THREE.Mesh(arrowGeo, arrowMat);
      arrow.position.set(block.position.x, block.position.y + block.scale.y * 0.5 + 1, block.position.z);
      arrow.rotation.z = -Math.PI / 2;
      results.push(arrow);
    }

    // Start/finish gate markers
    if (block.effect === BlockEffect.Start || block.effect === BlockEffect.Finish || block.effect === BlockEffect.Checkpoint) {
      const gateColor = block.effect === BlockEffect.Start ? 0x00FF00 :
                        block.effect === BlockEffect.Finish ? 0xFF1493 : 0x4444FF;
      const gateHeight = 5;
      const poleGeo = new THREE.CylinderGeometry(0.15, 0.15, gateHeight, 6);
      const poleMat = new THREE.MeshStandardMaterial({ color: gateColor, emissive: gateColor, emissiveIntensity: 0.3 });

      const leftPole = new THREE.Mesh(poleGeo, poleMat);
      leftPole.position.set(block.position.x - block.scale.x * 0.5, block.position.y + gateHeight * 0.5, block.position.z);
      results.push(leftPole);

      const rightPole = new THREE.Mesh(poleGeo, poleMat);
      rightPole.position.set(block.position.x + block.scale.x * 0.5, block.position.y + gateHeight * 0.5, block.position.z);
      results.push(rightPole);

      // Crossbar
      const barGeo = new THREE.BoxGeometry(block.scale.x, 0.2, 0.2);
      const barMat = new THREE.MeshStandardMaterial({ color: gateColor, emissive: gateColor, emissiveIntensity: 0.3 });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(block.position.x, block.position.y + gateHeight, block.position.z);
      results.push(bar);
    }

    return results;
  }
}

/** Check what surface the car is driving on at a given position */
export function querySurface(
  pos: Vec3,
  collisionBoxes: { min: Vec3; max: Vec3; surface: SurfaceType; effect: BlockEffect }[]
): { surface: SurfaceType; effect: BlockEffect } {
  let bestSurface: SurfaceType = SurfaceType.None;
  let bestEffect: BlockEffect = BlockEffect.None;
  let bestY = -Infinity;

  for (const box of collisionBoxes) {
    // Check if position is within the XZ bounds of this block (generous tolerance)
    const tol = 1.5;
    if (pos.x >= box.min.x - tol && pos.x <= box.max.x + tol &&
        pos.z >= box.min.z - tol && pos.z <= box.max.z + tol) {
      // Check if the car is near this block vertically
      if (pos.y >= box.min.y - 0.5 && pos.y <= box.max.y + 1.5) {
        // Prefer the highest block that supports the car
        if (box.max.y > bestY && box.max.y <= pos.y + 1.5) {
          bestY = box.max.y;
          bestSurface = box.surface;
          bestEffect = box.effect;
        }
      }
    }
  }

  // If no surface found and we're near ground level, default to asphalt
  if (bestSurface === SurfaceType.None && pos.y < 1.5) {
    bestSurface = SurfaceType.Asphalt;
  }

  return { surface: bestSurface, effect: bestEffect };
}