import { TileType, Track } from './types';
import { exportTrackToString, importTrackFromString } from './tracks';

export class TrackEditor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private gridWidth = 32;
  private gridHeight = 24;
  private cellSize = 30; // Pixel size of each cell in the editor view

  private tiles: Record<string, TileType> = {};
  private activeTileType: TileType = 'road';
  private drawMode: 'draw' | 'erase' = 'draw';
  
  private isMouseDragging = false;

  // Callback hooks for communication with main.ts
  public onTestDrive: (track: Track) => void = () => {};
  public onExit: () => void = () => {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get editor canvas 2D context');
    this.ctx = context;

    this.setupListeners();
    this.resizeEditor();
  }

  public resizeEditor(): void {
    // Rigid size to fit beautifully on standard landscape screens
    this.canvas.width = this.gridWidth * this.cellSize;
    this.canvas.height = this.gridHeight * this.cellSize;
    this.render();
  }

  public getTrackData(): Track {
    const nameInput = document.getElementById('editor-track-name') as HTMLInputElement;
    const authorInput = document.getElementById('editor-target-author') as HTMLInputElement;

    const trackName = nameInput?.value.trim() || 'Custom Raceway';
    const targetAuthorSecs = parseFloat(authorInput?.value) || 30.0;
    
    // Compute targeted threshold millisecond milestones relative to Author's time
    const authorMs = Math.round(targetAuthorSecs * 1000);
    const goldMs = Math.round(authorMs * 1.25);
    const silverMs = Math.round(authorMs * 1.55);
    const bronzeMs = Math.round(authorMs * 1.95);

    return {
      name: trackName,
      author: 'Creator Zone',
      gridWidth: this.gridWidth,
      gridHeight: this.gridHeight,
      tiles: { ...this.tiles },
      targetBronze: bronzeMs,
      targetSilver: silverMs,
      targetGold: goldMs,
      targetAuthor: authorMs,
    };
  }

  public setTrackData(track: Track): void {
    this.gridWidth = track.gridWidth;
    this.gridHeight = track.gridHeight;
    this.tiles = { ...track.tiles };

    const nameInput = document.getElementById('editor-track-name') as HTMLInputElement;
    const authorInput = document.getElementById('editor-target-author') as HTMLInputElement;

    if (nameInput) nameInput.value = track.name;
    if (authorInput) authorInput.value = (track.targetAuthor / 1000).toFixed(3);

    this.resizeEditor();
  }

  public clearGrid(): void {
    this.tiles = {};
    // Seed start and finish block to help the creator
    this.tiles['1,2'] = 'start';
    this.tiles['12,10'] = 'finish';
    this.render();
  }

  private setupListeners(): void {
    // Mouse events inside canvas paint grid
    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDragging = true;
      this.handleMouseDraw(e);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isMouseDragging) {
        this.handleMouseDraw(e);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDragging = false;
    });

    // Touch events for mobile/tablet grids support
    this.canvas.addEventListener('touchstart', (e) => {
      this.isMouseDragging = true;
      if (e.touches[0]) this.handleMouseDraw(e.touches[0]);
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isMouseDragging && e.touches[0]) {
        this.handleMouseDraw(e.touches[0]);
      }
    });

    this.canvas.addEventListener('touchend', () => {
      this.isMouseDragging = false;
    });

    // Palette cell selection clicks
    const paletteButtons = document.querySelectorAll('.palette-btn');
    paletteButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        paletteButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedType = btn.getAttribute('data-tile-type') as TileType;
        if (selectedType) {
          this.activeTileType = selectedType;
          this.drawMode = 'draw';
          const drawSelect = document.getElementById('editor-draw-mode') as HTMLSelectElement;
          if (drawSelect) drawSelect.value = 'draw';
        }
      });
    });

    // Draw Mode Dropdown configuration (Brush / Eraser)
    const modeSelect = document.getElementById('editor-draw-mode') as HTMLSelectElement;
    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        this.drawMode = modeSelect.value as 'draw' | 'erase';
      });
    }

    // Button interactions connect
    document.getElementById('btn-editor-clear')?.addEventListener('click', () => {
      if (confirm('Clear entire canvas sandbox cells? Any unsaved edits will be lost.')) {
        this.clearGrid();
      }
    });

    document.getElementById('btn-editor-export')?.addEventListener('click', () => {
      const track = this.getTrackData();
      
      // Validate track has exactly one start and one finish
      let startCount = 0;
      let checkCount = 0;
      let finishCount = 0;
      for (const t of Object.values(track.tiles)) {
        if (t === 'start') startCount++;
        if (t === 'finish') finishCount++;
        if (t === 'checkpoint') checkCount++;
      }

      if (startCount !== 1 || finishCount !== 1) {
        alert('⚠️ Track Validation Error:\nYour custom track must contain exactly ONE Grid Start 🚦 and exactly ONE Finish Line 🏁 to be drivable.');
        return;
      }

      const strCode = exportTrackToString(track);
      // Prompt user to copy
      const success = this.copyToClipboard(strCode);
      if (success) {
        alert(`💾 Track Encoded successfully!\nThe share code has been copied to your clipboard!\nCode size: ${strCode.length} characters.`);
      } else {
        prompt('Exported Track Code (Copy this code manually to share!):', strCode);
      }
    });

    document.getElementById('btn-editor-import')?.addEventListener('click', () => {
      const paste = prompt('📂 Enter an base64 Track string:');
      if (paste) {
        const track = importTrackFromString(paste.trim());
        if (track) {
          this.setTrackData(track);
          alert('🏁 Custom Track imported and loaded into grid!');
        } else {
          alert('❌ Decoding failure. The provided string is corrupted or invalid.');
        }
      }
    });

    document.getElementById('btn-editor-test')?.addEventListener('click', () => {
      const track = this.getTrackData();
      
      // Validation
      let startCount = 0;
      let finishCount = 0;
      for (const t of Object.values(track.tiles)) {
        if (t === 'start') startCount++;
        if (t === 'finish') finishCount++;
      }

      if (startCount !== 1 || finishCount !== 1) {
        alert('⚠️ Track Validation Error:\nYour custom track must contain exactly ONE Grid Start 🚦 and exactly ONE Finish Line 🏁 to enter Test Drive.');
        return;
      }

      this.onTestDrive(track);
    });

    document.getElementById('btn-editor-exit')?.addEventListener('click', () => {
      this.onExit();
    });
  }

  private copyToClipboard(text: string): boolean {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    const result = document.execCommand('copy');
    document.body.removeChild(dummy);
    return result;
  }

  private handleMouseDraw(e: MouseEvent | Touch): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);

    if (col >= 0 && col < this.gridWidth && row >= 0 && row < this.gridHeight) {
      const key = `${col},${row}`;
      
      if (this.drawMode === 'draw') {
        // Handle rule constraints (e.g. only one start, only one finish)
        if (this.activeTileType === 'start' || this.activeTileType === 'finish') {
          // Erase prior start/finishes of same type
          for (const [k, v] of Object.entries(this.tiles)) {
            if (v === this.activeTileType) {
              delete this.tiles[k];
            }
          }
        }
        this.tiles[key] = this.activeTileType;
      } else {
        // Erase
        delete this.tiles[key];
      }
      this.render();
    }
  }

  /**
   * Render the visual editor grid
   */
  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw subgrid cells outline
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let c = 0; c <= this.gridWidth; c++) {
      this.ctx.moveTo(c * this.cellSize, 0);
      this.ctx.lineTo(c * this.cellSize, this.canvas.height);
    }
    for (let r = 0; r <= this.gridHeight; r++) {
      this.ctx.moveTo(0, r * this.cellSize);
      this.ctx.lineTo(this.canvas.width, r * this.cellSize);
    }
    this.ctx.stroke();

    // 2. Render current tiles list
    for (let col = 0; col < this.gridWidth; col++) {
      for (let row = 0; row < this.gridHeight; row++) {
        const type = this.tiles[`${col},${row}`];
        if (!type) continue;

        const tx = col * this.cellSize;
        const ty = row * this.cellSize;

        this.drawEditorCell(type, tx, ty);
      }
    }
  }

  private drawEditorCell(type: TileType, tx: number, ty: number): void {
    this.ctx.save();
    this.ctx.translate(tx, ty);

    const pad = 1.5;
    const side = this.cellSize - pad * 2;

    // Mini block palettes styling
    switch (type) {
      case 'road':
        this.ctx.fillStyle = '#2d2d35';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#444';
        this.ctx.strokeRect(pad, pad, side, side);
        break;

      case 'start':
        this.ctx.fillStyle = '#113333';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#00f2fe';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#10f5f5';
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🚦', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'finish':
        this.ctx.fillStyle = '#331122';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#ff007f';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#ff10a5';
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🏁', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'checkpoint':
        this.ctx.fillStyle = '#281144';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#9d4edd';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#9d4edd';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔔', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'wall':
        this.ctx.fillStyle = '#2a1a0f';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#ff6700';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#ff6700';
        this.ctx.font = '10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🧱', this.cellSize / 2, this.cellSize / 2 + 4);
        break;

      case 'ramp':
        this.ctx.fillStyle = '#1f153a';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#9d4edd';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#9d4edd';
        this.ctx.font = 'bold 12px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('↗', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'dirt':
        this.ctx.fillStyle = '#42281a';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#553315';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#ffd';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🌵', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'ice':
        this.ctx.fillStyle = '#0a2333';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#00f2fe';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#bdf';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('❄', this.cellSize / 2, this.cellSize / 2 + 4);
        break;

      case 'grass':
        this.ctx.fillStyle = '#0a2411';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#184a23';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#1c6';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🌿', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'plastic':
        this.ctx.fillStyle = '#081226';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#00a0ff';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#0ae';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('💧', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'booster':
        this.ctx.fillStyle = '#3a2d05';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#ffb703';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#ffb703';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('⚡', this.cellSize / 2, this.cellSize / 2 + 4);
        break;

      case 'engine_off':
        this.ctx.fillStyle = '#2d111d';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#ff007f';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#f0a';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔌', this.cellSize / 2, this.cellSize / 2 + 5);
        break;

      case 'fragile':
        this.ctx.fillStyle = '#2a1a0c';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#ff6700';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#ff6700';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('💀', this.cellSize / 2, this.cellSize / 2 + 4);
        break;

      case 'no_steer_brakes':
        this.ctx.fillStyle = '#112211';
        this.ctx.fillRect(pad, pad, side, side);
        this.ctx.strokeStyle = '#39ff14';
        this.ctx.strokeRect(pad, pad, side, side);
        this.ctx.fillStyle = '#39ff14';
        this.ctx.font = '11px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔒', this.cellSize / 2, this.cellSize / 2 + 4);
        break;
    }

    this.ctx.restore();
  }
}
