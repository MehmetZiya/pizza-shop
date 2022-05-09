import React from 'react'
import { FaHandPointRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Message from '../components/Message'

const Cancel = () => {
  return (
    <div className='container cancel'>
      <Message variant='danger'>
        <h2>Your order has been cancelling</h2>
      </Message>
      <p>You can visit your cart</p>
      <div className='links'>
        <Link to='/cart'>
          <FaHandPointRight style={{ fontSize: '20px', marginRight: '1rem' }} />
          Go Cart
        </Link>
      </div>
    </div>
  )
}

export default Cancel
