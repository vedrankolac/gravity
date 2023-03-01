import { line } from "./primitives/line";
import { MathUtils } from "three";

export const lines = (
  scene,
  loop,
  physicsWorld,
  colorComposition,
  colorBalance,
  props
) => {
  const {
    spreadWidth,
    n,
    lengthRange,
    lengthMin
  } = props;

  const colors = [
    colorComposition.a.color,
    colorComposition.b.color,
    colorComposition.c.color
  ];

  for (let i = 0; i < n; i++) {

    const mSeed = fxrand();
    let colorIndex = 0;
    if (mSeed > colorBalance.cb1) {
      const miSeed = fxrand();
      if (miSeed < colorBalance.cb2) {
        colorIndex = 1;
      } else {
        colorIndex = 2;
      }
    }

    // const randomSeed = fxrand();
    // const colorIndex = Math.round((colors.length - 1) * randomSeed);

    const size = {
      length: fxrand() * lengthRange + lengthMin
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
    const lineItem = line(colors[colorIndex], size, translation, rotation, physicsWorld);
    scene.add(lineItem.mesh);
    loop.bodies.push(lineItem);
  }
}