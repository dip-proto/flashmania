/**
 * InputManager — Handles keyboard and gamepad input.
 */

export interface InputState {
  forward: number;   // -1 to 1
  backward: number;  // -1 to 1
  left: number;      // -1 to 1
  right: number;     // -1 to 1
  brake: boolean;
}

export class InputManager {
  private keys = new Set<string>();
  private input: InputState = {
    forward: 0, backward: 0, left: 0, right: 0, brake: false,
  };

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });
  }

  update(): InputState {
    const i: InputState = { forward: 0, backward: 0, left: 0, right: 0, brake: false };

    // Keyboard
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) i.forward = 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) i.backward = 1;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) i.left = 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) i.right = 1;
    if (this.keys.has('Space')) i.brake = true;

    // Gamepad
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
      if (!gp) continue;
      // Left stick / D-pad
      if (Math.abs(gp.axes[0]) > 0.15) i.left = gp.axes[0] < 0 ? -gp.axes[0] : 0;
      if (Math.abs(gp.axes[0]) > 0.15) i.right = gp.axes[0] > 0 ? gp.axes[0] : 0;
      if (Math.abs(gp.axes[1]) > 0.15) i.forward = gp.axes[1] < 0 ? -gp.axes[1] : 0;
      if (Math.abs(gp.axes[1]) > 0.15) i.backward = gp.axes[1] > 0 ? gp.axes[1] : 0;
      // Buttons: 0=A/X, 1=B/Color1, 2=Color2/Y, 7=RightTrigger
      if (gp.buttons[7] && gp.buttons[7].value > 0.5) i.forward = Math.max(i.forward, gp.buttons[7].value);
      if (gp.buttons[6] && gp.buttons[6].value > 0.5) i.backward = Math.max(i.backward, gp.buttons[6].value);
      if (gp.buttons[0] && gp.buttons[0].pressed) i.brake = true;
    }

    this.input = i;
    return i;
  }

  wasKeyPressed(code: string): boolean {
    return this.keys.has(code);
  }
}