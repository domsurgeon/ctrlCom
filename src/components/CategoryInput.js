import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class CategoryInput extends Component {

  render() {
    const { categories, current, setCategory, error } = this.props

    return (
      <div className="category-input">
        <label>
          <Autocomplete 
            items = { categories } 
            placeholder = "Enter category" 
            current = { current } 
            setItem = { setCategory }
          />
        </label>
        <p>{ error }</p>
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
