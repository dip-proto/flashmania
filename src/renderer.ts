import { TrackBlock, BlockType, SurfaceType, CarState, GhostFrame, Camera } from './types';
import { Track } from './track';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
}

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private camera: Camera = { x: 0, y: 0, zoom: 3.0, shake: 0 };
  private particles: Particle[] = [];
  private gridSpacing = 100;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateCamera(carX: number, carY: number, dt: number) {
    this.camera.x += (carX - this.camera.x) * 5 * dt;
    this.camera.y += (carY - this.camera.y) * 5 * dt;
    if (this.camera.shake > 0) {
      this.camera.shake *= Math.max(0, 1 - 8 * dt);
    }
  }

  setCameraShake(amount: number) {
    this.camera.shake = amount;
  }

  addDriftParticles(x: number, y: number, angle: number, driftAngle: number, speed: number) {
    const count = Math.floor(driftAngle * 3);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x - Math.cos(angle) * 12 + (Math.random() - 0.5) * 8,
        y: y - Math.sin(angle) * 12 + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 60,
        vy: (Math.random() - 0.5) * 60,
        life: 0.4 + Math.random() * 0.3,
        maxLife: 0.5,
        color: speed > 200 ? '#ff6644' : '#aaaaaa',
        size: 2 + Math.random() * 2,
      });
    }
  }

  addBoostParticles(x: number, y: number, angle: number) {
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x - Math.cos(angle) * 14 + (Math.random() - 0.5) * 6,
        y: y - Math.sin(angle) * 14 + (Math.random() - 0.5) * 6,
        vx: -Math.cos(angle) * (80 + Math.random() * 60),
        vy: -Math.sin(angle) * (80 + Math.random() * 60),
        life: 0.2 + Math.random() * 0.15,
        maxLife: 0.3,
        color: Math.random() > 0.5 ? '#ffaa00' : '#ff6600',
        size: 3 + Math.random() * 3,
      });
    }
  }

  private updateParticles(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(track: Track, carState: CarState, ghostFrame: GhostFrame | null, dt: number) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.updateParticles(dt);

    ctx.save();

    // Clear with gradient background
    const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h));
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(1, '#0a0a15');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Camera transform
    const shakeX = (Math.random() - 0.5) * this.camera.shake;
    const shakeY = (Math.random() - 0.5) * this.camera.shake;
    ctx.translate(w / 2 + shakeX, h / 2 + shakeY);
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.x, -this.camera.y);

    // Draw grid
    this.drawGrid(ctx);

    // Draw track
    this.drawTrack(ctx, track);

    // Draw particles (behind car)
    this.drawParticles(ctx);

    // Draw ghost car
    if (ghostFrame) {
      this.drawGhostCar(ctx, ghostFrame);
    }

    // Draw car
    this.drawCar(ctx, carState);

    ctx.restore();
  }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    const s = this.gridSpacing;
    const camX = this.camera.x;
    const camY = this.camera.y;
    const hw = this.canvas.width / this.camera.zoom / 2 + s;
    const hh = this.canvas.height / this.camera.zoom / 2 + s;

    const startX = Math.floor((camX - hw) / s) * s;
    const startY = Math.floor((camY - hh) / s) * s;
    const endX = camX + hw;
    const endY = camY + hh;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = startX; x <= endX; x += s) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = startY; y <= endY; y += s) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();
  }

  private drawTrack(ctx: CanvasRenderingContext2D, track: Track) {
    // Draw connecting paths between blocks first
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    for (let i = 0; i < track.blocks.length - 1; i++) {
      const a = track.blocks[i];
      const b = track.blocks[i + 1];
      if (i === 0) ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw blocks
    for (const block of track.blocks) {
      this.drawBlock(ctx, block);
    }
  }

  private drawBlock(ctx: CanvasRenderingContext2D, block: TrackBlock) {
    ctx.save();
    ctx.translate(block.x, block.y);
    ctx.rotate(block.angle);

    const hw = block.width / 2;
    const hh = block.height / 2;

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(-hw + 2, -hh + 2, block.width, block.height);

    // Main block
    const { fill, border, glow } = this.getBlockColors(block);
    ctx.fillStyle = fill;
    ctx.strokeStyle = border;
    ctx.lineWidth = 1.5;

    // Rounded rect
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(-hw + r, -hh);
    ctx.lineTo(hw - r, -hh);
    ctx.quadraticCurveTo(hw, -hh, hw, -hh + r);
    ctx.lineTo(hw, hh - r);
    ctx.quadraticCurveTo(hw, hh, hw - r, hh);
    ctx.lineTo(-hw + r, hh);
    ctx.quadraticCurveTo(-hw, hh, -hw, hh - r);
    ctx.lineTo(-hw, -hh + r);
    ctx.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Surface texture overlay
    this.drawSurfaceTexture(ctx, block.surface, hw, hh);

    // Glow effect for special blocks
    if (glow) {
      ctx.shadowColor = glow;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = glow;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Special block effects
    this.drawBlockEffects(ctx, block, hw, hh);

    ctx.restore();
  }

  private getBlockColors(block: TrackBlock): { fill: string; border: string; glow?: string } {
    switch (block.type) {
      case BlockType.Booster:
        return { fill: '#ffcc00', border: '#ffaa00', glow: '#ffdd00' };
      case BlockType.EngineOff:
        return { fill: '#555555', border: '#333333', glow: '#888888' };
      case BlockType.Fragile:
        return { fill: '#cc3333', border: '#aa2222', glow: '#ff4444' };
      case BlockType.NoSteering:
        return { fill: '#7744cc', border: '#5533aa', glow: '#aa66ff' };
      case BlockType.NoBrakes:
        return { fill: '#cc7733', border: '#aa5522', glow: '#ff9944' };
      case BlockType.Checkpoint:
        return { fill: '#22aa66', border: '#118844', glow: '#33ff88' };
      case BlockType.StartLine:
        return { fill: '#22cc44', border: '#11aa33', glow: '#44ff66' };
      case BlockType.FinishLine:
        return { fill: '#cc2222', border: '#aa1111', glow: '#ff4444' };
      default:
        return { fill: this.getSurfaceColor(block.surface), border: this.getSurfaceBorder(block.surface) };
    }
  }

  private getSurfaceColor(surface: SurfaceType): string {
    switch (surface) {
      case SurfaceType.Asphalt: return '#3a3a4a';
      case SurfaceType.Dirt: return '#6b4423';
      case SurfaceType.Ice: return '#5599bb';
      case SurfaceType.Grass: return '#2d7a2d';
      case SurfaceType.Plastic: return '#cc5588';
      default: return '#3a3a4a';
    }
  }

  private getSurfaceBorder(surface: SurfaceType): string {
    switch (surface) {
      case SurfaceType.Asphalt: return '#555566';
      case SurfaceType.Dirt: return '#8b5e34';
      case SurfaceType.Ice: return '#77bbdd';
      case SurfaceType.Grass: return '#3d9a3d';
      case SurfaceType.Plastic: return '#dd7799';
      default: return '#555566';
    }
  }

  private drawSurfaceTexture(ctx: CanvasRenderingContext2D, surface: SurfaceType, hw: number, hh: number) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    switch (surface) {
      case SurfaceType.Asphalt:
        // Speckled asphalt texture
        for (let i = 0; i < 20; i++) {
          const x = (Math.random() - 0.5) * hw * 2;
          const y = (Math.random() - 0.5) * hh * 2;
          ctx.fillStyle = Math.random() > 0.5 ? '#555' : '#333';
          ctx.fillRect(x, y, 2, 1);
        }
        break;
      case SurfaceType.Dirt:
        // Dot pattern for dirt
        for (let i = 0; i < 15; i++) {
          const x = (Math.random() - 0.5) * hw * 2;
          const y = (Math.random() - 0.5) * hh * 2;
          ctx.fillStyle = '#8b5e34';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      case SurfaceType.Ice:
        // Smooth shine lines
        ctx.strokeStyle = '#aaddff';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 5; i++) {
          const y = -hh + (i + 1) * (hh * 2 / 6);
          ctx.beginPath();
          ctx.moveTo(-hw + 5, y);
          ctx.lineTo(hw - 5, y);
          ctx.stroke();
        }
        break;
      case SurfaceType.Grass:
        // Grass tufts
        for (let i = 0; i < 12; i++) {
          const x = (Math.random() - 0.5) * hw * 2;
          const y = (Math.random() - 0.5) * hh * 2;
          ctx.strokeStyle = '#4d9a4d';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + (Math.random() - 0.5) * 4, y - 3);
          ctx.stroke();
        }
        break;
      case SurfaceType.Plastic:
        // Shiny spots
        for (let i = 0; i < 8; i++) {
          const x = (Math.random() - 0.5) * hw * 2;
          const y = (Math.random() - 0.5) * hh * 2;
          ctx.fillStyle = '#ee88aa';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  private drawBlockEffects(ctx: CanvasRenderingContext2D, block: TrackBlock, hw: number, hh: number) {
    const t = performance.now() / 1000;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';

    switch (block.type) {
      case BlockType.Booster:
        // Animated chevrons
        ctx.fillStyle = '#ffdd00';
        const offset = (t * 40) % 30;
        for (let i = 0; i < 3; i++) {
          const ox = -hw + 10 + offset + i * 30;
          if (ox > hw - 10) continue;
          ctx.beginPath();
          ctx.moveTo(ox, -hh + 8);
          ctx.lineTo(ox + 8, 0);
          ctx.lineTo(ox, hh - 8);
          ctx.closePath();
          ctx.fill();
        }
        break;
      case BlockType.EngineOff:
        ctx.fillStyle = '#aaa';
        ctx.font = '12px monospace';
        ctx.fillText('⚡ OFF', 0, 4);
        break;
      case BlockType.Fragile:
        ctx.fillStyle = '#fff';
        ctx.font = '14px monospace';
        ctx.fillText('⚠ FRAGILE', 0, 5);
        break;
      case BlockType.NoSteering:
        ctx.fillStyle = '#ddbbff';
        ctx.font = '10px monospace';
        ctx.fillText('NO STEER', 0, 4);
        break;
      case BlockType.NoBrakes:
        ctx.fillStyle = '#ffccbb';
        ctx.font = '10px monospace';
        ctx.fillText('NO BRAKE', 0, 4);
        break;
      case BlockType.StartLine:
        // Checkered pattern
        const cs = 6;
        for (let ix = -3; ix < 3; ix++) {
          for (let iy = -1; iy < 1; iy++) {
            ctx.fillStyle = (ix + iy) % 2 === 0 ? '#fff' : '#000';
            ctx.fillRect(ix * cs, iy * cs, cs, cs);
          }
        }
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('START', 0, hh - 4);
        break;
      case BlockType.FinishLine:
        // Checkered pattern
        const fcs = 6;
        for (let ix = -3; ix < 3; ix++) {
          for (let iy = -1; iy < 1; iy++) {
            ctx.fillStyle = (ix + iy) % 2 === 0 ? '#fff' : '#000';
            ctx.fillRect(ix * fcs, iy * fcs, fcs, fcs);
          }
        }
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('FINISH', 0, hh - 4);
        break;
      case BlockType.Checkpoint:
        // Pulsing checkmark
        const pulse = 0.7 + 0.3 * Math.sin(t * 4);
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#33ff88';
        ctx.font = '14px monospace';
        ctx.fillText('✓ CP', 0, 5);
        ctx.globalAlpha = 1;
        break;
    }
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private drawCar(ctx: CanvasRenderingContext2D, state: CarState) {
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.rotate(state.angle);

    const carW = 24;
    const carH = 12;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(2, 2, carW / 2 + 1, carH / 2 + 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Car body glow
    const glowColor = state.boostTimer > 0 ? '#ffaa00' :
                       state.driftAngle > 0.2 ? '#ff4444' :
                       state.isAirborne ? '#00ccff' : '#00ff88';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 8;

    // Car body
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.roundRect(-carW / 2, -carH / 2, carW, carH, 3);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Car interior (darker)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.roundRect(-carW / 2 + 3, -carH / 2 + 2, carW - 6, carH - 4, 2);
    ctx.fill();

    // Windshield
    ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
    ctx.fillRect(carW / 2 - 7, -carH / 2 + 2, 4, carH - 4);

    // Front lights
    ctx.fillStyle = '#ffff88';
    ctx.fillRect(carW / 2 - 1, -carH / 2 + 1, 2, 3);
    ctx.fillRect(carW / 2 - 1, carH / 2 - 4, 2, 3);

    // Rear lights
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(-carW / 2 - 1, -carH / 2 + 1, 2, 3);
    ctx.fillRect(-carW / 2 - 1, carH / 2 - 4, 2, 3);

    // Drift angle indicator (tire marks)
    if (state.driftAngle > 0.1) {
      ctx.strokeStyle = `rgba(255, 100, 100, ${Math.min(1, state.driftAngle)})`;
      ctx.lineWidth = 1.5;
      // Rear tire marks
      ctx.beginPath();
      ctx.moveTo(-carW / 2 - 2, -carH / 2);
      ctx.lineTo(-carW / 2 - 15, -carH / 2 - 5 * state.driftAngle);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-carW / 2 - 2, carH / 2);
      ctx.lineTo(-carW / 2 - 15, carH / 2 + 5 * state.driftAngle);
      ctx.stroke();
    }

    // Boost flames
    if (state.boostTimer > 0) {
      const flameLen = 8 + Math.random() * 6;
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(-carW / 2, -carH / 2 + 2);
      ctx.lineTo(-carW / 2 - flameLen, 0);
      ctx.lineTo(-carW / 2, carH / 2 - 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.moveTo(-carW / 2, -carH / 2 + 3);
      ctx.lineTo(-carW / 2 - flameLen * 0.6, 0);
      ctx.lineTo(-carW / 2, carH / 2 - 3);
      ctx.closePath();
      ctx.fill();
    }

    // Airborne shadow offset
    if (state.isAirborne) {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 10, carW / 2, carH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Broken steering X
    if (state.brokenSteering) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-carW / 2, -carH / 2);
      ctx.lineTo(carW / 2, carH / 2);
      ctx.moveTo(carW / 2, -carH / 2);
      ctx.lineTo(-carW / 2, carH / 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawGhostCar(ctx: CanvasRenderingContext2D, frame: GhostFrame) {
    ctx.save();
    ctx.translate(frame.x, frame.y);
    ctx.rotate(frame.angle);

    const carW = 24;
    const carH = 12;

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#aaaacc';
    ctx.beginPath();
    ctx.roundRect(-carW / 2, -carH / 2, carW, carH, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(carW / 2 - 7, -carH / 2 + 2, 4, carH - 4);
    ctx.globalAlpha = 1;

    ctx.restore();
  }
}