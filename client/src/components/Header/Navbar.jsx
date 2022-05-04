import { NavLink } from 'react-router-dom'
import logo from '../../assets/vp-logo.png'
const Navbar = () => {
  return (
    <nav>
      <NavLink to='/'>
        <div className='headerLogo'>
          <img src={logo} alt='vp-logo' />
          <span className='brand1'>VALENTINO</span>
          <span className='brand2'>PIZZERIA</span>
        </div>
      </NavLink>
    </nav>
  )
}

export default Navbar
