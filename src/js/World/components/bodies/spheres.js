import { sphere } from "./primitives/sphere";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { MathUtils } from "three";

const spheres = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition,
  props
) => {
  
  const {
    spreadWidth,
    n,
    sizeRange,
    sizeMin
  } = props;

  const colors = [
    colorComposition.a.color,
    colorComposition.b.color,
    colorComposition.c.color
  ];

  for (let i = 0; i < n; i++) {
    const randomSeed = fxrand();
    const colorIndex = Math.round((colors.length - 1) * randomSeed)
    const material = defaultColorMattPlastic(colors[colorIndex], 1, envMap);

    const size = {
      radius: fxrand() * sizeRange + sizeMin
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
    
    const sphereItem = sphere(material, size, translation, rotation, physicsWorld);
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);
  }
}

export { spheres };