import axios from 'axios'
import {
  GET_ALL_ORDERS_FAILED,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILED,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from '../constants/orderConstants'

export const placeOrder = (user, cartItems) => async (dispatch, getState) => {
  let order = {
    name: user.name,
    email: user.email,
    userId: user._id,
    orderItems: cartItems,
    orderAmount: cartItems.reduce((acc, item) => acc + item.price, 0),
  }
  dispatch({ type: PLACE_ORDER_REQUEST })
  try {
    const response = await axios.post('/api/orders/placeOrder', order)
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL, payload: error.response.data.message })
  }
}

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().userLogin.userInfo
  dispatch({ type: GET_USER_ORDERS_REQUEST })
  try {
    const { data } = await axios.post(`/api/orders/getUserOrders`, {
      userId: currentUser._id,
    })
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_FAILED, payload: error.message })
  }
}

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST })
  try {
    const { data } = await axios.get(`/api/orders/getAllOrders`)
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAILED, payload: error.message })
  }
}

export const prepareOrder = (orderid) => async (dispatch) => {
  try {
    await axios.post('/api/orders/prepareOrder', { orderid })
    const orders = await axios.get('/api/orders/getAllOrders')
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders.data })
  } catch (error) {
    console.log(error)
    alert('Something went Wrong!!')
  }
}

export const deliverOrder = (orderid) => async (dispatch) => {
  try {
    await axios.post('/api/orders/deliverOrder', { orderid })
    alert('Order Delivered')
    const orders = await axios.get('/api/orders/getAllOrders')
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders.data })
  } catch (error) {
    console.log(error)
    alert('Something went Wrong!!')
  }
}
