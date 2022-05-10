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
  const currentUser = getState().userLogin.userInfo
  let order = {
    name: user.name,
    email: user.email,
    userId: user._id,
    orderItems: cartItems,
    orderAmount: cartItems.reduce((acc, item) => acc + item.price, 0),
  }
  dispatch({ type: PLACE_ORDER_REQUEST })
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    const response = await axios.post('/api/orders/placeOrder', order, config)
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL, payload: error.response.data.message })
  }
}

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().userLogin.userInfo
  dispatch({ type: GET_USER_ORDERS_REQUEST })
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/orders/getUserOrders`,
      {
        userId: currentUser._id,
      },
      config
    )
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_FAILED, payload: error.message })
  }
}

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST })
  const currentUser = getState().userLogin.userInfo
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/getAllOrders`, config)
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAILED, payload: error.message })
  }
}

export const prepareOrder = (orderid) => async (dispatch, getState) => {
  const currentUser = getState().userLogin.userInfo
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    await axios.post('/api/orders/prepareOrder', { orderid }, config)
    const orders = await axios.get('/api/orders/getAllOrders', config)
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders.data })
  } catch (error) {
    console.log(error)
    alert('Something went Wrong!!')
  }
}

export const deliverOrder = (orderid) => async (dispatch, getState) => {
  const currentUser = getState().userLogin.userInfo
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    await axios.post('/api/orders/deliverOrder', { orderid }, config)
    const orders = await axios.get('/api/orders/getAllOrders', config)
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders.data })
  } catch (error) {
    console.log(error)
    alert('Something went Wrong!!')
  }
}
