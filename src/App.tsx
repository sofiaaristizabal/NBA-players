import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ConexionAPI } from './components/conexionAPI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ConexionAPI/>
    </>
  )
}

export default App
