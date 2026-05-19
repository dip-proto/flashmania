export {};

type Surface = 'asphalt' | 'dirt' | 'ice' | 'grass' | 'plastic' | 'water' | 'air';
type PadKind = 'boost' | 'engineOff' | 'fragile' | 'noSteer' | 'noBrake' | 'ramp' | 'loop' | 'checkpoint' | 'finish';
type Medal = 'author' | 'gold' | 'silver' | 'bronze' | 'finisher' | '--';

type Vec = { x: number; y: number };
type ControlState = { throttle: boolean; brake: boolean; left: boolean; right: boolean };
type TrackArea = { kind: Surface | PadKind; cx: number; cy: number; w: number; h: number; angle: number; label?: string; index?: number };
type GhostFrame = { t: number; x: number; y: number; heading: number };

type SurfaceProfile = {
  grip: number;
  drag: number;
  accel: number;
  steer: number;
  color: string;
  stripe: string;
  label: string;
};

const gameCanvas = document.querySelector<HTMLCanvasElement>('#game');
if (!gameCanvas) throw new Error('Missing #game canvas');
const renderContext = gameCanvas.getContext('2d');
if (!renderContext) throw new Error('Canvas 2D is not available');
const canvas: HTMLCanvasElement = gameCanvas;
const ctx: CanvasRenderingContext2D = renderContext;

const hud = {
  time: textNode('#time'),
  best: textNode('#best'),
  medal: textNode('#medal'),
  speed: textNode('#speed'),
  surface: textNode('#surface'),
  checkpoint: textNode('#checkpoint'),
  status: textNode('#status'),
};

const surfaceProfiles: Record<Surface, SurfaceProfile> = {
  asphalt: { grip: 9.8, drag: 0.986, accel: 1, steer: 1, color: '#4b5453', stripe: '#d9d0b4', label: 'asphalt' },
  dirt: { grip: 3.4, drag: 0.978, accel: 0.82, steer: 0.74, color: '#a16f3e', stripe: '#6f4528', label: 'dirt' },
  ice: { grip: 0.72, drag: 0.994, accel: 0.66, steer: 0.38, color: '#b6e2ec', stripe: '#eefcff', label: 'ice' },
  grass: { grip: 5.8, drag: 0.952, accel: 0.58, steer: 0.62, color: '#677c42', stripe: '#9fb26a', label: 'grass' },
  plastic: { grip: 1.95, drag: 0.99, accel: 0.92, steer: 0.55, color: '#d24f39', stripe: '#ffc66d', label: 'plastic' },
  water: { grip: 1.2, drag: 0.965, accel: 0.5, steer: 0.46, color: '#337b8d', stripe: '#9ed5db', label: 'wet plastic' },
  air: { grip: 0, drag: 0.999, accel: 0, steer: 0.18, color: '#1b2321', stripe: '#39423d', label: 'airborne' },
};

const medals: Record<Exclude<Medal, '--'>, number> = {
  author: 39,
  gold: 45,
  silver: 54,
  bronze: 65,
  finisher: Number.POSITIVE_INFINITY,
};

const checkpointCount = 5;
const start = { x: 160, y: 620, heading: -0.03 };

const surfaces: TrackArea[] = [
  { kind: 'asphalt', cx: 330, cy: 620, w: 450, h: 120, angle: -0.04, label: 'Launch straight' },
  { kind: 'dirt', cx: 605, cy: 555, w: 330, h: 130, angle: -0.52, label: 'Dirt drift bend' },
  { kind: 'ice', cx: 790, cy: 380, w: 380, h: 120, angle: -1.06, label: 'Counter-steer ice chute' },
  { kind: 'grass', cx: 660, cy: 180, w: 360, h: 130, angle: 0.02, label: 'Cushioned grass plateau' },
  { kind: 'plastic', cx: 420, cy: 260, w: 350, h: 112, angle: 0.72, label: 'Slippery plastic descent' },
  { kind: 'water', cx: 280, cy: 405, w: 230, h: 118, angle: 1.32, label: 'Wet tire splash' },
  { kind: 'asphalt', cx: 465, cy: 520, w: 360, h: 112, angle: 0.28, label: 'Drying road' },
  { kind: 'asphalt', cx: 780, cy: 558, w: 430, h: 112, angle: -0.07, label: 'Full-speed return' },
  { kind: 'plastic', cx: 1045, cy: 490, w: 330, h: 114, angle: -0.58, label: 'Bouncy red wallride' },
  { kind: 'asphalt', cx: 1130, cy: 285, w: 430, h: 116, angle: -1.42, label: 'Final vertical climb' },
];

