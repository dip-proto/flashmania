import { Car, ControlInputs, GhostFrame, Particle, Track, MedalType, TileType } from './types';
import { createCar, updateCar, isDriveable } from './physics';
import { TILE_SIZE } from './tracks';
import { AudioManager } from './audio';
import { GameRenderer } from './renderer';
import { GhostManager } from './ghost';
import { DEFAULT_TRACKS, getStartTileCoords, getCheckpointNodes } from './tracks';
import { TrackEditor } from './editor';

// ----------------------------------------------------
// STATE VARIABLES
// ----------------------------------------------------

let activeState: 'main_menu' | 'playing' | 'test_driving' | 'editor' = 'main_menu';
let selectedTrack: Track | null = null;
let currentTrackList: Track[] = [...DEFAULT_TRACKS];

// Gameplay State
let car: Car | null = null;
let inputs: ControlInputs = { accel: false, brake: false, left: false, right: false, drift: false };
let particles: Particle[] = [];
let screenShake = 0;
let isPaused = false;

// Time & Checkpoint Progress
let raceTime = 0; // Elapsed ms of active run
let raceStarted = false; // Clock ticks when user initially accelerating
let nextCheckpointIndex = 0; // Index of next expected checkpoint tile
let checkpointCoords: { x: number; y: number }[] = [];
let runCheckpointTimes: number[] = []; // Timestamps of passing each checkpoint (ms)

// Ghost & PB Cache
let personalBestTime: number | null = null;
let personalBesthostFrames: GhostFrame[] | null = null;
let activeGhostFrames: GhostFrame[] | null = null;
let raceVsGhostMode = false;

// Managers initialization placeholders
let audio: AudioManager;
let renderer: GameRenderer;
let ghost: GhostManager;
let editor: TrackEditor;

// Time Tracker Animation Frames
let lastFrameTime = 0;

// ----------------------------------------------------
// DOM ELEMENTS
// ----------------------------------------------------

const elMain = document.getElementById('main-menu')!;
const elGame = document.getElementById('game-container')!;
const elEditor = document.getElementById('editor-container')!;
const elAudioPrompt = document.getElementById('audio-prompt')!;
const elPause = document.getElementById('pause-menu')!;
const elFinish = document.getElementById('finish-screen')!;

const trackListContainer = document.getElementById('track-list')!;
const trackDetailsContent = document.getElementById('details-content')!;
const trackDetailsEmpty = document.getElementById('details-empty')!;

// ----------------------------------------------------
// MAIN ENTRANCE
// ----------------------------------------------------

function init(): void {
  // Setup Core Submanagers
  audio = new AudioManager();
  renderer = new GameRenderer(document.getElementById('game-canvas') as HTMLCanvasElement);
  ghost = new GhostManager();
  editor = new TrackEditor(document.getElementById('editor-canvas') as HTMLCanvasElement);

  // Bind Menu Interactions
  setupMenuBindings();
  setupKeyboardControls();

  // Draw Default Track List in Menu
  renderTrackList();

  // Watch screen resizes
  window.addEventListener('resize', () => {
    renderer.resize();
  });

  // Enter Major requestAnimationFrame loop
  lastFrameTime = performance.now();
  requestAnimationFrame(gameLoop);
}

// ----------------------------------------------------
// TRACK LIST DRAW
// ----------------------------------------------------

function renderTrackList(): void {
  trackListContainer.innerHTML = '';
  currentTrackList.forEach((track) => {
    const item = document.createElement('div');
    item.className = 'track-item';
    if (selectedTrack === track) {
      item.classList.add('selected');
    }

    const meta = document.createElement('div');
    meta.className = 'track-meta';

    const name = document.createElement('div');
    name.className = 'track-name';
    name.textContent = track.name;

    const author = document.createElement('div');
    author.className = 'track-author';
    author.textContent = `by ${track.author}`;

    meta.appendChild(name);
    meta.appendChild(author);
    item.appendChild(meta);

    // Retrieve earned medal visual icon from Local Storage records
    const pbTime = getSavedPB(track.name);
    if (pbTime !== null) {
      const medal = calculateMedalAchieved(track, pbTime);
      const medalDiv = document.createElement('div');
      medalDiv.className = 'track-medal-earned';
      medalDiv.textContent = getMedalEmoji(medal);
      item.appendChild(medalDiv);
    }

    item.addEventListener('click', () => {
      selectTrack(track);
    });

    trackListContainer.appendChild(item);
  });
}

