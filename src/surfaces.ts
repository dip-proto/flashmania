// Surface types with distinct physical properties
export enum SurfaceType {
  Asphalt = 'asphalt',
  Dirt = 'dirt',
  Ice = 'ice',
  Grass = 'grass',
  Plastic = 'plastic',
}

export interface SurfaceProperties {
  grip: number;        // friction coefficient (0-1)
  driftGrip: number;   // grip while sliding
  speedLoss: number;   // how much speed bleeds during drift (0-1)
  color: string;       // rendering color
  name: string;
}

export const SURFACE_PROPERTIES: Record<SurfaceType, SurfaceProperties> = {
  [SurfaceType.Asphalt]: {
    grip: 0.95,
    driftGrip: 0.3,
    speedLoss: 0.04,
    color: '#555555',
    name: 'Asphalt',
  },
  [SurfaceType.Dirt]: {
    grip: 0.6,
    driftGrip: 0.25,
    speedLoss: 0.06,
    color: '#8B5E3C',
    name: 'Dirt',
  },
  [SurfaceType.Ice]: {
    grip: 0.1,
    driftGrip: 0.05,
    speedLoss: 0.02,
    color: '#B0E0E6',
    name: 'Ice',
  },
  [SurfaceType.Grass]: {
    grip: 0.5,
    driftGrip: 0.4,
    speedLoss: 0.1,
    color: '#4CAF50',
    name: 'Grass',
  },
  [SurfaceType.Plastic]: {
    grip: 0.35,
    driftGrip: 0.15,
    speedLoss: 0.05,
    color: '#9C27B0',
    name: 'Plastic',
  },
};
