import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PickLocation from './components/PickLocation'

function App() {

  return (
    <div className="App">
      <h1 className='Title'>Choose your location!</h1>
      <PickLocation />
    </div>
  )
}

export default App
