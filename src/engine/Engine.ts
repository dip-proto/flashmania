import * as THREE from 'three';
import { InputManager } from '../input/InputManager';
import { AudioManager } from '../audio/AudioManager';

export class Engine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  public input: InputManager;
  public audio: AudioManager;

  constructor(private onInit?: () => void) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.input = new InputManager();
    this.audio = new AudioManager();

    // Sky color and fog
    this.scene.background = new THREE.Color(0x87CEEB);
    this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(50, 80, 30);
    dir.castShadow = true;
    dir.shadow.mapSize.width = 2048;
    dir.shadow.mapSize.height = 2048;
    dir.shadow.camera.near = 0.5;
    dir.shadow.camera.far = 200;
    dir.shadow.camera.left = -100;
    dir.shadow.camera.right = 100;
    dir.shadow.camera.top = 100;
    dir.shadow.camera.bottom = -100;
    this.scene.add(dir);

    // Resize handler
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  public getScene(): THREE.Scene { return this.scene; }
  public getCamera(): THREE.PerspectiveCamera { return this.camera; }
  public getRenderer(): THREE.WebGLRenderer { return this.renderer; }
  public getClock(): THREE.Clock { return this.clock; }
  public getInput(): InputManager { return this.input; }
  public getAudio(): AudioManager { return this.audio; }

  public start(onTick: (deltaTime: number) => void): void {
    if (this.onInit) this.onInit();

    const animate = () => {
      requestAnimationFrame(animate);
      const dt = Math.min(this.clock.getDelta(), 0.05); // Cap delta time
      onTick(dt);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
