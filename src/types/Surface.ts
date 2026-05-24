export enum SurfaceType {
  ASPHALT = 'asphalt',
  DIRT = 'dirt',
  ICE = 'ice',
  GRASS = 'grass',
  PLASTIC = 'plastic',
}

// Physical properties for each surface type
export const SURFACE_PROPS: Record<SurfaceType, { grip: number; maxSpeed: number; color: number }> = {
  [SurfaceType.ASPHALT]: { grip: 1.0, maxSpeed: 1, color: 0x333333 },
  [SurfaceType.DIRT]:    { grip: 0.45, maxSpeed: 0.85, color: 0x8B6914 },
  [SurfaceType.ICE]:     { grip: 0.1, maxSpeed: 0.95, color: 0xCCE5FF },
  [SurfaceType.GRASS]:   { grip: 0.7, maxSpeed: 0.6, color: 0x3A7D2C },
  [SurfaceType.PLASTIC]: { grip: 0.35, maxSpeed: 0.9, color: 0xE8E8FF },
};

export enum SpecialPad {
  NONE = 'none',
  BOOSTER = 'booster',
  ENGINE_OFF = 'engine_off',
  FRAGILE = 'fragile',
  NO_STEERING = 'no_steering',
  NO_BRAKES = 'no_brakes',
}
