import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class CategoryInput extends Component {
  constructor ( props ){
    super( props )
    this.setCategory = this.setCategory.bind(this)
  }

  setCategory( category ) {
    this.props.setCategory( category )
  }

  render() {
    return (
      <div className="category-input">
        <label>
          <Autocomplete items={ this.props.categories } placeholder="Enter category" current={ this.props.current } setItem={ this.setCategory } />
        </label>
        <p>{ this.props.error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.products.categories,
  current: state.current.category
})

const mapActionsToProps = dispatch => ({
  setCategory: category => dispatch( currentActions.setCategory( category ) )
})

export default connect( mapStateToProps, mapActionsToProps )( CategoryInput )
