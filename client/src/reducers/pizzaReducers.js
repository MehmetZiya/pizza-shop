import {
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

export const getPizzaByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PIZZA_BY_ID_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case GET_PIZZA_BY_ID_SUCCESS:
      return {
        loading: false,
        pizza: action.payload,
      }
    case GET_PIZZA_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const editPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PIZZA_REQUEST:
      return {
        edit_loading: true,
        ...state,
      }
    case EDIT_PIZZA_SUCCESS:
      return {
        edit_loading: false,
        edit_success: true,
      }
    case EDIT_PIZZA_FAIL:
      return {
        edit_loading: false,
        edit_error: action.payload,
      }
    case RESET_FORM:
      return {
        edit_loading: false,
        edit_success: false,
      }
    default:
      return state
  }
}

export const deletePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PIZZA_REQUEST:
      return {
        delete_loading: true,
      }
    case DELETE_PIZZA_SUCCESS:
      return {
        delete_loading: false,
        delete_success: true,
      }
    case DELETE_PIZZA_FAIL:
      return {
        edit_loading: false,
        edit_error: action.payload,
      }
    default:
      return state
  }
}
