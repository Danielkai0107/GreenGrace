//App.js
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import GreenDeco from './pages/GreenDeco';
import WeddingDeco from './pages/WeddingDeco';
import About from './pages/About';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';


function App() {
  
  return (
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/GreenDeco" element={<GreenDeco/>} />
      <Route path="/WeddingDeco" element={<WeddingDeco/>} />
      <Route path="/About" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
  )
}

export default App
