import { GUI } from 'dat.gui';
import { 
  AmbientLight,
  SpotLight,
} from 'three';
import { PerlinNoise } from '../canvasMaps/PerlinNoise';

const createLights = scene => {
  let map = new PerlinNoise();
  
  // mobile phone optimisation
  // setting lower mapSize makes it much faster on iPhone 12 Pro Max
  // const spot = new SpotLight(0xffffff, 840);

  const spot = new SpotLight(0xffffff, 920);
  spot.penumbra = 1;
  spot.decay = 2;
  spot.angle = Math.PI/4;
  spot.position.set(0, 20, 0);
  spot.target.position.set(0, 0, 0);
  spot.castShadow = true;
  spot.map = map.colorMap;
  spot.shadow.focus = 1;
  spot.shadow.mapSize.width = 4096;
  spot.shadow.mapSize.height = 4096;
  scene.add(spot);
  // scene.add(new SpotLightHelper(spot));

  map.colorMap = null;

  const light = new AmbientLight(0x404040, 3.4); // soft white light
  scene.add(light);

  // const gui = new GUI();
  // gui.add(spot, 'intensity', 600.0, 1200.0 );
}

export { createLights };