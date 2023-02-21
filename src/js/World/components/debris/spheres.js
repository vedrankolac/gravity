import { sphere } from "../bodies/sphere";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";

const spheres = (
  scene,
  loop,
  physicsWorld,
  envMap,
  colorComposition
) => {
  const colors = [
    colorComposition.a.color,
    colorComposition.b.color,
    colorComposition.c.color
  ];
  const spreadWidth = 10;

  for (let i = 0; i < 64; i++) {
    const randomSeed = fxrand();
    const colorIndex = Math.round((colors.length - 1) * randomSeed)
    const material = defaultColorMattPlastic(colors[colorIndex], 1, envMap);

    const size = {
      radius: fxrand()/9 + 0.02
    }
    const translation = {
      x: fxrand() * spreadWidth - spreadWidth/2,
      y: fxrand() * spreadWidth - spreadWidth/2,
      z: fxrand() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: fxrand(),
      y: fxrand(),
      z: fxrand()
    }
    const sphereItem = sphere(material, size, translation, rotation, physicsWorld);
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);
  }
}

export { spheres };