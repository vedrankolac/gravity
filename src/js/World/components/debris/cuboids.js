import { cube } from "../bodies/cube";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";
import { MathUtils } from 'three';

const cuboids = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  props
) => {
  const colors = [
    colorComposition.a.color,
    colorComposition.b.color,
    colorComposition.c.color
  ];
  const spreadWidth = 10;

  for (let i = 0; i < 240; i++) {
    const randomSeed = fxrand();
    const colorIndex = Math.round((colors.length - 1) * randomSeed)
    const material = defaultColorMattPlastic(colors[colorIndex], 1, envMap);
    const size = {
      width:  fxrand() * 0.12 + 0.02,
      height: fxrand() * 0.12 + 0.02,
      depth:  fxrand() * 1.2   + 0.6
    }
    const translation = {
      x: fxrand() * spreadWidth - spreadWidth/2,
      y: fxrand() * 10 + 1,
      z: fxrand() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: MathUtils.degToRad(fxrand() * 360),
      y: MathUtils.degToRad(fxrand() * 360),
      z: MathUtils.degToRad(fxrand() * 360),
    }
    const cubeItem = cube(material, size, translation, rotation, physicsWorld);
    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
    loop.updatableBodies.push(cubeItem.rigidBody);
  }
}

export { cuboids };