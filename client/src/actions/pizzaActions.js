import axios from 'axios'
import {
  ADD_PIZZA_FAIL,
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  PIZZA_LIST_FAIL,
  PIZZA_LIST_REQUEST,
  PIZZA_LIST_SUCCESS,
} from '../constants/pizzaConstants'

export const getAllPizza = () => async (dispatch) => {
  dispatch({ type: PIZZA_LIST_REQUEST })
  try {
    const { data } = await axios.get(`/api/pizzas`)
    dispatch({ type: PIZZA_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PIZZA_LIST_FAIL,
      payload: message,
    })
  }
}

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: ADD_PIZZA_REQUEST })
  try {
    const { data } = await axios.post(`/api/pizzas/addpizza`, pizza)
    dispatch({ type: ADD_PIZZA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_PIZZA_FAIL, payload: error.message })
  }
}
