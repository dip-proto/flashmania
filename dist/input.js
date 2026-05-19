// Input handling with keyboard and gamepad support
export class InputHandler {
    constructor() {
        this.state = {
            accelerate: false,
            brake: false,
            left: false,
            right: false,
            restart: false
        };
        this.keyMap = {
            'ArrowUp': 'accelerate',
            'KeyW': 'accelerate',
            'ArrowDown': 'brake',
            'KeyS': 'brake',
            'Space': 'brake',
            'ArrowLeft': 'left',
            'KeyA': 'left',
            'ArrowRight': 'right',
            'KeyD': 'right',
            'KeyR': 'restart'
        };
        this.gamepadIndex = -1;
        this.prevGamepadButtons = [];
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    onKeyDown(e) {
        const action = this.keyMap[e.code];
        if (action) {
            this.state[action] = true;
            e.preventDefault();
        }
    }
    onKeyUp(e) {
        const action = this.keyMap[e.code];
        if (action) {
            this.state[action] = false;
        }
    }
    updateGamepad() {
        const gamepads = navigator.getGamepads();
        let gamepad = null;
        // Find first connected gamepad
        for (const gp of gamepads) {
            if (gp) {
                gamepad = gp;
                break;
            }
        }
        if (!gamepad) {
            this.gamepadIndex = -1;
            return;
        }
        // Auto-detect gamepad
        if (this.gamepadIndex === -1) {
            this.gamepadIndex = 0;
            this.prevGamepadButtons = new Array(gamepad.buttons.length).fill(false);
        }
        // Update from gamepad (with some deadzone)
        const deadzone = 0.15;
        const threshold = 0.5;
        // Left stick X axis
        const lx = gamepad.axes[0] || 0;
        this.state.left = this.state.left || lx < -threshold;
        this.state.right = this.state.right || lx > threshold;
        // Buttons (usually A/Cross = accelerate, B/Circle = brake)
        if (gamepad.buttons[0]) { // A / Cross
            this.state.accelerate = this.state.accelerate || gamepad.buttons[0].pressed;
        }
        if (gamepad.buttons[1]) { // B / Circle
            this.state.brake = this.state.brake || gamepad.buttons[1].pressed;
        }
        if (gamepad.buttons[9]) { // Start
            this.state.restart = this.state.restart || gamepad.buttons[9].pressed;
        }
        // Trigger buttons (often used for acceleration)
        if (gamepad.buttons[6]) { // Left trigger
            this.state.brake = this.state.brake || gamepad.buttons[6].value > deadzone;
        }
        if (gamepad.buttons[7]) { // Right trigger
            this.state.accelerate = this.state.accelerate || gamepad.buttons[7].value > deadzone;
        }
        this.prevGamepadButtons = gamepad.buttons.map(b => b.pressed);
    }
    getState() {
        return { ...this.state };
    }
    consumeRestart() {
        const pressed = this.state.restart;
        this.state.restart = false;
        return pressed;
    }
    reset() {
        this.state.accelerate = false;
        this.state.brake = false;
        this.state.left = false;
        this.state.right = false;
        this.state.restart = false;
    }
}
