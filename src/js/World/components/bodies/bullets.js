import { bullet } from "./primitives/bullet";
import { MathUtils } from "three";
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";

export const bullets = (
  scene,
  loop,
  physicsWorld,
  envMap,
  color,
  props
) => {

  const {
    spreadWidth,
    nRange, nMin,
    xRange, xMin,
    widthRange,  widthMin,
    heightRange, heightMin,
    depthRange,  depthMin,
    velocity,
    name
  } = props;

  const bulletNum = Math.round(nRange * $fx.rand()) + nMin;
  // if (name === 'large-bullet') {
  //   console.log('bulletNum:', bulletNum); 
  // }

  const rndR = () => {
    return $fx.rand() * 0.85;
  }

  const rndM = () => {
    return $fx.rand() * 0.25;
  }

  const material_1 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: color},
    1
  );

  const material_2 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: color},
    1
  );

  const material_3 = canvasTextureMaterial(
    {envMap},
    {roughness: rndR(), metalness: rndM(), color: color},
    1
  );

  const materials = [material_1, material_2, material_3];

  for (let i = 0; i < bulletNum; i++) {
    const randomSeed = $fx.rand();
    const materialIndex = Math.round((materials.length - 1) * randomSeed)
    const material = materials[materialIndex];

    const size = {
      width:  $fx.rand() *  widthRange  + widthMin,
      height: $fx.rand() * heightRange + heightMin,
      depth:  $fx.rand() *  depthRange  + depthMin
    }

    const translation = {
      x: $fx.rand() * xRange + xMin,
      y: $fx.rand() * spreadWidth - spreadWidth/2,
      z: $fx.rand() * spreadWidth - spreadWidth/2
    }

    const rotation = {
      x: MathUtils.degToRad($fx.rand() * 360),
      y: MathUtils.degToRad($fx.rand() * 360),
      z: MathUtils.degToRad($fx.rand() * 360),
    }
    const cubeItem = bullet(material, size, translation, rotation, name, physicsWorld);

    cubeItem.rigidBody.tick = (delta) => {
      // console.log('tick bullet');

      // cubeItem.rigidBody.applyImpulse({
      //   x: impulse,
      //   y: 0,
      //   z: 0
      // }, true);

      cubeItem.rigidBody.setLinvel({
        x: velocity,
        y: 0,
        z: 0
      }, true);
    };

    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}