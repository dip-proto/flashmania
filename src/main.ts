import './styles.css';

type SurfaceName = 'asphalt' | 'dirt' | 'ice' | 'grass' | 'plastic' | 'air';
type PadType = 'booster' | 'engineOff' | 'fragile' | 'noSteering' | 'noBrakes' | 'finish';

type Vec = { x: number; y: number };

type SurfaceStats = {
  grip: number;
  drag: number;
  acceleration: number;
  color: string;
  accent: string;
  sound: string;
};

type Segment = {
  name: string;
  surface: SurfaceName;
  start: Vec;
  end: Vec;
  width: number;
};

type Pad = {
  type: PadType;
  pos: Vec;
  radius: number;
  label: string;
};

type Checkpoint = {
  pos: Vec;
  radius: number;
  label: string;
};

type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  airborne: number;
  wetTimer: number;
  engineOffTimer: number;
  noSteerTimer: number;
  noBrakeTimer: number;
  fragile: boolean;
  brokenSteering: number;
  wrongWayTimer: number;
};

type GhostSample = {
  x: number;
  y: number;
  angle: number;
  t: number;
};

type MedalName = 'Author' | 'Gold' | 'Silver' | 'Bronze' | 'Finish';

function mustQuery<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }
  return element;
}

const app = mustQuery<HTMLDivElement>('#app');

app.innerHTML = `
  <main class="shell">
    <section class="hero" aria-label="Flashmania game introduction">
      <div>
        <p class="eyebrow">Solo physics time trial</p>
        <h1>Flashmania</h1>
        <p class="lede">Memorize the route, listen to the surfaces, and chase milliseconds through a suspended modular track.</p>
      </div>
      <div class="medal-board" aria-label="Medal target times">
        <span><b>Author</b> 0:42.000</span>
        <span><b>Gold</b> 0:47.000</span>
        <span><b>Silver</b> 0:55.000</span>
        <span><b>Bronze</b> 1:08.000</span>
      </div>
    </section>

    <section class="cockpit">
      <canvas id="game" width="1280" height="720" aria-label="Flashmania playable canvas"></canvas>
      <div class="hud" aria-live="polite">
        <div><span>Time</span><strong id="timer">0:00.000</strong></div>
        <div><span>Best</span><strong id="best">--</strong></div>
        <div><span>Speed</span><strong id="speed">0 km/h</strong></div>
        <div><span>Surface</span><strong id="surface">Asphalt</strong></div>
        <div><span>Checkpoint</span><strong id="checkpoint">0 / 4</strong></div>
        <div><span>Status</span><strong id="status">Ready</strong></div>
      </div>
      <div id="announcement" class="announcement">Press Space or Accelerate to start</div>
    </section>

    <section class="controls">
      <div>
        <h2>Drive</h2>
        <p><kbd>W</kbd>/<kbd>Up</kbd> accelerate, <kbd>S</kbd>/<kbd>Down</kbd> brake, <kbd>A</kbd>/<kbd>D</kbd> steer, <kbd>Space</kbd> restart. Brake mid-air to nose down sooner.</p>
      </div>
      <div>
        <h2>Feel The Track</h2>
        <p>Asphalt grips, dirt carves, ice counter-slides, grass cushions, plastic and wet tires get twitchy. Ghosts show your best run but never collide.</p>
      </div>
      <button id="audio" type="button">Enable Engine Audio</button>
    </section>
  </main>
`;

const canvas = mustQuery<HTMLCanvasElement>('#game');
const timerEl = mustQuery<HTMLElement>('#timer');
const bestEl = mustQuery<HTMLElement>('#best');
const speedEl = mustQuery<HTMLElement>('#speed');
const surfaceEl = mustQuery<HTMLElement>('#surface');
const checkpointEl = mustQuery<HTMLElement>('#checkpoint');
const statusEl = mustQuery<HTMLElement>('#status');
const announcementEl = mustQuery<HTMLElement>('#announcement');
const audioButton = mustQuery<HTMLButtonElement>('#audio');

