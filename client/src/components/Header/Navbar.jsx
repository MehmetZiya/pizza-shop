import { NavLink } from 'react-router-dom'
import logo from '../../assets/vp-logo.png'
const Navbar = () => {
  return (
    <nav>
      <div className='menu'>
        <div className='headerLogo'>
          <NavLink to='/'>
            <img src={logo} alt='vp-logo' />
          </NavLink>
          <span className='brand1'>VALENTINO</span>
          <br />
          <span className='brand2'>PIZZERIA</span>
        </div>

        <NavLink to='/login'>Login</NavLink>
      </div>

      <div className='mobilMenu'> </div>
    </nav>
  )
}

export default Navbar
