import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SET_CATEGORIES,
  SET_DATES
} from '../types'
import { miliToSt,valToDate } from '../helpers'

const monthAgo = new Date()
monthAgo.setMonth(monthAgo.getMonth() - 1)
const INITIAL_STATE = {
  dates: {
    ini: monthAgo * 1,
    end: valToDate( miliToSt(new Date() * 1), 'end' ).end
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
