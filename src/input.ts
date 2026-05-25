import { InputState } from './types';

export class InputManager {
  private keys: Set<string> = new Set();
  private pressedBuffer: Set<string> = new Set();
  private heldKeys: Map<string, number> = new Map(); // key → timestamp when last seen down
  private state: InputState = {
    accelerate: false,
    brake: false,
    steerLeft: false,
    steerRight: false,
    drift: false,
  };
  private holdDuration = 200; // ms to keep key "held" after release

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (!e.repeat) {
        this.pressedBuffer.add(e.code);
      }
      this.keys.add(e.code);
      this.heldKeys.set(e.code, performance.now());
      this.updateState();
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      // Don't remove from heldKeys immediately — let it expire
      this.updateState();
    });
    // Prevent default for game keys
    window.addEventListener('keydown', (e) => {
      if (['KeyW','KeyS','KeyA','KeyD','Space','KeyR','KeyG','Enter'].includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  private isHeld(code: string): boolean {
    if (this.keys.has(code)) return true;
    const ts = this.heldKeys.get(code);
    if (ts !== undefined && performance.now() - ts < this.holdDuration) return true;
    return false;
  }

  private updateState() {
    this.state.accelerate = this.isHeld('KeyW') || this.isHeld('ArrowUp');
    this.state.brake = this.isHeld('KeyS') || this.isHeld('ArrowDown');
    this.state.steerLeft = this.isHeld('KeyA') || this.isHeld('ArrowLeft');
    this.state.steerRight = this.isHeld('KeyD') || this.isHeld('ArrowRight');
    this.state.drift = this.isHeld('Space');
  }

  /** Call each frame to keep state fresh */
  tick() {
    // Expire old held keys
    const now = performance.now();
    for (const [key, ts] of this.heldKeys) {
      if (!this.keys.has(key) && now - ts >= this.holdDuration) {
        this.heldKeys.delete(key);
      }
    }
    this.updateState();
  }

  getState(): InputState {
    return { ...this.state };
  }

  isKey(code: string): boolean {
    return this.isHeld(code);
  }

  consumeKey(code: string): boolean {
    if (this.pressedBuffer.has(code)) {
      this.pressedBuffer.delete(code);
      return true;
    }
    return false;
  }
}