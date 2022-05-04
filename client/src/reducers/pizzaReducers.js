import {
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  PIZZA_LIST_FAIL,
  PIZZA_LIST_REQUEST,
  PIZZA_LIST_SUCCESS,
  RESET_FORM,
} from '../constants/pizzaConstants'

export const pizzaListReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case PIZZA_LIST_REQUEST:
      return { loading: true, pizzas: [] }
    case PIZZA_LIST_SUCCESS:
      return {
        loading: false,
        pizzas: action.payload,
      }
    case PIZZA_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PIZZA_REQUEST:
      return { loading: true, ...state }
    case ADD_PIZZA_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PIZZA_LIST_FAIL:
      return { loading: false, error: action.payload }
    case RESET_FORM:
      return { loading: false, success: false }
    default:
      return state
  }
}
