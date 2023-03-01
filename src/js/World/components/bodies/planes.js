import { plane } from "./primitives/plane";
import { MathUtils } from 'three';
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";

const planes = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  colorBalance,
  props
) => {
  const {
    spreadWidth,
    n,
    widthRange,  widthMin,
    heightRange, heightMin
  } = props;

  const rndR = () => {
    return fxrand() * 0.85;
  }

  const rndM = () => {
    return fxrand() * 0.75;
  }

  const material_1 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.a.color},
    1
  );

  const material_2 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.b.color},
    1
  );

  const material_3 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.c.color},
    1
  );

  const materials = [material_1, material_2, material_3];

  for (let i = 0; i < n; i++) {
    const mSeed = fxrand();
    let materialIndex = 0;
    if (mSeed > colorBalance.cb1) {
      const miSeed = fxrand();
      if (miSeed < colorBalance.cb2) {
        materialIndex = 1;
      } else {
        materialIndex = 2;
      }
    }
    const material = materials[materialIndex];

    // const randomSeed = fxrand();
    // const materialIndex = Math.round((materials.length - 1) * randomSeed)
    // const material = materials[materialIndex];

    const size = {
      width:  fxrand() * widthRange  +  widthMin,
      height: fxrand() * heightRange + heightMin,
      depth:  0.02
    }
    const translation = {
      x: fxrand() * spreadWidth - spreadWidth/2,
      y: fxrand() * spreadWidth - spreadWidth/2,
      z: fxrand() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: MathUtils.degToRad(fxrand() * 360),
      y: MathUtils.degToRad(fxrand() * 360),
      z: MathUtils.degToRad(fxrand() * 360),
    }
    const planeItem = plane(material, size, translation, rotation, physicsWorld);
    scene.add(planeItem.mesh);
    loop.bodies.push(planeItem);
  }
}

export { planes };