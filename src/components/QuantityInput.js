import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class QuantityInput extends Component {

  render() {
    return (
      <div className="quantity-input">
        <label>
          <input value={ this.props.current } placeholder="Enter quantity. Ej.: 2" onChange={ e => this.props.setQuantity( e.target.value ) } />
        </label>
        <p>{ this.props.error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current: state.current.quantity
})

const mapActionsToProps = dispatch => ({
  setQuantity: quantity => dispatch( currentActions.setQuantity( quantity ) )
})

export default connect( mapStateToProps, mapActionsToProps )( QuantityInput )
