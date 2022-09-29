import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SET_CATEGORIES,
  SET_DATES
} from '../types'
import { api, LS } from '../config'
import { catsFromProds } from '../helpers'

export function getProducts() {
  return dispatch => {
    dispatch({ type: GET_PRODUCTS })
    const getProductsPromise = getProductsFromAPI()
    getProductsPromise.then( response => {
      if ( !response.error ) {
        dispatch( getProductsSuccess( response.data ) )
        dispatch( setCategories() )
      } else {
        dispatch( getProductsError( response.error ) )
      }
    })
  }
}

export function setCategories (){
  return (dispatch, getState) =>{
    let products = getState().products.listAll
    let { ini, end } = getState().products.dates

    products = ini && end ? products.filter( prod => prod.date >= ini && prod.date <= end ) : products

    const categories = catsFromProds( products )

    dispatch({
      type: SET_CATEGORIES,
      payload: {
        categories
      }
    })
  }
}

export function setDates( dates ){
  return {
    type: SET_DATES,
    payload: {
      dates
    }
  }
}

function getProductsSuccess( products ) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: {
      products
    }
  }
}

function getProductsError( error ) {
  return {
    type: GET_PRODUCTS_ERROR,
    payload: {
      error: error
    }
  }
}

function getProductsFromAPI () {
  if( LS ){
    const data = JSON.parse( localStorage.getItem('products') || "[]" )
    return new Promise( (r,x) => r({ data }) )
  }else{
    const ApiEndpoint = `${ api }/getProducts/`

    return fetch( ApiEndpoint )
    .then( response => {
      if( !response.ok )
        throw Error( response.statusText )
      return response.json()
    })
    .then( responseJson => {
      return { data: responseJson }
    }).catch( error => {
      return { error }
    })
  }
}
