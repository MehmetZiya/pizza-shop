import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  RESET_CART_STATE,
} from '../constants/cartConstants'

export const addToCart = (pizza, qty, variant) => (dispatch, getState) => {
  let cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    variant,
    qty: Number(qty),
    prices: pizza.prices,
    price: pizza.prices[0][variant] * qty,
  }
  if (cartItem.qty > 10) {
    alert('Maximum 10 pizzas can be added to cart')
  } else {
    if (cartItem.qty === 0) {
      dispatch({ type: CART_DELETE_ITEM, payload: pizza })
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      )
    } else {
      dispatch({ type: CART_ADD_ITEM, payload: cartItem })
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      )
    }
  }
}

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: CART_DELETE_ITEM, payload: pizza })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const resetCart = () => (dispatch) => {
  dispatch({ type: RESET_CART_STATE })
  localStorage.setItem('cartItems', JSON.stringify([]))
}
