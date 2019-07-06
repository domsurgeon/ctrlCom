import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class ProductInput extends Component {
  render() {
    const { products, current, setProduct, error } = this.props

    return (
      <div className="product-input">
        <label>
          <Autocomplete 
            items = { products }
            placeholder = "Enter product"
            current = { current }
            focus = { true }
            setItem = { setProduct } 
          />
        </label>
        <p>{ error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.listAll,
  current: state.current.name
})

const mapActionsToProps = dispatch => ({
  setProduct: name => dispatch( currentActions.setProduct( name ) )
})

export default connect( mapStateToProps, mapActionsToProps )( ProductInput )
