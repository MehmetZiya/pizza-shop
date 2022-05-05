import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../actions/userActions'
import logo from '../assets/vp-logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <div className='loginPage'>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <img src={logo} alt='logo' />
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email address'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          required
        />
        <button className='btn' type='submit'>
          LOGGA IN
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  )
}

export default Login