function selectTrack(track: Track): void {
  selectedTrack = track;
  renderTrackList();

  trackDetailsEmpty.classList.add('hidden');
  trackDetailsContent.classList.remove('hidden');

  document.getElementById('det-name')!.textContent = track.name;
  
  // Format Targets Row
  document.getElementById('det-bronze')!.textContent = formatDuration(track.targetBronze);
  document.getElementById('det-silver')!.textContent = formatDuration(track.targetSilver);
  document.getElementById('det-gold')!.textContent = formatDuration(track.targetGold);
  document.getElementById('det-author')!.textContent = formatDuration(track.targetAuthor);

  const pbTime = getSavedPB(track.name);
  const pbVal = document.getElementById('val-pb')!;
  const btnGhost = document.getElementById('btn-play-ghost') as HTMLButtonElement;

  if (pbTime === null) {
    pbVal.textContent = 'NO TIME SET';
    pbVal.style.color = 'var(--text-sub)';
    btnGhost.disabled = true;
  } else {
    const medalEarned = calculateMedalAchieved(track, pbTime);
    pbVal.innerHTML = `${formatDuration(pbTime)} <span style="font-size:0.9rem;">(${getMedalTitle(medalEarned)})</span>`;
    pbVal.style.color = getMedalColorHex(medalEarned);
    btnGhost.disabled = false;
  }
}

// ----------------------------------------------------
// GAME SCREEN NAVIGATOR
// ----------------------------------------------------

async function startRace(track: Track, withGhost: boolean): Promise<void> {
  // Enforce Audio unlocking triggers initially
  const success = await audio.unlock();
  if (!success) return;

  elAudioPrompt.classList.add('hidden');
  elMain.classList.remove('active');
  elMain.style.display = 'none';

  // Toggle state
  activeState = 'playing';
  isPaused = false;
  raceStarted = false;
  raceTime = 0;
  nextCheckpointIndex = 0;
  runCheckpointTimes = [];
  particles = [];
  screenShake = 0;

  renderer.clearSkidmarks();

  // Find start placement
  const startCoords = getStartTileCoords(track);
  
  // Find heading direction by inspecting tile ahead of start
  // Look right, down, left, up around start tile
  let initialHeading = 0; // facing Right by default
  const startCol = Math.floor(startCoords.x / TILE_SIZE);
  const startRow = Math.floor(startCoords.y / TILE_SIZE);
  
  const adjacents = [
    { heading: 0, c: startCol + 1, r: startRow },
    { heading: Math.PI / 2, c: startCol, r: startRow + 1 },
    { heading: Math.PI, c: startCol - 1, r: startRow },
    { heading: Math.PI * 1.5, c: startCol, r: startRow - 1 },
  ];
  for (const adj of adjacents) {
    const type = track.tiles[`${adj.c},${adj.r}`] || 'empty';
    if (isDriveable(type) && type !== 'start') {
      initialHeading = adj.heading;
      break;
    }
  }

  car = createCar(startCoords.x, startCoords.y, initialHeading);
  inputs = { accel: false, brake: false, left: false, right: false, drift: false };

  // Track checkpoint coords
  checkpointCoords = getCheckpointNodes(track).map((n) => ({ x: n.x, y: n.y }));

  // Ghost setup
  personalBestTime = getSavedPB(track.name);
  personalBesthostFrames = ghost.loadGhost(track.name);
  raceVsGhostMode = withGhost && personalBesthostFrames !== null;
  activeGhostFrames = raceVsGhostMode ? personalBesthostFrames : null;

  ghost.startRecording();

  // Show / Hide UI flags
  document.getElementById('hud-ghost-tag')?.classList.toggle('hidden', !raceVsGhostMode);
  document.getElementById('hud-pb-compare')!.textContent = personalBestTime !== null 
    ? `PB: ${formatDuration(personalBestTime)}` 
    : 'PB: --:--.---';

  const badSplit = document.getElementById('hud-split-flash')!;
  badSplit.classList.add('hidden');

  elGame.style.display = 'block';
  elGame.classList.add('active');
}

