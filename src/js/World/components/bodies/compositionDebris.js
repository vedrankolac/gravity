import { bullets } from './bullets';

export const compositionDebris = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  largeObjectsNum,
  largeObjectsVel
) => {
  const velocity = largeObjectsVel.value;

  const c = [
    colorComposition.a.color,
    colorComposition.b.color,
    colorComposition.c.color,
  ];
  let ci = 0;

  while (c[ci] === colorComposition.bg.color) {
    ci++;
  }

  const debrisSmallBegin = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    c[ci],
    {
      spreadWidth: 12,
      nRange: 40, nMin: 320,
      xRange: 600, xMin: 1000,
      widthRange:  0.04,  widthMin: 0.02,
      heightRange: 0.04, heightMin: 0.02,
      depthRange:  0.04,  depthMin: 0.02,
      velocity,
      name: 'debris'
    }
  );

  const debrisMid = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    c[ci],
    {
      spreadWidth: 12,
      nRange: 20, nMin: 80,
      xRange: 600, xMin: 1400,
      widthRange:  0.1,  widthMin: 0.02,
      heightRange: 0.1, heightMin: 0.02,
      depthRange:  0.1,  depthMin: 0.02,
      velocity,
      name: 'debris'
    }
  );

  const debrisLarge = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    c[ci],
    {
      spreadWidth: 9,
      nRange: 0, nMin: largeObjectsNum,
      xRange: 800, xMin: 1600,
      widthRange:  0.6,  widthMin: 0.8,
      heightRange: 0.25, heightMin: 0.25,
      depthRange:  0.25,  depthMin: 0.25,
      velocity,
      name: 'debris'
    }
  );

  const debrisSmallEnd = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    c[ci],
    {
      spreadWidth: 12,
      nRange: 20, nMin: 120,
      xRange: 600, xMin: 1800,
      widthRange:  0.04,  widthMin: 0.02,
      heightRange: 0.04, heightMin: 0.02,
      depthRange:  0.04,  depthMin: 0.02,
      velocity,
      name: 'debris'
    }
  );
}