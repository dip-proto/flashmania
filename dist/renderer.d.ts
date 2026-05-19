import { CarState, Track } from './types';
export declare class Renderer {
    private canvas;
    private ctx;
    private width;
    private height;
    constructor(canvas: HTMLCanvasElement);
    getWidth(): number;
    getHeight(): number;
    clear(): void;
    drawTrack(track: Track, checkpointsPassed: number): void;
    private drawBlock;
    private drawSurfaceBlock;
    private drawBoosterBlock;
    private drawCheckpoint;
    private drawFinishLine;
    private drawStartLine;
    private drawTriggerBlock;
    drawCar(car: CarState): void;
    drawCountdown(timeRemaining: number): void;
    drawFinishMessage(time: number, medal: import('./types').Medal | null): void;
    drawSpeedLines(speed: number): void;
}
