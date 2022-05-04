import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { pizzaListReducer } from './reducers/pizzaReducers'

const reducer = combineReducers({
  pizzaList: pizzaListReducer,
})
const middleware = [thunk]

const initialState = {}

const store = configureStore({ reducer, initialState, middleware })

export default store
