import * as THREE from 'three';
import { Track } from './Track';
import { TrackSegment } from './TrackSegment';
import { SurfaceType, SpecialPad } from '../types/Surface';

/**
 * A fun demo track showcasing all surfaces and special pads.
 * Layout: Start → asphalt straight + booster → dirt curve → ice section with ramp →
 *          grass straight → no-steering zone → engine-off coast → plastic curve →
 *          final boost → finish
 */
export function createDemoTrack(): Track {
  const track = new Track(
    'Flashmania Demo',
    45,   // bronze target (seconds)
    35,   // silver
    28,   // gold
    22,   // author medal
  );

  let zPos = 0;

  // ==============================
  // SECTION 1: Start Straight (asphalt) with booster
  // ==============================
  for (let i = 0; i < 6; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    seg.setPosition(0, 0, zPos - i * 10);
    track.addSegment(seg);
  }

  // Booster on the straight
  const boostSeg = new TrackSegment(6, 6, 0.3, SurfaceType.ASPHALT, SpecialPad.BOOSTER);
  boostSeg.setPosition(0, 0.75, zPos - 35);
  track.addSegment(boostSeg);

  zPos -= 60;

  // Checkpoint 1
  track.addCheckpoint(new THREE.Vector3(0, 4, zPos + 20));

  // ==============================
  // SECTION 2: Right curve (asphalt)
  // ==============================
  addArc(track, -5, 0, zPos, 18, 0, Math.PI / 2, SurfaceType.ASPHALT);

  zPos -= 30;

  // ==============================
  // SECTION 3: Dirt section (sliding!) with left curve
  // ==============================
  addArc(track, -5 + 30, 0, zPos - 15, 20, Math.PI / 2, Math.PI, SurfaceType.DIRT);

  zPos -= 35;

  // Checkpoint 2 — entering dirt
  track.addCheckpoint(new THREE.Vector3(-5, 4, zPos + 20));

  // Dirt straight
  for (let i = 0; i < 3; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.DIRT);
    seg.setPosition(zPos - 45 + i * 10, 0, zPos);
    track.addSegment(seg);
  }

  zPos -= 20;

  // ==============================
  // SECTION 4: Ice section with right curve (VERY slippery!)
  // ==============================
  addArc(track, zPos - 30 + 15, 0, zPos - 15, 18, Math.PI, Math.PI * 1.5, SurfaceType.ICE);

  zPos -= 30;

  // Checkpoint 3 — ice section
  track.addCheckpoint(new THREE.Vector3(zPos - 25, 4, zPos + 10));

  // Ice straight
  for (let i = 0; i < 4; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ICE);
    seg.setPosition(zPos - 35 + i * 10, 0, zPos);
    track.addSegment(seg);
  }

  zPos -= 20;

  // ==============================
  // SECTION 5: Ramp / Jump! (asphalt ramp going up then landing)
  // ==============================
  const rampLength = 4;
  for (let i = 0; i < rampLength; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    const ry = i * 1.8; // Ramp going up
    seg.setPosition(zPos - 30 + i * 10, ry, zPos);
    seg.setRotation(0, 0, Math.atan(-1.8 / 10) * -i * 0.25);
    track.addSegment(seg);
  }

  // Landing area (flat asphalt after the jump)
  for (let i = 0; i < 3; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    seg.setPosition(zPos - 20 + i * 10, 0, zPos);
    track.addSegment(seg);
  }

  zPos -= 30;

  // Checkpoint 4 — after the jump
  track.addCheckpoint(new THREE.Vector3(zPos - 25, 8, zPos));

  // ==============================
  // SECTION 6: Grass section (slow but stable) with left curve
  // ==============================
  addArc(track, zPos + 5, 0, zPos, 22, Math.PI * 1.5, Math.PI * 2, SurfaceType.GRASS);

  zPos -= 35;

  // Checkpoint 5 — grass
  track.addCheckpoint(new THREE.Vector3(zPos + 15, 4, zPos + 10));

  // ==============================
  // SECTION 7: Special Pads corridor (asphalt)
  // ==============================
  for (let i = 0; i < 2; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    seg.setPosition(zPos + 10 - i * 5, 0, zPos - i * 10);
    track.addSegment(seg);
  }

  // No Steering zone
  const nsSeg = new TrackSegment(6, 12, 0.3, SurfaceType.ASPHALT, SpecialPad.NO_STEERING);
  nsSeg.setPosition(zPos - 5, 0.75, zPos - 25);
  track.addSegment(nsSeg);

  // No Brakes zone
  const nbSeg = new TrackSegment(6, 12, 0.3, SurfaceType.ASPHALT, SpecialPad.NO_BRAKES);
  nbSeg.setPosition(zPos - 5, 0.75, zPos - 45);
  track.addSegment(nbSeg);

  // Engine Off zone (coast!)
  const eoSeg = new TrackSegment(6, 18, 0.3, SurfaceType.ASPHALT, SpecialPad.ENGINE_OFF);
  eoSeg.setPosition(zPos - 5, 0.75, zPos - 65);
  track.addSegment(eoSeg);

  // Fragile zone
  const fSeg = new TrackSegment(6, 12, 0.3, SurfaceType.ASPHALT, SpecialPad.FRAGILE);
  fSeg.setPosition(zPos - 5, 0.75, zPos - 85);
  track.addSegment(fSeg);

  zPos -= 95;

  // ==============================
  // SECTION 8: Plastic curve (slippery!) with right turn
  // ==============================
  addArc(track, zPos - 10, 0, zPos, 20, Math.PI / 4, Math.PI * 3 / 4, SurfaceType.PLASTIC);

  zPos -= 30;

  // Checkpoint 6 — plastic section
  track.addCheckpoint(new THREE.Vector3(zPos + 15, 4, zPos));

  // ==============================
  // SECTION 9: Final stretch with booster and finish
  // ==============================
  for (let i = 0; i < 4; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    seg.setPosition(zPos - 25 + i * 10, 0, zPos);
    track.addSegment(seg);
  }

  // Final booster!
  const finalBoost = new TrackSegment(6, 6, 0.3, SurfaceType.ASPHALT, SpecialPad.BOOSTER);
  finalBoost.setPosition(zPos - 10, 0.75, zPos);
  track.addSegment(finalBoost);

  // Finish straight
  for (let i = 0; i < 4; i++) {
    const seg = new TrackSegment(8, 10, 1.5, SurfaceType.ASPHALT);
    seg.setPosition(zPos + 35 + i * 10, 0, zPos);
    track.addSegment(seg);
  }

  // Finish checkpoint (with isFinish flag)
  const finishPos = new THREE.Vector3(zPos + 80, 4, zPos);
  track.addCheckpoint(finishPos, true);

  return track;
}

/**
 * Helper: adds an arc of track segments.
 */
function addArc(
  track: Track,
  centerX: number,
  centerY: number,
  centerZ: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  surface: SurfaceType,
  pad: SpecialPad = SpecialPad.NONE,
): void {
  const steps = Math.ceil(Math.abs(endAngle - startAngle) / (Math.PI / 8)); // ~0.4 rad per step
  for (let i = 0; i <= steps; i++) {
    const t = i / Math.max(steps, 1);
    const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);

    const x = centerX + radius * Math.cos(angle);
    const z = centerZ + radius * Math.sin(angle);

    const seg = new TrackSegment(8, 10, 1.5, surface, pad);
    seg.setPosition(x, centerY, z);
    // Rotate to face along the arc tangent
    const rotY = -angle + Math.PI / 2;
    seg.setRotation(rotY);
    track.addSegment(seg);
  }
}
