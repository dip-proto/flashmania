import { VehicleState } from './vehicle';
import { Track } from './track';
import { SurfaceType, SURFACE_PROPERTIES } from './surfaces';
import { GhostSnapshot } from './ghost';
import { GameState, Medal } from './game';

interface DrawableVehicle {
  pos: { x: number; y: number };
  angle: number;
  speed: number;
  drifting?: boolean;
  airborne?: boolean;
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private drawTrack(track: Track) {
    const ctx = this.ctx;

    for (const block of track.blocks) {
      const surfProps = SURFACE_PROPERTIES[block.surface];

      // Base surface
      ctx.fillStyle = surfProps.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);

      // Border
      ctx.strokeStyle = '#ffffff22';
      ctx.lineWidth = 1;
      ctx.strokeRect(block.x, block.y, block.width, block.height);

      // Effect overlays
      if (block.effect === 'booster') {
        ctx.fillStyle = '#FFD70033';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#FFD700';
        ctx.font = '10px sans-serif';
        ctx.fillText('BOOST', block.x + 4, block.y + 14);
      }
      if (block.effect === 'engineOff') {
        ctx.fillStyle = '#33333355';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#888';
        ctx.font = '10px sans-serif';
        ctx.fillText('NO ENGINE', block.x + 4, block.y + 14);
      }
      if (block.effect === 'fragile') {
        ctx.fillStyle = '#FF000033';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#FF6666';
        ctx.font = '10px sans-serif';
        ctx.fillText('FRAGILE', block.x + 4, block.y + 14);
      }
      if (block.effect === 'noSteering') {
        ctx.fillStyle = '#0000FF33';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#6688FF';
        ctx.font = '10px sans-serif';
        ctx.fillText('NO STEER', block.x + 4, block.y + 14);
      }
      if (block.effect === 'noBrakes') {
        ctx.fillStyle = '#FF00FF33';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#FF88FF';
        ctx.font = '10px sans-serif';
        ctx.fillText('NO BRAKE', block.x + 4, block.y + 14);
      }

      // Ramp visual
      if (block.ramp) {
        ctx.fillStyle = '#FFA50055';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#FFA500';
        ctx.font = '10px sans-serif';
        ctx.fillText('RAMP', block.x + 4, block.y + 14);
      }

      // Checkpoint / finish
      if (block.isFinish) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(block.x, block.y, block.width, 3);
        ctx.fillStyle = '#e94560';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏁 FINISH', block.x + block.width / 2, block.y - 6);
        ctx.textAlign = 'left';
      } else if (block.isCheckpoint) {
        ctx.fillStyle = '#FFFF0055';
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.fillStyle = '#FFFF00';
        ctx.font = '10px sans-serif';
        ctx.fillText('CP' + block.checkpointId, block.x + 4, block.y + 14);
      }
    }
  }

  private drawVehicle(v: DrawableVehicle, color: string, ghost: boolean) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(v.pos.x, v.pos.y);

    if (ghost) {
      ctx.globalAlpha = 0.3;
    }

    ctx.rotate(v.angle);

    // Car body
    const carW = 16;
    const carH = 8;
    ctx.fillStyle = color;
    ctx.fillRect(-carW / 2, -carH / 2, carW, carH);

    // Wheels
    ctx.fillStyle = '#333';
    const wheelOff = carW / 2 - 2;
    const wheelH = carH / 2 - 1;
    ctx.fillRect(-wheelOff, -wheelH, 3, 3);
    ctx.fillRect(-wheelOff, wheelH - 3, 3, 3);
    ctx.fillRect(wheelOff - 3, -wheelH, 3, 3);
    ctx.fillRect(wheelOff - 3, wheelH - 3, 3, 3);

    // Drift sparks
    if (v.drifting && !ghost) {
      ctx.fillStyle = '#FFD70066';
      for (let i = 0; i < 3; i++) {
        const ox = -carW / 2 - 4 - i * 5;
        const oy = (i % 2 === 0 ? -2 : 2);
        ctx.fillRect(ox, oy, 4, 2);
      }
    }

    ctx.restore();
  }

  private track: Track | null = null;
  private cameraPos = { x: 0, y: 0 };
  private cameraTarget = { x: 0, y: 0 };

  render(
    vehicle: VehicleState,
    track: Track,
    ghosts: GhostSnapshot[],
    state: GameState,
  ) {
    this.track = track;

    // Camera follow: smoothly track the vehicle center
    const targetX = vehicle.pos.x - this.width / 2;
    const targetY = vehicle.pos.y - this.height / 2;
    this.cameraTarget.x = targetX;
    this.cameraTarget.y = targetY;
    this.cameraPos.x += (this.cameraTarget.x - this.cameraPos.x) * 0.08;
    this.cameraPos.y += (this.cameraTarget.y - this.cameraPos.y) * 0.08;

    this.clear();
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(-this.cameraPos.x, -this.cameraPos.y);

    this.drawTrack(track);
    this.drawVehicle(vehicle as DrawableVehicle, '#e94560', false);
    for (const ghost of ghosts) {
      this.drawVehicle(ghost as DrawableVehicle, 'rgba(100, 200, 255, 0.35)', true);
    }

    ctx.restore();
    this.drawHUD(vehicle, state);

    if (state.phase === 'finished') {
      this.drawFinishOverlay(state);
    }
  }

  private drawHUD(v: VehicleState, state: GameState) {
    const ctx = this.ctx;
    ctx.save();
    ctx.textAlign = 'left';

    // Timer
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`⏱ ${state.elapsed.toFixed(2)}s`, 16, 28);

    // Speed
    const speedKmh = v.speed * 10;
    ctx.fillStyle = '#ffffff';
    ctx.font = '13px monospace';
    ctx.fillText(`Speed: ${speedKmh.toFixed(0)} km/h`, 16, 48);
    ctx.fillText(`Surface: ${SURFACE_PROPERTIES[v.onSurface].name}`, 16, 64);

    // Status indicators
    let y = 80;
    if (!v.engineOn) {
      ctx.fillStyle = '#FF6600';
      ctx.fillText('⚠ ENGINE OFF', 16, y); y += 16;
    }
    if (v.fragile) {
      ctx.fillStyle = '#FF0000';
      ctx.fillText('⚠ FRAGILE', 16, y); y += 16;
    }
    if (v.noSteering) {
      ctx.fillStyle = '#4488FF';
      ctx.fillText('⚠ NO STEERING', 16, y); y += 16;
    }
    if (v.noBrakes) {
      ctx.fillStyle = '#FF88FF';
      ctx.fillText('⚠ NO BRAKES', 16, y); y += 16;
    }
    if (v.wetTires) {
      ctx.fillStyle = '#88AAFF';
      ctx.fillText('⚠ WET TIRES', 16, y); y += 16;
    }
    if (v.airborne) {
      ctx.fillStyle = '#FFAA00';
      ctx.fillText('✈ AIRBORNE', 16, y); y += 16;
    }
    if (v.drifting) {
      ctx.fillStyle = '#FFD700';
      ctx.fillText('↪ DRIFTING', 16, y); y += 16;
    }

    // Medal progress
    ctx.textAlign = 'right';
    ctx.font = '12px monospace';
    const t = state.elapsed;
    const tr = this.track!;
    ctx.fillStyle = '#888';
    ctx.fillText(`Target: ${this.medalColor('author')}${tr.authorMedal.toFixed(1)}s`, this.width - 16, 28);
    ctx.fillText(`${this.medalColor('gold')}${tr.goldMedal.toFixed(1)}s`, this.width - 16, 44);
    ctx.fillText(`${this.medalColor('silver')}${tr.silverMedal.toFixed(1)}s`, this.width - 16, 60);
    ctx.fillText(`${this.medalColor('bronze')}${tr.bronzeMedal.toFixed(1)}s`, this.width - 16, 76);
    ctx.fillText(`${this.medalColor('none')}---`, this.width - 16, 92);
    // Highlight the medal you're currently on pace for
    if (t < tr.authorMedal) this.drawMedalIndicator('🏆 Author', 0, this.width - 16, 110);
    else if (t < tr.goldMedal) this.drawMedalIndicator('🥇 Gold', 1, this.width - 16, 110);
    else if (t < tr.silverMedal) this.drawMedalIndicator('🥈 Silver', 2, this.width - 16, 110);
    else if (t < tr.bronzeMedal) this.drawMedalIndicator('🥉 Bronze', 3, this.width - 16, 110);
    else this.drawMedalIndicator('💀 None', 4, this.width - 16, 110);

    ctx.restore();
  }

  private medalColor(medal: Medal): string {
    switch (medal) {
      case 'author': return '#FFD700';
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#666';
    }
  }

  private drawMedalIndicator(text: string, rank: number, x: number, y: number) {
    const ctx = this.ctx;
    const colors = ['#FFD700', '#FFD700', '#C0C0C0', '#CD7F32', '#666'];
    ctx.fillStyle = colors[rank];
    ctx.font = 'bold 13px monospace';
    ctx.fillText(text, x, y);
  }

  private drawFinishOverlay(state: GameState) {
    const ctx = this.ctx;
    ctx.save();

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Medal display
    const medalColors: Record<Medal, string> = {
      'author': '#FFD700',
      'gold': '#FFD700',
      'silver': '#C0C0C0',
      'bronze': '#CD7F32',
      'none': '#666',
    };
    const medalEmojis: Record<Medal, string> = {
      'author': '🏆',
      'gold': '🥇',
      'silver': '🥈',
      'bronze': '🥉',
      'none': '💀',
    };
    const medalNames: Record<Medal, string> = {
      'author': 'Author Medal!',
      'gold': 'Gold Medal!',
      'silver': 'Silver Medal!',
      'bronze': 'Bronze Medal!',
      'none': 'No Medal',
    };

    const m = state.medal;
    ctx.fillStyle = medalColors[m];
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText(medalEmojis[m], this.width / 2, this.height / 2 - 60);
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(medalNames[m], this.width / 2, this.height / 2 + 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText(`⏱ ${state.bestLap.toFixed(2)}s`, this.width / 2, this.height / 2 + 50);

    ctx.fillStyle = '#888';
    ctx.font = '16px sans-serif';
    ctx.fillText('Press R to restart', this.width / 2, this.height / 2 + 90);

    ctx.restore();
  }
}
