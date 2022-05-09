import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { FaHandPointRight } from 'react-icons/fa'
import { placeOrder } from '../actions/orderActions'

const Success = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cartState = useSelector((state) => state.cart)
  const cartItems = cartState.cartItems
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placeOrder(userInfo, cartItems)) // place order
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(resetCart())
  }, [dispatch])
  return (
    <div className='container success'>
      <Message variant='success'>
        <h2>Thank you for your order </h2>
      </Message>
      <p>We have successfully received your payment</p>
      <Link style={{ color: 'green', marginLeft: '1rem' }} to='/'>
        <FaHandPointRight style={{ fontSize: '20px', marginRight: '1rem' }} />
        Go Homepage
      </Link>
    </div>
  )
}

export default Success
