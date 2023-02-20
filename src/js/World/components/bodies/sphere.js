import { SphereGeometry, Mesh, Quaternion, Euler } from 'three';
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
  //   const treshold = Math.random();
  //   const impulseRange = 0.01;
  //   if (treshold < 0.02 && ((mesh.position.y - size.radius) < 0.01)) {
  //     rigidBody.applyImpulse({
  //       x: Math.random() * impulseRange - impulseRange/2,
  //       y: Math.random() * impulseRange/2,
  //       z: Math.random() * impulseRange - impulseRange/2
  //     }, true);
  //   }
  // };

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { sphere };