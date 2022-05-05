import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import logo from '../assets/vp-logo.png'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [navigate, userInfo])

  const handleRegister = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setTimeout(() => {
        setMessage('Passwords do not match')
      }, 3000)
      setMessage(null)
    } else {
      dispatch(registerUser(name, email, password))
      setSuccessMessage('Registration successful')
    }
  }

  return (
    <div className='loginPage'>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <img src={logo} alt='logo' />
      {success && <Message variant='success'>{successMessage}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button className='btn' type='submit'>
          REGISTER
        </button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  )
}

export default Register
