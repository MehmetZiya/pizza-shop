import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  RESET_CART_STATE,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      )
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      }
    case RESET_CART_STATE:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
