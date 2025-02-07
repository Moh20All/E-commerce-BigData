import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage'
import ShopPage from './pages/ShopPage'
import ProductDisplay from './pages/ProductDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Register" element={<RegisterPage/>} />
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/products/:id" element={<ProductDisplay/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
