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

    const mSeed = $fx.rand();
    let colorIndex = 0;
    if (mSeed > colorBalance.cb1) {
      const miSeed = $fx.rand();
      if (miSeed < colorBalance.cb2) {
        colorIndex = 1;
      } else {
        colorIndex = 2;
      }
    }

    // const randomSeed = $fx.rand();
    // const colorIndex = Math.round((colors.length - 1) * randomSeed);

    const size = {
      length: $fx.rand() * lengthRange + lengthMin
    }
    const translation = {
      x: $fx.rand() * spreadWidth - spreadWidth/2,
      y: $fx.rand() * spreadWidth - spreadWidth/2,
      z: $fx.rand() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: MathUtils.degToRad($fx.rand() * 360),
      y: MathUtils.degToRad($fx.rand() * 360),
      z: MathUtils.degToRad($fx.rand() * 360),
    }
    const lineItem = line(colors[colorIndex], size, translation, rotation, physicsWorld);
    scene.add(lineItem.mesh);
    loop.bodies.push(lineItem);
  }
}