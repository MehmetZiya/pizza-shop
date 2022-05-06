import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart'

//styles
import './bootstrap.min.css'
import './sass/App.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin/*' element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