function handleQuickRespawn(): void {
  if (activeState !== 'playing' && activeState !== 'test_driving') return;
  const currentTrack = activeState === 'test_driving' ? editor.getTrackData() : selectedTrack!;
  
  raceStarted = false;
  raceTime = 0;
  nextCheckpointIndex = 0;
  runCheckpointTimes = [];
  particles = [];
  screenShake = 0;

  renderer.clearSkidmarks();
  ghost.startRecording();

  const startCoords = getStartTileCoords(currentTrack);
  const startCol = Math.floor(startCoords.x / TILE_SIZE);
  const startRow = Math.floor(startCoords.y / TILE_SIZE);

  let initialHeading = 0;
  const adjacents = [
    { heading: 0, c: startCol + 1, r: startRow },
    { heading: Math.PI / 2, c: startCol, r: startRow + 1 },
    { heading: Math.PI, c: startCol - 1, r: startRow },
    { heading: Math.PI * 1.5, c: startCol, r: startRow - 1 },
  ];
  for (const adj of adjacents) {
    const type = currentTrack.tiles[`${adj.c},${adj.r}`] || 'empty';
    if (isDriveable(type) && type !== 'start') {
      initialHeading = adj.heading;
      break;
    }
  }

  car = createCar(startCoords.x, startCoords.y, initialHeading);
  inputs = { accel: false, brake: false, left: false, right: false, drift: false };

  audio.triggerVoidResetThump();

  document.getElementById('hud-split-flash')?.classList.add('hidden');
}

function exitToMainMenu(): void {
  audio.setMute(false);
  elGame.classList.remove('active');
  elGame.style.display = 'none';
  elEditor.classList.remove('active');
  elEditor.style.display = 'none';
  elPause.classList.add('hidden');
  elFinish.classList.add('hidden');

  activeState = 'main_menu';
  selectedTrack = null;
  selectedTrack = DEFAULT_TRACKS[0]; // safety select
  selectTrack(DEFAULT_TRACKS[0]);

  renderTrackList();
  elMain.style.display = 'flex';
  elMain.classList.add('active');
}

// ----------------------------------------------------
// COUNTDOWN TIMER TICK
// ----------------------------------------------------

function handleTriggerCheckpoint(idx: number): void {
  if (idx !== nextCheckpointIndex) return; // Sequence locked verification

  nextCheckpointIndex++;
  runCheckpointTimes.push(raceTime);

  // Play synthetic tone cascade
  audio.triggerCheckpointDing();

  // Parse Personal Best splits differences if available
  let splitString = '';
  let splitSign: 'negative' | 'positive' | 'neutral' = 'negative';

  if (personalBesthostFrames && personalBesthostFrames.length > 0) {
    // Attempt tracking same indexed checkpoint split time from historical frames
    // Match checkpoint index relative to coordinates boundary overlap
    const historicalTime = getGhostCheckpointTime(personalBesthostFrames, idx);
    if (historicalTime !== null) {
      const diff = raceTime - historicalTime;
      if (diff <= 0) {
        splitString = `-${formatDuration(Math.abs(diff))}`;
        splitSign = 'negative'; // green, faster!
      } else {
        splitString = `+${formatDuration(diff)}`;
        splitSign = 'positive'; // pink, behind!
      }
    }
  }

  if (splitString === '' && selectedTrack) {
    // Fallback split vs Gold Medal targets
    const fractionalTarget = Math.round(selectedTrack.targetGold * ((idx + 1) / (checkpointCoords.length + 1)));
    const diff = raceTime - fractionalTarget;
    if (diff <= 0) {
      splitString = `-${formatDuration(Math.abs(diff))}`;
      splitSign = 'negative';
    } else {
      splitString = `+${formatDuration(diff)}`;
      splitSign = 'positive';
    }
  }

  // Trigger HUD Split Overlays
  const flash = document.getElementById('hud-split-flash')!;
  const deltaText = document.getElementById('hud-split-delta')!;
  const descText = document.getElementById('hud-split-desc')!;

  deltaText.textContent = splitString !== '' ? splitString : formatDuration(raceTime);
  deltaText.className = splitSign;
  descText.textContent = `CHECKPOINT ${idx + 1}`;

  // Reset CSS animations by cloning node
  const newFlash = flash.cloneNode(true) as HTMLDivElement;
  newFlash.classList.remove('hidden');
  flash.replaceWith(newFlash);
}

