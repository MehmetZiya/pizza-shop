import { NavLink } from 'react-router-dom'
import logo from '../../assets/vp-logo.png'
import { BsFillCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/userActions'

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logoutUser())
  }
  return (
    <nav>
      <div className='menu'>
        <div className='headerLogo'>
          <NavLink to='/'>
            <img src={logo} alt='vp-logo' />
          </NavLink>
          <span className='brand1'>VALENTINO</span>

          <span className='brand2'>PIZZERIA</span>
        </div>
        {!userInfo && <NavLink to='/login'>Login</NavLink>}
      </div>

      <div className='mobilMenu'></div>
    </nav>
  )
}

export default Navbar
