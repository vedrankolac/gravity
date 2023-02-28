import { bullets } from './bullets';

export const compositionDebris = (
  scene,
  loop,
  physicsWorld,
  envMap
) => {
  const debrisSmallBegin = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    {
      spreadWidth: 12,
      nRange: 40, nMin: 320,
      xRange: 600, xMin: 1800,
      widthRange:  0.04,  widthMin: 0.02,
      heightRange: 0.04, heightMin: 0.02,
      depthRange:  0.04,  depthMin: 0.02,
      impulse: -220,
      isVisible: true
    }
  );

  const debrisMid = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    {
      spreadWidth: 12,
      nRange: 20, nMin: 80,
      xRange: 600, xMin: 2200,
      widthRange:  0.1,  widthMin: 0.02,
      heightRange: 0.1, heightMin: 0.02,
      depthRange:  0.1,  depthMin: 0.02,
      impulse: -220,
      isVisible: true
    }
  );

  const debrisLarge = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    {
      spreadWidth: 9,
      nRange: 4, nMin: 4,
      xRange: 800, xMin: 2400,
      widthRange:  0,  widthMin: 1.4,
      heightRange: 0, heightMin: 0.6,
      depthRange:  0,  depthMin: 0.4,
      impulse: -220,
      isVisible: true
    }
  );

  const debrisSmallEnd = bullets(
    scene,
    loop,
    physicsWorld,
    envMap,
    {
      spreadWidth: 12,
      nRange: 20, nMin: 120,
      xRange: 600, xMin: 2600,
      widthRange:  0.04,  widthMin: 0.02,
      heightRange: 0.04, heightMin: 0.02,
      depthRange:  0.04,  depthMin: 0.02,
      impulse: -220,
      isVisible: true
    }
  );
}