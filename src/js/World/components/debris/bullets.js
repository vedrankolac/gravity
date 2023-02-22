import { bullet } from "../bodies/bullet";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { MathUtils } from "three";
import { hslToHex } from "../../utils/colorUtils";

export const bullets = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition
) => {

  const spreadWidth = 9;
  const bulletNum = Math.round(6 * fxrand()) + 4;
  console.log('bulletNum:', bulletNum);

  for (let i = 0; i < bulletNum; i++) {
    const color = hslToHex(0, 0, 0.04);
    const material = defaultColorMattPlastic(color, 1, envMap);

    const size = {
      width:  1.4,
      height: 0.6,
      depth:  0.4
    }

    const translation = {
      x: fxrand() * 900 + 1200,
      y: fxrand() * spreadWidth - spreadWidth/2,
      z: fxrand() * spreadWidth - spreadWidth/2
    }

    const rotation = {
      x: MathUtils.degToRad(fxrand() * 360),
      y: MathUtils.degToRad(fxrand() * 360),
      z: MathUtils.degToRad(fxrand() * 360),
    }
    const cubeItem = bullet(material, size, translation, rotation, physicsWorld);

    cubeItem.rigidBody.tick = (delta) => {
      // console.log('tick bullet');
      cubeItem.rigidBody.applyImpulse({
        x: -80,
        y: 0,
        z: 0
      }, true);
    };

    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}