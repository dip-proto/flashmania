// Surface definitions and properties

import { SurfaceType, SurfaceProperties } from './types';

export const SURFACE_DEFINITIONS: Record<SurfaceType, SurfaceProperties> = {
  asphalt: {
    name: 'Road',
    grip: 0.95,
    friction: 0.98,
    color: '#3d3d3d',
    sound: 'road',
    minSpeedForAudio: 50
  },
  dirt: {
    name: 'Dirt',
    grip: 0.5,
    friction: 0.92,
    color: '#8b5a2b',
    sound: 'gravel',
    minSpeedForAudio: 20
  },
  ice: {
    name: 'Ice',
    grip: 0.15,
    friction: 0.995,
    color: '#a8d8ea',
    sound: 'ice',
    minSpeedForAudio: 30
  },
  grass: {
    name: 'Grass',
    grip: 0.7,
    friction: 0.94,
    color: '#4a7c23',
    sound: 'grass',
    minSpeedForAudio: 20
  },
  plastic: {
    name: 'Plastic',
    grip: 0.4,
    friction: 0.96,
    color: '#e74c3c',
    sound: 'plastic',
    minSpeedForAudio: 30
  },
  air: {
    name: 'Air',
    grip: 0,
    friction: 1,
    color: '#87ceeb',
    sound: 'air',
    minSpeedForAudio: 0
  }
};

export function getSurfaceColor(type: SurfaceType): string {
  return SURFACE_DEFINITIONS[type]?.color || '#ffffff';
}

export function getSurfaceGrip(type: SurfaceType): number {
  return SURFACE_DEFINITIONS[type]?.grip || 0;
}

export function getSurfaceFriction(type: SurfaceType): number {
  return SURFACE_DEFINITIONS[type]?.friction || 1;
}