const maybeContext = canvas.getContext('2d');
if (!maybeContext) {
  throw new Error('Canvas 2D context unavailable');
}
const ctx = maybeContext;

const world = { width: 5200, height: 3100 };
const startPos: Vec = { x: 260, y: 1510 };
const finishPos: Vec = { x: 4900, y: 1510 };

const surfaces: Record<SurfaceName, SurfaceStats> = {
  asphalt: { grip: 5.7, drag: 0.985, acceleration: 860, color: '#2d3440', accent: '#dce5f0', sound: 'clean hum' },
  dirt: { grip: 2.75, drag: 0.972, acceleration: 650, color: '#9b6a39', accent: '#ffc26d', sound: 'gravel crunch' },
  ice: { grip: 0.65, drag: 0.994, acceleration: 440, color: '#c7f6ff', accent: '#226c86', sound: 'silver hiss' },
  grass: { grip: 3.8, drag: 0.945, acceleration: 560, color: '#6fa24b', accent: '#d6f5b1', sound: 'soft cushion' },
  plastic: { grip: 1.6, drag: 0.982, acceleration: 720, color: '#f25f5c', accent: '#ffe066', sound: 'hollow squeak' },
  air: { grip: 0, drag: 0.999, acceleration: 0, color: '#88d8ff', accent: '#ffffff', sound: 'airborne hush' }
};

const segments: Segment[] = [
  { name: 'launch asphalt', surface: 'asphalt', start: { x: 180, y: 1510 }, end: { x: 980, y: 1510 }, width: 240 },
  { name: 'dirt drift', surface: 'dirt', start: { x: 980, y: 1510 }, end: { x: 1520, y: 980 }, width: 240 },
  { name: 'ice counter-slide', surface: 'ice', start: { x: 1520, y: 980 }, end: { x: 2300, y: 990 }, width: 250 },
  { name: 'grass landing', surface: 'grass', start: { x: 2300, y: 990 }, end: { x: 2800, y: 1490 }, width: 270 },
  { name: 'plastic wallride', surface: 'plastic', start: { x: 2800, y: 1490 }, end: { x: 3500, y: 2020 }, width: 240 },
  { name: 'asphalt loop', surface: 'asphalt', start: { x: 3500, y: 2020 }, end: { x: 4140, y: 1720 }, width: 230 },
  { name: 'final chute', surface: 'asphalt', start: { x: 4140, y: 1720 }, end: { x: 5000, y: 1510 }, width: 230 }
];

const pads: Pad[] = [
  { type: 'booster', pos: { x: 720, y: 1510 }, radius: 82, label: 'BOOST' },
  { type: 'engineOff', pos: { x: 1215, y: 1280 }, radius: 76, label: 'ENGINE OFF' },
  { type: 'fragile', pos: { x: 2600, y: 1290 }, radius: 80, label: 'FRAGILE' },
  { type: 'noSteering', pos: { x: 3140, y: 1750 }, radius: 86, label: 'NO STEER' },
  { type: 'noBrakes', pos: { x: 3835, y: 1865 }, radius: 78, label: 'NO BRAKES' },
  { type: 'finish', pos: finishPos, radius: 110, label: 'FINISH' }
];

const checkpoints: Checkpoint[] = [
  { pos: { x: 1120, y: 1368 }, radius: 120, label: 'CP 1' },
  { pos: { x: 2110, y: 990 }, radius: 120, label: 'CP 2' },
  { pos: { x: 3160, y: 1760 }, radius: 120, label: 'CP 3' },
  { pos: { x: 4300, y: 1680 }, radius: 120, label: 'CP 4' }
];

const medalTimes: Record<Exclude<MedalName, 'Finish'>, number> = {
  Author: 42_000,
  Gold: 47_000,
  Silver: 55_000,
  Bronze: 68_000
};

