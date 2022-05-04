import axios from 'axios'
import {
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
