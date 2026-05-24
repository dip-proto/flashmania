import * as THREE from 'three';
import { Engine } from './engine/Engine';
import { GameManager } from './engine/GameManager';
import { GameState } from './types/GameState';
import { createDemoTrack } from './track/DemoTrack';
import { HUD } from './ui/HUD';
import { GhostCar } from './ghost/GhostCar';

function main(): void {
  const engine = new Engine();
  const game = new GameManager(engine);
  const hud = new HUD();

  // Load the demo track
  const track = createDemoTrack();
  game.loadTrack(track);

  // Ground plane far below (decorative)
  const groundGeo = new THREE.PlaneGeometry(500, 500);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x44AA66, roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -10;
  ground.receiveShadow = true;
  engine.getScene().add(ground);

  // Clouds
  addClouds(engine);

  // Ghost car for replay
  const ghostCar = new GhostCar();
  ghostCar.getModel().visible = false;
  engine.getScene().add(ghostCar.getModel());

  let autoStartTimer: number | null = null;

  // Title screen
  hud.showMessage('FLASHMANIA\nWASD or Arrows to drive\nR to restart');

  // Auto-start after title
  setTimeout(() => {
    if (game.getState() === GameState.READY) {
      hud.showReady();
      autoStartTimer = window.setTimeout(() => {
        autoStartTimer = null;
        hud.showGo();
        game.startRace();
      }, 2000);
    }
  }, 3000);

  engine.start((deltaTime: number) => {
    const state = game.getState();

    // Handle restart (R key)
    if (engine.getInput().consumeRestart()) {
      doRestart(game, ghostCar, hud);
    }

    // Handle pause (Escape/P)
    if (engine.getInput().consumePause()) {
      if (state === GameState.RACING || state === GameState.PAUSED) {
        game.pauseRace();
      }
    }

    // Update game
    game.update(deltaTime);

    // HUD updates
    const car = game.getCar();
    if (car) {
      hud.updateSpeed(car.getSpeed());
    }

    hud.updateTimer(game.getRaceTimer());
    hud.updateBestTime(game.getBestTime());

    // State-based HUD logic
    if (state === GameState.PAUSED) {
      hud.showPaused();
    } else if (state === GameState.FINISHED) {
      const medal = game.getMedal();
      hud.updateMedal(medal);
      hud.showFinished(game.getRaceTimer(), medal);

      // Set up ghost for next race
      const frames = game.getGhostData();
      if (frames.length > 0) {
        ghostCar.loadFrames(frames);
        ghostCar.getModel().visible = true;
      }
    } else if (state === GameState.RACING && autoStartTimer === null) {
      // Clear messages during racing
      hud.clearMessage();
    }

    // Update ghost car during racing
    if (state === GameState.RACING && ghostCar.getModel().visible) {
      ghostCar.update(deltaTime);
    }

    // Auto-start on first ready state
    if (state === GameState.READY && autoStartTimer === null) {
      hud.showReady();
      autoStartTimer = window.setTimeout(() => {
        autoStartTimer = null;
        hud.showGo();
        game.startRace();
      }, 2000);
    }
  });

  // Audio init on first user interaction (browser autoplay policy)
  window.addEventListener('click', () => engine.getAudio().init(), { once: true });
  window.addEventListener('keydown', () => engine.getAudio().init(), { once: true });
}

function doRestart(game: GameManager, ghostCar: GhostCar, hud: HUD): void {
  // Save current ghost data before reset
  const oldFrames = game.getGhostData();
  
  game.resetRace();
  
  setTimeout(() => {
    if (game.getState() === GameState.READY) {
      // Load ghost from previous run if available
      if (oldFrames.length > 0) {
        ghostCar.loadFrames(oldFrames);
        ghostCar.start();
        ghostCar.getModel().visible = true;
      } else {
        ghostCar.getModel().visible = false;
      }

      hud.clearMessage();
      hud.updateMedal(null);
      hud.showReady();

      setTimeout(() => {
        hud.showGo();
        game.startRace();
      }, 1500);
    }
  }, 500);
}

function addClouds(engine: Engine): void {
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 1,
    metalness: 0,
    transparent: true,
    opacity: 0.75,
  });

  for (let i = 0; i < 25; i++) {
    const cloudGroup = new THREE.Group();
    const count = 3 + Math.floor(Math.random() * 4);
    for (let j = 0; j < count; j++) {
      const r = 8 + Math.random() * 15;
      const geo = new THREE.SphereGeometry(r, 8, 6);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 15,
      );
      cloudGroup.add(mesh);
    }
    cloudGroup.position.set(
      (Math.random() - 0.5) * 600,
      80 + Math.random() * 50,
      (Math.random() - 0.5) * 600,
    );
    engine.getScene().add(cloudGroup);
  }
}

main();
