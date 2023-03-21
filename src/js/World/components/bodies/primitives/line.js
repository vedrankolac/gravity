import {
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
  Quaternion,
  Euler,
} from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

export const line = (
  color,
  size,
  translation,
  rotation,
  physicsWorld
) => {
  const colliderWidthDepth = 0.01;

  const material = new LineBasicMaterial({color: color});

  const points = [
    new Vector3(0,  size.length/2, 0),
    new Vector3(0, -size.length/2, 0)
  ];

  const geometry = new BufferGeometry().setFromPoints(points);
  const mesh = new Line(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.visible = false;

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.cuboid(colliderWidthDepth, size.length / 2, colliderWidthDepth);

  physicsWorld.createCollider(collider, rigidBody);

  // rigidBody.tick = (delta) => {
  //   console.log('tick line');
  //   const ir = 0.0004;
  //   const tir = 0.00001;
  //   rigidBody.applyImpulse({
  //     x: $fx.rand() * ir - ir/2,
  //     y: $fx.rand() * ir - ir/2,
  //     z: $fx.rand() * ir - ir/2
  //   }, true);
  //   rigidBody.applyTorqueImpulse({
  //     x: $fx.rand() * tir - tir/2,
  //     y: $fx.rand() * tir - tir/2,
  //     z: $fx.rand() * tir - tir/2
  //   }, true);
  // };

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}