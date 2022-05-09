import axios from 'axios'
import {
  ADD_PIZZA_FAIL,
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  EDIT_PIZZA_FAIL,
  EDIT_PIZZA_REQUEST,
  EDIT_PIZZA_SUCCESS,
  GET_PIZZA_BY_ID_FAIL,
  GET_PIZZA_BY_ID_REQUEST,
  GET_PIZZA_BY_ID_SUCCESS,
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

export const addPizza = (pizza) => async (dispatch, getState) => {
  dispatch({ type: ADD_PIZZA_REQUEST })
  const currentUser = getState().userLogin.userInfo
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    const { data } = await axios.post(`/api/pizzas/addpizza`, pizza, config)
    dispatch({ type: ADD_PIZZA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_PIZZA_FAIL, payload: error.message })
  }
}

export const editPizza = (editedpizza) => async (dispatch, getState) => {
  dispatch({ type: EDIT_PIZZA_REQUEST })
  const currentUser = getState().userLogin.userInfo
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
    await axios.post('/api/pizzas/editpizza', { editedpizza }, config)

    dispatch({ type: EDIT_PIZZA_SUCCESS })
  } catch (error) {
    dispatch({ type: EDIT_PIZZA_FAIL, payload: error })
  }
}

export const deletePizza = (pizzaId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_PIZZA_REQUEST })
  const currentUser = getState().userLogin.userInfo
  try {
    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } }
    await axios.post('/api/pizzas/deletepizza', { pizzaId }, config)
    dispatch({ type: DELETE_PIZZA_SUCCESS })
    window.location.reload()
  } catch (error) {
    dispatch({ type: DELETE_PIZZA_FAIL, payload: error })
  }
}

export const searchPizzas = (searchKey, category) => async (dispatch) => {
  dispatch({ type: PIZZA_LIST_REQUEST })

  try {
    const { data } = await axios.get(`/api/pizzas`)
    let filteredPizzas
    if (category === 'all' && searchKey === '') {
      filteredPizzas = data
    }
    if (category === 'all' && searchKey) {
      filteredPizzas = data.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchKey.toLowerCase())
      )
    } else if (category !== 'all') {
      filteredPizzas = data
        .filter((pizza) =>
          pizza.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        .filter(
          (pizza) => pizza.category.toLowerCase() === category.toLowerCase()
        )
    }
    dispatch({ type: PIZZA_LIST_SUCCESS, payload: filteredPizzas })
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

export const getPizzaByID = (pizzaid) => async (dispatch) => {
  try {
    dispatch({ type: GET_PIZZA_BY_ID_REQUEST })

    const { data } = await axios.post('/api/pizzas/getpizzabyid', { pizzaid })

    dispatch({ type: GET_PIZZA_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_PIZZA_BY_ID_FAIL, payload: error })
  }
}
