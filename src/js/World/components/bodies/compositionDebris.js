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
      isVisible: true,
      name: ''
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
      isVisible: true,
      name: ''
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
      widthRange:  0.4,  widthMin: 0.8,
      heightRange: 0.2, heightMin: 0.25,
      depthRange:  0.2,  depthMin: 0.25,
      impulse: -220,
      isVisible: true,
      name: 'large-bullet'
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
      isVisible: true,
      name: ''
    }
  );
}