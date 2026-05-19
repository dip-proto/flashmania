import { CarState } from './types';
export declare class AudioSystem {
    private audioContext;
    private masterGain;
    private engineOscillator;
    private engineGain;
    private surfaceOscillator;
    private surfaceGain;
    private muted;
    private lastSurface;
    private windOscillator;
    private windGain;
    private windFilter;
    init(): Promise<void>;
    resume(): Promise<void>;
    toggleMute(): boolean;
    isMuted(): boolean;
    private ensureEngine;
    updateEngine(car: CarState): void;
    private ensureWind;
    updateWind(car: CarState): void;
    private ensureSurface;
    updateSurface(car: CarState): void;
    playCheckpoint(): void;
    playFinish(): void;
    playBoost(): void;
    playCrash(): void;
}
