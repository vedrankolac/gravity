import { GUI } from 'dat.gui';
import { 
  PointLight,
  AmbientLight,
  SpotLight,
  SpotLightHelper,
  PointLightHelper
} from 'three';
import { PerlinNoise } from '../canvasMaps/PerlinNoise';

const createLights = scene => {
  let map = new PerlinNoise();
  
  // mobile phone optimisation
  // setting lower mapSize makes it much faster on iPhone 12 Pro Max
  // const spot = new SpotLight(0xffffff, 840);

  // const sphereSize = 0.4;

  // const pointA = new PointLight(0x404040, 10);
  // pointA.position.set(-10, 10, 0);
  // pointA.castShadow = true;
  // pointA.shadow.mapSize.width = 4096;
  // pointA.shadow.mapSize.height = 4096;
  // scene.add(pointA);
  // const pointLightHelperA = new PointLightHelper( pointA, sphereSize );
  // scene.add(pointLightHelperA);


  // const pointB = new PointLight(0x404040, 10);
  // pointB.position.set(10, 0, 0);
  // pointB.castShadow = true;
  // pointB.shadow.mapSize.width = 4096;
  // pointB.shadow.mapSize.height = 4096;
  // scene.add(pointB);
  // const pointLightHelperB = new PointLightHelper( pointB, sphereSize );
  // scene.add(pointLightHelperB);

  const spot = new SpotLight(0xffffff, 920);
  spot.penumbra = 1;
  spot.decay = 2.4;
  spot.angle = Math.PI/4;
  spot.position.set(-5, 15, 10);
  spot.target.position.set(0, 0, 0);
  spot.castShadow = true;
  spot.map = map.colorMap;
  spot.shadow.focus = 1;
  spot.shadow.mapSize.width = 4096;
  spot.shadow.mapSize.height = 4096;
  scene.add(spot);
  // scene.add(new SpotLightHelper(spot));

  map.colorMap = null;

  const ambient = new AmbientLight(0x404040, 3.4); // soft white light
  scene.add(ambient);

  // const gui = new GUI();
  // gui.add(ambient, 'intensity', 0, 6 );
}

export { createLights };