import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentActions } from './actions'
import './App.css'

import ProductInput from './components/ProductInput'
import CategoryInput from './components/CategoryInput'
import PriceInput from './components/PriceInput'
import FilterData from './components/FilterData'
//import QuantityInput from './components/QuantityInput'
//import UnityInput from './components/UnityInput'

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>CtrlCom</h1>
        <section>
          <ProductInput />
          <CategoryInput />
          <PriceInput />
          <button onClick={ this.props.save } >Done</button>
        </section>
        <FilterData />
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapActionsToProps = dispatch => ({
  save: () => dispatch( currentActions.save() )
})

export default connect( mapStateToProps, mapActionsToProps )( App )