const pads: TrackArea[] = [
  { kind: 'boost', cx: 430, cy: 617, w: 94, h: 96, angle: -0.04, label: 'Booster' },
  { kind: 'checkpoint', cx: 565, cy: 565, w: 36, h: 154, angle: -0.52, index: 1, label: 'Checkpoint 1' },
  { kind: 'noBrake', cx: 775, cy: 408, w: 90, h: 118, angle: -1.06, label: 'No brakes' },
  { kind: 'checkpoint', cx: 728, cy: 270, w: 36, h: 154, angle: -1.06, index: 2, label: 'Checkpoint 2' },
  { kind: 'engineOff', cx: 660, cy: 180, w: 120, h: 120, angle: 0.02, label: 'Engine off coast' },
  { kind: 'fragile', cx: 478, cy: 300, w: 108, h: 112, angle: 0.72, label: 'Fragile' },
  { kind: 'checkpoint', cx: 340, cy: 340, w: 36, h: 150, angle: 1.32, index: 3, label: 'Checkpoint 3' },
  { kind: 'ramp', cx: 540, cy: 542, w: 100, h: 112, angle: 0.28, label: 'Jump ramp' },
  { kind: 'boost', cx: 700, cy: 558, w: 104, h: 100, angle: -0.07, label: 'Booster' },
  { kind: 'checkpoint', cx: 870, cy: 552, w: 34, h: 154, angle: -0.07, index: 4, label: 'Checkpoint 4' },
  { kind: 'noSteer', cx: 1000, cy: 515, w: 92, h: 112, angle: -0.58, label: 'No steering' },
  { kind: 'loop', cx: 1126, cy: 368, w: 116, h: 132, angle: -1.42, label: 'Loop compression' },
  { kind: 'checkpoint', cx: 1139, cy: 284, w: 34, h: 158, angle: -1.42, index: 5, label: 'Checkpoint 5' },
  { kind: 'finish', cx: 1144, cy: 103, w: 46, h: 170, angle: -1.42, label: 'Finish' },
];

class AudioEngine {
  private context?: AudioContext;
  private engine?: OscillatorNode;
  private engineGain?: GainNode;
  private tireNoise?: OscillatorNode;
  private tireGain?: GainNode;
  private wind?: OscillatorNode;
  private windGain?: GainNode;

