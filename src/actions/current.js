import {
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SET_PRODUCT,
  SET_NAME,
  SET_CATEGORY,
  SET_QUANTITY,
  SET_UNITY,
  SET_PRICE
} from '../types'
import { api, LS } from '../config'
import { getProducts } from './products'

export function setProduct( name ) {
  return ( dispatch, getState ) => {
    let product = getState().products.listAll.filter( prod => prod.name === name )[0]

    if( !product ){
      dispatch({
        type: SET_NAME,
        payload: {
          name
        } 
      })
    }else{
      dispatch({
        type: SET_PRODUCT,
        payload: {
          product
        }
      })
    }
  }
}

export function setCategory( category ) {
  return ( dispatch ) => {
    dispatch({
      type: SET_CATEGORY,
      payload: {
        category
      } 
    })
  }
}

export function setQuantity( quantity ) {
  return ( dispatch ) => {
    dispatch({
      type: SET_QUANTITY,
      payload: {
        quantity: quantity.trim()
      } 
    })
  }
}


export function setUnity( unity ) {
  return ( dispatch ) => {
    dispatch({
      type: SET_UNITY,
      payload: {
        unity
      } 
    })
  }
}


export function setPrice( price ) {
  price = price.trim().replace(',','.') * 1
  price = isNaN( price ) ? 0 : price

  return ( dispatch ) => {
    dispatch({
      type: SET_PRICE,
      payload: {
        price
      } 
    })
  }
}

export function save() {
  return ( dispatch, getState ) => {
    dispatch({ type: SAVE })
    const savePromise = saveAPI( getState().current )
    savePromise.then( response => {
      if ( !response.error ) {
        dispatch( saveSuccess() )
        dispatch( getProducts() )
      } else {
        dispatch( saveError( response.error ) )
      }
    })
  }
}

function saveSuccess() {
  return { type: SAVE_SUCCESS }
}

function saveError( error ) {
  return { type: SAVE_ERROR }
}

function saveAPI ( product ) {
  product = { ...product, date: new Date() * 1 }
  if( LS ){
  }else{
    const ApiEndpoint = `${ api }/save`

    return fetch( ApiEndpoint,{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'          
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ product })
    } )
    .then( response => {
      if( !response.ok )
        throw Error( response.statusText )
      return response.json()
    })
    .then( responseJson => {
      return { data: responseJson }
    }).catch( error => {


      const data = JSON.parse( localStorage.getItem('products') || "[]" )
      data.push( product )
      localStorage.setItem('products', JSON.stringify( data ))
      return new Promise( (r,x) => r({ data }) )
      //return { error }
    })
  }
}

