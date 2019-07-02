import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentActions } from '../actions'

class UnityInput extends Component {

  render() {
    const Radiobutton = props => (
      <label>
        <span>{ props.value }</span>
        <input type="radio" name="unity" {...props} />
      </label>
    )
    const handleChange = e => this.props.setUnity( e.target.value )

    return (
      <div className="unity-input">
        <div>
          {
            ( this.props.unities || ['Kg','Lt','Un'] ).map( uni => {
              <Radiobutton value={ uni } onChange={ handleChange } checked={ this.props.current === uni } /> } )
          }
        </div>
        <p>{ this.props.error }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current: state.current.unity
})

const mapActionsToProps = dispatch => ({
  setUnity: unity => dispatch( currentActions.setUnity( unity ) )
})

export default connect( mapStateToProps, mapActionsToProps )( UnityInput )
