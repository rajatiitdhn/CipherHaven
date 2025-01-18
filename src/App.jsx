import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Scanner from "./components/Scanner"
import MITMLab from "./components/MITM"
import Visualize from "./components/visualize"
import Game from "./components/new_component/Game"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/visualize" element={<Visualize />} />
      <Route path="/mitm" element={<MITMLab/>} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
