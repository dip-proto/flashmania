import { Game } from './game';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const game = new Game(canvas);

function gameLoop() {
  game.update();
  requestAnimationFrame(gameLoop);
}

gameLoop();