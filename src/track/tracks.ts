import { Vec3 } from '../engine/Vector.js';
import { SurfaceType, BlockEffect } from '../engine/Physics.js';
import { TrackBlock, TrackDefinition, BLOCK_SIZE } from './types.js';

interface PathPoint {
  x: number;
  y: number;
  z: number;
  surface?: SurfaceType;
  effect?: BlockEffect;
  isCheckpoint?: boolean;
  checkpointIndex?: number;
  pitch?: number;  // Radians - tilt forward/back (positive = uphill)
  roll?: number;   // Radians - banking (positive = left bank)
}

/**
 * Generate a continuous road from path points.
 * Each pair of consecutive points gets a road block between them.
 */
function buildRoadFromPoints(
  points: PathPoint[],
  defaultSurface: SurfaceType = SurfaceType.Asphalt,
  roadWidth: number = BLOCK_SIZE * 2.5,
  roadHeight: number = 1,
): TrackBlock[] {
  const blocks: TrackBlock[] = [];

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const surface = p.surface ?? defaultSurface;
    const effect = p.effect ?? BlockEffect.None;

    // Main road block at this point
    const yaw = i < points.length - 1
      ? Math.atan2(
          points[i + 1].x - p.x,
          -(points[i + 1].z - p.z)
        ) * 180 / Math.PI
      : i > 0
        ? Math.atan2(
            p.x - points[i - 1].x,
            -(p.z - points[i - 1].z)
          ) * 180 / Math.PI
        : 0;

    // Road surface block
    blocks.push({
      id: `road_${i}`,
      position: new Vec3(p.x, p.y, p.z),
      rotation: yaw * Math.PI / 180,
      pitch: p.pitch,
      roll: p.roll,
      scale: new Vec3(roadWidth, roadHeight, roadHeight < 0.5 ? 0.3 : roadHeight),
      surface,
      effect,
      isCheckpoint: p.isCheckpoint ?? false,
      checkpointIndex: p.checkpointIndex ?? 0,
    });

    // For thin special blocks, add a thicker road block underneath
    if (effect !== BlockEffect.None) {
      blocks.push({
        id: `road_base_${i}`,
        position: new Vec3(p.x, p.y, p.z),
        rotation: yaw * Math.PI / 180,
        pitch: p.pitch,
        roll: p.roll,
        scale: new Vec3(roadWidth, 1, BLOCK_SIZE),
        surface,
        effect: BlockEffect.None,
      });
    }

    // Gate posts for checkpoints/finish/start
    if (effect === BlockEffect.Start || effect === BlockEffect.Finish || effect === BlockEffect.Checkpoint) {
      const gateHeight = 6;
      const leftX = p.x - Math.sin(yaw * Math.PI / 180) * (roadWidth * 0.5);
      const leftZ = p.z - Math.cos(yaw * Math.PI / 180) * (roadWidth * 0.5);
      const rightX = p.x + Math.sin(yaw * Math.PI / 180) * (roadWidth * 0.5);
      const rightZ = p.z + Math.cos(yaw * Math.PI / 180) * (roadWidth * 0.5);

      const poleColor = effect === BlockEffect.Start ? 0x00FF00
        : effect === BlockEffect.Finish ? 0xFF00AA
        : 0x4444FF;

      // Left pole
      blocks.push({
        id: `gate_l_${i}`,
        position: new Vec3(leftX, p.y + gateHeight * 0.5 + 0.5, leftZ),
        rotation: 0,
        scale: new Vec3(0.3, gateHeight, 0.3),
        surface,
        effect: BlockEffect.None,
      });
      // Right pole
      blocks.push({
        id: `gate_r_${i}`,
        position: new Vec3(rightX, p.y + gateHeight * 0.5 + 0.5, rightZ),
        rotation: 0,
        scale: new Vec3(0.3, gateHeight, 0.3),
        surface,
        effect: BlockEffect.None,
      });
    }

    // Wall posts every N blocks
    if (i % 3 === 0) {
      const wallHeight = 2;
      const wallX1 = p.x - Math.sin(yaw * Math.PI / 180) * (roadWidth * 0.55);
      const wallZ1 = p.z - Math.cos(yaw * Math.PI / 180) * (roadWidth * 0.55);
      const wallX2 = p.x + Math.sin(yaw * Math.PI / 180) * (roadWidth * 0.55);
      const wallZ2 = p.z + Math.cos(yaw * Math.PI / 180) * (roadWidth * 0.55);

      blocks.push({
        id: `wall_l_${i}`,
        position: new Vec3(wallX1, p.y + wallHeight * 0.5, wallZ1),
        rotation: yaw * Math.PI / 180,
        scale: new Vec3(0.4, wallHeight, 0.4),
        surface: SurfaceType.Asphalt,
        effect: BlockEffect.None,
      });
      blocks.push({
        id: `wall_r_${i}`,
        position: new Vec3(wallX2, p.y + wallHeight * 0.5, wallZ2),
        rotation: yaw * Math.PI / 180,
        scale: new Vec3(0.4, wallHeight, 0.4),
        surface: SurfaceType.Asphalt,
        effect: BlockEffect.None,
      });
    }
  }

  return blocks;
}

