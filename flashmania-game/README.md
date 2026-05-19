# Flashmania TypeScript

A browser-based TypeScript time-trial racer inspired by `../flashmania_description.md`.

## Play

```bash
npm install
npm run build
# Open dist/index.html with a static server, or use:
npm run dev
```

Controls:

- Arrow keys or WASD: throttle, brake, and steer
- Brake while airborne: nose-dive for a faster landing
- Space: reset to last checkpoint
- R: restart the full run
- G: toggle the saved best-run ghost

## Implemented Concepts

- Pure solo point-to-point time trial against the clock
- Best-run ghost replay with no collision
- Millisecond timing, checkpoint gates, and bronze/silver/gold/author medals
- Distinct asphalt, dirt, ice, grass, plastic, water/wet-tire, and airborne physics
- Boost, engine-off, fragile, no-steering, no-brake, ramp, and loop/compression pads
- WebAudio engine pitch, tire slip, wind, checkpoint dings, and pad tones
- Canvas rendering with a modular suspended track layout
