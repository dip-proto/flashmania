import { VehicleInput } from './vehicle';

export type ControlKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Space';

export class Controls {
  private keys: Set<string> = new Set();
  private tapBrakePressed: boolean = false;
  private tapBrakeConsumed: boolean = false;
  public restartPressed: boolean = false;

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (e.code === 'Space' && !this.tapBrakeConsumed) {
        this.tapBrakePressed = true;
        this.tapBrakeConsumed = true;
      }
      if (e.code === 'KeyR') {
        this.restartPressed = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      if (e.code === 'Space') {
        this.tapBrakeConsumed = false;
      }
    });
  }

  getInput(): VehicleInput {
    const steer =
      (this.keys.has('ArrowLeft') ? -1 : 0) +
      (this.keys.has('ArrowRight') ? 1 : 0);

    const tapBrake = this.tapBrakePressed;
    this.tapBrakePressed = false;

    return {
      steer: Math.max(-1, Math.min(1, steer)),
      accelerate: this.keys.has('ArrowUp'),
      brake: this.keys.has('ArrowDown'),
      tapBrake,
    };
  }

  consumeRestart(): boolean {
    const val = this.restartPressed;
    this.restartPressed = false;
    return val;
  }
}
