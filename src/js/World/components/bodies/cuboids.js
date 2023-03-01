import { cube } from "./primitives/cube";
import { MathUtils } from 'three';
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";
import { RndNoiseTresholdNormal } from "../canvasMaps/RndNoiseMaps";

const cuboids = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  props
) => {

  const {
    distanceMin = 8, distanceRange = 2,
    n,
    widthRange,  widthMin,
    heightRange, heightMin,
    depthRange,  depthMin,
  } = props;

  const maps_1 = new RndNoiseTresholdNormal(colorComposition.a.color, fxrand()*0.25, fxrand()*0.55);
  const maps_2 = new RndNoiseTresholdNormal(colorComposition.b.color, fxrand()*0.25, fxrand()*0.55);
  const maps_3 = new RndNoiseTresholdNormal(colorComposition.c.color, fxrand()*0.25, fxrand()*0.55);

  const rndR = () => {
    return fxrand() * 0.95;
  }

  const rndM = () => {
    return fxrand() * 0.55;
  }

  const material_1 = canvasTextureMaterial(
    {...maps_1, envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const material_2 = canvasTextureMaterial(
    {...maps_2, envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const material_3 = canvasTextureMaterial(
    {...maps_3, envMap},
    {roughness: rndR(), metalness: rndM()},
    1
  );

  const materials = [material_1, material_2, material_3];

  for (let i = 0; i < n; i++) {
    const randomSeed = fxrand();
    const materialIndex = Math.round((materials.length - 1) * randomSeed)
    const material = materials[materialIndex];

    const size = {
      width:  fxrand() *  widthRange  + widthMin,
      height: fxrand() * heightRange + heightMin,
      depth:  fxrand() *  depthRange  + depthMin
    }

    const r = fxrand() * distanceMin + fxrand() * distanceRange;
    const p = MathUtils.degToRad(fxrand() * 360);
    const g = MathUtils.degToRad(fxrand() * 360);

    const translation = {
      x: r * Math.sin(p) * Math.cos(g),
      y: r * Math.sin(p) * Math.sin(g),
      z: r * Math.cos(p),
    }

    const rotation = {
      x: MathUtils.degToRad(fxrand() * 360),
      y: MathUtils.degToRad(fxrand() * 360),
      z: MathUtils.degToRad(fxrand() * 360),
    }
    
    const cubeItem = cube(material, size, translation, rotation, physicsWorld);
    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}

export { cuboids };