import RAPIER from '@dimforge/rapier3d-compat'
import { World as RWorld } from '@dimforge/rapier3d-compat'
import { orbitControls } from './utils/orbitControls'
import { stats } from './utils/stats'
import { Vector3, PMREMGenerator } from "three"
import { Loop } from './system/Loop.js'
import { createRenderer } from './system/renderer.js'
import { createScene } from './components/stage/scene.js'
import { createCamera, createDolly } from './components/stage/camera.js'
import { createLights } from './components/stage/lights.js'
import { VrControls } from './system/VrControls.js'
import { createHandsPhysicsController } from "./system/handsPhysicsController.js"
import { room as roomPhysicsComposition } from './components/bodies/room.js'
import { walls } from './components/meshes/walls.js'
import { colorComposer } from './components/bodies/pendulum/colorComposer.js'
import { RoomEnvironment } from './components/stage/RoomEnv'
import { setPrintTools } from './utils/setPrintTools'
import { ssao as postprocessing } from './components/effects/ssao'
import { materialTester } from './utils/materialTester'
import { lightTester } from './utils/lightTester'
import { Resizer } from './system/Resizer'

import { cuboids } from './components/debris/cuboids';
import { spheres } from './components/debris/spheres';
import { planes } from './components/debris/planes';
import { lines } from './components/debris/lines';
import { bullets } from './components/debris/bullets';


class World {
  constructor() {
    console.log('fxhash:   ', fxhash);

    this.gravity = 0;
    this.dt = 1/120;

    this.xrEnabled = false;
    this.doPostprocessing = true;

    this.colorComposition = colorComposer();
    this.bgColor = this.colorComposition.bg.color;
    this.bgHSL = {};
    this.bgColor.getHSL(this.bgHSL);

    this.renderer = createRenderer(this.doPostprocessing, this.xrEnabled);
    this.scene    = createScene();
    this.camera   = createCamera();
    this.lights   = createLights(this.scene);

    this.stats = stats();
    this.orbitControls = orbitControls(this.camera, this.renderer.domElement);
    this.composer = this.doPostprocessing ? postprocessing(this.camera, this.scene, this.renderer) : null;
    this.loop = new Loop(this.camera, this.scene, this.renderer, this.composer, this.stats, this.orbitControls, this.doPostprocessing, this.gravity, this.dt);

    this.dolly = createDolly(this.camera, this.scene);
    this.vrControls = this.xrEnabled ? new VrControls(this.renderer, this.dolly, this.camera) : null;
    this.xrEnabled ? this.loop.updatableBodies.push(this.vrControls) : null;

    this.floorSize = 300;
    this.printTools = setPrintTools(this.renderer, this.scene, this.camera);

    this.resizer = new Resizer(this.camera, this.renderer);
    this.resizer.onResize = () => {
      this.composer = this.doPostprocessing ? postprocessing(this.camera, this.scene, this.renderer) : null;
      this.loop.updateComposer(this.composer);
    };
    
    RAPIER.init().then(() => {
      this.physicsConfig();
      this.buildScene();
    });
  }

  physicsConfig() {
    const engineGravity = new Vector3(0.0, -this.gravity, 0.0);
    this.physicsWorld = new RWorld(engineGravity);
    this.physicsWorld.timestep = this.dt;
    // this.physicsWorld.integrationParameters.maxCcdSubsteps = 1.2;
    this.loop.setPhysics(this.physicsWorld);
    this.room = roomPhysicsComposition(this.physicsWorld, this.floorSize, false);
    this.handsPhysicsController = this.xrEnabled ? createHandsPhysicsController(this.scene, this.loop, this.physicsWorld, this.vrControls) : null;
  }

  buildScene() {
    const pmremGenerator = new PMREMGenerator(this.renderer);
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.001).texture;

    // this.materialTester      = materialTester(this.scene, envMap);
    // this.lightTester         = lightTester(this.scene, envMap);

