import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SET_CATEGORIES,
  SET_DATES
} from '../types'
import { ini, end } from '../helpers'

const INITIAL_STATE = {
  dates: {
    ini,
    end
  },
  categories: [],
  listAll: [],
  error: null,
  loading: false
}

export default function productsReducer (state = INITIAL_STATE, { type, payload }) {
  switch(type) {

    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        listAll: payload.products,
        loading: false,
        error: null
      }

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload.categories
      }

    case SET_DATES:
      return {
        ...state,
        dates: {
          ...state.dates,
          ...payload.dates
        }
      }

    default: return state
  }
}
