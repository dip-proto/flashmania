import { Car, GhostFrame, Particle, TileType, Track } from './types';
import { TILE_SIZE } from './tracks';

interface Skidmark {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
}

export class GameRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private skidmarks: Skidmark[] = [];
  private maxSkidmarks = 250;

  // Background stars for parallax movement
  private stars: { x: number; y: number; size: number; alpha: number }[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D rendering context');
    this.ctx = context;

    this.generateParallaxStars();
    this.resize();
  }

  private generateParallaxStars(): void {
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.7,
      });
    }
  }

  public resize(): void {
    // Standard high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  public clearSkidmarks(): void {
    this.skidmarks = [];
  }

  /**
   * Main draw call
   */
  public draw(
    car: Car,
    ghost: GhostFrame | null,
    track: Track,
    particles: Particle[],
    screenShake: number,
    _dt: number
  ): void {
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);

    // Track skidmarks creation
    if (!car.isAirborne && car.isDrifting && car.speed > 80) {
      // Find wheel coordinates
      const cosH = Math.cos(car.heading);
      const sinH = Math.sin(car.heading);

      // Back tires coordinates
      const tireL = {
        x: car.x - cosH * 10 - sinH * 6,
        y: car.y - sinH * 10 + cosH * 6,
      };
      const tireR = {
        x: car.x - cosH * 10 + sinH * 6,
        y: car.y - sinH * 10 - cosH * 6,
      };

      if (this.skidmarks.length > 0) {
        const prev = this.skidmarks[this.skidmarks.length - 1];
        // Calculate distance from previous to avoid micro skid duplicates
        const dist = Math.hypot(prev.x2 - tireR.x, prev.y2 - tireR.y);
        if (dist > 3 && dist < 50) {
          this.skidmarks.push({
            x1: prev.x2,
            y1: prev.y2,
            x2: tireR.x,
            y2: tireR.y,
            alpha: 0.65,
          });
          this.skidmarks.push({
            x1: prev.x2 - sinH * 12,
            y1: prev.y2 + cosH * 12,
            x2: tireL.x,
            y2: tireL.y,
            alpha: 0.65,
          });
        } else if (dist >= 50) {
          // Just start fresh path line
          this.skidmarks.push({ x1: tireR.x, y1: tireR.y, x2: tireR.x, y2: tireR.y, alpha: 0.65 });
        }
      } else {
        this.skidmarks.push({ x1: tireR.x, y1: tireR.y, x2: tireR.x, y2: tireR.y, alpha: 0.65 });
      }

      // Prune skidmarks list
      if (this.skidmarks.length > this.maxSkidmarks) {
        this.skidmarks.shift();
        this.skidmarks.shift();
      }
    }

    // Slowly fade skidmarks slightly for persistence aesthetics
    for (const sm of this.skidmarks) {
      sm.alpha = Math.max(0.02, sm.alpha - 0.0003);
    }

    // 1. DRAW DARK SPACE FILL
    this.ctx.fillStyle = '#05050b';
    this.ctx.fillRect(0, 0, width, height);

    // Camera targets car position (clamped center)
    const camX = car.x;
    const camY = car.y;

    // 2. PARALLAX STARS BACKGROUND
    this.ctx.save();
    this.ctx.translate(width / 2, height / 2);
    for (const star of this.stars) {
      // star coordinates wrap around center viewport based on camera
      const starX = ((star.x - camX * 0.1) % 2000 + 2000) % 2000 - 1000;
      const starY = ((star.y - camY * 0.1) % 2000 + 2000) % 2000 - 1000;
      this.ctx.fillStyle = `rgba(0, 242, 254, ${star.alpha})`;
      this.ctx.fillRect(starX, starY, star.size, star.size);
    }
    this.ctx.restore();

    // 3. MAIN GAME TRANSLATION LAYER
    this.ctx.save();
    
    // Position camera in center of screen
    this.ctx.translate(width / 2, height / 2);

    // Apply Screen Shake
    if (screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * screenShake;
      const shakeY = (Math.random() - 0.5) * screenShake;
      this.ctx.translate(shakeX, shakeY);
    }

    this.ctx.translate(-camX, -camY);

    // Determine viewport borders in world pixels to only render visible tiles (culling)
    const viewLeft = camX - width / 2 - TILE_SIZE;
    const viewRight = camX + width / 2 + TILE_SIZE;
    const viewTop = camY - height / 2 - TILE_SIZE;
    const viewBottom = camY + height / 2 + TILE_SIZE;

    const colStart = Math.max(0, Math.floor(viewLeft / TILE_SIZE));
    const colEnd = Math.min(track.gridWidth - 1, Math.floor(viewRight / TILE_SIZE));
    const rowStart = Math.max(0, Math.floor(viewTop / TILE_SIZE));
    const rowEnd = Math.min(track.gridHeight - 1, Math.floor(viewBottom / TILE_SIZE));

    // A. DRAW MAP TILES
    for (let col = colStart; col <= colEnd; col++) {
      for (let row = rowStart; row <= rowEnd; row++) {
        const type = track.tiles[`${col},${row}`] || 'empty';
        if (type === 'empty') continue;

        const tileX = col * TILE_SIZE;
        const tileY = row * TILE_SIZE;

        this.drawTile(this.ctx, type, tileX, tileY, col, row);
      }
    }

    // B. DRAW SKIDMARKS ON TRACK
    this.ctx.lineWidth = 2.5;
    for (const sm of this.skidmarks) {
      this.ctx.strokeStyle = `rgba(0, 0, 0, ${sm.alpha})`;
      this.ctx.beginPath();
      this.ctx.moveTo(sm.x1, sm.y1);
      this.ctx.lineTo(sm.x2, sm.y2);
      this.ctx.stroke();
    }

    // C. DRAW GHOST CAR IF ENABLED
    if (ghost) {
      this.drawGhostVehicle(this.ctx, ghost);
    }

    // D. DRAW CAR SHADOW (offset by height of Z jump)
    if (car.z > 0 || car.currentSurface !== 'empty') {
      const shadowScalar = Math.max(0.4, 1.0 - car.z / 320);
      const shadowDistanceShiftX = car.z * 0.12;
      const shadowDistanceShiftY = car.z * 0.18;
      
      this.ctx.save();
      this.ctx.translate(car.x + shadowDistanceShiftX, car.y + shadowDistanceShiftY);
      this.ctx.rotate(car.heading);
      this.ctx.scale(shadowScalar, shadowScalar);
      
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
      this.ctx.beginPath();
      // Draw shadow pill oval
      this.ctx.roundRect(-12, -7, 24, 14, 5);
      this.ctx.fill();
      this.ctx.restore();
    }

    // E. DRAW ACTIVE PARTICLES
    for (const p of particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.scale(1.0 + p.z / 150, 1.0 + p.z / 150);

      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.life;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // glow effect for landing sparks and rocket fire boosters
      if (p.type === 'spark' || p.type === 'boost') {
        this.ctx.shadowBlur = p.size * 2.5;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    // F. DRAW MAIN PLAYER CAR
    this.drawCarVehicle(this.ctx, car);

    this.ctx.restore(); // Exit major camera layer

    // 4. SPEED LINES SCREEN VIGNETTE (At extreme velocities)
    if (car.speed > 550) {
      const strength = Math.min(0.35, (car.speed - 550) / 1000);
      this.drawSpeedVignette(this.ctx, width, height, strength);
    }
  }

  /**
   * Handles tile drawing styles beautifully
   */
  private drawTile(
    ctx: CanvasRenderingContext2D,
    type: TileType,
    tx: number,
    ty: number,
    _col: number,
    _row: number
  ): void {
    ctx.save();
    ctx.translate(tx, ty);

    // Default tile dimensions
    const mid = TILE_SIZE / 2;

    switch (type) {
      case 'road':
        // Modern cyber asphalt
        ctx.fillStyle = '#1c1c24';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);

        // Center line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([10, 10]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mid, 0);
        ctx.lineTo(mid, TILE_SIZE);
        ctx.stroke();
        break;

      case 'start':
        // Grid Starting Lane with checkers
        ctx.fillStyle = '#22222a';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        for (let x = 0; x < TILE_SIZE; x += 15) {
          for (let y = 0; y < TILE_SIZE; y += 15) {
            if (((x + y) / 15) % 2 === 0) {
              ctx.fillRect(x, y, 15, 15);
            }
          }
        }
        
        // Start block border line
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Grid positions
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(15, mid);
        ctx.lineTo(TILE_SIZE - 15, mid);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 242, 254, 0.1)';
        ctx.fillRect(15, 10, TILE_SIZE - 30, 20);
        ctx.fillRect(15, TILE_SIZE - 30, TILE_SIZE - 30, 20);
        break;

      case 'finish':
        // Checkered finish block
        ctx.fillStyle = '#08080c';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.fillStyle = '#ffffff';
        const boxSize = TILE_SIZE / 8;
        for (let col = 0; col < 8; col++) {
          for (let row = 0; row < 8; row++) {
            if ((col + row) % 2 === 0) {
              ctx.fillRect(col * boxSize, row * boxSize, boxSize, boxSize);
            }
          }
        }
        
        // Border highlights
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 3;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);
        break;

      case 'checkpoint':
        // Neon checkpoint lines
        ctx.fillStyle = '#181822';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 3;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Glowing checkpoint bar
        ctx.fillStyle = 'rgba(255, 0, 127, 0.12)';
        ctx.fillRect(5, mid - 12, TILE_SIZE - 10, 24);
        
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 2;
        ctx.strokeRect(5, mid - 12, TILE_SIZE - 10, 24);

        ctx.fillStyle = '#ff007f';
        ctx.font = '9px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('CHECKPOINT', mid, mid + 3);
        break;

      case 'wall':
        // Obstructing rigid partition
        ctx.fillStyle = '#0f0f1b';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = '#ff6700';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Cross barrier diagonals
        ctx.strokeStyle = 'rgba(255, 103, 0, 0.15)';
        ctx.beginPath();
        ctx.moveTo(2, 2);
        ctx.lineTo(TILE_SIZE - 2, TILE_SIZE - 2);
        ctx.moveTo(TILE_SIZE - 2, 2);
        ctx.lineTo(2, TILE_SIZE - 2);
        ctx.stroke();
        break;

      case 'ramp':
        // Grid boost lines for jump trajectory
        ctx.fillStyle = '#221e35';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = '#9d4edd';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Glowing ramp chevrons (points UP/South/West/East. Let's make it standard point UP/top)
        ctx.fillStyle = 'rgba(157, 78, 221, 0.2)';
        ctx.beginPath();
        ctx.moveTo(mid, 15);
        ctx.lineTo(TILE_SIZE - 20, TILE_SIZE - 25);
        ctx.lineTo(20, TILE_SIZE - 25);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#9d4edd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mid, 20);
        ctx.lineTo(TILE_SIZE - 25, TILE_SIZE - 20);
        ctx.moveTo(mid, 35);
        ctx.lineTo(TILE_SIZE - 30, TILE_SIZE - 10);
        ctx.stroke();
        break;

      case 'dirt':
        // Rough gravel grid
        ctx.fillStyle = '#42281a';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);

        // Little rocks
        ctx.fillStyle = '#653a25';
        const noiseGenX = [20, 80, 45, 100, 30, 95];
        const noiseGenY = [15, 30, 75, 40, 90, 105];
        for (let i = 0; i < noiseGenX.length; i++) {
          ctx.fillRect(noiseGenX[i], noiseGenY[i], 3, 3);
        }
        break;

      case 'ice':
        // Sleek frozen neon lake
        ctx.fillStyle = '#0d2b38';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = 'rgba(0, 242, 254, 0.1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Cracks inside
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(5, 5); ctx.lineTo(40, 35); ctx.lineTo(25, 80);
        ctx.moveTo(110, 10); ctx.lineTo(80, 50); ctx.lineTo(115, 95);
        ctx.moveTo(50, 110); ctx.lineTo(60, 70);
        ctx.stroke();
        break;

      case 'grass':
        // Solid stable grass fields
        ctx.fillStyle = '#0f2c16';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);

        // Draw soft moss rows
        ctx.strokeStyle = '#184a23';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let offset = 20; offset < TILE_SIZE; offset += 30) {
          ctx.moveTo(0, offset); ctx.lineTo(TILE_SIZE, offset - 10);
        }
        ctx.stroke();
        break;

      case 'plastic':
        // Shiny bouncy wet plastic
        ctx.fillStyle = '#0c1630';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Smooth stripes
        ctx.fillStyle = 'rgba(0, 242, 254, 0.05)';
        ctx.fillRect(10, 0, 25, TILE_SIZE);
        ctx.fillRect(75, 0, 35, TILE_SIZE);
        break;

      case 'booster':
        // Golden glowing pad
        ctx.fillStyle = '#1c1c24';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        // Glowing backdrop chevron

        ctx.fillStyle = 'rgba(255, 183, 3, 0.15)';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = 'rgba(255, 183, 3, 0.8)';
        ctx.lineWidth = 3;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        // Animated arrow moving forward
        ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
        ctx.beginPath();

        
        ctx.moveTo(mid, 30);
        ctx.lineTo(TILE_SIZE - 30, 75);
        ctx.lineTo(TILE_SIZE - 45, 75);
        ctx.lineTo(mid, 42);
        ctx.lineTo(45, 75);
        ctx.lineTo(30, 75);
        ctx.closePath();
        ctx.fill();
        break;

      case 'engine_off':
        // Battery power cutter
        ctx.fillStyle = '#1c131a';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        ctx.fillStyle = 'rgba(255, 0, 127, 0.08)';
        ctx.fillRect(2, 2, TILE_SIZE - 4, TILE_SIZE - 4);

        ctx.fillStyle = '#ff007f';
        ctx.font = '24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('🔌', mid, mid + 8);
        break;

      case 'fragile':
        // Skull damage triggers
        ctx.fillStyle = '#1c1510';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = '#ff6700';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        ctx.fillStyle = '#ff6700';
        ctx.font = '24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('💀', mid, mid + 8);
        break;

      case 'no_steer_brakes':
        // Controls lock pads
        ctx.fillStyle = '#131924';
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = '#39ff14';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);

        ctx.fillStyle = '#39ff14';
        ctx.font = '24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('🔒', mid, mid + 8);
        break;
    }

    ctx.restore();
  }

  /**
   * Draw the transparent overlay ghost vehicle
   */
  private drawGhostVehicle(ctx: CanvasRenderingContext2D, ghost: GhostFrame): void {
    ctx.save();
    ctx.translate(ghost.x, ghost.y);
    ctx.rotate(ghost.heading);

    // Scaling based on height
    const scaleFactor = 1.0 + ghost.z / 350;
    ctx.scale(scaleFactor, scaleFactor);

    ctx.globalAlpha = 0.38;

    // Outer cyber envelope (shimmer purplish hue)
    ctx.fillStyle = '#9d4edd';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    // Fuselage cockpit shape
    ctx.moveTo(14, 0);
    ctx.lineTo(-4, -10);
    ctx.lineTo(-15, -7);
    ctx.lineTo(-15, 7);
    ctx.lineTo(-4, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Side thruster pods
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(-12, -11, 4, 3);
    ctx.fillRect(-12, 8, 4, 3);

    // Glowing pilot screen bubble
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.arc(3, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw driver active car
   */
  private drawCarVehicle(ctx: CanvasRenderingContext2D, car: Car): void {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.heading);

    // Virtual hovering elevation scale
    const scaleFactor = 1.0 + car.z / 350;
    ctx.scale(scaleFactor, scaleFactor);

    // Core chassis setup
    // Base shadows and metallic casing details
    const colorTheme = car.boostEffectTimer > 0 
      ? '#ffd700' // Golden flare booster chassis
      : car.steeringDamaged 
        ? '#7f7f8f' // Dull metallic steering broken fuselage
        : '#00f2fe'; // Standard clean cyan rocket

    // Cockpit shell body
    ctx.fillStyle = '#12121d';
    ctx.strokeStyle = colorTheme;
    ctx.lineWidth = 2.0;

    // Shadow glow for boost fields
    if (car.boostEffectTimer > 0) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ffd700';
    }

    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-3, -9);
    ctx.lineTo(-15, -6);
    ctx.lineTo(-15, 6);
    ctx.lineTo(-3, 9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Clear shadow effects
    ctx.shadowBlur = 0;

    // Side wheels
    ctx.fillStyle = car.isDrifting ? '#ff007f' : '#1e1e24';
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    
    // Draw 4 distinct wheels
    ctx.fillRect(4, -12, 6, 3);  // Front R
    ctx.fillRect(4, 9, 6, 3);   // Front L
    ctx.fillRect(-11, -12, 7, 4); // Rear R
    ctx.fillRect(-11, 8, 7, 4);  // Rear L

    // Glass visual windshield
    ctx.fillStyle = car.wetFactor > 0 ? 'rgba(0, 160, 255, 0.7)' : 'rgba(255, 0, 127, 0.75)';
    ctx.beginPath();
    ctx.arc(3, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Rear engine thruster flame glow
    const exhaustTimer = Math.sin(Date.now() * 0.12) * 5;
    
    if (car.boostEffectTimer > 0) {
      // Golden boosted wild thruster cone
      ctx.fillStyle = '#ff6700';
      ctx.beginPath();
      ctx.moveTo(-15, -3);
      ctx.lineTo(-35 + exhaustTimer * 2, 0);
      ctx.lineTo(-15, 3);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(-15, -1.5);
      ctx.lineTo(-24 + exhaustTimer, 0);
      ctx.lineTo(-15, 1.5);
      ctx.closePath();
      ctx.fill();
    } else if (car.speed > 50 && car.engineOffTimer <= 0) {
      // Small blue reactive combustion jet
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(-15, -2);
      ctx.lineTo(-24 + exhaustTimer, 0);
      ctx.lineTo(-15, 2);
      ctx.closePath();
      ctx.fill();
    }

    // Engine Cut symbol visual overlay on top of car
    if (car.engineOffTimer > 0) {
      ctx.fillStyle = '#ff007f';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚡OFF', 0, -14);
    }
    
    // Controls locked overlay alert
    if (car.noSteerBrakesTimer > 0) {
      ctx.fillStyle = '#39ff14';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🔒LCK', 0, 18);
    }

    ctx.restore();
  }

  /**
   * Radial blur at edge indicators for extreme speeds
   */
  private drawSpeedVignette(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    strength: number
  ): void {
    ctx.save();
    const grad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width / 4,
      width / 2,
      height / 2,
      width * 0.72
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, `rgba(0, 242, 254, ${strength * 0.15})`);
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Tiny speed whiskers lines darting from border center outwards
    ctx.strokeStyle = `rgba(255, 255, 255, ${strength * 0.25})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Draw 8 random lines
    const lineSeeds = [0.1, 0.22, 0.45, 0.58, 0.65, 0.78, 0.88, 0.95];
    lineSeeds.forEach((seed) => {
      const angle = seed * Math.PI * 2 + (Date.now() * 0.003);
      const startDist = width * 0.35 + Math.random() * 80;
      const endDist = startDist + 40;

      const sx = width / 2 + Math.cos(angle) * startDist;
      const sy = height / 2 + Math.sin(angle) * startDist;
      const ex = width / 2 + Math.cos(angle) * endDist;
      const ey = height / 2 + Math.sin(angle) * endDist;

      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
    });
    ctx.stroke();

    ctx.restore();
  }
}
