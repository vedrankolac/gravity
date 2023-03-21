import {
  BoxGeometry,
  Mesh,
  Quaternion,
  Euler
} from 'three';
import {
  RigidBodyDesc,
  ColliderDesc,
  ActiveEvents
} from '@dimforge/rapier3d-compat';
import { shiftHandleUVs } from '../../../system/shiftHandleUVs';

const cube = (
    material,
    size,
    translation,
    rotation,
    physicsWorld,
    widthSegments = 1,
    heightSegments = 1,
    depthSegments = 1
  ) => {
  const conf = {
    size: {
      width: size.width,
      height: size.height,
      depth: size.depth
    },
    extremes: {
      maxWidth: 1.8
    }
  }

  const geometry = new BoxGeometry(
    size.width,
    size.height,
    size.depth,
    widthSegments,
    heightSegments,
    depthSegments
  );
  const mesh = new Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  shiftHandleUVs(conf, mesh.geometry.attributes.uv);
  mesh.visible = false;

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.cuboid(size.width / 2, size.height / 2, size.depth / 2);

  physicsWorld.createCollider(collider, rigidBody);

  // rigidBody.tick = (delta) => {
  //   console.log('tick cuboid');
  //   initMovement = true;
  //   const ir = 0.002;
  //   const tir = 0.00002;
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

export { cube };