import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 400 );

  // center distance
  const radius  = $fx.rand() * 26 + 28;
  // const radiusRange = $fx.rand();
  // const inRange = $fx.rand();
  // let radius = 54;

  // if (radiusRange < 0.2) {
  //   radius = inRange * 10 + 20;
  // } else if (radiusRange >= 0.2 && radiusRange < 0.6) {
  //   radius = inRange * 10 + 30;
  // } else if (radiusRange >= 0.6 && radiusRange < 0.8) {
  //   radius = inRange * 10 + 40;
  // } else if (radiusRange >= 0.8 && radiusRange < 0.9) {
  //   radius = inRange * 10 + 50;
  // } else if (radiusRange >= 0.9 && radiusRange <= 1) {
  //   radius = inRange * 10 + 60;
  // }

  // up - down
  const polar   = MathUtils.degToRad($fx.rand() * 20 + 70);

  // left - right
  const angle = MathUtils.degToRad($fx.rand() * 180);
  const side = $fx.rand();
  const equator = (side > 0.5) ? angle : angle * -1;

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