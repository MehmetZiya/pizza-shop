import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

//styles
import './bootstrap.min.css'
import './sass/App.scss'
import Orders from './pages/Orders'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />
            <Route path='/admin/*' element={<AdminPanel />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
