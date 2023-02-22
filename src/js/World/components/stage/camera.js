import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 300 );

  // camera.position.x = 9;
  // camera.position.y = 9;
  // camera.position.z = 9;

  const radius  = fxrand()*11+19;
  // const radius  = 25;

  const polar   = MathUtils.degToRad(fxrand()*360);
  // const polar   = MathUtils.degToRad(60);

  // const equator = MathUtils.degToRad(fxrand()*60+15);
  const equator = MathUtils.degToRad(15);

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