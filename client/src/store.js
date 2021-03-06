import { configureStore } from '@reduxjs/toolkit'

import {
  addPizzaReducer,
  pizzaListReducer,
  getPizzaByIDReducer,
  editPizzaReducer,
  deletePizzaReducer,
} from './reducers/pizzaReducers'
import {
  getAllUsersReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  getAllOrdersReducer,
  getUserOrdersReducer,
  placeOrderReducer,
} from './reducers/orderReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
}

export default configureStore({
  reducer: {
    pizzaList: pizzaListReducer,
    addPizza: addPizzaReducer,
    getPizzaByID: getPizzaByIDReducer,
    editPizza: editPizzaReducer,
    deletePizza: deletePizzaReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    getAllUsersState: getAllUsersReducer,
    cart: cartReducer,
    getUserOrders: getUserOrdersReducer,
    getAllOrders: getAllOrdersReducer,
    placeOrder: placeOrderReducer,
  },
  preloadedState: initialState,
})