const keys = new Set<string>();
const padTriggered = new Set<number>();
const checkpointHits = new Set<number>();
const currentRun: GhostSample[] = [];
let bestGhost: GhostSample[] = [];
let bestTime = Number.POSITIVE_INFINITY;
let started = false;
let finished = false;
let runStart = 0;
let finishTime = 0;
let lastFrame = performance.now();
let cameraShake = 0;
let checkpointPulse = 0;
let lapMessageTimer = 0;
let audio: AudioSystem | null = null;

const player: Player = {
  x: startPos.x,
  y: startPos.y,
  vx: 0,
  vy: 0,
  angle: 0,
  airborne: 0,
  wetTimer: 0,
  engineOffTimer: 0,
  noSteerTimer: 0,
  noBrakeTimer: 0,
  fragile: false,
  brokenSteering: 0,
  wrongWayTimer: 0
};

class AudioSystem {
  private readonly context: AudioContext;
  private readonly engine: OscillatorNode;
  private readonly engineGain: GainNode;
  private readonly noiseGain: GainNode;
  private readonly filter: BiquadFilterNode;
  private readonly compressor: DynamicsCompressorNode;

  constructor() {
    this.context = new AudioContext();
    this.engine = this.context.createOscillator();
    this.engine.type = 'sawtooth';
    this.engineGain = this.context.createGain();
    this.noiseGain = this.context.createGain();
    this.filter = this.context.createBiquadFilter();
    this.compressor = this.context.createDynamicsCompressor();

    const noiseBuffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.context.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    this.filter.type = 'bandpass';
    this.filter.frequency.value = 900;
    this.engineGain.gain.value = 0.025;
    this.noiseGain.gain.value = 0.018;

    this.engine.connect(this.engineGain).connect(this.compressor).connect(this.context.destination);
    noise.connect(this.filter).connect(this.noiseGain).connect(this.compressor);
    this.engine.start();
    noise.start();
  }

  async resume(): Promise<void> {
    await this.context.resume();
  }

  update(speed: number, slip: number, surface: SurfaceName, airborne: boolean): void {
    const now = this.context.currentTime;
    const surfaceTone = surface === 'ice' ? 1500 : surface === 'dirt' ? 520 : surface === 'plastic' ? 1120 : surface === 'grass' ? 360 : 840;
    const base = airborne ? 90 : 110;
    this.engine.frequency.setTargetAtTime(base + speed * 0.9, now, 0.04);
    this.engine.detune.setTargetAtTime(slip * -260, now, 0.04);
    this.engineGain.gain.setTargetAtTime(airborne ? 0.012 : 0.026 + Math.min(speed / 8000, 0.028), now, 0.04);
    this.filter.frequency.setTargetAtTime(surfaceTone + slip * 1200 + speed * 0.9, now, 0.04);
    this.noiseGain.gain.setTargetAtTime((airborne ? 0.006 : 0.012) + slip * 0.035, now, 0.04);
  }

  ding(): void {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1320;
    gain.gain.value = 0.001;
    osc.connect(gain).connect(this.context.destination);
    const t = this.context.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.23);
    osc.frequency.exponentialRampToValueAtTime(1760, t + 0.12);
    osc.start(t);
    osc.stop(t + 0.24);
  }
}

function resetRun(): void {
  player.x = startPos.x;
  player.y = startPos.y;
  player.vx = 0;
  player.vy = 0;
  player.angle = 0;
  player.airborne = 0;
  player.wetTimer = 0;
  player.engineOffTimer = 0;
  player.noSteerTimer = 0;
  player.noBrakeTimer = 0;
  player.fragile = false;
  player.brokenSteering = 0;
  player.wrongWayTimer = 0;
  padTriggered.clear();
  checkpointHits.clear();
  currentRun.length = 0;
  started = false;
  finished = false;
  runStart = performance.now();
  finishTime = 0;
  lapMessageTimer = 0;
  announcementEl.textContent = 'Press Space or Accelerate to start';
}

function startRun(now: number): void {
  if (started) {
    return;
  }
  started = true;
  finished = false;
  runStart = now;
  announcementEl.textContent = 'Hunt the perfect line';
  lapMessageTimer = 1300;
}

