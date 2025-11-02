// import { useState } from 'react'

import Home from "./components/Home"
import Navbar from "./components/Navbar"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className="p-5 md:px-[15%]">
      <Navbar/>
      <Home/>
    </div>
    </>
  )
}
export default App