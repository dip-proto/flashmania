import { SurfaceType, SURFACE_PROPERTIES } from './surfaces';

export enum BlockEffect {
  None = 'none',
  Booster = 'booster',
  EngineOff = 'engineOff',
  Fragile = 'fragile',
  NoSteering = 'noSteering',
  NoBrakes = 'noBrakes',
}

export interface TrackBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  surface: SurfaceType;
  effect: BlockEffect;
  curve?: {
    radius: number;
    angle: number;      // sweep angle in radians
    startAngle: number; // starting angle
  };
  ramp?: boolean;
  isCheckpoint?: boolean;
  isFinish?: boolean;
  checkpointId?: number;
}

export interface Track {
  name: string;
  blocks: TrackBlock[];
  start: { x: number; y: number };
  finishId: number;
  authorMedal: number;
  goldMedal: number;
  silverMedal: number;
  bronzeMedal: number;
  camera: { x: number; y: number };
  cameraZoom: number;
}

function pad(x: number, y: number, w: number, h: number, surface: SurfaceType = SurfaceType.Asphalt, effect: BlockEffect = BlockEffect.None, opts?: Partial<TrackBlock>): TrackBlock {
  return {
    x, y, width: w, height: h, surface, effect,
    ...opts,
  };
}

export function buildSampleTrack(): Track {
  const B = 60; // base block size
  const H = 20;
  const blocks: TrackBlock[] = [];

  let x = 100, y = 320;

  // === SECTION 1: Start straight (asphalt) ===
  for (let i = 0; i < 6; i++) blocks.push(pad(x + i * B, y, B, H, SurfaceType.Asphalt));
  // Checkpoint 1
  blocks.push(pad(x + 6 * B, y, B, H, SurfaceType.Asphalt, BlockEffect.None, { isCheckpoint: true, checkpointId: 1 }));

  // === SECTION 2: Right curve on dirt ===
  for (let i = 0; i < 4; i++) blocks.push(pad(x + 7 * B + i * B, y - 20 * i, B, H, SurfaceType.Dirt));
  for (let i = 0; i < 3; i++) blocks.push(pad(x + 11 * B, y - 80 - i * B, B, H, SurfaceType.Dirt));

  // === SECTION 3: Booster + Ice ===
  blocks.push(pad(x + 11 * B, y - 80 - 3 * B, B * 2, H, SurfaceType.Asphalt, BlockEffect.Booster));
  for (let i = 0; i < 5; i++) blocks.push(pad(x + 11 * B + 2 * B + i * B, y - 80 - 3 * B, B, H, SurfaceType.Ice));
  // Checkpoint 2
  blocks.push(pad(x + 11 * B + 7 * B, y - 80 - 3 * B, B, H, SurfaceType.Ice, BlockEffect.None, { isCheckpoint: true, checkpointId: 2 }));

  // === SECTION 4: Ramp + Air ===
  blocks.push(pad(x + 11 * B + 8 * B, y - 80 - 3 * B - 20, B, H + 20, SurfaceType.Asphalt, BlockEffect.None, { ramp: true }));

  // === SECTION 5: Grass landing ===
  for (let i = 0; i < 4; i++) blocks.push(pad(x + 11 * B + 9 * B + i * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Grass));

  // === SECTION 6: Engine off zone ===
  blocks.push(pad(x + 11 * B + 13 * B, y - 80 - 3 * B + 20, B * 3, H, SurfaceType.Asphalt, BlockEffect.EngineOff));
  // Checkpoint 3
  blocks.push(pad(x + 11 * B + 16 * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Asphalt, BlockEffect.None, { isCheckpoint: true, checkpointId: 3 }));

  // === SECTION 7: Plastic (wet tires) section ===
  for (let i = 0; i < 5; i++) blocks.push(pad(x + 11 * B + 17 * B + i * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Plastic));

  // === SECTION 8: No-Steering zone ===
  blocks.push(pad(x + 11 * B + 22 * B, y - 80 - 3 * B + 20, B * 2, H, SurfaceType.Asphalt, BlockEffect.NoSteering));
  // Checkpoint 4
  blocks.push(pad(x + 11 * B + 24 * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Asphalt, BlockEffect.None, { isCheckpoint: true, checkpointId: 4 }));

  // === SECTION 9: No-Brakes zone ===
  blocks.push(pad(x + 11 * B + 25 * B, y - 80 - 3 * B + 20, B * 2, H, SurfaceType.Asphalt, BlockEffect.NoBrakes));

  // === SECTION 10: Final straight ===
  for (let i = 0; i < 6; i++) blocks.push(pad(x + 11 * B + 27 * B + i * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Asphalt));
  // Checkpoint 5
  blocks.push(pad(x + 11 * B + 33 * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Asphalt, BlockEffect.None, { isCheckpoint: true, checkpointId: 5 }));

  // === SECTION 11: Fragile zone ===
  blocks.push(pad(x + 11 * B + 34 * B, y - 80 - 3 * B + 20, B * 2, H, SurfaceType.Asphalt, BlockEffect.Fragile));

  // === SECTION 12: Finish ===
  blocks.push(pad(x + 11 * B + 36 * B, y - 80 - 3 * B + 20, B, H, SurfaceType.Asphalt, BlockEffect.None, { isFinish: true, checkpointId: 99 }));

  return {
    name: 'Speedway Sprint',
    blocks,
    start: { x: 100, y: 320 },
    finishId: 99,
    authorMedal: 28.5,
    goldMedal: 30.0,
    silverMedal: 33.0,
    bronzeMedal: 38.0,
    camera: { x: 0, y: 0 },
    cameraZoom: 1.0,
  };
}
