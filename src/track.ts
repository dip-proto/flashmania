// Track definition and generation

import { Block, Track, Vector2D, SurfaceType, SpecialEffect } from './types';
import { SURFACE_DEFINITIONS } from './surfaces';

export function createDemoTrack(): Track {
  const blocks: Block[] = [];

  // Start zone - asphalt
  blocks.push(createBlock('start', 'start', { x: 200, y: 400 }, 100, 60, 'asphalt'));
  
  // Initial straight - asphalt
  blocks.push(createBlock('s1', 'surface', { x: 300, y: 400 }, 200, 60, 'asphalt'));
  
  // First curve - asphalt
  blocks.push(createBlock('c1', 'surface', { x: 480, y: 380 }, 120, 80, 'asphalt'));
  
  // Short straight
  blocks.push(createBlock('s2', 'surface', { x: 560, y: 300 }, 100, 60, 'asphalt'));
  
  // Dirt section
  blocks.push(createBlock('d1', 'surface', { x: 560, y: 200 }, 150, 80, 'dirt'));
  
  // Ice patch
  blocks.push(createBlock('i1', 'surface', { x: 650, y: 140 }, 120, 60, 'ice'));
  
  // Booster
  blocks.push(createBlock('b1', 'booster', { x: 780, y: 120 }, 80, 60));
  
  // Grass section
  blocks.push(createBlock('g1', 'surface', { x: 880, y: 120 }, 140, 60, 'grass'));
  
  // Checkpoint 1
  blocks.push(createBlock('cp1', 'checkpoint', { x: 980, y: 120 }, 20, 80));
  
  // Recovery straight
  blocks.push(createBlock('s3', 'surface', { x: 1050, y: 150 }, 150, 60, 'asphalt'));
  
  // Plastic bounce section
  blocks.push(createBlock('p1', 'surface', { x: 1180, y: 180 }, 100, 60, 'plastic'));
  
  // Another asphalt section
  blocks.push(createBlock('s4', 'surface', { x: 1280, y: 200 }, 120, 60, 'asphalt'));
  
  // S-curves
  blocks.push(createBlock('c2', 'surface', { x: 1380, y: 240 }, 80, 100, 'asphalt'));
  blocks.push(createBlock('c3', 'surface', { x: 1380, y: 340 }, 80, 100, 'asphalt'));
  
  // Narrow section with no brakes
  blocks.push(createBlock('nb1', 'trigger', { x: 1280, y: 400 }, 80, 60, undefined, 'noBrakes'));
  blocks.push(createBlock('s5', 'surface', { x: 1200, y: 420 }, 100, 50, 'asphalt'));
  blocks.push(createBlock('nb2', 'trigger', { x: 1100, y: 420 }, 80, 60, undefined, 'noBrakes'));
  
  // Fragile section
  blocks.push(createBlock('f1', 'trigger', { x: 1000, y: 420 }, 60, 60, undefined, 'fragile'));
  blocks.push(createBlock('s6', 'surface', { x: 900, y: 420 }, 100, 50, 'asphalt'));
  
  // Final stretch
  blocks.push(createBlock('s7', 'surface', { x: 780, y: 420 }, 120, 60, 'asphalt'));
  
  // Checkpoint 2
  blocks.push(createBlock('cp2', 'checkpoint', { x: 660, y: 420 }, 20, 80));
  
  // Final dirt
  blocks.push(createBlock('d2', 'surface', { x: 540, y: 420 }, 120, 60, 'dirt'));
  
  // Finish line
  blocks.push(createBlock('finish', 'finish', { x: 400, y: 420 }, 20, 80));

  return {
    name: 'Tutorial Valley',
    blocks,
    startPosition: { x: 200, y: 400 },
    startRotation: 0,
    checkpoints: ['cp1', 'cp2'],
    finishLine: 'finish',
    medalTimes: {
      bronze: 30000,  // 30 seconds
      silver: 25000,  // 25 seconds
      gold: 20000,    // 20 seconds
      author: 17000    // 17 seconds - very hard
    }
  };
}

function createBlock(
  id: string,
  type: 'surface' | 'booster' | 'checkpoint' | 'finish' | 'start' | 'trigger',
  center: Vector2D,
  width: number,
  height: number,
  surfaceType?: SurfaceType,
  specialEffect?: SpecialEffect
): Block {
  const block: Block = {
    id,
    type,
    center,
    width,
    height
  };

  if (surfaceType) {
    block.surfaceType = surfaceType;
  }

  if (specialEffect) {
    block.specialEffect = specialEffect;
  }

  // Add variant for visual differentiation
  if (type === 'surface' && surfaceType) {
    block.variant = surfaceType;
  } else if (type === 'booster') {
    block.variant = 'booster';
  }

  return block;
}

export function getTrackBounds(track: Track): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const block of track.blocks) {
    minX = Math.min(minX, block.center.x - block.width / 2);
    maxX = Math.max(maxX, block.center.x + block.width / 2);
    minY = Math.min(minY, block.center.y - block.height / 2);
    maxY = Math.max(maxY, block.center.y + block.height / 2);
  }

  return { minX, minY, maxX, maxY };
}