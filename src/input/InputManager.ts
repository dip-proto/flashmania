export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  restart: boolean;
  pause: boolean;
}

export class InputManager {
  private state: InputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    restart: false,
    pause: false,
  };

  constructor() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
    // Prevent scrolling with game keys
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Escape'].includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.state.forward = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.state.backward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.state.left = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.state.right = true;
        break;
      case 'KeyR':
        this.state.restart = true;
        break;
      case 'Escape':
      case 'KeyP':
        this.state.pause = true;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.state.forward = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.state.backward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.state.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.state.right = false;
        break;
      case 'KeyR':
        this.state.restart = false;
        break;
      case 'Escape':
      case 'KeyP':
        this.state.pause = false;
        break;
    }
  }

  getState(): InputState {
    return { ...this.state };
  }

  consumeRestart(): boolean {
    if (this.state.restart) {
      this.state.restart = false;
      return true;
    }
    return false;
  }

  consumePause(): boolean {
    if (this.state.pause) {
      this.state.pause = false;
      return true;
    }
    return false;
  }
}
