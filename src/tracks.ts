import { TileType, Track } from './types';

export const TILE_SIZE = 120; // Size of each modular cell in pixels
// Map symbol representations
const CHAR_TO_TILE: Record<string, TileType> = {
  '.': 'empty',
  '#': 'wall',
  'H': 'road',
  'S': 'start',
  'F': 'finish',
  'C': 'checkpoint',
  'R': 'ramp',
  'D': 'dirt',
  'I': 'ice',
  'G': 'grass',
  'P': 'plastic',
  'B': 'booster',
  'E': 'engine_off',
  'W': 'fragile',
  'L': 'no_steer_brakes',
};

// Inverse representation for Track Editor string exports
const TILE_TO_CHAR: Record<TileType, string> = Object.entries(CHAR_TO_TILE).reduce(
  (acc, [char, tile]) => {
    acc[tile] = char;
    return acc;
  },
  {} as Record<TileType, string>
);

export function parseAsciiTrack(
  name: string,
  author: string,
  asciiLines: string[],
  bronze: number,
  silver: number,
  gold: number,
  authorTime: number
): Track {
  const height = asciiLines.length;
  const width = asciiLines[0].length;
  const tiles: Record<string, TileType> = {};

  for (let r = 0; r < height; r++) {
    const line = asciiLines[r];
    for (let c = 0; c < width; c++) {
      const char = line[c] || '.';
      const type = CHAR_TO_TILE[char] || 'empty';
      if (type !== 'empty') {
        tiles[`${c},${r}`] = type;
      }
    }
  }

  return {
    name,
    author,
    gridWidth: width,
    gridHeight: height,
    tiles,
    targetBronze: bronze,
    targetSilver: silver,
    targetGold: gold,
    targetAuthor: authorTime,
  };
}

// ----------------------------------------------------
// PRE-DESIGNED TRACK TEMPLATES
// ----------------------------------------------------

export const DEFAULT_TRACKS: Track[] = [
  // TRACK 1: ASPHALT ACADEMY
  parseAsciiTrack(
    'Asphalt Academy',
    'Championship Crew',
    [
      '####################',
      '#S...H..........CH.#',
      '#H...H...HHHH...H..#',
      '#H...H...H..H...H..#',
      '#H...H...H..H...H..#',
      '#H...H...H..H...H..#',
      '#H...H...H..H...HHH#',
      '#HHHHH...H..H......#',
      '#........H..HHHHHHH#',
      '#........H........F#',
      '####################',
    ],
    22000, // Bronze: 22s
    16000, // Silver: 16s
    11500, // Gold: 11.5s
    8900   // Author: 8.9s
  ),

  // TRACK 2: GRAVEL CARVER
  parseAsciiTrack(
    'Gravel Carver',
    'Dirt Devil',
    [
      '####################',
      '#SDDD...........CD.#',
      '#...D...DDDD...DDD.#',
      '#...D...D..D...D...#',
      '#...D...D..D...D...#',
      '#...DDDDD..D...DDDD#',
      '#..........D.......#',
      '#...DDDDDDDD...DDDD#',
      '#...D..........D..F#',
      '####################',
    ],
    30000,
    21000,
    15500,
    12400
  ),

  // TRACK 3: CHILLING ICE DANCE
  parseAsciiTrack(
    'Chilling Ice Dance',
    'Figure Skater',
    [
      '####################',
      '#SIII...........CI.#',
      '#...I...IIII...III.#',
      '#...I...I..I...I...#',
      '#...IIIII..I...I...#',
      '#..........I...IIII#',
      '#...IIIIIIII.......#',
      '#...I..........IIIF#',
      '####################',
    ],
    40000,
    28000,
    20000,
    16800
  ),

  // TRACK 4: FLIGHT SPEEDWAY
  parseAsciiTrack(
    'Flight Speedway',
    'Gravity Defier',
    [
      '####################',
      '#S...H...R......GR.#',
      '#H...H..........G..#',
      '#H...H...C......G..#',
      '#B...H...R......GR.#',
      '#B...H..........G..#',
      '#H...HHHHHHH....HHH#',
      '#H..........B......#',
      '#HHHHHHHHHHHHHHHHHF#',
      '####################',
    ],
    25000,
    18000,
    14000,
    11500
  ),

  // TRACK 5: GIMMICK MAYHEM
  parseAsciiTrack(
    'Gimmick Mayhem',
    'Tech Puzzle designer',
    [
      '####################',
      '#S...W..H..........#',
      '#H...W..H...ECHH...#',
      '#H...H..H...H..H...#',
      '#E...H..C...H..L...#',
      '#H...HHHH...HHHH...#',
      '#H................H#',
      '#L...HHHHHHHHHH...B#',
      '#H...H........H..HF#',
      '####################',
    ],
    33000,
    26000,
    21000,
    17200
  ),
];

// Helper to determine starting coordinates
export function getStartTileCoords(track: Track): { x: number; y: number } {
  for (const [key, type] of Object.entries(track.tiles)) {
    if (type === 'start') {
      const [col, row] = key.split(',').map(Number);
      return {
        x: col * TILE_SIZE + TILE_SIZE / 2,
        y: row * TILE_SIZE + TILE_SIZE / 2,
      };
    }
  }
  
  // Default fallback if no start tile exists
  return { x: TILE_SIZE + TILE_SIZE / 2, y: TILE_SIZE + TILE_SIZE / 2 };
}

// Helper to scan checkpoint coordinates in sequential index mapping
export interface CheckpointNode {
  x: number;
  y: number;
}

export function getCheckpointNodes(track: Track): CheckpointNode[] {
  const nodes: CheckpointNode[] = [];
  for (const [key, type] of Object.entries(track.tiles)) {
    if (type === 'checkpoint') {
      const [col, row] = key.split(',').map(Number);
      nodes.push({
        x: col * TILE_SIZE + TILE_SIZE / 2,
        y: row * TILE_SIZE + TILE_SIZE / 2,
      });
    }
  }
  return nodes;
}

// ----------------------------------------------------
// TRACK SERIALIZATION / COMPRESSION String formats
// ----------------------------------------------------

export function exportTrackToString(track: Track): string {
  const data = {
    n: track.name,
    a: track.author,
    w: track.gridWidth,
    h: track.gridHeight,
    tb: track.targetBronze,
    ts: track.targetSilver,
    tg: track.targetGold,
    ta: track.targetAuthor,
    grid: {} as Record<string, string>,
  };

  for (const [key, type] of Object.entries(track.tiles)) {
    data.grid[key] = TILE_TO_CHAR[type] || '.';
  }

  // Base64 encode JSON to make compact transferable string shareable!
  const json = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(json)));
}

export function importTrackFromString(compressed: string): Track | null {
  try {
    const json = decodeURIComponent(escape(atob(compressed)));
    const data = JSON.parse(json);

    const tiles: Record<string, TileType> = {};
    for (const [key, char] of Object.entries(data.grid as Record<string, string>)) {
      const type = CHAR_TO_TILE[char];
      if (type && type !== 'empty') {
        tiles[key] = type;
      }
    }

    return {
      name: data.n,
      author: data.a,
      gridWidth: data.w,
      gridHeight: data.h,
      tiles,
      targetBronze: data.tb,
      targetSilver: data.ts,
      targetGold: data.tg,
      targetAuthor: data.ta,
    };
  } catch (e) {
    console.error('Failed to import track string:', e);
    return null;
  }
}
