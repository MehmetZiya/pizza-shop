import { useState } from 'react'
import ModalDetails from '../ModalDetails'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../actions/cartActions'

const PizzaCard = ({ pizza }) => {
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState('Normal')
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart(pizza, qty, variant))
  }
  return (
    <div className='pizzaCard'>
      <div className='pizzaImg' onClick={() => setModalShow(true)}>
        <h3>{pizza.name}</h3>
        <img src={pizza.image} alt={pizza.name} />
      </div>
      <div className='pizzaSelection'>
        <div className='pizzaStorlek'>
          <h5>Storlek</h5>
          <select
            name='variant'
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value)
            }}
          >
            {pizza.variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
        <div className='pizzaQuantity'>
          <h5>styck</h5>
          <select
            value={qty}
            onChange={(e) => {
              setQty(e.target.value)
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <div className='flex-container mt-1'>
        <div className='mt-2 w-100'>
          <h3>Price :{pizza.prices[0][variant] * qty} kr</h3>
        </div>
        <div className='btngroup'>
          <button className='btn btn-danger' onClick={addToCartHandler}>
            ADD TO CART
          </button>
        </div>
      </div>
      <ModalDetails
        show={modalShow}
        pizza={pizza}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default PizzaCard
