# Flashmania

A sensory and spatial time trial racing game built in TypeScript with HTML5 Canvas.

## Running the Game

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Controls

| Key | Action |
|-----|--------|
| Arrow Up / W | Accelerate |
| Arrow Down / S / Space | Brake |
| Arrow Left / A | Steer Left |
| Arrow Right / D | Steer Right |
| R | Restart Race |
| M | Mute Audio |

**Gamepad Support:** Full gamepad support with rumble feedback for drifting, high speed, and boost effects.

## Features

### Surface Types
- **Road (Asphalt)** - High grip, precision steering required
- **Dirt** - Low grip, smooth arcs needed to maintain control
- **Ice** - Near-zero friction, counter-steer to slide
- **Grass** - Dampened speed but stable, wide steering lines
- **Plastic** - Slippery and bouncy

### Special Blocks
- **Boosters** (Golden) - Massive acceleration burst
- **No Brakes** (Red zone) - Controls locked, plan ahead
- **Fragile** (Orange zone) - Steer carefully to avoid damage
- **Coasting** (Gray zone) - Engine off, use momentum only

### Audio System
- Engine sounds that pitch with RPM and speed
- Surface-specific audio (asphalt screech, dirt gravel, ice scrape)
- Wind sounds at high speeds
- Checkpoint chimes and finish fanfare
- All synthesized in real-time using Web Audio API

### Haptic Feedback
- Gamepad rumble for drifting, high speed, and boost
- Immersive force feedback during gameplay

### Medal System
- **Bronze** - Complete the course
- **Silver** - Under 25 seconds
- **Gold** - Under 20 seconds
- **Author** - Under 17 seconds (near-perfect run)

## Architecture

```
src/
├── types.ts      - Type definitions
├── config.ts     - Physics constants
├── surfaces.ts   - Surface property definitions
├── physics.ts    - Car physics engine
├── track.ts      - Track generation
├── audio.ts      - Web Audio synthesis
├── input.ts      - Keyboard & gamepad input
├── renderer.ts   - Canvas 2D rendering
└── main.ts       - Game loop and state management
```

## Physics

The game simulates:
- Forward/lateral velocity with grip-based friction
- Drift mechanics (car slides when turning sharply at speed)
- Airborne car control (nose-dive with brake)
- Surface-specific handling characteristics
- Boost and special effect modifiers

## TODO

- [ ] 3D rendering with Three.js
- [ ] Track editor
- [ ] More track templates
- [ ] Ghost replay system
- [ ] Online leaderboards