function formatTime(ms: number): string {
  if (!Number.isFinite(ms)) {
    return '--';
  }
  const safeMs = Math.max(0, Math.floor(ms));
  const minutes = Math.floor(safeMs / 60000);
  const seconds = Math.floor((safeMs % 60000) / 1000);
  const millis = safeMs % 1000;
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
}

function getMedal(ms: number): MedalName {
  if (ms <= medalTimes.Author) return 'Author';
  if (ms <= medalTimes.Gold) return 'Gold';
  if (ms <= medalTimes.Silver) return 'Silver';
  if (ms <= medalTimes.Bronze) return 'Bronze';
  return 'Finish';
}

function distance(a: Vec, b: Vec): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function projectPointToSegment(point: Vec, segment: Segment): { distance: number; progress: number; closest: Vec } {
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  const lengthSquared = dx * dx + dy * dy;
  const raw = lengthSquared === 0 ? 0 : ((point.x - segment.start.x) * dx + (point.y - segment.start.y) * dy) / lengthSquared;
  const progress = clamp(raw, 0, 1);
  const closest = { x: segment.start.x + dx * progress, y: segment.start.y + dy * progress };
  return { distance: distance(point, closest), progress, closest };
}

function getTrackInfo(point: Vec): { segment: Segment | null; surface: SurfaceName; offTrack: boolean; distanceToCenter: number; progress: number } {
  let best: { segment: Segment | null; surface: SurfaceName; offTrack: boolean; distanceToCenter: number; progress: number } = {
    segment: null,
    surface: 'grass',
    offTrack: true,
    distanceToCenter: Number.POSITIVE_INFINITY,
    progress: 0
  };

  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    const projection = projectPointToSegment(point, segment);
    const edge = segment.width / 2;
    if (projection.distance < best.distanceToCenter) {
      best = {
        segment,
        surface: projection.distance <= edge ? segment.surface : 'grass',
        offTrack: projection.distance > edge,
        distanceToCenter: projection.distance,
        progress: i + projection.progress
      };
    }
  }

  return best;
}

function getControls(): { throttle: number; brake: number; steer: number } {
  const throttle = keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0;
  const brake = keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0;
  const left = keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0;
  const right = keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0;
  return { throttle, brake, steer: right - left };
}

function hitWall(info: ReturnType<typeof getTrackInfo>, dt: number): void {
  if (!info.segment) {
    return;
  }

  const projection = projectPointToSegment({ x: player.x, y: player.y }, info.segment);
  const overEdge = projection.distance - info.segment.width / 2;
  if (overEdge <= 0) {
    return;
  }

  const nx = player.x - projection.closest.x;
  const ny = player.y - projection.closest.y;
  const len = Math.hypot(nx, ny) || 1;
  const normalX = nx / len;
  const normalY = ny / len;
  player.x -= normalX * overEdge * clamp(dt * 18, 0, 1);
  player.y -= normalY * overEdge * clamp(dt * 18, 0, 1);

  const normalVelocity = player.vx * normalX + player.vy * normalY;
  if (normalVelocity > 0) {
    player.vx -= normalX * normalVelocity * 1.35;
    player.vy -= normalY * normalVelocity * 1.35;
    cameraShake = Math.max(cameraShake, clamp(normalVelocity / 18, 4, 18));
    if (player.fragile) {
      player.brokenSteering = Math.max(player.brokenSteering, 9);
      player.fragile = false;
      announcementEl.textContent = 'Fragile hit: steering knocked out of alignment';
      lapMessageTimer = 2200;
    }
  }
}

