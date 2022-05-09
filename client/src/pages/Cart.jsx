import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { FaHandPointRight } from 'react-icons/fa'
import { GiFullPizza } from 'react-icons/gi'
import { addToCart, deleteFromCart } from '../actions/cartActions'
//import Checkout from '../components/Checkout'
import Message from '../components/Message'
import { Card, ListGroup } from 'react-bootstrap'
import Checkout from '../components/Main/Checkout'

const Cart = () => {
  const cartState = useSelector((state) => state.cart)
  const cartItems = cartState.cartItems
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  const dispatch = useDispatch()

  return (
    <div className='cartPage'>
      <h2>My Cart</h2>
      <hr />
      <div className='cartItems'>
        <div className='cartDetails'>
          {cartItems.length === 0 && (
            <Message variant='danger'>
              Your Cart is empty{' '}
              <Link style={{ color: '#598376', marginLeft: '1rem' }} to='/'>
                <FaHandPointRight
                  style={{ fontSize: '20px', marginRight: '1rem' }}
                />
                Lets order pizza
              </Link>
              <GiFullPizza style={{ fontSize: '20px', marginLeft: '1rem' }} />
            </Message>
          )}
          {cartItems.map((item) => (
            <div className='cartItem' key={item._id}>
              <div className='itemText'>
                <h5>
                  {item.name} [{item.variant}]
                </h5>
                <p>
                  Price: {item.qty} * {item.prices[0][item.variant]} =
                  {item.qty * item.prices[0][item.variant]}
                </p>
                <p>
                  Qty:
                  <AiFillMinusSquare
                    className='minusIcon'
                    onClick={() =>
                      dispatch(addToCart(item, item.qty - 1, item.variant))
                    }
                  />
                  {item.qty}
                  <AiFillPlusSquare
                    className='plusIcon'
                    onClick={() =>
                      dispatch(addToCart(item, item.qty + 1, item.variant))
                    }
                  />
                </p>
              </div>

              <div className='m-1 w-100'>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ height: '80px', width: '80px' }}
                />
              </div>

              <div className='m-1 w-100 '>
                <BsTrashFill
                  className='trashIcon'
                  onClick={() => dispatch(deleteFromCart(item))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='cartCheckout'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
                {subTotal} kr
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-center'>
                <Checkout cartItems={cartItems} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Cart
