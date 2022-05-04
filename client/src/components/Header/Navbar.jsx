import { NavLink } from 'react-router-dom'
import logo from '../../assets/vp-logo.png'
const Navbar = () => {
  return (
    <nav>
      <div className='menu'>
        <NavLink to='/'>
          <div className='headerLogo'>
            <img src={logo} alt='vp-logo' />
            <span className='brand1'>VALENTINO</span>
            <span className='brand2'>PIZZERIA</span>
          </div>
        </NavLink>
        <NavLink to='/login'>Login</NavLink>
      </div>

      <div className='mobilMenu'> </div>
    </nav>
  )
}

export default Navbar
