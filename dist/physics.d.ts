import { CarState, InputState, PhysicsConfig } from './types';
export declare class Physics {
    private config;
    constructor(config: PhysicsConfig);
    update(car: CarState, input: InputState, dt: number): void;
    getSlipAngle(car: CarState): number;
}
