import React, { Component } from 'react'

class Autocomplete extends Component {
  componentDidMount(){
    if( this.props.focus ){
      this._input.focus()
    }
  }
  componentDidUpdate(){
    if( this.props.focus ){
      this._input.focus()
    }
  }

  render() {
    const { items, current, placeholder, setItem } = this.props
    const matched = items.find( item => item.name === current )
    let filteredItems = !current || matched ? [] : (
        items.sort( (a,b) => a-b ).reduce( (uniques, item) => {
          if( !uniques.find( el => el.name === item.name  ) )
            uniques.push( item )
          return uniques
        },[] ).filter( item => item.name.includes( current ) ) )

    return (
      <div className="search">
        <input ref={i => (this._input = i)} type="text" value={ current } placeholder={ placeholder } onChange={ e => { setItem(e.target.value) } } />
        <ul>
          { filteredItems.map( item => (
            <li key={ item.date }><button onClick={ () => setItem(item.name) } >{ item.name }</button></li> ) ) }
        </ul>
      </div>
    )
  }
}

export default Autocomplete