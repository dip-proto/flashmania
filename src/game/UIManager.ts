import * as THREE from 'three';
import { GameState, GameStateManager, MedalTier } from './GameState.js';
import { SurfaceType, BlockEffect, SURFACE_PROPS } from '../engine/Physics.js';
import { AudioSystem } from '../engine/Audio.js';

/** Surface display names */
const SURFACE_NAMES: Record<SurfaceType, string> = {
  [SurfaceType.Asphalt]: 'Asphalt',
  [SurfaceType.Dirt]: 'Dirt',
  [SurfaceType.Ice]: 'Ice',
  [SurfaceType.Grass]: 'Grass',
  [SurfaceType.Plastic]: 'Wet/Plastic',
  [SurfaceType.None]: '---',
};

const EFFECT_NAMES: Record<BlockEffect, string> = {
  [BlockEffect.None]: '',
  [BlockEffect.Booster]: '🚀 BOOST!',
  [BlockEffect.EngineOff]: '⚠️ ENGINE OFF',
  [BlockEffect.Fragile]: '💀 FRAGILE',
  [BlockEffect.NoSteer]: '🔒 NO STEERING',
  [BlockEffect.NoBrake]: '🔓 NO BRAKES',
  [BlockEffect.Start]: '',
  [BlockEffect.Finish]: '',
  [BlockEffect.Checkpoint]: '✓ CHECKPOINT',
};

/** Manages all UI overlays */
export class UIManager {
  private container: HTMLElement;
  private audioSystem: AudioSystem;

  // UI elements
  private speedDisplay!: HTMLElement;
  private timerDisplay!: HTMLElement;
  private surfaceDisplay!: HTMLElement;
  private effectDisplay!: HTMLElement;
  private countdownDisplay!: HTMLElement;
  private medalDisplay!: HTMLElement;
  private ghostTimeDisplay!: HTMLElement;
  private controlsDisplay!: HTMLElement;
  private trackNameDisplay!: HTMLElement;
  private menuOverlay!: HTMLElement;
  private medalTimesDisplay!: HTMLElement;

  constructor(container: HTMLElement, audioSystem: AudioSystem) {
    this.container = container;
    this.audioSystem = audioSystem;
    this.createUI();
  }

