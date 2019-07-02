import {
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SET_NAME,
  SET_PRODUCT,
  SET_CATEGORY,
  SET_QUANTITY,
  SET_UNITY,
  SET_PRICE
} from '../types'

const INITIAL_STATE = {
  name: "",
  category: "",
  quantity: "",
  unity: "",
  price: "",
  date: new Date()*1
}

export default function currentReducer (state = INITIAL_STATE, { type, payload }) {
  switch(type) {

    case SET_PRODUCT:
      return {
        ...state,
        ...payload.product
      }

    case SET_NAME:
      return {
        ...state,
        name: payload.name
      }

    case SET_CATEGORY:
      return {
        ...state,
        category: payload.category
      }

    case SET_QUANTITY:
      return {
        ...state,
        quantity: payload.quantity
      }

    case SET_UNITY:
      return {
        ...state,
        unity: payload.unity
      }

    case SET_PRICE:
      return {
        ...state,
        price: payload.price
      }

    case SAVE:
      return {
        ...state
      }

    case SAVE_SUCCESS:
      return {
        ...INITIAL_STATE,
        date: new Date()*1
      }

    case SAVE_ERROR:
      return {
        ...state
      }

    default: return state
  }
}
