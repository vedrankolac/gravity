import { Clock, LoadingManager, Quaternion, Vector2 } from 'three';
import { EventQueue } from '@dimforge/rapier3d-compat';

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
    this.stepCounter = 0;
    this.allBodiesVisible = false;
    this.collideTimer = 0;
    this.packed = false;
    document.addEventListener('keypress', this.togglePhysicsEngine);
    document.addEventListener('visibilitychange', e => this.handleVisibilityChange(e));

  }

  start() {
    this.renderer.setAnimationLoop(() => {
      if (this.runPhysics) this.tick(); // update physics engine

      if ( this.stats !== undefined) {
        this.stats.update(); 
      }

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
        this.clock.stop();
        this.runPhysics = false;
        this.orbitControls.autoRotate = false;
      } else {
        this.clock.start();
        this.runPhysics = true;
        this.orbitControls.autoRotate = true;
      }
    }
  }

  handleVisibilityChange(e) {
    if (document.visibilityState === 'hidden') {
      this.clock.stop();
      this.stop();
    } else {
      this.clock.start();
      this.start();
    }
  }

  updateComposer = (composer) => {
    this.composer = composer;
  }

  prepareForCapture = () => {
    if (this.doPostprocessing) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  saveAsPng = () => {
    console.log('downloading...', this.stepCounter);

    const imgData = this.renderer.domElement.toDataURL();
    var img = new Image();
    img.src = imgData;

    const link = document.createElement('a');
    link.download = 'crash_' + fxhash + '.png';
    link.href = imgData;
    link.click();
    link.delete;
  }

  updatePhysicsObjects = () => {
    // update updatables if there are some
    // for (const object of this.updatableBodies) {
    //   object.tick(this.dt);
    // }

    if (!this.packed && this.stepCounter > 0) {
      let p_l = true;
      this.bodies.forEach(body => {
        // console.log(body.mesh.name);
        if (body.mesh.name !== 'debris') {
          const c = (
             body.rigidBody.linvel().x < 0.4
          && body.rigidBody.linvel().y < 0.4
          && body.rigidBody.linvel().z < 0.4
          && body.rigidBody.angvel().x < 0.4
          && body.rigidBody.angvel().y < 0.4
          && body.rigidBody.angvel().z < 0.4
        );
        if (!c) {
          p_l = false;
        }
        body.rigidBody.resetForces(true);  // Reset the forces to zero.
        body.rigidBody.resetTorques(true); // Reset the torques to zero.
        body.rigidBody.setLinvel({x: 0, y: 0, z: 0}, true);
        body.rigidBody.setAngvel({x: 0, y: 0, z: 0}, true); 
        }
      });
      this.packed = p_l;
      // console.log('stop', this.bodies.length, this.stepCounter, this.packed);
    } else if (this.packed && !this.allBodiesVisible) {
      this.bodies.forEach(body => {
        body.mesh.visible = true;
      });

      const preloader = document.getElementById("preloader");
      preloader.style.display = "none";
      preloader?.remove();

      // this.prepareForCapture();
      // this.saveAsPng();
      // location.reload();
      $fx.preview();

      this.allBodiesVisible = true;
    };


    if (this.stepCounter === 20) {
      // console.log('shoot particles', this.stepCounter);
      this.bodies.forEach(body => {
        if (body.rigidBody.tick != undefined) {
          body.rigidBody.tick();
        }
      });
    }

    // if (this.stepCounter === 180) {
    //   this.prepareForCapture();
    //   this.saveAsPng();
    // }

    // safe trigger -- if structure is not stopped until frame 220, show it anyway
    if (this.stepCounter < 220) {
      ++ this.stepCounter;
    } else {
      this.packed = true;
    }
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

        // let eventQueue = new EventQueue(true);
        this.physicsWorld.step();
        // eventQueue.drainCollisionEvents((handle1, handle2, started) => {
        //   console.log('+++ ', handle1, handle2, started);
        // });

        this.accumulator -= this.dt;
      }

      // now update threejs items
      this.bodies.forEach(body => {
        if (body.rigidBody) {
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

          // if (body.collider.intname === 'large-bullet') {
          //   // console.log('large-bullet', body.collider);
          //   this.physicsWorld.contactsWith(body.collider, (otherCollider) => {
          //     console.log('+ ', otherCollider);
          //   });
          // }

          // this.physicsWorld.contactsWith(body.collider, (otherCollider) => {
          //   console.log('+ ', otherCollider);
          // });
          
          // if (position.x < -20 && body.mesh.name === 'bullet') {
          //   this.physicsWorld.removeRigidBody(body.rigidBody);
          //   body.mesh.visible = false;
          //   body.rigidBody = null;
          // }
        }
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
