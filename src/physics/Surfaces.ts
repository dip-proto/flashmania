/**
 * Surface definitions — each surface has unique physical properties.
 */

export type SurfaceType = 'asphalt' | 'dirt' | 'ice' | 'grass' | 'plastic';

export interface SurfaceProps {
  type: SurfaceType;
  grip: number;           // 0-1, lateral grip factor
  accelGrip: number;      // 0-1, acceleration grip
  maxSpeedFactor: number; // multiplier on max speed
  color: number;          // Three.js color
  bumpiness: number;      // visual roughness
}

export const SURFACES: Record<SurfaceType, SurfaceProps> = {
  asphalt: {
    type: 'asphalt',
    grip: 1.0,
    accelGrip: 1.0,
    maxSpeedFactor: 1.0,
    color: 0x555555,
    bumpiness: 0,
  },
  dirt: {
    type: 'dirt',
    grip: 0.45,
    accelGrip: 0.6,
    maxSpeedFactor: 0.85,
    color: 0x8B6914,
    bumpiness: 0.3,
  },
  ice: {
    type: 'ice',
    grip: 0.08,
    accelGrip: 0.15,
    maxSpeedFactor: 1.0,
    color: 0xAADDFF,
    bumpiness: 0,
  },
  grass: {
    type: 'grass',
    grip: 0.7,
    accelGrip: 0.5,
    maxSpeedFactor: 0.6,
    color: 0x44AA22,
    bumpiness: 0.2,
  },
  plastic: {
    type: 'plastic',
    grip: 0.3,
    accelGrip: 0.4,
    maxSpeedFactor: 0.9,
    color: 0xFF6600,
    bumpiness: 0,
  },
};