  async ensureStarted(): Promise<void> {
    if (!this.context) {
      const AudioCtor = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioCtor) throw new Error('WebAudio is not available');
      this.context = new AudioCtor();
      this.engine = this.context.createOscillator();
      this.engine.type = 'sawtooth';
      this.engineGain = this.context.createGain();
      this.engineGain.gain.value = 0.0001;
      this.engine.connect(this.engineGain).connect(this.context.destination);
      this.engine.start();

      this.tireNoise = this.context.createOscillator();
      this.tireNoise.type = 'triangle';
      this.tireGain = this.context.createGain();
      this.tireGain.gain.value = 0.0001;
      this.tireNoise.connect(this.tireGain).connect(this.context.destination);
      this.tireNoise.start();

      this.wind = this.context.createOscillator();
      this.wind.type = 'sine';
      this.windGain = this.context.createGain();
      this.windGain.gain.value = 0.0001;
      this.wind.connect(this.windGain).connect(this.context.destination);
      this.wind.start();
    }
    if (this.context.state !== 'running') await this.context.resume();
  }

  update(speed: number, slip: number, surface: Surface, airborne: boolean): void {
    if (!this.context || !this.engine || !this.engineGain || !this.tireNoise || !this.tireGain || !this.wind || !this.windGain) return;
    const now = this.context.currentTime;
    const profilePitch = surface === 'ice' ? 0.55 : surface === 'dirt' ? 0.78 : surface === 'plastic' ? 1.22 : 1;
    this.engine.frequency.setTargetAtTime(58 + speed * 1.9 * profilePitch, now, 0.04);
    this.engineGain.gain.setTargetAtTime(airborne ? 0.025 : 0.045 + Math.min(speed / 2600, 0.1), now, 0.06);
    this.tireNoise.frequency.setTargetAtTime(120 + speed * (surface === 'ice' ? 0.9 : 2.5) + slip * 44, now, 0.03);
    this.tireGain.gain.setTargetAtTime(airborne ? 0.001 : Math.min(0.005 + slip / 90, 0.11), now, 0.04);
    this.wind.frequency.setTargetAtTime(180 + speed * 2.2, now, 0.08);
    this.windGain.gain.setTargetAtTime(Math.min(speed / 5200, 0.08), now, 0.08);
  }

  ding(): void {
    this.tone([880, 1320, 1760], 0.055, 0.08, 'square');
  }

  pad(kind: PadKind): void {
    const table: Partial<Record<PadKind, number[]>> = {
      boost: [220, 440, 880],
      engineOff: [360, 180],
      fragile: [920, 650, 410],
      noSteer: [520, 520, 260],
      noBrake: [620, 310],
      ramp: [330, 660, 990],
      loop: [180, 250, 340],
      finish: [1040, 1560, 2080],
    };
    this.tone(table[kind] ?? [740], 0.07, 0.07, 'triangle');
  }

  private tone(notes: number[], length: number, gain: number, type: OscillatorType): void {
    if (!this.context) return;
    notes.forEach((note, index) => {
      const osc = this.context!.createOscillator();
      const amp = this.context!.createGain();
      const startAt = this.context!.currentTime + index * length;
      osc.type = type;
      osc.frequency.value = note;
      amp.gain.setValueAtTime(gain, startAt);
      amp.gain.exponentialRampToValueAtTime(0.0001, startAt + length * 0.9);
      osc.connect(amp).connect(this.context!.destination);
      osc.start(startAt);
      osc.stop(startAt + length);
    });
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

class Car {
  position: Vec = { x: start.x, y: start.y };
  velocity: Vec = { x: 0, y: 0 };
  heading = start.heading;
  z = 0;
  vz = 0;
  surface: Surface = 'asphalt';
  wetTimer = 0;
  engineOffTimer = 0;
  noSteerTimer = 0;
  noBrakeTimer = 0;
  loopTimer = 0;
  fragile = false;
  steeringDamage = 0;
  lastCheckpoint = { ...start };

  reset(full: boolean): void {
    const target = full ? start : this.lastCheckpoint;
    this.position = { x: target.x, y: target.y };
    this.velocity = { x: 0, y: 0 };
    this.heading = target.heading;
    this.z = 0;
    this.vz = 0;
    this.wetTimer = 0;
    this.engineOffTimer = 0;
    this.noSteerTimer = 0;
    this.noBrakeTimer = 0;
    this.loopTimer = 0;
    this.fragile = false;
    this.steeringDamage = 0;
    if (full) this.lastCheckpoint = { ...start };
  }

  update(input: ControlState, dt: number, track: Track): { slip: number; speed: number; hitWall: boolean } {
    this.engineOffTimer = Math.max(0, this.engineOffTimer - dt);
    this.noSteerTimer = Math.max(0, this.noSteerTimer - dt);
    this.noBrakeTimer = Math.max(0, this.noBrakeTimer - dt);
    this.loopTimer = Math.max(0, this.loopTimer - dt);
    this.wetTimer = Math.max(0, this.wetTimer - dt);

    const detected = track.surfaceAt(this.position);
    this.surface = this.z > 0.05 ? 'air' : detected;
    if (detected === 'water') this.wetTimer = 3.6;
    const profile = this.z > 0.05 ? surfaceProfiles.air : track.profileFor(detected, this.wetTimer);
    const speed = vecLength(this.velocity);
    const forward = fromAngle(this.heading);
    const lateral = { x: -forward.y, y: forward.x };
    const forwardSpeed = dot(this.velocity, forward);
    const lateralSpeed = dot(this.velocity, lateral);

    const canBrake = !input.brake || this.noBrakeTimer <= 0;
    if (this.z <= 0.05 && input.throttle && this.engineOffTimer <= 0) {
      const boost = forwardSpeed < 0 ? 0.45 : 1;
      this.velocity.x += forward.x * 430 * profile.accel * boost * dt;
      this.velocity.y += forward.y * 430 * profile.accel * boost * dt;
    }
    if (input.brake && canBrake) {
      if (this.z > 0.05) this.vz -= 760 * dt;
      else {
        const brakeForce = forwardSpeed > 0 ? -760 : -260;
        this.velocity.x += forward.x * brakeForce * dt;
        this.velocity.y += forward.y * brakeForce * dt;
      }
    }

    const steerInput = this.noSteerTimer > 0 ? 0 : Number(input.right) - Number(input.left);
    const damagePull = this.steeringDamage > 0 ? Math.sin(performance.now() / 180) * this.steeringDamage : 0;
    const steerSpeedFactor = clamp(Math.abs(forwardSpeed) / 310, 0.18, 1.35);
    this.heading += (steerInput + damagePull) * profile.steer * steerSpeedFactor * 2.85 * dt;

    if (this.z <= 0.05) {
      this.velocity.x -= lateral.x * lateralSpeed * clamp(profile.grip * dt, 0, 0.92);
      this.velocity.y -= lateral.y * lateralSpeed * clamp(profile.grip * dt, 0, 0.92);
      this.velocity.x *= Math.pow(profile.drag, dt * 60);
      this.velocity.y *= Math.pow(profile.drag, dt * 60);
    } else {
      this.velocity.x *= Math.pow(0.999, dt * 60);
      this.velocity.y *= Math.pow(0.999, dt * 60);
      this.heading += steerInput * 0.9 * dt;
      this.vz -= 880 * dt;
      this.z += this.vz * dt;
      if (this.z <= 0) {
        this.z = 0;
        this.vz = 0;
      }
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    const hitWall = this.resolveWalls(track);
    if (hitWall && this.fragile) {
      this.steeringDamage = Math.min(0.55, this.steeringDamage + 0.18);
      this.fragile = false;
    }

    return { slip: Math.abs(lateralSpeed), speed: vecLength(this.velocity), hitWall };
  }

  private resolveWalls(track: Track): boolean {
    if (this.z > 4) return false;
    if (track.surfaceAt(this.position) !== 'grass' || track.insideAnySurface(this.position)) return false;

    let nearest = track.nearestSurfacePoint(this.position);
    if (!nearest) return false;
    this.position = nearest.point;
    const normal = normalize({ x: this.position.x - nearest.center.x, y: this.position.y - nearest.center.y });
    const impact = dot(this.velocity, normal);
    if (impact > 0) {
      this.velocity.x -= normal.x * impact * 1.35;
      this.velocity.y -= normal.y * impact * 1.35;
    }
    this.velocity.x *= 0.55;
    this.velocity.y *= 0.55;
    return true;
  }
}

class Track {
  checkpointPassed = 0;
  private triggeredPads = new Set<string>();

  reset(): void {
    this.checkpointPassed = 0;
    this.triggeredPads.clear();
  }

  surfaceAt(point: Vec): Surface {
    for (let i = surfaces.length - 1; i >= 0; i -= 1) {
      const area = surfaces[i];
      if (area && contains(area, point)) return area.kind as Surface;
    }
    return 'grass';
  }

  insideAnySurface(point: Vec): boolean {
    return surfaces.some((area) => contains(area, point));
  }

  profileFor(surface: Surface, wetTimer: number): SurfaceProfile {
    if (surface === 'asphalt' && wetTimer > 0) {
      return { ...surfaceProfiles.asphalt, grip: 2.2, drag: 0.981, steer: 0.52, label: 'wet asphalt' };
    }
    return surfaceProfiles[surface];
  }

  padsAt(point: Vec): TrackArea[] {
    return pads.filter((pad) => contains(pad, point));
  }

  touchPadOnce(pad: TrackArea, car: Car, game: Game): void {
    const id = `${pad.kind}:${pad.index ?? pad.cx}:${pad.cy}`;
    if (pad.kind !== 'checkpoint' && pad.kind !== 'finish' && this.triggeredPads.has(id)) return;

    if (pad.kind === 'checkpoint') {
      const next = pad.index ?? 0;
      if (next === this.checkpointPassed + 1) {
        this.checkpointPassed = next;
        car.lastCheckpoint = { x: pad.cx, y: pad.cy, heading: pad.angle };
        game.audio.ding();
        game.setStatus(`${pad.label} cleared. Digital ding-ding-ding.`);
      }
      return;
    }

    if (pad.kind === 'finish') {
      if (this.checkpointPassed >= checkpointCount) game.finishRun();
      else game.setStatus('Finish is locked until every checkpoint is cleared.');
      return;
    }

    this.triggeredPads.add(id);
    game.audio.pad(pad.kind as PadKind);
    switch (pad.kind) {
      case 'boost': {
        const f = fromAngle(car.heading);
        car.velocity.x += f.x * 620;
        car.velocity.y += f.y * 620;
        game.setStatus('Booster: neck-snapping acceleration.');
        break;
      }
      case 'engineOff':
        car.engineOffTimer = 4.4;
        game.setStatus('Engine off: coast on stored momentum.');
        break;
      case 'fragile':
        car.fragile = true;
        game.setStatus('Fragile active: wall hits damage steering.');
        break;
      case 'noSteer':
        car.noSteerTimer = 2.25;
        game.setStatus('No steering: line up before the lockout.');
        break;
      case 'noBrake':
        car.noBrakeTimer = 2.8;
        game.setStatus('No brakes: commit to the ice slide.');
        break;
      case 'ramp':
        if (car.z <= 0.05) {
          car.z = 2;
          car.vz = 430;
          game.setStatus('Ramp launch: tap brake in air to nose down.');
        }
        break;
      case 'loop':
        car.loopTimer = 1.4;
        game.setStatus('Loop compression: gravity goes heavy, then light.');
        break;
    }
  }

  nearestSurfacePoint(point: Vec): { point: Vec; center: Vec } | undefined {
    let best: { point: Vec; center: Vec; distance: number } | undefined;
    for (const area of surfaces) {
      const local = toLocal(area, point);
      const clipped = {
        x: clamp(local.x, -area.w / 2, area.w / 2),
        y: clamp(local.y, -area.h / 2, area.h / 2),
      };
      const world = toWorld(area, clipped);
      const distance = distanceSq(point, world);
      if (!best || distance < best.distance) best = { point: world, center: { x: area.cx, y: area.cy }, distance };
    }
    return best;
  }
}

class GhostRecorder {
  frames: GhostFrame[] = [];
  bestFrames: GhostFrame[] = [];
  visible = true;
  private key = 'flashmania.bestGhost.v1';

  constructor() {
    const stored = localStorage.getItem(this.key);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as GhostFrame[];
      if (Array.isArray(parsed)) this.bestFrames = parsed.filter((frame) => Number.isFinite(frame.t));
    } catch {
      this.bestFrames = [];
    }
  }

  reset(): void {
    this.frames = [];
  }

  capture(time: number, car: Car): void {
    if (this.frames.length > 0 && time - this.frames[this.frames.length - 1]!.t < 0.05) return;
    this.frames.push({ t: time, x: car.position.x, y: car.position.y, heading: car.heading });
  }

  saveBest(): void {
    this.bestFrames = this.frames.slice();
    localStorage.setItem(this.key, JSON.stringify(this.bestFrames));
  }

  sample(time: number): GhostFrame | undefined {
    if (!this.visible || this.bestFrames.length < 2) return undefined;
    for (let i = 1; i < this.bestFrames.length; i += 1) {
      const prev = this.bestFrames[i - 1]!;
      const next = this.bestFrames[i]!;
      if (time <= next.t) {
        const amount = clamp((time - prev.t) / Math.max(next.t - prev.t, 0.001), 0, 1);
        return {
          t: time,
          x: lerp(prev.x, next.x, amount),
          y: lerp(prev.y, next.y, amount),
          heading: lerpAngle(prev.heading, next.heading, amount),
        };
      }
    }
    return this.bestFrames[this.bestFrames.length - 1];
  }
}

class Renderer {
  private camera: Vec = { x: start.x, y: start.y };

  render(car: Car, track: Track, ghost: GhostRecorder, elapsed: number): void {
    const scale = this.resize();
    this.camera.x = lerp(this.camera.x, car.position.x, 0.08);
    this.camera.y = lerp(this.camera.y, car.position.y, 0.08);

    ctx.save();
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
    this.drawBackdrop();
    ctx.translate(canvas.width / scale / 2 - this.camera.x, canvas.height / scale / 2 - this.camera.y);
    this.drawTrack(track);
    this.drawPads();
    this.drawGhost(ghost.sample(elapsed));
    this.drawCar(car);
    ctx.restore();
  }

  private resize(): number {
    const rect = canvas.getBoundingClientRect();
    const deviceScale = window.devicePixelRatio || 1;
    const targetW = Math.round(rect.width * deviceScale);
    const targetH = Math.round(rect.height * deviceScale);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    return deviceScale;
  }

  private drawBackdrop(): void {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#16201d');
    gradient.addColorStop(0.54, '#263328');
    gradient.addColorStop(1, '#111714');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = '#d7c58d';
    ctx.lineWidth = 1;
    for (let x = -80; x < w + 80; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - 120, h);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  private drawTrack(track: Track): void {
    for (const area of surfaces) {
      const profile = surfaceProfiles[area.kind as Surface];
      drawRotated(area, () => {
        ctx.fillStyle = profile.color;
        ctx.strokeStyle = '#101512';
        ctx.lineWidth = 8;
        roundedRect(-area.w / 2, -area.h / 2, area.w, area.h, 28);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 0.36;
        ctx.strokeStyle = profile.stripe;
        ctx.lineWidth = 3;
        for (let x = -area.w / 2 + 20; x < area.w / 2; x += 44) {
          ctx.beginPath();
          ctx.moveTo(x, -area.h / 2 + 14);
          ctx.lineTo(x + 28, area.h / 2 - 14);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    }

    ctx.save();
    ctx.fillStyle = '#f1ead7';
    ctx.font = '700 18px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const area of surfaces) {
      if (!area.label) continue;
      ctx.save();
      ctx.translate(area.cx, area.cy);
      ctx.rotate(area.angle);
      ctx.fillText(surfaceProfiles[area.kind as Surface].label.toUpperCase(), 0, 0);
      ctx.restore();
    }
    ctx.restore();

    if (track.checkpointPassed < checkpointCount) {
      const next = pads.find((pad) => pad.kind === 'checkpoint' && pad.index === track.checkpointPassed + 1);
      if (next) this.drawCompass(next);
    }
  }

  private drawPads(): void {
    for (const pad of pads) {
      drawRotated(pad, () => {
        const palette = padPalette(pad.kind as PadKind);
        ctx.fillStyle = palette.fill;
        ctx.strokeStyle = palette.stroke;
        ctx.lineWidth = 5;
        roundedRect(-pad.w / 2, -pad.h / 2, pad.w, pad.h, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = palette.text;
        ctx.font = '900 18px Barlow Condensed, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = pad.kind === 'checkpoint' ? `CP ${pad.index}` : pad.kind.toUpperCase();
        ctx.fillText(label, 0, 0);
      });
    }
  }

  private drawCompass(target: TrackArea): void {
    ctx.save();
    ctx.translate(target.cx, target.cy);
    ctx.strokeStyle = '#fff1a8';
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, 88, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private drawGhost(frame?: GhostFrame): void {
    if (!frame) return;
    ctx.save();
    ctx.globalAlpha = 0.38;
    ctx.translate(frame.x, frame.y);
    ctx.rotate(frame.heading);
    drawCarShape('#e7f6ff', '#65c8ff');
    ctx.restore();
  }

  private drawCar(car: Car): void {
    ctx.save();
    ctx.translate(car.position.x, car.position.y - car.z * 0.25);
    ctx.rotate(car.heading);
    if (car.loopTimer > 0) ctx.scale(1, 1 + Math.sin(car.loopTimer * 12) * 0.08);
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 16 + car.z * 0.04;
    ctx.shadowOffsetY = 12 + car.z * 0.05;
    drawCarShape(car.fragile ? '#fff1a8' : '#f2a71b', car.steeringDamage > 0 ? '#df3f2d' : '#15201d');
    ctx.restore();

    if (car.z > 0.05) {
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = '#f1ead7';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(car.position.x, car.position.y, 26 + car.z * 0.03, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

class Game {
  car = new Car();
  track = new Track();
  renderer = new Renderer();
  ghost = new GhostRecorder();
  audio = new AudioEngine();
  input: ControlState = { throttle: false, brake: false, left: false, right: false };
  elapsed = 0;
  running = false;
  finished = false;
  best = Number(localStorage.getItem('flashmania.bestTime.v1') ?? Number.POSITIVE_INFINITY);
  private lastTime = performance.now();
  private statusTimer = 0;

  constructor() {
    addEventListener('keydown', (event) => this.key(event, true));
    addEventListener('keyup', (event) => this.key(event, false));
    this.updateHud();
    requestAnimationFrame((time) => this.frame(time));
  }

  setStatus(message: string): void {
    hud.status.textContent = message;
    this.statusTimer = 3.2;
  }

  finishRun(): void {
    if (this.finished) return;
    this.finished = true;
    this.running = false;
    this.audio.pad('finish');
    const medal = medalFor(this.elapsed);
    const isBest = this.elapsed < this.best;
    if (isBest) {
      this.best = this.elapsed;
      localStorage.setItem('flashmania.bestTime.v1', String(this.best));
      this.ghost.saveBest();
    }
    this.setStatus(`Finished in ${formatTime(this.elapsed)}: ${medal.toUpperCase()} medal${isBest ? ' and new ghost saved' : ''}. Press R for another attempt.`);
  }

  private key(event: KeyboardEvent, down: boolean): void {
    const code = event.code;
    const driveKey = ['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS', 'ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD'].includes(code);
    if (driveKey && down) {
      void this.audio.ensureStarted();
      if (!this.running && !this.finished) this.running = true;
      event.preventDefault();
    }

    if (code === 'ArrowUp' || code === 'KeyW') this.input.throttle = down;
    if (code === 'ArrowDown' || code === 'KeyS') this.input.brake = down;
    if (code === 'ArrowLeft' || code === 'KeyA') this.input.left = down;
    if (code === 'ArrowRight' || code === 'KeyD') this.input.right = down;
    if (code === 'Space' && down) {
      this.car.reset(false);
      this.setStatus('Reset to last checkpoint.');
      event.preventDefault();
    }
    if (code === 'KeyR' && down) this.restart();
    if (code === 'KeyG' && down) {
      this.ghost.visible = !this.ghost.visible;
      this.setStatus(`Best ghost ${this.ghost.visible ? 'visible' : 'hidden'}.`);
    }
  }

  private restart(): void {
    this.car.reset(true);
    this.track.reset();
    this.ghost.reset();
    this.elapsed = 0;
    this.running = false;
    this.finished = false;
    this.setStatus('Restarted. Press throttle to launch.');
  }

  private frame(time: number): void {
    const rawDt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;

    if (this.running && !this.finished) {
      this.elapsed += rawDt;
      const result = this.car.update(this.input, rawDt, this.track);
      for (const pad of this.track.padsAt(this.car.position)) this.track.touchPadOnce(pad, this.car, this);
      this.ghost.capture(this.elapsed, this.car);
      this.audio.update(result.speed, result.slip, this.car.surface, this.car.z > 0.05);
      if (result.hitWall) this.setStatus(this.car.steeringDamage > 0 ? 'Fragile hit: steering is bent.' : 'Wall scrape: momentum lost.');
    } else {
      this.audio.update(0, 0, this.car.surface, false);
    }

    this.statusTimer = Math.max(0, this.statusTimer - rawDt);
    if (this.statusTimer === 0 && !this.finished) this.describeSurface();
    this.renderer.render(this.car, this.track, this.ghost, this.elapsed);
    this.updateHud();
    requestAnimationFrame((next) => this.frame(next));
  }

  private describeSurface(): void {
    const extras = [
      this.car.engineOffTimer > 0 ? 'engine off' : '',
      this.car.noSteerTimer > 0 ? 'no steering' : '',
      this.car.noBrakeTimer > 0 ? 'no brakes' : '',
      this.car.fragile ? 'fragile' : '',
      this.car.wetTimer > 0 ? 'wet tires' : '',
      this.car.z > 0.05 ? 'air control active' : '',
    ].filter(Boolean);
    hud.status.textContent = extras.length ? extras.join(' / ') : 'Pure time trial: you, the car, the track, and physics.';
  }

  private updateHud(): void {
    hud.time.textContent = formatTime(this.elapsed);
    hud.best.textContent = Number.isFinite(this.best) ? formatTime(this.best) : '--';
    hud.medal.textContent = medalFor(this.elapsed).toUpperCase();
    hud.speed.textContent = `${Math.round(vecLength(this.car.velocity) * 0.72)} km/h`;
    hud.surface.textContent = this.car.z > 0.05 ? 'airborne' : this.track.profileFor(this.car.surface, this.car.wetTimer).label;
    hud.checkpoint.textContent = `${this.track.checkpointPassed}/${checkpointCount}`;
  }
}

function textNode(selector: string): HTMLElement {
  const node = document.querySelector<HTMLElement>(selector);
  if (!node) throw new Error(`Missing ${selector}`);
  return node;
}

function contains(area: TrackArea, point: Vec): boolean {
  const local = toLocal(area, point);
  return Math.abs(local.x) <= area.w / 2 && Math.abs(local.y) <= area.h / 2;
}

function toLocal(area: TrackArea, point: Vec): Vec {
  const dx = point.x - area.cx;
  const dy = point.y - area.cy;
  const cos = Math.cos(-area.angle);
  const sin = Math.sin(-area.angle);
  return { x: dx * cos - dy * sin, y: dx * sin + dy * cos };
}

function toWorld(area: TrackArea, point: Vec): Vec {
  const cos = Math.cos(area.angle);
  const sin = Math.sin(area.angle);
  return { x: area.cx + point.x * cos - point.y * sin, y: area.cy + point.x * sin + point.y * cos };
}

function drawRotated(area: TrackArea, draw: () => void): void {
  ctx.save();
  ctx.translate(area.cx, area.cy);
  ctx.rotate(area.angle);
  draw();
  ctx.restore();
}

function roundedRect(x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCarShape(fill: string, trim: string): void {
  ctx.fillStyle = fill;
  ctx.strokeStyle = '#0c1110';
  ctx.lineWidth = 4;
  roundedRect(-28, -15, 56, 30, 9);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = trim;
  ctx.fillRect(0, -10, 20, 20);
  ctx.fillStyle = '#eff8ea';
  ctx.fillRect(-18, -11, 12, 5);
  ctx.fillRect(-18, 6, 12, 5);
  ctx.fillStyle = '#101512';
  ctx.fillRect(-22, -19, 13, 5);
  ctx.fillRect(10, -19, 13, 5);
  ctx.fillRect(-22, 14, 13, 5);
  ctx.fillRect(10, 14, 13, 5);
}

function padPalette(kind: PadKind): { fill: string; stroke: string; text: string } {
  switch (kind) {
    case 'boost': return { fill: '#f2a71b', stroke: '#fff1a8', text: '#15201d' };
    case 'engineOff': return { fill: '#1e2422', stroke: '#f1ead7', text: '#f1ead7' };
    case 'fragile': return { fill: '#fff1a8', stroke: '#df3f2d', text: '#15201d' };
    case 'noSteer': return { fill: '#5f7481', stroke: '#dbe6e8', text: '#101512' };
    case 'noBrake': return { fill: '#8db7c9', stroke: '#eefcff', text: '#101512' };
    case 'ramp': return { fill: '#62744e', stroke: '#dbe8a1', text: '#f1ead7' };
    case 'loop': return { fill: '#343c39', stroke: '#f2a71b', text: '#f1ead7' };
    case 'checkpoint': return { fill: '#f1ead7', stroke: '#15201d', text: '#15201d' };
    case 'finish': return { fill: '#df3f2d', stroke: '#fff1a8', text: '#fff1a8' };
  }
}

function medalFor(time: number): Medal {
  if (time <= medals.author) return 'author';
  if (time <= medals.gold) return 'gold';
  if (time <= medals.silver) return 'silver';
  if (time <= medals.bronze) return 'bronze';
  return time > 0 ? 'finisher' : '--';
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${secs.toFixed(3).padStart(6, '0')}`;
}

function fromAngle(angle: number): Vec {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function vecLength(v: Vec): number {
  return Math.hypot(v.x, v.y);
}

function dot(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y;
}

function distanceSq(a: Vec, b: Vec): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function normalize(v: Vec): Vec {
  const len = vecLength(v) || 1;
  return { x: v.x / len, y: v.y / len };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, amount: number): number {
  return a + (b - a) * amount;
}

function lerpAngle(a: number, b: number, amount: number): number {
  const diff = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + diff * amount;
}

new Game();
