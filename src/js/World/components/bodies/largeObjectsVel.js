export const largeObjectsVel = rndSeed => {
  let velocity = 0;

  if (rndSeed < 0.75) {
    velocity = {
      value: -220,
      name: '1/3'
    };
  } else if (rndSeed >= 0.75 && rndSeed < 0.92) {
    velocity = {
      value: -260,
      name: '2/3'
    };
  } else if (rndSeed >= 0.92 && rndSeed < 1.0) {
    velocity = {
      value: -300,
      name: '3/3'
    };
  }

  return velocity;
}