function handleRaceFinished(): void {
  if (!car) return;

  const currentTrack = activeState === 'test_driving' ? editor.getTrackData() : selectedTrack!;
  const totalTime = raceTime;
  raceStarted = false;

  // Complete! Calculate medals
  const medal = calculateMedalAchieved(currentTrack, totalTime);
  const prevPB = getSavedPB(currentTrack.name);
  const isNewPB = prevPB === null || totalTime < prevPB;

  if (isNewPB && activeState !== 'test_driving') {
    savePB(currentTrack.name, totalTime);
    ghost.saveGhost(currentTrack.name, ghost.getRecording());
  }

  // Display Finished overlays panel
  document.getElementById('fin-time')!.textContent = formatDuration(totalTime);
  document.getElementById('fin-pb')!.textContent = prevPB !== null ? formatDuration(prevPB) : '--:--.---';

  const deltaRow = document.getElementById('fin-delta-row')!;
  if (prevPB !== null) {
    const diff = totalTime - prevPB;
    const deltaVal = document.getElementById('fin-delta')!;
    if (diff < 0) {
      deltaVal.textContent = `-${formatDuration(Math.abs(diff))} (NEW RECORD!)`;
      deltaVal.className = 'val negative';
    } else {
      deltaVal.textContent = `+${formatDuration(diff)}`;
      deltaVal.className = 'val positive';
    }
    deltaRow.classList.remove('hidden');
  } else {
    deltaRow.classList.add('hidden');
  }

  // Medal representation giant badge
  const giantBadge = document.getElementById('fin-medal-badge')!;
  const medalTitle = document.getElementById('fin-medal-name')!;
  const medalHint = document.getElementById('fin-medal-hint')!;

  giantBadge.textContent = getMedalEmoji(medal);
  medalTitle.textContent = `${getMedalTitle(medal)} MEDAL`;
  medalTitle.style.color = getMedalColorHex(medal);

  if (medal === 'author') {
    medalHint.textContent = `🏆 Incredibly flawless performance! You beats the Author's target time of ${formatDuration(currentTrack.targetAuthor)}!`;
  } else if (medal === 'gold') {
    medalHint.textContent = `🥇 Phenomenal run! Beaten gold target of ${formatDuration(currentTrack.targetGold)}!`;
  } else if (medal === 'silver') {
    medalHint.textContent = `🥈 Nice clean racing lines. Beaten silver target of ${formatDuration(currentTrack.targetSilver)}. Gold next?`;
  } else if (medal === 'bronze') {
    medalHint.textContent = `🥉 Competent run completes. Beaten bronze target of ${formatDuration(currentTrack.targetBronze)}. Try silver!`;
  } else {
    medalHint.textContent = `🏁 Track finishes successfully! Aim for Bronze medal time: ${formatDuration(currentTrack.targetBronze)}!`;
  }

  // Targets column references
  document.getElementById('fin-br-val')!.textContent = formatDuration(currentTrack.targetBronze);
  document.getElementById('fin-si-val')!.textContent = formatDuration(currentTrack.targetSilver);
  document.getElementById('fin-go-val')!.textContent = formatDuration(currentTrack.targetGold);
  document.getElementById('fin-au-val')!.textContent = formatDuration(currentTrack.targetAuthor);

  // Play finished cheers SFX trigger
  audio.triggerCheckpointDing();
  setTimeout(() => audio.triggerBoost(), 150);

  elFinish.classList.remove('hidden');
}