    this.buildMainComposition(envMap);
    this.buildDebris(envMap);

    this.walls = walls(this.scene, this.floorSize, this.bgHSL, this.bgColor);
    // this.orbitControls.target = this.pendulum.handleB.mesh.position;
  }

  buildMainComposition(envMap) {
    this.spheresMid = spheres(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 10,
        n: 16,
        sizeRange: 0.1,
        sizeMin: 0.1
      }
    );

    this.spheresSmall = spheres(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 16,
        n: 64,
        sizeRange: 0.03,
        sizeMin: 0.01
      }
    );

    this.sticks = cuboids(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 10,
        n: 256,
        widthRange:  0.12,  widthMin: 0.02,
        heightRange: 0.12, heightMin: 0.02,
        depthRange:  1.6 ,  depthMin: 0.5,
      }
    );

    this.cubesMid = cuboids(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 9,
        n: 16,
        widthRange:  0.4,   widthMin: 0.2,
        heightRange: 0.4,  heightMin: 0.2,
        depthRange:  0.4 ,  depthMin: 0.2,
      }
    );

    this.cubesLarge = cuboids(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 12,
        n: 3,
        widthRange:  0.8,   widthMin: 1.0,
        heightRange: 0.8,  heightMin: 1.0,
        depthRange:  0.8 ,  depthMin: 1.0,
      }
    );

    this.planesLarge = planes(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 14,
        n: 4,
        widthRange:  10,   widthMin: 2,
        heightRange:  8,  heightMin: 1,
      }
    );

    this.planesSmall = planes(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      this.colorComposition,
      {
        spreadWidth: 8,
        n: 6,
        widthRange:  2.4,   widthMin: 0.6,
        heightRange: 3,  heightMin: 1,
      }
    );
    
    this.linesLong = lines(
      this.scene,
      this.loop,
      this.physicsWorld,
      this.colorComposition,
      {
        spreadWidth: 14,
        n: 48,
        lengthRange: 2.4,
        lengthMin: 0.1
      }
    );

    this.linesTiny = lines(
      this.scene,
      this.loop,
      this.physicsWorld,
      this.colorComposition,
      {
        spreadWidth: 14,
        n: 32,
        lengthRange: 0.4,
        lengthMin: 0.01
      }
    );
  }

  buildDebris(envMap) {
    this.debrisSmallBegin = bullets(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      {
        spreadWidth: 12,
        nRange: 40, nMin: 320,
        xRange: 600, xMin: 1800,
        widthRange:  0.04,  widthMin: 0.02,
        heightRange: 0.04, heightMin: 0.02,
        depthRange:  0.04,  depthMin: 0.02,
        impulse: -220,
        isVisible: true
      }
    );

    this.debrisMid = bullets(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      {
        spreadWidth: 12,
        nRange: 20, nMin: 80,
        xRange: 600, xMin: 2200,
        widthRange:  0.1,  widthMin: 0.02,
        heightRange: 0.1, heightMin: 0.02,
        depthRange:  0.1,  depthMin: 0.02,
        impulse: -220,
        isVisible: true
      }
    );

    this.debrisLarge = bullets(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      {
        spreadWidth: 9,
        nRange: 4, nMin: 4,
        xRange: 800, xMin: 2400,
        widthRange:  0,  widthMin: 1.4,
        heightRange: 0, heightMin: 0.6,
        depthRange:  0,  depthMin: 0.4,
        impulse: -220,
        isVisible: true
      }
    );

    this.debrisSmallEnd = bullets(
      this.scene,
      this.loop,
      this.physicsWorld,
      envMap,
      {
        spreadWidth: 12,
        nRange: 20, nMin: 120,
        xRange: 600, xMin: 2600,
        widthRange:  0.04,  widthMin: 0.02,
        heightRange: 0.04, heightMin: 0.02,
        depthRange:  0.04,  depthMin: 0.02,
        impulse: -220,
        isVisible: true
      }
    );
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };