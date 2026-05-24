import { GameState, MedalType } from '../types/GameState';

export class HUD {
  private container: HTMLDivElement;
  private speedEl: HTMLDivElement;
  private timerEl: HTMLDivElement;
  private bestTimeEl: HTMLDivElement;
  private medalEl: HTMLDivElement;
  private messageEl: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; font-family: 'Segoe UI', Arial, sans-serif; z-index: 10;
    `;

    // Speed indicator
    this.speedEl = document.createElement('div');
    this.speedEl.style.cssText = `
      position: absolute; bottom: 30px; right: 30px;
      color: #fff; font-size: 28px; font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    `;

    // Timer (large, center top)
    this.timerEl = document.createElement('div');
    this.timerEl.style.cssText = `
      position: absolute; top: 15px; left: 50%; transform: translateX(-50%);
      color: #fff; font-size: 42px; font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    `;

    // Best time (small, below timer)
    this.bestTimeEl = document.createElement('div');
    this.bestTimeEl.style.cssText = `
      position: absolute; top: 62px; left: 50%; transform: translateX(-50%);
      color: #FFD700; font-size: 18px; font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7); opacity: 0.8;
    `;

    // Medal display
    this.medalEl = document.createElement('div');
    this.medalEl.style.cssText = `
      position: absolute; top: 95px; left: 50%; transform: translateX(-50%);
      color: #FFD700; font-size: 24px; font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    `;

    // Message area (start, pause, finish)
    this.messageEl = document.createElement('div');
    this.messageEl.style.cssText = `
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      color: #fff; font-size: 48px; font-weight: bold; text-align: center; line-height: 1.3;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
    `;

    this.container.appendChild(this.speedEl);
    this.container.appendChild(this.timerEl);
    this.container.appendChild(this.bestTimeEl);
    this.container.appendChild(this.medalEl);
    this.container.appendChild(this.messageEl);
    document.body.appendChild(this.container);
  }

  updateSpeed(speed: number): void {
    const kmh = Math.round(speed * 3.6); // m/s to km/h
    this.speedEl.textContent = `${kmh} km/h`;

    // Color change based on speed
    const ratio = speed / 40;
    if (ratio > 0.8) {
      this.speedEl.style.color = '#FF4444';
    } else if (ratio > 0.5) {
      this.speedEl.style.color = '#FFAA44';
    } else {
      this.speedEl.style.color = '#FFFFFF';
    }
  }

  updateTimer(time: number): void {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 1000);
    this.timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }

  updateBestTime(time: number): void {
    if (time <= 0) {
      this.bestTimeEl.textContent = '';
      return;
    }
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 1000);
    this.bestTimeEl.textContent = `Best: ${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }

  updateMedal(medal: MedalType | null): void {
    const medals: Record<string, string> = {
      'author': '🏆 AUTHOR MEDAL',
      'gold': '🥇 GOLD MEDAL',
      'silver': '🥈 SILVER MEDAL',
      'bronze': '🥉 BRONZE MEDAL',
    };
    this.medalEl.textContent = medal ? medals[medal] || '' : '';
  }

  showMessage(text: string): void {
    this.messageEl.textContent = text;
  }

  clearMessage(): void {
    this.messageEl.textContent = '';
  }

  showReady(): void {
    this.showMessage('GET READY...');
  }

  showGo(): void {
    this.showMessage('GO!');
    setTimeout(() => this.clearMessage(), 1000);
  }

  showPaused(): void {
    this.showMessage('PAUSED\nPress P to resume');
  }

  showFinished(time: number, medal: MedalType | null): void {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 1000);
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;

    const medals: Record<string, string> = {
      'author': '🏆 AUTHOR MEDAL',
      'gold': '🥇 GOLD',
      'silver': '🥈 SILVER',
      'bronze': '🥉 BRONZE',
    };

    const medalStr = medal ? `\n${medals[medal]}` : '';
    this.showMessage(`FINISH!\nTime: ${timeStr}${medalStr}\nPress R to restart`);
  }
}