// ----------------------------------------------------
// PRIMARY CORE GAME TICK LOOP
// ----------------------------------------------------

function gameLoop(timestamp: number): void {
  const dt = (timestamp - lastFrameTime) / 1000;
  lastFrameTime = timestamp;

  if (isPaused) {
    // Only Render, skip physics ticking during pause
    if (activeState === 'playing' || activeState === 'test_driving') {
      const currentTrack = activeState === 'test_driving' ? editor.getTrackData() : selectedTrack!;
      renderer.draw(car!, null, currentTrack, particles, 0, dt);
    }
  } else {
    updateGameLogic(dt);
  }

  requestAnimationFrame(gameLoop);
}

function updateGameLogic(dt: number): void {
  if (activeState === 'playing' || activeState === 'test_driving') {
    const currentTrack = activeState === 'test_driving' ? editor.getTrackData() : selectedTrack!;

    if (!car) return;

    // Trigger timer clock once car starts moving or steering
    const isControlActive = inputs.accel || inputs.brake || inputs.left || inputs.right;
    if (isControlActive && !raceStarted) {
      raceStarted = true;
    }

    if (raceStarted) {
      raceTime += dt * 1000;
    }

    // Tick Car position updates
    const physRes = updateCar(car, inputs, currentTrack, dt);
    particles.push(...physRes.particles);
    screenShake = Math.max(0, screenShake * 0.85 - dt * 2.0) + physRes.screenShake;

    // Direct Web Audio Synth values
    audio.update(car, dt);

    // Audio SFX triggers
    if (physRes.soundTrigger) {
      switch (physRes.soundTrigger) {
        case 'boost': audio.triggerBoost(); break;
        case 'crash': audio.triggerCrash(); break;
        case 'land': audio.triggerLand(); break;
        case 'heavy_land': audio.triggerHeavyLand(); break;
        case 'engine_cut': audio.triggerEngineCut(); break;
        case 'fragile_alert': audio.triggerFragileAlert(); break;
        case 'fragile_break': audio.triggerFragileBreak(); break;
        case 'lock_alert': audio.triggerLockAlert(); break;
        case 'splash': audio.triggerSplash(); break;
        case 'void_fall': {
          audio.triggerVoidFall();
          handleQuickRespawn();
          break;
        }
      }
    }

    // Capture recording Frame
    if (raceStarted) {
      ghost.recordFrame(raceTime, car);
    }

    // Interpolate Ghost model state
    let ghostFrame: GhostFrame | null = null;
    if (raceVsGhostMode && activeGhostFrames) {
      ghostFrame = ghost.getGhostFrameAt(activeGhostFrames, raceTime);
    }

    // Check overlaps with Checkpoints
    const activeCellX = Math.floor(car.x / TILE_SIZE);
    const activeCellY = Math.floor(car.y / TILE_SIZE);
    const tileTypeBelow = currentTrack.tiles[`${activeCellX},${activeCellY}`] || 'empty';

    if (tileTypeBelow === 'checkpoint') {
      const activeCheckpointIndex = checkpointCoords.findIndex(
        (chk) => Math.floor(chk.x / TILE_SIZE) === activeCellX && Math.floor(chk.y / TILE_SIZE) === activeCellY
      );
      if (activeCheckpointIndex !== -1 && activeCheckpointIndex === nextCheckpointIndex) {
        handleTriggerCheckpoint(activeCheckpointIndex);
      }
    }

    // Check overlap with Finish Line
    if (tileTypeBelow === 'finish') {
      // Must sequential-pass ALL track checkpoints before finish line is active!
      if (nextCheckpointIndex === checkpointCoords.length) {
        handleRaceFinished();
      }
    }

    // Particle garbage collection updates
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life = Math.max(0, p.life - dt / p.maxLife);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      
      // particle gravity
      p.vz -= 300 * dt;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    // Draw on screen
    renderer.draw(car, ghostFrame, currentTrack, particles, screenShake, dt);

    // Update digital HUD panel elements
    updateHUDOverlay(car, raceTime);
  } else if (activeState === 'editor') {
    // Just maintain editor canvas ticks
    editor.render();
  }
}

