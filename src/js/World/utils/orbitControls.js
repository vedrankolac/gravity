import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const orbitControls = (camera, domElement) => {
  const oc = new OrbitControls(camera, domElement);
  // oc.maxPolarAngle = Math.PI/2 - Math.PI/32;
  // oc.minPolarAngle = Math.PI/32;
  oc.maxDistance = 90;
  oc.minDistance = 3;
  oc.dampingFactor = 100;
  oc.autoRotate = true;
  oc.autoRotateSpeed = 0.2;
  oc.enablePan = false;
  return oc;
}

export { orbitControls }