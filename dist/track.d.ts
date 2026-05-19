import { Track } from './types';
export declare function createDemoTrack(): Track;
export declare function getTrackBounds(track: Track): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
