import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 400 );

  // center distance
  const radius  = $fx.rand() * 6 + 20;
  // const radius  = 20;

  // up - down
  const polar   = MathUtils.degToRad($fx.rand() * 20 + 70);

  // left - right
  const angle = MathUtils.degToRad($fx.rand() * 30 + 70);
  const side = $fx.rand();
  const equator = (side > 0.5) ? angle : angle * -1;
  // const equator = MathUtils.degToRad(0);

  const cameraVector = new Vector3();
  cameraVector.setFromSphericalCoords(radius, polar, equator);

  camera.position.x = cameraVector.x;
  camera.position.y = cameraVector.y;
  camera.position.z = cameraVector.z;

  return camera;
}

const createDolly = (camera, scene) => {
  const dolly = new Group();
  dolly.name = "dolly";
  scene.add(dolly);
  dolly.add(camera);
  dolly.position.set(0, 0, 0);
  return dolly;
}

export { createCamera, createDolly };