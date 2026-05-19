import { Vec3 } from '../engine/Vector.js';
import { SurfaceType, BlockEffect } from '../engine/Physics.js';

/** A single track block that makes up the track */
export interface TrackBlock {
  id: string;
  position: Vec3;
  rotation: number;     // Y rotation (yaw) in radians
  pitch?: number;       // X rotation (tilt forward/back) in radians - for ramps
  roll?: number;        // Z rotation (bank) in radians - for banked turns/wallrides
  scale: Vec3;
  surface: SurfaceType;
  effect: BlockEffect;
  isCheckpoint?: boolean;
  checkpointIndex?: number;
}

/** Track definition with blocks and metadata */
export interface TrackDefinition {
  name: string;
  author: string;
  blocks: TrackBlock[];
  startPositions: Vec3[];  // Start positions (first is player)
  startRotations: number[]; // Start yaws in degrees
  medals: {
    bronze: number;   // seconds
    silver: number;
    gold: number;
    author: number;
  };
}

/** Standard block size (TrackMania-like unit size) */
export const BLOCK_SIZE = 8;

/** Block types for building track geometry */
export const BLOCK_DEFS = {
  road_straight: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Asphalt },
  road_curve_left: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Asphalt, curveAngle: Math.PI / 4 },
  road_curve_right: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Asphalt, curveAngle: -Math.PI / 4 },
  dirt_straight: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Dirt },
  ice_straight: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Ice },
  grass_straight: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Grass },
  plastic_straight: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 1, surface: SurfaceType.Plastic },
  ramp_small: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 3, surface: SurfaceType.Asphalt },
  ramp_large: { length: BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: 6, surface: SurfaceType.Asphalt },
  boost_pad: { length: BLOCK_SIZE * 0.5, width: BLOCK_SIZE * 2, height: 0.2, surface: SurfaceType.Asphalt, effect: BlockEffect.Booster },
  engine_off: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.2, surface: SurfaceType.Asphalt, effect: BlockEffect.EngineOff },
  fragile_pad: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.2, surface: SurfaceType.Asphalt, effect: BlockEffect.Fragile },
  no_steer: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.2, surface: SurfaceType.Asphalt, effect: BlockEffect.NoSteer },
  no_brake: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.2, surface: SurfaceType.Asphalt, effect: BlockEffect.NoBrake },
  start: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.5, surface: SurfaceType.Asphalt, effect: BlockEffect.Start },
  finish: { length: BLOCK_SIZE, width: BLOCK_SIZE * 2, height: 0.5, surface: SurfaceType.Asphalt, effect: BlockEffect.Finish },
  checkpoint: { length: BLOCK_SIZE * 0.5, width: BLOCK_SIZE * 2, height: 3, surface: SurfaceType.Asphalt, effect: BlockEffect.Checkpoint },
  wall_left: { length: BLOCK_SIZE, width: 1, height: 3 },
  wall_right: { length: BLOCK_SIZE, width: 1, height: 3 },
} as const;