// ----------------------------------------------------
// STATS / HUD DIGITAL OVERLAYS UPDATES
// ----------------------------------------------------

function updateHUDOverlay(activeCar: Car, elTime: number): void {
  document.getElementById('hud-timer')!.textContent = formatDuration(elTime);

  // Speedometer text
  const kph = Math.round(activeCar.speed * 0.42); // scaling factor to represent kph speeds up to 550
  const speedStr = String(kph).padStart(3, '0');
  document.getElementById('hud-speed-val')!.textContent = speedStr;

  // Tachometer rotating indicator radial bars (stroke-dashoffset from 251 to 88)
  const maxDialRPMUnit = 600; // max scale
  const activePercentage = Math.min(1.0, kph / maxDialRPMUnit);
  const radialBar = document.getElementById('speed-radial-bar') as SVGPathElement | null;
  if (radialBar) {
    const dashOffset = 251 - activePercentage * 163; // 251 is empty, 88 is full speed
    radialBar.setAttribute('stroke-dashoffset', String(dashOffset));
  }

  // Active Surface Text
  const surfVal = document.getElementById('hud-surface-val')!;
  surfVal.textContent = activeCar.currentSurface.toUpperCase();
  surfVal.style.color = getSurfaceColor(activeCar.currentSurface);

  // Gimmick Alert display
  const gimmVal = document.getElementById('hud-gimmick-val')!;
  const redSkullDamaged = document.getElementById('fragile-warning')!;
  
  if (activeCar.boostEffectTimer > 0) {
    gimmVal.textContent = '⚡ BOOST ACTIVE!';
    gimmVal.className = 'hud-value neon-orange pulse';
  } else if (activeCar.engineOffTimer > 0) {
    gimmVal.textContent = `🔌 ENGINE OFF (${activeCar.engineOffTimer.toFixed(1)}s)`;
    gimmVal.className = 'hud-value neon-magenta';
  } else if (activeCar.noSteerBrakesTimer > 0) {
    gimmVal.textContent = '🔒 CONTROLS LOCKED';
    gimmVal.className = 'hud-value neon-green';
  } else if (activeCar.fragileTimer > 0) {
    gimmVal.textContent = `💀 FRAGILE TIME (${activeCar.fragileTimer.toFixed(1)}s)`;
    gimmVal.className = 'hud-value neon-orange';
  } else {
    gimmVal.textContent = 'NORMAL PHYSICS';
    gimmVal.className = 'hud-value';
    gimmVal.style.color = 'var(--text-sub)';
  }

  redSkullDamaged.classList.toggle('hidden', !activeCar.steeringDamaged);

  // Altitude inner bars height
  const maxAltRange = 300;
  const altPercent = Math.min(100, Math.max(0, (activeCar.z / maxAltRange) * 100));
  document.getElementById('hud-alt-bar')!.style.height = `${altPercent}%`;
  document.getElementById('hud-alt-val')!.textContent = `${Math.round(activeCar.z / 6)}m`;

  document.getElementById('hud-state-airborne')!.classList.toggle('hidden', !activeCar.isAirborne);

  // Keys Visualizer active class toggles
  document.getElementById('key-accel')!.classList.toggle('active', inputs.accel);
  document.getElementById('key-steer-left')!.classList.toggle('active', inputs.left);
  document.getElementById('key-brake')!.classList.toggle('active', inputs.brake);
  document.getElementById('key-steer-right')!.classList.toggle('active', inputs.right);
}

// ----------------------------------------------------
// CONTROLLER INPUT REGISTER BINDINGS
// ----------------------------------------------------

