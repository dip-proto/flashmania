// Physics configuration constants

import { PhysicsConfig } from './types';

export const PHYSICS_CONFIG: PhysicsConfig = {
  maxSpeed: 350,         // max speed in units per second
  acceleration: 180,     // forward acceleration
  brakingForce: 250,     // braking deceleration
  turnSpeed: 3.5,       // radians per second for turning
  driftThreshold: 0.4,   // slip angle threshold for drifting (radians)
  airControlMultiplier: 2.5, // how much more responsive steering is in air
  gravity: 400,          // gravity when airborne
  groundFriction: 0.98   // base ground friction
};