function applyPads(now: number): void {
  for (let i = 0; i < pads.length; i += 1) {
    const pad = pads[i];
    const d = distance(player, pad.pos);
    if (d > pad.radius) {
      continue;
    }

    if (pad.type === 'finish') {
      if (!finished && checkpointHits.size === checkpoints.length && started) {
        finishRun(now);
      }
      continue;
    }

    if (padTriggered.has(i)) {
      continue;
    }

    padTriggered.add(i);
    switch (pad.type) {
      case 'booster': {
        const boost = 720;
        player.vx += Math.cos(player.angle) * boost;
        player.vy += Math.sin(player.angle) * boost;
        announcementEl.textContent = 'Booster: neck-snapping acceleration';
        cameraShake = Math.max(cameraShake, 10);
        break;
      }
      case 'engineOff':
        player.engineOffTimer = 3.2;
        announcementEl.textContent = 'Engine off: coast on momentum';
        break;
      case 'fragile':
        player.fragile = true;
        announcementEl.textContent = 'Fragile: avoid every wall touch';
        break;
      case 'noSteering':
        player.noSteerTimer = 2.45;
        announcementEl.textContent = 'No steering: trust your setup line';
        break;
      case 'noBrakes':
        player.noBrakeTimer = 2.4;
        announcementEl.textContent = 'No brakes: commit to speed';
        break;
      default:
        break;
    }
    lapMessageTimer = 1800;
  }
}

function applyCheckpoints(): void {
  checkpoints.forEach((checkpoint, index) => {
    if (checkpointHits.has(index)) {
      return;
    }
    if (distance(player, checkpoint.pos) <= checkpoint.radius) {
      checkpointHits.add(index);
      checkpointPulse = 1;
      announcementEl.textContent = `${checkpoint.label}: ding-ding-ding`;
      lapMessageTimer = 1300;
      audio?.ding();
    }
  });
}

function finishRun(now: number): void {
  finished = true;
  finishTime = now - runStart;
  const medal = getMedal(finishTime);
  if (finishTime < bestTime) {
    bestTime = finishTime;
    bestGhost = currentRun.map((sample) => ({ ...sample }));
    bestEl.textContent = formatTime(bestTime);
  }
  announcementEl.textContent = `${medal} medal - ${formatTime(finishTime)}. Space to chase another millisecond.`;
  lapMessageTimer = Number.POSITIVE_INFINITY;
  audio?.ding();
}

