export type TileType =
  | 'empty'
  | 'road'
  | 'start'
  | 'finish'
  | 'checkpoint'
  | 'wall'
  | 'ramp'
  | 'dirt'
  | 'ice'
  | 'grass'
  | 'plastic'
  | 'booster'
  | 'engine_off'
  | 'fragile'
  | 'no_steer_brakes';

export interface Track {
  name: string;
  author: string;
  gridWidth: number;
  gridHeight: number;
  tiles: Record<string, TileType>; // key: "x,y"
  targetBronze: number; // in milliseconds
  targetSilver: number;
  targetGold: number;
  targetAuthor: number;
}

export interface ControlInputs {
  accel: boolean;
  brake: boolean;
  left: boolean;
  right: boolean;
  drift: boolean; // space lock
}

export interface GhostFrame {
  time: number; // ms since start of run
  x: number;
  y: number;
  z: number;
  heading: number;
  isDrifting: boolean;
  speed: number;
}

export interface CheckpointSplit {
  checkpointIndex: number;
  time: number; // in milliseconds
}

export type MedalType = 'none' | 'bronze' | 'silver' | 'gold' | 'author';

export interface RunResults {
  totalTime: number; // ms
  medalEarned: MedalType;
  personalBestTime: number | null;
  personalBestMedal: MedalType;
  checkpointSplits: CheckpointSplit[];
  isNewPB: boolean;
  ghostData: GhostFrame[] | null;
}

export interface Car {
  x: number; // World x coordinates in continuous pixels
  y: number; // World y coordinates
  z: number; // World z coordinates (elevation)
  
  vx: number; // Velocity x
  vy: number; // Velocity y
  vz: number; // Vertical velocity (for jumps)

  heading: number; // Heading angle in radians
  angularVelocity: number;

  isDrifting: boolean;
  driftTrailTimer: number;
  
  // surface modifiers
  isAirborne: boolean;
  currentSurface: TileType;
  wetFactor: number; // 0 to 1, how wet the tires are (slowly dries)
  
  // gimmicks
  engineOffTimer: number; // seconds remaining
  noSteerBrakesTimer: number; // seconds remaining
  steeringDamaged: boolean; // from hit while fragile
  fragileTimer: number; // seconds remaining
  boostEffectTimer: number; // boost pad power remaining
  
  // physics states
  speed: number; // computed scalar speed
}

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number; // remaining lifespan normalized (1 to 0)
  maxLife: number; // total duration
  color: string;
  size: number;
  type: 'smoke' | 'spark' | 'dirt' | 'ice' | 'plastic' | 'boost';
}
