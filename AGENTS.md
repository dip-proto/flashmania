## Workflow

- install: `npm ci`
- build: `npm run build`
- test all: not configured
- test file: not configured
- test case: not configured
- lint: not configured
- format: not configured
- typecheck: `npm run build`
- after every edit: `npm run build`
- debug: `npm run dev`; `npm run preview`

## Conventions

- Tracks are sparse grids keyed as `"col,row"` strings, not nested arrays; this format is shared by track parsing/export, editor painting, physics lookup, rendering, and checkpoint logic.
- Time values are stored and compared in milliseconds across medals, race time, ghost frames, PBs, and track targets; only editor input/display converts seconds or `MM:SS.mmm`.
- `updateCar` mutates the passed `Car` in place and returns only cross-system side effects: `{ particles, screenShake, soundTrigger }`.
- Built-in tracks use ASCII maps through `CHAR_TO_TILE`; editor import/export uses Base64 JSON with compact keys like `n`, `a`, `w`, `h`, `tb`, `ts`, `tg`, `ta`, `grid`.
- Persistent player data is split by key prefix: PBs use `pb_${trackName}`, while ghost recordings use `ghost_${trackId}`.
- HTML ids/classes are TypeScript API surface: `btn-*`, `hud-*`, `det-*`, `fin-*`, and `editor-*` ids are looked up directly, and screen visibility depends on `.screen`, `.active`, `.hidden`.

## Commit & Pull Request Guidelines

Only one commit is present, so style evidence is minimal: short unprefixed subjects, no scope convention, and no tense pattern can be inferred. Real example subject: `Init`.

No PR template is present. PR descriptions should briefly state gameplay/UI impact, validation run (especially `npm run build`), and link issues when applicable.