function update(dt: number, now: number): void {
  const controls = getControls();
  if (!started && (controls.throttle || controls.brake || controls.steer)) {
    startRun(now);
  }
  if (finished) {
    return;
  }

  const trackInfo = getTrackInfo(player);
  const surface = player.airborne > 0 ? 'air' : trackInfo.surface;
  const stats = surfaces[surface];
  const speed = Math.hypot(player.vx, player.vy);
  const forwardX = Math.cos(player.angle);
  const forwardY = Math.sin(player.angle);
  const rightX = -Math.sin(player.angle);
  const rightY = Math.cos(player.angle);
  const forwardSpeed = player.vx * forwardX + player.vy * forwardY;
  const lateralSpeed = player.vx * rightX + player.vy * rightY;
  const effectiveGrip = Math.max(0.1, stats.grip * (player.wetTimer > 0 ? 0.48 : 1) * (player.brokenSteering > 0 ? 0.62 : 1));
  const effectiveBrake = player.noBrakeTimer > 0 ? 0 : controls.brake;
  const effectiveSteer = player.noSteerTimer > 0 ? 0 : controls.steer;
  const canAccelerate = player.engineOffTimer <= 0 && player.airborne <= 0;

  if (canAccelerate && controls.throttle) {
    player.vx += forwardX * stats.acceleration * dt;
    player.vy += forwardY * stats.acceleration * dt;
  }

  if (effectiveBrake) {
    if (player.airborne > 0) {
      player.airborne = Math.max(0, player.airborne - dt * 1.8);
      player.vx *= 0.995;
      player.vy *= 0.995;
    } else {
      player.vx -= forwardX * Math.min(forwardSpeed, 1020 * dt);
      player.vy -= forwardY * Math.min(forwardSpeed, 1020 * dt);
    }
  }

  const steerPower = (0.92 + speed / 1450) * effectiveGrip;
  const brokenBias = player.brokenSteering > 0 ? Math.sin(now / 180) * 0.42 : 0;
  player.angle += (effectiveSteer + brokenBias) * steerPower * dt;

  if (player.airborne > 0) {
    player.airborne = Math.max(0, player.airborne - dt);
    player.vx *= 0.999;
    player.vy *= 0.999;
  } else {
    const lateralGrip = clamp(effectiveGrip * dt, 0, 0.92);
    player.vx -= rightX * lateralSpeed * lateralGrip;
    player.vy -= rightY * lateralSpeed * lateralGrip;
    player.vx *= Math.pow(stats.drag, dt * 60);
    player.vy *= Math.pow(stats.drag, dt * 60);
  }

  if (trackInfo.segment?.name === 'grass landing' && trackInfo.progress > 3.35 && trackInfo.progress < 3.65 && speed > 620 && player.airborne <= 0) {
    player.airborne = 1.2;
    announcementEl.textContent = 'Airborne: tap brake to snap the nose down';
    lapMessageTimer = 1600;
  }

  if (trackInfo.segment?.name === 'plastic wallride' && speed > 700) {
    const compression = clamp((speed - 700) / 700, 0, 1);
    cameraShake = Math.max(cameraShake, compression * 8);
  }

  player.x += player.vx * dt;
  player.y += player.vy * dt;
  player.x = clamp(player.x, 80, world.width - 80);
  player.y = clamp(player.y, 80, world.height - 80);
  player.angle = normalizeAngle(player.angle);
  player.wetTimer = Math.max(0, player.wetTimer - dt);
  player.engineOffTimer = Math.max(0, player.engineOffTimer - dt);
  player.noSteerTimer = Math.max(0, player.noSteerTimer - dt);
  player.noBrakeTimer = Math.max(0, player.noBrakeTimer - dt);
  player.brokenSteering = Math.max(0, player.brokenSteering - dt);

  const newTrackInfo = getTrackInfo(player);
  if (!trackInfo.offTrack && newTrackInfo.surface === 'grass' && speed > 180) {
    player.wetTimer = Math.max(player.wetTimer, 2.2);
  }
  if (newTrackInfo.offTrack) {
    hitWall(newTrackInfo, dt);
  }

  applyPads(now);
  applyCheckpoints();

  const routeDirection = newTrackInfo.segment
    ? Math.atan2(newTrackInfo.segment.end.y - newTrackInfo.segment.start.y, newTrackInfo.segment.end.x - newTrackInfo.segment.start.x)
    : 0;
  const wrongWay = Math.abs(normalizeAngle(player.angle - routeDirection)) > Math.PI * 0.72 && speed > 240;
  player.wrongWayTimer = wrongWay ? player.wrongWayTimer + dt : Math.max(0, player.wrongWayTimer - dt * 2);

  if (started) {
    const t = now - runStart;
    if (currentRun.length === 0 || t - currentRun[currentRun.length - 1].t > 45) {
      currentRun.push({ x: player.x, y: player.y, angle: player.angle, t });
    }
  }

  const slip = clamp(Math.abs(lateralSpeed) / 580, 0, 1);
  audio?.update(speed, slip, surface, player.airborne > 0);

  if (lapMessageTimer !== Number.POSITIVE_INFINITY) {
    lapMessageTimer = Math.max(0, lapMessageTimer - dt * 1000);
    if (lapMessageTimer === 0) {
      announcementEl.textContent = started ? 'Hunt the perfect line' : 'Press Space or Accelerate to start';
    }
  }
}