/** Generate smooth points along a path with controlled spacing */
function interpolatePath(points: PathPoint[], spacing: number = BLOCK_SIZE * 0.8): PathPoint[] {
  const result: PathPoint[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dz = to.z - from.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const steps = Math.max(1, Math.floor(dist / spacing));

    for (let j = 0; j < steps; j++) {
      const t = j / steps;
      const pt: PathPoint = {
        x: from.x + dx * t,
        y: from.y + dy * t,
        z: from.z + dz * t,
        surface: t < 0.5 ? from.surface : to.surface,
      };
      // Only apply effect at the "from" point
      if (j === 0 && from.effect) {
        pt.effect = from.effect;
        pt.isCheckpoint = from.isCheckpoint;
        pt.checkpointIndex = from.checkpointIndex;
      }
      result.push(pt);
    }
  }

  // Add last point
  const last = points[points.length - 1];
  result.push({
    x: last.x,
    y: last.y,
    z: last.z,
    surface: last.surface,
    effect: last.effect,
    isCheckpoint: last.isCheckpoint,
    checkpointIndex: last.checkpointIndex,
  });

  return result;
}

/**
 * "Beginner's Loop" - A simple oval track for learning controls.
 * Flat, clear, with one checkpoint and one booster.
 */
export function createBeginnerTrack(): TrackDefinition {
  const B = BLOCK_SIZE;
  const points: PathPoint[] = [
    // Start line heading -Z
    { x: 0, y: 0.5, z: B * 5, effect: BlockEffect.Start },
    { x: 0, y: 0.5, z: B * 3 },
    { x: 0, y: 0.5, z: B * 1 },
    { x: 0, y: 0.5, z: -B * 1 },
    { x: 0, y: 0.5, z: -B * 3 },
    { x: 0, y: 0.5, z: -B * 5 },
    { x: 0, y: 0.5, z: -B * 7 },
    { x: 0, y: 0.5, z: -B * 9 },
    // Booster straight
    { x: 0, y: 0.5, z: -B * 11, effect: BlockEffect.Booster },
    { x: 0, y: 0.5, z: -B * 13 },
    { x: 0, y: 0.5, z: -B * 15 },
    // Turn right (+X direction)
    { x: B * 2, y: 0.5, z: -B * 16, surface: SurfaceType.Dirt },
    { x: B * 5, y: 0.5, z: -B * 17 },
    { x: B * 8, y: 0.5, z: -B * 16.5 },
    { x: B * 11, y: 0.5, z: -B * 15, surface: SurfaceType.Asphalt },
    // Side straight heading +Z
    { x: B * 13, y: 0.5, z: -B * 13 },
    { x: B * 13, y: 0.5, z: -B * 11 },
    { x: B * 13, y: 0.5, z: -B * 9 },
    { x: B * 13, y: 0.5, z: -B * 7, effect: BlockEffect.Checkpoint, isCheckpoint: true, checkpointIndex: 0 },
    { x: B * 13, y: 0.5, z: -B * 5 },
    { x: B * 13, y: 0.5, z: -B * 3 },
    { x: B * 13, y: 0.5, z: -B * 1 },
    { x: B * 13, y: 0.5, z: B * 1 },
    { x: B * 13, y: 0.5, z: B * 3 },
    { x: B * 13, y: 0.5, z: B * 5 },
    // Turn right again (-X direction)
    { x: B * 11, y: 0.5, z: B * 7, surface: SurfaceType.Grass },
    { x: B * 8, y: 0.5, z: B * 8 },
    { x: B * 5, y: 0.5, z: B * 7.5, surface: SurfaceType.Asphalt },
    // Return straight
    { x: B * 3, y: 0.5, z: B * 6 },
    { x: B * 1, y: 0.5, z: B * 5.5 },
    // Back to start
    { x: 0, y: 0.5, z: B * 5, effect: BlockEffect.Finish, isCheckpoint: true, checkpointIndex: 1 },
  ];

  const allBlocks = buildRoadFromPoints(interpolatePath(points, B * 0.85));
  
  // Ground platform
  allBlocks.push({
    id: 'ground',
    position: new Vec3(B * 7, -0.5, -B * 5),
    rotation: 0,
    scale: new Vec3(B * 20, 0.5, B * 30),
    surface: SurfaceType.Grass,
    effect: BlockEffect.None,
  });

  return {
    name: "Beginner's Loop",
    author: 'Flashmania',
    blocks: allBlocks,
    startPositions: [new Vec3(0, 1.5, B * 5)],
    startRotations: [0],
    medals: { bronze: 55, silver: 40, gold: 30, author: 24 },
  };
}

