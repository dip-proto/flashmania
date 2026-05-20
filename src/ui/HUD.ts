/**
 * HUD — Heads-up display for the game.
 */

export type Medal = 'none' | 'bronze' | 'silver' | 'gold' | 'author';

export interface MedalTimes {
  bronze: number;
  silver: number;
  gold: number;
  author: number;
}

export class HUD {
  private timerEl = document.getElementById('timer')!;
  private speedEl = document.getElementById('speed-display')!;
  private surfaceEl = document.getElementById('surface-display')!;
  private statusEl = document.getElementById('status-display')!;
  private checkpointsEl = document.getElementById('checkpoints-display')!;
  private countdownEl = document.getElementById('countdown')!;
  private medalOverlay = document.getElementById('medal-overlay')!;
  private menuEl = document.getElementById('menu')!;
  private minimapCanvas = document.getElementById('minimap') as HTMLCanvasElement;
  private ctx = this.minimapCanvas.getContext('2d')!;

  constructor() {
    this.minimapCanvas.width = 160;
    this.minimapCanvas.height = 160;
  }

  updateTimer(seconds: number): void {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    this.timerEl.textContent = `${String(mins).padStart(2, '0')}:${secs.toFixed(3).padStart(6, '0')}`;
  }

  updateSpeed(kmh: number): void {
    this.speedEl.textContent = `${Math.round(kmh)} km/h`;
  }

  updateSurface(surface: string): void {
    this.surfaceEl.textContent = surface.toUpperCase();
    const colors: Record<string, string> = {
      asphalt: '#aaa',
      dirt: '#c8a050',
      ice: '#aaddff',
      grass: '#66cc44',
      plastic: '#ff8844',
    };
    this.surfaceEl.style.color = colors[surface] || '#ccc';
  }

  updateStatus(text: string): void {
    this.statusEl.textContent = text;
  }

  updateCheckpoints(current: number, total: number): void {
    if (total > 0) {
      this.checkpointsEl.textContent = `🏁 ${current}/${total}`;
    } else {
      this.checkpointsEl.textContent = '';
    }
  }

  showCountdown(text: string): void {
    this.countdownEl.textContent = text;
    this.countdownEl.style.display = 'block';
  }

  hideCountdown(): void {
    this.countdownEl.style.display = 'none';
  }

  showMedal(medal: Medal, time: number, medalTimes: MedalTimes): void {
    const label = this.medalOverlay.querySelector('.medal-label') as HTMLElement;
    const icon = this.medalOverlay.querySelector('.medal-icon') as HTMLElement;
    const bestTime = this.medalOverlay.querySelector('.best-time') as HTMLElement;
    const times = this.medalOverlay.querySelector('.medal-times') as HTMLElement;

    const medalInfo: Record<Medal, { label: string; icon: string }> = {
      none: { label: 'No Medal', icon: '❌' },
      bronze: { label: 'Bronze Medal', icon: '🥉' },
      silver: { label: 'Silver Medal', icon: '🥈' },
      gold: { label: 'Gold Medal', icon: '🥇' },
      author: { label: 'Author Medal', icon: '⭐' },
    };

    const info = medalInfo[medal];
    label.textContent = info.label;
    icon.textContent = info.icon;
    bestTime.textContent = `Time: ${time.toFixed(3)}s`;
    times.innerHTML = `
      ⭐ ${medalTimes.author.toFixed(3)}s &nbsp;
      🥇 ${medalTimes.gold.toFixed(3)}s &nbsp;
      🥈 ${medalTimes.silver.toFixed(3)}s &nbsp;
      🥉 ${medalTimes.bronze.toFixed(3)}s
    `;

    this.medalOverlay.style.display = 'block';
  }

  hideMedal(): void {
    this.medalOverlay.style.display = 'none';
  }

  showMenu(): void {
    this.menuEl.style.display = 'flex';
  }

  hideMenu(): void {
    this.menuEl.style.display = 'none';
  }

  /**
   * Draw minimap showing track overview and car position
   */
  drawMinimap(
    trackPoints: { x: number; z: number }[],
    carX: number, carZ: number, carYaw: number,
    ghostX: number | null, ghostZ: number | null,
  ): void {
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    this.ctx.clearRect(0, 0, w, h);

    if (trackPoints.length === 0) return;

    // Find bounds
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of trackPoints) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }

    const padding = 10;
    const rangeX = maxX - minX || 1;
    const rangeZ = maxZ - minZ || 1;
    const scale = Math.min((w - padding * 2) / rangeX, (h - padding * 2) / rangeZ);

    const offsetX = (w - rangeX * scale) / 2;
    const offsetZ = (h - rangeZ * scale) / 2;

    const toScreen = (x: number, z: number) => ({
      sx: (x - minX) * scale + offsetX,
      sy: (z - minZ) * scale + offsetZ,
    });

    // Draw track
    this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    for (let i = 0; i < trackPoints.length; i += 3) {
      const { sx, sy } = toScreen(trackPoints[i].x, trackPoints[i].z);
      if (i === 0) this.ctx.moveTo(sx, sy);
      else this.ctx.lineTo(sx, sy);
    }
    this.ctx.stroke();

    // Draw ghost
    if (ghostX !== null && ghostZ !== null) {
      const { sx, sy } = toScreen(ghostX, ghostZ);
      this.ctx.fillStyle = 'rgba(136,136,255,0.6)';
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw car
    const { sx: cx, sy: cy } = toScreen(carX, carZ);
    this.ctx.fillStyle = '#ff3300';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Direction indicator
    this.ctx.strokeStyle = '#ff3300';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(cx + Math.sin(carYaw) * 8, cy + Math.cos(carYaw) * 8);
    this.ctx.stroke();
  }

  clear(): void {
    this.updateTimer(0);
    this.updateSpeed(0);
    this.updateSurface('asphalt');
    this.updateStatus('');
    this.updateCheckpoints(0, 0);
    this.hideMedal();
  }
}

/**
 * Determine medal based on time and medal targets
 */
export function getMedal(time: number, medalTimes: MedalTimes): Medal {
  if (time <= medalTimes.author) return 'author';
  if (time <= medalTimes.gold) return 'gold';
  if (time <= medalTimes.silver) return 'silver';
  if (time <= medalTimes.bronze) return 'bronze';
  return 'none';
}