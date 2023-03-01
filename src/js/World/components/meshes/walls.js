import { SphereGeometry, Mesh, MeshStandardMaterial, DoubleSide } from 'three';

const walls = (scene, size, color) => {
  const plastic = {
    roughness: 1,
    metalness: 0,
    n: 'plastic'
  }

  const materialDome = new MeshStandardMaterial({
    color,
    // map: maps.colorMap,
    // normalMap: maps.normalMap,
    // envMapIntensity: 100,
    side: DoubleSide,
    roughness: plastic.roughness,
    metalness: plastic.metalness,
  });

  const geometryDome = new SphereGeometry(size/2, 64, 64);
  const dome = new Mesh(geometryDome, materialDome);
  scene.add(dome);
}

export { walls };