/**
 * "Speed Valley" - Features boosters, ramps, wallride, dirt, ice, and special blocks.
 */
export function createDemoTrack(): TrackDefinition {
  const B = BLOCK_SIZE;
  const points: PathPoint[] = [
    // Start
    { x: 0, y: 0.5, z: B * 2, effect: BlockEffect.Start },
    { x: 0, y: 0.5, z: B },
    { x: 0, y: 0.5, z: -B },
    // Fast straight
    { x: 0, y: 0.5, z: -B * 3 },
    { x: 0, y: 0.5, z: -B * 5, effect: BlockEffect.Booster },
    { x: 0, y: 0.5, z: -B * 7 },
    { x: 0, y: 0.5, z: -B * 9 },
    // Right turn onto dirt
    { x: B * 3, y: 0.5, z: -B * 11, surface: SurfaceType.Dirt },
    { x: B * 7, y: 0.5, z: -B * 12 },
    { x: B * 11, y: 0.5, z: -B * 11, surface: SurfaceType.Asphalt },
    // Checkpoint 1
    { x: B * 13, y: 0.5, z: -B * 9, effect: BlockEffect.Checkpoint, isCheckpoint: true, checkpointIndex: 0 },
    // Uphill ramp (with pitch)
    { x: B * 15, y: 2, z: -B * 8, pitch: 0.15 },
    { x: B * 17, y: 4, z: -B * 7, pitch: 0.2 },
    { x: B * 19, y: 6, z: -B * 6, pitch: 0.03 },
    // Wallride section (banked turn) - left bank
    { x: B * 21, y: 7, z: -B * 7, roll: 0.25 },
    { x: B * 23, y: 8, z: -B * 8, roll: 0.35 },
    { x: B * 25, y: 8, z: -B * 9, roll: 0.4, surface: SurfaceType.Asphalt },
    { x: B * 27, y: 7, z: -B * 8, roll: 0.3 },
    { x: B * 29, y: 6, z: -B * 7, roll: 0.15 },
    // Elevated ice section
    { x: B * 31, y: 5, z: -B * 6, surface: SurfaceType.Ice, pitch: -0.12 },
    { x: B * 33, y: 4, z: -B * 5, surface: SurfaceType.Ice },
    { x: B * 35, y: 3, z: -B * 4, surface: SurfaceType.Ice, effect: BlockEffect.NoSteer, pitch: -0.15 },
    // Downhill back to ground
    { x: B * 37, y: 2, z: -B * 3, pitch: -0.1 },
    { x: B * 39, y: 1, z: -B * 1, surface: SurfaceType.Asphalt },
    // Fragile section
    { x: B * 40, y: 0.5, z: B * 1, effect: BlockEffect.Fragile },
    { x: B * 41, y: 0.5, z: B * 3 },
    // Right turn
    { x: B * 40, y: 0.5, z: B * 5 },
    { x: B * 38, y: 0.5, z: B * 7 },
    // Engine Off zone
    { x: B * 36, y: 0.5, z: B * 8, effect: BlockEffect.EngineOff },
    { x: B * 34, y: 0.5, z: B * 8 },
    // Plastic/wet section
    { x: B * 32, y: 0.5, z: B * 8, surface: SurfaceType.Plastic },
    { x: B * 30, y: 0.5, z: B * 8, surface: SurfaceType.Plastic },
    // Checkpoint 2
    { x: B * 28, y: 0.5, z: B * 8, effect: BlockEffect.Checkpoint, isCheckpoint: true, checkpointIndex: 1 },
    // Small hill
    { x: B * 25, y: 2, z: B * 7.5, pitch: 0.12 },
    { x: B * 22, y: 3, z: B * 7, surface: SurfaceType.Dirt, pitch: 0.05 },
    { x: B * 19, y: 2, z: B * 6, pitch: -0.1 },
    // Booster on return straight
    { x: B * 16, y: 0.5, z: B * 5, effect: BlockEffect.Booster },
    { x: B * 12, y: 0.5, z: B * 4 },
    { x: B * 8, y: 0.5, z: B * 3 },
    // Grass section
    { x: B * 5, y: 0.5, z: B * 2, surface: SurfaceType.Grass },
    // Final approach
    { x: B * 2, y: 0.5, z: B * 2, surface: SurfaceType.Asphalt },
    // Finish (circles back to start area)
    { x: 0, y: 0.5, z: B * 2, effect: BlockEffect.Finish, isCheckpoint: true, checkpointIndex: 2 },
  ];

  const allBlocks = buildRoadFromPoints(interpolatePath(points, B * 0.85));
  
  // Ground platforms
  allBlocks.push({
    id: 'ground_1',
    position: new Vec3(B * 20, -0.5, -B * 3),
    rotation: 0,
    scale: new Vec3(B * 46, 0.5, B * 16),
    surface: SurfaceType.Grass,
    effect: BlockEffect.None,
  });
  // Elevated section support
  allBlocks.push({
    id: 'elevated_support',
    position: new Vec3(B * 28, 3, -B * 7),
    rotation: 0,
    scale: new Vec3(B * 14, 6, B * 6),
    surface: SurfaceType.None,
    effect: BlockEffect.None,
  });
  // Support for return section
  allBlocks.push({
    id: 'return_support',
    position: new Vec3(B * 30, 0, B * 8),
    rotation: 0,
    scale: new Vec3(B * 16, 0.5, B * 6),
    surface: SurfaceType.Grass,
    effect: BlockEffect.None,
  });

  return {
    name: 'Speed Valley',
    author: 'Flashmania',
    blocks: allBlocks,
    startPositions: [new Vec3(0, 1.5, B * 2)],
    startRotations: [0],
    medals: { bronze: 80, silver: 60, gold: 45, author: 35 },
  };
}

