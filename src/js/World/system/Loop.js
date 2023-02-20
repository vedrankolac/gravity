import { Clock, Quaternion, Vector2 } from 'three';
import { mapNumber } from '../utils/numUtils';

class Loop {
  constructor(camera, scene, renderer, composer = null, stats, orbitControls, doPostprocessing, gravity, dt) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.stats = stats;
    this.orbitControls = orbitControls;
    this.bodies = []
    this.kinematicPositionBasedBodies = []
    this.updatableBodies = [];
    this.clock = new Clock();
    this.physicsWorld = undefined;
    this.composer = composer;
    this.doPostprocessing = doPostprocessing;
    this.runPhysics = true;
    this.gravity = gravity;
    this.dt = dt;
    this.accumulator = 0;
    document.addEventListener('keypress', this.togglePhysicsEngine);
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      if (this.runPhysics) this.tick(); // update physics engine

      this.stats.update();
      this.orbitControls.update();

      if (this.doPostprocessing) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  setPhysics(physicsWorld) {
    this.physicsWorld = physicsWorld;
  }

  togglePhysicsEngine = (e) => {
    if (e.code === 'KeyR') {
      if (this.runPhysics === true) {
        this.runPhysics = false;
      } else {
        this.runPhysics = true;
      }
    }
  }

  updateComposer = (composer) => {
    this.composer = composer;
  }

  updatePhysicsObjects = () => {
    // update motor positions
    for (const object of this.updatableBodies) {
      object.tick(this.dt);
    }
    
    // boundary crossing impulse that kicks body back to the direction of center
    this.bodies.forEach(body => {
      if (body.mesh.name === 'handle') {
        const position = body.rigidBody.translation();
        const b = new Vector2(position.x, position.z);

        if (b.length() > 18) {
          const xI = -position.x/b.length() * 0.1;
          const zI = -position.z/b.length() * 0.1;
          body.rigidBody.applyImpulse({x: xI, y: 0, z: zI}, true);
        }
      }
    });
  }

  tick() {
    const frameTime = this.clock.getDelta();

    if (this.physicsWorld && this.bodies.length > 0) {
      this.accumulator += frameTime;

      // accumulator architecture is implemented according to this article
      // https://gafferongames.com/post/fix_your_timestep/

      while (this.accumulator >= this.dt) {
        // before making step in engine, run all the code that deals with updates to ensure we have a deterministic simulation
        this.updatePhysicsObjects();
        this.physicsWorld.step();
        this.accumulator -= this.dt;
      }

      // now update threejs items
      this.bodies.forEach(body => {
        const position = body.rigidBody.translation();
        const rotation = body.rigidBody.rotation();

        body.mesh.position.x = position.x;
        body.mesh.position.y = position.y;
        body.mesh.position.z = position.z;

        body.mesh.setRotationFromQuaternion(
          new Quaternion(
            rotation.x,
            rotation.y,
            rotation.z,
            rotation.w
          ));
      });

      // no kinematics since we are running a deterministic simulation
      // this.kinematicPositionBasedBodies.forEach(body => {
      //   const position = body.mesh.position;
      //   const rotation = body.mesh.rotation;

      //   const quaternion = new Quaternion();
      //   quaternion.setFromEuler(rotation);

      //   body.rigidBody.setNextKinematicTranslation(position);
      //   body.rigidBody.setNextKinematicRotation(quaternion);
      //   // body.rigidBody.setTranslation(position, true);
      //   // body.rigidBody.setRotation(quaternion, true);
      // });

    }
  }
}

export { Loop };
