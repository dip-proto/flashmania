// Physics engine for car movement
import { getSurfaceGrip, getSurfaceFriction } from './surfaces';
export class Physics {
    constructor(config) {
        this.config = config;
    }
    update(car, input, dt) {
        const hasEffect = (effect) => car.effects.has(effect);
        const canSteer = !hasEffect('noSteering');
        const canBrake = !hasEffect('noBrakes');
        const engineOn = !hasEffect('engineOff');
        // Get current surface properties
        const grip = getSurfaceGrip(car.surface);
        const friction = getSurfaceFriction(car.surface);
        // Calculate forward direction
        const forward = {
            x: Math.cos(car.rotation),
            y: Math.sin(car.rotation)
        };
        const right = {
            x: Math.cos(car.rotation + Math.PI / 2),
            y: Math.sin(car.rotation + Math.PI / 2)
        };
        // Calculate current speed component in forward direction
        const forwardSpeed = car.velocity.x * forward.x + car.velocity.y * forward.y;
        const lateralSpeed = car.velocity.x * right.x + car.velocity.y * right.y;
        // Steering
        let turnRate = 0;
        if (canSteer && input.left) {
            turnRate = -this.config.turnSpeed;
        }
        else if (canSteer && input.right) {
            turnRate = this.config.turnSpeed;
        }
        // Adjust turn rate based on speed (faster = more gradual turns)
        const speedFactor = Math.min(Math.abs(forwardSpeed) / 100, 1);
        turnRate *= (0.5 + speedFactor * 0.5);
        // Drift detection - when turning sharply at high speed
        const driftAngle = Math.abs(lateralSpeed) / (Math.abs(forwardSpeed) + 1);
        car.isDrifting = driftAngle > this.config.driftThreshold && Math.abs(forwardSpeed) > 50;
        // Apply steering
        car.angularVelocity = turnRate * (car.isAirborne ? this.config.airControlMultiplier : 1);
        car.rotation += car.angularVelocity * dt;
        // Acceleration
        if (input.accelerate && engineOn && !hasEffect('boosted')) {
            const accelForce = this.config.acceleration * grip;
            car.velocity.x += forward.x * accelForce * dt;
            car.velocity.y += forward.y * accelForce * dt;
        }
        // Boost effect
        if (hasEffect('boosted')) {
            car.velocity.x += forward.x * this.config.acceleration * 3 * dt;
            car.velocity.y += forward.y * this.config.acceleration * 3 * dt;
        }
        // Braking
        if (input.brake && canBrake) {
            const brakeForce = this.config.brakingForce * grip;
            car.velocity.x -= forward.x * brakeForce * dt;
            car.velocity.y -= forward.y * brakeForce * dt;
            // In air, brake rotates nose down
            if (car.isAirborne) {
                car.angularVelocity += 3 * dt;
            }
        }
        // Apply lateral friction (this creates the drift feel)
        const lateralFriction = car.isAirborne ? 0.98 : (1 - grip) * 0.9 + 0.1;
        const lateralDamping = Math.pow(lateralFriction, dt * 60);
        car.velocity.x -= right.x * lateralSpeed * (1 - lateralDamping);
        car.velocity.y -= right.y * lateralSpeed * (1 - lateralDamping);
        // Apply ground friction
        const groundDamping = Math.pow(friction, dt * 60);
        car.velocity.x *= groundDamping;
        car.velocity.y *= groundDamping;
        // Gravity when airborne
        if (car.isAirborne) {
            car.velocity.y += this.config.gravity * dt;
        }
        // Speed calculation
        car.speed = Math.sqrt(car.velocity.x ** 2 + car.velocity.y ** 2);
        // Limit max speed
        const maxSpeed = hasEffect('boosted') ? this.config.maxSpeed * 1.5 : this.config.maxSpeed;
        if (car.speed > maxSpeed) {
            const scale = maxSpeed / car.speed;
            car.velocity.x *= scale;
            car.velocity.y *= scale;
            car.speed = maxSpeed;
        }
        // Engine RPM simulation (based on speed and throttle)
        const targetRPM = engineOn
            ? 3000 + (forwardSpeed / maxSpeed) * 5000 + (input.accelerate ? 1000 : 0)
            : 0;
        car.engineRPM += (targetRPM - car.engineRPM) * 0.1;
        // Update position
        car.position.x += car.velocity.x * dt;
        car.position.y += car.velocity.y * dt;
        // Update steering angle for visual feedback
        if (input.left) {
            car.steeringAngle = Math.max(car.steeringAngle - 200 * dt, -1);
        }
        else if (input.right) {
            car.steeringAngle = Math.min(car.steeringAngle + 200 * dt, 1);
        }
        else {
            car.steeringAngle *= 0.9;
        }
    }
    // Calculate angle between velocity and forward direction
    getSlipAngle(car) {
        const forward = {
            x: Math.cos(car.rotation),
            y: Math.sin(car.rotation)
        };
        const speed = car.speed || 0.001;
        const velDir = {
            x: car.velocity.x / speed,
            y: car.velocity.y / speed
        };
        const dot = forward.x * velDir.x + forward.y * velDir.y;
        return Math.acos(Math.max(-1, Math.min(1, dot)));
    }
}
