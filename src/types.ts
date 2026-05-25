// ── Surface types ──────────────────────────────────────────
export const SurfaceType = {
  Asphalt: 'asphalt',
  Dirt: 'dirt',
  Ice: 'ice',
  Grass: 'grass',
  Plastic: 'plastic',
} as const;
export type SurfaceType = typeof SurfaceType[keyof typeof SurfaceType];

// ── Track block types ──────────────────────────────────────
export const BlockType = {
  Straight: 'straight',
  CurveLeft: 'curve_left',
  CurveRight: 'curve_right',
  RampUp: 'ramp_up',
  RampDown: 'ramp_down',
  Loop: 'loop',
  WallRide: 'wallride',
  Jump: 'jump',
  Booster: 'booster',
  EngineOff: 'engine_off',
  Fragile: 'fragile',
  NoSteering: 'no_steering',
  NoBrakes: 'no_brakes',
  Checkpoint: 'checkpoint',
  StartLine: 'start_line',
  FinishLine: 'finish_line',
} as const;
export type BlockType = typeof BlockType[keyof typeof BlockType];

// ── Surface physics properties ─────────────────────────────
export interface SurfacePhysics {
  grip: number;       // 0-1, how much grip the surface provides
  friction: number;   // 0-1, rolling friction
  driftFactor: number;// how much drift is amplified
  speedPenalty: number;// 0-1, speed reduction factor
  soundType: string;  // for audio
}

// ── Block definition ───────────────────────────────────────
export interface TrackBlock {
  type: BlockType;
  surface: SurfaceType;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;       // rotation in radians
  special?: string;    // any special effect tag
  checkpointIndex?: number;
}

// ── Car state ──────────────────────────────────────────────
export interface CarState {
  x: number;
  y: number;
  angle: number;        // heading angle in radians
  speed: number;        // current speed in px/s
  angularVelocity: number;
  driftAngle: number;   // how much the car is sliding
  isAirborne: boolean;
  airTime: number;
  engineOff: boolean;
  fragile: boolean;
  brokenSteering: boolean;
  noSteering: boolean;
  noBrakes: boolean;
  boostTimer: number;
  surface: SurfaceType;
  checkpointIndex: number;
}

// ── Input state ────────────────────────────────────────────
export interface InputState {
  accelerate: boolean;
  brake: boolean;
  steerLeft: boolean;
  steerRight: boolean;
  drift: boolean;
}

// ── Ghost data ─────────────────────────────────────────────
export interface GhostFrame {
  x: number;
  y: number;
  angle: number;
  speed: number;
  driftAngle: number;
  isAirborne: boolean;
  surface: string;
}

// ── Game state ─────────────────────────────────────────────
export const GameState = {
  Menu: 'menu',
  Racing: 'racing',
  Finished: 'finished',
  Paused: 'paused',
} as const;
export type GameState = typeof GameState[keyof typeof GameState];

// ── Medal thresholds ───────────────────────────────────────
export interface MedalThresholds {
  bronze: number;   // time in seconds
  silver: number;
  gold: number;
  author: number;
}

// ── Camera ─────────────────────────────────────────────────
export interface Camera {
  x: number;
  y: number;
  zoom: number;
  shake: number;
}

// ── Surface physics map ────────────────────────────────────
export const SURFACE_PHYSICS: Record<SurfaceType, SurfacePhysics> = {
  [SurfaceType.Asphalt]: {
    grip: 0.95,
    friction: 0.02,
    driftFactor: 0.3,
    speedPenalty: 0,
    soundType: 'asphalt',
  },
  [SurfaceType.Dirt]: {
    grip: 0.5,
    friction: 0.06,
    driftFactor: 0.7,
    speedPenalty: 0.1,
    soundType: 'dirt',
  },
  [SurfaceType.Ice]: {
    grip: 0.15,
    friction: 0.01,
    driftFactor: 1.5,
    speedPenalty: 0,
    soundType: 'ice',
  },
  [SurfaceType.Grass]: {
    grip: 0.8,
    friction: 0.08,
    driftFactor: 0.2,
    speedPenalty: 0.15,
    soundType: 'grass',
  },
  [SurfaceType.Plastic]: {
    grip: 0.3,
    friction: 0.03,
    driftFactor: 1.2,
    speedPenalty: 0,
    soundType: 'plastic',
  },
};