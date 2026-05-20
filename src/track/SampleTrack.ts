/**
 * SampleTrack — Generates a demo track showcasing all features.
 */

import { Track, TrackSegment } from './Track';
import { SurfaceType } from '../physics/Surfaces';

export function createSampleTrack(): Track {
  const track = new Track();

  // Starting straight (asphalt)
  track.addSegment({
    type: 'straight',
    length: 40,
    surface: 'asphalt',
  });

  // First checkpoint
  track.addSegment({
    type: 'straight',
    length: 10,
    surface: 'asphalt',
    specialPad: 'checkpoint',
    specialPadPosition: 0.5,
  });

  // Gentle right curve on asphalt
  track.addSegment({
    type: 'curve',
    length: 30,
    surface: 'asphalt',
    curveRadius: 25,
  });

  // Boost pad before a straight
  track.addSegment({
    type: 'straight',
    length: 20,
    surface: 'asphalt',
    specialPad: 'booster',
    specialPadPosition: 0.3,
  });

  // Long straight with boost
  track.addSegment({
    type: 'straight',
    length: 50,
    surface: 'asphalt',
  });

  // Second checkpoint
  track.addSegment({
    type: 'straight',
    length: 10,
    surface: 'asphalt',
    specialPad: 'checkpoint',
    specialPadPosition: 0.5,
  });

  // Dirt section — low grip, sliding
  track.addSegment({
    type: 'curve',
    length: 35,
    surface: 'dirt',
    curveRadius: -20, // left curve
  });

  // Dirt straight
  track.addSegment({
    type: 'straight',
    length: 25,
    surface: 'dirt',
  });

  // Jump!
  track.addSegment({
    type: 'jump',
    length: 35,
    surface: 'asphalt',
    jumpHeight: 10,
  });

  // Third checkpoint after jump
  track.addSegment({
    type: 'straight',
    length: 10,
    surface: 'asphalt',
    specialPad: 'checkpoint',
    specialPadPosition: 0.5,
  });

  // Ice section — near zero grip
  track.addSegment({
    type: 'straight',
    length: 20,
    surface: 'ice',
  });

  // Ice curve — very slippery
  track.addSegment({
    type: 'curve',
    length: 30,
    surface: 'ice',
    curveRadius: 25,
  });

  // Engine off pad — coast through next section
  track.addSegment({
    type: 'straight',
    length: 15,
    surface: 'asphalt',
    specialPad: 'engine_off',
    specialPadPosition: 0.2,
  });

  // Hill climb after engine off
  track.addSegment({
    type: 'hill',
    length: 30,
    surface: 'asphalt',
    heightChange: 8,
  });

  // Fourth checkpoint at top of hill
  track.addSegment({
    type: 'straight',
    length: 10,
    surface: 'asphalt',
    specialPad: 'checkpoint',
    specialPadPosition: 0.5,
  });

  // Spiral section
  track.addSegment({
    type: 'spiral',
    length: 40,
    surface: 'plastic',
    spiralDirection: 1,
  });

  // Grass section — slow but stable
  track.addSegment({
    type: 'straight',
    length: 20,
    surface: 'grass',
  });

  // No steering pad
  track.addSegment({
    type: 'straight',
    length: 25,
    surface: 'asphalt',
    specialPad: 'no_steering',
    specialPadPosition: 0.15,
  });

  // Fifth checkpoint
  track.addSegment({
    type: 'straight',
    length: 10,
    surface: 'asphalt',
    specialPad: 'checkpoint',
    specialPadPosition: 0.5,
  });

  // Fragile pad — one crash and you're done
  track.addSegment({
    type: 'curve',
    length: 25,
    surface: 'asphalt',
    curveRadius: -18,
    specialPad: 'fragile',
    specialPadPosition: 0.1,
  });

  // Final boost before finish
  track.addSegment({
    type: 'straight',
    length: 30,
    surface: 'asphalt',
    specialPad: 'booster',
    specialPadPosition: 0.2,
  });

  // Finish line
  track.addSegment({
    type: 'straight',
    length: 20,
    surface: 'asphalt',
    specialPad: 'finish',
    specialPadPosition: 0.5,
  });

  track.build();
  return track;
}

/**
 * Medal time targets for the sample track
 */
export const SAMPLE_MEDAL_TIMES = {
  bronze: 35,
  silver: 28,
  gold: 23,
  author: 19,
};