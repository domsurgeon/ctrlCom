import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import { connect } from 'react-redux'
import { productsActions, currentActions } from '../actions'

class ProductInput extends Component {
  constructor ( props ){
    super( props )
    this.setProduct = this.setProduct.bind(this)
  }

  setProduct( name ) {
    this.props.setProduct( name )
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="product-input">
        <label>
          <Autocomplete items={ this.props.products } placeholder="Enter product" current={ this.props.current } focus={ true } setItem={ this.setProduct } />
        </label>
        <p>{ this.props.error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.listAll,
  current: state.current.name
})

const mapActionsToProps = dispatch => ({
  getProducts: () => dispatch( productsActions.getProducts() ),
  setProduct: name => dispatch( currentActions.setProduct( name ) )
})

export default connect( mapStateToProps, mapActionsToProps )( ProductInput )
