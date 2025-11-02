import About from "./components/about"
import Competence from "./components/Competence"
// import Experience from "./components/Experience"
import Home from "./components/Home"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
    <div className="p-5 md:px-[15%]">
      <Navbar/>
      <Home/>
    </div>
    <div>
      <About/>
    </div>

    <div className="p-5 md:px-[15%]">
      {/* <Experience/> */}
      <Competence/>
    </div>
    </>
  )
}
export default App