import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 300 );

  // camera.position.x = 9;
  // camera.position.y = 9;
  // camera.position.z = 9;

  // center distance
  const radius  = fxrand() * 6 + 22;
  // const radius  = 40;

  // up - down
  const polar   = MathUtils.degToRad(fxrand()*10 + 85);

  // left - right
  const angle = MathUtils.degToRad(fxrand() * 30 + 70);
  const side = fxrand;
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