function drawTrack(camera: Vec): void {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const segment of segments) {
    const stats = surfaces[segment.surface];
    ctx.strokeStyle = 'rgba(3, 7, 18, 0.55)';
    ctx.lineWidth = segment.width + 42;
    ctx.beginPath();
    ctx.moveTo(segment.start.x, segment.start.y + 16);
    ctx.lineTo(segment.end.x, segment.end.y + 16);
    ctx.stroke();

    ctx.strokeStyle = stats.color;
    ctx.lineWidth = segment.width;
    ctx.beginPath();
    ctx.moveTo(segment.start.x, segment.start.y);
    ctx.lineTo(segment.end.x, segment.end.y);
    ctx.stroke();

    ctx.strokeStyle = stats.accent;
    ctx.lineWidth = 5;
    ctx.setLineDash([24, 28]);
    ctx.beginPath();
    ctx.moveTo(segment.start.x, segment.start.y);
    ctx.lineTo(segment.end.x, segment.end.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  for (const checkpoint of checkpoints) {
    const hit = checkpointHits.has(checkpoints.indexOf(checkpoint));
    ctx.strokeStyle = hit ? '#a7f3d0' : '#67e8f9';
    ctx.lineWidth = 8 + checkpointPulse * 8;
    ctx.beginPath();
    ctx.arc(checkpoint.pos.x, checkpoint.pos.y, checkpoint.radius, 0, Math.PI * 2);
    ctx.stroke();
    drawWorldLabel(checkpoint.label, checkpoint.pos.x, checkpoint.pos.y - checkpoint.radius - 22, hit ? '#a7f3d0' : '#cffafe');
  }

  for (const pad of pads) {
    const colors: Record<PadType, string> = {
      booster: '#fbbf24',
      engineOff: '#94a3b8',
      fragile: '#fb7185',
      noSteering: '#38bdf8',
      noBrakes: '#f97316',
      finish: '#f8fafc'
    };
    ctx.fillStyle = colors[pad.type];
    ctx.globalAlpha = pad.type === 'finish' ? 0.95 : 0.82;
    ctx.beginPath();
    ctx.arc(pad.pos.x, pad.pos.y, pad.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 5;
    ctx.stroke();
    drawWorldLabel(pad.label, pad.pos.x, pad.pos.y + 8, '#0f172a', 18);
  }

  drawGhost(camera);
  drawCar(player.x, player.y, player.angle, false);

  ctx.restore();
}

function drawGhost(_camera: Vec): void {
  if (bestGhost.length < 2 || !started) {
    return;
  }
  const elapsed = performance.now() - runStart;
  let sample = bestGhost[bestGhost.length - 1];
  for (let i = 1; i < bestGhost.length; i += 1) {
    if (bestGhost[i].t >= elapsed) {
      const previous = bestGhost[i - 1];
      const next = bestGhost[i];
      const mix = clamp((elapsed - previous.t) / Math.max(1, next.t - previous.t), 0, 1);
      sample = {
        x: previous.x + (next.x - previous.x) * mix,
        y: previous.y + (next.y - previous.y) * mix,
        angle: previous.angle + normalizeAngle(next.angle - previous.angle) * mix,
        t: elapsed
      };
      break;
    }
  }
  ctx.save();
  ctx.globalAlpha = 0.36;
  drawCar(sample.x, sample.y, sample.angle, true);
  ctx.restore();
}

function drawWorldLabel(text: string, x: number, y: number, color: string, size = 24): void {
  ctx.save();
  ctx.font = `800 ${size}px Space Grotesk, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = 8;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawCar(x: number, y: number, angle: number, ghost: boolean): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = ghost ? '#dbeafe' : '#f8fafc';
  ctx.strokeStyle = ghost ? '#60a5fa' : '#020617';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.roundRect(-38, -22, 76, 44, 13);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = ghost ? '#93c5fd' : '#ef4444';
  ctx.beginPath();
  ctx.moveTo(34, 0);
  ctx.lineTo(8, -17);
  ctx.lineTo(8, 17);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#020617';
  ctx.fillRect(-24, -28, 16, 9);
  ctx.fillRect(-24, 19, 16, 9);
  ctx.fillRect(16, -28, 16, 9);
  ctx.fillRect(16, 19, 16, 9);
  ctx.restore();
}

function drawBackground(camera: Vec): void {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#102235');
  gradient.addColorStop(0.48, '#183a44');
  gradient.addColorStop(1, '#38230f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  const grid = 120;
  const offsetX = -((camera.x * 0.25) % grid);
  const offsetY = -((camera.y * 0.25) % grid);
  for (let x = offsetX; x < canvas.width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 120, canvas.height);
    ctx.stroke();
  }
  for (let y = offsetY; y < canvas.height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y - 80);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOverlay(): void {
  const trackInfo = getTrackInfo(player);
  const surface = player.airborne > 0 ? 'air' : trackInfo.surface;
  const stats = surfaces[surface];
  const speed = Math.hypot(player.vx, player.vy);
  const elapsed = finished ? finishTime : started ? performance.now() - runStart : 0;
  timerEl.textContent = formatTime(elapsed);
  speedEl.textContent = `${Math.round(speed * 0.18)} km/h`;
  surfaceEl.textContent = `${surface[0].toUpperCase()}${surface.slice(1)} (${stats.sound})`;
  checkpointEl.textContent = `${checkpointHits.size} / ${checkpoints.length}`;

  const statuses = [];
  if (player.engineOffTimer > 0) statuses.push('Engine off');
  if (player.noSteerTimer > 0) statuses.push('No steering');
  if (player.noBrakeTimer > 0) statuses.push('No brakes');
  if (player.fragile) statuses.push('Fragile');
  if (player.brokenSteering > 0) statuses.push('Broken steering');
  if (player.wetTimer > 0) statuses.push('Wet tires');
  if (player.airborne > 0) statuses.push('Air control');
  if (player.wrongWayTimer > 0.6) statuses.push('Wrong way');
  statusEl.textContent = statuses.join(' / ') || (finished ? getMedal(finishTime) : started ? 'Running' : 'Ready');
}

function render(): void {
  const shakeX = (Math.random() - 0.5) * cameraShake;
  const shakeY = (Math.random() - 0.5) * cameraShake;
  const camera = {
    x: clamp(player.x - canvas.width / 2 + shakeX, 0, world.width - canvas.width),
    y: clamp(player.y - canvas.height / 2 + shakeY, 0, world.height - canvas.height)
  };
  drawBackground(camera);
  drawTrack(camera);
  drawMinimap();
  drawOverlay();
}

function drawMinimap(): void {
  const mapW = 210;
  const mapH = 125;
  const x = canvas.width - mapW - 22;
  const y = canvas.height - mapH - 22;
  ctx.save();
  ctx.fillStyle = 'rgba(2, 6, 23, 0.68)';
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.55)';
  ctx.lineWidth = 2;
  ctx.roundRect(x, y, mapW, mapH, 18);
  ctx.fill();
  ctx.stroke();
  const scaleX = mapW / world.width;
  const scaleY = mapH / world.height;
  ctx.lineCap = 'round';
  for (const segment of segments) {
    ctx.strokeStyle = surfaces[segment.surface].accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + segment.start.x * scaleX, y + segment.start.y * scaleY);
    ctx.lineTo(x + segment.end.x * scaleX, y + segment.end.y * scaleY);
    ctx.stroke();
  }
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(x + player.x * scaleX, y + player.y * scaleY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function loop(now: number): void {
  const dt = Math.min(0.033, (now - lastFrame) / 1000 || 0);
  lastFrame = now;
  update(dt, now);
  cameraShake = Math.max(0, cameraShake - dt * 24);
  checkpointPulse = Math.max(0, checkpointPulse - dt * 2.5);
  render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
    event.preventDefault();
  }
  if (event.code === 'Space') {
    resetRun();
    startRun(performance.now());
    return;
  }
  keys.add(event.code);
});

window.addEventListener('keyup', (event) => {
  keys.delete(event.code);
});

audioButton.addEventListener('click', async () => {
  audio ??= new AudioSystem();
  await audio.resume();
  audioButton.textContent = 'Engine Audio Enabled';
  audioButton.disabled = true;
});

resetRun();
requestAnimationFrame(loop);
