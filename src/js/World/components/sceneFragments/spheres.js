import { sphere } from "../bodies/sphere";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";

const spheres = (
  scene,
  loop,
  physicsWorld,
  envMap,
  bgHSL,
  props
) => {
  const color = (bgHSL.l > 0.5) ? hslToHex(0.6, 0, 0.8) : hslToHex(0.6, 0, 0.04);
  const colorMaterial = defaultColorMattPlastic(color, 1, envMap);
  const spreadWidth = 20;
  const {
    min = 0.02,
    sizeRange = fxrand()/12,
    n = 8,
    y = 3,
    yRange = 6
  } = props;

  for (let i = 0; i < n; i++) {
    const size = {
      radius: sizeRange + min
    }
    const translation = {
      x: fxrand() * spreadWidth - spreadWidth/2,
      y: fxrand() * yRange + y,
      z: fxrand() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: fxrand(),
      y: fxrand(),
      z: fxrand()
    }
    const sphereItem = sphere(colorMaterial, size, translation, rotation, physicsWorld);
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);
  }
}

export { spheres };