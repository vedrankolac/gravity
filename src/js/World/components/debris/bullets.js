import { bullet } from "../bodies/bullet";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { MathUtils } from "three";
import { hslToHex } from "../../utils/colorUtils";

export const bullets = (
  scene,
  loop,
  physicsWorld,
  envMap,
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
    isVisible
  } = props;

  const bulletNum = Math.round(nRange * fxrand()) + nMin;
  console.log('bulletNum:', bulletNum);

  for (let i = 0; i < bulletNum; i++) {
    const color = hslToHex(0, 0, 0.04);
    const material = defaultColorMattPlastic(color, 1, envMap);

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
    const cubeItem = bullet(material, size, translation, rotation, isVisible, physicsWorld);

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