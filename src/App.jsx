import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PickLocation from './components/PickLocation'
import { Toaster } from 'react-hot-toast'
import Cube from './components/SceneComponent'
import { Engine } from 'react-babylonjs'

function App() {

  return (
    <div className="App">
      <h1 className='title'>Choose your location!</h1>
      <PickLocation />

      <Cube />
      <Toaster />
    </div>
  )
}

export default App
