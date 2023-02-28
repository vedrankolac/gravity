import {
  SphereGeometry,
  Mesh,
  Quaternion,
  Euler
} from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const sphere = (
    material,
    size,
    translation,
    rotation,
    physicsWorld
  ) => {
  const geometry = new SphereGeometry(size.radius, 64, 64);
  const mesh = new Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.ball(size.radius)
    .setRestitution(0.9);

  physicsWorld.createCollider(collider, rigidBody);

  // rigidBody.tick = (delta) => {
  //   console.log('tick sphere');
  //   const ir = 0.0004;
  //   const tir = 0.00001;
  //   rigidBody.applyImpulse({
  //     x: fxrand() * ir - ir/2,
  //     y: fxrand() * ir - ir/2,
  //     z: fxrand() * ir - ir/2
  //   }, true);
  //   rigidBody.applyTorqueImpulse({
  //     x: fxrand() * tir - tir/2,
  //     y: fxrand() * tir - tir/2,
  //     z: fxrand() * tir - tir/2
  //   }, true);
  // };

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { sphere };