import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { FaHandPointRight } from 'react-icons/fa'
import { placeOrder } from '../actions/orderActions'

import Confetti from 'react-confetti'

const Success = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cartState = useSelector((state) => state.cart)
  const cartItems = cartState.cartItems
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placeOrder(userInfo, cartItems)) // place order  in the database and clear the cart
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
      <div className='links'>
        <Link to='/'>
          <FaHandPointRight style={{ fontSize: '20px', marginRight: '1rem' }} />
          Go Homepage
        </Link>
        <Link to='/orders' style={{ color: '#cc2229' }}>
          <FaHandPointRight style={{ fontSize: '20px', marginRight: '1rem' }} />
          Track your order
        </Link>
      </div>
      <Confetti />
    </div>
  )
}

export default Success
