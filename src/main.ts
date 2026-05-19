import { Game } from './game/Game.js';

// Entry point for Flashmania
window.addEventListener('DOMContentLoaded', () => {
  console.log('🏎️ Flashmania starting...');
  
  const game = new Game();
  game.run();

  // Preload audio on first interaction
  const initAudio = () => {
    console.log('🔊 Audio context initialized');
    document.removeEventListener('click', initAudio);
    document.removeEventListener('keydown', initAudio);
  };
  document.addEventListener('click', initAudio);
  document.addEventListener('keydown', initAudio);
});