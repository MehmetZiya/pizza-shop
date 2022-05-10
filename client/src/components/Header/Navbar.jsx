import logo from '../../assets/vp-logo.png'
import { BsFillCartFill } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

const Navbars = () => {
  const cartState = useSelector((state) => state.cart)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = () => {
    navigate('/')
    dispatch(logoutUser())
  }
  return (
    <Navbar expand='md' collapseOnSelect className='p-2 navBar'>
      <LinkContainer to='/'>
        <Navbar.Brand className='brand'>
          <img src={logo} alt='logo' />
          <div className='brandName'>
            <span style={{ color: '#598376' }}>Valentino</span>
            <span>Pizzeria</span>
          </div>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto align-items-center'>
          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id='username'
              className='userName'
            >
              <LinkContainer to='/orders'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              {userInfo.isAdmin && (
                <LinkContainer to='/admin'>
                  <NavDropdown.Item>Admin</NavDropdown.Item>
                </LinkContainer>
              )}
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login' className='navLink'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer to='/cart'>
            <Nav.Link>
              <BsFillCartFill className='cartIcon' />
              {cartState.cartItems.length > 0 && (
                <span className='cartItemLength'>
                  {cartState.cartItems.length}
                </span>
              )}
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navbars
