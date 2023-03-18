// WithHooks.tsx
import React, { useEffect, useState, useRef } from 'react'
import {
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
  StandardMaterial,
  Texture,
  Color3,
  CubeTexture
} from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook'
import useAppStore from '../zustand/appStore';
import '../styles/babylonjs.scss';

const Cube = () => {
  const imgData = useAppStore((state) => state.mapImg);
  const sceneRef = useRef(null);
  let box;
  useEffect(() => {
    if (imgData) {
      createBox(box, sceneRef.current);
    }
  }, [imgData])



  const [show, setShow] = useState(false);

  const createBox = (box, scene) => {
    box = MeshBuilder.CreateBox('box', { size: 3 }, scene)

    // Move the box upward 1/2 its height
    box.position.y = 1
    var mat = new StandardMaterial("dog", scene);
    mat.emissiveTexture = new Texture(imgData, scene);
    mat.backFaceCulling = false;

    box.material = mat;
  }
  const onSceneReady = (scene) => {
    sceneRef.current = scene;
    // This creates and positions a free camera (non-mesh)
    var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 50, Vector3.Zero(), scene)

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero())
    const engine = scene.getEngine();
    const canvas = scene.getEngine().getRenderingCanvas();


    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 8;


    // Our built-in 'box' shape.
    createBox(box, scene);
  }

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined && box) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime()

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  }

  return (<>
    {imgData && <SceneComponent on antialias onSceneReady={onSceneReady} onRender={onRender} id={'babylonjs-canvas'} />}
  </>)
}

export default Cube;
