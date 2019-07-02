import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class PriceInput extends Component {

  render() {
    return (
      <div className="price-input">
        <label>
          <input value={ this.props.current } placeholder="Enter price. Ej.: 200" onChange={ e => this.props.setPrice( e.target.value ) } />
        </label>
        <p>{ this.props.error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current: state.current.price
})

const mapActionsToProps = dispatch => ({
  setPrice: price => dispatch( currentActions.setPrice( price ) )
})

export default connect( mapStateToProps, mapActionsToProps )( PriceInput )
