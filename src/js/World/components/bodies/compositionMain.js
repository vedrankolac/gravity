import { cuboids } from './cuboids';
import { spheres } from './spheres';
import { planes } from './planes';
import { lines } from './lines';

export const compositionMain = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition
) => {

  // const colorBalance = {
  //   cb1: fxrand() * 0.3 + 0.3,
  //   cb2: fxrand() * 0.3 + 0.3,
  // }

  const colorBalance = colorComposition.colorBalance;

  const spheresMid = spheres(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 10,
      n: 16,
      sizeRange: 0.1,
      sizeMin: 0.1
    }
  );

  const spheresSmall = spheres(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 18,
      n: 64,
      sizeRange: 0.03,
      sizeMin: 0.01
    }
  );

  const sticks = cuboids(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      distanceMin: 8, distanceRange: 3,
      n: 260,
      widthRange:  0.12,  widthMin: 0.02,
      heightRange: 0.12, heightMin: 0.02,
      depthRange:  1.6 ,  depthMin: 0.5,
    }
  );

  const sticksDistant = cuboids(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      distanceMin: 12, distanceRange: 8,
      n: 16,
      widthRange:  0.12,  widthMin: 0.02,
      heightRange: 0.12, heightMin: 0.02,
      depthRange:  1.6 ,  depthMin: 0.5,
    }
  );

  const cubesMid = cuboids(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      distanceMin: 7, distanceRange: 2,
      n: 16,
      widthRange:  0.4,   widthMin: 0.2,
      heightRange: 0.4,  heightMin: 0.2,
      depthRange:  0.4 ,  depthMin: 0.2,
    }
  );

  const cubesLarge = cuboids(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      distanceMin: 8, distanceRange: 4,
      n: 3,
      widthRange:  0.8,   widthMin: 1.0,
      heightRange: 0.8,  heightMin: 1.0,
      depthRange:  0.8 ,  depthMin: 1.0,
    }
  );

  const planesLarge = planes(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 14,
      n: 4,
      widthRange:  9,   widthMin: 3,
      heightRange:  7,  heightMin: 2,
    }
  );

  const planesSmall = planes(
    scene,
    loop,
    physicsWorld,
    envMap,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 8,
      n: 6,
      widthRange:  2.4,   widthMin: 0.6,
      heightRange: 3,  heightMin: 1,
    }
  );
  
  const linesLong = lines(
    scene,
    loop,
    physicsWorld,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 14,
      n: 48,
      lengthRange: 2.4,
      lengthMin: 0.1
    }
  );

  const linesTiny = lines(
    scene,
    loop,
    physicsWorld,
    colorComposition,
    colorBalance,
    {
      spreadWidth: 14,
      n: 32,
      lengthRange: 0.4,
      lengthMin: 0.01
    }
  );
}