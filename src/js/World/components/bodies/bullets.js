import { bullet } from "./primitives/bullet";
import { MathUtils } from "three";
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";

export const bullets = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  props
) => {

  const {
    spreadWidth,
    nRange, nMin,
    xRange, xMin,
    widthRange,  widthMin,
    heightRange, heightMin,
    depthRange,  depthMin,
    impulse,
    isVisible,
    name
  } = props;

  const bulletNum = Math.round(nRange * fxrand()) + nMin;
  console.log('bulletNum:', bulletNum);

  const rndR = () => {
    return fxrand() * 0.85;
  }

  const rndM = () => {
    return fxrand() * 0.25;
  }

  const material_1 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.b.color},
    1
  );

  const material_2 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.b.color},
    1
  );

  const material_3 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: colorComposition.b.color},
    1
  );

  const materials = [material_1, material_2, material_3];

  for (let i = 0; i < bulletNum; i++) {
    const randomSeed = fxrand();
    const materialIndex = Math.round((materials.length - 1) * randomSeed)
    const material = materials[materialIndex];

    const size = {
      width:  fxrand() *  widthRange  + widthMin,
      height: fxrand() * heightRange + heightMin,
      depth:  fxrand() *  depthRange  + depthMin
    }

    const translation = {
      x: fxrand() * xRange + xMin,
      y: fxrand() * spreadWidth - spreadWidth/2,
      z: fxrand() * spreadWidth - spreadWidth/2
    }

    const rotation = {
      x: MathUtils.degToRad(fxrand() * 360),
      y: MathUtils.degToRad(fxrand() * 360),
      z: MathUtils.degToRad(fxrand() * 360),
    }
    const cubeItem = bullet(material, size, translation, rotation, isVisible, name, physicsWorld);

    cubeItem.rigidBody.tick = (delta) => {
      // console.log('tick bullet');

      // cubeItem.rigidBody.applyImpulse({
      //   x: impulse,
      //   y: 0,
      //   z: 0
      // }, true);

      cubeItem.rigidBody.setLinvel({
        x: impulse,
        y: 0,
        z: 0
      }, true);
    };

    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}