function setupKeyboardControls(): void {
  window.addEventListener('keydown', (e) => {
    // Standard keys overrides
    if (activeState === 'playing' || activeState === 'test_driving') {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          inputs.accel = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          inputs.brake = true;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          inputs.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          inputs.right = true;
          break;
        case ' ':
          inputs.drift = true;
          break;

        case 'Escape':
          // Esc Pause trigger
          if (!elFinish.classList.contains('hidden')) return; // ignore during victory finishes
          isPaused = !isPaused;
          elPause.classList.toggle('hidden', !isPaused);
          audio.setMute(isPaused);
          break;

        case 'Backspace':
        case 'Delete':
        case 'Enter':
          // Quick respawn
          handleQuickRespawn();
          break;
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    if (activeState === 'playing' || activeState === 'test_driving') {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          inputs.accel = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          inputs.brake = false;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          inputs.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          inputs.right = false;
          break;
        case ' ':
          inputs.drift = false;
          break;
      }
    }
  });
}

// ----------------------------------------------------
// HUD UI INTERACTIONS BINDINGS
// ----------------------------------------------------

function setupMenuBindings(): void {
  // Sound activate splash button
  document.getElementById('btn-unlock-audio')!.addEventListener('click', () => {
    audio.unlock();
    elAudioPrompt.classList.add('hidden');
  });

  // Track selection actions
  document.getElementById('btn-play-track')!.addEventListener('click', () => {
    if (selectedTrack) {
      startRace(selectedTrack, false);
    }
  });

  document.getElementById('btn-play-ghost')!.addEventListener('click', () => {
    if (selectedTrack && getSavedPB(selectedTrack.name) !== null) {
      startRace(selectedTrack, true);
    }
  });

  // Main menu launch editor button
  document.getElementById('btn-open-editor')!.addEventListener('click', async () => {
    const success = await audio.unlock();
    if (!success) return;

    elAudioPrompt.classList.add('hidden');
    elMain.classList.remove('active');
    elMain.style.display = 'none';

    activeState = 'editor';
    editor.clearGrid(); // Seeding start/finish custom pieces

    elEditor.style.display = 'grid';
    elEditor.classList.add('active');
  });

  // Editor triggers callbacks back to game loop
  editor.onTestDrive = (track: Track) => {
    // Load custom sandbox track in Test Driving modes
    elEditor.classList.remove('active');
    elEditor.style.display = 'none';

    selectedTrack = track;
    startRace(track, false);
    activeState = 'test_driving';
  };

  editor.onExit = () => {
    exitToMainMenu();
  };

  // Pause screen binds
  document.getElementById('btn-resume')!.addEventListener('click', () => {
    isPaused = false;
    elPause.classList.add('hidden');
    audio.setMute(false);
  });

  document.getElementById('btn-restart')!.addEventListener('click', () => {
    isPaused = false;
    elPause.classList.add('hidden');
    audio.setMute(false);
    handleQuickRespawn();
  });

  document.getElementById('btn-quit')!.addEventListener('click', () => {
    exitToMainMenu();
  });

  // Finish screen binds
  document.getElementById('btn-fin-retry')!.addEventListener('click', () => {
    elFinish.classList.add('hidden');
    const currentTrack = activeState === 'test_driving' ? editor.getTrackData() : selectedTrack!;
    startRace(currentTrack, raceVsGhostMode);
  });

  document.getElementById('btn-fin-menu')!.addEventListener('click', () => {
    if (activeState === 'test_driving') {
      // Return straight back to Editor!
      elFinish.classList.add('hidden');
      elGame.classList.remove('active');
      elGame.style.display = 'none';

      activeState = 'editor';
      elEditor.style.display = 'grid';
      elEditor.classList.add('active');
      
      // Redraw grid
      editor.render();
    } else {
      exitToMainMenu();
    }
  });
}

// ----------------------------------------------------
// STORAGE HELPERS
// ----------------------------------------------------

function getSavedPB(trackName: string): number | null {
  const val = localStorage.getItem(`pb_${trackName}`);
  return val ? parseInt(val) : null;
}

