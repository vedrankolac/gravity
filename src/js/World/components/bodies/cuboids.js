import { cube } from "./primitives/cube";
import { MathUtils } from 'three';
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";

const cuboids = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorBalance,
  maps,
  props
) => {

  const {
    distanceMin = 8, distanceRange = 2,
    n,
    widthRange,  widthMin,
    heightRange, heightMin,
    depthRange,  depthMin,
  } = props;

  const rndR = () => {
    return $fx.rand() * 0.95;
  }

  const rndM = () => {
    return $fx.rand() * 0.55;
  }

  const material_1 = canvasTextureMaterial(
    {...maps[0], envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const material_2 = canvasTextureMaterial(
    {...maps[1], envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const material_3 = canvasTextureMaterial(
    {...maps[2], envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const materials = [material_1, material_2, material_3];

  for (let i = 0; i < n; i++) {

    const mSeed = $fx.rand();
    let materialIndex = 0;
    if (mSeed > colorBalance.cb1) {
      const miSeed = $fx.rand();
      if (miSeed < colorBalance.cb2) {
        materialIndex = 1;
      } else {
        materialIndex = 2;
      }
    }
    const material = materials[materialIndex];

    // const randomSeed = $fx.rand();
    // const materialIndex = Math.round((materials.length - 1) * randomSeed)
    // const material = materials[materialIndex];

    const size = {
      width:  $fx.rand() *  widthRange  + widthMin,
      height: $fx.rand() * heightRange + heightMin,
      depth:  $fx.rand() *  depthRange  + depthMin
    }

    const r = $fx.rand() * distanceMin + $fx.rand() * distanceRange;
    const p = MathUtils.degToRad($fx.rand() * 360);
    const g = MathUtils.degToRad($fx.rand() * 360);

    const translation = {
      x: r * Math.sin(p) * Math.cos(g),
      y: r * Math.sin(p) * Math.sin(g),
      z: r * Math.cos(p),
    }

    const rotation = {
      x: MathUtils.degToRad($fx.rand() * 360),
      y: MathUtils.degToRad($fx.rand() * 360),
      z: MathUtils.degToRad($fx.rand() * 360),
    }
    
    const cubeItem = cube(material, size, translation, rotation, physicsWorld);
    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}

export { cuboids };