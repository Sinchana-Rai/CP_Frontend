
import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/ContactUs'
import Footer from './components/Footer'
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
// import Reviews from "./components/Reviews"     // Page under construction


function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/login" element={<Login />} /> 
        {/* <Route path="/reviews" element={<Reviews />} /> ( Page under construction ) */}
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
      <Footer />

    </>
  )
}

export default App