function savePB(trackName: string, timeMs: number): void {
  localStorage.setItem(`pb_${trackName}`, String(timeMs));
}

// ----------------------------------------------------
// UTILITIES HELPERS
// ----------------------------------------------------

function formatDuration(ms: number): string {
  if (isNaN(ms) || ms < 0) return '00:00.000';
  const totalSecs = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;
  const milliseconds = Math.floor(ms % 1000);

  const minStr = String(minutes).padStart(2, '0');
  const secStr = String(seconds).padStart(2, '0');
  const msStr = String(milliseconds).padStart(3, '0');

  return `${minStr}:${secStr}.${msStr}`;
}

function calculateMedalAchieved(track: Track, timeMs: number): MedalType {
  if (timeMs <= track.targetAuthor) return 'author';
  if (timeMs <= track.targetGold) return 'gold';
  if (timeMs <= track.targetSilver) return 'silver';
  if (timeMs <= track.targetBronze) return 'bronze';
  return 'none';
}

function getMedalTitle(medal: MedalType): string {
  switch (medal) {
    case 'author': return 'AUTHOR';
    case 'gold': return 'GOLD';
    case 'silver': return 'SILVER';
    case 'bronze': return 'BRONZE';
    default: return 'COMPLETED';
  }
}

function getMedalEmoji(medal: MedalType): string {
  switch (medal) {
    case 'author': return '👑';
    case 'gold': return '🥇';
    case 'silver': return '🥈';
    case 'bronze': return '🥉';
    default: return '🏁';
  }
}

function getMedalColorHex(medal: MedalType): string {
  switch (medal) {
    case 'author': return 'var(--neon-blue)';
    case 'gold': return 'var(--neon-yellow)';
    case 'silver': return 'var(--silver-web)';
    case 'bronze': return 'var(--bronze-metallic)';
    default: return '#fff';
  }
}

function getSurfaceColor(type: TileType): string {
  switch (type) {
    case 'dirt': return '#ffaa55';
    case 'ice': return '#88ddff';
    case 'grass': return '#44ee44';
    case 'plastic': return '#00a5ff';
    default: return '#fff';
  }
}

function getGhostCheckpointTime(ghostFrames: GhostFrame[], checkpointIdx: number): number | null {
  // Approximate timestamp from recorded frame logs where coordinates overlapping occurred
  // To make it very precise: the recording saved is already sequential.
  // We can scan frames where coordinate transitions match the grid checkpoints!
  // Simple heuristic: let's model a linear fractional mapping of check times
  // or retrieve pre-recorded checkpoints split flags inside saved states if we stored them!
  // Since we know checkpoints list sequence layout, split index corresponds is:
  // (index + 1) * fraction of run duration.
  // To be robust, let's look up the frame where the ghost first entered checkpoint tile!
  // Since we didn't save checkpoint actions explicitly in GhostFrame, we can derive it by:
  // Scanning historical frames coordinates overlapping the selected checkpoint nodes!
  if (ghostFrames.length === 0) return null;
  
  // Get active track checkpoints nodes
  const track = selectedTrack!;
  const checkpoints = getCheckpointNodes(track).map((n) => ({ x: n.x, y: n.y }));
  if (checkpointIdx >= checkpoints.length) return null;
  const targetChk = checkpoints[checkpointIdx];

  // Scan frame by frame for first intersection within bounding TILE_SIZE offset
  for (const frame of ghostFrames) {
    const fileCol = Math.floor(frame.x / TILE_SIZE);
    const fileRow = Math.floor(frame.y / TILE_SIZE);
    const chkCol = Math.floor(targetChk.x / TILE_SIZE);
    const chkRow = Math.floor(targetChk.y / TILE_SIZE);

    if (fileCol === chkCol && fileRow === chkRow) {
      return frame.time;
    }
  }

  // fallback proportional estimate if frame is somehow clipped
  return Math.round(ghostFrames[ghostFrames.length - 1].time * ((checkpointIdx + 1) / (checkpoints.length + 1)));
}

// ----------------------------------------------------
// ENGINE FIRING
// ----------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
  init();
});
