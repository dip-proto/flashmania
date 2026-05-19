import { SurfaceType, SurfaceProperties } from './types';
export declare const SURFACE_DEFINITIONS: Record<SurfaceType, SurfaceProperties>;
export declare function getSurfaceColor(type: SurfaceType): string;
export declare function getSurfaceGrip(type: SurfaceType): number;
export declare function getSurfaceFriction(type: SurfaceType): number;
