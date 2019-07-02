import React, { Component } from 'react'
import { connect } from 'react-redux'
import { productsActions } from '../actions'
import { miliToSt, valToDate, percent } from '../helpers'

class FilterData extends Component {
  constructor ( props ){
    super( props )
  }

  render() {
    const catSum = this.props.categories.reduce( (s,i) => s+i.spent, 0 )
    let { ini, end } = this.props.dates
    
    ini = miliToSt( ini )
    end = miliToSt( end )

    const sets = ( value, lim ) => {
      const date = valToDate( value, lim )

      this.props.setDates( date )
      this.props.setCategories()
    }

    return (
      <section className="graphdata-input">
        <h2>$ { this.props.categories.reduce( (s,i)=>s+i.spent ,0) }</h2>
        <label>
          <input type="date" value={ ini } onChange={ ev => sets( ev.target.value, 'ini' ) } />
        </label>
        <label>
          <input type="date" value={ end } onChange={ ev => sets( ev.target.value, 'end' ) } />
        </label>
        <p>{ this.props.error }</p>

        <div className="catlist">
        { this.props.categories.sort( (a,b) => b.spent-a.spent ).map( cat => {
          const siSum = cat.subitems.reduce( (s,i)=>s+i.price ,0 )
          return (
            <div key={ cat.name }>
              <p>
                <span className="catname">{ cat.name }: </span> 
                <span className="perc">{ percent( cat.spent, catSum ) } %</span>
                <span className="price">$ { cat.spent }</span>
              </p>
              <ul>
                { cat.subitems.map( product => (
                  <li key={ product.date }>
                    <span>{ product.name }</span>
                    <span className="perc">{ percent( product.price, siSum ) } %</span>
                    <span className="price">&nbsp;$ { product.price }</span>
                    <span className="pdate">| { miliToSt( product.date ) } |</span>
                  </li> ) ) }
              </ul>
            </div> )} )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  dates: state.products.dates,
  categories: state.products.categories,
  products: state.products.listAll
})

const mapActionsToProps = dispatch => ({
  setCategories: () => dispatch( productsActions.setCategories() ),
  setDates: dates => dispatch( productsActions.setDates( dates ) ),
})


export default connect( mapStateToProps, mapActionsToProps )( FilterData )