/**
 * "Ice Mountain" - Steep elevation changes, ice, and technical sections.
 */
export function createIceMountainTrack(): TrackDefinition {
  const B = BLOCK_SIZE;
  const points: PathPoint[] = [
    // Start at base
    { x: 0, y: 0.5, z: B * 2, effect: BlockEffect.Start },
    { x: 0, y: 0.5, z: B },
    { x: 0, y: 0.5, z: -B },
    // Gentle right turn
    { x: B * 3, y: 0.5, z: -B * 3 },
    { x: B * 7, y: 0.5, z: -B * 4 },
    // Uphill ramp
    { x: B * 10, y: 2.5, z: -B * 5 },
    { x: B * 13, y: 5, z: -B * 6 },
    { x: B * 16, y: 8, z: -B * 7 },
    { x: B * 19, y: 11, z: -B * 8 },
    // Checkpoint 1 at the peak entrance
    { x: B * 22, y: 13, z: -B * 8, effect: BlockEffect.Checkpoint, isCheckpoint: true, checkpointIndex: 0 },
    // Ice plateau with No Brakes
    { x: B * 25, y: 13, z: -B * 8, surface: SurfaceType.Ice, effect: BlockEffect.NoBrake },
    { x: B * 28, y: 13, z: -B * 8, surface: SurfaceType.Ice },
    { x: B * 31, y: 13, z: -B * 7, surface: SurfaceType.Ice },
    // Steep descent
    { x: B * 34, y: 10, z: -B * 5 },
    { x: B * 36, y: 6, z: -B * 3 },
    { x: B * 38, y: 2, z: -B },
    // Booster after descent
    { x: B * 39, y: 0.5, z: B, effect: BlockEffect.Booster },
    { x: B * 39, y: 0.5, z: B * 3 },
    // No Steer section
    { x: B * 38, y: 0.5, z: B * 5, effect: BlockEffect.NoSteer },
    { x: B * 36, y: 0.5, z: B * 7 },
    // Plastic section
    { x: B * 33, y: 0.5, z: B * 8, surface: SurfaceType.Plastic },
    { x: B * 30, y: 0.5, z: B * 9, surface: SurfaceType.Plastic },
    // Dirt with Fragile
    { x: B * 27, y: 0.5, z: B * 8, surface: SurfaceType.Dirt, effect: BlockEffect.Fragile },
    { x: B * 24, y: 0.5, z: B * 7, surface: SurfaceType.Dirt },
    // Checkpoint 2
    { x: B * 21, y: 0.5, z: B * 6, effect: BlockEffect.Checkpoint, isCheckpoint: true, checkpointIndex: 1 },
    // Grass straight
    { x: B * 18, y: 0.5, z: B * 5, surface: SurfaceType.Grass },
    { x: B * 15, y: 0.5, z: B * 4, surface: SurfaceType.Grass },
    // Engine Off zone
    { x: B * 12, y: 0.5, z: B * 3, effect: BlockEffect.EngineOff },
    { x: B * 9, y: 0.5, z: B * 2 },
    // Return to start
    { x: B * 5, y: 0.5, z: B * 2 },
    { x: B * 2, y: 0.5, z: B * 2 },
    // Finish
    { x: 0, y: 0.5, z: B * 2, effect: BlockEffect.Finish, isCheckpoint: true, checkpointIndex: 2 },
  ];

  const allBlocks = buildRoadFromPoints(interpolatePath(points, B * 0.85));

  // Ground platforms
  allBlocks.push({
    id: 'ground_base',
    position: new Vec3(B * 20, -0.5, B * 2),
    rotation: 0,
    scale: new Vec3(B * 44, 0.5, B * 14),
    surface: SurfaceType.Grass,
    effect: BlockEffect.None,
  });
  // Mountain support
  allBlocks.push({
    id: 'mountain',
    position: new Vec3(B * 26, 5, -B * 8),
    rotation: 0,
    scale: new Vec3(B * 14, 10, B * 4),
    surface: SurfaceType.None,
    effect: BlockEffect.None,
  });

  return {
    name: 'Ice Mountain',
    author: 'Flashmania',
    blocks: allBlocks,
    startPositions: [new Vec3(0, 1.5, B * 2)],
    startRotations: [0],
    medals: { bronze: 75, silver: 55, gold: 42, author: 32 },
  };
}