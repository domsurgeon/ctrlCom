import React, { Component } from 'react'
import { connect } from 'react-redux'
import { productsActions, currentActions } from './actions'
import './App.css'

import ProductInput from './components/ProductInput'
import CategoryInput from './components/CategoryInput'
import PriceInput from './components/PriceInput'
import FilterData from './components/FilterData'
//import QuantityInput from './components/QuantityInput'
//import UnityInput from './components/UnityInput'

class App extends Component {
  componentDidMount() {
    this.props.getProducts()
    document.title = 'Control money spending'
  }

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
  getProducts: () => dispatch( productsActions.getProducts() ),
  save: () => dispatch( currentActions.save() )
})

export default connect( mapStateToProps, mapActionsToProps )( App )
