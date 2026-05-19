import { InputState } from './types';
export declare class InputHandler {
    private state;
    private keyMap;
    private gamepadIndex;
    private prevGamepadButtons;
    constructor();
    private onKeyDown;
    private onKeyUp;
    updateGamepad(): void;
    getState(): InputState;
    consumeRestart(): boolean;
    reset(): void;
}
