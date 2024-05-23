import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/product_details/:id' element={<ProductDetailsPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App