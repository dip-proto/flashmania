// Core type definitions for Flashmania

export interface Vector2D {
  x: number;
  y: number;
}

export interface CarState {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number; // radians
  angularVelocity: number;
  speed: number;
  isAirborne: boolean;
  isDrifting: boolean;
  steeringAngle: number;
  engineRPM: number;
  surface: SurfaceType;
  effects: Set<SpecialEffect>;
}

export type SurfaceType = 'asphalt' | 'dirt' | 'ice' | 'grass' | 'plastic' | 'air';

export interface SurfaceProperties {
  name: string;
  grip: number; // 0-1, higher = more grip
  friction: number; // deceleration factor
  color: string;
  sound: string;
  minSpeedForAudio: number;
}

export type SpecialEffect = 'boosted' | 'engineOff' | 'fragile' | 'noSteering' | 'noBrakes' | 'wet';

export interface Block {
  id: string;
  type: 'surface' | 'booster' | 'checkpoint' | 'finish' | 'start' | 'trigger';
  center: Vector2D;
  width: number;
  height: number;
  surfaceType?: SurfaceType;
  specialEffect?: SpecialEffect;
  variant?: string;
  rotation?: number;
}

export interface Track {
  name: string;
  blocks: Block[];
  startPosition: Vector2D;
  startRotation: number;
  checkpoints: string[]; // block IDs in order
  finishLine: string; // block ID
  medalTimes: {
    bronze: number;
    silver: number;
    gold: number;
    author: number;
  };
}

export interface GameState {
  status: 'menu' | 'countdown' | 'racing' | 'finished';
  raceTime: number;
  checkpointsPassed: number;
  currentMedal: Medal | null;
}

export type Medal = 'bronze' | 'silver' | 'gold' | 'author';

export interface InputState {
  accelerate: boolean;
  brake: boolean;
  left: boolean;
  right: boolean;
  restart: boolean;
}

export interface PhysicsConfig {
  maxSpeed: number;
  acceleration: number;
  brakingForce: number;
  turnSpeed: number;
  driftThreshold: number;
  airControlMultiplier: number;
  gravity: number;
  groundFriction: number;
}

export interface AudioConfig {
  engineBaseFreq: number;
  engineMaxFreq: number;
  surfaceSounds: Record<SurfaceType, string>;
}

export interface GameConfig {
  physics: PhysicsConfig;
  audio: AudioConfig;
  surfaces: Record<SurfaceType, SurfaceProperties>;
}