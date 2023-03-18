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
import { toast } from 'react-hot-toast';

const Cube = () => {
  const imgData = useAppStore((state) => state.mapImg);
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);

  let box;
  useEffect(() => {
    if (imgData) {
      createBox(box, sceneRef.current);
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [imgData])



  const [show, setShow] = useState(false);

  const createBox = (box, scene) => {
    box = MeshBuilder.CreateBox('box', { size: 3 }, scene)
    var mat = new StandardMaterial("dog", scene);
    mat.emissiveTexture = new Texture(imgData, scene);
    mat.backFaceCulling = false;

    box.material = mat;
  }
  const onSceneReady = (scene) => {
    toast('Feel free to play around with the Cube', {
      id: "cube-created"
    });

    sceneRef.current = scene;
    var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 50, Vector3.Zero(), scene)

    camera.setTarget(Vector3.Zero())
    const engine = scene.getEngine();
    const canvas = scene.getEngine().getRenderingCanvas();


    camera.attachControl(canvas, true)
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 8;


    // creates the box shape
    createBox(box, scene);
  }

  /**
   * Will run on every frame render.
   */
  const onRender = (scene) => {

    if (box !== undefined && box) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime()

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  }

  return (<section ref={canvasRef} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
    {imgData && <SceneComponent adaptToDeviceRatio antialias onSceneReady={onSceneReady} onRender={onRender} id={'babylonjs-canvas'} />}
  </section>)
}

export default Cube;
