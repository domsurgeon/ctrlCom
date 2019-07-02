import { combineReducers } from 'redux'
import products from './products'
import current from './current'

export default combineReducers({
  products,
  current
})
