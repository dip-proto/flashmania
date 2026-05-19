/** Keyboard and gamepad input manager */
export class InputManager {
  private keys: Map<string, boolean> = new Map();
  private justPressed: Map<string, boolean> = new Map();
  private prevKeys: Map<string, boolean> = new Map();
  public accelerate = false;
  public brake = false;
  public steerLeft = false;
  public steerRight = false;
  public restart = false;
  public restartJustPressed = false;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;

  constructor() {
    this.boundKeyDown = this.onKeyDown.bind(this);
    this.boundKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.keys.set(e.code, true);
    // Prevent default for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      e.preventDefault();
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keys.set(e.code, false);
  }

  update(): void {
    this.prevKeys = new Map(this.justPressed);

    this.accelerate = !!(this.keys.get('ArrowUp') || this.keys.get('KeyW'));
    this.brake = !!(this.keys.get('ArrowDown') || this.keys.get('KeyS'));
    this.steerLeft = !!(this.keys.get('ArrowLeft') || this.keys.get('KeyA'));
    this.steerRight = !!(this.keys.get('ArrowRight') || this.keys.get('KeyD'));
    this.restart = !!(this.keys.get('KeyR'));

    // Detect just-pressed for restart
    this.restartJustPressed = this.restart && !this.prevKeys.get('KeyR');

    // Gamepad support
    this.pollGamepad();
  }

  private pollGamepad(): void {
    const gamepads = navigator.getGamepads?.() ?? [];
    for (const gp of gamepads) {
      if (!gp) continue;
      // Right trigger = accelerate, Left trigger = brake
      const rt = gp.axes.length > 4 ? gp.axes[5] : (gp.buttons[7]?.value ?? 0);
      const lt = gp.axes.length > 4 ? gp.axes[4] : (gp.buttons[6]?.value ?? 0);
      if (rt > 0.2) this.accelerate = true;
      if (lt > 0.2) this.brake = true;

      // Left stick = steering
      const lx = gp.axes[0] ?? 0;
      if (lx < -0.2) this.steerLeft = true;
      if (lx > 0.2) this.steerRight = true;

      // A button = restart
      if (gp.buttons[0]?.pressed) {
        this.restart = true;
        if (!this.prevKeys.get('gp_restart')) this.restartJustPressed = true;
      }
    }
  }

  destroy(): void {
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
  }
}