  private createUI(): void {
    // Style all elements
    const style = document.createElement('style');
    style.textContent = `
      .fm-ui { position: absolute; font-family: 'Segoe UI', Arial, sans-serif; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
      .fm-speed { top: 20px; right: 20px; font-size: 48px; font-weight: bold; }
      .fm-speed-unit { font-size: 20px; vertical-align: super; }
      .fm-timer { top: 20px; left: 50%; transform: translateX(-50%); font-size: 36px; font-weight: bold; font-variant-numeric: tabular-nums; }
      .fm-surface { bottom: 20px; left: 20px; font-size: 20px; }
      .fm-effect { top: 70px; left: 50%; transform: translateX(-50%); font-size: 28px; font-weight: bold; animation: fm-pulse 0.5s ease-in-out infinite; }
      .fm-countdown { top: 40%; left: 50%; transform: translate(-50%, -50%); font-size: 120px; font-weight: 900; }
      .fm-medal { top: 30%; left: 50%; transform: translateX(-50%); text-align: center; font-size: 48px; }
      .fm-medal-time { font-size: 36px; margin-top: 10px; }
      .fm-ghost-time { top: 60px; left: 50%; transform: translateX(-50%); font-size: 18px; opacity: 0.7; }
      .fm-controls { bottom: 20px; right: 20px; font-size: 14px; opacity: 0.6; text-align: right; line-height: 1.6; }
      .fm-track-name { top: 20px; left: 20px; font-size: 18px; opacity: 0.8; }
      .fm-menu { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 100; }
      .fm-menu h1 { font-size: 72px; margin: 0; background: linear-gradient(135deg, #FFD700, #FF6600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: none; }
      .fm-menu h2 { font-size: 24px; margin: 10px 0 30px; opacity: 0.7; }
      .fm-menu button { background: linear-gradient(135deg, #0066FF, #0044CC); color: white; border: none; padding: 15px 40px; font-size: 22px; font-weight: bold; border-radius: 10px; cursor: pointer; margin: 8px; transition: transform 0.1s, box-shadow 0.2s; }
      .fm-menu button:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(0,102,255,0.5); }
      .fm-medal-times { font-size: 16px; opacity: 0.6; margin-top: 20px; text-align: center; line-height: 1.8; }
      .fm-menu .controls-info { font-size: 14px; opacity: 0.5; margin-top: 30px; text-align: center; line-height: 1.8; }
      .fm-medal-popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 64px; font-weight: 900; pointer-events: none; animation: fm-appear 0.5s ease-out; }
      @keyframes fm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes fm-appear { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);

    // Speed display
    this.speedDisplay = this.createElement('fm-ui fm-speed');
    this.container.appendChild(this.speedDisplay);

    // Timer display
    this.timerDisplay = this.createElement('fm-ui fm-timer');
    this.container.appendChild(this.timerDisplay);

    // Surface display
    this.surfaceDisplay = this.createElement('fm-ui fm-surface');
    this.container.appendChild(this.surfaceDisplay);

    // Effect display
    this.effectDisplay = this.createElement('fm-ui fm-effect');
    this.container.appendChild(this.effectDisplay);

    // Countdown
    this.countdownDisplay = this.createElement('fm-ui fm-countdown');
    this.countdownDisplay.style.display = 'none';
    this.container.appendChild(this.countdownDisplay);

    // Medal display
    this.medalDisplay = this.createElement('fm-ui fm-medal');
    this.medalDisplay.style.display = 'none';
    this.container.appendChild(this.medalDisplay);

    // Ghost time
    this.ghostTimeDisplay = this.createElement('fm-ui fm-ghost-time');
    this.container.appendChild(this.ghostTimeDisplay);

    // Controls
    this.controlsDisplay = this.createElement('fm-ui fm-controls');
    this.controlsDisplay.innerHTML = 'W/↑ Accelerate<br>S/↓ Brake<br>A/← Steer Left<br>D/→ Steer Right<br>R Restart<br>ESC Menu';
    this.container.appendChild(this.controlsDisplay);

    // Track name
    this.trackNameDisplay = this.createElement('fm-ui fm-track-name');
    this.container.appendChild(this.trackNameDisplay);

    // Medal times
    this.medalTimesDisplay = this.createElement('fm-ui fm-medal-times');
    this.medalTimesDisplay.style.cssText = 'position:absolute; top:50px; left:20px; font-size:14px; opacity:0.5;';
    this.container.appendChild(this.medalTimesDisplay);

    // Menu overlay
    this.menuOverlay = document.createElement('div');
    this.menuOverlay.className = 'fm-menu';
    this.menuOverlay.innerHTML = `
      <h1>FLASHMANIA</h1>
      <h2>Time Trial Racing</h2>
      <div id="fm-track-select">
        <button id="fm-track-0" data-track="0">Beginner's Loop</button>
        <button id="fm-track-1" data-track="1">Speed Valley</button>
        <button id="fm-track-2" data-track="2">Ice Mountain</button>
      </div>
      <div class="fm-medal-times" id="fm-menu-medal-times"></div>
      <div class="controls-info">
        W/↑ Accelerate · S/↓ Brake · A/← Steer Left · D/→ Steer Right<br>
        R Restart · ESC Menu
      </div>
    `;
    this.container.appendChild(this.menuOverlay);
  }

  private createElement(className: string): HTMLElement {
    const el = document.createElement('div');
    el.className = className;
    return el;
  }

  update(gameState: GameStateManager): void {
    const gs = gameState;

    // Speed
    this.speedDisplay.textContent = `${Math.round(gs.currentSpeedKmh)}`;
    this.speedDisplay.innerHTML += '<span class="fm-speed-unit">km/h</span>';

    // Speed color
    if (gs.currentSpeedKmh > 250) {
      this.speedDisplay.style.color = '#FF4444';
    } else if (gs.currentSpeedKmh > 150) {
      this.speedDisplay.style.color = '#FFAA00';
    } else {
      this.speedDisplay.style.color = '#FFFFFF';
    }

    // Timer
    this.timerDisplay.textContent = GameStateManager.formatTime(gs.raceTime);

    // Surface
    const surfaceName = SURFACE_NAMES[gs.currentSurface] || '---';
    const surfaceColor = gs.currentSurface !== SurfaceType.None ? '#' + SURFACE_PROPS[gs.currentSurface]?.color?.toString(16).padStart(6, '0') : '#666666';
    this.surfaceDisplay.innerHTML = `Surface: <span style="color:${surfaceColor}">${surfaceName}</span>`;

    // Effect
    const effectName = EFFECT_NAMES[gs.currentEffect];
    this.effectDisplay.textContent = effectName;
    this.effectDisplay.style.display = effectName ? 'block' : 'none';

    if (gs.currentEffect === BlockEffect.Booster) {
      this.effectDisplay.style.color = '#FFD700';
    } else if (gs.currentEffect === BlockEffect.EngineOff) {
      this.effectDisplay.style.color = '#FF4444';
    } else if (gs.currentEffect === BlockEffect.Fragile) {
      this.effectDisplay.style.color = '#FF69B4';
    } else if (gs.currentEffect === BlockEffect.NoSteer) {
      this.effectDisplay.style.color = '#00FFFF';
    } else if (gs.currentEffect === BlockEffect.NoBrake) {
      this.effectDisplay.style.color = '#FF6600';
    } else if (gs.currentEffect === BlockEffect.Checkpoint) {
      this.effectDisplay.style.color = '#44FF44';
    }

    // Countdown
    if (gs.state === GameState.Countdown) {
      this.countdownDisplay.style.display = 'block';
      this.countdownDisplay.textContent = gs.countdownValue > 0 ? String(gs.countdownValue) : 'GO!';
      this.countdownDisplay.style.color = gs.countdownValue > 0 ? '#FFFFFF' : '#00FF00';
    } else {
      this.countdownDisplay.style.display = 'none';
    }

    // Medal times
    const medals = gs.medalTimes;
    this.medalTimesDisplay.innerHTML = `
      🥇 Gold: ${GameStateManager.formatTime(medals.gold)}<br>
      🥈 Silver: ${GameStateManager.formatTime(medals.silver)}<br>
      🥉 Bronze: ${GameStateManager.formatTime(medals.bronze)}<br>
      ★ Author: ${GameStateManager.formatTime(medals.author)}
    `;

    // Menu visibility
    this.menuOverlay.style.display = gs.state === GameState.Menu ? 'flex' : 'none';

    // Finished display
    if (gs.state === GameState.Finished) {
      const medal = gs.getMedal(gs.raceTime);
      const medalDisplay = GameStateManager.getMedalDisplay(medal);
      this.medalDisplay.style.display = 'block';
      this.medalDisplay.innerHTML = `
        <div style="color:${medalDisplay.color}">${medalDisplay.name}</div>
        <div class="fm-medal-time">${GameStateManager.formatTime(gs.raceTime)}</div>
        <div style="font-size:20px; margin-top:30px; opacity:0.7">Press R to restart · ESC for menu</div>
      `;
    } else {
      this.medalDisplay.style.display = 'none';
    }

    // Update menu medal times
    const menuMedals = document.getElementById('fm-menu-medal-times');
    if (menuMedals) {
      menuMedals.innerHTML = `
        🥇 Gold: ${GameStateManager.formatTime(medals.gold)} · 
        🥈 Silver: ${GameStateManager.formatTime(medals.silver)} · 
        🥉 Bronze: ${GameStateManager.formatTime(medals.bronze)} · 
        ★ Author: ${GameStateManager.formatTime(medals.author)}
      `;
    }
  }

  onTrackSelect(callback: (trackIndex: number) => void): void {
    const buttons = this.menuOverlay.querySelectorAll('button[data-track]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        callback(parseInt((btn as HTMLElement).dataset?.track ?? '0'));
      });
    });
  }

  showEffectPopup(text: string, color: string): void {
    const popup = this.createElement('fm-medal-popup');
    popup.textContent = text;
    popup.style.color = color;
    this.container.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }
}