import { configureStore } from '@reduxjs/toolkit'

import { pizzaListReducer } from './reducers/pizzaReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

/* const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [] */

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

export default configureStore({
  reducer: {
    pizzaList: pizzaListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  },
  preloadedState: initialState,
})
